import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'components/Icon';
import FinderScreen from 'screens/Finder';

const Tab = createBottomTabNavigator();

const routeIcon = {
  finder: 'folder',
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

function Router() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        initialRouteName="finder"
        screenOptions={({ route }) => ({
          tabBarLabel: route.name,
          tabBarIcon: ({ color }) => <Icon name={routeIcon[route.name]} size={24} color={color} />,
        })}
        tabBarOptions={{
          activeTintColor: 'dodgerblue',
          inactiveTintColor: 'darkgray',
          showLabel: false,
          style: { backgroundColor: 'whitesmoke' },
        }}
      >
        <Tab.Screen
          options={{ tabBarLabel: 'favorites' }}
          name="favorites"
          component={FinderScreen}
        />
        <Tab.Screen options={{ tabBarLabel: 'shared' }} name="shared" component={FinderScreen} />
        <Tab.Screen options={{ tabBarLabel: 'finder' }} name="finder" component={FinderScreen} />
        <Tab.Screen options={{ tabBarLabel: 'config' }} name="config" component={FinderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;
