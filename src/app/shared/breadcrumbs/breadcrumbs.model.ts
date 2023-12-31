import { Params } from '@angular/router';

export interface Breadcrumb {
  label: string;
  url: string;
  params: Params;
  icon: string;
}
