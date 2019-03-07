import React, {Component} from 'react'
import PureChart from 'react-native-pure-chart';
import {AsyncStorage, View, Text, ActivityIndicator} from "react-native";
import {Tab, Tabs} from "native-base";
import ServiceUser, {IGetStatistic} from "../../services/ServiceUser";
import LastWeekBudgetAnalyze from "./last-week-budget-analyze.component";
import styles from "../view-group-details/view-group-details.component.style";
import LastMonthBudgetAnalyze from "./last-month-analyze.component";

interface IState {
    statisticsData: any,
    loggedInUserId: number,
    isLoading: boolean,
    graphIsLoading:boolean,
}

export default class BudgetAnalyzeComponent extends Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            statisticsData: [],
            loggedInUserId: 0,
            isLoading: true,
            graphIsLoading:true,
        }
        this.getDataFromAsyncStorage();
    }


    getLastWeekData = () => {
        ServiceUser.getUserLastWeekStatistics(this.state.loggedInUserId)
            .then(response => {

                this.setState({

                    statisticsData: response.data,
                }, () => {
                    this.translateDataForGraph();

                    this.setState({
                        isLoading: false,
                        graphIsLoading:false,
                    })
                })
            })
            .catch(err => {
                alert(err);
            })
    };

    getLastMonthData = () => {
        ServiceUser.getUserLastMonthStatistics(this.state.loggedInUserId)
            .then(response => {

                this.setState({

                    statisticsData: response.data,
                }, () => {
                    this.translateDataForGraph();

                    this.setState({
                        isLoading: false,
                        graphIsLoading:false,
                    })
                })
            })
            .catch(err => {
                alert(err);
            })
    };

    translateOneDate = (oneDate: IGetStatistic) => {

        return {x: oneDate.date.toString().substr(0, 10), y: oneDate.totalSum};
    }

    translateDataForGraph = () => {
        var data: any = [];
        this.state.statisticsData.forEach((value: IGetStatistic, index: number, arr: any) => {
            data.push(this.translateOneDate(value));
        });
        return data;
    }

    renderPureChart = () => {

        if(this.state.graphIsLoading==false) {
            return (

                <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width: '90%', alignItems: 'center', justifyContent: 'center'}}>
                        <PureChart
                            data={this.translateDataForGraph()}
                            type='line'
                            height={160}
                            gap={50}
                            showEvenNumberXaxisLabel={true}
                            numberOfYAxisGuideLine={0}
                            width={'100%'}
                            customValueRenderer={(index: any, point: any) => {

                                return (
                                    <Text style={{textAlign: 'center', fontSize: 10, color: 'green'}}>{point.y}</Text>

                                )
                            }}
                        />
                    </View>
                </View>)
        }
        else{
            return (
                <View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>)
        }
    };

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getLastWeekData();
                    })
                }
            })
            .catch((error) => {
                alert(error);
            })
    };


    render() {

        if (this.state.isLoading == false) {
            return (
                <View style={{flex: 1}}>

                    {this.renderPureChart()}

                    <View style={{flex: 1.3}}>

                        <Tabs
                            initialPage={0}
                            tabBarUnderlineStyle={{backgroundColor: "#1B87E6"}}
                            onChangeTab={(index:any)=>{

                                if(index.i==0)
                                {
                                    this.setState({
                                        graphIsLoading:true,
                                    },()=>
                                    {
                                        this.getLastWeekData();
                                    })
                                }
                                if(index.i==1){

                                    this.setState({
                                        graphIsLoading:true,
                                    },()=> {
                                        this.getLastMonthData();
                                    })
                                }
                            }}

                        >
                            <Tab heading="Last Week" tabStyle={{backgroundColor: 'white'}}
                                 activeTabStyle={{backgroundColor: "#3698f0",}}
                                 textStyle={{color: "#3698f0"}}
                            >
                                <LastWeekBudgetAnalyze

                                />
                            </Tab>
                            <Tab heading="Last Month" tabStyle={{backgroundColor: 'white'}}
                                 activeTabStyle={{backgroundColor: "#3698f0",}}
                                 textStyle={{color: "#3698f0"}}

                            >
                                <LastMonthBudgetAnalyze

                                />
                            </Tab>


                        </Tabs>
                    </View>
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