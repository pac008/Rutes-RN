import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { MapScreen } from '../screens/MapScreen';
import { PermisionsScreen } from '../screens/PermisionsScreen';
import { PermissionsContext } from '../context/PermissionContext';
import { LoadingScreen } from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = () => {

  const {permissions} = useContext(PermissionsContext)

  if ( permissions.locationStatus == 'unavailable') {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator
        // initialRouteName='PermisionsScreen'
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }
        }}
    >

      {
        (permissions.locationStatus == 'granted') 
        ? <Stack.Screen name="MapScreen" component={MapScreen} />
        : <Stack.Screen name="PermisionsScreen" component={PermisionsScreen} />
      }
    </Stack.Navigator>
  );
}