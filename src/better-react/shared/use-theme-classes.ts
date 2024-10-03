import { KonstaContext } from './KonstaContext';
import { cls } from '../../shared/cls.js';
import { emptyObject } from 'wy-helper';

/**
 * 
 * @param classesObj 
 * @param theme 
 * @param state 
 * @returns string|string[]
 */
const propClasses = (
  classesObj: { [x: string]: { [x: string]: any; }; common: any; },
  theme: string,
  state?: string) => {
  if (typeof classesObj === 'string') return classesObj;
  const arr = [classesObj.common, classesObj[theme]];
  if (state && classesObj[state]) {
    if (typeof classesObj[state] === 'string') arr.push(classesObj[state]);
    else {
      arr.push(classesObj[state].common, classesObj[state][theme]);
    }
  }
  return arr;
};
/**
 * 
 * @param classesObj 
 * @param theme 
 * @param addBaseClassName 
 * @returns 
 */
const themeClasses = (classesObj: { [x: string]: any; }, theme: any, addBaseClassName: any) => {
  const c = {};
  const themeSubKeys = ['common', 'ios', 'material'];
  Object.keys(classesObj).forEach((key) => {
    const addBaseClass = key === 'base' ? addBaseClassName : '';
    const hasStates =
      typeof classesObj[key] !== 'string' &&
      Object.keys(classesObj[key]).filter(
        (state) => !themeSubKeys.includes(state)
      ).length > 0;
    if (!hasStates) {
      c[key] = cls(propClasses(classesObj[key], theme), addBaseClass);
      return;
    }
    c[key] = {};
    const defaultStateClasses = propClasses(classesObj[key], theme);
    c[key].default = cls(defaultStateClasses, addBaseClass);
    Object.keys(classesObj[key])
      .filter((state) => !themeSubKeys.includes(state))
      .forEach((state) => {
        c[key][state] = cls(
          defaultStateClasses,
          propClasses(classesObj[key], theme, state),
          addBaseClass
        );
      });
  });
  return c as Record<string, any>
};

const useThemeClasses = ({ ios, material }: {
  ios?: boolean
  material?: boolean
} = emptyObject) => {
  const context = KonstaContext.useConsumer();
  let theme = context.theme || 'ios';
  if (ios) theme = 'ios';
  if (material) theme = 'material';
  return (classesObj: any, addBaseClassName?: any) =>
    themeClasses(classesObj, theme, addBaseClassName);
};

export { useThemeClasses };
