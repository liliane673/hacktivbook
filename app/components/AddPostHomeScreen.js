import React from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
} from 'react-native-safe-area-context';
// import styles from '../utils/style';

function AddPostHomeScreen({ onPress }) {
    return (

        <TouchableOpacity onPress={onPress}>
            <View style={{ height: 80 }}>
                <View
                    style={[
                        styles.flexHomeScreenAddPost,
                    ]}>
                    <View style={{ flex: 1 }} >
                        <Image
                            style={styles.picAddPostHomeScreen}
                            source={{
                                uri: `https://picsum.photos/700/700?random=${1}`,
                            }}
                        />
                    </View>

                    <View style={{ flex: 4 }}>

                        <View style={styles.buttonOutline}>
                            <Text style={styles.textButtonOutline}>What's on your mind ?</Text>
                        </View>

                    </View>
                </View>
            </View >
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    picAddPostHomeScreen: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    flexHomeScreenAddPost: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        padding: 20,
        backgroundColor: "#ffffff",
        borderBottomColor: "#d2cfcf",
        borderBottomWidth: 3,
    },
    buttonOutline: {
        alignItems: 'left',
        justifyContent: "center",
        backgroundColor: 'transparent',
        height: 45,
        width: 290,
        margin: 5,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
    },
    textButtonOutline: {
        color: "#777777",
        fontSize: 15,
        fontWeight: "500",
    },
})

export default AddPostHomeScreen