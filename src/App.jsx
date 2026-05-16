import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import MainPage from "./pages/MainPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import PagesPage from "./pages/PagesPage";
import BlogPage from "./pages/BlogPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/productDetails/:id" component={ProductDetailsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/pages" component={PagesPage} />
          <Route path="/blog" component={BlogPage} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
