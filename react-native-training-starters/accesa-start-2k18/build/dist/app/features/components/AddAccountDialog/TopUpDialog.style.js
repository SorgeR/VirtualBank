import { StyleSheet } from 'react-native';
var topUpDialogStyle = StyleSheet.create({
    addMoneyHeaderText: {
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
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
    },
    textBudget: {
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
        color: "#36BB60"
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
        fontFamily: "Montserrat-ExtraBold",
    }
});
export default topUpDialogStyle;
//# sourceMappingURL=TopUpDialog.style.js.map