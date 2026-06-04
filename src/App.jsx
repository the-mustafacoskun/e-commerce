import { Switch, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import MainPage from "./pages/MainPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import PagesPage from "./pages/PagesPage";
import BlogPage from "./pages/BlogPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUser, verifyUser } from "./store/actions/clientActions";
import { fetchCategories } from "./store/actions/productActions";
import Filter from "./components/Filter";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import CreateOrderPage from "./pages/CreateOrderPage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import PreviousOrders from "./pages/PreviousOrders";

function App() {
  const dispatch = useDispatch();
  const isAuthLoading = useSelector((store)=>store.client.isAuthLoading);
  useEffect(() => {
    
     dispatch(fetchCategories());
    
    if (localStorage.getItem("token")) {
       dispatch(verifyUser());
    }else {
      dispatch(setUser({}))
    }
   
  }, [dispatch]);

  if(isAuthLoading){
  return (
     <div className="flex flex-col items-center justify-center min-h-75 w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600" />
          <p className="text-gray-500 mt-4 font-medium animate-pulse">
            Uygulama yükleniyor, lütfen bekleyin...
          </p>
        </div>
  );
  }
  return (
    <MainLayout>
      <Switch>
        
        <Route
          exact
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          component={ProductDetailsPage}
        />
        <Route path="/shop/:gender?/:categoryName?/:categoryId?" component={ShopPage} />
        
        <Route
          exact
          path="/products/:productId"
          component={ProductDetailsPage}
        />
        <Route path='/create-order' >
        {localStorage.getItem("token")?(<CreateOrderPage/>):(<Redirect to={{pathname:"/login",state:{referrer:'/create-order'}}}/>)}
        </Route>
         <Route path='/previous-orders' >
        {localStorage.getItem("token")?(<PreviousOrders/>):(<Redirect to={{pathname:"/login",state:{referrer:'/previous-orders'}}}/>)}
        </Route>
        <Route path = "/cart" component={ShoppingCartPage}/>
        <Route path='/filter' component={Filter}/>
        <Route path="/contact" component={ContactPage} />
        <Route path="/pages" component={PagesPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/team" component={TeamPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LoginPage} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </MainLayout>
  );
}

export default App;
