import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Subheading, Switch, TextInput as TextInputNP } from 'react-native-paper';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import firestore from '@react-native-firebase/firestore';

if (__DEV__) {
  firestore().useEmulator('localhost', 8080);
}

const db = firestore();

export default () => {
  const [isEvangelico, setEvangelico] = useState(false);
  const [nome, setNome] = useState({ value: '', error: '' });
  const [telefone, setTelefone] = useState({ value: '', error: '' });
  const [nascimento, setNascimento] = useState({ value: '', error: '' });
  const [anotacoes, setAnotacoes] = useState({ value: '', error: '' });

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <TextInput
          label="Nome completo"
          value={nome.value}
          onChangeText={(text) => setNome({ value: text, error: '' })}
          right={<TextInputNP.Icon name='account' />}
          errorText={undefined}
          description={undefined}
        />
        <TextInput
          label="Telefone"
          value={telefone.value}
          onChangeText={(text) => setTelefone({ value: text, error: '' })}
          right={<TextInputNP.Icon name='phone' />}
          errorText={undefined}
          description={undefined}
          keyboardType="phone-pad"
        />
        <TextInput
          label="Nascimento"
          value={nascimento.value}
          onChangeText={(text) => setNascimento({ value: text, error: '' })}
          right={<TextInputNP.Icon name='calendar' />}
          errorText={undefined}
          description={undefined}
        />
        <View style={styles.containerSwitch}>
          <Subheading>Evangélico(a)?</Subheading>
          <View style={{width: 20}} />
          <Switch
            value={isEvangelico}
            onValueChange={setEvangelico}
          />
        </View>
        <TextInput
          label="Anotações"
          value={anotacoes.value}
          onChangeText={(text) => setAnotacoes({ value: text, error: '' })}
          right={<TextInputNP.Icon name='note' />}
          errorText={undefined}
          description={undefined}
          multiline={true}
        />
      </View>
      <Button
        mode="contained"
        style={undefined}
        onPress={() => {
          db.collection('visitas')
              .add({
                nome: nome.value,
                telefone: telefone.value,
                nascimento: nascimento.value,
                isEvangelico: isEvangelico,
                anotacoes: anotacoes.value,
                coord: new firestore.GeoPoint(53.483959, -2.244644),
                dataVisita: firestore.FieldValue.serverTimestamp()
              })
              .then(() => console.log('Inserido.'))
              .catch((error) => console.log(error));
        }}
      >
        Salvar
      </Button>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerSwitch: {
    flexDirection: 'row',
  }
});
