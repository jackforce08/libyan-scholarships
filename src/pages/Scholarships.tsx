import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, ExternalLink, Loader2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScholarships } from '@/hooks/useScholarships';

export default function Scholarships() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('all');
  const [selectedDegreeLevel, setSelectedDegreeLevel] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  // Use the hook for scholarships data
  // To connect Google Sheets, pass: { googleSheetUrl: 'YOUR_GOOGLE_SHEET_URL' }
  // To connect Airtable, pass: { airtableConfig: { baseId: 'BASE_ID', tableId: 'TABLE_ID', apiKey: 'API_KEY' } }
 const { scholarships, loading, error } = useScholarships({
  url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ6MjGQXkE92eznxXdYHzWB5Ajpw1oNgehW4cfD4NeBsD0pvGo7MgfbTUlPM5nLNK4QTm_5WHiXI1a/pub?gid=1129332444&single=true&output=csv",
});


  // Helper function to split by both English and Arabic commas
  const splitByCommas = (text: string): string[] => {
    // Split by both English comma (,) and Arabic comma (،)
    return text.split(/[,،]/).map(d => d.trim()).filter(d => d !== '');
  };

  // Get unique destinations from scholarships data
  // Split comma-separated destinations (e.g., "Egypt, Lebanon" -> ["Egypt", "Lebanon"])
  // Show destinations in current language, but also include from other language if current language not available
  const uniqueDestinations = useMemo(() => {
    const allDestinations: string[] = [];
    
    scholarships.forEach(s => {
      if (s.destination) {
        // Prioritize destination in current language
        const destValue = s.destination[language] || s.destination.en || s.destination.ar || '';
        if (destValue.trim() !== '') {
          // Split by both English and Arabic commas
          const splitDestinations = splitByCommas(destValue);
          allDestinations.push(...splitDestinations);
        }
      }
    });
    
    // Remove duplicates and sort
    return Array.from(new Set(allDestinations)).sort();
  }, [scholarships, language]);

  // Get unique fields from scholarships data
  // Split comma-separated fields (e.g., "engineering, medicine" -> ["engineering", "medicine"])
  const uniqueFields = useMemo(() => {
    const allFields: string[] = [];
    
    scholarships.forEach(s => {
      if (s.field && s.field.trim() !== '') {
        // Split by both English and Arabic commas
        const splitFields = splitByCommas(s.field)
          .map(f => f.toLowerCase());
        
        allFields.push(...splitFields);
      }
    });
    
    // Remove duplicates and sort, with fallback to hardcoded list
    const defaultFields = ['engineering', 'medicine', 'business', 'arts', 'science', 'technology', 'law', 'education', 'various'];
    const extractedFields = Array.from(new Set(allFields));
    // Merge with defaults to ensure all default fields are available
    const merged = Array.from(new Set([...defaultFields, ...extractedFields])).sort();
    return merged;
  }, [scholarships]);

  // Get unique degree levels from scholarships data
  // Split comma-separated degree levels (e.g., "bachelor, masters" -> ["bachelor", "masters"])
  const uniqueDegreeLevels = useMemo(() => {
    const allDegreeLevels: string[] = [];
    
    scholarships.forEach(s => {
      if (s.degreeLevel && s.degreeLevel.trim() !== '') {
        // Split by both English and Arabic commas
        const splitDegreeLevels = splitByCommas(s.degreeLevel)
          .map(dl => dl.toLowerCase());
        
        allDegreeLevels.push(...splitDegreeLevels);
      }
    });
    
    // Remove duplicates and sort, with fallback to hardcoded list
    const defaultDegreeLevels = ['bachelor', 'masters', 'phd', 'research', 'conference', 'internship', 'fellowship', 'program'];
    const extractedDegreeLevels = Array.from(new Set(allDegreeLevels));
    // Merge with defaults to ensure all default degree levels are available
    const merged = Array.from(new Set([...defaultDegreeLevels, ...extractedDegreeLevels])).sort();
    return merged;
  }, [scholarships]);

  const filteredAndSortedScholarships = useMemo(() => {
    let result = [...scholarships];

    // Filter by search query - search in both English and Arabic regardless of current language
    if (searchQuery) {
      result = result.filter((scholarship) => {
        const query = searchQuery.toLowerCase();
        // Check name in both languages
        if (scholarship.name.en.toLowerCase().includes(query) ||
            scholarship.name.ar.toLowerCase().includes(query)) {
          return true;
        }
        // Check description in both languages
        if (scholarship.description.en.toLowerCase().includes(query) ||
            scholarship.description.ar.toLowerCase().includes(query)) {
          return true;
        }
        // Check destination in both languages
        if (scholarship.destination) {
          const destEn = scholarship.destination.en?.toLowerCase() || '';
          const destAr = scholarship.destination.ar?.toLowerCase() || '';
          // Split and check individual destinations
          const destEnParts = splitByCommas(destEn);
          const destArParts = splitByCommas(destAr);
          if (destEnParts.some(d => d.includes(query)) || destArParts.some(d => d.includes(query))) {
            return true;
          }
        }
        // Check if any field matches (field values themselves)
        if (scholarship.field) {
          const fields = splitByCommas(scholarship.field).map(f => f.toLowerCase());
          if (fields.some(f => f.includes(query))) {
            return true;
          }
        }
        return false;
      });
    }

    // Filter by field
    // Check if any of the comma-separated fields match the selected field
    if (selectedField !== 'all') {
      result = result.filter((scholarship) => {
        if (!scholarship.field) return false;
        const fields = splitByCommas(scholarship.field)
          .map(f => f.toLowerCase());
        return fields.includes(selectedField.toLowerCase());
      });
    }

    // Filter by degree level
    // Check if any of the comma-separated degree levels match the selected degree level
    if (selectedDegreeLevel !== 'all') {
      result = result.filter((scholarship) => {
        if (!scholarship.degreeLevel) return false;
        const degreeLevels = splitByCommas(scholarship.degreeLevel)
          .map(dl => dl.toLowerCase());
        return degreeLevels.includes(selectedDegreeLevel.toLowerCase());
      });
    }

    // Filter by destination
    // Check if any of the comma-separated destinations match the selected destination
    // Use destination in current language
    if (selectedDestination !== 'all') {
      result = result.filter((scholarship) => {
        if (!scholarship.destination) return false;
        const destValue = scholarship.destination[language] || scholarship.destination.en || scholarship.destination.ar || '';
        if (!destValue) return false;
        const destinations = splitByCommas(destValue)
          .map(d => d.toLowerCase());
        return destinations.includes(selectedDestination.toLowerCase());
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else if (sortBy === 'destination') {
        // Get first destination for sorting (or empty string if none)
        // Use destination in current language
        const getFirstDestination = (dest: { en: string; ar: string } | undefined) => {
          if (!dest) return '';
          const destValue = dest[language] || dest.en || dest.ar || '';
          const split = splitByCommas(destValue);
          const first = split[0]?.toLowerCase() || '';
          return first;
        };
        const destA = getFirstDestination(a.destination);
        const destB = getFirstDestination(b.destination);
        return destA.localeCompare(destB);
      } else {
        return a.name[language].localeCompare(b.name[language]);
      }
    });

    return result;
  }, [scholarships, searchQuery, selectedField, selectedDegreeLevel, selectedDestination, sortBy, language, t]);

  const formatDeadline = (date: string) => {
    return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isDeadlineSoon = (deadline: string) => {
    const days = Math.floor((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days <= 30 && days > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('scholarships.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 max-w-4xl mx-auto">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('scholarships.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger className="h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t('scholarships.filter')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('scholarships.all')}</SelectItem>
                {uniqueFields.map((field) => (
                  <SelectItem key={field} value={field}>
                    {t(`field.${field}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDegreeLevel} onValueChange={setSelectedDegreeLevel}>
              <SelectTrigger className="h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t('scholarships.filterDegreeLevel')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('scholarships.allDegreeLevels')}</SelectItem>
                {uniqueDegreeLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {t(`degreeLevel.${level}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDestination} onValueChange={setSelectedDestination}>
              <SelectTrigger className="h-12">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t('scholarships.filterDestination')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('scholarships.allDestinations')}</SelectItem>
                {uniqueDestinations.map((destination) => (
                  <SelectItem key={destination} value={destination}>
                    {destination}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder={t('scholarships.sort')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">{t('scholarships.sortDeadline')}</SelectItem>
                <SelectItem value="name">{t('scholarships.sortName')}</SelectItem>
                <SelectItem value="destination">{t('scholarships.sortDestination')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredAndSortedScholarships.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredAndSortedScholarships.map((scholarship) => (
              <Card key={scholarship.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex flex-wrap gap-2">
                      {scholarship.field && 
                        splitByCommas(scholarship.field).map((field, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {t(`field.${field}`)}
                          </Badge>
                        ))
                      }
                      {scholarship.degreeLevel && 
                        splitByCommas(scholarship.degreeLevel).map((level, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {t(`degreeLevel.${level}`)}
                          </Badge>
                        ))
                      }
                      {scholarship.destination && 
                        splitByCommas(scholarship.destination[language] || scholarship.destination.en || scholarship.destination.ar || '')
                          .map((dest, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <MapPin className="h-3 w-3 mr-1 inline" />
                              {dest}
                            </Badge>
                          ))
                      }
                    </div>
                    {isDeadlineSoon(scholarship.deadline) && (
                      <Badge variant="destructive" className="text-xs">
                        {t('scholarships.deadline')}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl leading-tight">
                    {scholarship.name[language]}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {scholarship.description[language]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{t('scholarships.deadline')}:</span>
                      <span>{formatDeadline(scholarship.deadline)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => window.open(scholarship.applyUrl, '_blank')}
                  >
                    {t('scholarships.apply')}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">{t('scholarships.noResults')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

