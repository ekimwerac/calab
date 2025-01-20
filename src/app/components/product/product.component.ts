import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/products';
import { CurrencyPipe } from '@angular/common';​

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() addToCartEvent = new EventEmitter<Product>();
  onAddToCartClicked() {
    this.addToCartEvent.emit(this.product);
  }

}
