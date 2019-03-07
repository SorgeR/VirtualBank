import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const homeStyles = StyleSheet.create({

    container: {
        flex:1,
    },

    topContainer:{
        flex:2.5,

    },

    imageBackground:{
        flex:1,

    },

    bottomContainer:{
        flex:1,
    },

    budgetTextWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },

    budgetText:{
        color:'white',
        fontSize:50,
        fontFamily:"Montserrat-ExtraBold"
    },

    bottomButtonsHorizontalWrapper:{
        flexDirection:'row',
        flex:1,
        marginTop:20
    },

    buttonStyle:{
        height: 75,
        width: 75
    },

    buttonWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },


});

export default homeStyles;