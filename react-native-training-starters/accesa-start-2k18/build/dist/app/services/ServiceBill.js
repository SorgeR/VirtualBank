import ConstantsHolder from "./ConstantsHolder";
var ServiceBill = /** @class */ (function () {
    function ServiceBill() {
    }
    ServiceBill.baseUrl = "http://" + ConstantsHolder.IP_PORT + "/api/bills";
    ServiceBill.createBill = function (idCreator, payedFromAccountId, name, description, price) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceBill.baseUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "idCreator": idCreator,
                    "payedFromAccountId": payedFromAccountId,
                    "name": name,
                    "description": description,
                    "date": (new Date()).toISOString(),
                    "price": price,
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops!Something went wrong!");
            })
                .then(function (response) {
                var bill = response;
                resolve(bill);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceBill.createDebt = function (idDebtor, idCreator, idBill, sumToPay) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceBill.baseUrl + "/debt", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "idDebtor": idDebtor,
                    "idCreator": idCreator,
                    "idBill": idBill,
                    "sumToPay": sumToPay,
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops!Something went wrong!");
            })
                .then(function (response) {
                var debt = response;
                resolve(debt);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceBill.getRestSumOfBill = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceBill.baseUrl + "/restAmount/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var sum = responseJson;
                resolve(sum);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceBill.getDebtorsOfBill = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceBill.baseUrl + "/debtors/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var debtors = { data: responseJson };
                resolve(debtors);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceBill.payDebt = function (idDebt, idSourceAccount, idDestinationAccount, sumToPay) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceBill.baseUrl + "/paydebt", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "idDebt": idDebt,
                    "sumToPay": sumToPay,
                    "idAccountSource": idSourceAccount,
                    "idAccountDestination": idDestinationAccount
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops!Something went wrong!");
            })
                .then(function (response) {
                var debt = response;
                resolve(debt);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return ServiceBill;
}());
export default ServiceBill;
//# sourceMappingURL=ServiceBill.js.map