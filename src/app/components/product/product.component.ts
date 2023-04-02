import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/store/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() img: any;
  @Input() title: any;
  @Input() prcie: any;
  @Input() product: any;

  constructor(private _CartService: CartService) {}

  ngOnInit(): void {}

  // add to cart
  useAddToCart(product: any) {
    // console.log(product);
    this._CartService.addToCart(product[1]);
  }

}
