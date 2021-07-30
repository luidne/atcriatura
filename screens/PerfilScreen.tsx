import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import Auth from '@react-native-firebase/auth';
import { Avatar, Button } from 'react-native-paper';

export default function PerfilScreen() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setData(Auth().currentUser);
    setIsLoading(false);
  }, []);

  if(isLoading) {
    return (
      <View style={styles.container}> 
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      </View>
    );
  } else {
    if(data == null || data.length === 0) {
      return (
        <View style={styles.container}> 
          <View style={styles.center}>
            <Text style={{color: colors.text}}>Nenhum dado</Text>
          </View>
        </View>
      );
    } else {
        return (
          <View style={styles.container}>
            <View style={{
              padding: 10,
              alignItems: 'center',
            }}>
              <Avatar.Image
                  style={styles.itemImg}
                  source={{uri: data.photoUrl}}
              />
              <Text>{data.providerData[0].email}</Text>
              <Button icon='logout' mode='outlined' onPress={() => {
                Auth().signOut();
              }}>Sair</Button>
            </View>
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImg: {
    width: 120, 
    height: 120,
    borderRadius: 60,
  }
});
