import {StyleSheet} from 'react-native';

const addFriendToBillStyle= StyleSheet.create({

    titleStyle: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 20,
        color: 'white'
    },


    wrapper: {
        flex: 1,
        flexGrow: 1
    },

    restOfMoneyTextStyle:{
        fontFamily: "Montserrat-ExtraBold",
        fontSize:20,
        color:'grey'
    },

    restSumTextStyle:{
        fontFamily: "Montserrat-ExtraBold",
        fontSize:20,
        color:"#45E177",

    },

    sumToPayTextInput:{
        paddingLeft: 20,
        width: 200,
        borderColor: 'black',
        borderWidth: 0.4
    },


    textWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },


    middleView: {
        flex: 5,
        backgroundColor: "white",
    },

    footerView: {
        flex: 1.2,
        flexDirection: 'row',
        backgroundColor: "#3698f0"
    },

    headerView: {
        flex: 1,
        backgroundColor: "#3698f0",
        justifyContent: 'center',
        alignItems: 'center'
    },

    touchableOpacityLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderEndColor: 'grey',
        borderEndWidth: .3
    },

    touchableOpacityRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTextStyle: {
        color: 'white',
        fontFamily: "Montserrat-ExtraBold",
    },

    loadingViewIndicator:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    }



});
export default addFriendToBillStyle