import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { Text, View } from '../../components/Themed';
import Image from '../../components/Image';

export default function VisitasScreen({ navigation }) {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([{
    titulo: 'CASA 001CXAS título',
    endereco: 'Rua 11, Qd. 33, Lt. 44',
    bairro: '112 SUL',
    data: '11/00/2021 10:23',
    localizacao: [],
    imgUrl: 'https://thumbs.jusbr.com/imgs.jusbr.com/publications/images/1a28172b38b885fb9b3a335e0e998025'
  }, {
    titulo: 'Segundo título',
    endereco: 'Rua 11, Qd. 33, Lt. 44',
    bairro: '112 SUL',
    data: '11/00/2021 17:17',
    localizacao: [],
    imgUrl: 'https://thumbs.jusbr.com/imgs.jusbr.com/publications/images/1a28172b38b885fb9b3a335e0e998025'
  }, {
    titulo: 'Segundo título',
    endereco: 'Rua 11, Qd. 33, Lt. 44',
    bairro: '112 SUL',
    data: '11/00/2021 17:17',
    localizacao: [],
    imgUrl: 'https://thumbs.jusbr.com/imgs.jusbr.com/publications/images/1a28172b38b885fb9b3a335e0e998025'
  }, {
    titulo: 'Segundo título',
    endereco: 'Rua 11, Qd. 33, Lt. 44',
    bairro: '112 SUL',
    data: '11/00/2021 17:17',
    localizacao: [],
    imgUrl: 'https://thumbs.jusbr.com/imgs.jusbr.com/publications/images/1a28172b38b885fb9b3a335e0e998025'
  }, {
    titulo: 'Segundo título',
    endereco: 'Rua 11, Qd. 33, Lt. 44',
    bairro: '112 SUL',
    data: '11/00/2021 17:17',
    localizacao: [],
    imgUrl: 'https://thumbs.jusbr.com/imgs.jusbr.com/publications/images/1a28172b38b885fb9b3a335e0e998025'
  }, {
    titulo: 'Segundo título',
    endereco: 'Rua 11, Qd. 33, Lt. 44',
    bairro: '112 SUL',
    data: '11/00/2021 17:17',
    localizacao: [],
    imgUrl: 'https://thumbs.jusbr.com/imgs.jusbr.com/publications/images/1a28172b38b885fb9b3a335e0e998025'
  }
  ]);

  useEffect(() => {
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      </View>
    );
  } else {
    if (data == null || data.length === 0) {
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
          <FlatList
            scrollIndicatorInsets={{right: 1}}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) =>
              <TouchableOpacity onPress={() => navigation.push('FormularioVisitasScreen')}>
                <View style={{...styles.item, ...{marginTop: index == data.length - 1 ? 5 : 10,
                  backgroundColor: colors.card, borderColor: colors.border}}}>
                  <Image
                    style={styles.itemImg}
                    source={{uri: item.imgUrl}}
                  />
                  <View style={{...styles.itemTextContainer, ...{backgroundColor: colors.card}}}>
                    <Text style={{...styles.title, ...{color: colors.text}}}>{item.titulo}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontWeight: 'bold'}}>Endereço: </Text>
                      <Text style={{...styles.descricao, ...{color: colors.text}}}>{item.endereco}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontWeight: 'bold'}}>Bairro: </Text>
                      <Text style={{...styles.descricao, ...{color: colors.text}}}>{item.bairro}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontWeight: 'bold'}}>Data da visita: </Text>
                      <Text style={{...styles.descricao, ...{color: colors.text}}}>{item.data}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontWeight: 'bold'}}>Pessoas: </Text>
                      <Text style={{...styles.descricao, ...{color: colors.text}}}>3</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            }/>
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
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    fontSize: 24,
    borderRadius: 10,
    borderWidth: 1,
  },
  itemImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  itemTextContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    width: 0,
    paddingLeft: 5
  },
  title: {
    // fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  descricao: {
    flexWrap: 'wrap',
  }
});
