import React from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import PostCard from './PostCard';
import { gql, useQuery } from '@apollo/client';
// import styles from '../utils/style';

export const GET_POSTS = gql`
  query GetPosts {
  getPosts {
    _id
    content
    tags
    imgUrl
    authorId
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    comments {
      content
      username
      createdAt
      updatedAt
    }
    author {
      name
      username
      email
    }
  }
}
`;

function PostList({ navigation }) {
    const { loading, error, data } = useQuery(GET_POSTS);
    // console.log({ loading, error, data })

    if (loading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
            <Text>Loading ...</Text>
        </View>
    }

    if (error) {
        return <Text>{error.message}</Text>
    }

    return (

        <FlatList
            data={data.getPosts}
            renderItem={({ item }) => {
                return <PostCard
                    post={item}
                    onPress={() => {
                        navigation.navigate("DetailPost", {
                            id: item._id,
                        });
                    }}
                />
            }}
            keyExtractor={item => item._id}
        />
    );
}

export default PostList