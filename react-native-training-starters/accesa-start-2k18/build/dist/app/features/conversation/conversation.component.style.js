import { StyleSheet } from 'react-native';
var conversationStyle = StyleSheet.create({
    leftMessageStyle: {
        alignItems: 'flex-start',
        marginLeft: 10,
        paddingTop: 10
    },
    rightMessageStyle: {
        alignItems: 'flex-end',
        marginRight: 10,
        paddingTop: 10
    },
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
    },
    textAndButtonHorizontalWrapper: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
    },
    textInputStyle: {
        width: 250,
    },
    buttonWrapper: {
        flex: 1,
        marginRight: 10,
    },
    textWrapper: {
        borderRadius: 50,
        borderColor: 'grey',
        width: 500,
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginLeft: 15,
        marginRight: 15,
    },
    scrollWrapper: {
        flex: 5,
    },
});
export default conversationStyle;
//# sourceMappingURL=conversation.component.style.js.map