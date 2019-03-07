import React, { Component } from 'react';
import {View, Text, Image, ImageBackground, TouchableOpacity, Animated, Easing, AsyncStorage} from 'react-native';
import styles from './home.component.styles';
import {AppRoutes} from "../../app.routes";
import ServiceUser from "../../services/ServiceUser";

interface IState {
    yValue:any,
    buttonsFade:any,
    loggedInUserId:number,
    budget:number,
    isLoading:boolean,
}

export default class HomeComponent extends Component<any,IState> {

    constructor(props:any){
        super(props);
        this.state={
            yValue:new Animated.Value(0),
            buttonsFade:new Animated.Value(0),
            loggedInUserId:0,
            isLoading:true,
            budget:0,

        };

        this.props.navigation.addListener('willFocus', () => {

            this._animateImage();
            this._fadeInButtons();
            this.getDataFromAsyncStorage();
        })

    }

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getBudgetFromAPI();
                    })
                }
            })
            .catch((error) => {
                alert('error')
            })

    };

    getBudgetFromAPI=()=>{
        ServiceUser.getTotalBudgetOfUser(this.state.loggedInUserId)
            .then(response=>{
                this.setState({
                    budget:response.budget
                },()=>{
                    this.setState({
                        isLoading:false,
                    })
                })
            })
            .catch(error=>{
                alert(error);
            })
    }

    _animateImage=()=>{
        Animated.timing(this.state.yValue,{
            toValue:380,
            duration:1500,
            easing:Easing.bounce
        }).start();
    };

    _fadeInButtons=()=>{
        Animated.timing(this.state.buttonsFade,{
            toValue:1,
            duration:3000,
        }).start();
    };

    renderBudgetText=()=>{
        if(this.state.isLoading==false) {
            return (
                <Text style={styles.budgetText}>{this.state.budget} RON</Text>
            )
        }
        else{
            return null;
        }
}
    render() {

        return (


            <View style={styles.container}>
                <View style={styles.topContainer}>
                <Animated.View style={{height:this.state.yValue}}>
                    <ImageBackground style={styles.imageBackground} source={require("../images/home_background.jpg")}>

                        <View style={styles.budgetTextWrapper}>
                            {this.renderBudgetText()}

                        </View>
                    </ImageBackground>
                </Animated.View>



                </View>


                <View style={styles.bottomContainer}>

                    <View style={styles.bottomButtonsHorizontalWrapper}>

                        <Animated.View style={[styles.buttonWrapper,{opacity:this.state.buttonsFade}]}>
                            <TouchableOpacity
                                onPress={()=>{
                                    this.props.navigation.navigate(AppRoutes.budget_analyzer);
                                }}>
                                <Image source={require("../images/analysis_icon.png")}
                                       style={styles.buttonStyle}/>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.buttonWrapper,{opacity:this.state.buttonsFade}]}>
                            <TouchableOpacity
                                onPress={()=>{this.props.navigation.navigate(AppRoutes.history)}}
                            >
                                <Image source={require("../images/history_icon.png")}
                                       style={styles.buttonStyle}/>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.buttonWrapper,{opacity:this.state.buttonsFade}]}>
                            <TouchableOpacity
                                onPress={()=>{this.props.navigation.navigate(AppRoutes.debts)}}
                            >
                                <Image source={require("../images/liability_icon.png")}
                                       style={styles.buttonStyle}
                                />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </View>
        );
    }
}