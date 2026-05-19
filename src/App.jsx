import { BrowserRouter, Switch, Route } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/productDetails/:id"
            component={ProductDetailsPage}
          />
          <Route path="/contact" component={ContactPage} />
          <Route path="/pages" component={PagesPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/team" component={TeamPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/signup" component={SignUp} />
        </Switch>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
