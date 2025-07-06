
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Download } from 'lucide-react';
import CourseModule from './CourseModule';
import CourseCertificate from './CourseCertificate';

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

interface GeneratedCourseProps {
  course: Course;
  studentName: string;
  onBack: () => void;
}

const GeneratedCourse = ({ course, studentName, onBack }: GeneratedCourseProps) => {
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleModuleComplete = (moduleId: string) => {
    console.log(`Completando módulo: ${moduleId}`);
    setCompletedModules(prev => new Set([...prev, moduleId]));
    
    // Auto avanzar al siguiente módulo si existe
    if (currentModuleIndex < course.modules.length - 1) {
      setTimeout(() => {
        setCurrentModuleIndex(currentModuleIndex + 1);
      }, 1500);
    } else {
      // Todos los módulos completados, mostrar certificado
      setTimeout(() => {
        setShowCertificate(true);
      }, 1500);
    }
  };

  const handleNewCourse = () => {
    setShowCertificate(false);
    onBack();
  };

  const currentModule = course.modules[currentModuleIndex];
  const isCurrentModuleCompleted = completedModules.has(currentModule?.id);
  const totalCompleted = completedModules.size;
  const progressPercentage = (totalCompleted / course.modules.length) * 100;

  if (showCertificate) {
    return (
      <CourseCertificate
        courseName={course.title}
        studentName={studentName}
        onBack={() => setShowCertificate(false)}
        onNewCourse={handleNewCourse}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a mis cursos
          </Button>
          
          {totalCompleted === course.modules.length && (
            <Button
              onClick={() => setShowCertificate(true)}
              className="bg-green-500 hover:bg-green-400 text-white"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Ver certificado
            </Button>
          )}
        </div>

        {/* Course Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
          <p className="text-gray-300 mb-4">{course.description}</p>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progreso del curso</span>
              <span className="text-white">{totalCompleted}/{course.modules.length} módulos</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Module Navigation */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2">
            {course.modules.map((module, index) => (
              <button
                key={module.id}
                onClick={() => setCurrentModuleIndex(index)}
                className={`w-10 h-10 rounded-full font-semibold transition-all ${
                  completedModules.has(module.id)
                    ? 'bg-green-500 text-white'
                    : index === currentModuleIndex
                    ? 'bg-blue-500 text-white'
                    : index <= currentModuleIndex
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-gray-800 text-gray-400'
                }`}
                disabled={index > currentModuleIndex + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Module */}
        {currentModule && (
          <CourseModule
            key={currentModule.id}
            module={currentModule}
            moduleIndex={currentModuleIndex}
            isCompleted={isCurrentModuleCompleted}
            onComplete={() => handleModuleComplete(currentModule.id)}
          />
        )}

        {/* Course completion message */}
        {totalCompleted === course.modules.length && !showCertificate && (
          <div className="mt-8 text-center">
            <div className="bg-green-900/20 border border-green-500/50 rounded-2xl p-8">
              <Trophy className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                ¡Felicidades, {studentName}!
              </h2>
              <p className="text-green-200 mb-6">
                Has completado exitosamente el curso "{course.title}"
              </p>
              <Button
                onClick={() => setShowCertificate(true)}
                className="bg-green-500 hover:bg-green-400 text-white font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Obtener certificado
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratedCourse;
