import { StyleSheet } from "react-native";
var payDebtDialog = StyleSheet.create({
    middleView: {
        flex: 5,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
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
    wrapper: {
        flex: 1,
        flexGrow: 1
    },
    titleText: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 20,
        color: 'white'
    },
    pickerStyle: {
        height: 50,
        width: '100%',
        marginLeft: '20%',
        backgroundColor: 'white',
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
        fontFamily: "Montserrat-ExtraBold"
    },
});
export default payDebtDialog;
//# sourceMappingURL=pay-debt-dialog.component.style.js.map