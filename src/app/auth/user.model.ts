export interface IUser {
    name: string;
    email: string;
    uid: string;
}

export class User {

    public name: string;
    public email: string;
    public uid: string;

    constructor(user: IUser) {
        this.name = user && user.name || null;
        this.uid = user && user.uid || null;
        this.email = user && user.email || null;
    }

}