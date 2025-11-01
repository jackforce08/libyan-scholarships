import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Homepage
    'home.title': 'Libyan Scholarships Portal',
    'home.subtitle': 'Find scholarships and educational opportunities for Libyan students',
    'home.cta': 'View Scholarships',
    'home.about': 'About Us',
    'home.aboutText': 'We help Libyan students find scholarships and educational opportunities worldwide. Our mission is to make education accessible to everyone.',
    
    // Navigation
    'nav.home': 'Home',
    'nav.scholarships': 'Scholarships',
    'nav.language': 'العربية',
    
    // Scholarships Page
    'scholarships.title': 'Available Scholarships',
    'scholarships.search': 'Search scholarships...',
    'scholarships.filter': 'Filter by Field',
    'scholarships.sort': 'Sort by',
    'scholarships.sortDeadline': 'Deadline (Nearest)',
    'scholarships.sortName': 'Name (A-Z)',
    'scholarships.all': 'All Fields',
    'scholarships.deadline': 'Deadline',
    'scholarships.field': 'Field',
    'scholarships.degreeLevel': 'Degree Level',
    'scholarships.filterDegreeLevel': 'Filter by Degree Level',
    'scholarships.allDegreeLevels': 'All Degree Levels',
    'scholarships.destination': 'Destination',
    'scholarships.filterDestination': 'Filter by Destination',
    'scholarships.allDestinations': 'All Destinations',
    'scholarships.sortDestination': 'Destination (A-Z)',
    'scholarships.apply': 'Apply Now',
    'scholarships.noResults': 'No scholarships found matching your criteria',
    
    // Fields
    'field.engineering': 'Engineering',
    'field.medicine': 'Medicine',
    'field.business': 'Business',
    'field.arts': 'Arts & Humanities',
    'field.science': 'Science',
  'field.various': 'Various',
    'field.technology': 'Technology',
    'field.law': 'Law',
    'field.education': 'Education',
    
    // Degree Levels
    'degreeLevel.bachelor': 'Bachelor',
    'degreeLevel.masters': 'Masters',
    'degreeLevel.phd': 'PHD',
    'degreeLevel.research': 'Research',
    'degreeLevel.conference': 'Conference',
    'degreeLevel.internship': 'Internship',
    'degreeLevel.fellowship': 'Fellowship',
    'degreeLevel.program': 'Program',
  },
  ar: {
    // Homepage
    'home.title': 'بوابة المنح الدراسية الليبية',
    'home.subtitle': 'اعثر على المنح الدراسية والفرص التعليمية للطلاب الليبيين',
    'home.cta': 'عرض المنح الدراسية',
    'home.about': 'من نحن',
    'home.aboutText': 'نساعد الطلاب الليبيين في العثور على المنح الدراسية والفرص التعليمية في جميع أنحاء العالم. مهمتنا هي جعل التعليم متاحًا للجميع.',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.scholarships': 'المنح الدراسية',
    'nav.language': 'English',
    
    // Scholarships Page
    'scholarships.title': 'المنح الدراسية المتاحة',
    'scholarships.search': 'ابحث عن منحة...',
    'scholarships.filter': 'تصفية حسب المجال',
    'scholarships.sort': 'ترتيب حسب',
    'scholarships.sortDeadline': 'الموعد النهائي (الأقرب)',
    'scholarships.sortName': 'الاسم (أ-ي)',
    'scholarships.all': 'جميع المجالات',
    'scholarships.deadline': 'الموعد النهائي',
    'scholarships.field': 'المجال',
    'scholarships.degreeLevel': 'مستوى الدرجة',
    'scholarships.filterDegreeLevel': 'تصفية حسب مستوى الدرجة',
    'scholarships.allDegreeLevels': 'جميع مستويات الدرجة',
    'scholarships.destination': 'الوجهة',
    'scholarships.filterDestination': 'تصفية حسب الوجهة',
    'scholarships.allDestinations': 'جميع الوجهات',
    'scholarships.sortDestination': 'الوجهة (أ-ي)',
    'scholarships.apply': 'قدم الآن',
    'scholarships.noResults': 'لم يتم العثور على منح دراسية مطابقة لمعاييرك',
    
    // Fields
    'field.engineering': 'الهندسة',
    'field.medicine': 'الطب',
    'field.business': 'إدارة الأعمال',
    'field.arts': 'الفنون والإنسانيات',
    'field.science': 'العلوم',
  'field.various': 'متنوع',
    'field.technology': 'التكنولوجيا',
    'field.law': 'القانون',
    'field.education': 'التعليم',
    
    // Degree Levels
    'degreeLevel.bachelor': 'بكالوريوس',
    'degreeLevel.masters': 'ماجستير',
    'degreeLevel.phd': 'دكتوراه',
    'degreeLevel.research': 'بحث',
    'degreeLevel.conference': 'مؤتمر',
    'degreeLevel.internship': 'تدريب',
    'degreeLevel.fellowship': 'زمالة',
    'degreeLevel.program': 'برنامج',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('font-arabic', language === 'ar');
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
