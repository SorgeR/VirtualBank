import {StyleSheet} from 'react-native';

const topUpHistory = StyleSheet.create({

    card: {
        height: 100,
        backgroundColor:"#E0F8EC"
    },

    textIBAN:{
        fontSize:17,
        fontFamily:"Montserrat-ExtraBold",
    },

    textBudget:{
        fontFamily:"Montserrat-ExtraBoldItalic",
        fontSize:18,
        color:'#36BB60',
    },

    textDate:{
        fontFamily:"Montserrat-ExtraBoldItalic",
        fontSize:13,

    },
    textAlias:{
        fontFamily:"Montserrat-ExtraBoldItalic",
        fontSize:9,
    },

    wrapper:{
        flex:1,
    },

    imageStyle:{
        width:50,
        height:50,
    },

    textWrapper:{
        flex:3,
        justifyContent:'center'
    },

    horizontalWrapper:{
        flex:1,
        flexDirection:'row'
    },

    imageWrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
})


export default topUpHistory;
