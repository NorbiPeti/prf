import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getList() {
    return this.http.get('/api/products')
  }

  edit(data: Product) {
    return this.http.patch('/api/products/' + data._id, data);
  }

  get(id: string) {
    return this.http.get('/api/products/' + id) as Observable<Product>;
  }
}
