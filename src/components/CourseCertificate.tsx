
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Download, ArrowLeft, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateCertificatePDF } from '@/utils/pdfGenerator';

interface CourseCertificateProps {
  courseName: string;
  studentName: string;
  onBack: () => void;
  onNewCourse: () => void;
}

const CourseCertificate = ({ courseName, studentName, onBack, onNewCourse }: CourseCertificateProps) => {
  const { toast } = useToast();
  const currentDate = new Date().toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleDownload = async () => {
    try {
      toast({
        title: "Generando certificado...",
        description: "Por favor espera mientras se genera tu PDF",
      });

      await generateCertificatePDF(courseName, studentName, currentDate);
      
      toast({
        title: "¡Certificado descargado!",
        description: "Tu certificado se ha descargado exitosamente como PDF",
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      toast({
        title: "Error al generar PDF",
        description: "No se pudo generar el certificado. Intenta de nuevo.",
        variant: "destructive"
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificado de ${courseName}`,
        text: `¡He completado exitosamente el curso "${courseName}" en IA Academy!`,
        url: window.location.href,
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      const text = `¡He completado exitosamente el curso "${courseName}" en IA Academy!`;
      navigator.clipboard.writeText(text).then(() => {
        toast({
          title: "Texto copiado",
          description: "El texto se ha copiado al portapapeles para compartir",
        });
      });
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al curso
        </Button>
        
        <Button
          onClick={onNewCourse}
          className="bg-yellow-500 hover:bg-yellow-400 text-black"
        >
          Crear nuevo curso
        </Button>
      </div>

      {/* Celebration */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-12 h-12 text-yellow-400" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">¡Felicidades!</h2>
        <p className="text-xl text-gray-300">Has completado exitosamente el curso</p>
      </div>

      {/* Certificate */}
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500/30">
        <CardContent className="p-12">
          <div className="text-center space-y-6">
            {/* Logo/Header */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                <Award className="w-8 h-8 text-black" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-white">IA Academy</h1>
                <p className="text-gray-400">Certificado de Finalización</p>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="border-t border-b border-gray-600 py-6">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                CERTIFICADO DE FINALIZACIÓN
              </h2>
              <p className="text-gray-300">
                Se otorga este certificado a
              </p>
            </div>

            {/* Student Name */}
            <div className="py-4">
              <div className="text-4xl font-bold text-white mb-2 border-b-2 border-gray-600 pb-2 inline-block">
                {studentName}
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-4">
              <p className="text-lg text-gray-300">
                Por completar exitosamente el curso
              </p>
              <h3 className="text-2xl font-bold text-white">
                {courseName}
              </h3>
              <p className="text-gray-400">
                Fecha de finalización: {currentDate}
              </p>
            </div>

            {/* Signature Area */}
            <div className="flex justify-between items-end pt-8 mt-8 border-t border-gray-600">
              <div className="text-center">
                <div className="w-32 h-0.5 bg-gray-600 mb-2"></div>
                <p className="text-sm text-gray-400">Instructor</p>
                <p className="text-white font-semibold">IA Academy</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mb-2">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <p className="text-xs text-gray-400">Certificado digital</p>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-0.5 bg-gray-600 mb-2"></div>
                <p className="text-sm text-gray-400">Fecha</p>
                <p className="text-white font-semibold">{currentDate}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center space-x-4 mt-8">
        <Button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-400 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Descargar PDF
        </Button>
        
        <Button
          onClick={handleShare}
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          <Share className="w-4 h-4 mr-2" />
          Compartir
        </Button>
      </div>
    </div>
  );
};

export default CourseCertificate;
