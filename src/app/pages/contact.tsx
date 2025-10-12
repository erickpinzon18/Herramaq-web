'use client';

import React, { useState } from 'react';
import { Header, Footer } from '../components/shared';

// --- Tipos ---
interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface HeaderProps {
    activeTab: string;
}

// --- Iconos SVG ---
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const ClockIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Reset error cuando el usuario empieza a escribir
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
            // Limpiar formulario después de 3 segundos
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
        <div className="bg-slate-50 min-h-screen">
            <div className="w-full px-4 md:px-8">
                
                <Header activeTab="Contacto" />

                {/* Encabezado de la página */}
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">Ponte en Contacto con Nosotros</h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">Estamos aquí para ayudarte. Envíanos un mensaje o visítanos, nuestro equipo de expertos está listo para asesorarte.</p>
                </header>

                <main>
                    {/* Sección de Información y Formulario */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
                        {/* Columna de Información de Contacto */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 h-full">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Información de Contacto</h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <MapPinIcon />
                                    <div>
                                        <h4 className="font-semibold text-slate-700">Dirección</h4>
                                        <p className="text-slate-600">Av. Central 123, Parque Industrial, San Juan del Río, Qro., México</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <PhoneIcon />
                                    <div>
                                        <h4 className="font-semibold text-slate-700">Teléfono</h4>
                                        <p className="text-slate-600">(427) 123 4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <MailIcon />
                                    <div>
                                        <h4 className="font-semibold text-slate-700">Correo Electrónico</h4>
                                        <p className="text-slate-600">ventas@herramaq.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <ClockIcon />
                                    <div>
                                        <h4 className="font-semibold text-slate-700">Horario de Atención</h4>
                                        <p className="text-slate-600">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                                        <p className="text-slate-600">Sábados: 9:00 AM - 1:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Columna de Formulario */}
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 h-full">
                             <h3 className="text-2xl font-bold text-slate-800 mb-6">Envíanos un Mensaje</h3>
                             
                             {/* Mensaje de éxito */}
                             {status === 'success' && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-green-800 font-medium">✓ Mensaje enviado correctamente. Nos pondremos en contacto pronto.</p>
                                </div>
                             )}
                             
                             {/* Mensaje de error */}
                             {status === 'error' && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-800 font-medium">✗ {errorMessage || 'Error al enviar el mensaje. Por favor intente nuevamente.'}</p>
                                </div>
                             )}
                             
                             <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo *</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        required 
                                        value={formData.name} 
                                        onChange={handleInputChange}
                                        disabled={status === 'submitting'}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico *</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        required 
                                        value={formData.email} 
                                        onChange={handleInputChange}
                                        disabled={status === 'submitting'}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        id="phone" 
                                        value={formData.phone} 
                                        onChange={handleInputChange}
                                        disabled={status === 'submitting'}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                                    <input 
                                        type="text" 
                                        name="company" 
                                        id="company" 
                                        value={formData.company} 
                                        onChange={handleInputChange}
                                        disabled={status === 'submitting'}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensaje *</label>
                                    <textarea 
                                        name="message" 
                                        id="message" 
                                        rows={5} 
                                        required 
                                        value={formData.message} 
                                        onChange={handleInputChange}
                                        disabled={status === 'submitting'}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={status === 'submitting'}
                                    className="w-full bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                                >
                                    {status === 'submitting' ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Enviando...
                                        </span>
                                    ) : 'Enviar Mensaje'}
                                </button>
                             </form>
                        </div>
                    </div>
                    
                    {/* Sección de Mapa */}
                    <div className="h-[450px] w-full rounded-2xl shadow-xl overflow-hidden">
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
                </main>

                <Footer />
            </div>
        </div>
    );
}

