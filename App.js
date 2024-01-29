import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/LoginScreen/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export default function App() {
  return (
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey='pk_test_dG9sZXJhbnQtc25ha2UtNDAuY2xlcmsuYWNjb3VudHMuZGV2JA'>
    <View style={styles.container}>
      
      {/* Sign In Component */}
      <SignedIn>
          <Text>You are Signed in</Text>
      </SignedIn>
      {/* SignOut Component */}
      <SignedOut>
      <Login/>
      </SignedOut>
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:20
  },
});
