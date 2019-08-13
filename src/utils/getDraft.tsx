import { Item } from '../App';

export const getDraft = (): Item => ({
  id: new Date().getTime(),
  text: '',
  modified: new Date().getTime(),
  isDraft: true,
});
