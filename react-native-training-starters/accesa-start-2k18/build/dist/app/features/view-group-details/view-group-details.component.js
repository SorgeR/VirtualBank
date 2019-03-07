import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, AsyncStorage, ToastAndroid } from "react-native";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import ServiceFriendGroup from "../../services/ServiceFriendGroup";
import styles from "./view-group-details.component.style";
import { AppRoutes } from "../../app.routes";
var ViewGroupDetailsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewGroupDetailsComponent, _super);
    function ViewGroupDetailsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.navigateToAddFriendToGroup = function () {
            _this.props.navigation.navigate(AppRoutes.view_friends_to_add_to_group, { 'groupID': _this.state.groupId.toString() });
        };
        _this.navigateToViewGroups = function () {
            _this.props.navigation.navigate(AppRoutes.view_groups);
        };
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserId: Number(response),
                    }, function () {
                        _this.getGroupDataFromAPI();
                    });
                }
            })
                .catch(function (error) {
                alert('error');
            });
        };
        _this.getGroupDataFromAPI = function () {
            ServiceFriendGroup.getFriendGroupById(_this.state.groupId)
                .then(function (response) {
                _this.setState({
                    group: response
                }, function () {
                    _this.getMembersOfGroupFromAPI();
                });
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.getMembersOfGroupFromAPI = function () {
            ServiceFriendGroup.getMembersOfGroup(_this.state.groupId)
                .then(function (response) {
                _this.setState({
                    groupMembers: response.data
                }, function () { return _this.setState({
                    isLoading: false,
                }, function () {
                    _this.setState({
                        newGroupName: _this.state.group.name
                    });
                }); });
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.updateGroupNameInAPI = function () {
            if (_this.state.newGroupName != "") {
                ServiceFriendGroup.updateFriendGroupName(_this.state.groupId, _this.state.loggedInUserId, _this.state.newGroupName)
                    .then(function (response) {
                    ToastAndroid.show("The group name was modified!", ToastAndroid.SHORT);
                })
                    .catch(function (error) {
                    alert(error);
                });
            }
            else {
                alert("The name of the group can not be empty!");
            }
        };
        _this.deleteGroupMemberFromAPI = function (memberId) {
            ServiceFriendGroup.deleteGroupMember(memberId)
                .then(function (response) {
                ToastAndroid.show("Successfully deleted the member!", ToastAndroid.SHORT);
                _this.getMembersOfGroupFromAPI();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.renderGroupMemberItem = function (member, key) {
            if (_this.state.group.adminId == _this.state.loggedInUserId && member.userId != _this.state.group.adminId) {
                return (<ViewFriendsCard key={key} phoneNumber={member.phoneNumber} firstName={member.firstName} lastName={member.lastName} ImagePath={require("../images/friends_icon.png")} OnPressRightButton={_this.deleteGroupMemberFromAPI} RightButtonParameter={member.membershipId} rightButtonColor={"white"} RightButtonImagePath={require("../images/delete_friend.png")} RightButtonImageHeight={'50%'} RightButtonImageWidth={"50%"}/>);
            }
            else {
                return (<ViewFriendsCard key={key} ImagePath={require("../images/friends_icon.png")} phoneNumber={member.phoneNumber} firstName={member.firstName} lastName={member.lastName} OnPressRightButton={function () {
                }} rightButtonColor={"white"}/>);
            }
        };
        _this.renderGroupMembersList = function () {
            var list = _this.state.groupMembers.map(function (currentValue, key) {
                return _this.renderGroupMemberItem(currentValue, key);
            });
            return list;
        };
        _this.deleteGroupFromAPI = function () {
            ServiceFriendGroup.deleteGroup(_this.state.groupId)
                .then(function (response) {
                ToastAndroid.show("Successfully deleted the group!", ToastAndroid.SHORT);
                _this.navigateToViewGroups();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.renderDeleteGroupButton = function () {
            if (_this.state.group.adminId == _this.state.loggedInUserId) {
                return (<TouchableOpacity onPress={function () {
                    _this.deleteGroupFromAPI();
                }}>
                    <Image source={require("../images/delete_friend.png")} style={{ height: 40, width: 40 }}></Image>
                </TouchableOpacity>);
            }
            return null;
        };
        _this.state = {
            groupId: _this.props.navigation.getParam('groupID', 'default'),
            isLoading: true,
            newGroupName: "",
            loggedInUserId: -1,
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    ViewGroupDetailsComponent.prototype.renderUpdateButton = function () {
        var _this = this;
        if (this.state.group.adminId == this.state.loggedInUserId) {
            return (<View style={styles.groupNameUpdateWrapper}>
                    <View style={styles.groupNameWrapper}>
                        <TextInput style={styles.textGroupName} onChangeText={function (text) { return _this.setState({
                newGroupName: text,
            }); }}>{this.state.group.name}</TextInput>
                    </View>
                    <View style={styles.updateWrapper}>
                        <TouchableOpacity onPress={function () {
                _this.updateGroupNameInAPI();
            }}>
                            <Image source={require("../images/update_image.png")} style={styles.updateImage}/>
                        </TouchableOpacity>
                    </View>

                </View>);
        }
        else {
            return (<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                textAlign: 'center',
                fontSize: 20,
                width: 200,
                fontFamily: "Montserrat-ExtraBold"
            }}>{this.state.group.name}</Text>
                </View>);
        }
    };
    ViewGroupDetailsComponent.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <View style={styles.topComponentWrapper}>

                        <View style={styles.deleteAddWrapper}>
                            <View style={styles.addWrapper}>
                                <TouchableOpacity onPress={function () {
                _this.navigateToAddFriendToGroup();
            }}>
                                    <Image source={require("../images/add_member_to_group.png")} style={styles.addImage}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.deleteWrapper}>
                                {this.renderDeleteGroupButton()}
                            </View>
                        </View>
                        {this.renderUpdateButton()}

                        <Text style={styles.numberOfMembers}>No of
                            members: {this.state.groupMembers.length}</Text>
                    </View>
                    <View style={styles.scrollerWrapper}>

                        <ScrollView removeClippedSubviews={true}>

                            {this.renderGroupMembersList()}

                        </ScrollView>
                    </View>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return ViewGroupDetailsComponent;
}(Component));
export default ViewGroupDetailsComponent;
//# sourceMappingURL=view-group-details.component.js.map