import { KonstaContext } from './KonstaContext.js';
import { emptyObject } from 'wy-helper';

const useTheme = ({ ios, material }: {
  ios?: boolean
  material?: boolean
} = emptyObject as any) => {
  const context = KonstaContext.useConsumer();
  let theme = context.theme || 'ios';
  if (ios) theme = 'ios';
  if (material) theme = 'material';
  return theme;
};

export { useTheme };
