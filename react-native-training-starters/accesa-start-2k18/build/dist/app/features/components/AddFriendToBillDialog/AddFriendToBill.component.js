import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./AddFriendToBill.component.style";
var AddFriendToBill = /** @class */ (function (_super) {
    tslib_1.__extends(AddFriendToBill, _super);
    function AddFriendToBill() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddFriendToBill.prototype.render = function () {
        return (<View style={styles.wrapper}>
                <View style={styles.headerView}>
                    <Text style={styles.titleStyle}>Add Friend To Bill</Text>
                </View>

                <View style={styles.middleView}>

                    <View style={styles.textWrapper}>
                    <Text style={styles.restOfMoneyTextStyle}>Remained Sum To Pay</Text>
                    <Text style={styles.restSumTextStyle}>1200 RON</Text>
                    </View>

                    <View style={styles.textWrapper}>
                    <TextInput style={styles.sumToPayTextInput} placeholder={"Sum the friend has to pay"} underlineColorAndroid={"transparent"}/>

                    </View>


                </View>


                <View style={styles.footerView}>
                    <TouchableOpacity style={styles.touchableOpacityLeft} onPress={function () {
        }}>
                        <Text style={styles.buttonTextStyle}>ADD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchableOpacityRight} onPress={function () {
        }}>
                        <Text style={styles.buttonTextStyle}>CLOSE</Text>
                    </TouchableOpacity>
                </View>

            </View>);
    };
    return AddFriendToBill;
}(Component));
export default AddFriendToBill;
//# sourceMappingURL=AddFriendToBill.component.js.map