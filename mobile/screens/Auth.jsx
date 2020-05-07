import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import Button from 'components/Button';
import Logo from 'components/Logo';
import Icon from 'components/Icon';
import { loginWithGoogle } from 'services/auth';
import Typography from 'components/Typography';

const Styles = StyleSheet.create({
  loginButton: {
    backgroundColor: 'black',
    padding: 15,
  },
  loginButtonLabel: {
    color: 'white',
    fontSize: 20,
  },
});

export default function AuthScreen() {
  const [error, setError] = React.useState();
  const withErrorCatcher = authFn => () => authFn().catch(e => setError(e.toString()));
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 2 }}>
        <Logo width={200} black />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={Typography.header}>Some marketing stuff here</Text>
      </View>
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 40 }}>
        {error && <Text>{error}</Text>}
        <Button
          style={Styles.loginButton}
          labelStyle={Styles.loginButtonLabel}
          icon={<Icon name="google" size={26} color="white" />}
          onPress={withErrorCatcher(loginWithGoogle)}
        >
          Entrar com Google
        </Button>
      </View>
    </SafeAreaView>
  );
}
