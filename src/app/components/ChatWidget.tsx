'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// --- Tipos ---
interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

interface ChatWidgetProps {
    className?: string;
}

// --- Iconos ---
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const BotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

// El contexto del sistema ahora está en el servidor (/api/chat/route.ts)
// Esto es más seguro y permite actualizarlo sin rebuilds del cliente

export const ChatWidget: React.FC<ChatWidgetProps> = ({ className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Mensaje de bienvenida inicial
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    role: 'assistant',
                    content: '¡Hola! 👋 Soy el asistente virtual de Herramaq. ¿En qué puedo ayudarte hoy? Puedo brindarte información sobre nuestros productos, servicios, capacidades técnicas o coordinar una cotización.',
                    timestamp: new Date(),
                },
            ]);
        }
    }, []);

    // Auto-scroll al final cuando hay nuevos mensajes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    // Focus en input cuando se abre el chat
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content: inputValue.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            // 🔥 AQUÍ VA LA LLAMADA A LA API DE OPENAI
            // El contexto del sistema ya está configurado en el servidor
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        ...messages.map(msg => ({
                            role: msg.role,
                            content: msg.content,
                        })),
                        {
                            role: 'user',
                            content: userMessage.content,
                        },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();

            const assistantMessage: Message = {
                role: 'assistant',
                content: data.message || 'Lo siento, no pude procesar tu mensaje. ¿Puedes intentar de nuevo?',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            
            // Mensaje de error amigable
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Disculpa, tengo problemas técnicos en este momento. Por favor, contáctanos directamente al (427) 123 4567 o escríbenos a ventas@herramaq.com',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Función para renderizar el contenido del mensaje con links de WhatsApp como botones
    const renderMessageContent = (content: string) => {
        // Regex para detectar links de WhatsApp en formato Markdown [texto](url)
        const markdownLinkRegex = /\[([^\]]+)\]\((https:\/\/wa\.me\/[^)]+)\)/g;
        
        // Regex para detectar links de WhatsApp directos (sin formato Markdown)
        const directLinkRegex = /(https:\/\/wa\.me\/\S+)/g;
        
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        
        // Primero procesamos links con formato Markdown
        const markdownMatches = Array.from(content.matchAll(markdownLinkRegex));
        
        if (markdownMatches.length > 0) {
            markdownMatches.forEach((match, idx) => {
                const [fullMatch, text, url] = match;
                const matchIndex = match.index!;
                
                // Texto antes del link
                if (matchIndex > lastIndex) {
                    parts.push(content.substring(lastIndex, matchIndex));
                }
                
                // Botón de WhatsApp
                parts.push(
                    <a
                        key={`whatsapp-${idx}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-1.5 md:gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/50 my-2 max-w-full"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span className="break-words">{text}</span>
                    </a>
                );
                
                lastIndex = matchIndex + fullMatch.length;
            });
            
            // Texto después del último link
            if (lastIndex < content.length) {
                parts.push(content.substring(lastIndex));
            }
            
            return <>{parts}</>;
        }
        
        // Si no hay links Markdown, buscamos links directos
        const directMatches = Array.from(content.matchAll(directLinkRegex));
        
        if (directMatches.length > 0) {
            directMatches.forEach((match, idx) => {
                const [url] = match;
                const matchIndex = match.index!;
                
                // Texto antes del link
                if (matchIndex > lastIndex) {
                    parts.push(content.substring(lastIndex, matchIndex));
                }
                
                // Extraer el mensaje del parámetro 'text' de la URL para usarlo como descripción
                let buttonText = 'Contactar por WhatsApp';
                try {
                    const urlObj = new URL(url);
                    const textParam = urlObj.searchParams.get('text');
                    if (textParam) {
                        // Decodificar y limpiar el mensaje
                        const decodedText = decodeURIComponent(textParam);
                        // Si el mensaje es largo, usar la primera parte
                        if (decodedText.length > 50) {
                            buttonText = decodedText.substring(0, 47) + '...';
                        } else {
                            buttonText = decodedText;
                        }
                        // Si empieza con "Hola", hacer el texto más descriptivo
                        if (decodedText.toLowerCase().includes('cotizar')) {
                            buttonText = 'Cotizar por WhatsApp';
                        } else if (decodedText.toLowerCase().includes('información') || decodedText.toLowerCase().includes('info')) {
                            buttonText = 'Solicitar información';
                        } else if (decodedText.toLowerCase().includes('visita') || decodedText.toLowerCase().includes('agendar')) {
                            buttonText = 'Agendar visita';
                        } else if (decodedText.toLowerCase().includes('consulta') || decodedText.toLowerCase().includes('técnica')) {
                            buttonText = 'Consultar con equipo técnico';
                        }
                    }
                } catch (_e) {
                    // Si hay error parseando la URL, usar texto por defecto
                    buttonText = 'Contactar por WhatsApp';
                }
                
                // Botón de WhatsApp con texto descriptivo
                parts.push(
                    <a
                        key={`whatsapp-direct-${idx}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-start gap-1.5 md:gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/50 my-2 max-w-full"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        <span className="break-words">{buttonText}</span>
                    </a>
                );
                
                lastIndex = matchIndex + url.length;
            });
            
            // Texto después del último link
            if (lastIndex < content.length) {
                parts.push(content.substring(lastIndex));
            }
            
            return <>{parts}</>;
        }
        
        // Si no hay links, retornar el contenido normal
        return content;
    };

    return (
        <>
            {/* Botón flotante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-blue-950 text-white rounded-full p-3 md:p-4 shadow-2xl hover:shadow-slate-500/50 transition-all duration-300 hover:scale-110 ${className}`}
                aria-label="Abrir chat"
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
                
                {/* Badge de notificación (opcional) */}
                {!isOpen && messages.length > 1 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        !
                    </span>
                )}
            </button>

            {/* Ventana de chat */}
            {isOpen && (
                <div className="fixed bottom-4 md:bottom-24 right-4 md:right-6 left-4 md:left-auto z-40 w-auto md:w-full md:max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-slate-700 to-slate-900 p-3 md:p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="relative w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
                                <Image
                                    src="https://irp.cdn-website.com/e09cfb20/DESKTOP/png/235.png"
                                    alt="Herramaq"
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-xs md:text-sm">Asistente Herramaq</h3>
                                <p className="text-slate-300 text-[10px] md:text-xs flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    En línea
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-300"
                            aria-label="Cerrar chat"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Mensajes */}
                    <div className="h-[60vh] md:h-96 overflow-y-auto p-3 md:p-4 bg-slate-50 space-y-3 md:space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex gap-3 ${
                                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                }`}
                            >
                                {/* Avatar */}
                                <div
                                    className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                                        message.role === 'user'
                                            ? 'bg-slate-800 text-white'
                                            : 'bg-white border-2 border-slate-700 text-slate-700'
                                    }`}
                                >
                                    {message.role === 'user' ? <UserIcon /> : <BotIcon />}
                                </div>

                                {/* Mensaje */}
                                <div
                                    className={`max-w-[80%] md:max-w-[75%] ${
                                        message.role === 'user' ? 'items-end' : 'items-start'
                                    } flex flex-col gap-1`}
                                >
                                    <div
                                        className={`px-3 py-2 md:px-4 md:py-2 rounded-2xl ${
                                            message.role === 'user'
                                                ? 'bg-slate-800 text-white rounded-tr-none'
                                                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                                        }`}
                                    >
                                        <div className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                                            {renderMessageContent(message.content)}
                                        </div>
                                    </div>
                                    <span className="text-[10px] md:text-xs text-slate-400 px-2">
                                        {formatTime(message.timestamp)}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Indicador de escritura */}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-slate-700 text-slate-700 flex items-center justify-center">
                                    <BotIcon />
                                </div>
                                <div className="bg-white border border-slate-200 px-3 py-2 md:px-4 md:py-3 rounded-2xl rounded-tl-none">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 md:p-4 bg-white border-t border-slate-200">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Escribe tu mensaje..."
                                disabled={isLoading}
                                className="flex-1 px-3 py-2 md:px-4 md:py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-xs md:text-sm"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isLoading}
                                className="bg-slate-800 hover:bg-slate-900 text-white p-2.5 md:p-3 rounded-xl transition-colors duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:bg-slate-300"
                                aria-label="Enviar mensaje"
                            >
                                <SendIcon />
                            </button>
                        </div>
                        <p className="text-[10px] md:text-xs text-slate-400 mt-2 text-center">
                            Presiona Enter para enviar
                        </p>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </>
    );
};
