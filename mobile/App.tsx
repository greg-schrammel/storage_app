import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';

// import AuthScreen from './screens/Auth';
import DirectoryScreen from './screens/Directory';

// const Tab = createBottomTabNavigator();

// const TabIcon = ({ name, color, size }) =>
//   ({
//     files: () => <FontAwesome name="folder" color={color} size={size} />,
//   }[name]());

// const i18n = a =>
//   ({
//     files: 'Arquivos',
//     add: 'Adicionar',
//   }[a]);

// function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color }) => <TabIcon name={route.name} color={color} size={22} />,
//           tabBarLabel: i18n(route.name),
//           backgroundColor: 'white',
//         })}
//         tabBarOptions={{
//           activeTintColor: 'dodgerblue',
//           inactiveTintColor: 'gray',
//         }}
//         initialRouteName="files"
//       >
//         <Tab.Screen name="files" component={DirectoryScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

function App() {
  return <DirectoryScreen />;
}

export default App;
