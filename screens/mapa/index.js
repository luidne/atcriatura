import React, {useState, useCallback} from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';

import Colors from '../../constants/Colors';

export default function Maps(props) {

  const { dark } = useTheme();  
  const coordinateInitial = [-48.3317167, -10.2489];
  const [region, setRegion] = useState([-48.3317167, -10.2489]);
  const [markers, setMarkers] = useState([]);
  const [raio, setRaio] = useState({value: 1000});
  const [tipoMapa, setTipoMapa] = useState('');

  useFocusEffect(
    useCallback(() => {
    }, [])
  );

    return (
      <View style={{ flex: 1 }}>        
        <MapView
          style={{ flex: 1, zIndex: 1 }}>
        </MapView>
      </View>
    );
}

const styles = StyleSheet.create({
  ponto: {
    backgroundColor: Colors.blueColor,
    borderRadius: 2,
  }
});
