import { StyleSheet } from 'react-native';
var transferHistoryStyle = StyleSheet.create({
    card: {
        height: 100,
    },
    textIBAN: {
        fontSize: 13,
        fontFamily: "Montserrat-ExtraBold",
    },
    textBudget: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 15,
        color: '#36BB60',
    },
    textDate: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 12,
    },
    textAlias: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 9,
    },
    wrapper: {
        flex: 1,
    },
    horizontalWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: 50,
        height: 50,
    },
    textWrapper: {
        flex: 3,
        justifyContent: 'center'
    },
});
export default transferHistoryStyle;
//# sourceMappingURL=transfer-history-card.component.style.js.map