import React, { useContext } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

function LogoTitle({ }) {
    const { SetIsLoggedIn } = useContext(AuthContext);
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, flexDirection: "row", paddingRight: 30, justifyContent: "space-between", alignItems: "center" }}>

            <TouchableHighlight
                underlayColor=""
                style={{ height: 60 }}
                onPress={() => navigation.navigate('HomePage')}>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Image style={{ width: 40, height: 40, marginRight: 10 }} source={require('../assets/logo.png')} />
                    <Text style={{ fontSize: 30, color: "#1e85ff", fontWeight: "bold" }}>Hacktivbook</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                underlayColor=""
                onPress={async () => {
                    const resultTokenPrevious = await SecureStore.getItemAsync("accessToken");
                    // console.log(resultTokenPrevious, '===>> result token SEBELUM logout');
                    const result = await SecureStore.deleteItemAsync("accessToken");
                    // console.log(result, '===>> result logout');
                    SetIsLoggedIn(false);
                }}>
                <Ionicons name="log-out-outline" size={30} color="#5b5b5b" />
            </TouchableHighlight>
        </View>
    );
}

export default LogoTitle;
