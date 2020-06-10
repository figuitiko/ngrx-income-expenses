export class User {

  static fromFiresBase({email, name, uid}){

    return new User(uid,name, email );
  }


  constructor(
              public uid:string,
              public name: string,
              public email: string

              ) {}

}
