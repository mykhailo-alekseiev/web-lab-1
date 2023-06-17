export enum Sex {
  Male = 'male',
  Female = 'female',
}

export interface GetUserInfoResponse {
  name: string
  sex: Sex
  email: string
}
