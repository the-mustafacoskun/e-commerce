import { useState } from "react";
import ProductRating from "./ProductRating";
import CheckBox from "../generalElements/CheckBox";
import ProductReviewCard from "./ProductReviewCard";
import { setRating } from "../../store/actions/productActions";
import { useDispatch } from "react-redux";

export default function ProductRewievForm({ product,onLocalRatingUpdate }) {
  const initialData = {
    message: "",
    name: "",
    email: "",
    rating: 0,
    saveChecked: false,
  };
  const [customerReview, setCustomerReview] = useState(initialData);
  const [allReview, setAllReview] = useState(() => {
    const savedReviews = localStorage.getItem("product_reviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
const dispatch =useDispatch();
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    setCustomerReview((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted Successfully", customerReview);
    const newCustomerReviewWithId = {
      ...customerReview,
      id: Date.now(),
      productId: product.id,
      createdAt: new Date().toLocaleDateString(),
    };
     dispatch(setRating(product.id,customerReview.rating))
      if (typeof onLocalRatingUpdate === "function") {
      onLocalRatingUpdate(customerReview.rating);
    }
    const updatedAllReviews = [...allReview, newCustomerReviewWithId];
    setAllReview(updatedAllReviews);
    localStorage.setItem("product_reviews", JSON.stringify(updatedAllReviews));
    setCustomerReview(initialData);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col items-center sm:items-start gap-6">
        <h3>Reviews</h3>
        <div className="flex gap-2 justify-center md:justify-between  flex-wrap">
          {allReview.filter((r) => r.productId === product?.id).length > 0 ? (
            allReview
              .filter((r) => r.productId === product.id)
              .map((review) => (
                <div key={review.id}>
                  <ProductReviewCard review={review}/>
                </div>
              ))
          ) : (
            <p>There are no reviews yet.</p>
          )}
        </div>

        <h3>Be the first to review for {product.name}</h3>
        <h4>Your Rating</h4>
        <ProductRating
          rating={customerReview.rating}
          onRatingChange={(newRating) =>
            handleChange({ target: { name: "rating", value: newRating } })
          }
        />
      </div>

      <h4>Your Review *</h4>
      <textarea
        name="message"
        value={customerReview.message}
        onChange={handleChange}
        placeholder="Message"
        rows={8}
        className="border w-full resize-none focus:outline-blue-200 border-gray-200 bg-gray-100 p-4 rounded-lg"
      />
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex flex-col flex-1 gap-3">
          <h6>Name *</h6>
          <input
            name="name"
            value={customerReview.name}
            onChange={handleChange}
            placeholder="Name*"
            className="w-full  focus:outline-blue-200  border-gray-200 bg-gray-100 p-3 rounded-lg  "
          />
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <h6>Email *</h6>
          <input
            name="email"
            value={customerReview.email}
            onChange={handleChange}
            placeholder="Email*"
            className="w-full  focus:outline-blue-200 border-gray-200 bg-gray-100 p-3 rounded-lg  "
          />
        </div>
      </div>

      <CheckBox
        text="Save my name, email, and website in this browser for the next time I comment."
        value={customerReview.saveChecked}
        setValue={(newValue) =>
          handleChange({
            target: { name: "saveChecked", value: newValue },
          })
        }
      />
      <button className="bg-primary py-4 px-8 text-white w-fit rounded-lg">
        Submit
      </button>
    </form>
  );
}
