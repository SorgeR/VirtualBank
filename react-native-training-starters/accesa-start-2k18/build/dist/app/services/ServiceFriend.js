import ConstantsHolder from "./ConstantsHolder";
var ServiceFriend = /** @class */ (function () {
    function ServiceFriend() {
    }
    ServiceFriend.baseUrl = "http://" + ConstantsHolder.IP_PORT + "/api/friends";
    ServiceFriend.deleteFriendFromAPI = function (idFriendship) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriend.baseUrl + "/" + idFriendship, {
                method: 'delete'
            })
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Failed to load data!");
            })
                .then(function (responseJson) {
                var friend = responseJson;
                resolve(friend);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceFriend.saveFriendship = function (idRequester, idAccepter) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceFriend.baseUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userRequesterId": idRequester,
                    "userAccepterId": idAccepter,
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops!Something went wrong!");
            })
                .then(function (response) {
                var friendship = response;
                resolve(friendship);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return ServiceFriend;
}());
export default ServiceFriend;
//# sourceMappingURL=ServiceFriend.js.map