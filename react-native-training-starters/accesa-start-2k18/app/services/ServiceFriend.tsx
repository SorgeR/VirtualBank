import ConstantsHolder from "./ConstantsHolder";


export interface IGetFriendsOfUser {
    data:any,
}

export interface IGetNonFriendsOfUser {
    data:any,
}

export interface IFriend {
    since:any,
    friendId:number
    userId:number,
    phoneNumber:string,
    firstName:string,
    lastName:string
}

export interface IFriendship{
    id:number,
    userRequesterId:number,
    userAccepterId:number,
    sinceDate:Date,
}

export default class ServiceFriend{

     static baseUrl="http://"+ConstantsHolder.IP_PORT+"/api/friends";



    static deleteFriendFromAPI=(idFriendship:number)=>{
        return new Promise<IFriend>((resolve,reject)=>{

            fetch(ServiceFriend.baseUrl+"/"+idFriendship,{
                method: 'delete'
            })
                .then(response=>{
                    if(response.ok)
                        return response.json();
                    throw new Error("Failed to load data!");
                })
                .then((responseJson:IFriend)=>{
                    let friend:IFriend=responseJson;
                    resolve(friend);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }


    static saveFriendship=(idRequester:number,idAccepter:number)=>{
        return new Promise<IFriendship>((resolve,reject)=>{
            fetch(ServiceFriend.baseUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "userRequesterId":idRequester,
                    "userAccepterId":idAccepter,
                }),
            })
                .then((response)=>{
                    if(response.ok){
                        return response.json()
                    }
                    throw new Error("Ops!Something went wrong!")
                })
                .then((response:IFriendship)=>{
                    let friendship:IFriendship=response;
                    resolve(friendship);
                })
                .catch(error=>{
                    reject(error);
                })


        })
    }
}