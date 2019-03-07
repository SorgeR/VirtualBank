import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text } from "react-native";
import styles from "./chat-bubble.component.styles";
var ChatBubbleComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ChatBubbleComponent, _super);
    function ChatBubbleComponent(props) {
        return _super.call(this, props) || this;
    }
    ChatBubbleComponent.prototype.render = function () {
        return (<View style={[styles.balloon, { backgroundColor: '#1084ff' }]}>
                <Text style={styles.textStyle}>{this.props.text}</Text>
                <View style={[
            styles.arrowContainer,
            styles.arrowLeftContainer,
        ]}>
                    <View style={styles.arrowLeft}/>
                </View>
            </View>);
    };
    return ChatBubbleComponent;
}(Component));
export default ChatBubbleComponent;
//# sourceMappingURL=chat-bubble.component.js.map