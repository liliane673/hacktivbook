import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import styles from '../utils/style';
import AddPostHomeScreen from '../components/AddPostHomeScreen';
import PostList from '../components/PostLists';


function HomeScreen({ navigation }) {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.containerHomeScreen}>
                <View >
                    <AddPostHomeScreen onPress={() => {
                        navigation.navigate("CreatePost");
                    }} />
                </View>
                <View style={styles.containerHomeScreen}>
                    <PostList navigation={navigation} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider >
    );
}

export default HomeScreen