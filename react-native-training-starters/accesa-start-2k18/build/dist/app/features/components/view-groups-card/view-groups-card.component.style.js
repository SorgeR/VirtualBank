import { StyleSheet } from 'react-native';
var viewGroupsCardStyle = StyleSheet.create({
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
    textDate: {
        fontFamily: "Montserrat-ExtraBoldItalic",
        fontSize: 15,
    },
    iconImageStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginLeft: 10,
    },
    deleteGroup: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    iconImageDeleteStyle: {
        flex: 1,
        width: '50%',
        height: '50%',
        marginRight: 10,
    },
});
export default viewGroupsCardStyle;
//# sourceMappingURL=view-groups-card.component.style.js.map