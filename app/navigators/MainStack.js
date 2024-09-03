import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import PostDetailScreen from "../screens/PostDetailScreen";
import LoginScreen from "../screens/LoginScreen";
import TabNav from './TabNav';
import CreatePostScreen from '../screens/CreatePostScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LogoTitle from '../components/LogoTitle';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();


function MainStack() {
    const { isLoggedIn } = useContext(AuthContext)

    return (
        <Stack.Navigator>
            {
                isLoggedIn ? (<>
                    <Stack.Screen name="HomePage" component={TabNav} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
                    <Stack.Screen name="DetailPost" component={PostDetailScreen} options={{ title: 'Post' }} />
                    <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post' }} />
                    <Stack.Screen name="UserProfile" component={ProfileScreen} options={{ title: 'User Profile', headerShown: false }} />
                </>
                ) : (
                    <>
                        <Stack.Screen name="LoginPage" component={LoginScreen} options={{ title: 'Login', headerShown: false }} />
                        <Stack.Screen name="RegisterPage" component={RegisterScreen} options={{ title: 'Register', headerShown: false }} />
                    </>
                )

            }


        </Stack.Navigator>
    )
}

export default MainStack