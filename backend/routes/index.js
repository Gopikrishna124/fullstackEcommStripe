const express=require('express')

const router=express.Router()
const userSignupController=require('../controllers/User/UserSignup').module
const userLoginController=require('../controllers/User/UserLogin').module
const UserdetailsController=require('../controllers/User/Userdetails').module
const authToken=require('../middleware/auth').module
const UserLogout=require('../controllers/User/UserLogout').module
const AllUsersController=require('../controllers/User/AllUsers').module
const UpdateUserController=require('../controllers/User/UpdateUser').module
const UploadProductController=require('../controllers/Product/UploadProduct').module
const GetAllProductsController=require('../controllers/Product/GetProduct').module
const EditProductController=require('../controllers/Product/EditProduct').module
const FetchMultipleProductByCategoryController=require('../controllers/Product/FetchMultipleProductByCategory').module
const getAllCategoriesController=require('../controllers/Product/getCategories').module
const SingleProductController=require('../controllers/Product/FetchSingleProductByCategory').module
const GetProductDetailsController=require('../controllers/Product/GetProductDetails').module
const AddToCartControllerController=require('../controllers/User/AddToCart').module
const CountCartItemsController=require('../controllers/User/CountCartItemsOfUser').module
const CartByUserIdController=require('../controllers/User/FetchingCartByUser').module
const UpadteCartByUserIdController=require('../controllers/Product/UpdatingProductQuantity').module
const DeleteCartByUserIdController=require('../controllers/Product/DeleteCartproductByUser').module
const SearchProductController=require('../controllers/Product/SearchProductByUser').module
const SortProductController=require('../controllers/Product/SortProduct').module
const PaymentController=require('../controllers/Order-Payment/PaymentController').module
const webHooks=require('../controllers/Order-Payment/WebHooks').module
const OrderController=require('../controllers/Order-Payment/OrderControllerByUserId').module
const AllOrdersController=require('../controllers/Order-Payment/AllOrdersController').module
const ForgotPasswordController=require('../controllers/User/ForgotPassword').module 



//user Routes
router.post('/signup',userSignupController)
router.post('/login',userLoginController)
router.get('/user-details',authToken,UserdetailsController)
router.get('/user-logout',UserLogout)

//admin panel 
router.get('/all-users',authToken,AllUsersController)
router.post('/update-user',authToken,UpdateUserController)

//product APIS//
router.post('/upload-product',authToken,UploadProductController)
router.get('/getall-products',authToken,GetAllProductsController)
router.post('/edit-product',EditProductController)
router.post('/product-details',GetProductDetailsController)



//filtering

router.post('/fetch-MultipleCategory',FetchMultipleProductByCategoryController)
router.get('/get-allCategories',getAllCategoriesController)
router.post('/fetch-Category',SingleProductController)

//Cart 

router.post('/addToCart',authToken,AddToCartControllerController)
router.get('/countCart',authToken,CountCartItemsController)
router.get('/cartByUser',authToken,CartByUserIdController)
router.post('/updateCartByUser',authToken,UpadteCartByUserIdController)
router.post('/deleteCartByUser',authToken,DeleteCartByUserIdController)

//searchProduct//
router.get('/searchProduct',SearchProductController)

//sorting
router.post('/sort',SortProductController)

//checkout 

router.post('/checkout',authToken,PaymentController)

//webhooks

router.post('/webhook',webHooks)

//order

router.get('/order',authToken,OrderController)

router.get('/All-orders',AllOrdersController)

//forgot-password

router.post('/forgot-password',ForgotPasswordController)

exports.module=router