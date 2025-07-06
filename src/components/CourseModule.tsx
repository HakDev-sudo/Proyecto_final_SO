
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CourseModuleProps {
  module: {
    id: string;
    title: string;
    content: string;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
  moduleIndex: number;
  isCompleted: boolean;
  onComplete: () => void;
}

const CourseModule = ({ module, moduleIndex, isCompleted, onComplete }: CourseModuleProps) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  const { toast } = useToast();

  const currentQuestion = module.questions[currentQuestionIndex];
  const totalQuestions = module.questions.length;
  const maxAttempts = 3;

  const handleAnswerSelect = (answerIndex: number) => {
    console.log(`Respuesta seleccionada: ${answerIndex} para pregunta ${currentQuestionIndex}`);
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
    setShowValidation(false);
  };

  const validateCurrentAnswer = () => {
    const selectedAnswer = selectedAnswers[currentQuestionIndex];
    if (selectedAnswer === undefined) {
      setShowValidation(true);
      toast({
        title: "Respuesta requerida",
        description: "Por favor selecciona una respuesta antes de continuar.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleNextQuestion = () => {
    console.log(`Avanzando pregunta. Actual: ${currentQuestionIndex}, Total: ${totalQuestions}`);
    
    if (!validateCurrentAnswer()) return;

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calcular puntuación final
      let correctAnswers = 0;
      module.questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      
      const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
      console.log(`Puntuación final: ${finalScore}% (${correctAnswers}/${totalQuestions})`);
      
      setScore(finalScore);
      setShowResults(true);
      setAttemptCount(prev => prev + 1);

      if (finalScore >= 70) {
        toast({
          title: "¡Módulo completado!",
          description: `Puntuación: ${finalScore}% - ¡Excelente trabajo!`,
        });
        // Llamar onComplete después de un pequeño delay
        setTimeout(() => {
          onComplete();
        }, 1000);
      } else {
        if (attemptCount + 1 >= maxAttempts) {
          toast({
            title: "Límite de intentos alcanzado",
            description: "Has alcanzado el máximo de intentos. Revisa el contenido y contacta a tu instructor.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Necesitas mejorar",
            description: `Puntuación: ${finalScore}% - Intenta de nuevo (mínimo 70%). Intentos restantes: ${maxAttempts - (attemptCount + 1)}`,
            variant: "destructive"
          });
        }
      }
    }
  };

  const resetQuiz = () => {
    if (attemptCount >= maxAttempts) {
      toast({
        title: "Sin intentos disponibles",
        description: "Has alcanzado el máximo de intentos permitidos.",
        variant: "destructive"
      });
      return;
    }

    console.log("Reiniciando quiz...");
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setShowValidation(false);
  };

  if (isCompleted && !showQuestions) {
    return (
      <Card className="bg-green-900/20 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {module.title} - Completado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">{module.content}</p>
          <Button
            onClick={() => setShowQuestions(true)}
            variant="outline"
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            Revisar preguntas
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const canRetry = attemptCount < maxAttempts && score < 70;
    
    return (
      <Card className="bg-gray-800 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Resultados del {module.title}</span>
            {score >= 70 ? (
              <CheckCircle className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${score >= 70 ? 'text-green-400' : 'text-red-400'}`}>
              {score}%
            </div>
            <p className="text-gray-300">
              {score >= 70 
                ? '¡Felicidades! Has completado este módulo.' 
                : `Necesitas al menos 70% para aprobar. Intentos utilizados: ${attemptCount}/${maxAttempts}`}
            </p>
          </div>

          {score < 70 && attemptCount >= maxAttempts && (
            <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg">
              <div className="flex items-center text-red-400 mb-2">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Límite de intentos alcanzado</span>
              </div>
              <p className="text-red-200 text-sm">
                Has utilizado todos los intentos disponibles. Te recomendamos revisar el contenido del módulo 
                y contactar a tu instructor para obtener ayuda adicional.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-white font-semibold">Resumen detallado:</h4>
            {module.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="p-3 bg-gray-700 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Pregunta {index + 1}</span>
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{question.question}</p>
                  <div className="text-xs">
                    <span className="text-gray-400">Tu respuesta: </span>
                    <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                      {question.options[userAnswer] || 'Sin respuesta'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="text-xs mt-1">
                      <span className="text-gray-400">Respuesta correcta: </span>
                      <span className="text-green-400">
                        {question.options[question.correctAnswer]}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex space-x-3">
            {canRetry && (
              <Button
                onClick={resetQuiz}
                className="bg-yellow-500 hover:bg-yellow-400 text-black flex-1"
              >
                Intentar de nuevo ({maxAttempts - attemptCount} intentos restantes)
              </Button>
            )}
            <Button
              onClick={() => setShowQuestions(false)}
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-700"
            >
              Volver al módulo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showQuestions) {
    const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;
    
    return (
      <Card className="bg-gray-800 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>{module.title}</span>
            <div className="text-sm text-gray-400">
              <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
              {attemptCount > 0 && (
                <span className="ml-2 text-yellow-400">
                  (Intento {attemptCount + 1}/{maxAttempts})
                </span>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg text-white mb-4">{currentQuestion.question}</h3>
            
            {showValidation && (
              <div className="bg-red-900/20 border border-red-500/50 p-3 rounded-lg mb-4">
                <div className="flex items-center text-red-400">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Por favor selecciona una respuesta antes de continuar</span>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  variant="outline"
                  className={`w-full text-left justify-start p-4 h-auto transition-all ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                      : showValidation && !isAnswerSelected
                      ? 'border-red-500/50 text-gray-300 hover:bg-red-900/10'
                      : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3 font-semibold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              onClick={() => setShowQuestions(false)}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              Volver al contenido
            </Button>
            
            <Button
              onClick={handleNextQuestion}
              className={`font-semibold ${
                isAnswerSelected 
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-black' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!isAnswerSelected}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'Finalizar evaluación' : 'Siguiente pregunta'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">{module.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 leading-relaxed">{module.content}</p>
        
        <div className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-white font-semibold mb-2">En este módulo aprenderás:</h4>
          <ul className="text-gray-300 space-y-1">
            <li>• Conceptos fundamentales del tema</li>
            <li>• Aplicación práctica de los conocimientos</li>
            <li>• Evaluación a través de {totalQuestions} preguntas</li>
          </ul>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/50 p-4 rounded-lg">
          <h4 className="text-blue-400 font-semibold mb-2">Criterios de evaluación:</h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Puntuación mínima requerida: 70%</li>
            <li>• Máximo de intentos permitidos: {maxAttempts}</li>
            <li>• Las respuestas se validan automáticamente</li>
            <li>• Recibirás retroalimentación detallada</li>
          </ul>
        </div>

        <Button
          onClick={() => setShowQuestions(true)}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
        >
          Comenzar evaluación
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CourseModule;
