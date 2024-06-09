import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLayoutService } from './core/services/page-layout.service';
import { PageLayout } from './core/enums/page-layout';
import { AsyncPipe } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly PageLayout = PageLayout;

  constructor(public readonly pageLayoutService: PageLayoutService) {}
}
