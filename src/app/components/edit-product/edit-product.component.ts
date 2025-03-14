import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common'; // Importa o CommonModule!

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Adiciona CommonModule aqui
})
export class EditProductComponent {
  @Input() product!: Product;
  @Output() save = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      nomeDoProduto: ['', [Validators.required, Validators.maxLength(20)]],
      descricaoDoProduto: ['', [Validators.required, Validators.maxLength(50)]],
      codigo: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      quantidade: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnChanges() {
    if (this.product) {
      this.productForm.patchValue({
        nomeDoProduto: this.product.nomeDoProduto || '',
        descricaoDoProduto: this.product.descricaoDoProduto || '',
        codigo: this.product.codigo || '',
        quantidade: this.product.quantidade || 0,
      });
    }
  }

  get formControls() {
    return this.productForm.controls;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        ...this.product,
        ...this.productForm.value,
      } as Product;
      this.save.emit(updatedProduct);
    }
  }
}
