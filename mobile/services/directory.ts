import { uid } from '@types/uid';
import { uniqueId } from 'xstate/lib/utils';
import { Item } from '@types/item';

const createFolder = (): Item => ({
  id: uniqueId(),
  type: 'folder',
  meta: {
    creationTime: Date.now(),
  },
  name: `pasta ${uniqueId()}`,
  contents: [],
});

const data = [...Array(20)].map(createFolder);

export const listenFolder = (folderId: uid, onFolderData: (data: Array<Item>) => void) => {
  console.log('listennn', folderId);
  onFolderData(data);
};

export const addItem = (item: Item) => {
  console.log(item);
  return uniqueId();
};

export const fetchItemContents = (itemId: uid) => Promise.resolve(`contents: ${itemId}`);
