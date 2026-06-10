import { useState } from "react";
import ProductRating from "./ProductRating";
import CheckBox from "../generalElements/CheckBox";

export default function ProductRewievForm({ product }) {
  const [userRating, setUserRating] = useState(0);
  const [value, setValue] = useState(false);
  const handleSubmit =(e)=>{
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <h3>Reviews</h3>
        <p>There are no reviews yet.</p>
        <h3>Be the first to review for {product.name}</h3>
        <h4>Your Rating</h4>
        <ProductRating
          rating={userRating}
          onRatingChange={(newRating) => setUserRating(newRating)}
        />
      </div>

      <h4>Your Review *</h4>
      <textarea
        placeholder="Message"
        rows={8}
        className="border w-full resize-none focus:outline-blue-200 border-gray-200 bg-gray-100 p-4 rounded-lg"
      />
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex flex-col flex-1 gap-3">
          <h6>Name *</h6>
          <input
            placeholder="Name*"
            className="w-full  focus:outline-blue-200  border-gray-200 bg-gray-100 p-3 rounded-lg  "
          />
        </div>
        <div className="flex flex-col flex-1 gap-3">
          <h6>Email *</h6>
          <input
            placeholder="Email*"
            className="w-full  focus:outline-blue-200 border-gray-200 bg-gray-100 p-3 rounded-lg  "
          />
        </div>
      </div>

      <CheckBox
        text="Save my name, email, and website in this browser for the next time I comment.
"
        value={value}
        setValue={setValue}
      />
      <button  className="bg-primary py-4 px-8 text-white w-fit rounded-lg">
        Submit
      </button>
    </form>
  );
}
