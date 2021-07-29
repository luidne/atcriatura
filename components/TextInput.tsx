import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input, useTheme } from 'react-native-paper';
import Colors from '../constants/Colors';

export default function TextInput({ errorText, description, ...props }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Input
        style={{...styles.input}}
        selectionColor={theme.colors.text}
        placeholderTextColor='red'
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={{...styles.description, ...{color: theme.colors.text}}}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    // backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: Colors.error,
    paddingTop: 8,
  },
});