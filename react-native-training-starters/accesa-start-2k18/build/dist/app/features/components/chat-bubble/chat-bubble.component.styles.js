import { StyleSheet } from 'react-native';
var chatBubbleStyle = StyleSheet.create({
    item: {
        marginVertical: 14,
        flexDirection: 'row'
    },
    itemIn: {
        marginLeft: 10
    },
    itemOut: {
        alignSelf: 'flex-end',
        marginRight: 10
    },
    balloon: {
        maxWidth: 250,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
    },
    arrowContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    },
    arrowLeftContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    arrowLeft: {
        left: -20,
    },
    textStyle: {
        paddingTop: 5,
        color: 'white'
    }
});
export default chatBubbleStyle;
//# sourceMappingURL=chat-bubble.component.styles.js.map