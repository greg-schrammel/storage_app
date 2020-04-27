import * as React from 'react';

import MenuItem from 'components/MenuItem';
import Picker from 'components/Picker';
import { useFinder } from '../FinderProvider';

export const SortingModal = () => {
  const [state, send] = useFinder();
  return (
    <Picker title="Ordenar" onDismiss={() => send('cancel')}>
      <MenuItem
        icon="clock-o"
        label="Data de Criação"
        onPress={() => send('sort', { by: 'creationTime' })}
      />
      <MenuItem icon="font" label="Nome" onPress={() => send('sort', { by: 'name' })} />
      <MenuItem icon="font" label="Tipo" onPress={() => send('sort', { by: 'fileType' })} />
    </Picker>
  );
};

export default SortingModal;
