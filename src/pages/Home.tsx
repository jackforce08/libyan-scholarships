import { GraduationCap, BookOpen, Globe2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
              <GraduationCap className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            {t('home.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg"
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate('/scholarships')}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              {t('home.cta')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">
              {t('scholarships.search')}
            </h3>
            <p className="text-muted-foreground">
              {t('home.aboutText')}
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-secondary/10 rounded-xl w-fit mb-4">
              <BookOpen className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">
              {t('scholarships.filter')}
            </h3>
            <p className="text-muted-foreground">
              {t('home.aboutText')}
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-accent/10 rounded-xl w-fit mb-4">
              <Globe2 className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">
              {t('nav.language')}
            </h3>
            <p className="text-muted-foreground">
              {t('home.aboutText')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
