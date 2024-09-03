import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import { gql, useQuery } from '@apollo/client';
import { ActivityIndicator, View, Text } from 'react-native';
import { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
const Tab = createBottomTabNavigator();


function TabNav() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home-sharp'
                            : 'home-outline'
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person-sharp' : 'person-outline';
                    } else if (route.name === 'Post') {
                        iconName = focused ? 'chatbox-ellipses-sharp' : 'chatbox-ellipses-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1e85ff',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
                tabBarLabel: () => null,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />
            <Tab.Screen
                name="Post"
                component={CreatePostScreen}
            />
        </Tab.Navigator>
    )
}

export default TabNav