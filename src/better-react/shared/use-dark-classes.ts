import { KonstaContext } from './KonstaContext.js';

const useDarkClasses = () => {
  const context = KonstaContext.useConsumer();
  return (classNames: string) => {
    if (!context.dark) return '';
    return classNames;
  };
};

export { useDarkClasses };
