'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { RBBadge } from '../../components';
import { ProductModalProps } from '@/types/product';
import { CloseIcon, CheckIcon } from './icons';
import { getBrandLogo } from '@/data/brandLogos';

// --- Modal de Producto ---
export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Preparar array de imágenes: todas las imágenes del producto + logo de marca al final (si existe)
    const brandLogo = product ? getBrandLogo(product.brand) : '';
    const allImages = product && brandLogo ? [...product.images, brandLogo] : (product?.images || []);

    useEffect(() => {
        if (isOpen && modalRef.current && backdropRef.current) {
            gsap.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo(
                modalRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
            );
        }
    }, [isOpen]);

    // Reiniciar índice al abrir modal
    useEffect(() => {
        if (isOpen && product) {
            setCurrentImageIndex(0);
        }
    }, [isOpen, product]);

    const handleClose = () => {
        if (modalRef.current && backdropRef.current) {
            gsap.to(modalRef.current, {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 0.3,
                ease: 'power2.in',
            });
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: onClose,
            });
        } else {
            onClose();
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    const isLastImage = brandLogo && currentImageIndex === allImages.length - 1;

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto pt-16 md:pt-4">
            <div
                ref={backdropRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={handleClose}
            />
            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-6xl my-4 md:my-8 bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                <button
                    onClick={handleClose}
                    className="sticky top-4 left-full -ml-12 z-20 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Cerrar modal"
                >
                    <CloseIcon />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Carrusel de Imágenes del Producto */}
                    <div className="relative bg-slate-50 p-4 md:p-8">
                        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white shadow-inner">
                            {allImages.length > 0 ? (
                                <Image
                                    src={allImages[currentImageIndex]}
                                    alt={isLastImage ? `Logo de ${product.brand}` : product.name}
                                    fill
                                    className={`transition-all duration-300 ${isLastImage ? 'object-contain p-8' : 'object-contain'}`}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    <div className="text-center">
                                        <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm font-medium">Sin imagen</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navegación del carrusel */}
                        {allImages.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                                    aria-label="Imagen anterior"
                                >
                                    <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                                    aria-label="Imagen siguiente"
                                >
                                    <svg className="w-6 h-6 text-slate-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Indicadores de imagen */}
                                <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                    {allImages.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                idx === currentImageIndex
                                                    ? 'bg-slate-700 w-8'
                                                    : 'bg-white/60 hover:bg-white'
                                            }`}
                                            aria-label={`Ir a imagen ${idx + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* Contador de imágenes */}
                                <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {currentImageIndex + 1} / {allImages.length}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Información del Producto */}
                    <div className="p-4 md:p-8 lg:p-12 flex flex-col justify-between min-h-[400px]">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <RBBadge variant="primary">
                                    {product.category}
                                </RBBadge>
                                {product.inStock && (
                                    <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                        <CheckIcon />
                                        Disponible
                                    </span>
                                )}
                            </div>

                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{product.name}</h2>
                            
                            {/* Nombre de marca (siempre mostrar) */}
                            <p className="text-slate-700 font-semibold text-base md:text-lg mb-4 md:mb-6">{product.brand}</p>

                            {product.modelo && (
                                <p className="text-slate-600 text-sm mb-2">
                                    <span className="font-semibold">Modelo:</span> {product.modelo}
                                </p>
                            )}
                            <p className="text-slate-600 text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed">{product.description}</p>

                            {/* Especificaciones */}
                            <div className="mb-6 md:mb-8">
                                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4">Especificaciones</h3>
                                
                                {product.specs.atributos && product.specs.atributos.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Atributos</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.specs.atributos.map((attr, idx) => (
                                                <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    {attr}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.specs.medidas && product.specs.medidas.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Medidas</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.specs.medidas.map((medida, idx) => (
                                                <span key={idx} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium">
                                                    {medida}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <a
                                href={`https://wa.me/524271845182?text=${encodeURIComponent(
                                    `Hola, me interesa cotizar el siguiente producto:\n\n` +
                                    `📦 *Producto:* ${product.name}\n` +
                                    `🏷️ *Marca:* ${product.brand}\n` +
                                    (product.modelo ? `🔩 *Modelo:* ${product.modelo}\n` : '') +
                                    `📂 *Categoría:* ${product.category}\n\n` +
                                    `¿Podrían indicarme disponibilidad y precio?`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/40"
                            >
                                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Solicitar Cotización
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
