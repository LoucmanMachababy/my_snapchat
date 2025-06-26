import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from './Auth';

const SnapView = ({ route, navigation }) => {
  const { snapId, imageUrl, duration } = route.params;
  const { userToken } = useContext(AuthContext);
  const [timer, setTimer] = useState(Number(duration));

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          deleteSnap();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const deleteSnap = async () => {
    try {
      await axios.delete(`https://snapchat.epihub.eu/snap/${snapId}`, {
        headers: { 'x-api-key': userToken }
      });
    } catch (error) {
      console.error('Erreur suppression snap:', error);
    } finally {
      navigation.navigate('ReceivedSnaps');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      <Text style={styles.timer}>{timer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  image: { width: '90%', height: '80%' },
  timer: { position: 'absolute', top: 50, right: 20, fontSize: 24, color: '#fff', fontWeight: 'bold' }
});

export default SnapView;
