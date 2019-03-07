import { StyleSheet } from 'react-native';
var newGroupDialog = StyleSheet.create({
    titleStyle: {
        fontFamily: "Montserrat-ExtraBold",
        fontSize: 20,
        color: 'white'
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    textChooseGroupName: {
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
    },
    textInputChooseGroupNameStyle: {
        fontSize: 20,
        width: 200,
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
        fontFamily: "Montserrat-ExtraBold"
    }
});
export default newGroupDialog;
//# sourceMappingURL=new-group-dialog.style.js.map