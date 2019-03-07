import {StyleSheet} from 'react-native';

const registerStyles = StyleSheet.create({



    backgroundImageStyle: {
        flex:1,
        flexGrow:1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputTextBox: {


        width: 250,
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

        width: 250,
        height: 50,
        marginBottom: 20,
        borderColor: 'white',
        backgroundColor: 'red',
        opacity: 0.7,
        paddingLeft: 30,
        color: 'black',
        borderRadius: 4,

    },

    registerButton: {
        flex:1,
        width: 230,

    },

    wrapper:{
        flex:1,
        flexGrow:1,
        flexDirection:"column",

    },

    wrapperInput: {


        alignItems: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },

});

export default registerStyles;