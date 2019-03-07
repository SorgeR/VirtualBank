import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card, } from "native-base";
import styles from "./view-groups-card.component.style";
var ViewAccountsCard = /** @class */ (function (_super) {
    tslib_1.__extends(ViewAccountsCard, _super);
    function ViewAccountsCard(props) {
        return _super.call(this, props) || this;
    }
    ViewAccountsCard.prototype.render = function () {
        var _this = this;
        return (<Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        <View style={styles.middleWrapper}>
                            <Text style={styles.textName}>{this.props.name}</Text>
                            <Text style={styles.textDate}>{this.props.createDate}</Text>
                        </View>
                        <View style={styles.rightWrapper}>
                            <TouchableOpacity style={styles.deleteGroup} onPress={function () {
            _this.props.OnPressRightButton(_this.props.idGroup);
        }}>
                                <Image source={this.props.ImagePath} style={{
            height: this.props.RightImageHeight,
            width: this.props.RightImageWidth
        }} resizeMode={'contain'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Card>);
    };
    return ViewAccountsCard;
}(Component));
export default ViewAccountsCard;
//# sourceMappingURL=ViewGroupsCard.component.js.map