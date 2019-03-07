import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Card } from "native-base";
import { View, Text, Image } from "react-native";
import styles from "./statistics-budget-card.component.style";
var StatisticsBudgetCard = /** @class */ (function (_super) {
    tslib_1.__extends(StatisticsBudgetCard, _super);
    function StatisticsBudgetCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatisticsBudgetCard.prototype.render = function () {
        return (<Card style={styles.card}>
                <View style={styles.wrapper}>

                    <View style={styles.imageWrapper}>
                        <Image source={require("../../images/top_up_history_icon.png")} style={styles.imageStyle} resizeMode={'contain'}/>
                    </View>

                    <View style={styles.textWrapper}>
                        <Text style={styles.textBudget}>Budget: {this.props.budget}</Text>
                        <Text style={styles.textDate}>{this.props.date}</Text>
                    </View>
                </View>
            </Card>);
    };
    return StatisticsBudgetCard;
}(Component));
export default StatisticsBudgetCard;
//# sourceMappingURL=statistics-budget-card.component.js.map