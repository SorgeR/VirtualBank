import React,{Component} from "react";
import {ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View} from "react-native";
import ServiceFriend, {IGetFriendsOfUser} from "../../services/ServiceFriend";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import {SearchBar} from 'react-native-elements';
import styles from "./view-friends.component.style";
import ServiceUser from "../../services/ServiceUser";


interface IViewFriendsComponentState {

    friends: any,
    searchText: any,
    isLoading: boolean,
    loggedInUserId: number,

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
        }
        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {

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
                    })
                }
            })
            .catch((error) => {
                alert('error')
            })
    }

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
    }

    onDeleteButtonPress = (id: number) => {
        this.deleteFriendFromAPI(id)

    }

    deleteFriendFromAPI = (id: number) => {
        ServiceFriend.deleteFriendFromAPI(id)
            .then((response) => {

                ToastAndroid.show("Successfully deleted the friend!", ToastAndroid.SHORT);
                this.getDataFromAPI();
            })
            .catch(error => {
                alert(error);
            })

    }

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
                    OnPressRightButton={this.onDeleteButtonPress}
                    RightButtonParameter={friend.friendshipId}
                    rightButtonColor={"white"}
                    RightButtonImagePath={require("../images/delete_friend.png")}
                    RightButtonImageHeight={'50%'}
                    RightButtonImageWidth={"50%"}
                />
            )
        }
        return null;
    }

    renderFriendsList = () => {

        var list = this.state.friends.map((currentValue: any, key: any) => {

            return this.renderFriendItem(currentValue, key);
        })

        return list;

    }

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