export interface User {
    username: string,
    email: string,
    type: 'admin' | 'user',
    patientName?: string
}