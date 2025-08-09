import { Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { authGuard } from './shared/guard/auth.guard';
import { SignupComponent } from './public/signup/signup.component';
import { AboutComponent } from './public/home/about/about.component';
import { AddNewsComponent } from './public/add-news/add-news.component';
import { NewsComponent } from './public/home/news/news.component';
import { AllNewsComponent } from './public/all-news/all-news.component';
import { ContactUsComponent } from './public/home/contact-us/contact-us.component';
import { GalleryComponent } from './public/home/gallery/gallery.component';
import { AllGalleryComponent } from './public/all-gallery/all-gallery.component';
import { MembershipComponent } from './public/membership/membership.component';
import { CategoriesComponent } from './public/categories/categories.component';
import { AddCategoryComponent } from './public/add-category/add-category.component';
import { AddImgToCategoryComponent } from './public/add-img-to-category/add-img-to-category.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent

    },
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'news',
        component: NewsComponent
    },

    {
        path: 'all-news',
        component: AllNewsComponent

    },
    {
        path: 'add-news',
        component: AddNewsComponent,
        canActivate: [authGuard]
    },

    {
        path: 'signup',
        component: SignupComponent
    }, {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'memberShip',
        component: MembershipComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },

    {
        path: 'contact-us',
        component: ContactUsComponent,
        canActivate: [authGuard]
    },

    {
        path: 'membership',
        component: SignupComponent
    },
    {
        path: 'categories',
        component: CategoriesComponent
    },
    {
        path: 'add-category',
        component: AddCategoryComponent,
        canActivate: [authGuard]
    },
    {
        path: 'categories/categories/:id',
        component: AllGalleryComponent
    },
    {
        path: 'gallery',
        component: GalleryComponent
    }, {
        path: 'all-gallery',
        component: CategoriesComponent
    },
    {
        path: 'add-img-to-category',
        component: AddImgToCategoryComponent,
        canActivate:[authGuard]
    }
];
