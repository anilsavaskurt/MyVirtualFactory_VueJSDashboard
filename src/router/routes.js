import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
import NavbarLayout from "@/layout/dashboard/NavbarLayout.vue";
import Container from "../layout/Container.vue";

// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Typography from "@/pages/Typography.vue";
import Login from "../pages/Login.vue";
import Products from "../pages/Products.vue";
import WorkCenters from "../pages/WorkCenters.vue";
import AllOrders from "../pages/AllOrders.vue";
import MyOrders from "../pages/MyOrders.vue";
import OrderDetail from "../pages/OrderDetail.vue";
import MyOrderDetail from "../pages/MyOrderDetail.vue";
import Shopping from "../pages/Shopping.vue";
import Plan from "../pages/Plan.vue";
import Operations from "../pages/Operations.vue";
import Schedules from "../pages/Schedules.vue";
import Register from "../pages/Register.vue";

const routes = [
  {
    path: "/",
    component: Container,
    redirect: "/login",
    children: [
      {
        path: "login",
        name: "login",
        component: Login
      },
      {
        path: "/register",
        name: "register",
        component: Register
      },
      {
        path: "/dashboard",
        component: DashboardLayout,
        redirect: "/dashboard",
        children: [
          {
            path: "/dashboard",
            name: "dashboard",
            component: Dashboard
          },
          {
            path: "/stats",
            name: "stats",
            component: UserProfile
          },
          {
            path: "/notifications",
            name: "notifications",
            component: Notifications
          },
          {
            path: "/icons",
            name: "icons",
            component: Icons
          },
          {
            path: "/typography",
            name: "typography",
            component: Typography
          },
          {
            path: "/products",
            name: "products",
            component: Products
          },
          {
            path: "/workcenters",
            name: "workcenters",
            component: WorkCenters
          },
          {
            path: "/orders",
            name: "orders",
            component: AllOrders
          },
          {
            path: "/orderdetail/:id",
            name: "orderdetail",
            component: OrderDetail
          },
          {
            path: "/operations",
            name: "operations",
            component: Operations
          },
          {
            path: "/plan/:orderId",
            name: "plan",
            component: Plan
          },
          {
            path: "/schedules",
            name: "schedules",
            component: Schedules
          },

        ]
      },
      {
        path: "/home",
        component: NavbarLayout,
        redirect: "/home",
        children: [
          {
            path: "/home",
            name: "shopping",
            component: Shopping
          },
          {
            path: "/myorders",
            name: "my orders",
            component: MyOrders
          },
          {
            path: "/myorderdetail/:id",
            name: "myorderdetail",
            component: MyOrderDetail
          }
        ]
      }
    ]
  },

  { path: "*", component: NotFound }
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
