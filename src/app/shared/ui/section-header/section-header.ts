import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css'
})
export class SectionHeader {
  @Input() title = '';
}
