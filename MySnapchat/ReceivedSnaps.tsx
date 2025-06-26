import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from './Auth';

const ReceivedSnaps = ({ navigation }: any) => {
  const { userToken } = useContext(AuthContext);
  const [snaps, setSnaps] = useState([]);

  useEffect(() => {
    const fetchSnaps = async () => {
      try {
        const res = await axios.get('https://snapchat.epihub.eu/snaps', {
          headers: { 'x-api-key': userToken },
        });
        setSnaps(res.data);
      } catch (error) {
        console.error('Erreur chargement snaps:', error);
      }
    };

    fetchSnaps();
  }, []);

  const handleOpenSnap = (snap: any) => {
    navigation.navigate('SnapView', {
      snapId: snap._id,
      imageUrl: snap.image,
      duration: snap.duration,
    });
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleOpenSnap(item)}
    >
      <Text style={styles.text}>📩 Snap de {item.from}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Snaps reçus</Text>
      <FlatList
        data={snaps}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFFC00',
    marginVertical: 8,
    alignItems: 'center',
  },
  text: { fontSize: 16, fontWeight: 'bold' },
});

export default ReceivedSnaps;
