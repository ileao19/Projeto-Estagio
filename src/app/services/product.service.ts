import { Injectable } from '@angular/core';
import { addDoc, doc, deleteDoc, updateDoc, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase.config';
import { Product } from '../models/product';
import { Firestore, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private db: Firestore;

  constructor() {
    // Inicializa o Firebase e o Firestore
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
  }

  // Método para adicionar um novo produto
  async addProduct(product: Product) {
    try {
      const docRef = await addDoc(collection(this.db, 'products'), product);
      console.log('Produto adicionado com ID: ', docRef.id);
    } catch (e) {
      console.error('Erro ao adicionar produto: ', e);
    }
  }

  // Método para listar todos os produtos
  async getProducts(): Promise<Product[]> {
    try {
      const querySnapshot = await getDocs(collection(this.db, 'products'));
      const products: Product[] = [];
      querySnapshot.forEach((doc) => {
        const product = doc.data() as Product;
        product.id = doc.id; // Garante que o ID do documento é incluído
        products.push(product);
      });
      return products;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  }

  // Método para excluir um produto
  async deleteProduct(id: string) {
    try {
      const docRef = doc(this.db, 'products', id);
      await deleteDoc(docRef);
      console.log('Produto deletado com sucesso');
    } catch (e) {
      console.error('Erro ao deletar produto: ', e);
    }
  }

  // Método para editar um produto
  async updateProduct(id: string, product: Product) {
    try {
      if (!id || !product) {
        throw new Error('ID ou produto inválido');
      }

      const docRef = doc(this.db, 'products', id);
      await updateDoc(docRef, { ...product });
      console.log('Produto atualizado com sucesso!');
    } catch (e) {
      console.error('Erro ao atualizar produto:', e);
    }
  }
}
