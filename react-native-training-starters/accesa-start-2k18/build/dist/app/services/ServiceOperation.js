import ConstantsHolder from "./ConstantsHolder";
var ServiceAccount = /** @class */ (function () {
    function ServiceAccount() {
    }
    ServiceAccount.transferMoneyBetweenAccounts = function (sourceAccountId, destinationAccountId, sumToTransfer) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceAccount.baseUrl + "/transfer", {
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
    ServiceAccount.baseUrl = "http://" + ConstantsHolder.IP_PORT + "/api/operations";
    ServiceAccount.topUpMoneyToAnAccount = function (destinationAccountId, sumToTransfer) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceAccount.baseUrl + "/topup", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "accountDestinationId": destinationAccountId,
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
    return ServiceAccount;
}());
export default ServiceAccount;
//# sourceMappingURL=ServiceOperation.js.map