import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, flatMap, mergeMap, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  form = new FormGroup({
    name: new FormControl()
  });

  product: Product | undefined;

  constructor(private service: ProductService, route: ActivatedRoute) {
    service.get(route.snapshot.params['id']).subscribe((value: Product) => {
      this.form.patchValue(value);
      this.product = value;
    });
  }

  async save() {
    const product = await firstValueFrom(this.service.edit({...this.product, ...this.form.value} as Product));
    console.log("Edited product:", product);
  }
}
