import {StyleSheet} from 'react-native';

const transferMoneyStyle = StyleSheet.create({

    wrapper:{
        flex:1,
        backgroundColor:"white",
    },

    wrapperCardView:{
        width:'100%',
        height:'70%',

    },

    wrapperForPersonalData:{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    wrapperForNotPersonalData:{
        flex: 2.5,
        backgroundColor: 'white',
        alignItems: 'center'
    },

    horizontalLineStyle:{
        width: '100%',
        borderBottomColor: "grey",
        borderBottomWidth: 0.5
    },

    pickerStyle:{
        height: 50,
        width: 300,
        backgroundColor: 'white'
    },

    pickerWrapperStyle:{
        borderEndWidth: 1,
        borderEndColor: 'grey',
        borderStartWidth: 1,
        borderStartColor: 'grey',
        borderTopWidth: 1,
        borderTopColor: 'grey',
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        height: 55,
        width: 305,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textDestinationAccountStyle:{
        marginTop: 10,
        marginBottom: 5,
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
        color: 'grey'
    },

    textIBAN:{
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
        color: 'grey'
    },

    textBudget:{
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
        color: 'green'
    },

    sourceAccountDataWrapper:{
        flex: 1,
        alignItems: 'center'
    },

    textInputAndCurrencyWrapperStyle:{
        flex: 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputCurrencyAndButtonWrapperStyle:{
        flex: 3,
        backgroundColor: 'white',
        alignItems: 'center'
    },

    destinationAccountAndActionsWrapperStyle:{
        flex: 3,
        width: '100%'
    },

    loadingViewIndicator:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    },

    pickerAndDestinationAccountWrapperStyle:{
        flex: 2,
        backgroundColor: 'white',
        alignItems: 'center'
    },

    textCurrencyStyle:{
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
        color: 'grey'
    },

    buttonWrapperStyle:{
        flex: 1.5,
        width: 300
    },

    inputTextBox: {
        width: "auto",
        height: "auto",
        fontSize:30,
        textAlign:'right',
        color: 'black',

    },
    inputTextBoxError: {
        width: "auto",
        height: "auto",
        fontSize:30,
        textAlign:'right',
        color: 'black',
        backgroundColor:'red',

    },

})

export default transferMoneyStyle;