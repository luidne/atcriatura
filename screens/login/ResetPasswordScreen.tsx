import React, { useState } from 'react';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { emailValidator } from '../../helpers/emailValidator';
import Auth from '@react-native-firebase/auth';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    Auth().sendPasswordResetEmail(email.value)
      .then(() => {
        console.log(`Mensagem de recuperação enviada para ${email.value}`);
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        console.log(`Erro ao enviar mensagem de recuperação enviada para ${email.value}. Erro: ${error.message}`);
      });    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Recuperar Senha</Header>
      <TextInput
        label="E-mail"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Você receberá uma mensagem de e-mail com o link de recuperação."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Enviar Instruções
      </Button>
    </Background>
  );
};