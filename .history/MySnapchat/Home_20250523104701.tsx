import React, { useState, useRef, useContext, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from '@gorhom/bottom-sheet';
import { AuthContext } from './Auth';

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const [image, setImage] = useState<string | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '0%'], []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      setImage(image.path);
      handleCloseSheet();
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
      handleCloseSheet();
    });
  };

  const renderBottomSheetContent = () => (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Choisissez une image</Text>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonText}>Prendre une photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonText}>Galerie</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCloseSheet}>
        <Text style={styles.cancelButtonText}>❌ Annuler</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        {renderBottomSheetContent()}
      </BottomSheet>

      <Text style={styles.title}>👻 MySnapchat</Text>

      {image && (
        <Image source={{ uri: image }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.snapButton} onPress={() => bottomSheetRef.current?.expand()}>
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

  panel: {
    flex: 1,
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
});

export default HomeScreen;
