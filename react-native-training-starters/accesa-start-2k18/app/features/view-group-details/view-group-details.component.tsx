import React, {Component} from 'react'
import {
    View,
    Image,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    AsyncStorage, ToastAndroid
} from "react-native";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import ServiceFriendGroup from "../../services/ServiceFriendGroup";
import styles from "./view-group-details.component.style"
import {IGetUser} from "../../services/ServiceUser";
import {AppRoutes} from "../../app.routes";


interface IViewGroupDetailsComponentState {
    groupId: number,
    isLoading: boolean,
    newGroupName: string,
    group?: any,
    groupMembers?: any,
    loggedInUserId: number,
}

export default class ViewGroupDetailsComponent extends Component<any, IViewGroupDetailsComponentState> {

    constructor(props: any) {
        super(props)
        this.state = {
            groupId: this.props.navigation.getParam('groupID', 'default'),
            isLoading: true,
            newGroupName: "",
            loggedInUserId: -1,
        }

        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            this.getDataFromAsyncStorage()
        })

    }

    navigateToAddFriendToGroup = () => {
        this.props.navigation.navigate(AppRoutes.view_friends_to_add_to_group, {'groupID': this.state.groupId.toString()})
    }

    navigateToViewGroups = () => {
        this.props.navigation.navigate(AppRoutes.view_groups)

    }

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getGroupDataFromAPI()
                    })
                }
            })
            .catch((error) => {
                alert('error')
            })
    }

    getGroupDataFromAPI = () => {
        ServiceFriendGroup.getFriendGroupById(this.state.groupId)
            .then((response) => {
                this.setState({
                        group: response
                    },
                    () => {
                        this.getMembersOfGroupFromAPI()

                    }
                )
            })
            .catch(error => {
                alert(error);
            })
    }

    getMembersOfGroupFromAPI = () => {
        ServiceFriendGroup.getMembersOfGroup(this.state.groupId)
            .then((response) => {
                this.setState({
                    groupMembers: response.data
                }, () => this.setState({
                        isLoading: false,
                    }, () => {
                        this.setState({
                            newGroupName: this.state.group.name
                        })
                    }
                ))
            })
            .catch(error => {
                alert(error)
            })
    }

    updateGroupNameInAPI = () => {
        if(this.state.newGroupName!="") {
            ServiceFriendGroup.updateFriendGroupName(this.state.groupId, this.state.loggedInUserId, this.state.newGroupName)
                .then((response) => {
                    ToastAndroid.show("The group name was modified!", ToastAndroid.SHORT);

                })
                .catch(error => {
                    alert(error)
                })
        }
        else{
            alert("The name of the group can not be empty!");
        }
    }

    renderUpdateButton() {
        if (this.state.group.adminId == this.state.loggedInUserId) {
            return (
                <View style={styles.groupNameUpdateWrapper}>
                    <View style={styles.groupNameWrapper}>
                        <TextInput style={styles.textGroupName}
                                   onChangeText={(text) => this.setState({
                                       newGroupName: text,
                                   })}>{this.state.group.name}</TextInput>
                    </View>
                    <View style={styles.updateWrapper}>
                        <TouchableOpacity
                            onPress={() => {
                                this.updateGroupNameInAPI()
                            }}>
                            <Image source={require("../images/update_image.png")}
                                   style={styles.updateImage}
                            />
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }

        else {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 20,
                        width: 200,
                        fontFamily: "Montserrat-ExtraBold"
                    }}>{this.state.group.name}</Text>
                </View>
            )
        }
    }

    deleteGroupMemberFromAPI = (memberId: number) => {
        ServiceFriendGroup.deleteGroupMember(memberId)
            .then(response => {

                ToastAndroid.show("Successfully deleted the member!", ToastAndroid.SHORT);
                this.getMembersOfGroupFromAPI()
            })
            .catch(error => {
                alert(error)
            })
    }

    renderGroupMemberItem = (member:any, key: any) => {

        if (this.state.group.adminId == this.state.loggedInUserId && member.userId != this.state.group.adminId) {
            return (
                <ViewFriendsCard
                    key={key}
                    phoneNumber={member.phoneNumber}
                    firstName={member.firstName}
                    lastName={member.lastName}
                    ImagePath={require("../images/friends_icon.png")}
                    OnPressRightButton={this.deleteGroupMemberFromAPI}
                    RightButtonParameter={member.membershipId}
                    rightButtonColor={"white"}
                    RightButtonImagePath={require("../images/delete_friend.png")}
                    RightButtonImageHeight={'50%'}
                    RightButtonImageWidth={"50%"}
                />
            )
        }

        else {
            return (
                <ViewFriendsCard
                    key={key}
                    ImagePath={require("../images/friends_icon.png")}
                    phoneNumber={member.phoneNumber}
                    firstName={member.firstName}
                    lastName={member.lastName}
                    OnPressRightButton={() => {
                    }}
                    rightButtonColor={"white"}
                />

            )

        }

    }

    renderGroupMembersList = () => {

        var list = this.state.groupMembers.map((currentValue: any, key: any) => {

            return this.renderGroupMemberItem(currentValue, key);
        })

        return list;

    }

    deleteGroupFromAPI = () => {
        ServiceFriendGroup.deleteGroup(this.state.groupId)
            .then((response) => {

                ToastAndroid.show("Successfully deleted the group!", ToastAndroid.SHORT);
                this.navigateToViewGroups()
            })
            .catch(error => {
                alert(error);
            })

    }

    renderDeleteGroupButton = () => {
        if (this.state.group.adminId == this.state.loggedInUserId) {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.deleteGroupFromAPI()
                    }}>
                    <Image source={require("../images/delete_friend.png")}
                           style={{height: 40, width: 40}}></Image>
                </TouchableOpacity>)
        }
        return null;
    }

    render() {

        if (this.state.isLoading == false) {
            return (
                <View style={styles.wrapper}>
                    <View style={styles.topComponentWrapper}>

                        <View style={styles.deleteAddWrapper}>
                            <View style={styles.addWrapper}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.navigateToAddFriendToGroup()
                                    }}>
                                    <Image source={require("../images/add_member_to_group.png")}
                                           style={styles.addImage}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.deleteWrapper}>
                                {this.renderDeleteGroupButton()}
                            </View>
                        </View>
                        {this.renderUpdateButton()}

                        <Text style={styles.numberOfMembers}>No of
                            members: {this.state.groupMembers.length}</Text>
                    </View>
                    <View style={styles.scrollerWrapper}>

                        <ScrollView
                            removeClippedSubviews={true}>

                            {this.renderGroupMembersList()}

                        </ScrollView>
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