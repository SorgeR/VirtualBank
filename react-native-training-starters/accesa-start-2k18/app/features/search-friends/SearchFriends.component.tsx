import {Component} from "react";
import {ActivityIndicator, AsyncStorage, Button, Picker, ScrollView, Text, ToastAndroid, View} from "react-native";
import ServiceFriend, {IGetFriendsOfUser} from "../../services/ServiceFriend";
import * as React from "react";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import {SearchBar} from 'react-native-elements'
import {AppRoutes} from "../../app.routes";
import styles from "./SearchFriends.component.style"
import ServiceUser from "../../services/ServiceUser";


interface IViewFriendsComponentState {

    users: any,
    loggedInUserId: number,
    isLoading: boolean,
    searchText: string,
}

interface IViewFriendsComponentProps {
    navigation?: any

}

interface IGetUser {
    id: number,
    phoneNumber: string,
    lastName: string,
    firstName: string
}

const addFriendImage = require("../images/new_friend.png");

const friendsImage = require("../images/friends_icon.png")

export default class SearchFriendsComponent extends Component<IViewFriendsComponentProps, IViewFriendsComponentState> {


    constructor(props: IViewFriendsComponentProps) {
        super(props);
        this.state = {
            searchText: "",
            users: [],
            isLoading: true,
            loggedInUserId: -1,
        }
        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            this.getDataFromAsyncStorage()
        })

    }

    getDataFromAPI = () => {
        ServiceUser.getNonFriends(this.state.loggedInUserId)
            .then((response: IGetFriendsOfUser) => {
                this.setState({
                    users: response.data,
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

    onAddFriendButtonPress = (userId: number) => {
        ServiceFriend.saveFriendship(this.state.loggedInUserId, userId)
            .then(response => {
                ToastAndroid.show("You are now friends!", ToastAndroid.SHORT);
                this.getDataFromAPI()
            })
            .catch((error) => {
                alert(error)
            })

    }

    renderUserItem = (user: IGetUser, key: any) => {
        const {searchText} = this.state
        if(user.id!=this.state.loggedInUserId) {
            if (user.phoneNumber.startsWith(searchText) || searchText == "") {
                return (
                    <ViewFriendsCard
                        key={key}
                        phoneNumber={user.phoneNumber}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        ImagePath={friendsImage}
                        OnPressRightButton={this.onAddFriendButtonPress}
                        RightButtonParameter={user.id}
                        rightButtonColor={"white"}
                        RightButtonImagePath={addFriendImage}
                        RightButtonImageHeight={"70%"}
                        RightButtonImageWidth={"70%"}
                    />)
            }
        }
        return null;
    }

    renderUsersList = () => {

        var list = this.state.users.map((currentValue: any, key: any) => {

            return this.renderUserItem(currentValue, key);
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
                        placeholder='Search'
                        onChangeText={(text) => {
                            this.setState({
                                searchText: text,
                            })
                        }}
                    />


                    <ScrollView
                        removeClippedSubviews={true}
                    >
                        {this.renderUsersList()}
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