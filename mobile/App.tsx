import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DirectoryScreen from 'screens/Directory';
// import Icon from 'components/Icon';

// const Tab = createBottomTabNavigator();

// const TabIcon = {
//   files: 'folder',
//   config: 'user',
//   favorites: 'star',
// };

// function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color }) => <Icon name={TabIcon[route.name]} color={color} size={22} />,
//           tabBarLabel: route.name,
//         })}
//         tabBarOptions={{
//           activeTintColor: 'dodgerblue',
//           inactiveTintColor: 'grey',
//         }}
//         initialRouteName="files"
//       >
//         <Tab.Screen name="favorites" component={DirectoryScreen} />
//         <Tab.Screen name="files" component={DirectoryScreen} />
//         <Tab.Screen name="config" component={DirectoryScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

function App() {
  return <DirectoryScreen />;
}

export default App;
