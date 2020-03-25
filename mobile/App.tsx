import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'components/Icon';
import DirectoryScreen from 'screens/Directory';

const Tab = createBottomTabNavigator();

const routeIcon = {
  directory: 'folder',
  shared: 'users',
  favorites: 'star',
  config: 'user',
};

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    border: 'lightgrey',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        initialRouteName="shared"
        screenOptions={({ route }) => ({
          tabBarLabel: route.name,
          tabBarIcon: ({ color }) => <Icon name={routeIcon[route.name]} size={22} color={color} />,
        })}
        tabBarOptions={{
          activeTintColor: 'dodgerblue',
          inactiveTintColor: 'darkgray',
        }}
      >
        <Tab.Screen
          options={{ tabBarLabel: 'favorites' }}
          name="favorites"
          component={DirectoryScreen}
        />
        <Tab.Screen options={{ tabBarLabel: 'shared' }} name="shared" component={DirectoryScreen} />
        <Tab.Screen
          options={{ tabBarLabel: 'directory' }}
          name="directory"
          component={DirectoryScreen}
        />
        <Tab.Screen options={{ tabBarLabel: 'config' }} name="config" component={DirectoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// const Tab = ({ icon, label, active = false, color = active ? 'dodgerblue' : 'darkgrey' }) => (
//   <View style={{ alignItems: 'center' }}>
//     <Icon name={icon} size={24} color={color} />
//     <Text style={[Typography.caption, { color, fontSize: 10, padding: 5 }]}>{label}</Text>
//   </View>
// );

// <View
// style={{
//   flexDirection: 'row',
//   justifyContent: 'space-around',
//   alignItems: 'center',
//   paddingTop: 10,
//   borderTopColor: 'whitesmoke',
//   borderTopWidth: 1,
// }}
// >
// <Tab icon="star" label="Favoritos" />
// <Tab icon="users" label="Compartilhados" />
// <Tab icon="folder" label="Arquivos" active />
// <Tab icon="user" label="Configurações" />
// </View>
