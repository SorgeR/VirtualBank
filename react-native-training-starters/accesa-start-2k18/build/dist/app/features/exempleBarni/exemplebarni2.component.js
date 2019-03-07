import * as tslib_1 from "tslib";
import React, { Component, PureComponent } from 'react';
import { View, Text, Button } from 'react-native';
var TextComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TextComponent, _super);
    function TextComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderCount = 0;
        return _this;
    }
    TextComponent.prototype.render = function () {
        var _a = this.props, message = _a.message, parentFunction = _a.parentFunction;
        this.renderCount++;
        return (<View>
            <Text>{message} rendered {this.renderCount} times.</Text>
                <Button title={"alert button"} onPress={parentFunction}/>
            </View>);
    };
    return TextComponent;
}(Component));
export default TextComponent;
var PureTextComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PureTextComponent, _super);
    function PureTextComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderCount = 0;
        return _this;
    }
    PureTextComponent.prototype.render = function () {
        var message = this.props.message;
        this.renderCount++;
        return (<Text>Pure {message} rendered {this.renderCount} times.</Text>);
    };
    return PureTextComponent;
}(PureComponent));
export { PureTextComponent };
export var StatelessTExtComponent = function (props) { return (<Text>{props.message}</Text>); };
//# sourceMappingURL=exemplebarni2.component.js.map