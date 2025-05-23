import React, { useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { AuthContext } from './Auth';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const bs = useRef(null);
  const fall = new Animated.Value(1);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      setImage(image.path);
      bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      setImage(image.path);
      bs.current.snapTo(1);
    });
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Choisissez une image</Text>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonText}>📷 Prendre une photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonText}>🖼️ Galerie</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.cancelButtonText}>❌ Annuler</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHandle} />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <BottomSheet
        ref={bs}
        snapPoints={[280, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />

      <Text style={styles.title}>👻 MySnapchat</Text>

      {image && (
        <Image source={{ uri: image }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.snapButton} onPress={() => bs.current.snapTo(0)}>
        <Text style={styles.snapButtonText}>📸 Ajouter une image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFC00', marginBottom: 30 },

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
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // Bottom sheet
  panel: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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

  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginTop: 10,
  },

  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default HomeScreen;