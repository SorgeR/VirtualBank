import React, {Component} from 'react'
import {ScrollView, View, Button, AsyncStorage, ActivityIndicator, ToastAndroid} from "react-native";
import ViewGroupsCard from "../components/view-groups-card/view-groups-card.component";
import Dialog from "react-native-popup-dialog";
import NewGroupDialog from "../components/new-group-dialog/new-group-dialog.component";
import {AppRoutes} from "../../app.routes";
import ServiceFriendGroup from "../../services/ServiceFriendGroup";
import styles from "./view-groups.component.style"
import FloatingButton from "../components/floating-button/floating-button.component";

interface IGroup {
    id: number,
    name: string,
    createDate: string,
    adminId: number,
}

export default class ViewGroupsComponent extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            active: false,
            isVisible: false,
            loggedInUserId: "",
        }

        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            this.getDataFromAsyncStorage()
        })
    }

    navigateToDetails = (idGroup: number) => {
        this.props.navigation.navigate(AppRoutes.group_details, {'groupID': idGroup.toString()});
    }

    disableDialog = () => {
        this.setState({
            isVisible: false,

        })
    }

    enableDialog = () => {
        this.setState({
            isVisible: true,
        })
    }

    getGroupsFromAPI = () => {

        ServiceFriendGroup.getGroupsOfUser(this.state.loggedInUserId)
            .then(response => {
                this.setState({
                    groups: response.data
                }, () => {
                    this.setState(
                        {
                            isLoading: false,
                        })
                })
            })
            .catch(error => {
                alert(error)
            })

    }

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getGroupsFromAPI()
                    })
                }
            })
            .catch((error) => {
                alert('error')
            })
    }


    renderGroupsList = () => {

        var list = this.state.groups.map((currentValue: any, key: any) => {

            return this.renderGroupItem(currentValue, key);
        })

        return list;

    }

    renderGroupItem = (group: IGroup, key: any) => {
        return (<ViewGroupsCard
            key={key}
            idGroup={group.id}
            name={group.name}
            createDate={group.createDate.substr(0, 10)}
            OnPressRightButton={this.navigateToDetails}
            ImagePath={require("../images/details_image.png")}
            RightImageHeight={"60%"}
            RightImageWidth={"60%"}
        />)
    }

    createGroupInAPI = (groupName: string, adminID: number) => {
        if(groupName!="") {
            ServiceFriendGroup.createGroup(groupName, adminID)
                .then(response => {
                    ToastAndroid.show("Successfully added the group!", ToastAndroid.SHORT);
                    this.getGroupsFromAPI()
                    this.disableDialog()
                })
                .catch(error => {
                    alert(error);
                })
        }
        else{
            alert("Please enter a group name!")
        }
    }


    render() {
        if (this.state.isLoading == false) {
            return (

                <View style={styles.wrapper}>
                    <ScrollView
                        removeClippedSubviews={true}>
                        <Dialog
                            width={300}
                            height={300}
                            visible={this.state.isVisible}
                            children={<NewGroupDialog actionOnAddPress={this.createGroupInAPI}
                                                      actionOnCancelPress={this.disableDialog}
                                                      userId={this.state.loggedInUserId}
                            />}
                        />

                        {this.renderGroupsList()}


                    </ScrollView>

                    <FloatingButton action={this.enableDialog}/>
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