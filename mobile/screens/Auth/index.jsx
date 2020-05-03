import * as React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import Button from 'components/Button';
import Logo from 'components/Logo';
import Icon from 'components/Icon';
import { loginWithGoogle } from 'services/auth';

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

export default function LoginScreen() {
  const [error, setError] = React.useState();
  const withErrorCatcher = authFn => () => authFn().catch(setError);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ flex: 2 }}>
        <Logo width={200} black />
      </View>
      {error && <Text>{error}</Text>}
      <View style={{ flex: 1, width: '100%', paddingHorizontal: 40 }}>
        <Button
          style={[Styles.loginButton, { marginBottom: 20 }]}
          labelStyle={Styles.loginButtonLabel}
          icon={<Icon name="google" size={26} color="white" />}
          onPress={withErrorCatcher(loginWithGoogle)}
        >
          Entrar com Google
        </Button>
        <Button
          style={Styles.loginButton}
          labelStyle={Styles.loginButtonLabel}
          icon={<Icon name="apple" size={26} color="white" />}
        >
          Entrar com Apple
        </Button>
      </View>
    </SafeAreaView>
  );
}
