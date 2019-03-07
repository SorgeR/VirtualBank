import ConstantsHolder from "./ConstantsHolder";


export default interface IRestAmount {

    restAmount: number,
}

export default interface IBill {
    id: number,
    idCreator: number,
    payedFromAccountId: number,
    name: string,
    description: string,
    date: any,
    price: number,
}

export default interface IGetDebtors {
    data: any,
}

export default interface IDebtor {
    idUser: number,
    uFirstName: string,
    uLastName: string,
    sumToPay: number,
    payed: boolean,
}

export default class ServiceBill {

    static baseUrl = "http://" + ConstantsHolder.IP_PORT + "/api/bills";

    static createBill = (idCreator: number,
                         payedFromAccountId: number,
                         name: string,
                         description: string,
                         price: number) => {
        return new Promise((resolve, reject) => {
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
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error("Ops!Something went wrong!")
                })
                .then((response) => {
                    let bill = response;
                    resolve(bill);
                })
                .catch(error => {
                    reject(error);
                })


        })
    };

    static createDebt = (idDebtor: number,
                         idCreator: number,
                         idBill: number,
                         sumToPay: number,
    ) => {
        return new Promise((resolve, reject) => {
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
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error("Ops!Something went wrong!")
                })
                .then((response) => {
                    let debt = response;
                    resolve(debt);
                })
                .catch(error => {
                    reject(error);
                })


        })
    };

    static getRestSumOfBill = (id: number) => {
        return new Promise<IRestAmount>((resolve, reject) => {
            fetch(ServiceBill.baseUrl + "/restAmount/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson: IRestAmount) => {
                    let sum: IRestAmount = responseJson
                    resolve(sum);
                })
                .catch(error => {
                    reject(error);
                })
        });
    };

    static getDebtorsOfBill = (id: number) => {

        return new Promise((resolve, reject) => {
            fetch(ServiceBill.baseUrl + "/debtors/" + id)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops we've got a problem!");
                })
                .then((responseJson) => {
                    let debtors= {data:responseJson};
                    resolve(debtors);
                })
                .catch(error => {
                    reject(error);
                })
        });
    };

    static payDebt=(idDebt:number,idSourceAccount:number,idDestinationAccount:number,sumToPay:number)=>{

        return new Promise((resolve, reject) => {
            fetch(ServiceBill.baseUrl+"/paydebt", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "idDebt":idDebt,
                    "sumToPay":sumToPay,
                    "idAccountSource":idSourceAccount,
                    "idAccountDestination":idDestinationAccount
                }),
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw new Error("Ops!Something went wrong!")
                })
                .then((response) => {
                    let debt = response;
                    resolve(debt);
                })
                .catch(error => {
                    reject(error);
                })


        })
    }


}