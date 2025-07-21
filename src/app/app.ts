import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Footer } from "./shared/ui/footer/footer";
import { Navbar } from "./shared/ui/navbar/navbar";
import { Contact } from "./features/contact/contact";
import { Projects } from "./features/projects/projects";
import { Resume } from "./features/resume/resume";
import { Skills } from "./features/skills/skills";
import { About } from "./features/about/about";
import { Home } from "./features/home/home";
import { getAnalytics, logEvent } from 'firebase/analytics';
import { Analytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-root',
  imports: [Footer, Contact, Resume, Skills, About, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   private router = inject(Router);
  private analytics = inject(Analytics);

  constructor() {
    this.router.events.subscribe((event) => {
      if ((event as any).urlAfterRedirects) {
        const pagePath = (event as any).urlAfterRedirects;
        logEvent(this.analytics, 'page_view', {
          page_path: pagePath,
        });
      }
    });
  }
}
