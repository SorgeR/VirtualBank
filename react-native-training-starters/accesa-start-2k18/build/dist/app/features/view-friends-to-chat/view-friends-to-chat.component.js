import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, View } from "react-native";
import ServiceUser from "../../services/ServiceUser";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import { AppRoutes } from "../../app.routes";
import { SearchBar } from "react-native-elements";
import styles from "./view-friends-to-chat.component.style";
var ViewFriendsToChatComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewFriendsToChatComponent, _super);
    function ViewFriendsToChatComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserId: Number(response),
                    }, function () {
                        _this.getDataFromAPI();
                    });
                }
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.getDataFromAPI = function () {
            ServiceUser.getFriends(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    friends: response,
                }, function () {
                    _this.setState({
                        isLoading: false,
                    });
                });
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.onChatButtonPress = function (idFriend) {
            _this.props.navigation.navigate(AppRoutes.chat, {
                "friendID": idFriend,
            });
        };
        _this.renderFriendItem = function (friend, key) {
            var searchText = _this.state.searchText;
            if (friend.phoneNumber.startsWith(searchText) || searchText == "") {
                return (<ViewFriendsCard key={key} phoneNumber={friend.phoneNumber} firstName={friend.firstName} lastName={friend.lastName} OnPressRightButton={_this.onChatButtonPress} RightButtonParameter={friend.userId} ImagePath={require("../images/friends_icon.png")} rightButtonColor={"white"} RightButtonImagePath={require("../images/chat_image.png")} RightButtonImageHeight={'80%'} RightButtonImageWidth={"80%"}/>);
            }
            return null;
        };
        _this.renderFriendsList = function () {
            return _this.state.friends.map(function (currentValue, key) {
                return _this.renderFriendItem(currentValue, key);
            });
        };
        _this.state = {
            loggedInUserId: 0,
            isLoading: true,
            friends: [],
            searchText: "",
        };
        _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    ViewFriendsToChatComponent.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <SearchBar platform="android" cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }} placeholder='Search by phone number' onChangeText={function (text) { return _this.setState({
                searchText: text,
            }); }}/>

                    <ScrollView removeClippedSubviews={true}>
                        {this.renderFriendsList()}

                    </ScrollView>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return ViewFriendsToChatComponent;
}(Component));
export default ViewFriendsToChatComponent;
//# sourceMappingURL=view-friends-to-chat.component.js.map