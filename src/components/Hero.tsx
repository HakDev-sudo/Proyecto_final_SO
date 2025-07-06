
import { ArrowRight, Play, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const handleExploreCourses = () => {
    const coursesSection = document.getElementById('cursos');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    alert('Demo video coming soon!');
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen flex items-center relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent transform rotate-45"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 bg-gradient-to-br from-gray-300/5 to-transparent transform rotate-12"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-br from-white/5 to-transparent transform -rotate-45"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white text-sm font-medium hover:bg-white/10 transition-all duration-300">
                <TrendingUp className="w-4 h-4 mr-2 text-yellow-500" />
                Líder en Formación Empresarial con IA
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                TRANSFORMA
                <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                  TU EMPRESA
                </span>
                <span className="block text-5xl lg:text-6xl">con IA</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg font-light">
                Programas especializados en Inteligencia Artificial diseñados para empresas que buscan liderar la transformación digital del futuro.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                onClick={handleExploreCourses}
                size="lg" 
                className="bg-yellow-500 text-black hover:bg-yellow-400 font-semibold px-8 py-6 text-lg group transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20"
              >
                EXPLORAR CURSOS
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button 
                onClick={handleWatchDemo}
                variant="outline" 
                size="lg" 
                className="border-2 border-white/20 bg-transparent text-white hover:bg-white hover:text-black font-semibold px-8 py-6 text-lg group backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                VER DEMO
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
              <div className="text-center sm:text-left group">
                <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Empresas</div>
              </div>
              <div className="text-center sm:text-left group">
                <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">50k+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Estudiantes</div>
              </div>
              <div className="text-center sm:text-left group">
                <div className="text-4xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">98%</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* Visual Side - Educational Image */}
          <div className="relative animate-fade-in">
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Animated Educational Image */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Equipo trabajando con tecnología"
                  className="w-full h-full object-cover animate-float"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-8 flex flex-col justify-center items-center text-center space-y-6 z-10">
                <div className="w-20 h-20 bg-yellow-500/90 rounded-full flex items-center justify-center backdrop-blur-sm border border-yellow-400/50 hover:scale-110 transition-transform duration-300">
                  <Play className="w-10 h-10 text-black" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">FORMACIÓN</h3>
                  <h4 className="text-xl text-gray-200">EMPRESARIAL</h4>
                </div>
                
                <p className="text-gray-200 text-sm max-w-xs leading-relaxed">
                  Descubre el futuro de la formación empresarial con nuestros programas especializados
                </p>
                
                <Button 
                  onClick={handleWatchDemo}
                  className="bg-black/50 text-white hover:bg-yellow-500 hover:text-black font-semibold px-6 py-3 text-sm transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20"
                >
                  CONTÁCTANOS
                </Button>
              </div>
              
              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-yellow-500/30 animate-bounce-slow">
                <Users className="w-6 h-6 text-yellow-500" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-yellow-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-yellow-500/30 animate-pulse">
                <Award className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
