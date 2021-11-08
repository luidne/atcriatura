import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Subheading, Switch, TextInput as TextInputNP } from 'react-native-paper';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

export default () => {
  const [isEvangelico, setEvangelico] = useState(false);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View style={{flex: 1}}>
        <TextInput
          label="Nome completo"
          right={<TextInputNP.Icon name='account' />}
          errorText={undefined}
          description={undefined}
        />
        <TextInput
          label="Telefone"
          right={<TextInputNP.Icon name='phone' />}
          errorText={undefined}
          description={undefined}
          keyboardType="phone-pad"
        />
        <TextInput
          label="Nascimento"
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
          right={<TextInputNP.Icon name='note' />}
          errorText={undefined}
          description={undefined}
          multiline={true}
        />
      </View>
      <Button
        mode="contained"
        style={undefined}>
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
