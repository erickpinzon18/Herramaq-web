'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { RBBadge, RBButton } from '../../components';
import { ProductModalProps } from '@/types/product';
import { CloseIcon, CheckIcon, ShoppingCartIcon } from './icons';
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
                                                    ? 'bg-blue-600 w-8'
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
                            <p className="text-blue-600 font-semibold text-base md:text-lg mb-4 md:mb-6">{product.brand}</p>

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
                                                <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
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
                            <RBButton
                                variant="primary"
                                className="flex-1 flex items-center justify-center gap-2"
                            >
                                <ShoppingCartIcon />
                                Solicitar Cotización
                            </RBButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
