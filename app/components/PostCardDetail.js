import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { gql, useMutation } from '@apollo/client';
import { GET_POSTS_BY_ID } from '../utils/query';


const MUTATION_LIKE_POST = gql`
 mutation AddLikePost($newLike: NewLike) {
  addLikePost(NewLike: $newLike)
}
`;

function getMinutesDifference(createdAt) {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const differenceInMs = now - createdAtDate;
    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

    return differenceInMinutes;
}

function PostCardDetail({ post, onCommentPress }) {
    const [doAddLike, { loading, refetch }] = useMutation(MUTATION_LIKE_POST, {
        refetchQueries: [GET_POSTS_BY_ID],
    });

    const handleLike = async () => {
        // console.log("pressed like", post, post._id)

        try {
            const result = await doAddLike({
                variables: { newLike: { postId: post._id } }
            })
            // console.log(result, '===>result like post')
        } catch (error) {
            Alert.alert("Error", error.message)
            console.log(error.message)
        }
    }

    // console.log(post, typeof (post), "post di postcarddetail ===>>> newww")
    // console.log(post._id)
    const minutesDifference = getMinutesDifference(post?.createdAt);
    let hourDifference = 0;

    if (minutesDifference > 60) {
        hourDifference = Math.floor(minutesDifference / 60)
    }
    // console.log(hoursDifference, 'hour difference')


    return (
        <View style={styles.containerPostCard}>

            <View style={styles.header}>
                <Image
                    style={styles.profilePic}
                    source={{ uri: `https://picsum.photos/700/700?random=${post._id}` }}
                />
                <View style={styles.headerText}>
                    <Text style={styles.username}>{post.author?.name} </Text>
                    <Text style={styles.timestamp}>
                        {hourDifference > 0 ? `${hourDifference}h` : ''} {minutesDifference % 60}m ago
                    </Text>
                </View>
                <Ionicons name="ellipsis-horizontal" size={24} color="black" />
            </View>


            <View style={styles.content}>
                <Text style={styles.postText}>{post.content}</Text>
                <Image
                    style={styles.postImage}
                    source={{ uri: `${post.imgUrl ? post.imgUrl : `https://picsum.photos/700/700?random=${post._id}`}` }}
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.footerIcon}>
                    <Ionicons name="heart-circle" size={24} color="black" />
                    <Text style={styles.footerText}>{post.likes?.length} {post.likes?.length > 1 ? "Likes" : "Like"}</Text>
                </View>
                <View style={styles.footerIcon}>
                    <Ionicons name="chatbox-outline" size={24} color="black" />
                    <Text style={styles.footerText}>{post.comments?.length} {post.comments?.length > 1 ? "Comments" : "Comment"}</Text>
                </View>

            </View>

            <View style={styles.actionContainer}>
                <TouchableHighlight underlayColor="" onPress={handleLike}>
                    <View style={styles.actionItem}>
                        <Ionicons name="heart-outline" size={24} color="black" />
                        <Text> Like</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="" onPress={onCommentPress}>
                    <View style={styles.actionItem}>
                        <Ionicons name="chatbox-outline" size={24} color="black" />
                        <Text> Comment</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerPostCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    headerText: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    timestamp: {
        fontSize: 12,
        color: '#8c8c8c',
    },
    content: {
        marginBottom: 10,
    },
    postText: {
        marginBottom: 10,
        fontSize: 16,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        marginLeft: 5,
        fontSize: 14,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        paddingTop: 10,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PostCardDetail;
