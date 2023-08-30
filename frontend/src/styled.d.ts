import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      orange1: string;
      orange2: string;
      white: string;
      gray: string;
      blackAlpha: string;
      red: string;
      green: string;
    };
    fontSize: {
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    radius: {
      base: string;
      md: string;
    }
  }
}
