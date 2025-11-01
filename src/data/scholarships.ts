export interface Scholarship {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  field: string;
  degreeLevel?: string;
  destination?: string;
  deadline: string;
  applyUrl: string;
  description: {
    en: string;
    ar: string;
  };
}

// Default empty array - data will be loaded from Google Sheets CSV
export const scholarships: Scholarship[] = [];
