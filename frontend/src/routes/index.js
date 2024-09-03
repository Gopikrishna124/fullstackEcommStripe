import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login
 from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoriesPage from '../pages/CategoriesPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import Cart from '../pages/Cart';
import SearchProductpage from '../pages/SearchProductpage';
import SuccessPage from '../pages/SuccessPage';
import CancelPage from '../pages/CancelPage';
import OrdersPage from '../pages/OrdersPage';
import AdminAllOrders from '../pages/AdminAllOrders';

const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
             path:'forgot-password',
             element:<ForgotPassword/>
            },
            {
                path:'sign-up',
                element:<SignUp/>
            },
            {
                path:'categories-product',
                element:<CategoriesPage/>

            },
            {
            
                path:'product-details/:id',
                element:<ProductDetailsPage/> ,
               
                
            },
            {
              path:'cart',
              element:<Cart/>
            },
            {
              path:'search',
              element:<SearchProductpage/>
            },
            {
                path:'success',
                element:<SuccessPage/>
            },
            {
                path:'cancel',
                element:<CancelPage/>
            },
            {
               path:'order',
               element:<OrdersPage/>
            },
            {
              path:'admin-panel',
              element:<AdminPanel/>,
              children:[
                
                    {
                        path:'all-users',
                        element:<AllUsers/>
                    },
                    
                    {
                        path:'All-products',
                        element:<AllProducts/>
                    },
                    {
                       path:'All-orders',
                       element:<AdminAllOrders/>
                    }
                
              ]
            }
        ]
    }
])

export default router