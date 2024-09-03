// import React from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import styles from '../utils/style';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const MUTATION_REGISTER = gql`
 mutation RegisterUser($username: String!, $email: String!, $password: String!, $name: String!) {
  registerUser(username: $username, email: $email, password: $password, name: $name)
}
`;

function RegisterScreen({ navigation }) {
    const [doRegister, { loading }] = useMutation(MUTATION_REGISTER);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        // console.log({ name, username, password, email })
        try {
            const result = await doRegister({
                variables: { name: name, username: username, email: email, password: password }
            })
            // console.log(result, '===>> result di register')
            if (result?.data?.registerUser) {
                Alert.alert("Success", "Account created successfully", [
                    { text: "OK", onPress: () => navigation.navigate('LoginPage') }
                ]);
            }

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
                    onChangeText={setName}
                    value={name}
                    placeholder="Name"
                    keyboardType="text"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Username"
                    keyboardType="text"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    keyboardType="email"
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
                    onPress={register}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}> {loading ? "Loading" : "Create new account"}</Text>
                    </View>
                </TouchableHighlight>

                <View>
                    <Text style={styles.text}>Already have an account?</Text>
                </View>
                <TouchableHighlight
                    underlayColor=""
                    onPress={() => navigation.navigate('LoginPage')}>
                    <View style={styles.buttonOutline}>
                        <Text style={styles.textButtonOutline}>Login here</Text>
                    </View>
                </TouchableHighlight>
            </SafeAreaView>
        </SafeAreaProvider >
    );
}



export default RegisterScreen