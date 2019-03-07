import * as tslib_1 from "tslib";
import { Component } from "react";
import { ScrollView, View } from "react-native";
import * as React from "react";
import ViewFriendsCard from "../components/ViewFriendsCard/ViewFriendsCard";
import { SearchBar } from 'react-native-elements';
var ViewFriendsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewFriendsComponent, _super);
    function ViewFriendsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            id: -1,
            phoneNumber: "",
            friends: [],
        };
        return _this;
    }
    ViewFriendsComponent.prototype.render = function () {
        return (<View>
                <SearchBar platform="android" cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }} placeholder='Search'/>


                <ScrollView>
                    <ViewFriendsCard phoneNumber={"0747366959"} firstName={"Andrei"} lastName={"Onica"} since={"12/03/2018"} ImagePath={require("../images/friends_icon.png")} OnButtonTap={function () {
        }} rightButtonColor={"white"} RightButtonImagePath={require("../images/delete_friend.png")}/>
                    <ViewFriendsCard phoneNumber={"0747366959"} firstName={"Andrei"} lastName={"Onica"} since={"12/03/2018"} ImagePath={require("../images/friends_icon.png")} OnButtonTap={function () {
        }} rightButtonColor={"white"} RightButtonImagePath={require("../images/delete_friend.png")}/>
                    <ViewFriendsCard phoneNumber={"0747366959"} firstName={"Andrei"} lastName={"Onica"} since={"12/03/2018"} ImagePath={require("../images/friends_icon.png")} OnButtonTap={function () {
        }} rightButtonColor={"white"} RightButtonImagePath={require("../images/delete_friend.png")}/>
                    <ViewFriendsCard phoneNumber={"0747366959"} firstName={"Andrei"} lastName={"Onica"} since={"12/03/2018"} ImagePath={require("../images/friends_icon.png")} OnButtonTap={function () {
        }} rightButtonColor={"white"} RightButtonImagePath={require("../images/delete_friend.png")}/>
                    <ViewFriendsCard phoneNumber={"0747366959"} firstName={"Andrei"} lastName={"Onica"} since={"12/03/2018"} ImagePath={require("../images/friends_icon.png")} OnButtonTap={function () {
        }} rightButtonColor={"white"} RightButtonImagePath={require("../images/delete_friend.png")}/>


                </ScrollView>
            </View>);
    };
    return ViewFriendsComponent;
}(Component));
export default ViewFriendsComponent;
//# sourceMappingURL=ViewFriendsToTopUp.component.js.map