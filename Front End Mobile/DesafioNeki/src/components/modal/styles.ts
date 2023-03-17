import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },

    modalContentView: {
        borderRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderWidth: 1,
        borderColor: '#2d939c',
        backgroundColor: '#2d939c',
        paddingHorizontal: 14,
        paddingVertical: 20,
        height: '55%',
        marginTop: 'auto',

    },

})