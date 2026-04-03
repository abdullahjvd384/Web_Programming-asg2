/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        amazon: {
          dark: "hsl(var(--amazon-dark))",
          "dark-hover": "hsl(var(--amazon-dark-hover))",
          "dark-text": "hsl(195, 53%, 10%)",
          blue: "hsl(var(--amazon-blue))",
          orange: "hsl(var(--amazon-orange))",
          yellow: "hsl(var(--amazon-yellow))",
          "yellow-border": "hsl(36, 70%, 44%)",
          "light-blue": "hsl(var(--amazon-light-blue))",
          nav: "hsl(var(--amazon-nav))",
          "nav-secondary": "hsl(var(--amazon-nav-secondary))",
          star: "hsl(var(--amazon-star))",
          price: "hsl(var(--amazon-price))",
          prime: "hsl(var(--amazon-prime))",
          deal: "hsl(var(--amazon-deal))",
          green: "hsl(var(--amazon-green))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
