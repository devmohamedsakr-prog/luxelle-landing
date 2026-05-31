import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-loader.component.html',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('600ms 200ms cubic-bezier(0.22,1,0.36,1)', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class PageLoaderComponent implements OnInit {
  visible = signal(true);

  ngOnInit(): void {
    setTimeout(() => this.visible.set(false), 1800);
  }
}
