// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { firebaseApp } from '../../firebase.config';

const auth = getAuth(firebaseApp);
const ADMIN_EMAIL = 'AkkarHuntingClub@gmail.com';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  }

  async login(email: string, password: string) {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    this.user = credentials.user;
    return credentials;
  }

  async signUp(email: string, password: string): Promise<any> {
    try {
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      this.user = credentials.user;
      return credentials;
    } catch (error) {
      throw error; // re-throw so caller can handle it
    }
  }

  logout() {
    this.user = null;
    return signOut(auth);
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  isAdmin(): boolean {
    return this.user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  }

  getCurrentUser(): User | null {
    return this.user;
  }
}
