import ProductRating from "./ProductRating";

export default function ProductReviewCard({ review }) {
  const maskName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => {
        if (word.length <= 1) return word;
        return word.substring(0, 1) + "*".repeat(word.length - 1);
      })
      .join(" ");
  };
  const maskEmail = (email) => {
    if (!email) return "";
    return email
      .split("@")
      .map((word) => {
        return word.substring(0, 1) + "*".repeat(word.length - 1);
      })
      .join("@");
  };
  return (
    <div className="flex flex-col gap-4 border border-orange-200 rounded-xl p-3 w-90 h-50">
      <div className="flex justify-between ">
        <ProductRating rating={review.rating} />{" "}
        <h6>{maskEmail(review.email)}</h6>
      </div>
      <h6>{maskName(review.name)}</h6>
      <h5 className="w-full line-clamp-2 wrap-break-word text-gray-600">
        {review.message}
      </h5>
      <span className="self-end">{review.createdAt}</span>
    </div>
  );
}
