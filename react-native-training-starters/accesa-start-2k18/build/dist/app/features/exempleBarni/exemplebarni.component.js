import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View } from 'react-native';
import TextComponent, { PureTextComponent as PTC } from './exemplebarni2.component';
var ExemplebarniComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ExemplebarniComponent, _super);
    function ExemplebarniComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.alertParentMessage = function () {
            alert(_this.state.messageToAlert);
        };
        _this.state = {
            message: [10],
            messageToAlert: "message from parent",
        };
        var didBlurSubscription = _this.props.navigation.addListener('willBlur', function () {
            clearInterval(_this.interval);
        });
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.interval = setInterval(function () {
                var message = _this.state.message;
                var max = 2;
                var min = 1;
                var value = Math.floor(Math.random() * (max - min + 1) + min);
                message.push(value);
                alert(value);
                _this.setState({ message: message.slice() });
            }, 3000);
        });
        return _this;
    }
    ExemplebarniComponent.prototype.render = function () {
        var message = this.state.message;
        return (<View>
            <PTC message={message}/>
            <TextComponent message={message} parentFunction={this.alertParentMessage}/>
            </View>);
    };
    return ExemplebarniComponent;
}(Component));
export default ExemplebarniComponent;
//# sourceMappingURL=exemplebarni.component.js.map