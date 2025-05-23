import React, { useState, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from './Auth';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setError('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email invalide');
      return;
    }

    if (!password) {
      setError('Mot de passe requis');
      return;
    }

    try {
      const response = await axios.put(
        'https://snapchat.epihub.eu/user',
        { email, password },
        {
          headers: {
            'x-api-key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvdWNtYW4ubWFjaGFiYWJ5QGVwaXRlY2guZXUiLCJpYXQiOjE3NDc5MjUxMzB9.kfkW-TYzTeeFxBohUOJPR-iupXBJ7zaxbsS-_PhnMcw',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Réponse API complète :', response.data);

      const token = response.data.data?.token;
      if (token) {
        login(token);
      } else {
        setError('Connexion échouée : token manquant');
      }
    } catch (err: any) {
      console.error('Erreur API :', err.response?.data || err.message);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.data || 'Email ou mot de passe incorrect');
      } else {
        setError('Une erreur inconnue est survenue');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Pas encore de compte ? S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFC00', justifyContent: 'center', padding: 20 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#000', marginBottom: 30, textAlign: 'center' },
  input: { height: 50, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15, marginBottom: 15 },
  button: { backgroundColor: '#000', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#000', textAlign: 'center', marginTop: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});

export default LoginScreen;
