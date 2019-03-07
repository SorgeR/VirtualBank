import React,{Component} from 'react'
import {ActivityIndicator, AsyncStorage, ScrollView, View} from "react-native";
import ServiceUser from "../../services/ServiceUser";
import {IGetFriendsOfUser} from "../../services/ServiceFriend";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import {AppRoutes} from "../../app.routes";
import {SearchBar} from "react-native-elements";
import styles from "./view-friends-to-chat.component.style";

interface IState {
    loggedInUserId:number,
    isLoading:boolean,
    friends:any,
    searchText:string,
}
interface IFriend {

    friendshipId: number,
    userId: number,
    phoneNumber: string,
    firstName: string,
    lastName: string


}
export default class ViewFriendsToChatComponent extends Component<any,IState>{


    constructor(props:any){
        super(props);
        this.state={
            loggedInUserId:0,
            isLoading:true,
            friends:[],
            searchText:"",
        };
        this.props.navigation.addListener('willFocus', () => {

            this.getDataFromAsyncStorage()

        })
    }

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getDataFromAPI();
                    });
                }
            })
            .catch((error) => {
                alert(error);
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
                    });
                })
            })
            .catch((error) => {
                alert(error);
            })
    };

    onChatButtonPress=(idFriend:number)=>{
        this.props.navigation.navigate(AppRoutes.chat,
            {
                "friendID": idFriend,
            }
        );
    };

    renderFriendItem = (friend: IFriend, key: any) => {
        const {searchText} = this.state;
        if (friend.phoneNumber.startsWith(searchText) || searchText == "") {
            return (
                <ViewFriendsCard
                    key={key}
                    phoneNumber={friend.phoneNumber}
                    firstName={friend.firstName}
                    lastName={friend.lastName}
                    OnPressRightButton={this.onChatButtonPress}
                    RightButtonParameter={friend.userId}
                    ImagePath={require("../images/friends_icon.png")}
                    rightButtonColor={"white"}
                    RightButtonImagePath={require("../images/chat_image.png")}
                    RightButtonImageHeight={'80%'}
                    RightButtonImageWidth={"80%"}
                />
            )
        }
        return null;
    };

    renderFriendsList = () => {

        return this.state.friends.map((currentValue: any, key: any) => {

            return this.renderFriendItem(currentValue, key);
        });

    };


    render(){

        if (this.state.isLoading == false) {
            return (
                <View style={styles.wrapper}>
                    <SearchBar
                        platform="android"
                        cancelIcon={{type: 'font-awesome', name: 'chevron-left'}}
                        placeholder='Search by phone number'
                        onChangeText={(text) => this.setState({
                            searchText: text,
                        })}
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