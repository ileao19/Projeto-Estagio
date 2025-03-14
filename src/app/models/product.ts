export interface Product {
  id?: string; // ID o Firestore gera automaticamente
  nomeDoProduto: string;
  descricaoDoProduto: string;
  codigo: string;
  quantidade: number;
}
