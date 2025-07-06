
import { Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleDemoRequest = () => {
    alert('¡Gracias por tu interés! Te contactaremos pronto para programar tu demo.');
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/90 to-yellow-600/90 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-yellow-500/20">
              <BookOpen className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">Onboarding IA</h1>
              <p className="text-xs text-gray-400">Cursos Empresariales</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('cursos')}
              className="text-white hover:text-yellow-400 transition-colors font-medium relative group"
            >
              Cursos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handleNavClick('mis-cursos')}
              className="text-white hover:text-blue-400 transition-colors font-medium relative group"
            >
              Mis Cursos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handleNavClick('empresas')}
              className="text-white hover:text-yellow-400 transition-colors font-medium relative group"
            >
              Para Empresas
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handleNavClick('upload')}
              className="text-white hover:text-yellow-400 transition-colors font-medium relative group"
            >
              Subir PDF
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => handleNavClick('contacto')}
              className="text-white hover:text-yellow-400 transition-colors font-medium relative group"
            >
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <Button 
              onClick={handleDemoRequest}
              className="bg-yellow-500 text-black hover:bg-yellow-400 font-semibold px-6 py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
            >
              Solicitar Demo
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white hover:text-yellow-400 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavClick('cursos')}
                className="text-white hover:text-yellow-400 transition-colors font-medium text-left"
              >
                Cursos
              </button>
              <button 
                onClick={() => handleNavClick('mis-cursos')}
                className="text-white hover:text-blue-400 transition-colors font-medium text-left"
              >
                Mis Cursos
              </button>
              <button 
                onClick={() => handleNavClick('empresas')}
                className="text-white hover:text-yellow-400 transition-colors font-medium text-left"
              >
                Para Empresas
              </button>
              <button 
                onClick={() => handleNavClick('upload')}
                className="text-white hover:text-yellow-400 transition-colors font-medium text-left"
              >
                Subir PDF
              </button>
              <button 
                onClick={() => handleNavClick('contacto')}
                className="text-white hover:text-yellow-400 transition-colors font-medium text-left"
              >
                Contacto
              </button>
              <Button 
                onClick={handleDemoRequest}
                className="bg-yellow-500 text-black hover:bg-yellow-400 font-semibold w-full transition-all duration-300"
              >
                Solicitar Demo
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
