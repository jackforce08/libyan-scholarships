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

// Generate 50 scholarship entries
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
  {
    id: '9',
    name: {
      en: 'Gates Cambridge Scholarships',
      ar: 'منح غيتس كامبريدج'
    },
    field: 'science',
    deadline: '2025-12-05',
    applyUrl: 'https://www.gatescambridge.org',
    description: {
      en: 'Full-cost scholarships for graduate study at Cambridge',
      ar: 'منح دراسية كاملة للدراسات العليا في كامبريدج'
    }
  },
  {
    id: '10',
    name: {
      en: 'Rhodes Scholarships - Oxford',
      ar: 'منحة رودس - أكسفورد'
    },
    field: 'law',
    deadline: '2025-10-01',
    applyUrl: 'https://www.rhodeshouse.ox.ac.uk',
    description: {
      en: 'Prestigious scholarship for Oxford University',
      ar: 'منحة مرموقة لجامعة أكسفورد'
    }
  },
  {
    id: '11',
    name: {
      en: 'Swedish Institute Scholarships',
      ar: 'منح المعهد السويدي'
    },
    field: 'engineering',
    deadline: '2025-11-20',
    applyUrl: 'https://si.se/en/apply/scholarships',
    description: {
      en: 'Master\'s level scholarships in Sweden',
      ar: 'منح دراسية لمستوى الماجستير في السويد'
    }
  },
  {
    id: '12',
    name: {
      en: 'Netherlands Fellowship Programmes',
      ar: 'برامج الزمالة الهولندية'
    },
    field: 'business',
    deadline: '2025-09-20',
    applyUrl: 'https://www.nuffic.nl/en/subjects/scholarships',
    description: {
      en: 'Fellowships for developing country professionals',
      ar: 'زمالات للمهنيين من الدول النامية'
    }
  },
  {
    id: '13',
    name: {
      en: 'Japan MEXT Scholarships',
      ar: 'منح MEXT اليابانية'
    },
    field: 'technology',
    deadline: '2025-10-10',
    applyUrl: 'https://www.studyinjapan.go.jp',
    description: {
      en: 'Japanese government scholarships for international students',
      ar: 'منح الحكومة اليابانية للطلاب الدوليين'
    }
  },
  {
    id: '14',
    name: {
      en: 'Korean Government Scholarship Program',
      ar: 'برنامج منح الحكومة الكورية'
    },
    field: 'engineering',
    deadline: '2025-11-30',
    applyUrl: 'https://www.studyinkorea.go.kr',
    description: {
      en: 'Study in South Korea with full funding',
      ar: 'ادرس في كوريا الجنوبية بتمويل كامل'
    }
  },
  {
    id: '15',
    name: {
      en: 'Swiss Government Excellence Scholarships',
      ar: 'منح التميز الحكومية السويسرية'
    },
    field: 'science',
    deadline: '2025-12-15',
    applyUrl: 'https://www.sbfi.admin.ch/scholarships',
    description: {
      en: 'Excellence scholarships for postgraduate researchers',
      ar: 'منح التميز للباحثين في الدراسات العليا'
    }
  },
  {
    id: '16',
    name: {
      en: 'Canada Vanier Scholarships',
      ar: 'منح فانييه الكندية'
    },
    field: 'medicine',
    deadline: '2025-11-01',
    applyUrl: 'https://vanier.gc.ca',
    description: {
      en: 'Doctoral scholarships in Canada',
      ar: 'منح الدكتوراه في كندا'
    }
  },
  {
    id: '17',
    name: {
      en: 'New Zealand Development Scholarships',
      ar: 'منح التنمية النيوزيلندية'
    },
    field: 'education',
    deadline: '2025-10-25',
    applyUrl: 'https://www.mfat.govt.nz/scholarships',
    description: {
      en: 'Scholarships for developing countries',
      ar: 'منح دراسية للدول النامية'
    }
  },
  {
    id: '18',
    name: {
      en: 'Belgium Development Cooperation',
      ar: 'التعاون الإنمائي البلجيكي'
    },
    field: 'arts',
    deadline: '2025-09-28',
    applyUrl: 'https://www.vliruos.be',
    description: {
      en: 'Scholarships and training programs',
      ar: 'منح دراسية وبرامج تدريبية'
    }
  },
  {
    id: '19',
    name: {
      en: 'Ireland Government Scholarships',
      ar: 'منح الحكومة الأيرلندية'
    },
    field: 'law',
    deadline: '2025-11-10',
    applyUrl: 'https://www.educationinireland.com',
    description: {
      en: 'Government of Ireland International Education Scholarships',
      ar: 'منح الحكومة الأيرلندية للتعليم الدولي'
    }
  },
  {
    id: '20',
    name: {
      en: 'Singapore International Graduate Award',
      ar: 'جائزة سنغافورة الدولية للدراسات العليا'
    },
    field: 'science',
    deadline: '2025-12-10',
    applyUrl: 'https://www.a-star.edu.sg/Scholarships',
    description: {
      en: 'PhD scholarships in Singapore',
      ar: 'منح الدكتوراه في سنغافورة'
    }
  },
  {
    id: '21',
    name: {
      en: 'ADB-Japan Scholarship Program',
      ar: 'برنامج منح البنك الآسيوي للتنمية - اليابان'
    },
    field: 'business',
    deadline: '2025-10-05',
    applyUrl: 'https://www.adb.org/work-with-us/careers/japan-scholarship-program',
    description: {
      en: 'Graduate studies in economics and development',
      ar: 'دراسات عليا في الاقتصاد والتنمية'
    }
  },
  {
    id: '22',
    name: {
      en: 'World Bank Scholarships Program',
      ar: 'برنامج منح البنك الدولي'
    },
    field: 'business',
    deadline: '2025-11-25',
    applyUrl: 'https://www.worldbank.org/en/programs/scholarships',
    description: {
      en: 'Development-related studies scholarships',
      ar: 'منح الدراسات المتعلقة بالتنمية'
    }
  },
  {
    id: '23',
    name: {
      en: 'UN Women Peace and Security Scholarship',
      ar: 'منحة الأمم المتحدة للمرأة والسلام والأمن'
    },
    field: 'education',
    deadline: '2025-09-18',
    applyUrl: 'https://www.unwomen.org',
    description: {
      en: 'Scholarships for women in conflict-affected areas',
      ar: 'منح دراسية للنساء في المناطق المتضررة من النزاعات'
    }
  },
  {
    id: '24',
    name: {
      en: 'Orange Knowledge Programme',
      ar: 'برنامج المعرفة البرتقالية'
    },
    field: 'technology',
    deadline: '2025-10-12',
    applyUrl: 'https://www.nuffic.nl/en/subjects/orange-knowledge-programme',
    description: {
      en: 'Short courses and master\'s programmes in the Netherlands',
      ar: 'دورات قصيرة وبرامج ماجستير في هولندا'
    }
  },
  {
    id: '25',
    name: {
      en: 'Eiffel Excellence Scholarship - France',
      ar: 'منحة إيفل للتميز - فرنسا'
    },
    field: 'engineering',
    deadline: '2025-12-20',
    applyUrl: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence',
    description: {
      en: 'Master\'s and PhD scholarships in France',
      ar: 'منح الماجستير والدكتوراه في فرنسا'
    }
  },
  {
    id: '26',
    name: {
      en: 'Italian Government Scholarships',
      ar: 'منح الحكومة الإيطالية'
    },
    field: 'arts',
    deadline: '2025-11-05',
    applyUrl: 'https://studyinitaly.esteri.it',
    description: {
      en: 'Study in Italy with government support',
      ar: 'ادرس في إيطاليا بدعم حكومي'
    }
  },
  {
    id: '27',
    name: {
      en: 'Spain MAEC-AECID Scholarships',
      ar: 'منح إسبانيا MAEC-AECID'
    },
    field: 'education',
    deadline: '2025-10-08',
    applyUrl: 'https://www.aecid.es',
    description: {
      en: 'Spanish government scholarships for international students',
      ar: 'منح الحكومة الإسبانية للطلاب الدوليين'
    }
  },
  {
    id: '28',
    name: {
      en: 'Austrian Government Scholarships',
      ar: 'منح الحكومة النمساوية'
    },
    field: 'medicine',
    deadline: '2025-11-18',
    applyUrl: 'https://oead.at/en/to-austria/scholarships',
    description: {
      en: 'Scholarships for students in Austria',
      ar: 'منح دراسية للطلاب في النمسا'
    }
  },
  {
    id: '29',
    name: {
      en: 'Norway Quota Scheme Scholarships',
      ar: 'منح برنامج الحصص النرويجي'
    },
    field: 'science',
    deadline: '2025-12-08',
    applyUrl: 'https://www.uio.no/english/studies/admission/quota-scheme',
    description: {
      en: 'Master\'s and PhD programmes in Norway',
      ar: 'برامج الماجستير والدكتوراه في النرويج'
    }
  },
  {
    id: '30',
    name: {
      en: 'Finland CIMO Fellowships',
      ar: 'زمالات CIMO الفنلندية'
    },
    field: 'technology',
    deadline: '2025-09-22',
    applyUrl: 'https://www.oph.fi/en/services/cimo-fellowships',
    description: {
      en: 'Research fellowships in Finland',
      ar: 'زمالات البحث في فنلندا'
    }
  },
  {
    id: '31',
    name: {
      en: 'Denmark Technical Scholarships',
      ar: 'منح الدنمارك التقنية'
    },
    field: 'engineering',
    deadline: '2025-11-12',
    applyUrl: 'https://www.dtu.dk/english/education/tuition-fees-and-scholarships',
    description: {
      en: 'Engineering and technology scholarships',
      ar: 'منح الهندسة والتكنولوجيا'
    }
  },
  {
    id: '32',
    name: {
      en: 'Czech Government Scholarships',
      ar: 'منح الحكومة التشيكية'
    },
    field: 'arts',
    deadline: '2025-10-18',
    applyUrl: 'https://www.studyin.cz',
    description: {
      en: 'Study in the Czech Republic',
      ar: 'ادرس في جمهورية التشيك'
    }
  },
  {
    id: '33',
    name: {
      en: 'Poland Solidarity Scholarships',
      ar: 'منح التضامن البولندية'
    },
    field: 'education',
    deadline: '2025-11-22',
    applyUrl: 'https://www.nawa.gov.pl',
    description: {
      en: 'Scholarships for developing countries',
      ar: 'منح دراسية للدول النامية'
    }
  },
  {
    id: '34',
    name: {
      en: 'Hungary Stipendium Hungaricum',
      ar: 'منحة المجر Stipendium Hungaricum'
    },
    field: 'law',
    deadline: '2025-12-18',
    applyUrl: 'https://stipendiumhungaricum.hu',
    description: {
      en: 'Full scholarships for bachelor, master and PhD',
      ar: 'منح كاملة للبكالوريوس والماجستير والدكتوراه'
    }
  },
  {
    id: '35',
    name: {
      en: 'Romania Government Scholarships',
      ar: 'منح الحكومة الرومانية'
    },
    field: 'medicine',
    deadline: '2025-10-14',
    applyUrl: 'https://www.mae.ro/en/node/10251',
    description: {
      en: 'Study in Romania with government funding',
      ar: 'ادرس في رومانيا بتمويل حكومي'
    }
  },
  {
    id: '36',
    name: {
      en: 'Russia Government Scholarships',
      ar: 'منح الحكومة الروسية'
    },
    field: 'science',
    deadline: '2025-11-28',
    applyUrl: 'https://education-in-russia.com',
    description: {
      en: 'Government-funded scholarships in Russia',
      ar: 'منح ممولة من الحكومة في روسيا'
    }
  },
  {
    id: '37',
    name: {
      en: 'UAE Government Scholarships',
      ar: 'منح حكومة الإمارات'
    },
    field: 'business',
    deadline: '2025-09-25',
    applyUrl: 'https://www.government.ae/en/information-and-services/education/higher-education-scholarships',
    description: {
      en: 'Scholarships for Arab students',
      ar: 'منح دراسية للطلاب العرب'
    }
  },
  {
    id: '38',
    name: {
      en: 'Saudi Arabia King Abdullah Scholarship',
      ar: 'منحة الملك عبدالله - السعودية'
    },
    field: 'technology',
    deadline: '2025-10-22',
    applyUrl: 'https://www.sacm.org',
    description: {
      en: 'Scholarships for study abroad',
      ar: 'منح دراسية للدراسة في الخارج'
    }
  },
  {
    id: '39',
    name: {
      en: 'Egypt Al-Azhar Scholarships',
      ar: 'منح الأزهر - مصر'
    },
    field: 'education',
    deadline: '2025-11-08',
    applyUrl: 'https://www.azhar.edu.eg',
    description: {
      en: 'Islamic and Arabic studies scholarships',
      ar: 'منح الدراسات الإسلامية والعربية'
    }
  },
  {
    id: '40',
    name: {
      en: 'Jordan University Scholarships',
      ar: 'منح الجامعات الأردنية'
    },
    field: 'arts',
    deadline: '2025-12-12',
    applyUrl: 'https://www.mohe.gov.jo',
    description: {
      en: 'Scholarships at Jordanian universities',
      ar: 'منح دراسية في الجامعات الأردنية'
    }
  },
  {
    id: '41',
    name: {
      en: 'Morocco Government Scholarships',
      ar: 'منح الحكومة المغربية'
    },
    field: 'law',
    deadline: '2025-10-28',
    applyUrl: 'https://www.enssup.gov.ma',
    description: {
      en: 'Study programs in Morocco',
      ar: 'برامج الدراسة في المغرب'
    }
  },
  {
    id: '42',
    name: {
      en: 'Tunisia Excellence Scholarships',
      ar: 'منح التميز التونسية'
    },
    field: 'engineering',
    deadline: '2025-11-16',
    applyUrl: 'https://www.mes.tn',
    description: {
      en: 'Higher education scholarships in Tunisia',
      ar: 'منح التعليم العالي في تونس'
    }
  },
  {
    id: '43',
    name: {
      en: 'Algeria University Grants',
      ar: 'منح الجامعات الجزائرية'
    },
    field: 'science',
    deadline: '2025-09-30',
    applyUrl: 'https://www.mesrs.dz',
    description: {
      en: 'Scholarships for scientific research',
      ar: 'منح دراسية للبحث العلمي'
    }
  },
  {
    id: '44',
    name: {
      en: 'Malaysia International Scholarships',
      ar: 'المنح الدولية الماليزية'
    },
    field: 'technology',
    deadline: '2025-10-16',
    applyUrl: 'https://www.studymalaysia.com',
    description: {
      en: 'Study in Malaysian universities',
      ar: 'ادرس في الجامعات الماليزية'
    }
  },
  {
    id: '45',
    name: {
      en: 'Thailand Government Scholarships',
      ar: 'منح الحكومة التايلاندية'
    },
    field: 'medicine',
    deadline: '2025-11-26',
    applyUrl: 'https://www.mua.go.th',
    description: {
      en: 'Scholarships for international students',
      ar: 'منح دراسية للطلاب الدوليين'
    }
  },
  {
    id: '46',
    name: {
      en: 'Indonesia Darmasiswa Scholarships',
      ar: 'منح إندونيسيا Darmasiswa'
    },
    field: 'arts',
    deadline: '2025-12-22',
    applyUrl: 'https://darmasiswa.kemdikbud.go.id',
    description: {
      en: 'Cultural and language study scholarships',
      ar: 'منح دراسية للدراسات الثقافية واللغوية'
    }
  },
  {
    id: '47',
    name: {
      en: 'Vietnam Government Scholarships',
      ar: 'منح الحكومة الفيتنامية'
    },
    field: 'business',
    deadline: '2025-10-20',
    applyUrl: 'https://www.moet.gov.vn',
    description: {
      en: 'Study opportunities in Vietnam',
      ar: 'فرص الدراسة في فيتنام'
    }
  },
  {
    id: '48',
    name: {
      en: 'India ICCR Scholarships',
      ar: 'منح ICCR الهندية'
    },
    field: 'education',
    deadline: '2025-11-14',
    applyUrl: 'https://www.iccr.gov.in',
    description: {
      en: 'Indian Council for Cultural Relations scholarships',
      ar: 'منح المجلس الهندي للعلاقات الثقافية'
    }
  },
  {
    id: '49',
    name: {
      en: 'Pakistan HEC Scholarships',
      ar: 'منح لجنة التعليم العالي الباكستانية'
    },
    field: 'science',
    deadline: '2025-09-12',
    applyUrl: 'https://www.hec.gov.pk',
    description: {
      en: 'Higher Education Commission scholarships',
      ar: 'منح لجنة التعليم العالي'
    }
  },
  {
    id: '50',
    name: {
      en: 'Bangladesh Commonwealth Scholarships',
      ar: 'منح الكومنولث - بنغلاديش'
    },
    field: 'law',
    deadline: '2025-10-26',
    applyUrl: 'https://www.ugc.gov.bd',
    description: {
      en: 'Commonwealth scholarships for Bangladeshi students',
      ar: 'منح الكومنولث للطلاب البنغلاديشيين'
    }
  }
];
