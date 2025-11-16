'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { RBBadge, RBButton } from '../../components';
import { ProductCardProps } from '@/types/product';
import { CheckIcon, ShoppingCartIcon } from './icons';
import { getBrandLogo } from '@/data/brandLogos';

// --- Tarjeta de Producto ---
export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            const card = cardRef.current;

            const onMouseEnter = () => {
                gsap.to(card, {
                    y: -8,
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                if (imageRef.current) {
                    gsap.to(imageRef.current, {
                        scale: 1.1,
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                }
            };

            const onMouseLeave = () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                });
                if (imageRef.current) {
                    gsap.to(imageRef.current, {
                        scale: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                    });
                }
            };

            card.addEventListener('mouseenter', onMouseEnter);
            card.addEventListener('mouseleave', onMouseLeave);

            return () => {
                card.removeEventListener('mouseenter', onMouseEnter);
                card.removeEventListener('mouseleave', onMouseLeave);
            };
        }
    }, []);

    return (
        <div
            ref={cardRef}
            className="product-card group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
        >
            <div className="relative h-64 bg-slate-50 overflow-hidden">
                <div ref={imageRef} className="w-full h-full">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                    />
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <RBBadge variant="info">
                        {product.category}
                    </RBBadge>
                    {product.inStock && (
                        <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                            <CheckIcon />
                            Stock
                        </span>
                    )}
                </div>

                {/* Logo de la marca */}
                {getBrandLogo(product.brand) && (
                    <div className="mb-3 h-12 flex items-center">
                        <Image
                            src={getBrandLogo(product.brand)}
                            alt={product.brand}
                            width={120}
                            height={48}
                            className="object-contain max-h-full"
                        />
                    </div>
                )}

                {/* Nombre de marca solo si no hay logo */}
                {!getBrandLogo(product.brand) && (
                    <p className="text-blue-600 font-semibold text-sm mb-1">{product.brand}</p>
                )}

                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">{product.name}</h3>
                {product.modelo && (
                    <p className="text-slate-500 text-xs mb-2">Modelo: {product.modelo}</p>
                )}

                <div className="flex gap-2 mt-4">
                    <RBButton
                        variant="primary"
                        className="flex-1"
                        onClick={() => onViewDetails(product)}
                    >
                        Ver Detalles
                    </RBButton>
                    <button
                        className="p-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300"
                        onClick={() => onViewDetails(product)}
                    >
                        <ShoppingCartIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};
