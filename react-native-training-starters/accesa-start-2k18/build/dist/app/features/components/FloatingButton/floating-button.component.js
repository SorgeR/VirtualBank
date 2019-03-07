import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Text, TouchableOpacity } from "react-native";
import styles from './floating-button.component.style';
var FloatingButton = /** @class */ (function (_super) {
    tslib_1.__extends(FloatingButton, _super);
    function FloatingButton(props) {
        return _super.call(this, props) || this;
    }
    FloatingButton.prototype.render = function () {
        var _this = this;
        return (<TouchableOpacity style={styles.floatingButton} onPress={function () {
            _this.props.action();
        }}>
            <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>);
    };
    return FloatingButton;
}(Component));
export default FloatingButton;
//# sourceMappingURL=floating-button.component.js.map