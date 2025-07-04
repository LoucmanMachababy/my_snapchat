import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import LoginScreen from './Login';
import RegisterScreen from './Register';
import HomeScreen from './Home';
import SplashScreen from './SplashScreen';
import SendSnap from './SendSnap';
import ReceivedSnaps from './ReceivedSnaps';
import SnapView from './SnapView';
import { AuthProvider, AuthContext } from './Auth';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userToken ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SendSnap" component={SendSnap} />
          <Stack.Screen name="ReceivedSnaps" component={ReceivedSnaps} />
          <Stack.Screen name="SnapView" component={SnapView} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
