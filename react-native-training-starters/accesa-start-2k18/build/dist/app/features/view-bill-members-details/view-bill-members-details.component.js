import * as tslib_1 from "tslib";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import ServiceBill from "../../services/ServiceBill";
import ViewMembersBillDetails from "../components/view-members-bill-details-card/view-members-bill-details.component";
import styles from "./view-bill-members-details.component.style";
var ViewBillMembersDetailsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewBillMembersDetailsComponent, _super);
    function ViewBillMembersDetailsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getMembersFromAPI = function () {
            ServiceBill.getDebtorsOfBill(_this.state.billId)
                .then(function (response) {
                _this.setState({
                    members: response.data,
                }, function () {
                    _this.setState({
                        isLoading: false,
                    });
                });
            })
                .catch(function (err) {
                alert(err);
            });
        };
        _this.renderDebtor = function (debtor, key) {
            if (debtor.payed == true) {
                return (<ViewMembersBillDetails key={key} firstName={debtor.uFirstName} lastName={debtor.uLastName} sumToPay={debtor.sumToPay} imageDoneNotDone={require("../../features/images/done_image.png")} rightButtonImageHeight={"50%"} rightButtonImageWidth={"50%"}/>);
            }
            else {
                return (<ViewMembersBillDetails key={key} firstName={debtor.uFirstName} lastName={debtor.uLastName} sumToPay={debtor.sumToPay} imageDoneNotDone={require("../../features/images/delete_friend.png")} rightButtonImageHeight={"50%"} rightButtonImageWidth={"50%"}/>);
            }
        };
        _this.renderAllDebtors = function () {
            return _this.state.members.map(function (item, key) {
                return _this.renderDebtor(item, key);
            });
        };
        _this.state = {
            members: [],
            billId: _this.props.navigation.getParam("billID", 0),
            isLoading: true,
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.getMembersFromAPI();
        });
        return _this;
    }
    ViewBillMembersDetailsComponent.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<View>
                    <ScrollView removeClippedSubviews={true}>

                        {this.renderAllDebtors()}

                    </ScrollView>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return ViewBillMembersDetailsComponent;
}(Component));
export default ViewBillMembersDetailsComponent;
//# sourceMappingURL=view-bill-members-details.component.js.map