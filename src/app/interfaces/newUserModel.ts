export interface newUserModel {
    username: string,
    email: string,
    password: string,
    cpassword: string,
    type: 'admin' | 'user'
}