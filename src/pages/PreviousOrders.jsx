import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../store/actions/shoppingCartActions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUserAddress } from "../store/actions/clientActions";

function PreviousOrders() {
  const orders = useSelector((store) => store.shoppingCart.orders);
  
  const address = useSelector((store) => store.client.addressList);
  const dispatch = useDispatch();
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchUserAddress());
  }, [dispatch]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900">
        Siparişlerim
      </h2>

      <div className="grid grid-cols-4 bg-gray-200 p-4 rounded-t-xl font-bold text-gray-600 shadow-sm">
        <div>Sipariş No</div>
        <div>Tarih</div>
        <div>Tutar</div>
        <div className="text-right">Detay</div>
      </div>

      <div className="border-x border-b border-gray-200 rounded-b-xl bg-white shadow-sm">
        {orders.map((order) => (
          <div key={order.id} className="border-b border-gray-100">
            <div
              onClick={() => toggleExpand(order.id)}
              className="grid grid-cols-4 p-5 items-center hover:bg-blue-50 cursor-pointer transition-all"
            >
              <div className="font-bold text-primary-text">#{order.id}</div>
              <div className="text-gray-600 text-sm -ml-4 sm:ml-0 sm:text-lg">
                {new Date(order.order_date).toLocaleDateString("tr-TR")}
              </div>
              <div className="font-semibold text-alert-text">
                {order.price.toFixed(2)} TL
              </div>
              <div className="text-right text-sm text-gray-400 font-medium">
                {expandedId === order.id ? "▲ Gizle" : "▼ Göster"}
              </div>
            </div>

            {expandedId === order.id && (
              <div className="p-6 bg-white border-t border-gray-100 animate-in fade-in duration-300">
                <h4 className="font-bold text-gray-800 mb-4">
                  Ürünler ({order.products.length})
                </h4>
                
                {(() => {
                  const foundAddress = address.find(
                    (a) => Number(a.id) === Number(order.address_id),
                  );
                  return foundAddress ? (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
                      <strong>Teslimat Adresi:</strong> {foundAddress.title} -{" "}
                      {foundAddress.address}, {foundAddress.city}
                    </div>
                  ) : (
                    <div className="mb-4 text-sm text-gray-400">
                      Adres bilgisi bulunamadı.
                    </div>
                  );
                })()}
                <div className="grid gap-3">
                  {order.products.map((product) => {
                   
                    return (
                      <Link
                        key={`${order.id}-${product.id}`}
                        to={`/products/${product?.id}`}
                      >
                        
                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <img
                            src={product?.images?.[0]?.url}
                            className="w-16 h-16 object-cover rounded-md"
                            alt={product.name}
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              Adet: {product.count}
                            </p>
                          </div>
                          <div className="font-bold text-gray-900">
                            {(product.price * product.count).toFixed(2)} TL
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviousOrders;
