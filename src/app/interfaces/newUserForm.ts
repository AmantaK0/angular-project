export interface newUserForm {
    username: string,
    email: string,
    password: string,
    cpassword: string,
    type: 'admin' | 'patient'
}