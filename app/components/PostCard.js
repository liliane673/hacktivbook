import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function getMinutesDifference(createdAt) {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    const differenceInMs = now - createdAtDate;
    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

    return differenceInMinutes;
}

function PostCard({ post, onPress }) {
    let minutesDifference = getMinutesDifference(post.createdAt);
    let hourDifference = 0;

    if (minutesDifference > 60) {
        hourDifference = Math.floor(minutesDifference / 60)
    }
    // console.log(hourDifference, 'hours in comment')


    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.containerPostCard}>
                <View style={styles.headerContainer}>
                    <Image
                        style={styles.picAddPost}
                        source={{
                            uri: `https://picsum.photos/700/700?random=${post._id}`,
                        }}
                    />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.authorName}>{post?.author?.name}</Text>
                        <View style={styles.timeContainer}>
                            <Ionicons name="time-outline" size={16} color="black" />
                            <Text style={styles.timeText}>
                                {hourDifference > 0 ? `${hourDifference}h` : ''} {minutesDifference % 60}m ago
                            </Text>
                        </View>
                    </View>
                    <View style={styles.iconContainer}>
                        <Ionicons name="ellipsis-horizontal-outline" size={24} color="black" />
                        <Ionicons name="close" size={24} color="black" />
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.postContent}>{post.content}</Text>
                    <Image
                        style={styles.postImage}
                        source={{
                            uri: `${post.imgUrl ? post.imgUrl : `https://picsum.photos/700/700?random=${post._id}`}`
                        }}
                    />
                </View>

                <View style={styles.footerContainer}>
                    <View style={styles.footerItem}>
                        <Ionicons name="heart-circle" size={24} color="black" />
                        <Text>{post.likes.length} {post.likes.length > 1 ? "Likes" : "Like"}</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <Text>{post.comments.length} {post.comments.length > 1 ? "Comments" : "Comment"}</Text>
                    </View>
                </View>

                <View style={styles.actionContainer}>
                    <View style={styles.actionItem}>
                        <Ionicons name="heart-outline" size={24} color="black" />
                        <Text> Like</Text>
                    </View>
                    <View style={styles.actionItem}>
                        <Ionicons name="chatbox-outline" size={24} color="black" />
                        <Text> Comment</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerPostCard: {
        backgroundColor: '#ffffff',
        borderBottomColor: "#d2cfcf",
        borderBottomWidth: 3,
        padding: 10,
        marginBottom: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    picAddPost: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    headerTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    authorName: {
        fontWeight: '700',
        fontSize: 18,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 12,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    contentContainer: {
        marginBottom: 10,
    },
    postContent: {
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
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

export default PostCard;
