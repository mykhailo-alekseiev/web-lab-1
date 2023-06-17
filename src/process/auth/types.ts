export interface SignUpRequest {
  email: string
  name: string
  password: string
  sex: string
}

export interface SignUpResponse {
  access_token: string
}

export interface SignInRequest {
  email: string
  password: string
}

export interface SignInResponse {
  access_token: string
}
