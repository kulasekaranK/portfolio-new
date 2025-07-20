import { Component, signal } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true, // ✅ required for standalone components
  imports: [SectionHeader, CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name = signal('');
  email = signal('');
  message = signal('');
  submitted = signal(false);

  constructor(private firebase: FirebaseService) {}

  async submit() {
    if (!this.name() || !this.email() || !this.message()) return;

    await this.firebase.submitContact({
      name: this.name(),
      email: this.email(),
      message: this.message(),
      createdAt: new Date(),
    });

    this.name.set('');
    this.email.set('');
    this.message.set('');
    this.submitted.set(true);
  }

  
}
