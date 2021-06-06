import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

import { User, ApiError } from '../typings/types';

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

  constructor(private storage: Storage, private fAuth: AngularFireAuth) {
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

  private findById(uid: string): User | null {
    const user = this.users.find(c => c.id === uid);
    if (user) return { ...user };
    return null;
  }

  private async createUserInStorage(userInfo: User, firebaseUser: firebase.auth.UserCredential) {
    const user = { name: userInfo.name, id: firebaseUser.user.uid };
    this.users.push(user);
    await this.saveAtStorage();
    return { user };
  }

  public async register(userInfo: User): Promise<{ user?: User; error?: ApiError }> {
    try {
      const firebaseUser: firebase.auth.UserCredential = await this.fAuth.createUserWithEmailAndPassword(
        userInfo.email,
        userInfo.password
      );
      return this.createUserInStorage(userInfo, firebaseUser);
    } catch (error) {
      if (error?.code === 'auth/email-already-in-use') {
        const userLogged = await this.login(userInfo);
        await this.logout();
        if (userLogged?.firebaseUser) {
          // does not have user in localstorage,
          // maybe create them and return the user
          await this.createUserInStorage(userInfo, userLogged.firebaseUser);
        }
      }
      return { error };
    }
  }

  public async login(userInfo: User): Promise<{ user?: User; error?: ApiError; firebaseUser?: firebase.auth.UserCredential }> {
    try {
      const firebaseUser: firebase.auth.UserCredential = await this.fAuth.signInWithEmailAndPassword(
        userInfo.email,
        userInfo.password
      );
      const user = this.findById(firebaseUser.user.uid);
      if (!user) return { firebaseUser };
      this.user = { ...user };
      this.authSubject.next(true);
      await this.saveAtStorage();
      return { user };
    } catch (error) {
      return { error };
    }
  }

  public async logout() {
    this.user = null;
    this.authSubject.next(false);
    await this._storage.remove(STORAGE_USER);
    await this.saveAtStorage();
  }

  public isLoggedIn(): Observable<boolean> {
    return this.authSubject.asObservable();
  }

  public getUser(): User | null {
    return this.user;
  }
}
