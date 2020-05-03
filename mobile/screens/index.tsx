import * as React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'components/Icon';

import FinderScreen from 'screens/Finder';
import AuthScreen from 'screens/Auth';
import SplashScreen from 'screens/Splash';

import useUser from './useUser';

const Tab = createBottomTabNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    border: 'lightgrey',
  },
};

const routeIcon = {
  finder: 'folder',
  shared: 'users',
  favorites: 'star',
  config: 'user',
};

const FavoritesScreen = () => <FinderScreen folderId="favorites" />;
const SharedScreen = () => <FinderScreen folderId="shared" />;

function Router() {
  const user = useUser();
  const [isReady, setIsReady] = React.useState(false);
  if (!isReady)
    return (
      <SplashScreen
        img="assets/splash.png"
        isVisible={typeof user === 'undefined'}
        onHide={() => setIsReady(true)}
      />
    );
  if (!user) return <AuthScreen />;
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
          component={FavoritesScreen}
        />
        <Tab.Screen options={{ tabBarLabel: 'shared' }} name="shared" component={SharedScreen} />
        <Tab.Screen options={{ tabBarLabel: 'finder' }} name="finder" component={FinderScreen} />
        <Tab.Screen options={{ tabBarLabel: 'config' }} name="config" component={FinderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;
