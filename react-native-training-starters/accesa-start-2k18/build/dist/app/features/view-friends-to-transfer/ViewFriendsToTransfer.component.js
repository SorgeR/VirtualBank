import * as tslib_1 from "tslib";
import { Component } from "react";
import { ActivityIndicator, AsyncStorage, ScrollView, View } from "react-native";
import * as React from "react";
import ViewFriendsCard from "../components/ViewFriendsCard/ViewFriendsCard";
import { SearchBar } from 'react-native-elements';
import { AppRoutes } from "../../app.routes";
import ServiceFriend from "../../services/ServiceFriend";
import styles from "./ViewFriendsToTransfer.style";
var ViewFriendsToTransferComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewFriendsToTransferComponent, _super);
    function ViewFriendsToTransferComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.navigateToTransferMoney = function (userId) {
            var accountID = _this.props.navigation.getParam("accountID", "default");
            _this.props.navigation.navigate(AppRoutes.transfer_money, {
                "friendID": userId,
                "accountID": accountID,
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
        _this.onTransferButtonPress = function (userId) {
            _this.navigateToTransferMoney(userId);
        };
        _this.getDataFromAPI = function () {
            ServiceFriend.getFriendsOfUser(_this.state.loggedInUserId)
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
        _this.renderFriendItem = function (friend, key) {
            var searchText = _this.state.searchText;
            if (friend.phoneNumber.startsWith(searchText) || searchText == "") {
                return (<ViewFriendsCard key={key} phoneNumber={friend.phoneNumber} firstName={friend.firstName} lastName={friend.lastName} ImagePath={require("../images/friends_icon.png")} OnPressRightButton={_this.onTransferButtonPress} RightButtonParameter={friend.userId} rightButtonColor={"#45E177"} RightButtonImagePath={require("../images/transfer_money_image.png")} RightButtonImageHeight={'70%'} RightButtonImageWidth={"70%"}/>);
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
    ViewFriendsToTransferComponent.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View>
                    <SearchBar platform="android" cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }} placeholder='Search by phone number' onChangeText={function (text) { return _this.setState({
                searchText: text,
            }); }}/>

                    <ScrollView>

                        {this.renderFriendsList()}

                    </ScrollView>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#36BB60"/>
                </View>);
        }
    };
    return ViewFriendsToTransferComponent;
}(Component));
export default ViewFriendsToTransferComponent;
//# sourceMappingURL=ViewFriendsToTransfer.component.js.map