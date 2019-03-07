import {Component} from "react";
import {ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View} from "react-native";
import * as React from "react";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import {SearchBar} from 'react-native-elements';
import styles from "./view-friends-to-add-to-group.component.style";
import ServiceFriendGroup from "../../services/ServiceFriendGroup";


interface IViewFriendsComponentState {

    friends: any,
    searchText: any,
    isLoading: boolean,
    groupId: number,
    loggedInUserId: number

}

interface IFriend {

    id: number,
    phoneNumber: string,
    firstName: string,
    lastName: string


}

const addImage = require("../images/add_to_group.png");
export default class ViewFriendsToAddToGroupComponent extends Component<any, IViewFriendsComponentState> {


    constructor(props: any) {
        super(props);
        this.state = {
            friends: [],
            searchText: "",
            isLoading: true,
            groupId: this.props.navigation.getParam("groupID", "default"),
            loggedInUserId: -1,
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
                    })
                }
            })
            .catch((error) => {
                alert(error)
            })
    };

    getDataFromAPI = () => {

        ServiceFriendGroup.getFriendsWhichAreNotInGroup(this.state.loggedInUserId, this.state.groupId)
            .then((response) => {
                this.setState({
                    friends: response.data,
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

    renderFriendItem = (friend: IFriend, key: any) => {
        const {searchText} = this.state;
        if (friend.phoneNumber.startsWith(searchText) || searchText == "") {
            return (
                <ViewFriendsCard
                    key={key}
                    phoneNumber={friend.phoneNumber}
                    firstName={friend.firstName}
                    lastName={friend.lastName}
                    ImagePath={require("../images/friends_icon.png")}
                    OnPressRightButton={this.addFriendToGroup}
                    RightButtonParameter={friend.id}
                    rightButtonColor={"white"}
                    RightButtonImagePath={addImage}
                    RightButtonImageHeight={"70%"}
                    RightButtonImageWidth={"70%"}
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

    addFriendToGroup = (userId: number) => {
        ServiceFriendGroup.addMemberInGroup(userId, this.state.groupId)
            .then(response => {

                ToastAndroid.show("Successfully added to group!", ToastAndroid.SHORT);
                this.getDataFromAPI()
            })
            .catch(error => {
                alert(error);
            })

    };

    render() {
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
                        removeClippedSubviews={true}
                    >
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