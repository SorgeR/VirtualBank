import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import styles from "./add-friend-to-bill.component.style";
import ServiceBill from "../../../services/ServiceBill";
var AddFriendToBill = /** @class */ (function (_super) {
    tslib_1.__extends(AddFriendToBill, _super);
    function AddFriendToBill(props) {
        var _this = _super.call(this, props) || this;
        _this.getRestSumFromAPI = function () {
            ServiceBill.getRestSumOfBill(_this.props.idBill)
                .then(function (response) {
                _this.setState({
                    restAmount: response.restAmount,
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
        _this.addDebt = function () {
            var idDebtor = _this.props.idDebtor;
            var sumToPay = _this.state.sumToPay;
            if (sumToPay <= 0) {
                alert("The sum must be greater than 0!");
                return;
            }
            if (sumToPay > _this.state.restAmount) {
                alert("The sum must be less than the remained sum to pay!");
                return;
            }
            _this.props.addButtonFunction(idDebtor, sumToPay);
        };
        _this.state = {
            restAmount: 0,
            sumToPay: 0,
            isLoading: true,
        };
        _this.getRestSumFromAPI();
        return _this;
    }
    AddFriendToBill.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <View style={styles.headerView}>
                        <Text style={styles.titleStyle}>Add Friend To Bill</Text>
                    </View>

                    <View style={styles.middleView}>

                        <View style={styles.textWrapper}>
                            <Text style={styles.restOfMoneyTextStyle}>Remained Sum To Pay</Text>
                            <Text style={styles.restSumTextStyle}>{this.state.restAmount} RON</Text>
                        </View>

                        <View style={styles.textWrapper}>
                            <TextInput style={styles.sumToPayTextInput} placeholder={"Sum the friend has to pay"} underlineColorAndroid={"transparent"} onChangeText={function (text) {
                _this.setState({
                    sumToPay: Number(text),
                });
            }} keyboardType={'numeric'}/>
                        </View>
                    </View>

                    <View style={styles.footerView}>
                        <TouchableOpacity style={styles.touchableOpacityLeft} onPress={function () {
                _this.addDebt();
            }}>
                            <Text style={styles.buttonTextStyle}>ADD</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchableOpacityRight} onPress={function () {
                _this.props.closeButtonFunction();
            }}>
                            <Text style={styles.buttonTextStyle}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>

                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return AddFriendToBill;
}(Component));
export default AddFriendToBill;
//# sourceMappingURL=add-friend-to-bill.component.js.map