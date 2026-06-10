export default function BlogPage() {
  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-10 xl:px-20">
        <div className="text-center mb-16 flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold">Blog</h2>
          <p className="text-second-text">
            Read our latest articles and tips
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white flex flex-col">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <img className="text-gray-500 text-sm" src="unsplash_1.png"/>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex gap-3 text-xs text-white">
                  <span>Google</span>
                  <span>Trending</span>
                </div>
                <h4 className="font-bold">Blog Post {item}</h4>
                <p className="text-second-text text-sm flex-1">
                  Read our latest article about products and lifestyle tips.
                </p>
                <div className="flex items-center gap-2 text-primary font-bold hover:opacity-80 cursor-pointer">
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
