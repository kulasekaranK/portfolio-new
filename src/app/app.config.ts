import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';


const firebaseConfig = {
  apiKey: "AIzaSyDe4NGzaemNy-FsXZs7FDciIwEI9PWMX-E",
  authDomain: "imkulasekaran.firebaseapp.com",
  projectId: "imkulasekaran",
  storageBucket: "imkulasekaran.firebasestorage.app",
  messagingSenderId: "111278520388",
  appId: "1:111278520388:web:7ad52eb8bb796565616411",
  measurementId: "G-Y93KCM9S4K"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
  ]
};
