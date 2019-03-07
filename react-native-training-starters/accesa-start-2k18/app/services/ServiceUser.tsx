import {IGetFriendsOfUser, IGetNonFriendsOfUser} from "./ServiceFriend";
import ConstantsHolder from "./ConstantsHolder";
import {IGetAccountsOfUser} from "./ServiceAccount";

export interface IGetDebtsToPay{
    data:any,
}
export interface LoginResponse {
    message: string,
}

export interface RegisterResponse {
    message: string,
}

export interface IGetAccountsOfUser {
    data: any,
}

export interface IGetData {
    data:any,
}

export interface IGetBudget{
    budget:number,
}

export interface IDebtorOfUser{
    userId:number,
    billName:string,
    sumToGet:number,
    debtorId:number,
    debtorFirstName:string,
    debtorLastName:string,
}

export interface IDebt{
    idDebt:number,
    idCreator:number,
    billName:string,
    sumToPay:number,
    creatorFirstName:string,
    creatorLastName:string,
    creatorIBAN:string,
    creatorAccountId:number,
    payed:boolean,
}


export interface IGetUser {
    id: number,
    phoneNumber: string,
    firstName: string,
    lastName: string
}

export interface IGetOperations {
    data: any,
}

export interface IGetTransferOperation {

    destinationUserId: number,
    sourceUserId: number,
    accountSourceIBAN: string,
    accountDestinationIBAN: string,
    sumToTransfer: number,
    date: any,
}

export interface IGetStatistic{
    date:any,
    totalSum:number,
}

export interface IDeposit{
    id:number,
    idUser:number,
    title:string,
    initialSum:number,
    createDate:any,
}

interface IGetBills{
    data:any,
}
class ServiceUser {


    static myBaseUrl = "http://" + ConstantsHolder.IP_PORT + "/api/users";

    static register = (phoneNumber: string,
                       password: string,
                       firstname: string,
                       lastName: string,) => {

        return new Promise<RegisterResponse>((resolve, reject) => {
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
                .then((response: any) => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        if (response.status == 409) {
                            throw new Error("This phone number already exists!")
                        }
                    }
                })
                .then((response: RegisterResponse) => {
                     let registerResponse:RegisterResponse = response;
                    resolve(registerResponse);
                })
                .catch((error: any) => {
                    reject(error);
                })
        })


    }


    static login = (phoneNumber: string,
                    password: string) => {

        return new Promise<IGetUser>((resolve, reject) => {
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
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error("Ops,we got a problem!");
                })
                .then((responseJson: IGetUser) => {
                    let user: IGetUser = responseJson
                    resolve(user)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }



    static getUserByID = (id: number) => {

        return new Promise<IGetUser>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/search?userId=" + id.toString())
                .then(response => {
                    if (response.ok)
                        return response.json();
                    else {
                        throw new Error(response.statusText);
                    }
                })
                .then((responseJson: IGetUser) => {
                    let user: IGetUser = responseJson;
                    resolve(user);
                })
                .catch((error: IGetUser) => {
                    reject(error);
                })
        })

    };

    static getFriends = (id: number) => {
        return new Promise<IGetFriendsOfUser>((resolve, reject) => {

            fetch(ServiceUser.myBaseUrl + "/friends/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Failed to load data!");
                })
                .then((responseJson: IGetFriendsOfUser) => {
                    let friends: IGetFriendsOfUser = responseJson;
                    resolve(friends);
                })
                .catch(error => {
                    error = "Ops! Something went wrong!";
                    reject(error);
                })
        })
    };

    static getNonFriends = (id: number) => {
        return new Promise<IGetNonFriendsOfUser>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/nonfriends/" + id)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Ops! Something went wrong!")
                })
                .then((responseJson) => {
                    let nonFriends: IGetNonFriendsOfUser = {data: responseJson};
                    resolve(nonFriends);
                })
                .catch((error) => {
                    alert(error);
                })

        })
    };

    static getAccounts = (id: number) => {
        return new Promise<IGetAccountsOfUser>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/accounts/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson: IGetAccountsOfUser) => {
                    let accounts: IGetAccountsOfUser = {data: responseJson};
                    resolve(accounts);
                })
                .catch(error => {
                    reject(error);
                })
        })
    };

    static getTopUpOperations = (id: number) => {
        return new Promise<IGetOperations>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/topup/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson: IGetAccountsOfUser) => {
                    let operations: IGetOperations = {data: responseJson};
                    resolve(operations)
                })
                .catch(error => {
                    reject(error);
                })
        })
    };

    static getTransferOperations = (id: number) => {
        return new Promise<IGetOperations>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/transfer/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson: IGetAccountsOfUser) => {
                    let operations: IGetOperations = {data: responseJson};
                    resolve(operations);
                })
                .catch(error => {
                    reject(error);
                })
        })
    };

    static getBills = (id: number) => {
        return new Promise<IGetBills>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/bills/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson: IGetBills) => {
                    let operations: IGetBills = {data: responseJson};
                    resolve(operations);
                })
                .catch(error => {
                    reject(error);
                })
        });
    };

    static getDebtsToPay = (id: number) => {
        return new Promise<IGetDebtsToPay>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/debtstopay/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson:IGetDebtsToPay) => {
                    let debts: IGetDebtsToPay = {data: responseJson};
                    resolve(debts);
                })
                .catch(error => {
                    reject(error);
                })
        });
    };

    static getUserLastWeekStatistics=(id:number)=>{
        return new Promise<IGetData>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/budget-statistics/week/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson) => {
                    let lastWeek: IGetData = {data:responseJson};
                    resolve(lastWeek);
                })
                .catch(error => {
                    reject(error);
                })
        });
    };

    static getUserLastMonthStatistics=(id:number)=>{
        return new Promise<IGetData>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/budget-statistics/month/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson) => {
                    let lastMonth: IGetData = {data:responseJson};
                    resolve(lastMonth);
                })
                .catch(error => {
                    reject(error);
                })
        });
    };

    static getDebtorsOfUser=(id:number)=>{
        return new Promise<IGetData>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/debtors/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson) => {
                    let lastMonth: IGetData = {data:responseJson};
                    resolve(lastMonth);
                })
                .catch(error => {
                    reject(error);
                })
        });
    };

    static getTotalBudgetOfUser=(id:number)=>{
        return new Promise<IGetBudget>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/budget/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson) => {
                    var budget: IGetBudget =responseJson;
                    resolve(budget);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    static getDepositsOfUser=(id:number)=>{
        return new Promise<IGetData>((resolve, reject) => {
            fetch(ServiceUser.myBaseUrl + "/deposits/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson) => {
                    let lastMonth: IGetData = {data:responseJson};
                    resolve(lastMonth);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }
}

export default ServiceUser;

