import {Component} from "react";
import {ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View} from "react-native";
import {IGetFriendsOfUser} from "../../services/ServiceFriend";
import * as React from "react";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import {SearchBar} from 'react-native-elements'
import styles from "./view-friends-to-add-to-bill.component.style";
import ServiceUser from "../../services/ServiceUser";
import Dialog from "react-native-popup-dialog";
import AddFriendToBill from "../components/add-friend-to-bill-dialog/add-friend-to-bill.component";
import ServiceBill from "../../services/ServiceBill";


interface IViewFriendsComponentState {

    friends: any,
    searchText: any,
    isLoading: boolean,
    loggedInUserId: number,
    isVisibleDialog: boolean,

    idCreator:number,
    idBill:number,
    idFriend:number,

}

interface IFriend {

    friendshipId: number,
    userId: number,
    phoneNumber: string,
    firstName: string,
    lastName: string


}



export default class ViewFriendsComponent extends Component<any, IViewFriendsComponentState> {


    constructor(props: any) {
        super(props);
        this.state = {
            friends: [],
            searchText: "",
            isLoading: true,
            loggedInUserId: -1,
            isVisibleDialog:false,
            idCreator:this.props.navigation.getParam("ownerID",0),
            idBill:this.props.navigation.getParam("billID",0),
            idFriend:0,

        };
        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {

            this.getDataFromAsyncStorage()

        });
    };

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getDataFromAPI();
                    })
                }
            })
            .catch((error) => {
                alert('error')
            })
    };

    getDataFromAPI = () => {

        ServiceUser.getFriends(this.state.loggedInUserId)
            .then((response: IGetFriendsOfUser) => {
                this.setState({
                    friends: response,
                }, () => {
                    this.setState({
                        isLoading: false,
                    })
                })
            })
            .catch((error) => {
                alert("error")
            })
    };

    enableDialog=()=>{
        this.setState({

            isVisibleDialog:true,
        })

    };

    disableDialog=()=>{
        this.setState({

            isVisibleDialog:false,
        })

    };

    renderFriendItem = (friend: IFriend, key: any) => {
        const {searchText} = this.state
        if (friend.phoneNumber.startsWith(searchText) || searchText == "") {
            return (
                <ViewFriendsCard
                    key={key}
                    phoneNumber={friend.phoneNumber}
                    firstName={friend.firstName}
                    lastName={friend.lastName}
                    ImagePath={require("../images/friends_icon.png")}
                    OnPressRightButton={()=> {

                        this.setState({
                            idFriend:friend.userId,
                        },()=>{
                            this.enableDialog();
                        })
                    }}
                    RightButtonParameter={friend.friendshipId}
                    rightButtonColor={"white"}
                    RightButtonImagePath={require("../images/contract_image.png")}
                    RightButtonImageHeight={'80%'}
                    RightButtonImageWidth={"80%"}
                />
            )
        }
        return null;
    };

    renderFriendsList = () => {

        var list = this.state.friends.map((currentValue: any, key: any) => {

            return this.renderFriendItem(currentValue, key);
        })

        return list;

    };

    addDebtor=(idDebtor:number,sumToPay:number)=>{
        const{idCreator,idBill}=this.state;
        ServiceBill.createDebt(idDebtor,idCreator,idBill,sumToPay)
            .then(response=>{
                ToastAndroid.show("Successfully added to bill!", ToastAndroid.SHORT);
                this.disableDialog();
            })
            .catch(error=>{
                alert(error);
            })
    };

    render() {
        if (this.state.isLoading == false) {
            return (
                <View style={{flex: 1}}>
                    <SearchBar
                        platform="android"
                        cancelIcon={{type: 'font-awesome', name: 'chevron-left'}}
                        placeholder='Search by phone number'
                        onChangeText={(text) => this.setState({
                            searchText: text,
                        })}
                    />
                    <Dialog
                        width={300}
                        height={250}
                        visible={this.state.isVisibleDialog}
                        children={
                            <AddFriendToBill
                                idDebtor={this.state.idFriend}
                                closeButtonFunction={this.disableDialog}
                                addButtonFunction={this.addDebtor}
                                idBill={this.state.idBill}
                                idCreator={this.state.idCreator}
                                />
                        }
                    />

                    <ScrollView
                        removeClippedSubviews={true}>
                        {this.renderFriendsList()}

                    </ScrollView>
                </View>
            );
        }
        else {
            return (
                <View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>)
        }
    }
}