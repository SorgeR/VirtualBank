import { StyleSheet } from 'react-native';
var topUpDialogStyle = StyleSheet.create({
    addMoneyHeaderText: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 20,
        color: 'white'
    },
    wrapper: {
        flex: 1,
        flexGrow: 1
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
        fontSize: 17,
        fontFamily: "Montserrat-ExtraBold",
    },
    textBudget: {
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
        color: "#3698f0"
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
    }
});
export default topUpDialogStyle;
//# sourceMappingURL=top-up-dialog.component.style.js.map