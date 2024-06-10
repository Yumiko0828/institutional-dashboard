import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PageLayout } from '@enums/page-layout';

@Injectable({
  providedIn: 'root',
})
export class PageLayoutService {
  private layoutSubject = new Subject<PageLayout>();
  layout$ = this.layoutSubject.asObservable();

  setLayout(value: PageLayout) {
    this.layoutSubject.next(value);
  }
}
