import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';




interface Props {
    // markers?: Marker[];
}
export const Map = () => {
  const [showPolyline, setShowPolyline] = useState(true)
  const { hasLocation, initialPosition, getCurrentLocation, followUserLocation, userLocation, stopFollowPosition, routeLines} = useLocation()
    

  const mapViewRef = useRef<MapView>()
  const following = useRef(true)
  useEffect(() => {
    followUserLocation()
  
    return () => {
      stopFollowPosition()
    }
  }, [])
  useEffect(() => {

    if ( following.current!) return;
    mapViewRef.current?.animateCamera({
      center: {
         ...userLocation

      }
    })
  }, [userLocation])
  

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation()
    following.current = true
    mapViewRef.current?.animateCamera({
      center: {
         latitude,
         longitude 

      }
    })
  }
  if (!hasLocation) {
    return <LoadingScreen />
  }

  return (
    <>
       <MapView
       ref={ el => mapViewRef.current = el!}
          style={{flex:1}}
          showsUserLocation
          onTouchStart={ () => following.current = false}
            initialRegion={{
              latitude: initialPosition!.latitude,
              longitude: initialPosition!.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {
              showPolyline && (
                <Polyline 
                  coordinates={routeLines}
                  strokeColor='black'
                  strokeWidth={3}
                />

              )
            }

              {/* <Marker
                image={require('../assets/custom-marker.png')}
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title={'This is a Title'}
                description={'This is a description'}
                /> */}
        </MapView>
        <Fab
          iconName='compass-outline'
          onPress={centerPosition }
          style={{
            position: 'absolute',
            bottom: 15,
            right: 15 ,
           

          }}
        />
        <Fab
          iconName='brush-outline'
          onPress={ () => setShowPolyline(value => !value) }
          style={{
            position: 'absolute',
            bottom: 80,
            right: 15 ,
           

          }}
        />
    </>
  )
}
