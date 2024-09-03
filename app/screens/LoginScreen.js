import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import styles from '../utils/style';
import { AuthContext } from '../contexts/AuthContext';
import { gql, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';


const MUTATION_LOGIN = gql`
 mutation LoginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    access_token
  }
}
`;


function LoginScreen({ navigation }) {
    const [doLogin, { loading }] = useMutation(MUTATION_LOGIN);

    const { SetIsLoggedIn } = useContext(AuthContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    fetchlogin = async () => {
        const result = await SecureStore.getItemAsync("accessToken")
        // console.log(result, 'fetch login=>>>')
        return result
    }
    useEffect(() => {
        fetchlogin()
    }, [])
    const login = async () => {
        // console.log({ username, password })
        try {
            const result = await doLogin({
                variables: { username: username, password: password }
            })
            // console.log(result, result.data.loginUser.access_token, '===>result login')
            await SecureStore.setItemAsync("accessToken", result.data.loginUser.access_token);
            SetIsLoggedIn(true)
        } catch (error) {
            Alert.alert("Error", error.message)
            console.log(error.message)
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: "row", margin: 20 }}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../assets/logo.png')}
                    />
                    <Text style={styles.title}>
                        Hacktivbook
                    </Text>
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Username"
                    keyboardType="text"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Password"
                    keyboardType="text"
                    secureTextEntry={true}
                />
                <TouchableHighlight
                    underlayColor=""
                    onPress={login}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>
                            {loading ? "Loading" : "Log In"}
                        </Text>
                    </View>
                </TouchableHighlight>

                <View>
                    <Text style={styles.text}>Don't have an account?</Text>
                </View>
                <TouchableHighlight
                    underlayColor=""
                    onPress={() => navigation.navigate('RegisterPage')}>
                    <View style={styles.buttonOutline}>
                        <Text style={styles.textButtonOutline}>Create new account</Text>
                    </View>
                </TouchableHighlight>
            </SafeAreaView>
        </SafeAreaProvider >
    );
}

export default LoginScreen