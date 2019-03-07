import * as tslib_1 from "tslib";
import { Component } from "react";
import { ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View } from "react-native";
import * as React from "react";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import { SearchBar } from 'react-native-elements';
import styles from "./view-friends-to-add-to-group.component.style";
import ServiceFriendGroup from "../../services/ServiceFriendGroup";
var addImage = require("../images/add_to_group.png");
var ViewFriendsToAddToGroupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewFriendsToAddToGroupComponent, _super);
    function ViewFriendsToAddToGroupComponent(props) {
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
            ServiceFriendGroup.getFriendsWhichAreNotInGroup(_this.state.loggedInUserId, _this.state.groupId)
                .then(function (response) {
                _this.setState({
                    friends: response.data,
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
        _this.renderFriendItem = function (friend, key) {
            var searchText = _this.state.searchText;
            if (friend.phoneNumber.startsWith(searchText) || searchText == "") {
                return (<ViewFriendsCard key={key} phoneNumber={friend.phoneNumber} firstName={friend.firstName} lastName={friend.lastName} ImagePath={require("../images/friends_icon.png")} OnPressRightButton={_this.addFriendToGroup} RightButtonParameter={friend.id} rightButtonColor={"white"} RightButtonImagePath={addImage} RightButtonImageHeight={"70%"} RightButtonImageWidth={"70%"}/>);
            }
            return null;
        };
        _this.renderFriendsList = function () {
            return _this.state.friends.map(function (currentValue, key) {
                return _this.renderFriendItem(currentValue, key);
            });
        };
        _this.addFriendToGroup = function (userId) {
            ServiceFriendGroup.addMemberInGroup(userId, _this.state.groupId)
                .then(function (response) {
                ToastAndroid.show("Successfully added to group!", ToastAndroid.SHORT);
                _this.getDataFromAPI();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.state = {
            friends: [],
            searchText: "",
            isLoading: true,
            groupId: _this.props.navigation.getParam("groupID", "default"),
            loggedInUserId: -1,
        };
        _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    ViewFriendsToAddToGroupComponent.prototype.render = function () {
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
    return ViewFriendsToAddToGroupComponent;
}(Component));
export default ViewFriendsToAddToGroupComponent;
//# sourceMappingURL=view-friends-to-add-to-group.component.js.map