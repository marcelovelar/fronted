import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css']
})
export class AddEditProductsComponent implements OnInit{
  
  form: FormGroup; 
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb:FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group(
      {
        name: ['Coca-Cola', Validators.required],
        description: ['',Validators.required],
        price: ['',Validators.required],
        stock: ['',Validators.required]
      })
      this.id = Number(aRouter.snapshot.paramMap.get('id'));
      
   
   }
  
  ngOnInit(): void {

    if(this.id != 0){
      this.operacion = 'Editar ';
      this.getProduct(this.id);
    }
  }

  getProduct(id:number){
    this._productService.getProduct(id).subscribe((data: Product) => {
    
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
    })
  }

  addProduct(){
    console.log("Add producaawt");

    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }

    if(this.id !== 0){
      //es editar
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        console.log('Product updated');
        this.router.navigate(['/']);
        console.log(product);
         
      })
    }
    else{
      //es agregar
      this._productService.saveProduct(product).subscribe(() => {
        console.log('Product created');
        this.router.navigate(['/']);
         
      })
      
    }
    
  }  



}
