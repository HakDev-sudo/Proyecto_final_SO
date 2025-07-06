
import { BookOpen, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Onboarding IA</h3>
                <p className="text-sm text-gray-400">Cursos Empresariales</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Lideramos la transformación digital empresarial a través de programas de formación especializados en Inteligencia Artificial, diseñados para impulsar el crecimiento y la innovación.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-yellow-500 hover:text-black rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#cursos" className="text-gray-400 hover:text-yellow-400 transition-colors">Cursos</a></li>
              <li><a href="#empresas" className="text-gray-400 hover:text-yellow-400 transition-colors">Para Empresas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Certificaciones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Recursos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">Soporte</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div id="contacto">
            <h4 className="text-white font-semibold mb-6">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">info@onboardingia.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">Madrid, España</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Onboarding IA. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Términos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
