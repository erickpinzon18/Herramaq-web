"use client";

import React, { useState, useEffect, useRef } from "react";

interface Brand {
  name: string;
  count: number;
  logoUrl: string;
}

interface BrandAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onBrandSelect?: (brand: Brand | null) => void;
  placeholder?: string;
  className?: string;
}

export default function BrandAutocomplete({
  value,
  onChange,
  onBrandSelect,
  placeholder = "Buscar o crear marca...",
  className = "",
}: BrandAutocompleteProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cargar marcas desde localStorage o API
  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    // Primero intentar localStorage
    const cachedBrands = localStorage.getItem("herramaq_brands");
    if (cachedBrands) {
      const parsed = JSON.parse(cachedBrands);
      setBrands(parsed);
      return;
    }

    // Si no hay cache, cargar desde API
    setLoading(true);
    try {
      const response = await fetch("/api/brands");
      const data = await response.json();
      if (data.success) {
        setBrands(data.brands);
        localStorage.setItem("herramaq_brands", JSON.stringify(data.brands));
      }
    } catch (error) {
      console.error("Error cargando marcas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar marcas cuando cambia el valor
  useEffect(() => {
    // Deduplicar marcas por nombre
    const seen = new Set<string>();
    const uniqueBrands = brands.filter((brand) => {
      const normalized = brand.name.toUpperCase();
      if (seen.has(normalized)) {
        return false;
      }
      seen.add(normalized);
      return true;
    });

    if (!value.trim()) {
      setFilteredBrands(uniqueBrands.slice(0, 10)); // Mostrar top 10 por defecto
    } else {
      const searchTerm = value.trim().toUpperCase();
      const filtered = uniqueBrands
        .filter((b) => b.name.toUpperCase().includes(searchTerm))
        .slice(0, 10);
      setFilteredBrands(filtered);
    }
  }, [value, brands]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (brand: Brand) => {
    onChange(brand.name);
    onBrandSelect?.(brand);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleCreateNew = () => {
    // La marca nueva se guarda con el valor actual
    onBrandSelect?.(null); // null indica marca nueva
    setIsOpen(false);
  };

  const exactMatch = brands.find(
    (b) => b.name.toUpperCase() === value.trim().toUpperCase()
  );
  const showCreateOption = value.trim() && !exactMatch;

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
        </div>
      )}

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border-2 border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {/* Opción de crear nueva marca */}
          {showCreateOption && (
            <button
              type="button"
              onClick={handleCreateNew}
              className="w-full px-4 py-3 text-left hover:bg-green-50 border-b border-slate-200 flex items-center gap-2"
            >
              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </span>
              <span className="text-green-700 font-semibold">
                Crear "{value.trim()}"
              </span>
              <span className="text-green-600 text-xs ml-auto">
                Nueva marca
              </span>
            </button>
          )}

          {/* Lista de marcas filtradas */}
          {filteredBrands.length > 0
            ? filteredBrands.map((brand, index) => (
                <button
                  key={`brand-${index}-${brand.name}`}
                  type="button"
                  onClick={() => handleSelect(brand)}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100 last:border-b-0"
                >
                  {brand.logoUrl ? (
                    <img
                      src={brand.logoUrl}
                      alt={brand.name}
                      className="w-8 h-8 object-contain rounded"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-500">
                      {brand.name.substring(0, 2)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{brand.name}</p>
                    <p className="text-xs text-slate-500">
                      {brand.count} productos
                    </p>
                  </div>
                </button>
              ))
            : !showCreateOption && (
                <div className="px-4 py-3 text-slate-500 text-sm text-center">
                  No se encontraron marcas
                </div>
              )}
        </div>
      )}
    </div>
  );
}
