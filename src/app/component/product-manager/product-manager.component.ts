import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
  productForm: FormGroup;
  products: any[] = [];
  searchQuery: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      id: [null],
      name: [''],
      description: [''],
      price: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.products = this.products.filter(product =>
      product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
    );
  }

  onAdd() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe(newProduct => {
        this.products.push(newProduct);
        this.productForm.reset();
      });
    }
  }

  onEdit(product: any) {
    console.log('Editando produto:', product);
    this.productForm.patchValue(product);
  }
  

  onUpdate() {
    if (this.productForm.valid) {
      const updatedProduct = this.productForm.value;
      if (!updatedProduct.id) {
        alert('ID do produto inválido');
        return;
      }
      this.productService.updateProduct(updatedProduct.id, updatedProduct).subscribe(() => {
        const index = this.products.findIndex(p => p.id === updatedProduct.id);
        if (index > -1) this.products[index] = updatedProduct;
        this.productForm.reset();
        alert('Produto atualizado com sucesso!');
      });
    }
  }
  
  onDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
        alert('Produto excluído com sucesso!');
      });
    }
  }
  
}