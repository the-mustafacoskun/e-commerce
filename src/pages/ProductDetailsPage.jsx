import { BestSellerCard } from "../components/ProductDetailsComponents/BestSellerCard";
import { ProductDetailsCard } from "../components/ProductDetailsComponents/ProductDetailsCard";
import { BrandsFav } from "../components/ShopComponents/BrandsFav";

function ProductDetailsPage() {
  return (
    <div>
      <ProductDetailsCard />
      <div className="my-20 flex flex-col gap-12 px-10 sm:px-6 lg:px-10 xl:px-20 xl:mx-auto max-w-7xl mx-auto">
        <BestSellerCard />
      </div>
      <BrandsFav />
    </div>
  );
}

export default ProductDetailsPage;
