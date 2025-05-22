import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from './Auth';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from './Auth';


const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        'https://snapchat.epihub.eu/user',
        { email, password, username },
        { headers: { 'x-api-key': 'TA_CLE_API' } }
      );
  
      if (response.data.token) {
        login(response.data.token); 
        navigation.replace('Splash');
      } else {
        setError("Erreur à l'inscription");
      }
    } catch (err) {
      setError("Erreur lors de l'inscription");
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



const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        'https://snapchat.epihub.eu/user',
        { email, password, username },
        { headers: { 'x-api-key': 'TA_CLE_API' } }
      );
  
      if (response.data.token) {
        login(response.data.token); 
        navigation.replace('Splash');
      } else {
        setError("Erreur à l'inscription");
      }
    } catch (err) {
      setError("Erreur lors de l'inscription");
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
