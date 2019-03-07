import { Position } from '../constants';
import { IUser } from '../models/';

const timeoutValue = 20;

export class UserService {
    public static getUsers(): Promise<IUser[]> {
        return new Promise<IUser[]>(resolve => {
            setTimeout(() => {
                const usersList: IUser[] = [];
                const positions = Object.keys(Position);
                for (let i = 0; i < 100; i++) {
                    usersList.push({
                        id: i,
                        firstName: `fistName${i}`,
                        lastName: `lastName${i}`,
                        position: positions[i % positions.length] as keyof typeof Position
                    });
                }

                resolve(usersList);
            }, timeoutValue);
        });
    }

    public static addUser(user: IUser): Promise<IUser> {
        return new Promise<IUser>(resolve => {
            setTimeout(() => {
                // ID should come from the server, but we don't have one here.
                resolve(user);
            }, timeoutValue);
        });
    }
}