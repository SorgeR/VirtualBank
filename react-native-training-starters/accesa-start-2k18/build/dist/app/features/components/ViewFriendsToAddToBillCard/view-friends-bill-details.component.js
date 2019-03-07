import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import styles from "./ViewFriendsToAddToBillCard.style";
import { Card } from "native-base";
import { Image, Text, View } from "react-native";
var ViewFriendsToAddToBillCard = /** @class */ (function (_super) {
    tslib_1.__extends(ViewFriendsToAddToBillCard, _super);
    function ViewFriendsToAddToBillCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewFriendsToAddToBillCard.prototype.render = function () {
        return (<Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        <View style={styles.leftWrapper}>


                        </View>
                        <View style={styles.middleWrapper}>
                            <Text style={styles.textName}>{this.props.firstName} {this.props.lastName}</Text>
                            <Text style={styles.textSumToPay}>To Pay: {this.props.sumToPay}</Text>

                        </View>
                        <View style={styles.rightWrapper}>
                            <Image style={[styles.iconRightImageStyle, {
                height: this.props.rightButtonImageHeight,
                width: this.props.rightButtonImageWidth
            }]} source={this.props.imageDoneNotDone} resizeMode={'contain'}/>
                        </View>

                    </View>
                </View>
            </Card>);
    };
    return ViewFriendsToAddToBillCard;
}(Component));
export default ViewFriendsToAddToBillCard;
//# sourceMappingURL=view-friends-bill-details.component.js.map