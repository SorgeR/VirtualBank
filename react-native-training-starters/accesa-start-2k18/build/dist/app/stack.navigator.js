var _a;
import { Icon } from "native-base";
import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { AppRoutes, AppRouteTitles } from './app.routes';
import HomeComponent from './features/home/home.component';
import LoginComponent from './features/login/login.component';
import RegisterComponent from './features/register/register.component';
import ViewAccountsToTopupComponent from './features/view-accounts-to-topup/view-accounts-to-topup.component';
import ViewFriendsComponent from "./features/view-friends/view-friends.component";
import ViewAccountsToTransferMoney from "./features/view-accounts-to-transfer/view-accounts-to-transfer.component";
import ViewFriendsToTransferComponent from "./features/view-friends-to-transfer/view-friends-to-transfer.component";
import TransferMoneyComponent from "./features/transfer-money/transfer-money.component";
import SearchFriendsComponent from "./features/search-friends/SearchFriends.component";
import ViewGroupsComponent from "./features/view-groups/view-groups.component";
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
var styles = StyleSheet.create({
    menuIcon: {
        marginLeft: 10
    }
});
var renderNavigationOptionFor = function (route, navigation) { return ({
    title: AppRouteTitles[route],
    headerLeft: (<TouchableOpacity onPress={function () { return navigation.openDrawer(); }} style={styles.menuIcon}>
            <Icon name="menu"/>
        </TouchableOpacity>)
}); };
export var stackNavigator = StackNavigator((_a = {},
    _a[AppRoutes.home] = {
        screen: HomeComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.home, navigation);
        }
    },
    _a[AppRoutes.login] = {
        screen: LoginComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.login, navigation);
        }
    },
    _a[AppRoutes.register] = {
        screen: RegisterComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.register, navigation);
        }
    },
    _a[AppRoutes.top_up] = {
        screen: ViewAccountsToTopupComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.top_up, navigation);
        }
    },
    _a[AppRoutes.viewfriends] = {
        screen: ViewFriendsComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.viewfriends, navigation);
        }
    },
    _a[AppRoutes.view_accounts_to_transfer_money] = {
        screen: ViewAccountsToTransferMoney,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_accounts_to_transfer_money, navigation);
        }
    },
    _a[AppRoutes.view_friends_to_transfer_money] = {
        screen: ViewFriendsToTransferComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_friends_to_transfer_money, navigation);
        }
    },
    _a[AppRoutes.transfer_money] = {
        screen: TransferMoneyComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_friends_to_transfer_money, navigation);
        }
    },
    _a[AppRoutes.search_friends] = {
        screen: SearchFriendsComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.search_friends, navigation);
        }
    },
    _a[AppRoutes.view_groups] = {
        screen: ViewGroupsComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_groups, navigation);
        }
    },
    _a[AppRoutes.group_details] = {
        screen: ViewGroupDetailsComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.group_details, navigation);
        }
    },
    _a[AppRoutes.logout] = {
        screen: LoginComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.login, navigation);
        }
    },
    _a[AppRoutes.view_accounts] = {
        screen: ViewAccountsComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_accounts, navigation);
        }
    },
    _a[AppRoutes.view_friends_to_add_to_group] = {
        screen: ViewFriendsToAddToGroupComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_friends_to_add_to_group, navigation);
        }
    },
    _a[AppRoutes.chat] = {
        screen: ConversationComponent,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.chat, navigation);
        }
    },
    _a[AppRoutes.view_friends_to_chat] = {
        screen: ViewFriendsToChat,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_friends_to_chat, navigation);
        }
    },
    _a[AppRoutes.history] = {
        screen: History,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.history, navigation);
        }
    },
    _a[AppRoutes.view_bills] = {
        screen: Bills,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_bills, navigation);
        }
    },
    _a[AppRoutes.view_friends_to_add_to_bill] = {
        screen: ViewFriendsToAddToBill,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_friends_to_add_to_bill, navigation);
        }
    },
    _a[AppRoutes.view_members_of_bill] = {
        screen: ViewMembersOfBill,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_members_of_bill, navigation);
        }
    },
    _a[AppRoutes.debts] = {
        screen: ViewDebts,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.debts, navigation);
        }
    },
    _a[AppRoutes.budget_analyzer] = {
        screen: BudgetAnalyzer,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.budget_analyzer, navigation);
        }
    },
    _a[AppRoutes.view_deposits] = {
        screen: DepositMoney,
        navigationOptions: function (_a) {
            var navigation = _a.navigation;
            return renderNavigationOptionFor(AppRoutes.view_deposits, navigation);
        }
    },
    _a), {
    initialRouteName: AppRoutes.login
});
//# sourceMappingURL=stack.navigator.js.map