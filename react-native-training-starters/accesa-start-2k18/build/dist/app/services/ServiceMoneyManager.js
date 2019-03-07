var successfullyTransferMessage = "Successfully transferred money!";
var successfullyTopUpMessage = "Successfully deposited money!";
var ServiceMoneyManager = /** @class */ (function () {
    function ServiceMoneyManager() {
    }
    /**
     *
     * @param phoneNumber
     */
    ServiceMoneyManager.getTheActualBudget = function (phoneNumber) {
        return new Promise(function (resolve, reject) {
            fetch('https://accesayouth2018api.azurewebsites.net/api/transaction/' + phoneNumber)
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw Error("An error occured!");
                }
            })
                .then(function (responseJson) {
                var getBudgetResponse = { sum: Number(responseJson) };
                resolve(getBudgetResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     *
     * @param phoneNumber
     * @param sumToBeTransferred
     */
    ServiceMoneyManager.topUpMoney = function (phoneNumber, sumToBeDeposit) {
        return new Promise(function (resolve, reject) {
            fetch('https://accesayouth2018api.azurewebsites.net/api/transaction/' + phoneNumber + '/topup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sumToBeDeposit),
            })
                .then(function (response) {
                if (response.ok) {
                    return { message: successfullyTopUpMessage };
                }
                else {
                    throw Error("An error has occured!");
                }
            })
                .then(function (response) {
                var topUpMoneyResponse = response;
                resolve(topUpMoneyResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    /**
     *
     * @param sourcePhoneNumber
     * @param destinationPhoneNumber
     * @param sumToBeTransferred
     */
    ServiceMoneyManager.transferMoney = function (sourcePhoneNumber, destinationPhoneNumber, sumToBeTransferred) {
        return new Promise(function (resolve, reject) {
            fetch("https://accesayouth2018api.azurewebsites.net/api/transaction/transfer", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "PhoneNumber": sourcePhoneNumber,
                    "TargetPhoneNumber": destinationPhoneNumber,
                    "Amount": sumToBeTransferred,
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return { message: successfullyTransferMessage };
                }
                else {
                    throw Error("An error has occured");
                }
            })
                .then(function (response) {
                var transferMoneyResponse = response;
                resolve(transferMoneyResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return ServiceMoneyManager;
}());
export default ServiceMoneyManager;
//# sourceMappingURL=ServiceMoneyManager.js.map