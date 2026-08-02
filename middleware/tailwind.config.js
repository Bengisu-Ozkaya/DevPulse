/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#ede8f5',        // Ana Arka Plan
        'card-bg': '#adbbda',       // Kart/Yüzey Arka Planı
        'card-border': '#adbbda',  // Kenarlık Rengi
        'meta-text': '#8697c4',     // İkincil Vurgular ve Alt Metinler
        'accent': '#7091e6',        // Ana Aksiyon Rengi (CTA)
        'heading': '#3d52a0',       // Başlıklar ve Koyu Vurgular
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}