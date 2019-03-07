import * as tslib_1 from "tslib";
import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View } from "react-native";
import ServiceFriend from "../../services/ServiceFriend";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import { SearchBar } from 'react-native-elements';
import styles from "./view-friends.component.style";
import ServiceUser from "../../services/ServiceUser";
var ViewFriendsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewFriendsComponent, _super);
    function ViewFriendsComponent(props) {
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
                alert('error');
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
                alert("error");
            });
        };
        _this.onDeleteButtonPress = function (id) {
            _this.deleteFriendFromAPI(id);
        };
        _this.deleteFriendFromAPI = function (id) {
            ServiceFriend.deleteFriendFromAPI(id)
                .then(function (response) {
                ToastAndroid.show("Successfully deleted the friend!", ToastAndroid.SHORT);
                _this.getDataFromAPI();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.renderFriendItem = function (friend, key) {
            var searchText = _this.state.searchText;
            if (friend.phoneNumber.startsWith(searchText) || searchText == "") {
                return (<ViewFriendsCard key={key} phoneNumber={friend.phoneNumber} firstName={friend.firstName} lastName={friend.lastName} ImagePath={require("../images/friends_icon.png")} OnPressRightButton={_this.onDeleteButtonPress} RightButtonParameter={friend.friendshipId} rightButtonColor={"white"} RightButtonImagePath={require("../images/delete_friend.png")} RightButtonImageHeight={'50%'} RightButtonImageWidth={"50%"}/>);
            }
            return null;
        };
        _this.renderFriendsList = function () {
            var list = _this.state.friends.map(function (currentValue, key) {
                return _this.renderFriendItem(currentValue, key);
            });
            return list;
        };
        _this.state = {
            friends: [],
            searchText: "",
            isLoading: true,
            loggedInUserId: -1,
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    ViewFriendsComponent.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={{ flex: 1 }}>
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
    return ViewFriendsComponent;
}(Component));
export default ViewFriendsComponent;
//# sourceMappingURL=view-friends.component.js.map