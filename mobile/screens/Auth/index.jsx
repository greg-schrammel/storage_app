import React from 'react';
import styled from 'styled-components/native';

import Button from 'components/Button';
import Logo from 'components/Logo';
import bgGIF from 'assets/login.gif';

const Flex = styled.View`
  flex: ${p => p.grow || 1};
  background-color: ${p => p.bg || 'transparent'};
  justify-content: ${p => p.justify || 'center'};
  align-items: ${p => p.align || 'center'};
  flex-direction: ${p => p.direction || 'column'};
  width: ${p => p.width || '100%'};
  height: ${p => p.height || '100%'};

  padding: ${p => (p.padding ? `${p.padding}px` : '0')};
  margin: ${p => (p.margin ? `${p.margin}px` : '0')};

  border-radius: ${p => p.rounded || '0'};
`;

const Layout = styled.ImageBackground`
  width: 100%;
  height: 100%;
  background-color: ${p => p.bg || 'transparent'};
  align-items: center;
`;

const LoginButton = ({ onPress }) => <Button onPress={onPress} text="ENTRAR" marginBottom="20px" />;
const RegisterButton = ({ onPress }) => <Button onPress={onPress} text="REGISTRE-SE" outlined />;

const Input = styled.TextInput`
  border-radius: 50px;
  border: solid 3px lightgrey;

  width: 100%;
  padding: 18px;

  font-size: 15px;
  font-weight: bold;
`;

const LoginEmailInput = ({ autoFocus = true, onEndEditing }) => (
  <Input
    placeholder="Email"
    autoCompleteType="username"
    keyboardType="email-address"
    returnKeyType="next"
    textContentType="username"
    autoFocus={autoFocus}
    onEndEditing={onEndEditing}
  />
);

const LoginPasswordInput = ({ newPassword }) => (
  <Input
    placeholder="Senha"
    autoCompleteType="password"
    textContentType={newPassword ? 'newPassword' : 'password'}
    returnKeyType="done"
    secureTextEntry
  />
);

export default function LoginScreen() {
  return (
    <Layout source={bgGIF}>
      <Flex grow={2}>
        <Logo width={250} />
      </Flex>
      <Flex bg="white" padding={20} rounded="40px">
        <LoginButton />
        <RegisterButton />
      </Flex>
    </Layout>
  );
}
