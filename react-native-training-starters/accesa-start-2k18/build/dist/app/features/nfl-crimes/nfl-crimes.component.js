import * as tslib_1 from "tslib";
import { List, ListItem, Tab, Tabs } from "native-base";
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './nfl-crimes.component.styles';
var NflCrimesTabs;
(function (NflCrimesTabs) {
    NflCrimesTabs["byTeam"] = "byTeam";
    NflCrimesTabs["byPosition"] = "byPosition";
    NflCrimesTabs["byPlayer"] = "byPlayer";
})(NflCrimesTabs || (NflCrimesTabs = {}));
var NflCrimesComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NflCrimesComponent, _super);
    function NflCrimesComponent(props) {
        var _a;
        var _this = _super.call(this, props) || this;
        _this.getCrimesByTeam = function () {
            // TODO: check reference https://facebook.github.io/react-native/docs/network
            return fetch('http://nflarrest.com/api/v1/crime/topTeams/DUI')
                .then(function (response) { return response.json(); });
        };
        _this.getCrimesByPosition = function () {
            // TODO: check reference https://facebook.github.io/react-native/docs/network
            return fetch('http://nflarrest.com/api/v1/crime/topPositions/DUI')
                .then(function (response) { return response.json(); });
        };
        _this.getCrimesByPlayer = function () {
            // TODO: check reference https://facebook.github.io/react-native/docs/network
            return fetch('http://nflarrest.com/api/v1/crime/topPlayers/DUI')
                .then(function (response) { return response.json(); });
        };
        _this.renderByTeamTabContent = function (_a) {
            var teamName = _a.Team_name, teamCity = _a.Team_city, arrestCount = _a.arrest_count;
            return (<ListItem style={styles.listItem}>
            <Text style={styles.listItemLabel}>{teamCity} {teamName} ({arrestCount})</Text>
        </ListItem>);
        };
        _this.renderByPositionTabContent = function (_a) {
            var position = _a.Position, arrestCount = _a.arrest_count;
            return (<ListItem>
            <Text>{position} ({arrestCount})</Text>
        </ListItem>);
        };
        _this.renderByPlayerTabContent = function (_a) {
            var name = _a.Name, arrestCount = _a.arrest_count;
            return (<ListItem>
            <Text>{name} ({arrestCount})</Text>
        </ListItem>);
        };
        _this.renderTab = function (tab) {
            var content;
            var listRenderer;
            switch (tab.key) {
                case NflCrimesTabs.byTeam:
                    listRenderer = _this.renderByTeamTabContent;
                    break;
                case NflCrimesTabs.byPosition:
                    listRenderer = _this.renderByPositionTabContent;
                    break;
                case NflCrimesTabs.byPlayer:
                    listRenderer = _this.renderByPlayerTabContent;
                    break;
            }
            content = (<List dataArray={tab.list} renderRow={listRenderer}/>);
            return (<Tab key={tab.key} heading={tab.title}>
                {content}
            </Tab>);
        };
        _this.renderError = function (error) { return (<Text style={styles.error}>{error}</Text>); };
        _this.renderTabs = function (tabs) { return (<Tabs>
            {Object.keys(tabs).map(function (key) {
            return _this.renderTab(tabs[key]);
        })}
        </Tabs>); };
        _this.renderContent = function () {
            var _a = _this.state, error = _a.error, tabs = _a.tabs;
            if (error) {
                return _this.renderError(error);
            }
            return _this.renderTabs(tabs);
        };
        _this.state = {
            tabs: (_a = {},
                _a[NflCrimesTabs.byTeam] = {
                    key: NflCrimesTabs.byTeam,
                    title: 'By Team',
                    list: []
                },
                _a[NflCrimesTabs.byPosition] = {
                    key: NflCrimesTabs.byPosition,
                    title: 'By Position',
                    list: []
                },
                _a[NflCrimesTabs.byPlayer] = {
                    key: NflCrimesTabs.byPlayer,
                    title: 'By Player',
                    list: []
                },
                _a)
        };
        return _this;
    }
    NflCrimesComponent.prototype.componentWillMount = function () {
        var _this = this;
        Promise
            .all([
            this.getCrimesByTeam(),
            this.getCrimesByPosition(),
            this.getCrimesByPlayer()
        ])
            .then(function (results) {
            var tabs = _this.state.tabs;
            tabs.byTeam.list = results[0];
            tabs.byPosition.list = results[1];
            tabs.byPlayer.list = results[2];
            _this.setState({ tabs: tabs, error: undefined });
        })
            .catch(function () {
            var error = 'Failed to load one of the resources.';
            _this.setState({ error: error });
        });
    };
    NflCrimesComponent.prototype.render = function () {
        return (<View style={styles.wrapper}>
                {this.renderContent()}
            </View>);
    };
    return NflCrimesComponent;
}(Component));
export default NflCrimesComponent;
//# sourceMappingURL=nfl-crimes.component.js.map