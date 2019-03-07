import * as tslib_1 from "tslib";
import { Component } from "react";
import { TextInput, View } from "react-native";
import * as React from "react";
var WithValidatorInput = /** @class */ (function (_super) {
    tslib_1.__extends(WithValidatorInput, _super);
    function WithValidatorInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: props.value,
            valid: props.valid,
            styleToUseInTextInput: props.style,
        };
        return _this;
    }
    /**
     * updates the state according to the new props
     * @param newProps
     */
    WithValidatorInput.prototype.componentWillReceiveProps = function (newProps) {
        if (this.props != newProps) {
            this.setState(newProps);
            this.chooseTheStyleToBeApplied(newProps);
        }
    };
    /**
     * sets the style of the text input normal/error
     * @param newProps
     */
    WithValidatorInput.prototype.chooseTheStyleToBeApplied = function (newProps) {
        if (newProps.valid == true || newProps.value == "") {
            this.setState({
                styleToUseInTextInput: this.props.style
            });
        }
        else {
            if (newProps.value != "") {
                this.setState({
                    styleToUseInTextInput: this.props.styleError
                });
            }
        }
    };
    WithValidatorInput.prototype.render = function () {
        var _a = this.state, value = _a.value, styleToUseInTextInput = _a.styleToUseInTextInput;
        var _b = this.props, placeholder = _b.placeholder, isPassword = _b.isPassword, keyboardType = _b.keyboardType, validate = _b.validate, field = _b.field, regex = _b.regex;
        return (<View>
            <View style={{ flexDirection: 'row' }}>
            <TextInput secureTextEntry={isPassword} value={value} onChangeText={function (text) { return validate(field, text, regex); }} placeholder={placeholder} style={styleToUseInTextInput} underlineColorAndroid='transparent' keyboardType={keyboardType}>

            </TextInput>

            </View>
        </View>);
    };
    return WithValidatorInput;
}(Component));
export default WithValidatorInput;
//# sourceMappingURL=WithValidatorInput.js.map