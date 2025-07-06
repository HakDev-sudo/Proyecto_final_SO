import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import GeneratedCourse from './GeneratedCourse';

interface GeneratedCourseData {
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
}

const PDFUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [generatingCourse, setGeneratingCourse] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<GeneratedCourseData | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const { toast } = useToast();

  // URL corregida de la API
  const API_BASE_URL = 'https://52qi7tj2k2.execute-api.us-east-1.amazonaws.com/Produccion';
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: "Error",
          description: "Solo se permiten archivos PDF",
          variant: "destructive"
        });
        return;
      }
      
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "Error",
          description: "El archivo es demasiado grande (máximo 10MB)",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      setUploadSuccess(false);
      setApiError(null);
    }
  };

  const uploadToAPI = async () => {
    if (!file) return;

    console.log('🚀 Solicitando URL pre-firmada para:', file.name);
    console.log('📡 URL del endpoint:', `${API_BASE_URL}/uploads`);
    console.log('🌐 Origen de la petición:', window.location.origin);
    
    try {
      const response = await fetch(`${API_BASE_URL}/uploads`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type
        })
      });

      console.log('📊 Respuesta del servidor:', response.status, response.statusText);
      console.log('📋 Headers de respuesta:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
      }

      const result = await response.json();
      console.log('✅ URL pre-firmada obtenida:', result);

      return result.uploadURL;
    } catch (error) {
      console.error('❌ Error obteniendo URL pre-firmada:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        if (error.message.includes('CORS') || window.location.href.includes('lovable')) {
          throw new Error('Error de CORS: El servidor API necesita configurar los headers CORS para permitir peticiones desde este dominio. Contacta al administrador del sistema.');
        }
        throw new Error('Error de conectividad: No se puede acceder al servidor API. Verifica tu conexión a internet.');
      }
      
      throw error;
    }
  };

  const uploadFileToS3 = async (uploadURL: string) => {
    if (!file) return;

    console.log('📤 Subiendo archivo directamente a S3 usando URL pre-firmada...');
    console.log('🔗 URL de S3:', uploadURL);
    
    try {
      const response = await fetch(uploadURL, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        }
      });

      console.log('📊 Respuesta de S3:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error al subir a S3:', errorText);
        throw new Error(`Error al subir a S3: ${response.status} - ${response.statusText}`);
      }

      console.log('✅ Archivo subido a S3 exitosamente');
      
      // Extraer la URL del archivo sin los parámetros de query
      const fileUrl = uploadURL.split('?')[0];
      console.log('🔗 URL final del archivo:', fileUrl);
      return fileUrl;
    } catch (error) {
      console.error('❌ Error subiendo a S3:', error);
      throw error;
    }
  };

  const generateCourseFromAPI = async (fileUrl: string) => {
    if (!file) return;

    console.log('🚀 Generando curso con API desde:', fileUrl);
    console.log('📡 URL del endpoint:', `${API_BASE_URL}/uploads`);
    
    try {
      const response = await fetch(`${API_BASE_URL}/uploads`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          action: 'generateCourse',
          fileUrl: fileUrl,
          fileName: file.name,
          fileType: file.type
        })
      });

      console.log('📊 Respuesta del servidor para generar curso:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('❌ Error al generar curso:', errorData);
        throw new Error(`Error al generar curso: ${response.status} - ${errorData || response.statusText}`);
      }

      const courseData = await response.json();
      console.log('✅ Curso generado exitosamente:', courseData);

      return courseData;
    } catch (error) {
      console.error('❌ Error al generar curso:', error);
      throw error;
    }
  };

  const uploadPDF = async () => {
    if (!file) return;

    setUploading(true);
    setApiError(null);
    
    try {
      console.log('🔄 Iniciando proceso completo de carga...');
      
      // Paso 1: Obtener URL pre-firmada
      console.log('📋 Paso 1: Obteniendo URL pre-firmada...');
      const uploadURL = await uploadToAPI();
      
      if (!uploadURL) {
        throw new Error('No se pudo obtener la URL de carga');
      }

      // Paso 2: Subir archivo a S3
      console.log('📋 Paso 2: Subiendo archivo a S3...');
      const fileUrl = await uploadFileToS3(uploadURL);
      
      if (!fileUrl) {
        throw new Error('No se pudo subir el archivo a S3');
      }

      console.log('✅ Archivo subido exitosamente a S3');
      setUploadSuccess(true);
      setGeneratingCourse(true);

      // Paso 3: Generar curso
      try {
        console.log('📋 Paso 3: Generando curso...');
        const courseData = await generateCourseFromAPI(fileUrl);
        
        if (courseData && courseData.curso) {
          // Si la API devuelve datos de curso válidos
          const formattedCourse = {
            id: courseData.curso.id || Date.now().toString(),
            title: courseData.curso.title || courseData.curso.titulo || `Curso basado en: ${file.name}`,
            description: courseData.curso.description || courseData.curso.descripcion || `Curso generado automáticamente a partir del archivo ${file.name}`,
            modules: courseData.curso.modules || courseData.curso.modulos || [
              {
                id: '1',
                title: 'Módulo 1: Contenido del Archivo',
                content: courseData.curso.content || courseData.curso.contenido || `Contenido extraído de ${file.name}`,
                questions: courseData.curso.questions || courseData.curso.preguntas || [
                  {
                    id: '1',
                    question: '¿El archivo se procesó correctamente?',
                    options: ['Sí, se procesó exitosamente', 'No, hubo un error', 'No estoy seguro', 'Necesito verificar'],
                    correctAnswer: 0
                  }
                ]
              }
            ]
          };
          setGeneratedCourse(formattedCourse);
        } else {
          // Crear estructura de datos válida como fallback
          const mockCourseData: GeneratedCourseData = {
            id: Date.now().toString(),
            title: `Curso basado en: ${file.name}`,
            description: `Curso generado automáticamente a partir del archivo ${file.name}`,
            modules: [
              {
                id: '1',
                title: 'Módulo 1: Introducción',
                content: `Contenido extraído de ${file.name}. El archivo ha sido subido exitosamente a S3 en: ${fileUrl}`,
                questions: [
                  {
                    id: '1',
                    question: '¿El archivo se subió correctamente?',
                    options: ['Sí, se subió exitosamente', 'No, hubo un error', 'No estoy seguro', 'Necesito verificar'],
                    correctAnswer: 0
                  }
                ]
              }
            ]
          };
          setGeneratedCourse(mockCourseData);
        }
      } catch (courseError) {
        console.error('⚠️ Error al generar curso (pero archivo subido exitosamente):', courseError);
        
        // Crear curso válido si falla la generación
        const mockCourseData: GeneratedCourseData = {
          id: Date.now().toString(),
          title: `Archivo procesado: ${file.name}`,
          description: `El archivo ${file.name} se subió exitosamente. URL: ${fileUrl}`,
          modules: [
            {
              id: '1',
              title: 'Archivo Subido Exitosamente',
              content: `Tu archivo ${file.name} se ha subido correctamente a S3. URL del archivo: ${fileUrl}`,
              questions: [
                {
                  id: '1',
                  question: '¿El proceso de carga fue exitoso?',
                  options: ['Sí, completamente exitoso', 'Parcialmente exitoso', 'No exitoso', 'No estoy seguro'],
                  correctAnswer: 0
                }
              ]
            }
          ]
        };
        setGeneratedCourse(mockCourseData);
      }
      
      toast({
        title: "¡Proceso completado!",
        description: "Archivo subido exitosamente a S3",
      });

    } catch (error) {
      console.error('❌ Error en el proceso completo:', error);
      const errorMessage = error instanceof Error ? error.message : "Error al procesar el archivo";
      
      setApiError(errorMessage);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      setGeneratingCourse(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadSuccess(false);
    setGeneratedCourse(null);
    setApiError(null);
    const input = document.getElementById('pdf-input') as HTMLInputElement;
    if (input) input.value = '';
  };

  // Si hay un curso generado, mostrar el componente del curso
  if (generatedCourse) {
    return <GeneratedCourse course={generatedCourse} onBack={resetUpload} />;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover-lift">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-yellow-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Crear Curso desde PDF</h3>
        <p className="text-gray-400">
          Sube tu PDF y la IA creará un curso completo automáticamente
        </p>
      </div>

      {/* Mostrar error de API si existe */}
      {apiError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Error de conexión:</strong> {apiError}
            <br />
            {apiError.includes('CORS') && (
              <span className="text-sm mt-2 block">
                <strong>Problema detectado:</strong> El servidor API necesita configurar CORS.<br />
                <strong>Solución:</strong> El administrador debe agregar tu dominio ({window.location.origin}) a los headers CORS del servidor.
              </span>
            )}
            {!apiError.includes('CORS') && (
              <span className="text-sm mt-2 block">
                Verifica tu conexión a internet o contacta al administrador del sistema.
              </span>
            )}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {!file && !uploadSuccess && (
          <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-yellow-400/50 transition-colors">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-4">Selecciona un archivo PDF</p>
            <Input
              id="pdf-input"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="bg-gray-800 border-gray-700 text-white file:bg-yellow-500 file:text-black file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4"
            />
            <p className="text-sm text-gray-500 mt-2">Máximo 10MB</p>
          </div>
        )}

        {file && !uploadSuccess && (
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <Button
                onClick={resetUpload}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                Cambiar
              </Button>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={uploadPDF}
                disabled={uploading || generatingCourse}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold flex-1"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Subiendo a S3...
                  </>
                ) : generatingCourse ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generando curso...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Subir a S3
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {uploadSuccess && generatingCourse && (
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 text-center">
            <Loader2 className="w-12 h-12 text-blue-400 mx-auto mb-4 animate-spin" />
            <h4 className="text-blue-400 font-semibold text-lg mb-2">
              Generando tu curso...
            </h4>
            <p className="text-gray-300 mb-4">
              La IA está analizando tu documento y creando módulos personalizados
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFUpload;
