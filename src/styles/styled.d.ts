import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      text: string;
      textSecondary:string;      
      background: string;
      card: string;
      divider: string;
      headerDivider: string;

      pink: string;
      purple: string;
      red: string;
      green: string;
    }
  }
}