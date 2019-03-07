import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Card } from "native-base";
import styles from "./top-up-history-card.component.style";
import { Image, View, Text } from "react-native";
var TopUpHistoryCardComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TopUpHistoryCardComponent, _super);
    function TopUpHistoryCardComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TopUpHistoryCardComponent.prototype.render = function () {
        var _a = this.props, IBAN = _a.IBAN, Date = _a.Date, Sum = _a.Sum, Alias = _a.Alias;
        return (<Card style={styles.card}>
            <View style={styles.wrapper}>
                <View style={styles.horizontalWrapper}>
                    <View style={styles.imageWrapper}>
                        <Image source={require("../../images/top_up_history_icon.png")} style={styles.imageStyle}/>

                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.textIBAN}>{IBAN}</Text>
                        <Text style={styles.textAlias}>{Alias}</Text>
                        <Text style={styles.textBudget}>{Sum} RON</Text>
                        <Text style={styles.textDate}>{Date}</Text>

                    </View>

                </View>

            </View>


        </Card>);
    };
    return TopUpHistoryCardComponent;
}(Component));
export default TopUpHistoryCardComponent;
//# sourceMappingURL=top-up-history-card.component.js.map