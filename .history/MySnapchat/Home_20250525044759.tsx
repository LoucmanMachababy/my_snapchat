import React, { useState, useRef, useContext, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { AuthContext } from './Auth';

type User = {
  _id: string;
  email: string;
  username: string;
  profilePicture: string;
};

const HomeScreen = () => {
  const { logout, userToken } = useContext(AuthContext);

  const [image, setImage] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [duration, setDuration] = useState('');
  const [showSendPanel, setShowSendPanel] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%'], []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://snapchat.epihub.eu/user', {
        headers: {
          'x-api-key': '...',
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error('Erreur chargement utilisateurs :', err);
      Alert.alert('Erreur', 'Impossible de charger les utilisateurs.');
    }
  };

  const takePhotoFromCamera = async () => {
    try {
      const result = await ImagePicker.openCamera({
        compressImageMaxWidth: 300,
        compressImageMaxHeight: 300,
        cropping: true,
        compressImageQuality: 0.7,
        includeBase64: true,
      });
      setImage(`data:${result.mime};base64,${result.data}`);
      handleCloseSheet();
      await fetchUsers();
      setShowSendPanel(true);
    } catch (error) {
      console.log('Camera annulée ou erreur :', error);
    }
  };

  const choosePhotoFromLibrary = async () => {
    try {
      const result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7,
        includeBase64: true,
      });
      setImage(`data:${result.mime};base64,${result.data}`);
      handleCloseSheet();
      await fetchUsers();
      setShowSendPanel(true);
    } catch (error) {
      console.log('Galerie annulée ou erreur :', error);
    }
  };

  const sendSnap = async () => {
    if (!selectedUser || !duration || !image) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    const durationValue = parseInt(duration, 10);
    if (isNaN(durationValue)) {
      Alert.alert('Erreur', 'Durée invalide.');
      return;
    }

    const payload = {
      to: selectedUser,
      image,
      duration: durationValue,
    };

    console.log('Envoi du snap avec :', payload);

    try {
      await axios.post('https://snapchat.epihub.eu/snap', payload, {
        headers: {
          'x-api-key': '...',
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Succès', 'Snap envoyé !');
      setImage(null);
      setSelectedUser(null);
      setDuration('');
      setShowSendPanel(false);
    } catch (err) {
      console.error('Erreur envoi :', err);
      Alert.alert('Erreur', "L'envoi du snap a échoué.");
    }
  };

  const renderBottomSheetContent = () => (
    <BottomSheetView style={styles.panel}>
      <Text style={styles.panelTitle}>Choisissez une image</Text>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonText}>Prendre une photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonText}>Galerie</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCloseSheet}>
        <Text style={styles.cancelButtonText}>Annuler</Text>
      </TouchableOpacity>
    </BottomSheetView>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#fff' }}
      >
        {renderBottomSheetContent()}
      </BottomSheet>

      <Text style={styles.title}>👻 MySnapchat</Text>

      {image && <Image source={{ uri: image }} style={styles.previewImage} />}

      <TouchableOpacity style={styles.snapButton} onPress={() => bottomSheetRef.current?.expand()}>
        <Text style={styles.snapButtonText}>Ajouter une image</Text>
      </TouchableOpacity>

      {showSendPanel && (
        <View style={{ width: '100%' }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Choisissez un destinataire :</Text>
          <FlatList
            data={users}
            keyExtractor={(item) => item._id}
            style={{ maxHeight: 200 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.userItem,
                  selectedUser === item._id && styles.userSelected,
                ]}
                onPress={() => setSelectedUser(item._id)}
              >
                <Text>{item.username || item.email}</Text>
              </TouchableOpacity>
            )}
          />
          <TextInput
            placeholder="Durée en secondes"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendSnap}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
  sessionExpired: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 30 },
  snapButton: {
    backgroundColor: '#FFFC00',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  snapButtonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  logoutButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  panel: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  panelTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  panelButton: {
    padding: 12,
    width: '100%',
    backgroundColor: '#FFFC00',
    borderRadius: 10,
    marginVertical: 5,
  },
  panelButtonText: { color: '#000', fontWeight: 'bold', textAlign: 'center' },
  cancelButton: { marginTop: 10 },
  cancelButtonText: { color: 'red', fontWeight: '600' },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  userItem: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 5,
  },
  userSelected: {
    backgroundColor: '#FFFC00',
  },
  input: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  sendButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
