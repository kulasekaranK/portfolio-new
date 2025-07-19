import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./shared/ui/footer/footer";
import { Navbar } from "./shared/ui/navbar/navbar";
import { Contact } from "./features/contact/contact";
import { Projects } from "./features/projects/projects";
import { Resume } from "./features/resume/resume";
import { Skills } from "./features/skills/skills";
import { About } from "./features/about/about";
import { Home } from "./features/home/home";

@Component({
  selector: 'app-root',
  imports: [Footer, Contact, Projects, Resume, Skills, About, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
