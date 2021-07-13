import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import Image from '../../components/Image';
// import database from "@react-native-firebase/database";
import Hyperlink from "react-native-hyperlink";
import Colors from '../../constants/Colors';

export default ({route}) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    // database()
    //   .ref('/producao/notificacoes')
    //   .once('value')
    //   .then(snapshot => {
    //     const values = snapshot.val();
    //     setIsLoading(false);
    //     setNotificacoes(values);
    //   })
    //   .catch( error => {
    //     console.error(error);
    //   });
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
    if(notificacoes == null || notificacoes.length === 0) {
      return (
        <View style={styles.container}> 
          <View style={styles.center}>
            <Text style={{color: colors.text}}>Nenhuma notificação</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList 
              data={notificacoes}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => 
                  <View style={{...styles.item, ...{borderBottomWidth: index == notificacoes.length - 1 ? 0 : 1,}}}>
                      <View style={styles.header}>
                          <Text style={{...styles.title, ...{color: colors.text}}}>{item.titulo}</Text>
                          <Text style={{...styles.title, ...{color: colors.text}}}>{item.data}</Text>
                      </View>
                      <Hyperlink linkDefault={true} linkStyle={styles.link}>
                        <Text style={{...styles.text, ...{color: colors.text}}}>{item.texto}</Text>
                      </Hyperlink>
                      <Image
                        style={{width: '100%', height: 200,}}
                        source={{
                          uri: item.imgUrl,
                        }}
                      />
                  </View>
          }>
          </FlatList>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    borderBottomColor: '#222',
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  title: {
      fontSize: 12,
      fontWeight: 'bold',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  link: {
    color: Colors.blueColor,
  }
});
