export type ItemTypes = 'folder' | 'audio' | 'photo' | 'video' | 'file' | 'zip';

export interface Item {
  id: string;
  name: string;
  type: ItemTypes;
  contents: Array<uid | null> | BinaryType;
  meta: ItemMeta;
}

interface ItemMeta {
  creationTime: number;
  itemsCount?: number;
  unloaded?: boolean;
}
