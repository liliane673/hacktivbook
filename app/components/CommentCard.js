import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

function getMinutesDifference(createdAt) {
    const createdAtDate = new Date(createdAt);
    const now = new Date();
    console.log(now, 'now>>')
    const differenceInMs = now - createdAtDate;
    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));

    return differenceInMinutes;
}

function CommentCard({ comment, index }) {
    console.log(comment, 'comment===>>')
    let minutesDifference = getMinutesDifference(comment.createdAt);
    let hourDifference = 0;

    if (minutesDifference > 60) {
        hourDifference = Math.floor(minutesDifference / 60)
    }
    // console.log(hourDifference, 'hours in comment')

    return (
        <View
            style={[
                styles.container,
                {
                    flex: 1,
                    flexDirection: 'row',
                },
            ]}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                <Image
                    style={styles.picAddPost}
                    source={{
                        uri: `https://picsum.photos/700/700?random=${index}`,
                    }}
                />
            </View>
            <View style={{ flex: 4 }}>
                <View
                    style={[
                        styles.containerFlex,
                        {
                            flexDirection: 'column',
                        },
                    ]}>
                    <View style={styles.commenCard}>
                        <View style={{ marginBottom: 10, flexDirection: "row", alignItems: "baseline" }}>
                            <Text style={{ fontWeight: 700, fontSize: 14 }}>
                                {comment?.username}
                            </Text>
                            <Text style={{ fontSize: 10 }}>
                                {hourDifference > 0 ? `${hourDifference}h` : ''} {minutesDifference % 60}m ago
                            </Text>
                        </View>

                        <View>
                            <Text style={{ fontSize: 12 }}>{comment?.content}</Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    containerPostCard: {
        height: 100
    },
    containerFlex: {
        flex: 1,
    },
    picAddPost: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    commenCard: {
        flex: 1,
        backgroundColor: "#e4e4e4",
        justifyContent: "flex-start",
        borderRadius: 10,
        padding: 10
    }
})

export default CommentCard