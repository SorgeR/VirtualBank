import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, Image, Button, ActivityIndicator } from "react-native";
import { Card } from "native-base";
import styles from "./view-bill-card.component.style";
import ServiceUser from "../../../services/ServiceUser";
import { AppRoutes } from "../../../app.routes";
var ViewBillsCard = /** @class */ (function (_super) {
    tslib_1.__extends(ViewBillsCard, _super);
    function ViewBillsCard(props) {
        var _this = _super.call(this, props) || this;
        _this.navigateToAddMembersToBill = function () {
            _this.props.navigation.navigate(AppRoutes.view_friends_to_add_to_bill);
        };
        _this.renderButtons = function () {
            if (_this.state.owner.id == _this.props.billOwnerId) {
                return (<View style={styles.buttonsWrapper}>
                    <View style={styles.twoButtonsViewStyle}>
                        <Button title={"View Members Status"} onPress={function () {
                }}/>
                    </View>
                    <View style={styles.twoButtonsViewStyle}>
                        <Button title={"Add New Members"} onPress={function () {
                    _this.navigateToAddMembersToBill();
                }}/>
                    </View>
                </View>);
            }
            else {
                return (<View style={styles.buttonsWrapper}>
                    <View style={styles.wrapper}>
                        <Button title={"View Members Status"} onPress={function () {
                }}/>
                    </View>
                </View>);
            }
        };
        _this.state = ({
            owner: null,
            isLoading: true,
        });
        _this.getOwnerById();
        return _this;
    }
    ViewBillsCard.prototype.getOwnerById = function () {
        var _this = this;
        ServiceUser.getUserByID(this.props.billOwnerId)
            .then(function (response) {
            _this.setState({
                owner: response,
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
    ViewBillsCard.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <Card style={styles.card}>
                        <View style={styles.wrapper}>
                            <View style={styles.topHorizontalWrapper}>

                                <View style={styles.wrapper}>
                                    <Image source={require("../../images/add_member_to_group.png")} style={styles.imageStyle}/>
                                </View>

                                <View style={styles.topTextWrapper}>

                                    <Text>{this.props.billTitle}</Text>
                                    <Text>{this.props.billSum} RON</Text>
                                    <Text>Payed by: {this.state.owner.firstName}</Text>
                                </View>

                                <View style={styles.topDateWrapper}>
                                    <Text>{this.props.billDate}</Text>
                                </View>

                            </View>

                            <View style={styles.middleWrapper}>
                                <Text>Description:</Text>
                                <Text>{this.props.billDescription}</Text>
                            </View>

                            {this.renderButtons()}
                        </View>
                    </Card>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return ViewBillsCard;
}(Component));
export default ViewBillsCard;
//# sourceMappingURL=ViewBillCard.component.js.map