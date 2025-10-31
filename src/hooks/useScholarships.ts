import { useState, useEffect } from 'react';
import { Scholarship, scholarships as localScholarships } from '@/data/scholarships';

interface UseScholarshipsOptions {
  googleSheetUrl?: string;
  airtableConfig?: {
    baseId: string;
    tableId: string;
    apiKey: string;
  };
}

export function useScholarships(options?: UseScholarshipsOptions) {
  const [scholarships, setScholarships] = useState<Scholarship[]>(localScholarships);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- CSV support helpers (for sheets published as CSV) ---
  const isCsvUrl = (url: string) => /output=csv/i.test(url) || /\.csv$/i.test(url);

  // Normalize header strings to simple keys
  const normalizeHeader = (h: string) => h.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

  // Basic CSV parser returning array of rows (each row is array of fields)
  // Handles quoted fields and double-quote escaping
  const parseCsvToRows = (text: string) => {
    // Remove BOM if present
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
    const rows: string[][] = [];
    let cur = '';
    let row: string[] = [];
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        row.push(cur);
        cur = '';
      } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
        // handle CRLF
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(cur);
        rows.push(row);
        row = [];
        cur = '';
      } else {
        cur += ch;
      }
    }

    // Push last value
    if (cur !== '' || row.length > 0) {
      row.push(cur);
      rows.push(row);
    }

    // Trim potential trailing empty row if the CSV ends with a newline
    if (rows.length > 0) {
      const last = rows[rows.length - 1];
      const allEmpty = last.every((c) => c === '');
      if (allEmpty) rows.pop();
    }

    return rows;
  };

  // Fetch and parse CSV published sheet (header-based mapping)
  const fetchFromGoogleSheetsCsv = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.status}`);
      const text = await response.text();

      const rows = parseCsvToRows(text);
      if (rows.length === 0) throw new Error('CSV is empty');

      const headers = rows[0].map((h) => normalizeHeader(h || ''));
      const dataRows = rows.slice(1);

      const transformed: Scholarship[] = dataRows.map((r, idx) => {
        const obj: Record<string, string> = {};
        for (let i = 0; i < headers.length; i++) {
          obj[headers[i]] = (r[i] ?? '').trim();
        }

        // Helper to pick the first available header variant
        const pick = (variants: string[]) => {
          for (const v of variants) if (obj[v] !== undefined && obj[v] !== '') return obj[v];
          return '';
        };

        return {
          id: pick(['id', 'identifier']) || `csv-${idx + 1}`,
          name: {
            en: pick(['name_en', 'name_(en)', 'name_en', 'name']) || '',
            ar: pick(['name_ar', 'name_(ar)', 'name_ar']) || ''
          },
          field: (pick(['field', 'category', 'discipline']) || 'general').toLowerCase(),
          deadline: pick(['deadline', 'due_date', 'due_date']) || '',
          applyUrl: pick(['apply_url', 'applyurl', 'apply', 'url', 'link']) || '',
          description: {
            en: pick(['description_en', 'description_(en)', 'description_en', 'description']) || '',
            ar: pick(['description_ar', 'description_(ar)', 'description_ar']) || ''
          }
        } as Scholarship;
      });

      setScholarships(transformed);
    } catch (err: any) {
      console.error('Error fetching/parsing CSV from Google Sheets:', err);
      setError(`Failed to load scholarships from Google Sheets (CSV): ${err?.message || String(err)}. Using local data.`);
      setScholarships(localScholarships);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      // If Google Sheets URL is provided
      if (options?.googleSheetUrl) {
        // normalize possible "edit" or sharing URLs
        const normalized = normalizeGoogleSheetUrl(options.googleSheetUrl);

        // If the sheet was published as CSV (output=csv) accept and parse CSV
        if (isCsvUrl(normalized)) {
          await fetchFromGoogleSheetsCsv(normalized);
        } else {
          await fetchFromGoogleSheets(normalized);
        }
        return;
      }

      // If Airtable config is provided
      if (options?.airtableConfig) {
        await fetchFromAirtable(options.airtableConfig);
        return;
      }

      // Otherwise use local data (already set in state)
    };

    fetchData();
  }, [options?.googleSheetUrl, options?.airtableConfig]);

  const fetchFromGoogleSheets = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const text = await response.text();
      
      // Parse Google Sheets JSON format (gviz/tq response)
      // Expected format: google.visualization.Query.setResponse({...})
      const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\((.*)\)/s);
      if (!jsonMatch) {
        throw new Error('Invalid Google Sheets response format');
      }

      const data = JSON.parse(jsonMatch[1]);
      const rows = data.table.rows;

      // Transform Google Sheets data to Scholarship format
      // Expected columns: ID, Name (EN), Name (AR), Field, Deadline, Apply URL, Description (EN), Description (AR)
      const transformed: Scholarship[] = rows.map((row: any, idx: number) => ({
        id: row.c[0]?.v?.toString() || `gs-${idx + 1}`,
        name: {
          en: row.c[1]?.v || '',
          ar: row.c[2]?.v || ''
        },
        field: (row.c[3]?.v || 'general').toLowerCase(),
        deadline: row.c[4]?.v || '',
        applyUrl: row.c[5]?.v || '',
        description: {
          en: row.c[6]?.v || '',
          ar: row.c[7]?.v || ''
        }
      }));

      setScholarships(transformed);
    } catch (err: any) {
      console.error('Error fetching from Google Sheets:', err);
      // include the underlying error message to help debug in UI
      setError(`Failed to load scholarships from Google Sheets: ${err?.message || String(err)}. Using local data.`);
      setScholarships(localScholarships);
    } finally {
      setLoading(false);
    }
  };

  // Try to convert different Google Sheets sharing/edit URLs into the
  // public gviz/tq JSON endpoint that this hook expects.
  function normalizeGoogleSheetUrl(rawUrl: string) {
    try {
      // If it's already the gviz endpoint, return it
      if (/\/gviz\/tq/i.test(rawUrl)) return rawUrl;

      // Extract the spreadsheet ID from common formats
      const match = rawUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        return `https://docs.google.com/spreadsheets/d/${match[1]}/gviz/tq?tqx=out:json`;
      }

      // Fallback: return the original URL
      return rawUrl;
    } catch (e) {
      return rawUrl;
    }
  }

  const fetchFromAirtable = async (config: NonNullable<UseScholarshipsOptions['airtableConfig']>) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.airtable.com/v0/${config.baseId}/${config.tableId}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${config.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from Airtable');
      }

      const data = await response.json();
      
      // Transform Airtable data to Scholarship format
      // Expected fields: ID, NameEN, NameAR, Field, Deadline, ApplyURL, DescriptionEN, DescriptionAR
      const transformed: Scholarship[] = data.records.map((record: any) => ({
        id: record.id,
        name: {
          en: record.fields.NameEN || '',
          ar: record.fields.NameAR || ''
        },
        field: (record.fields.Field || 'general').toLowerCase(),
        deadline: record.fields.Deadline || '',
        applyUrl: record.fields.ApplyURL || '',
        description: {
          en: record.fields.DescriptionEN || '',
          ar: record.fields.DescriptionAR || ''
        }
      }));

      setScholarships(transformed);
    } catch (err) {
      console.error('Error fetching from Airtable:', err);
      setError('Failed to load scholarships from Airtable. Using local data.');
      setScholarships(localScholarships);
    } finally {
      setLoading(false);
    }
  };

  return { scholarships, loading, error };
}
