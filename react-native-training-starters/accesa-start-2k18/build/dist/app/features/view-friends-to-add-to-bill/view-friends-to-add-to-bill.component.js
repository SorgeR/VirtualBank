import * as tslib_1 from "tslib";
import { Component } from "react";
import { ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View } from "react-native";
import * as React from "react";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import { SearchBar } from 'react-native-elements';
import styles from "./view-friends-to-add-to-bill.component.style";
import ServiceUser from "../../services/ServiceUser";
import Dialog from "react-native-popup-dialog";
import AddFriendToBill from "../components/add-friend-to-bill-dialog/add-friend-to-bill.component";
import ServiceBill from "../../services/ServiceBill";
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
        _this.enableDialog = function () {
            _this.setState({
                isVisibleDialog: true,
            });
        };
        _this.disableDialog = function () {
            _this.setState({
                isVisibleDialog: false,
            });
        };
        _this.renderFriendItem = function (friend, key) {
            var searchText = _this.state.searchText;
            if (friend.phoneNumber.startsWith(searchText) || searchText == "") {
                return (<ViewFriendsCard key={key} phoneNumber={friend.phoneNumber} firstName={friend.firstName} lastName={friend.lastName} ImagePath={require("../images/friends_icon.png")} OnPressRightButton={function () {
                    _this.setState({
                        idFriend: friend.userId,
                    }, function () {
                        _this.enableDialog();
                    });
                }} RightButtonParameter={friend.friendshipId} rightButtonColor={"white"} RightButtonImagePath={require("../images/contract_image.png")} RightButtonImageHeight={'80%'} RightButtonImageWidth={"80%"}/>);
            }
            return null;
        };
        _this.renderFriendsList = function () {
            var list = _this.state.friends.map(function (currentValue, key) {
                return _this.renderFriendItem(currentValue, key);
            });
            return list;
        };
        _this.addDebtor = function (idDebtor, sumToPay) {
            var _a = _this.state, idCreator = _a.idCreator, idBill = _a.idBill;
            ServiceBill.createDebt(idDebtor, idCreator, idBill, sumToPay)
                .then(function (response) {
                ToastAndroid.show("Successfully added to bill!", ToastAndroid.SHORT);
                _this.disableDialog();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.state = {
            friends: [],
            searchText: "",
            isLoading: true,
            loggedInUserId: -1,
            isVisibleDialog: false,
            idCreator: _this.props.navigation.getParam("ownerID", 0),
            idBill: _this.props.navigation.getParam("billID", 0),
            idFriend: 0,
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    ;
    ViewFriendsComponent.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={{ flex: 1 }}>
                    <SearchBar platform="android" cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }} placeholder='Search by phone number' onChangeText={function (text) { return _this.setState({
                searchText: text,
            }); }}/>
                    <Dialog width={300} height={250} visible={this.state.isVisibleDialog} children={<AddFriendToBill idDebtor={this.state.idFriend} closeButtonFunction={this.disableDialog} addButtonFunction={this.addDebtor} idBill={this.state.idBill} idCreator={this.state.idCreator}/>}/>

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
//# sourceMappingURL=view-friends-to-add-to-bill.component.js.map