import { ResolveFn } from '@angular/router';
import { PageLayout } from '../enums/page-layout';
import { inject } from '@angular/core';
import { PageLayoutService } from '../services/page-layout.service';

export const setLayout =
  (layout: PageLayout): ResolveFn<boolean> =>
  (route, state) => {
    inject(PageLayoutService).setLayout(layout);
    return true;
  };
