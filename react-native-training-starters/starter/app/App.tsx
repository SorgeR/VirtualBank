import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const listItemsToDisplay: string[] = [
    'It’s a magnetic world.',
    'The Earth’s a magnetic place.',
    'Everywhere, all around, you’ll find magnets.',
    'In computers and t.v sets',
    'and microphones,',
    'They even hold doors closed around your home.',
    '',
    'Every magnet has a north pole,',
    'A south pole too.',
    'Each pole has its own molecules.',
    'They create a force,',
    'A magnetic field,',
    'That attracts metals like iron and steel.',
    '',
    'Magnets, many sizes and shapes',
    'Horseshoes, bars and cylinders',
    'Magnetic discs large and small',
    'Magnets working for us all.',
    '',
    'It’s a magnetic world.',
    'The Earth’s a magnetic place.',
    'Put two magnets together, what can you tell?',
    'North and south poles will attract',
    'And like poles together will repel.',
    '',
    'Every magnetic field if it’s strong enough',
    'Can pass through paper, wood or plastic.',
    'You can make a magnet with electricity',
    'And it’s very strong, you will see.',
    '',
    'Magnets, many sizes and shapes',
    'Horseshoes, bars and cylinders',
    'Magnetic discs large and small',
    'Magnets working for us all.',
    '',
    'It’s a magnetic world.',
    'The Earth’s a magnetic place.',
    'Everywhere, all around, you’ll find magnets.',
];

export default class App extends React.Component<{}> {
    public render() {
        return (
            <View style={styles.container}>
                <Text>Please render the listItemsToDisplay list in a FlatList.</Text>
                <Text>Make it look like the one in GOAL.jpg</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
