import {Component} from "react";
import {ActivityIndicator, AsyncStorage, ScrollView, View} from "react-native";
import * as React from "react";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import {SearchBar} from 'react-native-elements'
import {AppRoutes} from "../../app.routes";
import {IGetFriendsOfUser} from "../../services/ServiceFriend";
import styles from "./view-friends-to-transfer.style"
import ServiceUser from "../../services/ServiceUser";

interface IViewFriendsComponentState {
    friends: any,
    searchText: string,
    isLoading: boolean,
    loggedInUserId: number,

}

interface IViewFriendsComponentProps {
    navigation: any

}

interface IFriend {

    userId: number,
    phoneNumber: string,
    firstName: string,
    lastName: string

}

export default class ViewFriendsToTransferComponent extends Component<IViewFriendsComponentProps, IViewFriendsComponentState> {


    constructor(props: IViewFriendsComponentProps) {
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

    navigateToTransferMoney = (userId: number) => {
        var accountID = this.props.navigation.getParam("accountID", "default");
        this.props.navigation.navigate(AppRoutes.transfer_money,
            {
                "friendID": userId,
                "accountID": accountID,
            }
        );

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


    onTransferButtonPress = (userId: number) => {
        this.navigateToTransferMoney(userId)

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
                    OnPressRightButton={this.onTransferButtonPress}
                    RightButtonParameter={friend.userId}
                    rightButtonColor={"#45E177"}
                    RightButtonImagePath={require("../images/transfer_money_image.png")}
                    RightButtonImageHeight={'70%'}
                    RightButtonImageWidth={"70%"}
                />)
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
                <View>
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