import { defineConfig } from 'unocss';
export default defineConfig({
  rules: [
    [
      'text-evenly',
      {
        textAlignLast: 'justify',
        textAlign: 'justify',
      },
    ],
    [/^lh-([.\d]+)$/, ([_, num]) => ({ 'line-height': `${num}` })],
    [/^lh-([.\d]+)px$/, ([_, num]) => ({ 'line-height': `${num}` })],
  ],
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
    transitionProperty: {
      width: 'width',
      spacing: 'margin, padding',
    },
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      inherit: 'inherit',
      none: 'none',
      2: '2 2 0%',
      3: '3 3 0%',
      4: '4 4 0%',
      5: '5 5 0%',
      6: '6 6 0%',
    },
  },
  safelist: [
    'text-orange-400',
    'text-orange-500',
    'text-orange-600',
    'text-blue-500',
    'text-blue-800',
    'text-gray-500',
    'text-gray-800',
    'font-bold',
    'p-1.2',
    'p-1.5',
    'p-1.8',
  ],
});
