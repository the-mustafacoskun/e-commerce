import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAddress,
  fetchCreditCards,
  fetchUserAddress,
} from "../store/actions/clientActions";
import { submitOrder } from "../store/actions/shoppingCartActions";  // 🔧 shoppingCartActions'ten import et
import { CircleAlert, Plus, Smartphone, Trash, UserRound } from "lucide-react";
import CheckBox from "../components/generalElements/CheckBox";
import { AddressForm } from "../components/CreateOrderComponents/AddressForm";
import AddCreditCard from "../components/CreateOrderComponents/AddCreditCard";
import { MyCreditCard } from "../components/CreateOrderComponents/CreditCard";
import { ShieldCheck } from "lucide-react";
import SummaryOrder from "../components/CreateOrderComponents/SummaryOrder";
import { useLocation } from "react-router-dom";

function CreateOrderPage() {
  const dispatch = useDispatch();
  const userAddresses = useSelector((store) => store.client.addressList);
  const cartProducts = useSelector((store) => store.shoppingCart.cart);
  const location = useLocation();

  const totalCartPrice = Number(
    cartProducts
      .reduce(
        (total, item) =>
          item.checked === true
            ? total + item.product.price * item.count
            : total,
        0,
      )
      .toFixed(2),
  );

  
  const state = location.state || {};
  const {
    sumPrice = totalCartPrice + 10,
    cargoprice = 10,
    discountPrice = 0,
  } = state;
  const [activeTab, setActiveTab] = useState("address");
  const [sameBillAddress, setSameBillAddress] = useState(true);
  const [newAddressIsOpen, setNewAddressIsOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addNewCard, setAddNewCard] = useState(false);
  const [securePayment, setSecurePayment] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const creditCards = useSelector((store) => store.client.creditCards);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCreditCard, setSelectedCreditCard] = useState(null);
  const [orderResult, setOrderResult] = useState(null);
  const [cardCCV, setCardCCV] = useState("");

  useEffect(() => {
    dispatch(fetchUserAddress());
    dispatch(fetchCreditCards());
  }, [dispatch]);

  const handleCardSelect =(card)=>{
    if(selectedCardId===card.id){
      setSelectedCardId(null);
      setSelectedCreditCard(null);
    }else{
      setSelectedCardId(card.id);
      setSelectedCreditCard(card);
    }
  }
  
  // Sipariş gönderme fonksiyonu
  const handleSubmitOrder = () => {
   
    if (!selectedAddress?.id) {
      alert("Lütfen teslimat adresini seçiniz");
      return;
    }
    
    
    if (!selectedCreditCard?.id) {
      alert(" Lütfen ödeme kartını seçiniz");
      return;
    }
    
   
    if (!cardCCV || cardCCV.length < 3) {
      alert("Lütfen geçerli bir CVC giriniz");
      return;
    }
    
    
    const selectedProducts = cartProducts.filter(item => item.checked === true);
    if (selectedProducts.length === 0) {
      alert("Lütfen en az bir ürün seçiniz");
      return;
    }
    
    
    const orderPayload = {
      // Teslimat Adresi
      address_id: selectedAddress.id,
      
      
      order_date: new Date().toISOString(),
      
      // Kredi Kartı Bilgileri
      card_no: selectedCreditCard.card_no,
      card_name: selectedCreditCard.name_on_card,
      card_expire_month: selectedCreditCard.expire_month,
      card_expire_year: selectedCreditCard.expire_year,
      card_ccv: parseInt(cardCCV),  
      
      // Fiyat
      price: sumPrice,
      
      // Seçili Ürünler
      products: selectedProducts.map(item => ({
        product_id: item.product.id,
        count: item.count,
        detail: item.product.description  
      }))
    };
    
    
    dispatch(submitOrder(orderPayload,(orderData) => setOrderResult(orderData)));
  }
  if (orderResult) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      
      <h2>Siparişiniz Başarıyla Alındı!</h2>
      <p>Sipariş Numarası: #{orderResult.id}</p>
      <p>Ödenen Tutar: {orderResult.price}$</p>
    </div>
  );
}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] min-h-screen bg-gray-50">
      <div className="p-6 md:p-10  w-full justify-self-center">
        {/* Üst Sekmeler (Tab Menü) */}
        <div className="flex justify-center cursor-pointer border border-gray-200 rounded-lg bg-white overflow-hidden shadow-xs">
          {/* Adres Sekmesi */}
          <div
            onClick={() => setActiveTab("address")}
            className={`flex-1 p-4 transition-all text-center md:text-left ${
              activeTab === "address"
                ? "border-b-4 bg-white border-b-alert font-bold"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <h4
              className={`text-base ${activeTab === "address" ? "text-alert-text" : "text-gray-800"}`}
            >
              Adres Bilgileri
            </h4>
            {activeTab === "address" &&
              userAddresses &&
              userAddresses.length > 0 && (
                <div className="mt-2 text-xs text-gray-500 hidden md:block">
                  <span className="font-semibold text-gray-700">
                    {userAddresses[0].title}:
                  </span>{" "}
                  {userAddresses[0].neighborhood}, {userAddresses[0].district} /{" "}
                  {userAddresses[0].city}
                </div>
              )}
          </div>

          {/* Ödeme Sekmesi */}
          <div
            onClick={() => setActiveTab("payment")}
            className={`flex-1 p-4 transition-all text-center md:text-left ${
              activeTab === "payment"
                ? "border-b-4 bg-white border-b-alert font-bold"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <h4
              className={`text-base ${activeTab === "payment" ? "text-alert-text" : "text-gray-800"}`}
            >
              Ödeme Seçenekleri
            </h4>
          </div>
        </div>

        {/* Uyarı Banner'ı */}
        <div className="flex gap-3 mt-6 p-4 border border-blue-100 bg-blue-50/50 rounded-lg text-sm text-gray-600">
          <CircleAlert className="text-blue-500 shrink-0 w-5 h-5 scale-y-[-1]" />
          {activeTab === "address" ? (
            <p>
              Kurumsal faturalı alışveriş yapmak için "Faturamı Aynı Adrese
              Gönder" tikini kaldırın ve Fatura adresi olarak kayıtlı Kurumsal
              Fatura adresinizi seçin.
            </p>
          ) : (
            <p>
              Kart ile ödemeyi seçtiniz. Banka veya kredi kartı kullanarak güven
              ile ödeme yapabilirsiniz
            </p>
          )}
        </div>

        {/* Değişen İçerik Alanı */}
        <div className="mt-6 p-6 border border-gray-200 bg-white rounded-lg shadow-xs">
          {activeTab === "address" && (
            <div className="w-full flex flex-col">
              <div className="ml-auto mb-4">
                <CheckBox
                  text="Faturamı Aynı Adrese Gönder"
                  value={sameBillAddress}
                  setValue={setSameBillAddress}
                />
              </div>

              {/* Adres Kartları  */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Teslimat Adresi Kolonu */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Teslimat Adresi
                  </h3>

                  {/* Yeni Adres Ekleme Butonu */}
                  <div
                    onClick={() => {
                      setEditingAddress(null);
                      setNewAddressIsOpen(!newAddressIsOpen);
                    }}
                    className="flex flex-col gap-2 justify-center items-center p-6 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl min-h-37.5 cursor-pointer transition-colors mb-4"
                  >
                    <Plus className="text-alert" strokeWidth={3} />
                    <h6 className="font-semibold text-gray-700">
                      Yeni Adres Ekle
                    </h6>
                  </div>

                  {userAddresses.map((address) => (
                    <div
                      key={address.id + address.city}
                      className="border border-gray-200 rounded-xl p-4 shadow-2xs mb-4 bg-white"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <input
                            className="accent-alert cursor-pointer w-4 h-4"
                            type="radio"
                            name="delivery_address"
                            checked={selectedAddress?.id === address.id}
                            onChange={() => setSelectedAddress(address)}
                          />
                          <h5 className="font-bold text-gray-800">
                            {address.title}
                          </h5>
                        </div>
                        <button
                          onClick={() => {
                            setNewAddressIsOpen(!newAddressIsOpen);
                            setEditingAddress(address);
                          }}
                          className="text-xs text-gray-500 border-b border-gray-400 hover:text-black transition-colors"
                        >
                          Düzenle
                        </button>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between text-xs font-medium text-gray-700">
                          <span className="flex items-center gap-1">
                            <UserRound className="w-4 h-4 text-gray-400" />
                            {address.name} {address.surname}
                          </span>
                          <span className="flex items-center gap-1">
                            <Smartphone className="w-4 h-4 text-gray-400" />
                            {address.phone}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed border-t border-gray-100 pt-2">
                          {address.neighborhood}, {address.district} /{" "}
                          {address.city}
                          <br />
                          <span className="text-gray-400">
                            {address.address}
                          </span>
                        </p>
                        <div className="flex justify-end pt-2">
                          <Trash
                            onClick={() =>
                              dispatch(deleteUserAddress(address.id))
                            }
                            className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fatura Adresi Kolonu */}
                {!sameBillAddress && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Fatura Adresi
                    </h3>
                    {userAddresses.map((address) => (
                      <div
                        key={address.id + address.city}
                        className="border border-gray-200 rounded-xl p-4 shadow-2xs mb-4 bg-white"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <input
                              className="accent-alert cursor-pointer w-4 h-4"
                              type="radio"
                              name="billing_address"
                            />
                            <h5 className="font-bold text-gray-800">
                              {address.title}
                            </h5>
                          </div>
                          <button
                            onClick={() => {
                              setNewAddressIsOpen(!newAddressIsOpen);
                              setEditingAddress(address);
                            }}
                            className="text-xs text-gray-500 border-b border-gray-400 hover:text-black transition-colors"
                          >
                            Düzenle
                          </button>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between text-xs font-medium text-gray-700">
                            <span className="flex items-center gap-1">
                              <UserRound className="w-4 h-4 text-gray-400" />
                              {address.name} {address.surname}
                            </span>
                            <span className="flex items-center gap-1">
                              <Smartphone className="w-4 h-4 text-gray-400" />
                              {address.phone}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed border-t border-gray-100 pt-2">
                            {address.neighborhood}, {address.district} /{" "}
                            {address.city}
                            <br />
                            <span className="text-gray-400">
                              {address.address}
                            </span>
                          </p>
                          <div className="flex justify-end pt-2">
                            <Trash
                              onClick={() =>
                                dispatch(deleteUserAddress(address.id))
                              }
                              className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ödeme Yöntemi Seçin
              </h3>
              <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl">
                {/* Sol Kısım: Kartlar */}
                <div className="flex-5">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">
                    <h5 className="font-semibold text-gray-700">
                      Kart Bilgileri
                    </h5>
                    <h6
                      onClick={() => setAddNewCard(!addNewCard)}
                      className="text-xs text-blue-500 font-medium hover:underline cursor-pointer"
                    >
                      {addNewCard ? "Kapat ×" : "Başka bir Kart ile Ödeme Yap"}
                    </h6>
                  </div>
                  {addNewCard && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <AddCreditCard
                        key={selectedCardId || "new"}
                        selectedCardId={selectedCardId}
                        setSelectedCardId={setSelectedCardId}
                      />
                    </div>
                  )}

                  {/* Kredi Kartlarının Yan Yana  Dizilimi  */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-115 overflow-y-auto pr-2 w-full">
                    {" "}
                    {creditCards.map((card) => {
                      // Her kart için tamamen benzersiz bir id ihtiyaç var

                      return (
                        <div
                          key={card.id}
                          className="shrink-0 w-80 flex flex-col"
                        >
                          {/* Label ve Input Alanı */}
                          <div className="flex items-center gap-2 mb-3 h-6 w-full">
                            <div>
                              <label className=" flex items-center cursor-pointer  gap-3 select-none">
                                <input
                                  type="checkbox"
                                  value={card.id}
                                  checked={selectedCardId === card.id}
                                  onChange={() => handleCardSelect(card)}
                                  className="sr-only"
                                />
                                <div
                                  className={`w-5 h-5 border rounded-full flex items-center justify-center transition-colors
                  ${selectedCardId === card.id ? "bg-primary border-alert text-white" : "border-gray-300 bg-white"}`}
                                >
                                  {selectedCardId && (
                                    <span className="text-white text-[12px] font-black leading-none select-none">
                                      ✓
                                    </span>
                                  )}
                                </div>
                                {card.name_on_card}
                              </label>
                            </div>
                          </div>

                          {/* Kredi Kartı Görseli */}
                          <MyCreditCard cardInfo={card} />
                        </div>
                      );
                    })}
                  </div>
                  {creditCards.length > 0 && (
                    <div className="flex items-center mt-4 gap-2">
                      <CheckBox
                        text=""
                        value={securePayment}
                        setValue={setSecurePayment}
                      />
                      <span className="flex">
                        <ShieldCheck fill="black" className="text-white" />
                        3D Secure ile ödemek istiyorum
                      </span>
                    </div>
                  )}
                  
                  {/* 🔧 CVC/CVV Giriş Alanı */}
                  {selectedCardId !== null && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <label className="text-sm font-semibold text-gray-700 block mb-2">
                        CVC/CVV Kodu
                      </label>
                      <input
                        type="text"
                        maxLength="4"
                        placeholder="Kartın arkasındaki 3-4 haneli kod"
                        value={cardCCV}
                        onChange={(e) => {
                          // 🔧 Sadece sayı girmesine izin ver
                          const onlyNumbers = e.target.value.replace(/[^\d]/g, "");
                          setCardCCV(onlyNumbers);
                        }}
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        💡 CVC kodu kartın arkasında bulunan 3-4 haneli koddur.
                      </p>
                    </div>
                  )}
                </div>

                {/* Sağ Kısım: Taksit Seçenekleri */}
                <div className="flex-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                  <h5 className="font-semibold text-gray-700 mb-3">
                    Taksit Seçenekleri
                  </h5>
                  {selectedCardId !== null && (
                    <div className="text-sm border border-gray-200 rounded-xl shadow-xs">
                      {/* Header */}
                      <div className="flex border-b border-gray-200 text-xs font-semibold text-gray-500 bg-gray-50">
                        <div className="flex-1 px-4 py-3 border-r border-gray-200 bg-gray-50">
                          <h5>Taksit Sayısı</h5>
                        </div>
                        <div className="flex-1 px-4 py-3 text-right bg-gray-50">
                          <h5>Aylık Ödeme</h5>
                        </div>
                      </div>

                      <div className="flex hover:bg-gray-50/50 transition-colors">
                        <div className="flex-1 flex items-center gap-3 px-4 py-3 border-r border-gray-200 bg-white">
                          <input
                            type="radio"
                            name="taksit"
                            id="tekcekim"
                            className="accent-alert cursor-pointer w-4 h-4 shrink-0"
                          />
                          <label
                            htmlFor="tekcekim"
                            className="font-semibold text-gray-800 cursor-pointer text-sm select-none"
                          >
                            Tek Çekim
                          </label>
                        </div>
                        <div className="flex-1 px-4 py-3 text-right bg-white font-bold text-alert-text">
                          <h5>{sumPrice}$</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SAĞ ALAN: Sipariş Özeti  */}

      <div className="border-t lg:border-t-0 lg:border-l border-gray-200 bg-white p-6 md:p-10 lg:sticky lg:top-0 lg:h-screen shadow-lg lg:shadow-none">
        
        <SummaryOrder
          discountPrice={discountPrice}
          cargoprice={cargoprice}
          sumPrice={sumPrice}
          totalCartPrice={totalCartPrice}
          selectedAddress={selectedAddress}
          selectedCreditCard={selectedCreditCard}
        
          onSubmitOrder={handleSubmitOrder}
        />
      </div>

      {/* Adres Formu */}
      {newAddressIsOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity backdrop-blur-2xs"
            onClick={() => setNewAddressIsOpen(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <AddressForm
              setNewAddressIsOpen={setNewAddressIsOpen}
              newAddressIsOpen={newAddressIsOpen}
              editingAddress={editingAddress}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CreateOrderPage;
