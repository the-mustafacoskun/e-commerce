import { BestSellerCard } from "../components/ProductDetailsComponents/BestSellerCard";
import { ProductDetailsCard } from "../components/ProductDetailsComponents/ProductDetailsCard";
import { BrandsFav } from "../components/ShopComponents/BrandsFav";

function ProductDetailsPage() {

  return (
    <div>
      <ProductDetailsCard />
      <BestSellerCard />
      <BrandsFav/>
    </div>
  );
}

export default ProductDetailsPage;
