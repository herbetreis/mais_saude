import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

import { User } from '../typings/user';

// const AUTH_SERVER: string = 'http://localhost:3000';
const STORAGE_USERS: string = 'users';
export const STORAGE_USER: string = 'userLoggedIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;
  private authSubject = new BehaviorSubject(null);
  private users: User[] = [];
  private user: User = null;

  // constructor(private httpClient: HttpClient, private storage: Storage) {
  //   this.loadUsers();
  // }

  constructor(private storage: Storage) {
    this.onInit();
  }

  private async onInit() {
    this._storage = await this.storage.create();
    await this.loadUsers();
    await this.loadUserLoggedIn();
  }

  private async loadUsers(): Promise<void> {
    const storageUsers = await this._storage?.get(STORAGE_USERS) as User[];
    if (Array.isArray(storageUsers)) {
      this.users.push(...storageUsers);
    }
  }

  private async loadUserLoggedIn(): Promise<void> {
    const userLoggedIn = await this._storage?.get(STORAGE_USER) as User;
    if (userLoggedIn) {
      this.user = userLoggedIn;
      this.authSubject.next(true);
    } else {
      this.authSubject.next(false);
    }
  }

  private async saveAtStorage() {
    await this._storage?.set(STORAGE_USERS, this.users);
    await this._storage?.set(STORAGE_USER, this.user);
  }

  private findByEmail(email: string): User | null {
    const user = this.users.find(c => c.email === email);
    if (user) return { ...user };
    return null;
  }

  // public register(userInfo: User): Observable<User> {
  //   return this.httpClient.post<User>(`${AUTH_SERVER}/register`, userInfo);
  // }

  public async register(userInfo: User): Promise<User | null> {
    if (this.findByEmail(userInfo.email)) return null;
    const user = { ...userInfo, id: this.users.length + 1 };
    this.users.push(user);
    await this.saveAtStorage();
    return user;
  }

  // public login(userInfo: User): Observable<any> {
  //   return this.httpClient.post(`${AUTH_SERVER}/login`, userInfo).pipe(
  //     tap(async (res: { status: number, access_token, expires_in, user_id }) => {
  //       if (res.status !== 404) {
  //         await this._storage?.set('ACCESS_TOKEN', res.access_token);
  //         await this._storage?.set('EXPIRES_IN', res.expires_in);
  //         await this._storage?.set('USER_ID', res.user_id);
  //       }
  //     })
  //   );
  // }

  public async login(userInfo: User): Promise<User | null> {
    const { email, password } = userInfo;
    const user = this.findByEmail(email);
    if (!(user?.password === password)) return null;
    this.user = { ...user };
    this.authSubject.next(true);
    await this.saveAtStorage();
    return user;
  }

  public async logout() {
    this.user = null;
    this.authSubject.next(false);
    await this.saveAtStorage();
  }

  public isLoggedIn(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  public getUser() {
    return !!this.user;
  }
}
