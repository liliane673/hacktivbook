import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './navigators/MainStack';
import { ApolloProvider } from '@apollo/client';
import client from './config/apollo';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import * as SecureStore from 'expo-secure-store';
import { View, Image, Text } from 'react-native';

function AppContent() {
  const { SetIsLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    // console.log(accessToken, 'accessToken get Token di app');
    if (accessToken) {
      SetIsLoggedIn(true);
    }
  };

  const loadApp = async () => {
    await getToken();
    setLoading(false);
  };

  useEffect(() => {
    loadApp();
  }, []);

  // console.log('useEffect finished');
  // console.log(loading, 'loading app js after useEffect>>');

  if (loading) {
    return (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <Image style={{ width: 40, height: 40, marginRight: 10 }} source={require('./assets/logo.png')} />
        <Text style={{ fontSize: 30, color: "#1e85ff", fontWeight: "bold" }}>Hacktivbook</Text>
      </View>
    )
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
