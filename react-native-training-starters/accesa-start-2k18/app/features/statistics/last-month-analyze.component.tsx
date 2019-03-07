import React, {Component} from 'react'
import {Card} from "native-base";
import {ActivityIndicator, AsyncStorage, ScrollView, View} from "react-native";
import ServiceUser, {IGetStatistic} from "../../services/ServiceUser";
import StatisticsBudgetCard from "../components/statistics-budget-card/statistics-budget-card.component";
import styles from "../view-group-details/view-group-details.component.style";


interface IState {
    statisticsData: any,
    isLoading: boolean,
    loggedInUserId: number,

}

export default class LastMonthBudgetAnalyze extends Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            loggedInUserId: 0,
            isLoading: true,
            statisticsData: [],

        }

        this.getDataFromAsyncStorage();


    }

    getLastMonthData = () => {
        ServiceUser.getUserLastMonthStatistics(this.state.loggedInUserId)
            .then(response => {

                this.setState({

                    statisticsData: response.data,
                }, () => {

                    this.setState({
                        isLoading: false,
                    })
                })
            })
            .catch(err => {
                alert(err);
            })
    };

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getLastMonthData()
                    })
                }
            })
            .catch((error) => {
                alert(error);
            })
    };

    renderOneStatisticsItem = (item: IGetStatistic, key: any) => {

        return (
            <StatisticsBudgetCard
                key={key}
                budget={item.totalSum}
                date={item.date.toString().substr(0, 10)}/>
        )
    };

    renderAllStatisticsItems = () => {
        return this.state.statisticsData.map((currentValue: IGetStatistic, key: any) => {
            return this.renderOneStatisticsItem(currentValue, key);
        }).reverse();
    }

    render() {
        if (this.state.isLoading == false) {
            return (
                <View style={{flex: 1}}>
                    <ScrollView>
                        {this.renderAllStatisticsItems()}
                    </ScrollView>
                </View>
            )
        }
        else {
            return (
                <View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>)
        }
    }
}