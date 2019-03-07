import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Card } from "native-base";
import styles from "./transfer-history-card.component.style";
import { Image, Text, View } from "react-native";
var TopUpHistoryCardComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TopUpHistoryCardComponent, _super);
    function TopUpHistoryCardComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopUpHistoryCardComponent.prototype.render = function () {
        var _a = this.props, sourceIBAN = _a.sourceIBAN, destinationIBAN = _a.destinationIBAN, date = _a.date, sum = _a.sum, colorOfCard = _a.colorOfCard, imagePath = _a.imagePath;
        return (<Card style={[styles.card, { backgroundColor: colorOfCard }]}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        <View style={styles.imageWrapper}>
                            <Image source={imagePath} style={styles.imageStyle}/>

                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.textIBAN}>You: {sourceIBAN}</Text>
                            <Text style={styles.textIBAN}>Friend: {destinationIBAN}</Text>
                            <Text style={styles.textBudget}>{sum} RON</Text>
                            <Text style={styles.textDate}>{date}</Text>

                        </View>

                    </View>

                </View>


            </Card>);
    };
    return TopUpHistoryCardComponent;
}(Component));
export default TopUpHistoryCardComponent;
//# sourceMappingURL=transfer-history-card.component.js.map