import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  category: Category[]=[];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService:CategoriesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories();
    this.authService.user$
    .subscribe(
      data => {
        this.profile = data;
      }
     );
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    //john@mail.com changeme
    this.authService.loginAndGet('admin@mail.com', 'admin123')
    .subscribe(user => {
      this.router.navigate(['/profile']);
      //this.profile = user;
    });
  }

  getAllCategories(){
    this.categoriesService.getAll().subscribe(
      data=>{
        this.category = data;
      }
    );
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
