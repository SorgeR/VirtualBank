import { Position } from '../constants';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    position: keyof typeof Position
}