import { StyleSheet } from 'react-native';
var topUpStyle = StyleSheet.create({
    buttonView: {
        width: 200,
        alignSelf: 'center',
        marginTop: 20,
    },
    inputTextBox: {
        width: 250,
        height: 50,
        marginBottom: 20,
        borderColor: 'white',
        backgroundColor: 'white',
        opacity: 0.7,
        paddingLeft: 30,
        color: 'black',
        borderRadius: 4,
    },
    inputTextBoxError: {
        width: 250,
        height: 50,
        marginBottom: 20,
        borderColor: 'white',
        backgroundColor: 'red',
        opacity: 0.7,
        paddingLeft: 30,
        color: 'black',
        borderRadius: 4,
    },
    roundImageView: {
        height: 150,
        width: 150,
        borderRadius: 3000,
    },
    wrapper: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBudgetStyle: {
        fontSize: 30,
        color: 'white'
    },
});
export default topUpStyle;
//# sourceMappingURL=top-up.componen.styles.js.map