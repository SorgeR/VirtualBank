import {StyleSheet} from 'react-native';

const newBillDialogStyle= StyleSheet.create({

    titleText:{
        fontFamily: "Montserrat-ExtraBold",
        fontSize:20,
        color:'white'
    },


    wrapper:{
        flex:1,
    },

    sumToPayTextInput:{
        paddingLeft: 20,
        width: 270,
        borderColor: 'black',
        borderWidth: 0.4
    },

    billNameTextInput:{
        marginTop:5,
        paddingLeft: 20,
        width: 270,
        borderColor: 'black',
        borderWidth: 0.4
    },


    middleView:{
        flex:5,
        backgroundColor:"white",
        alignItems:'center',
        justifyContent:'center',
    },

    footerView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#3698f0"
    },

    headerView: {
        flex: 1,
        backgroundColor: "#3698f0",
        justifyContent:'center',
        alignItems:'center'
    },

    descriptionTextInput:{
        marginTop: 5,
        paddingLeft: 20,
        width: 270,
        borderColor: 'black',
        borderWidth: 0.4,
        textAlign: 'left',
        textAlignVertical: 'top'
    },

    touchableOpacityLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderEndColor: 'grey',
        borderEndWidth: .3
    },

    touchableOpacityRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonTextStyle: {
        color: 'white',
        fontFamily: "Montserrat-ExtraBold"
    },


    pickerStyle: {
        height: 50,
        width: '90%',
        backgroundColor: 'white',
        marginLeft:50,
        borderColor:'black',
        borderWidth:1
    },
})
export default newBillDialogStyle;