import {StyleSheet} from 'react-native';

const viewGroupDetailsStyle = StyleSheet.create({

    loadingViewIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    wrapper: {
        flex: 1,
        backgroundColor: 'white'
    },

    topComponentWrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    deleteAddWrapper:{
        flex:1,
        flexDirection:'row',
        marginTop:10
    },

    addWrapper:{
        flex:4,
        alignItems:'flex-end'
    },

    deleteWrapper:{
        flex:1.5,
        alignItems:'flex-end',
        justifyContent:'flex-start',
        marginRight:10,
    },

    addImage:{
        height: 120,
        width: 120
    },

    numberOfMembers:{
        fontSize: 20,
        fontFamily: "Montserrat-ExtraBold"
    },

    scrollerWrapper:{
        flex: 1.5
    },

    groupNameUpdateWrapper:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    groupNameWrapper:{
        flex: 4,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    textGroupName:{
        textAlign: 'center',
        fontSize: 20,
        width: 200
    },

    updateWrapper:{
        flex: 1,
        marginLeft: 10,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

    updateImage:{
        height: 50,
        width: 50
    }
})

export default viewGroupDetailsStyle;