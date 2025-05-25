import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    if (!username || !email || !password) {
      setError('Tous les champs sont obligatoires');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Adresse e-mail invalide');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    try {
      const response = await axios.post(
        'https://snapchat.epihub.eu/user',
        { email, password, username },
        {
          headers: {
            'x-api-key':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxvdWNtYW4ubWFjaGFiYWJ5QGVwaXRlY2guZXUiLCJpYXQiOjE3NDc5MjUxMzB9.kfkW-TYzTeeFxBohUOJPR-iupXBJ7zaxbsS-_PhnMcw',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Réponse API:', response.data);

      if (response.data._id) {
        navigation.navigate('Login', { message: 'Inscription réussie, veuillez vous connecter.' });
      } else {
        setError('Inscription échouée');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Erreur lors de l'inscription");
      } else {
        setError("Une erreur inattendue s'est produite");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inscription</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Déjà inscrit ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: 'yellow', paddingHorizontal: 20 },
  header: { fontSize: 32, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 30 },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderColor: '#000',
    borderWidth: 1,
  },
  error: { color: 'red', textAlign: 'center', marginBottom: 15 },
  button: {
    marginTop: 10,
    backgroundColor: '#000',
    borderRadius: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default RegisterScreen;
