import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './stores';

import AddUserComponent from './users/components/AddUserComponent';
import UsersListComponent from './users/components/UsersListComponent';

const RootNavigationStack = createStackNavigator({
    AddUser: AddUserComponent,
    UsersList: UsersListComponent
}, {
    initialRouteName: 'UsersList'
});

export default class App extends React.Component<{}> {
    render() {
        return (
            <Provider store={store}>
                <RootNavigationStack/>
            </Provider>
        );
    }
}