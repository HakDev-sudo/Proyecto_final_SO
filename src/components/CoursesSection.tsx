
import { Clock, Users, Star, ArrowRight, Brain, BarChart, Shield, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const courses = [
  {
    id: 1,
    title: "Fundamentos de IA para Empresas",
    description: "Introducción completa a la Inteligencia Artificial aplicada al mundo empresarial.",
    duration: "8 semanas",
    students: "2,500+",
    rating: 4.9,
    price: "€599",
    level: "Principiante",
    icon: Brain,
    features: ["Certificación incluida", "Soporte 24/7", "Proyectos reales"]
  },
  {
    id: 2,
    title: "Machine Learning para Negocios",
    description: "Aprende a implementar soluciones de ML que generen valor real en tu empresa.",
    duration: "12 semanas",
    students: "1,800+",
    rating: 4.8,
    price: "€799",
    level: "Intermedio",
    icon: BarChart,
    features: ["Casos de estudio", "Mentorías grupales", "Herramientas premium"]
  },
  {
    id: 3,
    title: "IA Ética y Governance",
    description: "Implementa IA de forma responsable y cumple con todas las regulaciones.",
    duration: "6 semanas",
    students: "1,200+",
    rating: 4.9,
    price: "€449",
    level: "Avanzado",
    icon: Shield,
    features: ["Marco legal actualizado", "Consultorías incluidas", "Auditorías IA"]
  },
  {
    id: 4,
    title: "Automatización Inteligente",
    description: "Optimiza procesos empresariales con automatización basada en IA.",
    duration: "10 semanas",
    students: "950+",
    rating: 4.7,
    price: "€699",
    level: "Intermedio",
    icon: Cog,
    features: ["ROI garantizado", "Implementación guiada", "Soporte técnico"]
  }
];

const CoursesSection = () => {
  return (
    <section id="cursos" className="py-20 bg-gray-900 relative">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Coding background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Cursos Diseñados para 
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"> Empresas</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Programas de formación integral que transformarán la forma en que tu empresa utiliza la Inteligencia Artificial
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <Card 
              key={course.id} 
              className="bg-black/50 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 group"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <course.icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{course.price}</div>
                    <div className="text-sm text-yellow-400">{course.level}</div>
                  </div>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-yellow-400 transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  {course.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                    {course.rating}
                  </div>
                </div>

                <div className="space-y-2">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold group mt-6">
                  Inscribirse Ahora
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 font-semibold px-8 py-4">
            Ver Todos los Cursos
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
