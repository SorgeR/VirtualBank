import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ScrollView, View, AsyncStorage, ActivityIndicator, ToastAndroid } from "react-native";
import ViewGroupsCard from "../components/view-groups-card/view-groups-card.component";
import Dialog from "react-native-popup-dialog";
import NewGroupDialog from "../components/new-group-dialog/new-group-dialog.component";
import { AppRoutes } from "../../app.routes";
import ServiceFriendGroup from "../../services/ServiceFriendGroup";
import styles from "./view-groups.component.style";
import FloatingButton from "../components/floating-button/floating-button.component";
var ViewGroupsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewGroupsComponent, _super);
    function ViewGroupsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.navigateToDetails = function (idGroup) {
            _this.props.navigation.navigate(AppRoutes.group_details, { 'groupID': idGroup.toString() });
        };
        _this.disableDialog = function () {
            _this.setState({
                isVisible: false,
            });
        };
        _this.enableDialog = function () {
            _this.setState({
                isVisible: true,
            });
        };
        _this.getGroupsFromAPI = function () {
            ServiceFriendGroup.getGroupsOfUser(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    groups: response.data
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
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserId: Number(response),
                    }, function () {
                        _this.getGroupsFromAPI();
                    });
                }
            })
                .catch(function (error) {
                alert('error');
            });
        };
        _this.renderGroupsList = function () {
            var list = _this.state.groups.map(function (currentValue, key) {
                return _this.renderGroupItem(currentValue, key);
            });
            return list;
        };
        _this.renderGroupItem = function (group, key) {
            return (<ViewGroupsCard key={key} idGroup={group.id} name={group.name} createDate={group.createDate.substr(0, 10)} OnPressRightButton={_this.navigateToDetails} ImagePath={require("../images/details_image.png")} RightImageHeight={"60%"} RightImageWidth={"60%"}/>);
        };
        _this.createGroupInAPI = function (groupName, adminID) {
            if (groupName != "") {
                ServiceFriendGroup.createGroup(groupName, adminID)
                    .then(function (response) {
                    ToastAndroid.show("Successfully added the group!", ToastAndroid.SHORT);
                    _this.getGroupsFromAPI();
                    _this.disableDialog();
                })
                    .catch(function (error) {
                    alert(error);
                });
            }
            else {
                alert("Please enter a group name!");
            }
        };
        _this.state = {
            active: false,
            isVisible: false,
            loggedInUserId: "",
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    ViewGroupsComponent.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <ScrollView removeClippedSubviews={true}>
                        <Dialog width={300} height={300} visible={this.state.isVisible} children={<NewGroupDialog actionOnAddPress={this.createGroupInAPI} actionOnCancelPress={this.disableDialog} userId={this.state.loggedInUserId}/>}/>

                        {this.renderGroupsList()}


                    </ScrollView>

                    <FloatingButton action={this.enableDialog}/>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return ViewGroupsComponent;
}(Component));
export default ViewGroupsComponent;
//# sourceMappingURL=view-groups.component.js.map