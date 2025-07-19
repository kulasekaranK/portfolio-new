import { Component, inject, signal } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase';
import { SectionHeader } from "../../shared/ui/section-header/section-header";

@Component({
  selector: 'app-projects',
  imports: [SectionHeader],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
 projects = inject(FirebaseService).projects;
constructor(){
}
}

