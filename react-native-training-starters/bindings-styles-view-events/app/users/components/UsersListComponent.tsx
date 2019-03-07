import React, { PureComponent } from 'react';
import { List, ListItem } from 'native-base';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { IUser } from '../models';
import { getUsers } from '../store/usersReducer';

interface IUsersListProps {
    users: IUser[];
    isLoading: boolean;
    errorMessage: string;
    getUsers: any;
    navigation: any;
}
class UsersList extends PureComponent<IUsersListProps, any> {
    static navigationOptions = {
        title: 'User List'
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers();
    }

    private goToAddUser = () => {
        this.props.navigation.navigate('AddUser');
    };

    private renderRow = ({ firstName, lastName, position }: IUser) => (
        <ListItem style={styles.listItem}>
            <Text style={[styles.label, styles.bold]}>{firstName} {lastName}</Text>
            <Text style={styles.label}>{position}</Text>
        </ListItem>
    );

    public render() {
        const { users } = this.props;

        return (
            <View>
                <Button
                    title="Add user"
                    onPress={this.goToAddUser}
                />
                <List
                    dataArray={users}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    },
    header: {
        flex: 1
    },
    label: {
        width: '100%'
    },
    listItem: {
        marginLeft: 0,
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'column'
    }
});

const mapStateToProps = ({ usersReducer }: any ) => {
    const { users, isLoading, errorMessage } = usersReducer;
    const mappedUsersById = users.map((user: IUser) => ({ key: user.id, ...user }));
    return { users: mappedUsersById, isLoading, errorMessage };
};

const mapDispatchToProps = (dispatch: any) => ({
    getUsers: () => dispatch(getUsers)
});

const UsersListComponent = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default UsersListComponent;
