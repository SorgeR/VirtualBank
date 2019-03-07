import {StyleSheet} from 'react-native';


const loginStyles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: 50,
    },

    backgroundImageStyle: {
        flex:1,
    },

    inputTextBox: {
        width: 270,
        height: 50,
        marginBottom: 20,
        borderColor: 'white',
        backgroundColor: 'white',
        opacity: 0.7,
        paddingLeft: 30,
        color: 'black',
        borderRadius: 4,

    },

    inputTextBoxError: {
        width: 270,
        height: 50,
        marginBottom: 20,
        borderColor: 'white',
        backgroundColor: 'red',
        opacity: 0.7,
        paddingLeft: 30,
        color: 'black',
        borderRadius: 4,

    },

    loginButton: {
        marginTop: 10,
        width: 250,
    },

    registerButton: {
        color: 'white',
        textAlign: 'center',
        marginTop:10,
    },


});

export default loginStyles;