import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

import { User } from '../typings/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private AUTH_SERVER: string = 'http://localhost:3000';
  private STORAGE_USERS: string = 'users';

  private users: User[] = [];

  // constructor(private httpClient: HttpClient, private storage: Storage) {
  //   this.loadUsers();
  // }

  constructor(private storage: Storage) {
    this.loadUsers();
  }

  private async loadUsers(): Promise<void> {
    const storageUsers = await this.storage.get(this.STORAGE_USERS) as User[];
    if (Array.isArray(storageUsers)) {
      this.users.push(...storageUsers);
    }
  }

  private async saveAtStorage() {
    await this.storage.set(this.STORAGE_USERS, this.users);
  }

  private findByEmail(email: string): User | null {
    const user = this.users.find(c => c.email === email);
    if (user) return { ...user };
    return null;
  }

  // public register(userInfo: User): Observable<User> {
  //   return this.httpClient.post<User>(`${this.AUTH_SERVER}/register`, userInfo);
  // }

  public async register(userInfo: User): Promise<User | null> {
    console.log(this.findByEmail(userInfo.email), userInfo);
    if (this.findByEmail(userInfo.email)) return null;
    const user = { ...userInfo, id: this.users.length + 1 };
    this.users.push(user);
    await this.saveAtStorage();
    return user;
  }

  // public login(userInfo: User): Observable<any> {
  //   return this.httpClient.post(`${this.AUTH_SERVER}/login`, userInfo).pipe(
  //     tap(async (res: { status: number, access_token, expires_in, user_id }) => {
  //       if (res.status !== 404) {
  //         await this.storage.set('ACCESS_TOKEN', res.access_token);
  //         await this.storage.set('EXPIRES_IN', res.expires_in);
  //         await this.storage.set('USER_ID', res.user_id);
  //       }
  //     })
  //   );
  // }

  public async login(userInfo: User): Promise<User | null> {
    const { email, password } = userInfo;
    const user = this.findByEmail(email);
    return (user?.password === password) ? user : null;
  }
}
