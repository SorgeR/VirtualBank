import ConstantsHolder from "./ConstantsHolder";
var ServiceUser = /** @class */ (function () {
    function ServiceUser() {
    }
    ServiceUser.myBaseUrl = "http://" + ConstantsHolder.IP_PORT + "/api/users";
    ServiceUser.register = function (phoneNumber, password, firstname, lastName) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/register", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "PhoneNumber": phoneNumber,
                    "Password": password,
                    "FirstName": firstname,
                    "LastName": lastName,
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    if (response.status == 409) {
                        throw new Error("This phone number already exists!");
                    }
                }
            })
                .then(function (response) {
                var registerResponse = response;
                resolve(registerResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceUser.login = function (phoneNumber, password) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/login", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "PhoneNumber": phoneNumber,
                    "Password": password,
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops,we got a problem!");
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
    ServiceUser.getUserByID = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/search?userId=" + id.toString())
                .then(function (response) {
                if (response.ok)
                    return response.json();
                else {
                    throw new Error(response.statusText);
                }
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
    ServiceUser.getFriends = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/friends/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Failed to load data!");
            })
                .then(function (responseJson) {
                var friends = responseJson;
                resolve(friends);
            })
                .catch(function (error) {
                error = "Ops! Something went wrong!";
                reject(error);
            });
        });
    };
    ServiceUser.getNonFriends = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/nonfriends/" + id)
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Ops! Something went wrong!");
            })
                .then(function (responseJson) {
                var nonFriends = { data: responseJson };
                resolve(nonFriends);
            })
                .catch(function (error) {
                alert(error);
            });
        });
    };
    ServiceUser.getAccounts = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/accounts/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var accounts = { data: responseJson };
                resolve(accounts);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceUser.getTopUpOperations = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/topup/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var operations = { data: responseJson };
                resolve(operations);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceUser.getTransferOperations = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/transfer/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var operations = { data: responseJson };
                resolve(operations);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceUser.getBills = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/bills/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var operations = { data: responseJson };
                resolve(operations);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceUser.getDebtsToPay = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/debtstopay/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var debts = { data: responseJson };
                resolve(debts);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceUser.getUserLastWeekStatistics = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/budget-statistics/week/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var lastWeek = { data: responseJson };
                resolve(lastWeek);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceUser.getUserLastMonthStatistics = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/budget-statistics/month/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var lastMonth = { data: responseJson };
                resolve(lastMonth);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceUser.getDebtorsOfUser = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/debtors/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var lastMonth = { data: responseJson };
                resolve(lastMonth);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceUser.getTotalBudgetOfUser = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/budget/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var budget = responseJson;
                resolve(budget);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceUser.getDepositsOfUser = function (id) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceUser.myBaseUrl + "/deposits/" + id)
                .then(function (response) {
                if (response.ok)
                    return response.json();
                throw new Error("Ops we've got a problem!");
            })
                .then(function (responseJson) {
                var lastMonth = { data: responseJson };
                resolve(lastMonth);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    return ServiceUser;
}());
export default ServiceUser;
//# sourceMappingURL=ServiceUser.js.map