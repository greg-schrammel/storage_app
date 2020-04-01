import * as React from 'react';

import { View, Text } from 'react-native';

import Typography from 'components/Typography';
import Input from 'components/Input';
import Button from 'components/Button';

import SortBy from './SortBy';
import { useDirectory } from '../DirectoryContext';

const SelectButton = ({ onPress, isSelecting }) => (
  <Button
    onPress={onPress}
    style={{
      borderRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 5,
    }}
    size="sm"
    color="dodgerblue"
    backgroundColor="#e9f7ff"
  >
    {!isSelecting ? 'Selecionar' : 'Cancelar'}
  </Button>
);

const HeaderContainer = ({ children }) => (
  <View
    style={[
      {
        paddingBottom: 5,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'whitesmoke',
      },
    ]}
  >
    {children}
  </View>
);

const Header = () => {
  const [state, send] = useDirectory();
  return (
    <>
      <HeaderContainer>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text style={Typography.largeHeader}>Meus Arquivos</Text>
          <SelectButton
            isSelecting={state.matches('selecting')}
            onPress={() => send('toggleSelecting')}
          />
        </View>
        <Input
          onFocus={() => send('search')}
          onChangeText={search => send({ type: 'searchChange', search })}
          placeholder="Pesquisar"
          icon="search"
          style={{ marginTop: 10 }}
        />
        <SortBy
          onValue={by => send({ type: 'sort', by })}
          by={state.context.sortBy}
          direction="down"
          style={{ marginTop: 10 }}
        />
      </HeaderContainer>
    </>
  );
};

export default Header;
