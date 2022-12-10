import { createTheme } from '@nextui-org/react';

export const theme = createTheme({
  type: 'light',
  theme: {
    colors: {
      primaryLight: '#585f6b',
      primary: '#222',
      primaryDark: '#989898',
      primarySolidHover: '#808080',
      secondary: '#99c2ff',
      white: '#FFFFFF',
      grey1: '#FAFAFA',
      grey2: '#F2F3F5',
      grey3: '#E4E6EB',
      grey4: '#C5CAD4',
      grey5: '#A1A7B3',
      grey6: '#7A818C',
      grey7: '#585F6B',
      grey8: '#333841',
      grey9: '#1E2227',
      grey10: '#0F1114',
      black: '#000000',
      accent1: '#7EB0FF',
      accent2: '#5397FF',
      accent3: '#516D99',
      accent4: '#354E75',
      success: '#77B33D',
      error: '#D65656',
      sustainable: '#77B33D',
      sale: '#D65656',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '$blue300',
    },
    space: {},
    fonts: {
      sans: "'Open Sans', sans-serif, -apple-system",
    },
    shadows: {
      shawdow1light: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
      shawdow2: 'rgba(0, 0, 0, 0.2) 0px 20px 30px;',
    },
  },
});
