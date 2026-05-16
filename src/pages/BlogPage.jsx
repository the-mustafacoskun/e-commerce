export default function BlogPage() {
  return (
    <div className="w-full min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border rounded-lg overflow-hidden shadow-md">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <p className="text-gray-500">Blog Post {item} Image</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Blog Post {item}</h3>
                <p className="text-gray-600 mb-4">
                  Read our latest article about products and lifestyle tips.
                </p>
                <a href="#" className="text-primary font-bold hover:underline">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
