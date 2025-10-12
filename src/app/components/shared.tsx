'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
    activeTab: string;
}

export const Header = ({ activeTab }: HeaderProps) => (
    <header className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-4 mb-8 sticky top-4 z-50">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="relative w-[200px] h-10 mb-4 md:mb-0">
          <Image 
            src="https://irp.cdn-website.com/e09cfb20/DESKTOP/png/235.png" 
            alt="Logo de Herramaq" 
            fill
            className="object-contain cursor-pointer"
            sizes="200px"
            priority
          />
        </Link>
        <nav className="flex flex-wrap justify-center space-x-6 text-base font-medium text-slate-600">
          <Link href="/" className={`p-2 border-b-2 ${activeTab === 'Inicio' ? 'border-blue-800 text-blue-800' : 'border-transparent'} hover:text-blue-800 transition-colors`}>
            Inicio
          </Link>
          <Link href="/products" className={`p-2 border-b-2 ${activeTab === 'Productos' ? 'border-blue-800 text-blue-800' : 'border-transparent'} hover:text-blue-800 transition-colors`}>
            Productos
          </Link>
          <Link href="/services" className={`p-2 border-b-2 ${activeTab === 'Servicios' ? 'border-blue-800 text-blue-800' : 'border-transparent'} hover:text-blue-800 transition-colors`}>
            Servicios
          </Link>
          <Link href="/contact" className={`p-2 border-b-2 ${activeTab === 'Contacto' ? 'border-blue-800 text-blue-800' : 'border-transparent'} hover:text-blue-800 transition-colors`}>
            Contacto
          </Link>
        </nav>
      </div>
    </header>
);

export const Footer = () => (
    <footer className="text-center mt-20 py-8 border-t border-slate-200 text-slate-500 text-sm">
        <p>&copy; 2024 Herramaq. Todos los derechos reservados.</p>
        <p>Diseñado para la Industria en San Juan del Río, Querétaro.</p>
    </footer>
);
