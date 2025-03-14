import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  editingProduct: Product | null = null;

  // Novo produto para o formulário
  newProduct: Product = {
    id: '', // Firestore cria um ID automático
    nomeDoProduto: '',
    descricaoDoProduto: '',
    codigo: '',
    quantidade: 0,
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  // Carregar produtos do Firestore
  loadProducts() {
    this.productService.getProducts().then((products: Product[]) => {
      this.products = products;
      console.log('Produtos carregados:', this.products);
    }).catch((error: any) => {
      console.error('Erro ao carregar produtos:', error);
    });
  }

  // Adicionar novo produto
  addProduct() {
    if (this.newProduct.nomeDoProduto && this.newProduct.descricaoDoProduto && this.newProduct.codigo && this.newProduct.quantidade > 0) {
      this.productService.addProduct(this.newProduct).then(() => {
        console.log('Produto adicionado com sucesso!');
        this.resetNewProduct();
        this.loadProducts();
      }).catch((error) => {
        console.error('Erro ao adicionar produto:', error);
      });
    }
  }

  // Excluir produto
  deleteProduct(id?: string) {
    if (id && confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.deleteProduct(id).then(() => {
        console.log('Produto excluído com sucesso!');
        this.loadProducts();
      }).catch((error) => {
        console.error('Erro ao excluir produto:', error);
      });
    }
  }

  // 🔹 INICIAR EDIÇÃO DO PRODUTO 🔹
  startEditProduct(product: Product) {
    this.editingProduct = { ...product }; // Cria uma cópia para evitar modificar direto na lista
  }

  // 🔹 SALVAR ALTERAÇÕES 🔹
  saveEdit() {
    if (this.editingProduct && this.editingProduct.id) {
      this.productService.updateProduct(this.editingProduct.id, this.editingProduct).then(() => {
        console.log('Produto atualizado com sucesso!');
        this.editingProduct = null;
        this.loadProducts();
      }).catch((error) => {
        console.error('Erro ao atualizar produto:', error);
      });
    }
  }

  // 🔹 CANCELAR EDIÇÃO 🔹
  cancelEdit() {
    this.editingProduct = null;
  }

  // Resetar formulário de novo produto
  resetNewProduct() {
    this.newProduct = { id: '', nomeDoProduto: '', descricaoDoProduto: '', codigo: '', quantidade: 0 };
  }
}
