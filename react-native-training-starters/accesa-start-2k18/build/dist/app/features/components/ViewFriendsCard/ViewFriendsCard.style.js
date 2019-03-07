import { StyleSheet } from 'react-native';
var viewFriendsCardStyle = StyleSheet.create({
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
    rightWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    middleWrapper: {
        flex: 5,
        justifyContent: 'center',
        marginLeft: '10%'
    },
    leftWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    textName: {
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold",
    },
    textPhoneNumber: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 15,
    },
    iconImageStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginLeft: 10,
    },
    deleteFriend: {
        alignItems: 'center',
        flex: 1,
    },
    iconImageDeleteStyle: {
        flex: 1,
        marginRight: 10,
    },
});
export default viewFriendsCardStyle;
//# sourceMappingURL=ViewFriendsCard.style.js.map