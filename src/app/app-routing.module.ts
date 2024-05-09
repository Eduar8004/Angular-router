import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, PreloadingStrategy } from '@angular/router';
import { NotFoundComponent } from './website/pages/not-found/not-found.component';
import { CustomPreloadService } from './services/custom-preload.service';
import { QuicklinkStrategy,QuicklinkModule  } from 'ngx-quicklink'
import { AdminGuard } from './guards/admin.guard';




const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./website/website.module').then(m => m.WebsiteModule),
    data:{
      preload: true
    }
  },
  {
    path:'cms',
    canActivate:[AdminGuard],
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path:'**',component:NotFoundComponent
  },

];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes,{
    preloadingStrategy:QuicklinkStrategy
    //preloadingStrategy:PreloadAllModules
    //preloadingStrategy:CustomPreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
