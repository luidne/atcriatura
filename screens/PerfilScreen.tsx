import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import TextInput from '../components/TextInput';
import Image from '../components/Image';
import Auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Button, Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export default function PerfilScreen() {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<FirebaseAuthTypes.User | undefined>(undefined);
  const [displayName, setDisplayName] = useState('');
  const [textBtnSave, setTxtBtnSave] = useState('Salvar alterações');

  useEffect(() => {
    setIsLoading(true);
    const user = Auth().currentUser;
    setData(user);
    setDisplayName(user.displayName);
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
    if(data == null || undefined) {
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
            <ScrollView>
              <View style={{
                padding: 10,
                alignItems: 'center',
              }}>
                <Image
                    style={styles.itemImg}
                    source={{uri: data.photoURL}}
                />
                <Title>{data.email}</Title>
                <Button style={styles.btnLogout} icon='logout' mode='outlined' onPress={() => {
                  Auth().signOut();
                }}>Sair</Button>
              </View>
              <View style={{paddingHorizontal:10}}>
                <TextInput
                  label="Nome"
                  value={displayName}
                  onChangeText={setDisplayName}
                />
                <Button style={styles.btnSave} icon="pencil" mode='contained' onPress={() => {
                  setTxtBtnSave('Salvando');

                  const user = Auth().currentUser;
                  user?.updateProfile({
                    displayName: displayName
                  }).then(() => {
                    console.log(`Sucesso na atualização de perfil.`);
                    setTxtBtnSave('Salvas com sucesso');
                  }).catch((error)=> {
                    console.log(`Erro na atualização de perfil. ${error.message}`);
                    setTxtBtnSave('Ops! Tente houve um erro.');
                  });
                }}>
                  {textBtnSave}
                </Button>
              </View>
            </ScrollView>
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
  },
  btnLogout: {
    margin: 5,
  },
  btnSave: {
    paddingVertical: 5,
  }
});
