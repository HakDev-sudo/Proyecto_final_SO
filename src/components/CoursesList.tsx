import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Star, Loader2, AlertCircle, Play, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import GeneratedCourse from './GeneratedCourse';
import StudentOnboarding from './StudentOnboarding';
import { useStudent } from '@/hooks/useStudent';

interface Course {
  id: string;
  title: string;
  description: string;
  modules: {
    id: string;
    title: string;
    content: string;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  }[];
  createdAt?: string;
  pdfFileName?: string;
}

const CoursesList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { studentName, isOnboarded, completeOnboarding } = useStudent();
  const { toast } = useToast();

  // Datos mock basados en PDFs comunes
  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Fundamentos de JavaScript',
      description: 'Curso completo sobre JavaScript desde cero hasta nivel avanzado',
      pdfFileName: 'javascript-fundamentals.pdf',
      createdAt: '2024-01-15',
      modules: [
        {
          id: '1',
          title: 'Introducción a JavaScript',
          content: 'JavaScript es un lenguaje de programación dinámico que se utiliza principalmente para el desarrollo web. En este módulo aprenderás los conceptos básicos: variables, tipos de datos, operadores y estructuras de control. JavaScript permite crear páginas web interactivas y aplicaciones dinámicas.',
          questions: [
            {
              id: '1',
              question: '¿Cuál es la forma correcta de declarar una variable en JavaScript?',
              options: ['var nombre = "Juan";', 'variable nombre = "Juan";', 'string nombre = "Juan";', 'declare nombre = "Juan";'],
              correctAnswer: 0
            },
            {
              id: '2',
              question: '¿Qué tipo de lenguaje es JavaScript?',
              options: ['Compilado', 'Interpretado', 'Ensamblador', 'Binario'],
              correctAnswer: 1
            }
          ]
        },
        {
          id: '2',
          title: 'Funciones y Objetos',
          content: 'Las funciones son bloques de código reutilizables que realizan tareas específicas. Los objetos son estructuras de datos que contienen propiedades y métodos. Aprenderás a crear y manipular funciones, así como trabajar con objetos literales y constructores.',
          questions: [
            {
              id: '1',
              question: '¿Cómo se define una función en JavaScript?',
              options: ['function miFuncion() {}', 'def miFuncion() {}', 'func miFuncion() {}', 'method miFuncion() {}'],
              correctAnswer: 0
            },
            {
              id: '2',
              question: '¿Cuál es la sintaxis correcta para crear un objeto?',
              options: ['var obj = {};', 'var obj = [];', 'var obj = ();', 'var obj = <>;'],
              correctAnswer: 0
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'React para Principiantes',
      description: 'Aprende React desde cero: componentes, hooks, estado y más',
      pdfFileName: 'react-beginners-guide.pdf',
      createdAt: '2024-02-10',
      modules: [
        {
          id: '1',
          title: 'Introducción a React',
          content: 'React es una biblioteca de JavaScript para construir interfaces de usuario. Fue creada por Facebook y se basa en componentes reutilizables. React utiliza un DOM virtual para optimizar las actualizaciones de la interfaz, lo que resulta en aplicaciones más rápidas y eficientes.',
          questions: [
            {
              id: '1',
              question: '¿Qué empresa creó React?',
              options: ['Google', 'Facebook', 'Microsoft', 'Apple'],
              correctAnswer: 1
            },
            {
              id: '2',
              question: '¿Cuál es la extensión de archivo más común para componentes React?',
              options: ['.js', '.jsx', '.react', '.component'],
              correctAnswer: 1
            }
          ]
        },
        {
          id: '2',
          title: 'Componentes y Props',
          content: 'Los componentes son la base de React. Pueden ser funciones o clases que devuelven JSX. Las props (propiedades) son datos que se pasan de componentes padres a hijos. Aprenderás a crear componentes reutilizables y manejar el flujo de datos.',
          questions: [
            {
              id: '1',
              question: '¿Cómo se pasan datos a un componente hijo?',
              options: ['A través de props', 'A través de state', 'A través de refs', 'A través de context'],
              correctAnswer: 0
            },
            {
              id: '2',
              question: '¿Qué devuelve un componente React?',
              options: ['HTML', 'JSX', 'CSS', 'JavaScript'],
              correctAnswer: 1
            }
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'Python para Ciencia de Datos',
      description: 'Domina Python y sus librerías para análisis de datos y machine learning',
      pdfFileName: 'python-data-science.pdf',
      createdAt: '2024-03-05',
      modules: [
        {
          id: '1',
          title: 'Python Básico',
          content: 'Python es un lenguaje de programación de alto nivel, interpretado y de propósito general. Es conocido por su sintaxis clara y legible. En ciencia de datos, Python es muy popular debido a sus potentes librerías como NumPy, Pandas y Matplotlib.',
          questions: [
            {
              id: '1',
              question: '¿Cuál es la librería principal para manipulación de datos en Python?',
              options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
              correctAnswer: 1
            },
            {
              id: '2',
              question: '¿Python es un lenguaje compilado o interpretado?',
              options: ['Compilado', 'Interpretado', 'Híbrido', 'Ensamblado'],
              correctAnswer: 1
            }
          ]
        },
        {
          id: '2',
          title: 'Análisis de Datos con Pandas',
          content: 'Pandas es una librería fundamental para el análisis de datos en Python. Proporciona estructuras de datos flexibles y herramientas para manipular y analizar datos estructurados. Aprenderás a trabajar con DataFrames, Series y realizar operaciones de limpieza y transformación de datos.',
          questions: [
            {
              id: '1',
              question: '¿Cuáles son las dos estructuras principales de Pandas?',
              options: ['List y Dict', 'DataFrame y Series', 'Array y Matrix', 'Table y Row'],
              correctAnswer: 1
            },
            {
              id: '2',
              question: '¿Qué método se usa para leer un archivo CSV en Pandas?',
              options: ['read_csv()', 'load_csv()', 'import_csv()', 'open_csv()'],
              correctAnswer: 0
            }
          ]
        }
      ]
    },
    {
      id: '4',
      title: 'Marketing Digital Avanzado',
      description: 'Estrategias completas de marketing digital y redes sociales',
      pdfFileName: 'digital-marketing-advanced.pdf',
      createdAt: '2024-02-28',
      modules: [
        {
          id: '1',
          title: 'Fundamentos del Marketing Digital',
          content: 'El marketing digital abarca todas las estrategias de promoción que utilizan canales digitales. Incluye SEO, SEM, marketing de contenidos, redes sociales, email marketing y más. Es esencial entender el customer journey y cómo los usuarios interactúan con las marcas online.',
          questions: [
            {
              id: '1',
              question: '¿Qué significa SEO?',
              options: ['Social Engine Optimization', 'Search Engine Optimization', 'Sales Engine Optimization', 'Site Engine Optimization'],
              correctAnswer: 1
            },
            {
              id: '2',
              question: '¿Cuál es el principal objetivo del marketing de contenidos?',
              options: ['Vender directamente', 'Generar leads', 'Educar y atraer audiencia', 'Aumentar seguidores'],
              correctAnswer: 2
            }
          ]
        },
        {
          id: '2',
          title: 'Estrategias de Redes Sociales',
          content: 'Las redes sociales son plataformas clave para conectar con audiencias. Cada plataforma tiene sus propias características: Instagram es visual, LinkedIn es profesional, TikTok es creativo. Aprenderás a desarrollar estrategias específicas para cada red social y medir su efectividad.',
          questions: [
            {
              id: '1',
              question: '¿Cuál es la red social más adecuada para contenido profesional?',
              options: ['Instagram', 'TikTok', 'LinkedIn', 'Snapchat'],
              correctAnswer: 2
            },
            {
              id: '2',
              question: '¿Qué es el engagement rate?',
              options: ['Número de seguidores', 'Porcentaje de interacción', 'Cantidad de posts', 'Tiempo de permanencia'],
              correctAnswer: 1
            }
          ]
        }
      ]
    }
  ];

  const fetchCourses = async () => {
    console.log('🚀 Simulando carga de cursos desde PDFs...');
    
    try {
      setLoading(true);
      setError(null);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('✅ Cursos mock generados exitosamente:', mockCourses);
      setCourses(mockCourses);
      
      toast({
        title: "Cursos cargados exitosamente",
        description: `Se cargaron ${mockCourses.length} cursos generados desde PDFs.`,
      });
      
    } catch (error) {
      console.error('❌ Error al cargar cursos:', error);
      setError('Error al cargar los cursos');
      
      toast({
        title: "Error al cargar cursos",
        description: "No se pudieron cargar los cursos generados.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOnboarded) {
      fetchCourses();
    }
  }, [isOnboarded]);

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToList = () => {
    setSelectedCourse(null);
  };

  const handleManualRetry = () => {
    fetchCourses();
  };

  // Si no está onboarded, mostrar onboarding
  if (!isOnboarded) {
    return <StudentOnboarding onComplete={completeOnboarding} />;
  }

  // Si hay un curso seleccionado, mostrar el componente del curso
  if (selectedCourse) {
    return (
      <GeneratedCourse 
        course={selectedCourse} 
        studentName={studentName}
        onBack={handleBackToList} 
      />
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">Mis Cursos</h3>
        <p className="text-gray-300">
          Bienvenido {studentName}, aquí están tus cursos generados desde PDFs
        </p>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-500/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-200">
            <div className="space-y-2">
              <div><strong>Error:</strong> {error}</div>
              <div className="flex space-x-2 mt-3">
                <Button
                  onClick={handleManualRetry}
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-200 hover:bg-red-500 hover:text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reintentar
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" />
          <p className="text-gray-300">Procesando PDFs y generando cursos...</p>
          <p className="text-gray-500 text-sm mt-2">Analizando contenido y creando módulos</p>
        </div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-gray-300 mb-2">
            No hay cursos disponibles
          </h4>
          <p className="text-gray-400 mb-6">
            Sube un PDF para generar tu primer curso automáticamente.
          </p>
          <Button
            onClick={handleManualRetry}
            variant="outline"
            className="border-gray-600 text-white hover:bg-blue-500 hover:text-white hover:border-blue-500"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualizar lista
          </Button>
        </div>
      )}

      {!loading && !error && courses.length > 0 && (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-300">
              {courses.length} curso{courses.length !== 1 ? 's' : ''} generados desde PDFs
            </p>
            <Button
              onClick={handleManualRetry}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <Card 
                key={course.id || index}
                className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-white mb-2 line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {course.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.modules?.length || 0} módulos
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                      PDF
                    </div>
                  </div>

                  {course.pdfFileName && (
                    <div className="text-xs text-blue-400 bg-blue-500/10 p-2 rounded">
                      📄 Generado desde: {course.pdfFileName}
                    </div>
                  )}

                  {course.createdAt && (
                    <div className="text-xs text-gray-500">
                      🕒 {new Date(course.createdAt).toLocaleDateString('es-ES')}
                    </div>
                  )}

                  <Button 
                    onClick={() => handleStartCourse(course)}
                    className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Curso
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesList;
