import { Scholarship } from '@/data/scholarships';

/**
 * Escapes a CSV field to handle commas, quotes, and newlines
 */
function escapeCsvField(field: string | null | undefined): string {
  if (field === null || field === undefined) {
    return '';
  }
  const str = String(field);
  // If the field contains comma, newline, or quote, wrap it in quotes and escape quotes
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

/**
 * Converts an array of scholarships to CSV format
 */
export function scholarshipsToCsv(scholarships: Scholarship[]): string {
  // CSV headers matching the expected format
  const headers = [
    'id',
    'name_en',
    'name_ar',
    'field',
    'degree_level',
    'destination',
    'deadline',
    'apply_url',
    'description_en',
    'description_ar'
  ];

  // Create CSV rows
  const rows = scholarships.map(scholarship => [
    escapeCsvField(scholarship.id),
    escapeCsvField(scholarship.name.en),
    escapeCsvField(scholarship.name.ar),
    escapeCsvField(scholarship.field),
    escapeCsvField(scholarship.degreeLevel || ''),
    escapeCsvField(scholarship.destination || ''),
    escapeCsvField(scholarship.deadline),
    escapeCsvField(scholarship.applyUrl),
    escapeCsvField(scholarship.description.en),
    escapeCsvField(scholarship.description.ar)
  ]);

  // Combine headers and rows
  const csvLines = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ];

  return csvLines.join('\n');
}

/**
 * Downloads scholarships data as a CSV file
 */
export function downloadScholarshipsAsCsv(scholarships: Scholarship[], filename: string = 'scholarships.csv'): void {
  const csvContent = scholarshipsToCsv(scholarships);
  
  // Create a blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

