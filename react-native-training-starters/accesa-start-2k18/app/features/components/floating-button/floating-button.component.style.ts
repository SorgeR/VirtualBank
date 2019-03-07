

import {StyleSheet} from 'react-native';

const floatingButtonStyle = StyleSheet.create({
    floatingButton: {
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: "#3698f0",
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center'

    },
    textStyle:{
        color:'white',
        fontSize:40
    }
})

export default floatingButtonStyle;