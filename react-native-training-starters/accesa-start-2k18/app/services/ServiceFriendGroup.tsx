import {IFriendship, IGetFriendsOfUser} from "./ServiceFriend";
import {StackActions} from "react-navigation";
import replace = StackActions.replace;
import ConstantsHolder from "./ConstantsHolder";

interface IGetFriendGroups {
    data: any,
}

interface IGetFriendGroupMembers{
    data:any,
}

interface IGetFriends{
    data:any,
}

interface IFriendGroup {
    id:number,
    name:string,
    createDate:string,
    adminId:number,
}

interface IUser{
    id:number,
    phoneNumber:string,
    firstName:string,
    lastName:string
}

interface IFriendGroupMember{
    groupId:number,
    memberId:number,
    entryDate:string,
}

export default class ServiceFriendGroup {

    static baseUrlFriends = "http://"+ConstantsHolder.IP_PORT+"/api/friendgroups";


    static getGroupsOfUser = (idUser: number) => {
        return new Promise<IGetFriendGroups>((resolve, reject) => {
            fetch(ServiceFriendGroup.baseUrlFriends+"/user/" + idUser)
                .then(response => {
                    if (response.ok)
                        return response.json();
                    throw new Error("Ops! we have a problem!")
                })
                .then(response => {
                    let groups: IGetFriendGroups = {data: response}
                    resolve(groups);
                })
                .catch(error => {
                    reject(error);
                })

        })
    }

    static createGroup=(groupName:string,adminId:number)=>{
        return new Promise<IFriendGroup>((resolve,reject)=>{
            fetch(ServiceFriendGroup.baseUrlFriends, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name":groupName,
                    "adminId":adminId,
                }),
            })
                .then(response=>{
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error("Ops! We have a problem!")
                })
                .then((responseJson:IFriendGroup)=>{
                    let friendGroup:IFriendGroup=responseJson;
                    resolve(friendGroup);
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    static getFriendGroupById=(groupId:number)=>{
        return new Promise<IFriendGroup>((resolve,reject)=>{
            fetch(ServiceFriendGroup.baseUrlFriends+"/"+groupId)
                .then(response=>{
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error("Ops we have an error!")
                })
                .then((responseJson:IFriendGroup)=>{
                    let friendGroup:IFriendGroup=responseJson;
                    resolve(friendGroup)
                })
                .catch(error=>{
                    reject(error);
                })

        })
    }

    static updateFriendGroupName=(groupId:number,modifierId:number,newGroupName:string)=>{
        return new Promise<IFriendGroup>((resolve,reject)=>{
            fetch(ServiceFriendGroup.baseUrlFriends,{
                method: 'PUT',
                    headers: {
                    Accept: 'application/json',
                        'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id":groupId,
                    "modifierId":modifierId,
                    "name":newGroupName
                }),
            })
                .then(response=>{
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error("Ops something went wrong!")
                })
                .then((responseJson:IFriendGroup)=>{
                    let friendGroup:IFriendGroup=responseJson;
                    resolve(friendGroup)
                })
                .catch(error=>{
                    reject(error)
                })
        })
    }

    static getMembersOfGroup=(idGroup:number)=>{
        return new Promise<IGetFriendGroupMembers>((resolve,reject)=>{
            fetch(ServiceFriendGroup.baseUrlFriends+"/members/"+idGroup)
                .then(response=>{
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error("Ops we have a problem!")
                })
                .then(responseJson=>{
                    let members:IGetFriendGroupMembers={data:responseJson}
                    resolve(members)
                })
                .catch(error=>{
                    reject(error);
                })
        })
    }

    static deleteGroupMember=(membershipId:number)=>{
        return new Promise<IUser>((resolve,reject)=>{
            fetch(ServiceFriendGroup.baseUrlFriends+"/members/"+membershipId,{
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            })
                .then(response=>{
                    if(response.ok){
                        return response.json()
                    }
                    throw new Error("Ops we got a problem!")
                })
                .then((responseJson:IUser)=>{
                    let user:IUser=responseJson;
                    resolve(user);
                })
                .catch((error)=>{
                    reject(error);
                })

    })
    }

    static addMemberInGroup(memberId:number,groupId:number){
        return new Promise<IFriendGroupMember>((resolve,reject)=>{
            fetch(ServiceFriendGroup.baseUrlFriends+"/members/"+groupId+"/"+memberId,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

            })
                .then(response=>{
                    if(response.ok){
                        return response.json()
                    }
                    throw new Error("Ops we got a problem!")
                })
                .then((responseJson:IFriendGroupMember)=>{
                    let user:IFriendGroupMember=responseJson;
                    resolve(user);
                })
                .catch((error)=>{
                    reject(error);
                })

        })
    }


    static getFriendsWhichAreNotInGroup=(userId:number,groupId:number)=>{
        return new Promise<IGetFriends>((resolve,reject)=>{
            fetch(ServiceFriendGroup.baseUrlFriends+"/nonmembers/"+userId+"/"+groupId)
                .then(response=>{
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error("Ops we have an error!")
                })
                .then((responseJson:IGetFriends)=>{
                    let friendGroup:IGetFriends={data:responseJson};
                    resolve(friendGroup)
                })
                .catch(error=>{
                    reject(error);
                })

        })
    }

    static deleteGroup=(groupId:number)=>{
        return new Promise((resolve,reject)=>{
            fetch(ServiceFriendGroup.baseUrlFriends+"/"+groupId,{
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then(response=>{
                if(response.ok){
                    return response.json()
                }
                throw new Error("Ops we got a problem!")
            })
            .then((responseJson)=>{
                let group=responseJson;
                resolve(group);
            })
            .catch((error)=>{
                reject(error);
            })

    })
    }
}