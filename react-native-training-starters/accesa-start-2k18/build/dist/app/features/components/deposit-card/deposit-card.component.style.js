import { StyleSheet } from 'react-native';
var depositCard = StyleSheet.create({
    card: {
        height: 120,
    },
    wrapper: {
        flex: 1,
    },
    horizontalWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    leftTextWrapper: {
        flex: 5,
        marginLeft: 20,
        justifyContent: 'center',
    },
    dateWrapper: {
        flex: 2,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 15,
        color: 'grey'
    },
    sumToGetText: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 18,
        color: '#36BB60',
    },
    dateText: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 12,
        color: 'grey'
    },
});
export default depositCard;
//# sourceMappingURL=deposit-card.component.style.js.map