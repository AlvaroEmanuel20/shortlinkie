import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    blue: '#0b132b',
    blue1: '#1c2541',
    blue2: '#3a506b',
    dark: '#212529',
    dark1: '#343a40',
    gray: '#adb5bd',
    gray1: '#dee2e6',
    light: '#f8f9fa',
    red: '#900604',
  },
  fontSize: {
    header: '2.5rem',
    header1: '2rem',
    header2: '1.5rem',
    header3: '1.25rem',
    medium: '1.125rem',
    base: '1rem',
    small: '0.875rem',
    xsmall: '0.8rem',
  },
  radius: {
    base: '4px',
    medium: '6px',
  },
  breakpoints: {
    desktop: '1440px',
    mobile: '375px',
    tablet: '1024px',
  },
};

export default theme;
