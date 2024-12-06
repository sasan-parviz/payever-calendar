import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RandomLogInterceptor } from './core/interceptors';

@Component({
  selector: 'app-root',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RandomLogInterceptor,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'calendar-sasan';

  ngOnInit(): void {}
}
