/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#343A40',
          50: '#D6D8DA', // Çok açık gri
          100: '#BCC0C4', // Açık gri
          200: '#A2A5A9', // Orta açık gri
          300: '#8A8D91', // Orta gri
          400: '#707478', // Koyu gri
          500: '#343A40', // Temel renk
          600: '#2D3338', // Daha koyu gri
          700: '#262A2E', // Koyu gri
          800: '#1F2123', // Daha koyu gri
          900: '#181A1B', // En koyu gri
        },
        secondary: {
          DEFAULT: '#7952B3',
          50: '#E9D8FD', // Çok açık mor
          100: '#D5B3F7', // Açık mor
          200: '#C09AF3', // Orta açık mor
          300: '#A782E9', // Orta mor
          400: '#8B6BDC', // Koyu mor
          500: '#7952B3', // Temel renk
          600: '#67469E', // Daha koyu mor
          700: '#573A8A', // Koyu mor
          800: '#462C6B', // Daha koyu mor
          900: '#3A1F56', // En koyu mor
        },
        accent: {
          DEFAULT: '#FFC107',
          50: '#FFF8E1', // Çok açık sarı
          100: '#FFECB3', // Açık sarı
          200: '#FFE082', // Orta açık sarı
          300: '#FFD54F', // Orta sarı
          400: '#FFCA28', // Koyu sarı
          500: '#FFC107', // Temel renk
          600: '#FFB300', // Daha koyu sarı
          700: '#FFA000', // Koyu sarı
          800: '#FF8F00', // Daha koyu sarı
          900: '#FF6F00', // En koyu sarı
        },
      },

      fontFamily: {
        gbold: ['Giorgio-Sans-Bold', 'sans-serif'],
        gbolditalic: ['Giorgio-Sans-Bold-Italic', 'sans-serif'],
        gextralight: ['Giorgio-Sans-Extra-Light', 'sans-serif'],
        gextralightitalic: ['Giorgio-Sans-Extra-Light-Italic', 'sans-serif'],
        glight: ['Giorgio-Sans-Light', 'sans-serif'],
        glightitalic: ['Giorgio-Sans-Light-Italic', 'sans-serif'],
        gmedium: ['Giorgio-Sans-Medium', 'sans-serif'],
        gmediumitalic: ['Giorgio-Sans-Medium-Italic', 'sans-serif'],
        gregular: ['Giorgio-Sans-Regular', 'sans-serif'],
        gregularitalic: ['Giorgio-Sans-Regular-Italic', 'sans-serif'],
        gthin: ['Giorgio-Sans-Thin', 'sans-serif'],
        gthinitalic: ['Giorgio-Sans-Thin-Italic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
