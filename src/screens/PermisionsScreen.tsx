import React, { useContext } from 'react'
import { Button, Platform, StyleSheet, Text, View } from 'react-native'
import { check, checkLocationAccuracy, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions'
import { PermissionsContext } from '../context/PermissionContext'
import { BlackButton } from '../components/BlackButton';

export const PermisionsScreen = () => {

  const {permissions, askLocationPermission} = useContext(PermissionsContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>

        Es necesario el uso del GPS, para usar esta aplicación
      </Text>

      <BlackButton 
        title='Permiso'
        
        onPress={askLocationPermission}
      />

      <Text style={{marginTop:30}} >
        {
          JSON.stringify(permissions,null,4)
        }
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  }
})