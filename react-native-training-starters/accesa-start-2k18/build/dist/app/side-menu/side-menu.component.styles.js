import { StyleSheet } from 'react-native';
import { Header } from 'react-navigation';
var sideMenuStyles = StyleSheet.create({
    activeMenuItem: {
        backgroundColor: 'lightblue'
    },
    container: {
        flex: 1
    },
    drawerItem: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: 'lightgray',
        padding: 0
    },
    firstDrawerItem: {
        borderTopWidth: 1
    },
    menuHeader: {
        height: Header.HEIGHT,
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10
    },
    menuHeaderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0099BB'
    },
    navItemLabel: {
        padding: 10
    },
    home: {
        color: '#0099BB'
    }
});
export default sideMenuStyles;
//# sourceMappingURL=side-menu.component.styles.js.map