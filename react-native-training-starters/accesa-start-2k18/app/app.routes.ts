import App from "./App";

export enum AppRoutes {

    home = 'home',
    login = 'login',
    register = 'register',
    top_up = 'top_up',
    viewfriends='viewfriends',
    view_accounts_to_transfer_money='view_accounts_to_transfer_money',
    view_friends_to_transfer_money='view_friends_to_transfer_money',
    transfer_money='transfer_money',
    search_friends='search_friends',
    view_groups='view_groups',
    group_details='group_details',
    view_accounts='view_accounts',
    view_friends_to_add_to_group="view_friends_to_add_to_group",
    view_friends_to_chat='view_friends_to_chat',
    chat='chat',
    history='history',
    view_bills='view_bills',
    view_deposits='view_deposits',
    logout='logout',
    view_friends_to_add_to_bill='view_friends_to_add_to_bill',
    view_members_of_bill='view_members_of_bill',
    budget_analyzer='budget_analyzer',
    debts="debts",

}

export const AppRouteTitles = {

    [AppRoutes.home]: 'Home',
    [AppRoutes.login]: "Login",
    [AppRoutes.register]: 'Register',
    [AppRoutes.top_up]: 'Top Up Account',
    [AppRoutes.viewfriends]:'View friends',
    [AppRoutes.view_accounts_to_transfer_money]:"Transfer money",
    [AppRoutes.search_friends]:"Search new friends",
    [AppRoutes.transfer_money]:"Transfer",
    [AppRoutes.view_friends_to_transfer_money]:"",
    [AppRoutes.view_groups]:"View groups",
    [AppRoutes.group_details]:"Group Details",
    [AppRoutes.view_accounts]:"View Accounts",
    [AppRoutes.view_friends_to_add_to_group]:"",
    [AppRoutes.chat]:"Chat with your friends...",
    [AppRoutes.view_friends_to_chat]:"Chat with friends",
    [AppRoutes.history]:"history",
    [AppRoutes.view_bills]:"View Bills",
    [AppRoutes.view_friends_to_add_to_bill]:"View friends to add to bill",
    [AppRoutes.view_members_of_bill]:"View members of bill",
    [AppRoutes.budget_analyzer]:"Budget analyzer",
    [AppRoutes.view_deposits]:"Deposit Money",
    [AppRoutes.logout]:"Logout",
    [AppRoutes.debts]:"Debts",


};
