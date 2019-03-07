import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import styles from "./view-members-bill-details.component.style";
import { Card } from "native-base";
import { Image, Text, View } from "react-native";
var ViewMembersBillDetails = /** @class */ (function (_super) {
    tslib_1.__extends(ViewMembersBillDetails, _super);
    function ViewMembersBillDetails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewMembersBillDetails.prototype.render = function () {
        return (<Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>

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
    return ViewMembersBillDetails;
}(Component));
export default ViewMembersBillDetails;
//# sourceMappingURL=view-members-bill-details.component.js.map