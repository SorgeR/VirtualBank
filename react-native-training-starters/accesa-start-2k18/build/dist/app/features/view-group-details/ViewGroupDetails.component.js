import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Image, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import ViewFriendsCard from "../components/ViewFriendsCard/ViewFriendsCard";
var ViewGroupDetailsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewGroupDetailsComponent, _super);
    function ViewGroupDetailsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewGroupDetailsComponent.prototype.render = function () {
        return (<View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity>
                    <Image source={require("../images/add_member_to_group.png")} style={{ height: 100, width: 100 }}></Image>
                    </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 4, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <TextInput style={{ textAlign: 'center', fontSize: 20, width: 200 }}>Group 1</TextInput>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <TouchableOpacity>
                                <Image source={require("../images/update_image.png")} style={{ height: 50, width: 50 }}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ fontSize: 20, fontFamily: "Montserrat-ExtraBold" }}>No of members: 20</Text>
                </View>
                <View style={{ flex: 1.5 }}>

                    <ScrollView>
                        <ViewFriendsCard phoneNumber={"074721312"} firstName={"Ion"} lastName={"Mihai"} OnButtonTap={function () {
        }} RightButtonImagePath={require("../images/delete_friend.png")} RightButtonImageWidth={"50%"} RightButtonImageHeight={'50%'}/>
                        <ViewFriendsCard phoneNumber={"074721312"} firstName={"Ion"} lastName={"Mihai"} OnButtonTap={function () {
        }} RightButtonImagePath={require("../images/delete_friend.png")} RightButtonImageWidth={"50%"} RightButtonImageHeight={'50%'}/>

                        <ViewFriendsCard phoneNumber={"074721312"} firstName={"Ion"} lastName={"Mihai"} OnButtonTap={function () {
        }} RightButtonImagePath={require("../images/delete_friend.png")} RightButtonImageWidth={"50%"} RightButtonImageHeight={'50%'}/>

                        <ViewFriendsCard phoneNumber={"074721312"} firstName={"Ion"} lastName={"Mihai"} OnButtonTap={function () {
        }} RightButtonImagePath={require("../images/delete_friend.png")} RightButtonImageWidth={"50%"} RightButtonImageHeight={'50%'}/>

                        <ViewFriendsCard phoneNumber={"074721312"} firstName={"Ion"} lastName={"Mihai"} OnButtonTap={function () {
        }} RightButtonImagePath={require("../images/delete_friend.png")} RightButtonImageWidth={"50%"} RightButtonImageHeight={'50%'}/>



                    </ScrollView>
                </View>
            </View>);
    };
    return ViewGroupDetailsComponent;
}(Component));
export default ViewGroupDetailsComponent;
//# sourceMappingURL=ViewGroupDetails.component.js.map