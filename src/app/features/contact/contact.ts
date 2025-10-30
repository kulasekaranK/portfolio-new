import { Component, signal } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name = signal('');
  email = signal('');
  message = signal('');
  submitted = signal(false);
  sending = signal(false);

  constructor(private firebase: FirebaseService) {}

  async submit() {
    if (!this.name() || !this.email() || !this.message()) return;

    this.sending.set(true);

    const templateParams = {
      from_name: this.name(),
      reply_to: this.email(),
      message: this.message(),
    };

    try {
      // Send message to yourself (your inbox)
      await emailjs.send(
        'service_imkulasekaran',
        'template_e7yv1xm',
        templateParams,
        'OCO5efVvu1i95IC6c'
      );

      // Send Thank You mail to the sender
      await emailjs.send(
        'service_imkulasekaran',
        'template_jrsg90p', // ✅ new thank you template
        templateParams,
        'OCO5efVvu1i95IC6c'
      );

      // Reset form
      this.name.set('');
      this.email.set('');
      this.message.set('');
      this.submitted.set(true);
    } catch (error) {
      console.error('Email failed to send:', error);
    } finally {
      this.sending.set(false);
    }
  }
}
