import { StyleSheet } from 'react-native';
var viewAccountsCardStyle = StyleSheet.create({
    card: {
        height: 100,
    },
    wrapper: {
        flex: 1,
    },
    horizontalWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    leftWrapper: {
        flex: 5,
        justifyContent: 'center',
        marginLeft: '5%'
    },
    rightWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    textIBAN: {
        fontSize: 17,
        fontFamily: "Montserrat-ExtraBold",
    },
    textBudget: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 18,
        color: '#36BB60',
    },
    textAlias: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 13,
    },
    goToTopupMoneyTouchableOpacity: {
        alignItems: 'center',
        flex: 1,
    },
    iconImageStyle: {
        flex: 1,
        width: '70%',
        height: '70%'
    },
});
export default viewAccountsCardStyle;
//# sourceMappingURL=view-account-card-style.component.style.js.map