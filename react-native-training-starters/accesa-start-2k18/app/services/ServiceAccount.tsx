import ConstantsHolder from "./ConstantsHolder";


export interface IGetAccountsOfUser {
    data: any,
}

export interface IGetTopUpOperation{
    accountDestinationId:number,
    sumToTarnsfer:number,
    date:Date,
    ibanDestination:string,
}

export interface IGetOperation {

    accountDestinationIBAN: string,
    alias:string,
    sumToTransfer: number,
    date: any,
}

interface IAccount {
    id: number,
    iban: string,
    budget: number,
    currency: string,
    alias: string,
}

export default class ServiceAccount {

    static baseUrl = "http://" + ConstantsHolder.IP_PORT + "/api/accounts";


    static getAccountById = (accountId: number) => {
        return new Promise<IAccount>((resolve, reject) => {
            fetch(ServiceAccount.baseUrl + "/search?accountId=" + accountId)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson: IAccount) => {
                    let account: IAccount = responseJson
                    resolve(account)
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    static createAccount = (idAdmin: number, currency: string, alias: string) => {

        return new Promise<IAccount>((resolve, reject) => {
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
                    .then((response) => {
                        if (response.ok) {
                            return response.json()
                        }
                        throw new Error("Ops there was an error!")

                    })
                    .then((responseJson: IAccount) => {
                        let account: IAccount = responseJson
                        resolve(account)
                    })
                    .catch(error => {
                        reject(error);
                    })

            }
        )

    }

    static deleteAccountById = (accountId: number) => {
        return new Promise<IAccount>((resolve, reject) => {
            fetch(ServiceAccount.baseUrl + "/" + accountId, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops something went wrong!")
                })
                .then(responseJson => {
                    let account: IAccount = responseJson;
                    resolve(account);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    static topUpAccount = (destinationId: number, sumToTransfer: number) => {

        return new Promise<IGetTopUpOperation>((resolve, reject) => {
            fetch(ServiceAccount.baseUrl + "/topup/"+destinationId+"/"+sumToTransfer, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "accountDestinationId": destinationId,
                        "sumToTransfer": sumToTransfer,
                    }),
                }
            )
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Ops there was an error!Please try again!")
                })
                .then((responseJson: IGetTopUpOperation) => {
                    let transferOperation: IGetTopUpOperation = responseJson;
                    resolve(transferOperation);
                })
                .catch(error => {
                    reject(error);
                })

        })

    }

    static transferMoney(sourceAccountId: number, destinationAccountId: number, sumToTransfer: number) {
        return new Promise<IGetOperation>((resolve, reject) => {
            fetch(ServiceAccount.baseUrl+"/transfer?sourceId="+sourceAccountId+ "&destinationId="+destinationAccountId+ "&sumToTransfer="+sumToTransfer, {
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
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error(response.statusText);
                })
                .then((responseJson: IGetOperation) => {
                    let operation: IGetOperation = responseJson;
                    resolve(operation);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }



    static createDeposit(idAccount:number,
                         idUser:number,
                         title:string,
                         initialSum:number) {
        return new Promise((resolve, reject) => {
            fetch(ServiceAccount.baseUrl+"/deposit", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "IdAccount":idAccount,
                    "IdUser":idUser,
                    "Title":title,
                    "InitialSum":initialSum,
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error(response.statusText);
                })
                .then((responseJson: IGetOperation) => {
                    let deposit = responseJson;
                    resolve(deposit);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    static deleteDeposit=(idDeposit:number,
                          idAccount:number)=>{
        return new Promise((resolve, reject) => {
            fetch(ServiceAccount.baseUrl + "/deposit/" + idDeposit+"/"+idAccount, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops something went wrong!")
                })
                .then(responseJson => {
                    let account= responseJson;
                    resolve(account);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }


}