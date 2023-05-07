import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;

  products: Observable<Product[]>

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'price', 'id', 'actions'];

  constructor(private service: ProductService, public userService: UserService) {
    this.products = service.getList().pipe(map(value => value as Product[]));
  }

  ngAfterViewInit(): void {
    this.table.dataSource = this.products;
    if (!this.userService.user) {
      this.displayedColumns.pop(); // Műveletek elrejtése, ha nincs bejelentkezve
    }
  }
}
