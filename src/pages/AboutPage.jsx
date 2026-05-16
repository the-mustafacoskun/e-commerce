export default function AboutPage() {
  return (
    <div className="w-full min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Welcome to Bandage, your ultimate destination for quality products and exceptional service.
            </p>
            <p className="text-gray-600">
              We are committed to providing the best shopping experience for our customers worldwide.
            </p>
          </div>
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
            <p className="text-gray-500">About Us Image Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
