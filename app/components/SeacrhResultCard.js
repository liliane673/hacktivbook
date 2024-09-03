import { FlatList, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

function SearchResultCard({ search, index, handleFollow }) {
    const [isFollowed, setIsFollowed] = useState(false);

    const handleFollowClick = () => {
        handleFollow(search._id);
        setIsFollowed(true);
    };

    let number = Math.ceil(Math.random())
    return (
        <View
            style={[
                styles.container,
                {
                    flex: 1,
                    flexDirection: 'row',
                    // backgroundColor: "yellow",
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
            <View style={{ flex: 2 }}>
                <View
                    style={[
                        styles.containerFlex,
                        {
                            flexDirection: 'column',
                            // backgroundColor: "blue"
                        },
                    ]}>
                    <View>
                        <View style={{ flexDirection: "column", alignItems: "baseline" }}>
                            <Text style={{ fontWeight: 700, fontSize: 20 }}>
                                {search?.name}
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                {search.username}
                            </Text>
                            <TouchableHighlight
                                underlayColor=""
                                onPress={handleFollowClick}
                                disabled={isFollowed}
                            >
                                <View
                                    style={[
                                        styles.addFollowButton,
                                        {
                                            backgroundColor: isFollowed ? 'gray' : '#1e85ff',
                                        },
                                    ]}
                                >
                                    <Text style={styles.textAddFollowButton}>Follow</Text>
                                </View>
                            </TouchableHighlight>
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
        padding: 5,
        justifyContent: "flex-start",
        // backgroundColor: "yellow"
    },
    containerFlex: {
        flex: 1,
    },
    picAddPost: {
        width: 70,
        height: 70,
        borderRadius: 50
    },
    addFollowButton: {
        backgroundColor: "#1e85ff",
        borderRadius: 20,
        height: 30,
        width: 100,
        justifyContent: "center"
    },
    textAddFollowButton: {
        fontSize: 10,
        fontWeight: "700",
        textAlign: "center",
        color: '#eff7ff',
    }
})

export default SearchResultCard