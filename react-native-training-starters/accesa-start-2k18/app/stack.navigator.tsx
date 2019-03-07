import {Icon} from "native-base";
import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {AppRoutes, AppRouteTitles} from './app.routes';
import HomeComponent from './features/home/home.component';
import LoginComponent from './features/login/login.component';
import RegisterComponent from './features/register/register.component';
import ViewAccountsToTopupComponent from './features/view-accounts-to-topup/view-accounts-to-topup.component';
import ViewFriendsComponent from "./features/view-friends/view-friends.component";
import ViewAccountsToTransferMoney from "./features/view-accounts-to-transfer/view-accounts-to-transfer.component";
import ViewFriendsToTransferComponent from "./features/view-friends-to-transfer/view-friends-to-transfer.component";
import TransferMoneyComponent from "./features/transfer-money/transfer-money.component";
import SearchFriendsComponent from "./features/search-friends/SearchFriends.component";
import ViewGroupsComponent from "./features/view-groups/view-groups.component"
import ViewGroupDetailsComponent from "./features/view-group-details/view-group-details.component";
import ViewAccountsComponent from "./features/view-accounts/view-accounts.component";
import ViewFriendsToAddToGroupComponent from "./features/view-friends-to-add-to-group/view-friends-to-add-to-group.component";
import ConversationComponent from "./features/conversation/conversation.component";
import ViewFriendsToChat from "./features/view-friends-to-chat/view-friends-to-chat.component";
import History from "./features/operations-history/operation-history.component";
import Bills from "./features/bill/view-bills.component";
import ViewFriendsToAddToBill from "./features/view-friends-to-add-to-bill/view-friends-to-add-to-bill.component";
import ViewMembersOfBill from "./features/view-bill-members-details/view-bill-members-details.component";
import ViewDebts from "./features/debts/debts.component";
import BudgetAnalyzer from "./features/statistics/budget-analyze.component";
import DepositMoney from "./features/deposits/deposits.component";


const styles = StyleSheet.create({
    menuIcon: {
        marginLeft: 10
    }
});

const renderNavigationOptionFor = (route: keyof typeof AppRoutes, navigation: any) => ({
    title: AppRouteTitles[route],
    headerLeft: (
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuIcon}>
            <Icon name="menu"/>
        </TouchableOpacity>
    )
});

export const stackNavigator = StackNavigator({

    [AppRoutes.home]: {
        screen: HomeComponent,
        navigationOptions: ({navigation}: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.home, navigation)
    },

    [AppRoutes.login]: {
        screen: LoginComponent,
        navigationOptions: ({navigation}: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.login, navigation)
    },

    [AppRoutes.register]: {
        screen: RegisterComponent,
        navigationOptions: ({navigation}: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.register, navigation)
    },
    [AppRoutes.top_up]: {
        screen: ViewAccountsToTopupComponent,
        navigationOptions: ({navigation}: { navigation: any }) =>
            renderNavigationOptionFor(AppRoutes.top_up, navigation)
    },


    [AppRoutes.viewfriends]: {
        screen: ViewFriendsComponent,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.viewfriends, navigation)

    },

    [AppRoutes.view_accounts_to_transfer_money]: {
        screen: ViewAccountsToTransferMoney,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_accounts_to_transfer_money, navigation)

    },

    [AppRoutes.view_friends_to_transfer_money]: {
        screen: ViewFriendsToTransferComponent,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_friends_to_transfer_money, navigation)

    },

    [AppRoutes.transfer_money]: {
        screen: TransferMoneyComponent,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_friends_to_transfer_money, navigation)

    },

    [AppRoutes.search_friends]: {
        screen: SearchFriendsComponent,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.search_friends, navigation)

    },

    [AppRoutes.view_groups]: {
        screen: ViewGroupsComponent,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_groups, navigation)

    },

    [AppRoutes.group_details]: {
        screen: ViewGroupDetailsComponent,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.group_details, navigation)

    },


    [AppRoutes.logout]: {
        screen: LoginComponent,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.login, navigation)

    },

    [AppRoutes.view_accounts]: {
        screen: ViewAccountsComponent,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_accounts, navigation)

    },

    [AppRoutes.view_friends_to_add_to_group]: {
        screen: ViewFriendsToAddToGroupComponent,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_friends_to_add_to_group, navigation)

    },

    [AppRoutes.chat]: {
        screen: ConversationComponent,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.chat, navigation)

    },

    [AppRoutes.view_friends_to_chat]: {
        screen: ViewFriendsToChat,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_friends_to_chat, navigation)

    },


    [AppRoutes.history]: {
        screen: History,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.history, navigation)

    },

    [AppRoutes.view_bills]: {
        screen: Bills,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_bills, navigation)

    },

    [AppRoutes.view_friends_to_add_to_bill]: {
        screen: ViewFriendsToAddToBill,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_friends_to_add_to_bill, navigation)

    },

    [AppRoutes.view_members_of_bill]: {
        screen: ViewMembersOfBill,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_members_of_bill, navigation)

    },

    [AppRoutes.debts]: {
        screen: ViewDebts,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.debts, navigation)

    },

    [AppRoutes.budget_analyzer]: {
        screen: BudgetAnalyzer,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.budget_analyzer, navigation)

    },

    [AppRoutes.view_deposits]: {
        screen: DepositMoney,
        navigationOptions: ({navigation}: { navigation: any }) => renderNavigationOptionFor(AppRoutes.view_deposits, navigation)

    },





}, {
    initialRouteName: AppRoutes.login
});