import { Component } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';

@Component({
  selector: 'app-root',
  template: `
    <h1>Projeto Estágio</h1>
    <app-product-list></app-product-list>
  `,
  standalone: true,
  imports: [ProductListComponent],
})
export class AppComponent {}
