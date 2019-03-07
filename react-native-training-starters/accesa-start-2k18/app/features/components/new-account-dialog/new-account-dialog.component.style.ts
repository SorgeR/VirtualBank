import {StyleSheet} from 'react-native';

const accountDialogStyle = StyleSheet.create({

    addAccountHeaderText: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 20,
        color: 'white'
    },

    insideMiddleViews: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    wrapper: {

        flex: 1,
        flexGrow: 1
    },
    textInputView: {
        flex: 2,

        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    textCurrencyView: {
        flex: 1,
        marginRight: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    textCurrency: {
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold"

    },

    accountAliasWrapper:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    aliasTextInput:{
        width: 200
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

    currencyText:{

    },

    pickerStyle: {
        height: 50,
        width: '90%',
        backgroundColor: 'white',
        marginLeft:50,
    },


})
export default accountDialogStyle