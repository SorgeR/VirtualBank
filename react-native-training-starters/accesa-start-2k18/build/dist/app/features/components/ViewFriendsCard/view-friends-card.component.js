import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card, } from "native-base";
import styles from "./view-friends-card.component.style";
var ViewFriendsCard = /** @class */ (function (_super) {
    tslib_1.__extends(ViewFriendsCard, _super);
    function ViewFriendsCard(props) {
        var _this = _super.call(this, props) || this;
        _this.renderAvatarImage = function () {
            if (_this.props.ImagePath != undefined) {
                return (<Image style={styles.iconImageStyle} source={_this.props.ImagePath} resizeMode={'contain'}/>);
            }
            return null;
        };
        _this.renderTouchableOpacity = function () {
            if (_this.props.RightButtonImagePath != undefined) {
                return (<TouchableOpacity style={[styles.deleteFriend, { backgroundColor: _this.props.rightButtonColor }]} onPress={function () { return _this.props.OnPressRightButton(_this.props.RightButtonParameter); }}>

                <Image style={[styles.iconImageDeleteStyle, {
                        height: _this.props.RightButtonImageHeight,
                        width: _this.props.RightButtonImageWidth
                    }]} source={_this.props.RightButtonImagePath} resizeMode={'contain'}/>

            </TouchableOpacity>);
            }
            else
                return null;
        };
        return _this;
    }
    ViewFriendsCard.prototype.render = function () {
        return (<Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        

                            


                        
                        <View style={styles.middleWrapper}>
                            <Text style={styles.textName}>{this.props.firstName} {this.props.lastName}</Text>
                            <Text style={styles.textPhoneNumber}>{this.props.phoneNumber}</Text>

                        </View>
                        <View style={styles.rightWrapper}>
                            {this.renderTouchableOpacity()}
                        </View>

                    </View>
                </View>
            </Card>);
    };
    return ViewFriendsCard;
}(Component));
export default ViewFriendsCard;
//# sourceMappingURL=view-friends-card.component.js.map