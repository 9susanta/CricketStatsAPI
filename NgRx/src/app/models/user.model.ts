export class User {
  constructor(
    private email: string,
    private role: string,
    private token: string,
    private refreshToken: string,
    private expirationDate: Date
  ) {}
  get getExpirationDate()
  {
    return this.expirationDate;
  }
}
