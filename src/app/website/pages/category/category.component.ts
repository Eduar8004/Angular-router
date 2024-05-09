
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { switchMap} from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryId : string | null= null;
  products: Product[] = [];
  limit = 10;
  offset = 0;
  constructor(private activatedRoute:ActivatedRoute,private productsService:ProductsService){

  }
  ngOnInit(): void {
    this.activatedRoute.paramMap
    .pipe(
      switchMap(params=>{
        this.categoryId=params.get('id');
        if(this.categoryId){
          return this.productsService.getbyCategory(this.categoryId,this.limit,this.offset)
        }
        return[];
      })
    )
    .subscribe((data) => {
        this.products= data;
    })
  }

}
