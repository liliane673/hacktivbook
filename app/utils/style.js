import { StyleSheet } from "react-native";

const utilities = {
    color: {
        blue1: "#1e85ff",
        blue2: "#56a4ff",
        blue3: "#95c5ff",
        blue4: "#cce3ff",
        blue5: "#eff7ff",
        gray: "#777777"
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerHomeScreen: {
        flex: 1,
    },
    flexHomeScreenAddPost: {
        flex: 1,
    },
    flexHomeScreenShowPost: {
        flex: 3,
    },
    tinyLogo: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: utilities.color.blue1
    },
    input: {
        height: 40,
        width: 300,
        margin: 5,
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: utilities.color.blue1,
        padding: 10,
        borderRadius: 20,
        width: 300,
        marginTop: 10,
    },
    buttonOutline: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: 10,
        borderColor: utilities.color.blue1,
        borderWidth: 1,
        borderRadius: 20,
        width: 300,
        marginTop: 10,
    },
    textButton: {
        color: '#eff7ff',
        fontSize: 15,
        fontWeight: "500",
    },
    textButtonOutline: {
        color: utilities.color.blue1,
        fontSize: 15,
        fontWeight: "500",
    },
    text: {
        marginTop: 40,
        color: '#777777',
        fontSize: 15,
        fontWeight: "500",
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default styles