'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Header, Footer } from '../components';
import { ACSpotlight } from '../components/aceternity/Spotlight';
import { ACMeteors } from '../components/aceternity/Meteors';
import { ACBackgroundBeams } from '../components/aceternity/BackgroundBeams';
import { WobbleCard } from '@/components/ui/wobble-card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// --- Tipos ---
interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// --- Componente principal de la página de contacto ---
export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });
    
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const formRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const contactCardsRef = useRef<HTMLDivElement>(null);

    // GSAP Animations
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const ctx = gsap.context(() => {
            // Animación del formulario
            if (formRef.current) {
                gsap.from(formRef.current.querySelectorAll('.form-field'), {
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: 'top 80%',
                    },
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            }

            // Animación de las stats
            if (statsRef.current) {
                gsap.from(statsRef.current.querySelectorAll('.stat-card'), {
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 80%',
                    },
                    opacity: 0,
                    scale: 0.8,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                });
            }

            // Animación de las contact cards
            if (contactCardsRef.current) {
                gsap.from(contactCardsRef.current.querySelectorAll('.contact-card'), {
                    scrollTrigger: {
                        trigger: contactCardsRef.current,
                        start: 'top 80%',
                    },
                    opacity: 0,
                    y: 50,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            }
        });

        return () => ctx.revert();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (status === 'error') {
            setStatus('idle');
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el mensaje');
            }

            setStatus('success');
            
            // Animación de éxito
            if (formRef.current) {
                gsap.from('.success-message', {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5,
                    ease: 'back.out(2)'
                });
            }

            setTimeout(() => {
                setFormData({ name: '', email: '', phone: '', company: '', message: '' });
                setStatus('idle');
            }, 3000);

        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el mensaje');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header activeTab="Contacto" />

            {/* Hero Section */}
            <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 mb-16">
                <ACSpotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#60a5fa" />
                <ACMeteors number={30} />

                <div className="relative z-10 w-full px-4 md:px-8 lg:px-16">
                    <div className="max-w-5xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                            Contáctanos
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
                            Estamos aquí para transformar tu visión en realidad. Contacta con nuestro equipo de expertos.
                        </p>
                    </div>
                </div>
            </section>

            <div className="w-full px-4 md:px-8 max-w-[1400px] mx-auto">

                {/* Formulario e Información de Contacto */}
                <section className="mb-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* Formulario con mejor diseño */}
                            <div ref={formRef} className="lg:col-span-2">
                                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-slate-200">
                                    
                                    <div className="relative z-10">
                                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                            Envíanos tu Proyecto
                                        </h2>
                                        <p className="text-slate-600 mb-6 text-base">
                                            Completa el formulario y recibe una cotización personalizada en menos de 24 horas
                                        </p>

                                        {/* Mensaje de éxito */}
                                        {status === 'success' && (
                                            <div className="success-message mb-5 p-5 bg-green-50 border-2 border-green-200 rounded-xl">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-green-900 font-bold">¡Mensaje Enviado!</p>
                                                        <p className="text-green-700 text-sm">Nos pondremos en contacto pronto.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Mensaje de error */}
                                        {status === 'error' && (
                                            <div className="mb-5 p-5 bg-red-50 border-2 border-red-200 rounded-xl">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-red-900 font-bold">Error al Enviar</p>
                                                        <p className="text-red-700 text-sm">{errorMessage || 'Por favor intenta nuevamente.'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="form-field">
                                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Nombre Completo *
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        name="name" 
                                                        id="name" 
                                                        required 
                                                        value={formData.name} 
                                                        onChange={handleInputChange}
                                                        disabled={status === 'submitting'}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 bg-white"
                                                        placeholder="Juan Pérez"
                                                    />
                                                </div>
                                                <div className="form-field">
                                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Correo Electrónico *
                                                    </label>
                                                    <input 
                                                        type="email" 
                                                        name="email" 
                                                        id="email" 
                                                        required 
                                                        value={formData.email} 
                                                        onChange={handleInputChange}
                                                        disabled={status === 'submitting'}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 bg-white"
                                                        placeholder="juan@empresa.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="form-field">
                                                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Teléfono
                                                    </label>
                                                    <input 
                                                        type="tel" 
                                                        name="phone" 
                                                        id="phone" 
                                                        value={formData.phone} 
                                                        onChange={handleInputChange}
                                                        disabled={status === 'submitting'}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 bg-white"
                                                        placeholder="(427) 123 4567"
                                                    />
                                                </div>
                                                <div className="form-field">
                                                    <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Empresa
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        name="company" 
                                                        id="company" 
                                                        value={formData.company} 
                                                        onChange={handleInputChange}
                                                        disabled={status === 'submitting'}
                                                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 bg-white"
                                                        placeholder="Tu Empresa S.A."
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-field">
                                                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                                                    Cuéntanos sobre tu Proyecto *
                                                </label>
                                                <textarea 
                                                    name="message" 
                                                    id="message" 
                                                    rows={5} 
                                                    required 
                                                    value={formData.message} 
                                                    onChange={handleInputChange}
                                                    disabled={status === 'submitting'}
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 resize-none bg-white"
                                                    placeholder="Describe los detalles de tu proyecto, materiales, cantidades, especificaciones técnicas..."
                                                ></textarea>
                                            </div>

                                            <div className="form-field">
                                                <button
                                                    type="submit"
                                                    disabled={status === 'submitting'}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-8 rounded-lg text-base disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                                >
                                                    {status === 'submitting' ? (
                                                        <>
                                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            <span>Enviando...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                            </svg>
                                                            <span>Enviar Proyecto</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Información de Contacto - BentoGrid */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 md:p-8 text-white">
                                    <h3 className="text-xl font-bold mb-5">
                                        Información de Contacto
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        {/* Dirección */}
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1 text-sm">Dirección</h4>
                                                <p className="text-blue-100 text-sm">
                                                    San Juan del Río<br />
                                                    Querétaro, México
                                                </p>
                                            </div>
                                        </div>

                                        {/* Teléfono */}
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1 text-sm">Teléfono</h4>
                                                <p className="text-blue-100 text-sm">(427) 123 4567</p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1 text-sm">Email</h4>
                                                <p className="text-blue-100 text-sm">ventas@herramaq.com</p>
                                            </div>
                                        </div>

                                        {/* Horario */}
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold mb-1 text-sm">Horario</h4>
                                                <p className="text-blue-100 text-sm">
                                                    Lunes a Viernes: 8:00 AM - 6:00 PM<br />
                                                    Sábados: 9:00 AM - 1:00 PM
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Redes Sociales */}
                                    <div className="mt-6 pt-6 border-t border-white/20">
                                        <h4 className="font-semibold mb-3 text-sm">Síguenos</h4>
                                        <div className="flex gap-2">
                                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                </svg>
                                            </a>
                                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                </svg>
                                            </a>
                                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mapa */}
                <section className="mb-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                                Nuestra Ubicación
                            </h2>
                            <p className="text-lg text-slate-600">
                                Visítanos en San Juan del Río, Querétaro
                            </p>
                        </div>
                        
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                            <div className="h-[500px] w-full">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59943.91081510254!2d-100.03816552089843!3d20.384299800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d30a4699555555%3A0x42cf5353595c207a!2sSan%20Juan%20del%20R%C3%ADo%2C%20Qro.!5e0!3m2!1ses-419!2smx!4v1665523456789!5m2!1ses-419!2smx" 
                                    width="100%" 
                                    height="100%" 
                                    style={{ border:0 }} 
                                    allowFullScreen={true}
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Final con Background Beams */}
                <section className="mb-16 relative rounded-2xl overflow-hidden">
                    <div className="relative bg-gradient-to-br from-blue-600 via-blue-800 to-blue-950 py-16 px-8">
                        <ACBackgroundBeams />
                        <div className="relative z-10 text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                ¿Listo para Empezar tu Proyecto?
                            </h2>
                            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                Únete a cientos de empresas que confían en Herramaq
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <button className="px-8 py-3 rounded-lg bg-white text-blue-900 font-bold text-base hover:bg-blue-50 transition-all duration-300 shadow-lg">
                                    Solicitar Cotización
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}

