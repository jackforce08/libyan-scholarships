import { scholarships } from '../src/data/scholarships.js';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CSV escape function to handle quotes and commas
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

// Convert scholarships to CSV
function scholarshipsToCsv(scholarshipsData: typeof scholarships): string {
  // CSV headers matching the expected format
  const headers = [
    'id',
    'name_en',
    'name_ar',
    'field',
    'deadline',
    'apply_url',
    'description_en',
    'description_ar'
  ];

  // Create CSV rows
  const rows = scholarshipsData.map(scholarship => [
    escapeCsvField(scholarship.id),
    escapeCsvField(scholarship.name.en),
    escapeCsvField(scholarship.name.ar),
    escapeCsvField(scholarship.field),
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

// Export to CSV file
try {
  const csvContent = scholarshipsToCsv(scholarships);
  const outputPath = join(__dirname, '..', 'scholarships.csv');
  writeFileSync(outputPath, csvContent, 'utf-8');
  console.log(`✅ Successfully exported ${scholarships.length} scholarships to:`);
  console.log(`   ${outputPath}`);
  console.log('\nYou can now import this CSV file into Google Sheets.');
  console.log('1. Open Google Sheets');
  console.log('2. Click File > Import');
  console.log('3. Upload the scholarships.csv file');
} catch (error) {
  console.error('❌ Error exporting to CSV:', error);
  process.exit(1);
}

