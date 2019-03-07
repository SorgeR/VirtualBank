import ConstantsHolder from "./ConstantsHolder";
var ServiceAccount = /** @class */ (function () {
    function ServiceAccount() {
    }
    ServiceAccount.transferMoney = function (sourceAccountId, destinationAccountId, sumToTransfer) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceAccount.baseUrl + "/transfer?sourceId=" + sourceAccountId + "&destinationId=" + destinationAccountId + "&sumToTransfer=" + sumToTransfer, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "accountSourceId": sourceAccountId,
                    "accountDestinationId": destinationAccountId,
                    "sumToTransfer": sumToTransfer,
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
                .then(function (responseJson) {
                var operation = responseJson;
                resolve(operation);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceAccount.createDeposit = function (idAccount, idUser, title, initialSum) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceAccount.baseUrl + "/deposit", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "IdAccount": idAccount,
                    "IdUser": idUser,
                    "Title": title,
                    "InitialSum": initialSum,
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
                .then(function (responseJson) {
                var deposit = responseJson;
                resolve(deposit);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceAccount.baseUrl = "http://" + ConstantsHolder.IP_PORT + "/api/accounts";
    ServiceAccount.getAccountById = function (accountId) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceAccount.baseUrl + "/search?accountId=" + accountId)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var account = responseJson;
                resolve(account);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceAccount.createAccount = function (idAdmin, currency, alias) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceAccount.baseUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userId": idAdmin,
                    "currency": currency,
                    "alias": alias
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops there was an error!");
            })
                .then(function (responseJson) {
                var account = responseJson;
                resolve(account);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceAccount.deleteAccountById = function (accountId) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceAccount.baseUrl + "/" + accountId, {
                method: 'DELETE',
            })
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops something went wrong!");
            })
                .then(function (responseJson) {
                var account = responseJson;
                resolve(account);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceAccount.topUpAccount = function (destinationId, sumToTransfer) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceAccount.baseUrl + "/topup/" + destinationId + "/" + sumToTransfer, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "accountDestinationId": destinationId,
                    "sumToTransfer": sumToTransfer,
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops there was an error!Please try again!");
            })
                .then(function (responseJson) {
                var transferOperation = responseJson;
                resolve(transferOperation);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceAccount.deleteDeposit = function (idDeposit, idAccount) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceAccount.baseUrl + "/deposit/" + idDeposit + "/" + idAccount, {
                method: 'DELETE',
            })
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops something went wrong!");
            })
                .then(function (responseJson) {
                var account = responseJson;
                resolve(account);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return ServiceAccount;
}());
export default ServiceAccount;
//# sourceMappingURL=ServiceAccount.js.map