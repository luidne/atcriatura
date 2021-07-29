import { useTheme } from 'react-native-paper';
import React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView, useColorScheme } from 'react-native';

export default function Background({ children }) {
  const {colors} = useTheme();

  return (
    <ImageBackground
      resizeMode="repeat"
      style={{...styles.background, ...{backgroundColor: colors.background}}}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});