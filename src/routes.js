/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Dashboard,
  Icons,
  User,
  ListCatHoodie,
  TambahCatHoodie,
  EditCatHoodie,
  ListHoodie,
  TambahHoodie,
} from "./views";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/category-hoodie",
    name: "Master Category Hoodie",
    icon: "nc-icon nc-world-2",
    component: ListCatHoodie,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/category-hoodie/tambah",
    name: "Tambah Category Hoodie",
    component: TambahCatHoodie,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/category-hoodie/edit/:id",
    name: "Edit Category Hoodie",
    component: EditCatHoodie,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/hoodie",
    name: "Master Hoodie",
    icon: "nc-icon nc-cart-simple",
    component: ListHoodie,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/hoodie/tambah",
    name: "Tambah Hoodie",
    component: TambahHoodie,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: User,
    layout: "/admin",
  },
];
export default routes;
