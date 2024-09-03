
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';


function ProfileDetail({ dataProfileUser, chooseButtonFollow, handleSearchClicked, setInputToSearch }) {
    const [searchInput, setSearchInput] = useState('')

    const handleInputChange = (text) => {
        setSearchInput(text);
    };

    const handleSearchPress = () => {
        setInputToSearch(searchInput);
        handleSearchClicked();
    };

    return (

        <View
            style={[
                styles.container,
                { flexDirection: 'column', },
            ]}>

            <View style={{ flex: 2.5, justifyContent: "center", alignItems: "center" }} >
                <Image
                    style={styles.picProfile}
                    source={{
                        uri: `https://picsum.photos/700/700?random=${dataProfileUser._id}`,
                    }}
                />
            </View>

            <View style={{ flex: 1.5, marginLeft: 15, alignItems: "center", justifyContent: "center" }} >
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{dataProfileUser.name}</Text>
                <Text style={{ fontSize: 12, marginBottom: 5 }}>@{dataProfileUser.username}  • {dataProfileUser.email}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "700" }}>
                        {dataProfileUser?.follower?.length}
                    </Text>
                    <Text style={{ marginRight: 10 }}>
                        {dataProfileUser?.follower?.length > 1 ? " Followers" : " Follower"}
                    </Text>
                    <Text style={{ fontWeight: "700" }}>
                        •   {dataProfileUser?.following?.length}
                    </Text>
                    <Text style={{ marginLeft: 5 }}>
                        Following
                    </Text>
                </View>
            </View>

            <View style={{ flex: 1 }} >
                <View
                    style={[
                        styles.container,
                        { flexDirection: 'row', },
                    ]}>
                    <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }} >
                        <TextInput
                            style={styles.text}
                            onChangeText={handleInputChange}
                            value={searchInput}
                            placeholder="Search by username or name ..."
                            keyboardType="text"
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                        <TouchableHighlight
                            underlayColor=""
                            onPress={handleSearchPress}>
                            <View style={styles.button}>
                                <Ionicons name="search" size={25} color="black" />
                            </View>
                        </TouchableHighlight>

                    </View>
                </View>
            </View>
            <View style={{ flex: 1 }} >
                <View
                    style={[
                        styles.container,
                        { flexDirection: 'row', },
                    ]}>
                    <View style={{ flex: 1, justifyContent: "center" }} >
                        <TouchableHighlight
                            underlayColor=""
                            onPress={() => { chooseButtonFollow("Following") }}>
                            <View style={styles.followButton}>
                                <Text style={styles.textfollowButton}>Following</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }} >
                        <TouchableHighlight
                            underlayColor=""
                            onPress={() => { chooseButtonFollow("Follower") }}>
                            <View style={styles.followButton}>
                                <Text style={styles.textfollowButton}>Follower</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    containerHomeScreen: {
        flex: 1,
        padding: 15
    },
    container: {
        flex: 1,

    },
    picProfile: {
        width: 100,
        height: 100,
        borderRadius: 75
    },
    text: {
        height: 30,
        margin: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#e4e4e4",
        paddingLeft: 15,
        width: "90%",
    },
    button: {
        backgroundColor: "#e4e4e4",
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    followButton: {
        backgroundColor: "#e4e4e4",
        borderRadius: 20,
        marginHorizontal: 10
    },
    textfollowButton: {
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center"
    }
})

export default ProfileDetail