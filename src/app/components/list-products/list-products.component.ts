import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit{
  listProducts: Product[] = []

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts() {
    this._productService.getListProducts().subscribe((data: Product[])=> {
      this.listProducts = data;
      console.log(this.listProducts);
    })
  }
  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(()=> {
      this.getListProducts();
      console.log('Product deleted');
    })
  }
}
