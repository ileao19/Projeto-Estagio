import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ReactiveFormsModule } from '@angular/forms'; // Importe ReactiveFormsModule

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],  // Incluindo o módulo aqui
  template: `
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
      <label for="nomeDoProduto">Nome do Produto</label>
      <input id="nomeDoProduto" formControlName="nomeDoProduto" />

      <label for="descricaoDoProduto">Descrição</label>
      <input id="descricaoDoProduto" formControlName="descricaoDoProduto" />

      <label for="codigo">Código</label>
      <input id="codigo" formControlName="codigo" />

      <label for="quantidade">Quantidade</label>
      <input id="quantidade" formControlName="quantidade" type="number" />

      <button type="submit" [disabled]="productForm.invalid">Adicionar Produto</button>
    </form>
  `,
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      nomeDoProduto: ['', [Validators.required, Validators.maxLength(20)]],
      descricaoDoProduto: ['', [Validators.required, Validators.maxLength(50)]],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      quantidade: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this.productService.addProduct(newProduct).then(() => {
        console.log('Produto adicionado com sucesso!');
        this.productForm.reset();
      });
    }
  }
}
