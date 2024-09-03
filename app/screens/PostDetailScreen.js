// import React from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import CommentCard from '../components/CommentCard';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PostCardDetail from '../components/PostCardDetail';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import { GET_POSTS_BY_ID } from '../utils/query';


const MUTATION_ADD_COMMENT = gql`
  mutation AddCommentPost($newComment: NewComment) {
  addCommentPost(NewComment: $newComment)
}
`;

function PostDetailScreen({ navigation, route }) {
    const [comment, setComment] = useState('');
    const commentInputRef = useRef(null);

    const [addComment] = useMutation(MUTATION_ADD_COMMENT);

    const { loading, error, data, refetch } = useQuery(GET_POSTS_BY_ID, {
        variables: { id: route.params.id },
    });

    if (loading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
            <Text>Loading ...</Text>
        </View>
    }

    if (error) {
        return <Text>{error.message}</Text>
    }
    // mutation comment section

    const sendComment = async () => {
        // console.log("send comment")
        try {
            const result = await addComment({
                variables: { newComment: { content: comment, postId: route.params.id } }
            })

            if (result && result.data) {
                setComment("");
                Keyboard.dismiss();
                Alert.alert("Success", "Success Add Comment");

                await refetch()
            }
        } catch (error) {
            Alert.alert("Error", error.message)
            console.log(error.message)
        }
    }

    const focusCommentInput = () => {
        if (commentInputRef.current) {
            commentInputRef.current.focus();
        }
    };


    return (
        <SafeAreaProvider>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={60}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
                    <ScrollView>
                        <View style={{ flex: 4 }}>
                            <PostCardDetail post={data.getPostById} onCommentPress={focusCommentInput} />
                        </View>

                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={data.getPostById.comments}
                                renderItem={({ item, index }) => (
                                    <CommentCard comment={item} index={index} />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                                style={{ flex: 1 }}
                                scrollEnabled={false}
                            />
                        </View>

                    </ScrollView>

                    <View style={styles.commentInputContainer}>
                        <View style={{ flex: 7 }} >
                            <TextInput
                                ref={commentInputRef}
                                style={styles.text}
                                onChangeText={setComment}
                                value={comment}
                                placeholder="Add a comment ..."
                                keyboardType="text"
                            />
                        </View>
                        <View style={{ flex: 1 }} >
                            <TouchableHighlight
                                underlayColor=""
                                onPress={sendComment}>
                                <View style={styles.button}>
                                    <Feather name="send" size={30} color="#b4b1b1" />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
            {/* </TouchableWithoutFeedback> */}
        </SafeAreaProvider >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    containerPostCard: {
        flex: 1,
        backgroundColor: '#ead1dc',
    },
    containerFlex: {
        flex: 1,
    },
    picAddPost: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    text: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#e4e4e4",
        padding: 10,
    },
    commentInputContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },

})

export default PostDetailScreen;