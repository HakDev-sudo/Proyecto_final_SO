
import { CheckCircle, TrendingUp, Users, Zap, Award, Shield, Clock, Globe } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: "ROI Comprobado",
    description: "Nuestros clientes ven un retorno de inversión promedio del 300% en 6 meses."
  },
  {
    icon: Users,
    title: "Formación Escalable",
    description: "Desde equipos pequeños hasta organizaciones de miles de empleados."
  },
  {
    icon: Zap,
    title: "Implementación Rápida",
    description: "Comienza a ver resultados desde la primera semana de formación."
  },
  {
    icon: Award,
    title: "Certificaciones Oficiales",
    description: "Certificados reconocidos internacionalmente por organismos líderes en IA."
  },
  {
    icon: Shield,
    title: "Cumplimiento Normativo",
    description: "Formación actualizada con las últimas regulaciones de IA y GDPR."
  },
  {
    icon: Clock,
    title: "Aprendizaje Flexible",
    description: "Modalidades síncronas y asíncronas adaptadas a tu horario empresarial."
  }
];

const stats = [
  { number: "500+", label: "Empresas Formadas", icon: Globe },
  { number: "50k+", label: "Profesionales Certificados", icon: Users },
  { number: "98%", label: "Tasa de Satisfacción", icon: Award },
  { number: "300%", label: "ROI Promedio", icon: TrendingUp }
];

const BenefitsSection = () => {
  return (
    <section id="empresas" className="py-20 bg-black relative">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Professional learning"
          className="w-full h-full object-cover animate-slow-zoom"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Por qué las Empresas Eligen 
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"> Onboarding IA?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Más de 500 empresas ya han transformado sus equipos con nuestros programas de formación especializados
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-black" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-yellow-600/10 to-yellow-500/10 border border-yellow-600/20 rounded-3xl p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            ¿Listo para Transformar tu Empresa?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a las empresas líderes que ya están aprovechando el poder de la IA para impulsar su crecimiento
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
              Solicitar Demo Gratuita
            </button>
            <button className="border border-gray-600 text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
              Hablar con Consultor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
