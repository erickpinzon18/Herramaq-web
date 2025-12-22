'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar';

interface HeaderProps {
    activeTab: string;
}

export const Header = ({ activeTab }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Inicio',
      link: '/',
    },
    {
      name: 'Productos',
      link: '/products',
    },
    {
      name: 'Servicios',
      link: '/services',
    },
    {
      name: 'Contacto',
      link: '/contact',
    },
  ];

  return (
    <Navbar className="sticky top-0">
      {/* Desktop Navigation */}
      <NavBody className="bg-white/95 backdrop-blur-md border-b border-slate-200">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo4k.jpeg" 
            alt="Logo de Herramaq" 
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="text-xl font-black text-blue-900 tracking-wide">HERRAMAQ</span>
        </Link>

        {/* Nav Items Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, idx) => (
            <Link
              key={`nav-${idx}`}
              href={item.link}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === item.name
                  ? 'text-slate-800 bg-slate-100'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <NavbarButton 
            href="/contact"
            variant="primary" 
            className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-blue-950 text-white font-semibold"
          >
            Cotiza Ahora
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="bg-white/95 backdrop-blur-md border-b border-slate-200">
        <MobileNavHeader>
          {/* Logo Mobile */}
          <Link href="/" className="relative w-[150px] h-10 flex items-center">
            <Image 
              src="/LogoIcon.jpeg" 
              alt="Logo de Herramaq" 
              fill
              className="object-contain"
              sizes="150px"
              priority
            />
          </Link>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 ${
                activeTab === item.name
                  ? 'text-slate-800 bg-slate-100'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* CTA Button Mobile */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <NavbarButton
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-blue-950 text-white font-semibold"
            >
              Cotiza Ahora
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
};

export const Footer = () => (
    <footer className="text-center mt-20 py-8 border-t border-slate-200 text-slate-500 text-sm">
        <p>&copy; 2025 Herramaq. Todos los derechos reservados.</p>
        <p>Diseñado para la Industria en San Juan del Río, Querétaro.</p>
        <p className="mt-3">
            <a 
                href="https://uphy.mx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
            >
                Powered by <span className="font-semibold">Uphy.mx</span>
            </a>
        </p>
    </footer>
);

// Exportar ChatWidget
export { ChatWidget } from './ChatWidget';
