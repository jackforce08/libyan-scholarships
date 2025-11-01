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

  const degreeLevels = ['bachelor', 'masters', 'phd', 'research', 'conference', 'internship', 'fellowship', 'program'];

  // Use the hook for scholarships data
  // To connect Google Sheets, pass: { googleSheetUrl: 'YOUR_GOOGLE_SHEET_URL' }
  // To connect Airtable, pass: { airtableConfig: { baseId: 'BASE_ID', tableId: 'TABLE_ID', apiKey: 'API_KEY' } }
  const { scholarships, loading, error } = useScholarships({
    googleSheetUrl: 'https://docs.google.com/spreadsheets/d/1Rbqr54bFO3kIr86YTtS_kkksmWLCZVbsh8jP8w7hQOw/export?format=csv'
  });

  // Get unique destinations from scholarships data
  const uniqueDestinations = useMemo(() => {
    const destinations = scholarships
      .map(s => s.destination)
      .filter((d): d is string => !!d && d.trim() !== '')
      .map(d => d.trim());
    return Array.from(new Set(destinations)).sort();
  }, [scholarships]);


  const fields = ['engineering', 'medicine', 'business', 'arts', 'science', 'technology', 'law', 'education', 'various'];

  const filteredAndSortedScholarships = useMemo(() => {
    let result = [...scholarships];

    // Filter by search query
    if (searchQuery) {
      result = result.filter((scholarship) =>
        scholarship.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(`field.${scholarship.field}`).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by field
    if (selectedField !== 'all') {
      result = result.filter((scholarship) => scholarship.field === selectedField);
    }

    // Filter by degree level
    if (selectedDegreeLevel !== 'all') {
      result = result.filter((scholarship) => 
        scholarship.degreeLevel?.toLowerCase() === selectedDegreeLevel.toLowerCase()
      );
    }

    // Filter by destination
    if (selectedDestination !== 'all') {
      result = result.filter((scholarship) => 
        scholarship.destination?.trim().toLowerCase() === selectedDestination.toLowerCase()
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      } else if (sortBy === 'destination') {
        const destA = a.destination?.trim().toLowerCase() || '';
        const destB = b.destination?.trim().toLowerCase() || '';
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
                {fields.map((field) => (
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
                {degreeLevels.map((level) => (
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
                      <Badge variant="secondary" className="text-xs">
                        {t(`field.${scholarship.field}`)}
                      </Badge>
                      {scholarship.degreeLevel && (
                        <Badge variant="outline" className="text-xs">
                          {t(`degreeLevel.${scholarship.degreeLevel}`)}
                        </Badge>
                      )}
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
                    {scholarship.destination && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">{t('scholarships.destination')}:</span>
                        <span>{scholarship.destination}</span>
                      </div>
                    )}
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
