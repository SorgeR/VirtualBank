import * as tslib_1 from "tslib";
import { Component } from "react";
import { ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View } from "react-native";
import ServiceFriend from "../../services/ServiceFriend";
import * as React from "react";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import { SearchBar } from 'react-native-elements';
import styles from "./SearchFriends.component.style";
import ServiceUser from "../../services/ServiceUser";
var addFriendImage = require("../images/new_friend.png");
var friendsImage = require("../images/friends_icon.png");
var SearchFriendsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SearchFriendsComponent, _super);
    function SearchFriendsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getDataFromAPI = function () {
            ServiceUser.getNonFriends(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    users: response.data,
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
        _this.onAddFriendButtonPress = function (userId) {
            ServiceFriend.saveFriendship(_this.state.loggedInUserId, userId)
                .then(function (response) {
                ToastAndroid.show("You are now friends!", ToastAndroid.SHORT);
                _this.getDataFromAPI();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.renderUserItem = function (user, key) {
            var searchText = _this.state.searchText;
            if (user.id != _this.state.loggedInUserId) {
                if (user.phoneNumber.startsWith(searchText) || searchText == "") {
                    return (<ViewFriendsCard key={key} phoneNumber={user.phoneNumber} firstName={user.firstName} lastName={user.lastName} ImagePath={friendsImage} OnPressRightButton={_this.onAddFriendButtonPress} RightButtonParameter={user.id} rightButtonColor={"white"} RightButtonImagePath={addFriendImage} RightButtonImageHeight={"70%"} RightButtonImageWidth={"70%"}/>);
                }
            }
            return null;
        };
        _this.renderUsersList = function () {
            var list = _this.state.users.map(function (currentValue, key) {
                return _this.renderUserItem(currentValue, key);
            });
            return list;
        };
        _this.state = {
            searchText: "",
            users: [],
            isLoading: true,
            loggedInUserId: -1,
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    SearchFriendsComponent.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={{ flex: 1 }}>
                    <SearchBar platform="android" cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }} placeholder='Search' onChangeText={function (text) {
                _this.setState({
                    searchText: text,
                });
            }}/>


                    <ScrollView removeClippedSubviews={true}>
                        {this.renderUsersList()}
                    </ScrollView>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return SearchFriendsComponent;
}(Component));
export default SearchFriendsComponent;
//# sourceMappingURL=SearchFriends.component.js.map