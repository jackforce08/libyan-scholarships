export interface Scholarship {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  field: string;
  deadline: string;
  applyUrl: string;
  description: {
    en: string;
    ar: string;
  };
}

export const scholarships: Scholarship[] = [
  {
    id: '1',
    name: {
      en: 'Chevening Scholarships - UK',
      ar: 'منحة تشيفنينج - المملكة المتحدة'
    },
    field: 'engineering',
    deadline: '2025-11-02',
    applyUrl: 'https://www.chevening.org/apply',
    description: {
      en: 'Full scholarship for master\'s degree in the UK',
      ar: 'منحة كاملة لدرجة الماجستير في المملكة المتحدة'
    }
  },
  {
    id: '2',
    name: {
      en: 'Fulbright Foreign Student Program',
      ar: 'برنامج فولبرايت للطلاب الأجانب'
    },
    field: 'science',
    deadline: '2025-10-15',
    applyUrl: 'https://foreign.fulbrightonline.org',
    description: {
      en: 'Graduate study opportunities in the United States',
      ar: 'فرص الدراسات العليا في الولايات المتحدة'
    }
  },
  {
    id: '3',
    name: {
      en: 'DAAD Scholarships - Germany',
      ar: 'منحة DAAD - ألمانيا'
    },
    field: 'technology',
    deadline: '2025-09-30',
    applyUrl: 'https://www.daad.de/en',
    description: {
      en: 'Study in Germany with full funding',
      ar: 'ادرس في ألمانيا بتمويل كامل'
    }
  },
  {
    id: '4',
    name: {
      en: 'Erasmus Mundus Joint Masters',
      ar: 'إيراسموس موندوس للماجستير المشترك'
    },
    field: 'business',
    deadline: '2025-12-01',
    applyUrl: 'https://www.eacea.ec.europa.eu/scholarships',
    description: {
      en: 'Study in multiple European countries',
      ar: 'ادرس في عدة دول أوروبية'
    }
  },
  {
    id: '5',
    name: {
      en: 'Turkey Government Scholarships',
      ar: 'منح الحكومة التركية'
    },
    field: 'medicine',
    deadline: '2025-10-20',
    applyUrl: 'https://www.turkiyeburslari.gov.tr',
    description: {
      en: 'Undergraduate and graduate programs in Turkey',
      ar: 'برامج البكالوريوس والدراسات العليا في تركيا'
    }
  },
  {
    id: '6',
    name: {
      en: 'Commonwealth Scholarships',
      ar: 'منح الكومنولث'
    },
    field: 'education',
    deadline: '2025-11-15',
    applyUrl: 'https://cscuk.fcdo.gov.uk',
    description: {
      en: 'For citizens of Commonwealth countries',
      ar: 'لمواطني دول الكومنولث'
    }
  },
  {
    id: '7',
    name: {
      en: 'Australian Awards Scholarships',
      ar: 'منح الجوائز الأسترالية'
    },
    field: 'arts',
    deadline: '2025-10-30',
    applyUrl: 'https://www.dfat.gov.au/people-to-people/australia-awards',
    description: {
      en: 'Study in Australia with full support',
      ar: 'ادرس في أستراليا بدعم كامل'
    }
  },
  {
    id: '8',
    name: {
      en: 'Chinese Government Scholarships',
      ar: 'منح الحكومة الصينية'
    },
    field: 'technology',
    deadline: '2025-09-15',
    applyUrl: 'https://www.campuschina.org',
    description: {
      en: 'Study opportunities in Chinese universities',
      ar: 'فرص الدراسة في الجامعات الصينية'
    }
  },
];
