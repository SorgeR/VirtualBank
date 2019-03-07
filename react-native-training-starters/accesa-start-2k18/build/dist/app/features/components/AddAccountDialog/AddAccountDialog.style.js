import { StyleSheet } from 'react-native';
var addAccountDialogStyle = StyleSheet.create({
    addMoneyHeaderText: {
        fontFamily: "Montserrat-ExtraLightItalic",
        fontSize: 20,
        color: 'white'
    },
    insideMiddleViews: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputAndCurrencyView: {
        flex: 2,
        flexDirection: 'row'
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
        fontFamily: "Montserrat-ExtraBold",
        fontSize: 15,
    },
    textInputSum: {
        fontFamily: "Montserrat-ExtraBold",
        fontSize: 20,
        color: "grey",
        width: 'auto',
        textAlign: 'right'
    },
    textIBAN: {
        fontSize: 16,
        fontFamily: "Montserrat-ExtraBold",
    },
    middleView: {
        flex: 5,
        backgroundColor: "white",
    },
    footerView: {
        flex: 1.2,
        flexDirection: 'row',
        backgroundColor: '#36BB60'
    },
    headerView: {
        flex: 1,
        backgroundColor: '#36BB60',
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
        fontFamily: "Montserrat-ExtraLight"
    }
});
export default addAccountDialogStyle;
//# sourceMappingURL=AddAccountDialog.style.js.map