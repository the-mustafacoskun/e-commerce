import { Link } from "react-router-dom";

export default function PagesPage() {
  return (
    <div className="w-full py-20">
      <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-10 xl:px-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-16 text-center">All Pages</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          <Link to="/">
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col gap-4">
              <div className="w-full h-40 bg-light-gray-1 rounded flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text mb-2">Home</h3>
                <p className="text-second-text">Visit our main landing page</p>
              </div>
            </div>
          </Link>

          <Link to="/shop">
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col gap-4">
              <div className="w-full h-40 bg-light-gray-1 rounded flex items-center justify-center">
                <span className="text-2xl">🛒</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text mb-2">Shop</h3>
                <p className="text-second-text">Browse our product collection</p>
              </div>
            </div>
          </Link>

          <Link to="/about">
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col gap-4">
              <div className="w-full h-40 bg-light-gray-1 rounded flex items-center justify-center">
                <span className="text-2xl">ℹ️</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text mb-2">About</h3>
                <p className="text-second-text">Learn more about our company</p>
              </div>
            </div>
          </Link>

          <Link to="/blog">
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col gap-4">
              <div className="w-full h-40 bg-light-gray-1 rounded flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text mb-2">Blog</h3>
                <p className="text-second-text">Read our latest articles</p>
              </div>
            </div>
          </Link>

          <Link to="/contact">
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col gap-4">
              <div className="w-full h-40 bg-light-gray-1 rounded flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text mb-2">Contact</h3>
                <p className="text-second-text">Get in touch with us</p>
              </div>
            </div>
          </Link>

          <Link to="/team">
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col gap-4">
              <div className="w-full h-40 bg-light-gray-1 rounded flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text mb-2">Team</h3>
                <p className="text-second-text">Meet our amazing team</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
