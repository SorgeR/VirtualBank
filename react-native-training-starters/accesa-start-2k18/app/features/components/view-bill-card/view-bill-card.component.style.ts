import {StyleSheet} from 'react-native';

const viewAccountsCardStyle = StyleSheet.create({

    card: {
        height: 200,
    },

    wrapper:{
        flex:1,
    },

    loadingViewIndicator:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    },

    topHorizontalWrapper:{
        flex: 1.5,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10
    },

    imageStyle:{
        height: 60,
        width: 60
    },

    topTextWrapper:{
        flex: 4,
        marginLeft: 25
    },

    topDateWrapper:{
      flex:2,
    },

    middleWrapper:{
        flex: 2,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },

    buttonsWrapper:{
        flex: 1,
        flexDirection: 'row'
    },

    twoButtonsViewStyle:{
        flex: 1,
        paddingRight: 1
    },

});

export default viewAccountsCardStyle;