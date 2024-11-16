import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet,Image } from 'react-native';
import uvv from '@/assets/images/uvv.png'
import { supabase } from './index';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      
      console.log('Usuário logado:', user); 
      navigation.replace('Groups'); 
    } catch (error) {
      console.error('Erro ao realizar login:', error.message); 
    }
  };

  return (
    <View style={styles.container}>
      <Image source={uvv}/>
      <Text style={styles.header}>InovaWeek 2025</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
 
      <View style={styles.footer}>
      <Button title="Entrar" onPress={handleLogin} />
        <Button title="Cadastro" onPress={() => navigation.navigate('SignUp')} />
        <Button title="Esqueci a senha" onPress={() => navigation.navigate('ForgotPassword')} />
      </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 40,
    marginBottom: 40,
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
  footer: {
    marginTop: 20,
    height: '150px',
    justifyContent: 'space-between',
  },
});

export default LoginScreen;
