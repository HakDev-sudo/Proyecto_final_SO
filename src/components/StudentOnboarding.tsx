
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, ArrowRight, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentOnboardingProps {
  onComplete: (studentName: string) => void;
}

const StudentOnboarding = ({ onComplete }: StudentOnboardingProps) => {
  const [studentName, setStudentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentName.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Por favor ingresa tu nombre completo.",
        variant: "destructive"
      });
      return;
    }

    if (studentName.trim().length < 2) {
      toast({
        title: "Nombre muy corto",
        description: "Por favor ingresa tu nombre completo.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simular proceso de registro
    setTimeout(() => {
      localStorage.setItem('studentName', studentName.trim());
      onComplete(studentName.trim());
      setIsLoading(false);
      
      toast({
        title: "¡Bienvenido!",
        description: `Hola ${studentName.trim()}, ya puedes comenzar tus cursos.`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-yellow-400" />
          </div>
          <CardTitle className="text-2xl text-white mb-2">
            ¡Bienvenido a IA Academy!
          </CardTitle>
          <p className="text-gray-300">
            Para comenzar con tus cursos, necesitamos conocerte mejor
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="studentName" className="text-white">
                Nombre completo *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Escribe tu nombre completo"
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-2">¿Por qué necesitamos tu nombre?</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Para personalizar tu experiencia de aprendizaje</li>
                <li>• Para generar certificados oficiales con tu nombre</li>
                <li>• Para llevar registro de tu progreso académico</li>
              </ul>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
            >
              {isLoading ? (
                <>Configurando tu perfil...</>
              ) : (
                <>
                  Comenzar mi aprendizaje
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentOnboarding;
