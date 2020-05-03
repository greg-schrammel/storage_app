import * as React from 'react';

import Picker from 'components/Picker';
import MenuItem from 'components/MenuItem';

import { useFinder } from 'screens/Finder/FinderProvider';

import AddFolder from './Folder';

export default function AddingModal(): React.ReactElement {
  const [state, send] = useFinder();
  if (state.matches('adding.folder')) return <AddFolder />;
  if (state.matches('adding.media')) return null;
  return (
    <Picker title="Adicionar" onDismiss={() => send('cancel')}>
      <MenuItem icon="photo" label="Foto ou Video da Galeria" onPress={() => send('addMedia')} />
      <MenuItem icon="file-o" label="Novo Arquivo" onPress={() => send('addMedia')} />
      <MenuItem icon="folder" label="Nova Pasta" onPress={() => send('addFolder')} />
    </Picker>
  );
}
