import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import ChatBubbleComponent from "../components/chat-bubble/chat-bubble.component";
import { AsyncStorage, Button, ScrollView, TextInput, View } from "react-native";
import ServiceMessage from "../../services/ServiceMessage";
import styles from "./conversation.component.style";
var interval;
var ConversationComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ConversationComponent, _super);
    function ConversationComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getDataFromAPI = function () {
            ServiceMessage.getMessages(_this.state.idSender, _this.state.idReceiver)
                .then(function (response) {
                _this.setState({
                    messages: response.data,
                }, function () {
                    _this.setState({
                        isLoading: false,
                    });
                });
            })
                .catch(function (error) {
                alert("error");
            });
        };
        _this.createMessage = function () {
            ServiceMessage.addMessage(_this.state.idSender, _this.state.idReceiver, _this.state.text)
                .then(function (resolve) {
                _this.setState({
                    text: "",
                });
                clearInterval(interval);
                interval = setInterval(function () {
                    _this.getDataFromAPI();
                }, 1000);
            })
                .catch(function (error) {
                alert("error");
            });
        };
        _this.renderSenderMessage = function (message, key) {
            return (<View key={key} style={styles.rightMessageStyle}>
                <ChatBubbleComponent text={message.text}/>
            </View>);
        };
        _this.renderReceiverMessage = function (message, key) {
            return (<View key={key} style={styles.leftMessageStyle}>
                <ChatBubbleComponent text={message.text}/>
            </View>);
        };
        _this.renderMessages = function () {
            return _this.state.messages.map(function (currentValue, key) {
                if (currentValue.idSender == _this.state.idSender) {
                    return _this.renderSenderMessage(currentValue, key);
                }
                if (currentValue.idReceiver == _this.state.idSender) {
                    return _this.renderReceiverMessage(currentValue, key);
                }
                return null;
            });
        };
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        idSender: Number(response),
                    }, function () {
                        _this.getDataFromAPI();
                    });
                }
            })
                .catch(function (error) {
                alert('error');
            });
        };
        _this.state = {
            idSender: 0,
            idReceiver: _this.props.navigation.getParam("friendID", "default"),
            text: "",
            date: Date.now(),
            messages: [],
            isLoading: true,
        };
        _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        _this.props.navigation.addListener('willBlur', function () {
            clearInterval(interval);
        });
        return _this;
    }
    ConversationComponent.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            var scrollView;
            return (<View style={styles.wrapper}>

                    <View style={styles.scrollWrapper}>
                        <ScrollView ref={function (ref) { return scrollView = ref; }} onContentSizeChange={function (contentWidth, contentHeight) {
                scrollView.scrollToEnd({ animated: true });
            }}>

                            {this.renderMessages()}
                        </ScrollView>

                    </View>

                    <View style={styles.textAndButtonHorizontalWrapper}>
                        <View style={styles.textWrapper}>
                            <TextInput placeholder={"Message to send..."} value={this.state.text} onChangeText={function (text) { return _this.setState({ text: text }); }} style={styles.textInputStyle}/>

                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button title={"Send"} onPress={this.createMessage}/>
                        </View>
                    </View>


                </View>);
        }
        else
            return null;
    };
    return ConversationComponent;
}(Component));
export default ConversationComponent;
//# sourceMappingURL=conversation.component.js.map