import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from './Auth';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur MySnapchat !</Text>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFC00', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000', textAlign: 'center', marginBottom: 20 },
  button: { backgroundColor: '#000', padding: 15, borderRadius: 10, alignItems: 'center', width: '80%' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default HomeScreen;