import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, StyleSheet, Text, Alert } from 'react-native';
import { supabase } from './index';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    setLoading(false); 

    if (error) {
      console.log('Erro ao enviar o email:', error.message);
    } else {
      console.log('Email enviado! Verifique a caixa de entrada.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Redefinir Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Button title="Enviar Email" onPress={handleForgotPassword} />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    width: '50%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loading: {
    marginTop: 20,
  },
});

export default ForgotPasswordScreen;
