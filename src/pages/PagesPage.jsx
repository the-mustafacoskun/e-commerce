import { Link } from "react-router-dom";

export default function PagesPage() {
  return (
    <div className="w-full min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Pages</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Link to="/">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-12 hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-3xl font-bold mb-2">Home</h2>
              <p>Visit our main landing page</p>
            </div>
          </Link>

          <Link to="/shop">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-12 hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-3xl font-bold mb-2">Shop</h2>
              <p>Browse our product collection</p>
            </div>
          </Link>

          <Link to="/about">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-12 hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-3xl font-bold mb-2">About</h2>
              <p>Learn more about our company</p>
            </div>
          </Link>

          <Link to="/blog">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-12 hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-3xl font-bold mb-2">Blog</h2>
              <p>Read our latest articles</p>
            </div>
          </Link>

          <Link to="/contact">
            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-12 hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-3xl font-bold mb-2">Contact</h2>
              <p>Get in touch with us</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
