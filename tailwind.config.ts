import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores corporativos de Herramaq
        herramaq: {
          blue: {
            50: "#e6f0ff",
            100: "#b3d4ff",
            200: "#80b8ff",
            300: "#4d9cff",
            400: "#1a80ff",
            500: "#0066e6", // Azul principal Herramaq
            600: "#0052b8",
            700: "#003d8a",
            800: "#00295c", // Azul oscuro usado en la web
            900: "#001433",
          },
          yellow: {
            50: "#fffbe6",
            100: "#fff4b3",
            200: "#ffed80",
            300: "#ffe64d",
            400: "#ffdf1a",
            500: "#ffd700", // Amarillo corporativo
            600: "#e6c200",
            700: "#b89900",
            800: "#8a7300",
            900: "#5c4d00",
          },
        },
        
        // Sistema de colores semánticos
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        heading: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
      },
      
      fontSize: {
        // Escala tipográfica optimizada
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.16" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        "7xl": ["4.5rem", { lineHeight: "1.05" }],
      },
      
      spacing: {
        // Espaciado personalizado
        "18": "4.5rem",
        "88": "22rem",
        "112": "28rem",
        "128": "32rem",
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      boxShadow: {
        // Sombras corporativas
        "herramaq-sm": "0 1px 2px 0 rgba(0, 41, 92, 0.05)",
        "herramaq-md": "0 4px 6px -1px rgba(0, 41, 92, 0.1), 0 2px 4px -1px rgba(0, 41, 92, 0.06)",
        "herramaq-lg": "0 10px 15px -3px rgba(0, 41, 92, 0.1), 0 4px 6px -2px rgba(0, 41, 92, 0.05)",
        "herramaq-xl": "0 20px 25px -5px rgba(0, 41, 92, 0.1), 0 10px 10px -5px rgba(0, 41, 92, 0.04)",
        "herramaq-2xl": "0 25px 50px -12px rgba(0, 41, 92, 0.25)",
        "herramaq-inner": "inset 0 2px 4px 0 rgba(0, 41, 92, 0.06)",
      },
      
      animation: {
        // Animaciones personalizadas
        "spin-slow": "spin 3s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-left": "fadeInLeft 0.8s ease-out",
        "fade-in-right": "fadeInRight 0.8s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
