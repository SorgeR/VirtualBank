import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ScrollView, View, Button } from "react-native";
import ViewGroupsCard from "../components/ViewGroupsCard/ViewGroupsCard.component";
import Dialog from "react-native-popup-dialog";
import NewGroupDialog from "../components/NewGroupDialog/NewGroupDialog";
var ViewGroupsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewGroupsComponent, _super);
    function ViewGroupsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.disableDialog = function () {
            _this.setState({
                isVisible: false,
            });
        };
        _this.enableDialog = function () {
            _this.setState({
                isVisible: true,
            });
        };
        _this.state = {
            active: false,
            isVisible: false,
        };
        return _this;
    }
    ViewGroupsComponent.prototype.render = function () {
        var _this = this;
        return (<View style={{ flex: 1 }}>
            <ScrollView>
                <Dialog width={300} height={300} visible={this.state.isVisible} children={<NewGroupDialog actionOnAddPress={function () { }} actionOnCancelPress={this.disableDialog}/>}/>


                <ViewGroupsCard name={"Plati facturi"} createDate={"02/05/98"} OnButtonTap={function () { }}/>
                <ViewGroupsCard name={"Plati facturi"} createDate={"02/05/98"} OnButtonTap={function () { }}/>
                <ViewGroupsCard name={"Plati facturi"} createDate={"02/05/98"} OnButtonTap={function () { }}/>
                <ViewGroupsCard name={"Plati facturi"} createDate={"02/05/98"} OnButtonTap={function () { }}/>
                <ViewGroupsCard name={"Plati facturi"} createDate={"02/05/98"} OnButtonTap={function () { }}/>
            </ScrollView>
                <Button onPress={function () { _this.enableDialog(); }} title={"Add new group"}/>
            </View>);
    };
    return ViewGroupsComponent;
}(Component));
export default ViewGroupsComponent;
//# sourceMappingURL=ViewGroups.component.js.map