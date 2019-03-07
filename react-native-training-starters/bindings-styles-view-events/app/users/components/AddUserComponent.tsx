import { Form, Icon, Item, Picker, Row } from 'native-base';
import React, { PureComponent } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { Position } from '../constants';
import { IUser } from '../models';
import { createUser } from '../store/usersReducer';

interface IAddUserProps {
    id: number;
    isLoading: boolean;
    errorMessage: string;
    createUser: any;
    navigation: any;
}

interface IAddUserState {
    firstName: string;
    lastName: string;
    position: keyof typeof Position;
}

class AddUser extends PureComponent<IAddUserProps, IAddUserState> {
    static navigationOptions = {
        title: 'Add user'
    };

    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            position: Position.developer
        };
    }

    private createUser = () => {
        const { createUser, id, navigation } = this.props;
        const user: IUser = {
            id,
            ...this.state
        };

        createUser(user);
        navigation.navigate('UsersList');
    };

    private setFirstName = (firstName: string) => {
        this.setState({ firstName });
    };

    private setLastName = (lastName: string) => {
        this.setState({ lastName });
    };

    private setPosition = (position: keyof typeof Position) => {
        this.setState({ position });
    };

    render() {
        const { firstName, lastName, position } = this.state;

        return (
            <View>
                <Text>{JSON.stringify(this.state)}</Text>
                <Form>
                    <Item style={styles.item}>
                        <Text>First name</Text>
                        <TextInput
                            style={styles.input}
                            value={firstName}
                            onChangeText={this.setFirstName}
                        />
                    </Item>

                    <Item style={styles.item}>
                        <Text>Last name</Text>
                        <TextInput
                            style={styles.input}
                            value={lastName}
                            onChangeText={this.setLastName}
                        />
                    </Item>

                    <Item style={styles.item}>
                        <Text>Position</Text>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={{ width: undefined }}
                            placeholder="Select your SIM"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={position}
                            onValueChange={this.setPosition}
                        >
                            <Picker.Item label={Position.developer} value={Position.developer} />
                            <Picker.Item label={Position.intern} value={Position.intern} />
                            <Picker.Item label={Position.manager} value={Position.manager} />
                        </Picker>
                    </Item>
                </Form>

                <Button
                    title="Add user"
                    disabled={!(firstName && lastName)}
                    onPress={this.createUser}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: '100%'
    },
    item: {
        marginLeft: 0,
        paddingLeft: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

const mapStateToProps = ({ usersReducer }: any) => {
    const { users, isLoading, errorMessage } = usersReducer;
    return { id: users.length, isLoading, errorMessage };
};

const mapDispatchToProps = (dispatch: any) => ({
    createUser: (user: IUser) => dispatch(createUser(user))
});

const AddUserComponent = connect(mapStateToProps, mapDispatchToProps)(AddUser);

export default AddUserComponent;