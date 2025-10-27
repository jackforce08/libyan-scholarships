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

  useEffect(() => {
    const fetchData = async () => {
      // If Google Sheets URL is provided
      if (options?.googleSheetUrl) {
        await fetchFromGoogleSheets(options.googleSheetUrl);
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
    } catch (err) {
      console.error('Error fetching from Google Sheets:', err);
      setError('Failed to load scholarships from Google Sheets. Using local data.');
      setScholarships(localScholarships);
    } finally {
      setLoading(false);
    }
  };

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
