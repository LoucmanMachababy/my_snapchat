import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from './Auth'; 

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.put(
        'https://snapchat.epihub.eu/user',
        { email, password },
        {
          headers: {
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvdWNtYW4ubWFjaGFiYWJ5QGVwaXRlY2guZXUiLCJpYXQiOjE3NDc5MjUxMzB9.kfkW-TYzTeeFxBohUOJPR-iupXBJ7zaxbsS-_PhnMcw', // remplace ici
          },
        }
      );

      const token = response.data.token;
      if (token) {
        login(token); 
        navigation.replace('Splash'); 
      } else {
        setError('Aucun token reçu.');
      }
    } catch (err) {
      console.error(err);
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Connexion</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Button title="Pas encore de compte ? S'inscrire" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});

export default LoginScreen;
