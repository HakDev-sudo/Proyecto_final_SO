
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CoursesSection from '@/components/CoursesSection';
import BenefitsSection from '@/components/BenefitsSection';
import PDFUpload from '@/components/PDFUpload';
import CoursesList from '@/components/CoursesList';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero />
      <CoursesSection />
      <BenefitsSection />
      
      {/* Nueva sección de cursos generados */}
      <section id="mis-cursos" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CoursesList />
        </div>
      </section>
      
      {/* Sección de subida de PDF */}
      <section id="upload" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sube tu <span className="text-yellow-400">Documento</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Procesa tus archivos PDF de manera segura y eficiente
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <PDFUpload />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
