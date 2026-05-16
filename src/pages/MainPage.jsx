import { BlogCard } from "../components/BlogCard";
import { Carousel } from "../components/Carousel";
import { Container } from "../components/Container";
import { HalfSubCategoryCard } from "../components/HalfSubCategoryCard";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { SubCategoryCard } from "../components/SubCategoryCard";

// MainPage.jsx
export default function MainPage() {
  return (
    <div className="w-full">
      <Hero />

      {/* Editor's Pick Başlık Bölümü */}
      <div className="flex flex-col items-center gap-2 mt-20 mb-12 px-4">
        <h3 className="font-bold text-2xl">EDITOR'S PICK</h3>
        <p className="text-second-text text-center">
          Problems trying to resolve the conflict between
        </p>
      </div>

      {/* Kartlar Bölümü: Mobilde alt alta, Tablette yanyana */}
      <div className="max-w-7xl  flex flex-col md:flex-row gap-6 mx-10 md:mx-45 items-stretch">
        {/* MEN - 1. Kolon */}
        <div className="flex-1">
          <SubCategoryCard bgImgUrl="/filter-1.png" title="MEN" />
        </div>

        {/* WOMEN - 2. Kolon */}
        <div className="flex-1">
          <SubCategoryCard bgImgUrl="/filter-2.png" title="WOMEN" />
        </div>

        {/* ACCESSORIES & KIDS - 3. Kolon */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex-1">
            <HalfSubCategoryCard bgImgUrl="/filter-3.png" title="ACCESSORIES" />
          </div>
          <div className="flex-1">
            <HalfSubCategoryCard bgImgUrl="/filter-4.png" title="KIDS" />
          </div>
        </div>
      </div>
      <div className="my-20 flex flex-col gap-12 mx-10 md:mx-45">
        <div className="flex flex-col text-center gap-4  ">
          <h4>Featured Products</h4>
          <h3>
            BESTSELLER
            <br className=" md:hidden" /> PRODUCTS
          </h3>
          <p>
            Problems trying to resolve the
            <br className="md:hidden" /> conflict between{" "}
          </p>
        </div>
        {/* Elemanları map etmeyi dene */}
        <div className="flex flex-wrap justify-center gap-7.5">
          <div className="w-full sm:w-[calc(50%-30px)] md:w-[calc(33.33%-30px)] lg:w-[calc(25%-30px)]">
            <ProductCard
              bgImgUrl="/fixed-height.png"
              title="Graphic Design"
              actualPrice="$16.48"
              salePrice="$6.48"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-30px)] md:w-[calc(33.33%-30px)] lg:w-[calc(25%-30px)]">
            <ProductCard
              bgImgUrl="/fixed-height (7).png"
              title="Graphic Design"
              actualPrice="$16.48"
              salePrice="$6.48"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-30px)] md:w-[calc(33.33%-30px)] lg:w-[calc(25%-30px)]">
            <ProductCard
              bgImgUrl="/fixed-height (8).png"
              title="Graphic Design"
              actualPrice="$16.48"
              salePrice="$6.48"
            />
          </div>

          <div className="w-full sm:w-[calc(50%-30px)] md:w-[calc(33.33%-30px)] lg:w-[calc(25%-30px)]">
            <ProductCard
              bgImgUrl="/fixed-height (9).png"
              title="Graphic Design"
              actualPrice="$16.48"
              salePrice="$6.48"
            />
          </div>
          <div className="w-full sm:w-[calc(50%-30px)] md:w-[calc(33.33%-30px)] lg:w-[calc(25%-30px)]">
            <ProductCard
              bgImgUrl="/fixed-height (10).png"
              title="Graphic Design"
              actualPrice="$16.48"
              salePrice="$6.48"
            />
          </div>
          <div className="w-full sm:w-[calc(50%-30px)] md:w-[calc(33.33%-30px)] lg:w-[calc(25%-30px)]">
            <ProductCard
              bgImgUrl="/fixed-height (11).png"
              title="Graphic Design"
              actualPrice="$16.48"
              salePrice="$6.48"
            />
          </div>
          <div className="w-full sm:w-[calc(50%-30px)] md:w-[calc(33.33%-30px)] lg:w-[calc(25%-30px)]">
            <ProductCard
              bgImgUrl="/fixed-height (12).png"
              title="Graphic Design"
              actualPrice="$16.48"
              salePrice="$6.48"
            />
          </div>
          <div className="w-full sm:w-[calc(50%-30px)] md:w-[calc(33.33%-30px)] lg:w-[calc(25%-30px)]">
            <ProductCard
              bgImgUrl="/fixed-height (8).png"
              title="Graphic Design"
              actualPrice="$16.48"
              salePrice="$6.48"
            />
          </div>
        </div>
      </div>
      <div>
        <Carousel />
      </div>
      <div className="mt-8">
        <Container />
      </div>
      <div className="my-20 md:my-28">
        <div className="flex flex-col justify-center items-center text-center mx-19 mb-20  gap-2.5">
          <h6 className="text-primary-text">Practice Advice</h6>
          <h2>Featured Products</h2>
          <p className="text-second-text">
            Problems trying to resolve the conflict between<br className="hidden md:block"/> the two major realms
            of Classical physics: Newtonian mechanics
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-7.5 md:gap-2.5 md:mx-45">
          <BlogCard bgImgUrl='/unsplash_1.png' />
          <BlogCard bgImgUrl='/unsplash_2.png' />
          <BlogCard bgImgUrl='/unsplash_3.png'/>
        </div>
      </div>
    </div>
  );
}
