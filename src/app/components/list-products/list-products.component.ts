import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  public downloadPDF() {
    // Obtener el elemento 'productos'
    const DATA = document.getElementById('productos');

    if (DATA) { // Verificar si el elemento existe
      const doc = new jsPDF('p', 'pt', 'a4');
      const options = {
        background: 'white',
        scale: 3
      };

      html2canvas(DATA, options).then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        doc.save(`${new Date().toISOString()}_productos.pdf`);
      });
    } else {
      console.error("Elemento 'productos' no encontrado.");
    }
  }

}


