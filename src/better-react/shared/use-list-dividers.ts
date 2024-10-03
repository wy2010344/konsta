import { ListDividersContext } from './ListDividersContext.js';

export const useListDividers = () => {
  return ListDividersContext.useConsumer()
};
