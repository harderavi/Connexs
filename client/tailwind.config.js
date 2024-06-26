module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // Use class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#D1C4E9',
          DEFAULT: '#7D58FE', // New main primary color
          dark: '#3700B3',
          50: '#EDE7F6',
          100: '#D1C4E9',
          200: '#B39DDB',
          300: '#9575CD',
          400: '#7E57C2',
          500: '#7D58FE',
          600: '#5E35B1',
          700: '#512DA8',
          800: '#4527A0',
          900: '#311B92',
        },
        secondary: {
          light: '#FFECB3',
          DEFAULT: '#FFC75A', // New main secondary color
          dark: '#FFA726',
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC75A',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
        tertiary: {
          light: '#FFD1C4',
          DEFAULT: '#FFA183', // New main tertiary color
          dark: '#FF7043',
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FFA183',
          600: '#FB8C00',
          700: '#F57C00',
          800: '#EF6C00',
          900: '#E65100',
        },
        surface: {
          light: '#faf6ff',
          DEFAULT: '#f3efff', // Main surface color
          dark: '#e5ddff',
          50: '#E0E0E0',
          100: '#CCCCCC',
          200: '#B8B6BB',
          300: '#A4A2A7',
          400: '#908E93',
          500: '#938F96',
          600: '#716D73',
          700: '#575758',
          800: '#3E3D3F',
          900: '#242426',
        },
        gray: {
          light: '#F5F5F5',
          DEFAULT: '#9E9E9E', // Main gray color
          dark: '#616161',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        on: {
          primary: '#FFFFFF', // Text on primary color
          secondary: '#000000', // Text on secondary color
          tertiary: '#000000', // Text on tertiary color
          surface: '#000000', // Text on surface color
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
