import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./new-group-dialog.component.style";
var NewGroupDialog = /** @class */ (function (_super) {
    tslib_1.__extends(NewGroupDialog, _super);
    function NewGroupDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            groupName: "",
        };
        return _this;
    }
    NewGroupDialog.prototype.render = function () {
        var _this = this;
        return (<View style={{ flex: 1, flexGrow: 1 }}>
                <View style={styles.headerView}>
                    <Text style={styles.titleStyle}>Add a new group</Text>
                </View>

                <View style={styles.middleView}>
                    <Text style={styles.textChooseGroupName}> Choose a group name </Text>
                    <TextInput placeholder={"Group name"} style={styles.textInputChooseGroupNameStyle} onChangeText={function (text) {
            _this.setState({
                groupName: text,
            });
        }}/>

                </View>


                <View style={styles.footerView}>
                    <TouchableOpacity style={styles.touchableOpacityLeft} onPress={function () {
            _this.props.actionOnAddPress(_this.state.groupName, _this.props.userId);
        }}>
                        <Text style={styles.buttonTextStyle}>ADD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchableOpacityRight} onPress={function () {
            _this.props.actionOnCancelPress();
        }}>
                        <Text style={styles.buttonTextStyle}>CLOSE</Text>
                    </TouchableOpacity>
                </View>

            </View>);
    };
    return NewGroupDialog;
}(Component));
export default NewGroupDialog;
//# sourceMappingURL=new-group-dialog.component.js.map