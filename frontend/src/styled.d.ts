import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blue: string;
      blue1: string;
      blue2: string;
      dark: string;
      dark1: string;
      gray: string;
      gray1: string;
      light: string;
      red: string;
    };
    fontSize: {
      header: string;
      header1: string;
      header2: string;
      header3: string;
      medium: string;
      base: string;
      small: string;
      xsmall: string;
    };
    radius: {
      base: string;
      medium: string;
    };
    breakpoints: {
      desktop: string;
      mobile: string;
      tablet: string;
    }
  }
}
