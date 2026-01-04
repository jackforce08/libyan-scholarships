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
  // Start with loading=true if we have a URL to fetch from
  const [loading, setLoading] = useState(!!(options?.googleSheetUrl || options?.airtableConfig));
  const [error, setError] = useState<string | null>(null);

  // --- CSV support helpers (for sheets published as CSV) ---
  const isCsvUrl = (url: string) => 
    /output=csv/i.test(url) || 
    /format=csv/i.test(url) || 
    /\/export/i.test(url) || 
    /\.csv$/i.test(url);

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
      // Ensure the URL has the proper CSV export format
      let csvUrl = url;
      if (!csvUrl.includes('format=csv') && !csvUrl.includes('output=csv')) {
        // If it's a Google Sheets URL but not a CSV export, convert it
        const sheetIdMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (sheetIdMatch && sheetIdMatch[1]) {
          csvUrl = `https://docs.google.com/spreadsheets/d/${sheetIdMatch[1]}/export?format=csv`;
        }
      }

      const response = await fetch(csvUrl, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Accept': 'text/csv',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();
      
      if (!text || text.trim().length === 0) {
        throw new Error('CSV response is empty');
      }

      const rows = parseCsvToRows(text);
      if (rows.length === 0) {
        throw new Error('CSV is empty after parsing');
      }

      if (rows.length === 1) {
        throw new Error('CSV has headers but no data rows');
      }

      const headers = rows[0].map((h) => normalizeHeader(h || ''));
      // Filter out completely empty data rows
      const dataRows = rows.slice(1).filter((row) => {
        return row.some((cell) => cell && cell.trim() !== '');
      });

      if (dataRows.length === 0) {
        throw new Error('No valid data rows found in CSV');
      }

      const transformed: Scholarship[] = dataRows.map((r, idx) => {
        const obj: Record<string, string> = {};
        for (let i = 0; i < headers.length && i < r.length; i++) {
          obj[headers[i]] = (r[i] ?? '').trim();
        }

        // Helper to pick the first available header variant
        const pick = (variants: string[]) => {
          for (const v of variants) {
            const value = obj[v];
            if (value !== undefined && value !== null && value !== '') {
              return value;
            }
          }
          return '';
        };

        // Normalize degree level value to lowercase for consistency
        // Map common variations to standard values
        const degreeLevelValue = pick(['degree_level', 'degreelevel', 'level', 'degree', 'program_level', 'level_of_study']);
        let normalizedDegreeLevel: string | undefined = undefined;
        if (degreeLevelValue) {
          const lowerValue = degreeLevelValue.toLowerCase().trim();
          // Map common variations to standard degree level keys
          const degreeLevelMap: Record<string, string> = {
            'bachelor': 'bachelor',
            'bachelors': 'bachelor',
            'undergraduate': 'bachelor',
            'masters': 'masters',
            'master': 'masters',
            'ms': 'masters',
            'm.sc': 'masters',
            'phd': 'phd',
            'ph.d': 'phd',
            'ph.d.': 'phd',
            'doctorate': 'phd',
            'doctoral': 'phd',
            'research': 'research',
            'conference': 'conference',
            'confrence': 'conference', // Handle user's spelling variant
            'internship': 'internship',
            'fellowship': 'fellowship',
            'program': 'program',
            'programme': 'program'
          };
          normalizedDegreeLevel = degreeLevelMap[lowerValue] || lowerValue;
        }

        return {
          id: pick(['id', 'identifier', 'scholarship_id']) || `csv-${idx + 1}`,
          name: {
            // Handle formats: "name(EN)" -> "nameen", "name (EN)" -> "name_en", "name_en"
            en: pick(['name_en', 'nameen', 'name_(en)', 'name', 'title_en', 'title']) || '',
            ar: pick(['name_ar', 'namear', 'name_(ar)', 'title_ar']) || ''
          },
          field: (pick(['field', 'category', 'discipline', 'subject', 'area']) || 'general').toLowerCase(),
          degreeLevel: normalizedDegreeLevel,
          // Get destination in both languages
          // Handle both formats: "destination(en)" -> "destinationen" and "destination (en)" -> "destination_en"
          destination: (() => {
            const destEn = pick(['destination_en', 'destinationen'])?.trim();
            const destAr = pick(['destination_ar', 'destinationar'])?.trim();
            // Fallback to generic destination column if language-specific ones don't exist
            const destGeneric = pick(['destination', 'country', 'location', 'destination_country', 'study_destination', 'where'])?.trim();
            
            const destEnValue = destEn || destGeneric || '';
            const destArValue = destAr || destGeneric || '';
            
            // Only return destination object if at least one value exists
            if (destEnValue || destArValue) {
              return {
                en: destEnValue,
                ar: destArValue
              };
            }
            return undefined;
          })(),
          deadline: pick(['deadline', 'due_date', 'due_date', 'application_deadline', 'closing_date']) || '',
          // Handle formats: "apply URL" -> "apply_url" or "applyurl"
          applyUrl: pick(['apply_url', 'applyurl', 'apply', 'url', 'link', 'application_url', 'apply_link']) || '',
          description: {
            // Handle formats: "description(EN)" -> "descriptionen", "description (EN)" -> "description_en"
            en: pick(['description_en', 'descriptionen', 'description_(en)', 'description', 'desc_en']) || '',
            ar: pick(['description_ar', 'descriptionar', 'description_(ar)', 'desc_ar']) || ''
          }
        } as Scholarship;
      }).filter((scholarship) => {
        // Filter out scholarships with no name in either language
        return scholarship.name.en || scholarship.name.ar;
      });

      if (transformed.length === 0) {
        throw new Error('No valid scholarships found after parsing CSV');
      }

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
      // Expected columns: ID, Name (EN), Name (AR), Field, Degree Level, Destination (EN), Destination (AR), Deadline, Apply URL, Description (EN), Description (AR)
      const transformed: Scholarship[] = rows.map((row: any, idx: number) => {
        const degreeLevelValue = row.c[4]?.v;
        const destEn = row.c[5]?.v?.toString().trim();
        const destAr = row.c[6]?.v?.toString().trim();
        return {
          id: row.c[0]?.v?.toString() || `gs-${idx + 1}`,
          name: {
            en: row.c[1]?.v || '',
            ar: row.c[2]?.v || ''
          },
          field: (row.c[3]?.v || 'general').toLowerCase(),
          degreeLevel: degreeLevelValue ? degreeLevelValue.toString().toLowerCase().trim() : undefined,
          destination: (destEn || destAr) ? {
            en: destEn || destAr || '',
            ar: destAr || destEn || ''
          } : undefined,
          deadline: row.c[7]?.v || '',
          applyUrl: row.c[8]?.v || '',
          description: {
            en: row.c[9]?.v || '',
            ar: row.c[10]?.v || ''
          }
        };
      });

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
  // For CSV export URLs, preserve them as-is.
  function normalizeGoogleSheetUrl(rawUrl: string) {
    try {
      // If it's a CSV export URL, preserve it as-is (don't convert to JSON)
      if (isCsvUrl(rawUrl)) return rawUrl;

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
      // Expected fields: ID, NameEN, NameAR, Field, DegreeLevel, DestinationEN, DestinationAR, Deadline, ApplyURL, DescriptionEN, DescriptionAR
      const transformed: Scholarship[] = data.records.map((record: any) => {
        const degreeLevelValue = record.fields.DegreeLevel || record.fields.Degree_Level || record.fields.Level;
        const destEn = record.fields.DestinationEN || record.fields.Destination_EN;
        const destAr = record.fields.DestinationAR || record.fields.Destination_AR;
        const destGeneric = record.fields.Destination || record.fields.Country || record.fields.Location;
        const destEnValue = destEn ? destEn.toString().trim() : (destGeneric ? destGeneric.toString().trim() : '');
        const destArValue = destAr ? destAr.toString().trim() : (destGeneric ? destGeneric.toString().trim() : '');
        return {
          id: record.id,
          name: {
            en: record.fields.NameEN || '',
            ar: record.fields.NameAR || ''
          },
          field: (record.fields.Field || 'general').toLowerCase(),
          degreeLevel: degreeLevelValue ? degreeLevelValue.toString().toLowerCase().trim() : undefined,
          destination: (destEnValue || destArValue) ? {
            en: destEnValue,
            ar: destArValue
          } : undefined,
          deadline: record.fields.Deadline || '',
          applyUrl: record.fields.ApplyURL || '',
          description: {
            en: record.fields.DescriptionEN || '',
            ar: record.fields.DescriptionAR || ''
          }
        };
      });

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
