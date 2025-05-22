import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from './Auth';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);

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

      console.log('✅ Réponse API complète :', response.data);

      if (response.data.token) {
        login(response.data.token);
        navigation.replace('Splash');
      } else {
        // ✅ Inscription OK même sans token, on redirige vers Login
        Alert.alert("Succès", "Inscription réussie, connecte-toi !");
        navigation.navigate('Login');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.log('❌ Erreur API :', err.response?.data);
        setError(err.response?.data?.data || 'Erreur lors de l\'inscription');
      } else {
        console.error('❌ Erreur inconnue :', err);
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
      <Button title="S'inscrire" onPress={handleRegister} />
      <Button title="Déjà inscrit ? Se connecter" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});

export default RegisterScreen;
