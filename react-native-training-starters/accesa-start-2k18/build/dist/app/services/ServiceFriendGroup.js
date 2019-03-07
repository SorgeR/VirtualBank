import ConstantsHolder from "./ConstantsHolder";
var ServiceFriendGroup = /** @class */ (function () {
    function ServiceFriendGroup() {
    }
    ServiceFriendGroup.addMemberInGroup = function (memberId, groupId) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriendGroup.baseUrlFriends + "/members/" + groupId + "/" + memberId, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops we got a problem!");
            })
                .then(function (responseJson) {
                var user = responseJson;
                resolve(user);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceFriendGroup.baseUrlFriends = "http://" + ConstantsHolder.IP_PORT + "/api/friendgroups";
    ServiceFriendGroup.getGroupsOfUser = function (idUser) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriendGroup.baseUrlFriends + "/user/" + idUser)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops! we have a problem!");
            })
                .then(function (response) {
                var groups = { data: response };
                resolve(groups);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceFriendGroup.createGroup = function (groupName, adminId) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriendGroup.baseUrlFriends, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": groupName,
                    "adminId": adminId,
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops! We have a problem!");
            })
                .then(function (responseJson) {
                var friendGroup = responseJson;
                resolve(friendGroup);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceFriendGroup.getFriendGroupById = function (groupId) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriendGroup.baseUrlFriends + "/" + groupId)
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops we have an error!");
            })
                .then(function (responseJson) {
                var friendGroup = responseJson;
                resolve(friendGroup);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceFriendGroup.updateFriendGroupName = function (groupId, modifierId, newGroupName) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriendGroup.baseUrlFriends, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": groupId,
                    "modifierId": modifierId,
                    "name": newGroupName
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops something went wrong!");
            })
                .then(function (responseJson) {
                var friendGroup = responseJson;
                resolve(friendGroup);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceFriendGroup.getMembersOfGroup = function (idGroup) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriendGroup.baseUrlFriends + "/members/" + idGroup)
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops we have a problem!");
            })
                .then(function (responseJson) {
                var members = { data: responseJson };
                resolve(members);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceFriendGroup.deleteGroupMember = function (membershipId) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriendGroup.baseUrlFriends + "/members/" + membershipId, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops we got a problem!");
            })
                .then(function (responseJson) {
                var user = responseJson;
                resolve(user);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceFriendGroup.getFriendsWhichAreNotInGroup = function (userId, groupId) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriendGroup.baseUrlFriends + "/nonmembers/" + userId + "/" + groupId)
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops we have an error!");
            })
                .then(function (responseJson) {
                var friendGroup = { data: responseJson };
                resolve(friendGroup);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceFriendGroup.deleteGroup = function (groupId) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriendGroup.baseUrlFriends + "/" + groupId, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops we got a problem!");
            })
                .then(function (responseJson) {
                var group = responseJson;
                resolve(group);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return ServiceFriendGroup;
}());
export default ServiceFriendGroup;
//# sourceMappingURL=ServiceFriendGroup.js.map