import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileDetail from '../components/ProfileDetail';
import FollowCard from '../components/FollowCard';
import SearchResultCard from '../components/SeacrhResultCard';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';


const GET_SEARCH_USERS = gql`
  query Query($name: String!) {
  searchUserByNameOrUsername(name: $name) {
    _id
    name
    username
    email
    password
    follower {
      followingId
      followerId
      createdAt
      updatedAt
    }
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
  }
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

const MUTATION_ADD_FOLLOW = gql`
  mutation AddFollow($followingId: ID) {
  addFollow(followingId: $followingId)
}
`;

function ProfileScreen({ navigation, route }) {
    const [buttonChoosen, setButtonChoosen] = useState("");

    const [inputToSearch, setInputToSearch] = useState('');
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    const [refetchTrigger, setRefetchTrigger] = useState(false)
    const { loading: userLoading, data: userData, refetch: refetchUser } = useQuery(GET_USER_BY_ID, {
        skip: false,
    });
    const { loading: searchLoading, data: searchData, refetch: refetchSearch } = useQuery(GET_SEARCH_USERS, {
        skip: !isSearchClicked,
        variables: { name: inputToSearch }
    });
    // console.log(searchData, 'searchData>>> di profile screen')

    const [addFollow] = useMutation(MUTATION_ADD_FOLLOW);
    const handleFollow = async (followingId) => {
        // console.log('handleFollow>>>', followingId)
        try {
            const result = await addFollow({
                variables: { followingId: followingId }
            })
            // console.log(result, 'result follow search user>>>>')
            if (result && result.data) {
                Alert.alert("Success", "Success Follow User");

                await refetchUser()
            }
        } catch (error) {
            Alert.alert("Error", error.message)
            console.log(error.message)
        }
    }

    useFocusEffect(
        useCallback(() => {
            refetchUser();
        }, [refetchUser, isSearchClicked])
    );

    useEffect(() => {
        // if (userData) {
        //     console.log(userData, 'userData di useeffect profile screen');
        // }

        if (refetchTrigger) {
            if (isSearchClicked) {
                refetchSearch();
                refetchUser();
            }
            setRefetchTrigger(false)
            // setIsSearchClicked(false)
        }
    }, [refetchTrigger, refetchUser, isSearchClicked, refetchSearch]);

    if (userLoading || searchLoading) {
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
            <Text>Loading ...</Text>
        </View>
    }

    const handleChooseFollow = (params) => {
        // console.log('masuk sini', params)
        setButtonChoosen(params);
        setRefetchTrigger(true);
    }

    const handleSearchClicked = () => {
        console.log('masuk sini search clicked')
        setIsSearchClicked(true);
        setRefetchTrigger(true);
    }




    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'resize'}
                    keyboardVerticalOffset={Platform.OS === 'android' ? 20 : 0}
                >
                    <View style={{ flex: 2, minHeight: 250 }}>
                        <ProfileDetail dataProfileUser={userData.getUsersById} chooseButtonFollow={handleChooseFollow} handleSearchClicked={handleSearchClicked} setInputToSearch={setInputToSearch} />
                    </View>

                    {/* result search data */}
                    {isSearchClicked ? <>
                        <Text style={styles.titleProfileScreen}>Search Result</Text>
                        <View style={{ flex: 1, minHeight: 150 }}>
                            <FlatList
                                data={searchData.searchUserByNameOrUsername}
                                renderItem={({ item, index }) => <SearchResultCard search={item} index={index} handleFollow={handleFollow} />}
                                keyExtractor={(item, index) => index.toString()}
                                style={{ flex: 1 }}
                            />
                        </View>
                    </> : <>
                    </>}

                    {/* following / follower card */}
                    {buttonChoosen == "Follower" ?
                        <>
                            <View style={{
                                flex: 1,
                                minHeight: 250,

                            }}>
                                <Text style={styles.titleProfileScreen}>Your Follower</Text>
                                <FlatList
                                    data={userData.getUsersById.followerInfo}
                                    renderItem={({ item, index }) => <FollowCard follow={item} index={index} />}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={{ flex: 1 }}
                                />
                            </View>
                        </> : <>
                            <View style={{
                                flex: 1,
                                minHeight: 250,

                            }}>
                                <Text style={styles.titleProfileScreen}>Your Following</Text>
                                <FlatList
                                    data={userData.getUsersById.followingInfo}
                                    renderItem={({ item, index }) => <FollowCard follow={item} index={index} />}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={{ flex: 1 }}
                                />
                            </View>

                        </>
                    }
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    containerHomeScreen: {
        flex: 1,
        padding: 15,
    },
    titleProfileScreen: {
        fontSize: 20,
        fontWeight: "700",
        marginHorizontal: 10,
        marginVertical: 10,
    },
});

export default ProfileScreen;