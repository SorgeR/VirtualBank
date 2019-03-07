import {IGetUser, RegisterResponse} from "./ServiceUser";
import ConstantsHolder from "./ConstantsHolder";

interface IGetMessages {
    data:any,
}
export default class ServiceMessage {

    static myBaseUrl = "http://"+ConstantsHolder.IP_PORT+"/api/messages";
    static addMessage=(idSender:number,idReceiver:number,text:string)=>{

        return new Promise((resolve, reject) => {
            fetch(ServiceMessage.myBaseUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "IdSender": idSender,
                    "IdReceiver": idReceiver,
                    "Text": text,
                    "Date":(new Date()).toISOString()

                }),
            })
                .then((response: any) => {
                    if (response.ok) {
                        return response.json();
                    }
                    else {

                            throw new Error("The message can't be empty!")

                    }
                })
                .then((response: RegisterResponse) => {
                    let messageResponse= response;
                    resolve(messageResponse);
                })
                .catch((error: any) => {
                    reject(error);
                })
        })
    }

    static getMessages=(idSender:number,idReceiver:number)=>{
        return new Promise<IGetMessages>((resolve, reject) => {
            fetch(ServiceMessage.myBaseUrl + "/"+idSender+"/"+idReceiver)
                .then(response => response.json())
                .then((responseJson: IGetUser) => {
                    let messages: IGetMessages = {data:responseJson}
                    resolve(messages);
                })
                .catch((error: IGetUser) => {
                    // let err={message:error.message"};
                    reject(error);
                })
        })
    }
}