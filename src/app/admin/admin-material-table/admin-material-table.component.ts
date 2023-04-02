import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from './../admin-services/products.service';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  title: string;
  category: number;
  price: number;
  imgurl: string;
  productId: string;
}

@Component({
  selector: 'app-admin-material-table',
  templateUrl: './admin-material-table.component.html',
  styleUrls: ['./admin-material-table.component.scss'],
})
export class AdminMaterialTableComponent implements AfterViewInit {
  // declearing vars
  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = [
    'title',
    'category',
    'price',
    'imgurl',
    'productId',
  ];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  // --------------------------
  // constructor
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _ProductsService: ProductsService
  ) {
    // get all products
    this._ProductsService.getproducts().subscribe({
      next: (response) => {
        if (response) {
          Object.entries(response).map((elm: any) => {
            let elmToPush: any = {
              title: elm[1].title,
              category: +elm[1].category,
              price: +elm[1].price,
              imgurl: elm[1].imgurl,
              productId: elm[0],
            };
            this.ELEMENT_DATA.push(elmToPush);
          });
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        } else {
          this.ELEMENT_DATA = [];
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
    });
  }
  // --------------------------
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // --------------------------
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  // --------------------------
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  // --------------------------
  // delete method
  deleteProduct(id: any) {
    let newArr: any[] = [];
    this._ProductsService.DeleteProduct(id).subscribe({
      next: (response) => {
        this.ELEMENT_DATA.map((elm: any, index: any) => {
          // get the soecific id and slice it from array
          if (elm.productId !== id) {
            newArr.push(elm);
          }
        });
        this.ELEMENT_DATA = newArr;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
    });
  }
  // -----------------------------
  // filter
  searchFilter: any[] = [];
  filter(search: any) {
    if (search.value != '' || null) {
      this.searchFilter = this.ELEMENT_DATA.filter((p) =>
        p.title.toLowerCase().includes(search.value.toLowerCase())
      );
      this.dataSource = new MatTableDataSource(this.searchFilter);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    } else {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }
}
