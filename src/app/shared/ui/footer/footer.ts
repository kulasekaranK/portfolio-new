import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
 currentYear = new Date().getFullYear();
  socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/kulasekaranK' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/kulasekaran-krishnaraj-805173311/' },
    { name: 'Twitter', icon: 'twitter', url: 'https://x.com/itzguna_?s=09' },
    { name: 'website', icon: 'dribbble', url: '#' },
  ];
}
