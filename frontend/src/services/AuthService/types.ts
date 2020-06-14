export interface AuthService {
  login(email:string, password:string):Promise<any>
  verifyEmail(email:string) : Promise<boolean>
}

export interface LoginResponse{
  token:string
}
