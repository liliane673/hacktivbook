// import React from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useEffect, useState } from 'react';
// import styles from '../utils/style';
import * as ImagePicker from 'expo-image-picker';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_POSTS } from '../components/PostLists';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';


const MUTATION_ADD_POST = gql`
 mutation AddPost($newPost: NewPost) {
  addPost(NewPost: $newPost)
}
`;

const GET_USER_BY_ID = gql`
  query GetUsersById {
  getUsersById {
    _id
    name
    username
    email
    password
    following {
      followingId
      followerId
      createdAt
      updatedAt
    }
    followerInfo {
      name
      username
      email
    }
    followingInfo {
      name
      username
      email
    }
    follower {
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
}
`;

function CreatePostScreen({ navigation, route }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [doAddPost, { loading: addingPost }] = useMutation(MUTATION_ADD_POST, {
        refetchQueries: [GET_POSTS],
    });

    const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID);
    // console.log({ loading, data, refetch }, 'data di create post screen ===>>')

    const [contentPost, setContentPost] = useState('');

    const handleAddPost = async () => {
        try {
            const result = await doAddPost({
                variables: { newPost: { content: contentPost, imgUrl: selectedImage } }
            })
            // console.log(result, result.data.addPost, '===>result add post')
            if (result?.data?.addPost) {
                Alert.alert("Success", "Success Create Post", [
                    { text: "OK", onPress: () => navigation.push('HomePage') }
                ]);
                setContentPost('')
            }
        } catch (error) {
            Alert.alert("Error", error.message)
            console.log(error.message)
        }
    }

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    useEffect(() => {
        if (!loading) {
            console.log({ loading, data }, 'data di create post screen ===>>')
        }
        refetch();
    }, [loading, data]);

    if (loading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
            <Text>Loading ...</Text>
        </View>
    }

    const pickImage = async () => {
        // console.log("request imagee--->>>")

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permission to access the gallery is required!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result, '====>disinii result image picker')

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };


    return (
        <SafeAreaProvider>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={90}
                >
                    <SafeAreaView style={[
                        styles.container,
                    ]}>

                        <View
                            style={[
                                {
                                    flex: 1,
                                    flexDirection: 'column',

                                },
                            ]}>
                            <View style={{ flex: 1, paddingLeft: 20, minHeight: 100 }} >
                                <View
                                    style={[
                                        {
                                            flexDirection: 'row',
                                        },
                                    ]}>
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                        <Image
                                            style={styles.picAddPost}
                                            source={{
                                                uri: `https://picsum.photos/700/700?random=${route._id}`,
                                            }}
                                        // source={{ uri: selectedImage }}
                                        />
                                    </View>
                                    <View style={{ flex: 4, justifyContent: "space-evenly" }} >
                                        <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>{data.getUsersById.name}</Text>

                                        <TouchableHighlight
                                            underlayColor=""
                                            style={{ height: 60 }}
                                            onPress={pickImage}>
                                            <View style={styles.buttonAddImage}>
                                                <Ionicons name="image-outline" size={15} color="black" />
                                                <Text style={styles.textButtonAddImage}> Add Image</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 3, paddingLeft: 20, paddingRight: 10, minHeight: 200, width: "100%", justifyContent: "flex-start" }} >
                                <TextInput
                                    onChangeText={setContentPost}
                                    value={contentPost}
                                    placeholder="What's on your mind?"
                                    multiline={true}
                                    keyboardType="text"
                                    textAlignVertical="top"
                                />
                            </View>
                            <View style={{ flex: 6, justifyContent: "center", alignItems: "center" }}>
                                <Image
                                    style={styles.previewImage}
                                    // source={{
                                    //     uri: 'https://reactnative.dev/img/tiny_logo.png',
                                    // }}
                                    source={{ uri: selectedImage }}
                                />
                            </View>
                        </View>
                        <TouchableHighlight
                            underlayColor=""
                            onPress={handleAddPost}>
                            <View style={styles.button}>
                                <Text style={styles.textButton}>Post</Text>
                            </View>
                        </TouchableHighlight>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaProvider >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    picAddPost: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    previewImage: {
        width: "80%",
        height: "80%",
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#1e85ff",
        padding: 10,
    },
    textButton: {
        color: '#eff7ff',
        fontSize: 15,
        fontWeight: "500",
    },
    buttonAddImage: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#e5e5e5",
        width: 100,
        padding: 5,
        flexDirection: "row",
        borderRadius: 30,
    },
    textButtonAddImage: {
        color: '#4e4b4b',
        fontSize: 10,
        fontWeight: "500",
    },
    textInput: {
        flex: 1,
        padding: 10,
        fontSize: 30,
        fontWeight: '500',
        textAlignVertical: 'top',
        width: "100%"
    }
})
export default CreatePostScreen