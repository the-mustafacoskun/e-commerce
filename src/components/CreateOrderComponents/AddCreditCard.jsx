import { ShieldCheck } from "lucide-react";
import CheckBox from "../generalElements/CheckBox";
import { useEffect, useState } from "react"; // useEffect'e gerek kalmadı, sildik
import { CustomDropdown } from "../generalElements/CustomDropDown";
import { useDispatch, useSelector } from "react-redux";
import { deleteCreditCard, fetchCreditCards, postCreditCard, updateCreditCard } from "../../store/actions/clientActions";

export default function AddCreditCard({ selectedCardId ,setSelectedCardId}) {
  const dispatch = useDispatch();
  const [securePayment, setSecurePayment] = useState(false);
  const [cvv, setCvv] = useState(""); 

  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear + i).toString()
  );

  const cards = useSelector((store) => store.client.creditCards);
  
  const card = cards.find((c) => c.id === selectedCardId);

  
  const [selectedMonth, setSelectedMonth] = useState(card?.expire_month?.toString() || "");
  const [selectedYear, setSelectedYear] = useState(card?.expire_year?.toString() || "");
  const [cardNumber, setCardNumber] = useState(card?.card_no || "");
  const [nameOnTheCard, setNameOnTheCard] = useState(card?.name_on_card || ""); 
  
  const cardInfo = {
    card_no: cardNumber,
    expire_month: selectedMonth,
    expire_year: selectedYear,
    name_on_card: nameOnTheCard,
  };
  const resetForm = () => {
    setSelectedCardId(null);
    setCardNumber("");
    setNameOnTheCard("");
    setSelectedYear("");
    setSelectedMonth("");
    setCvv("");
  };
  useEffect(() => {
  dispatch(fetchCreditCards());
}, [dispatch]); 

// 2. Seçili kart değiştikçe formu senkronize eden efekt

  const handleSave = () => {
    dispatch(postCreditCard(cardInfo));
    resetForm();
  };

  const handleUpdate =()=>{
    const updatedCardInfo = {
    id: selectedCardId, 
    card_no: cardNumber,
    expire_month: selectedMonth,
    expire_year: selectedYear,
    name_on_card: nameOnTheCard,
  };
  dispatch(updateCreditCard(updatedCardInfo));
   
  }
  const handleDelete = () => {
    if (selectedCardId) {
      dispatch(deleteCreditCard(selectedCardId));
    }
    resetForm();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Kart Üzerindeki İsim</label>
        <input
          minLength={4}
          value={nameOnTheCard}
          onChange={(e) => {
            // Sadece harf ve boşluk izni
            const cleanValue = e.target.value.replace(/[^A-Za-z çğıöşüÇĞİÖŞÜ]/g, "");
            setNameOnTheCard(cleanValue);
          }}
          className="w-full bg-gray-100 border border-gray-300 p-2 pl-4 h-12 rounded-lg focus:outline-none focus:border-alert transition-colors"
          placeholder="Kart Üzerindeki İsmi Giriniz"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Kart Numarası</label>
        <input
          value={cardNumber}
          minLength={16}
          maxLength={16}
          onChange={(e) => {
            // Sadece sayı izni
            const cleanValue = e.target.value.replace(/[^0-9]/g, "");
            setCardNumber(cleanValue);
          }}
          className="w-full bg-gray-100 border border-gray-300 p-2 pl-4 h-12 rounded-lg focus:outline-none focus:border-alert transition-colors"
          placeholder="0000 0000 0000 0000"
        />
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 block mb-2">Son Kullanma Tarihi</label>
          <div className="flex gap-2">
            <CustomDropdown
              options={months}
              value={selectedMonth}
              onChange={setSelectedMonth}
              placeholder="Ay"
            />
            <CustomDropdown
              options={years}
              value={selectedYear}
              onChange={setSelectedYear}
              placeholder="Yıl"
            />
          </div>
        </div>
        
        <div className="flex flex-col w-32">
          <label className="text-sm font-medium text-gray-700 mb-2">CVV</label>
          <input
            value={cvv}
            onChange={(e) => {
              const cleanValue = e.target.value.replace(/[^0-9]/g, "");
              setCvv(cleanValue);
            }}
            minLength={3}
            maxLength={4}
            className="w-full bg-gray-100 border border-gray-300 p-2 pl-4 h-12 rounded-lg focus:outline-none focus:border-alert transition-colors"
            placeholder="000"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <CheckBox text="" value={securePayment} setValue={setSecurePayment} />
        <span className="flex items-center gap-1 text-sm text-gray-600">
          <ShieldCheck fill="black" className="text-white w-5 h-5" />
          3D Secure ile ödemek istiyorum
        </span>
      </div>

      
      {!selectedCardId  ? (
        <button
          onClick={handleSave}
          className="bg-alert hover:bg-amber-700 text-white text-lg w-full py-3 rounded-lg font-semibold transition-colors mt-2"
        >
          + Yeni Kartı Kaydet
        </button>
      ) : (
        <div className="flex gap-4 mt-2">
          <button
            onClick={handleDelete}
            className="bg-red-50 hover:bg-red-100 text-red-600 text-lg w-full py-3 rounded-lg font-semibold transition-colors border border-red-200"
          >
            Sil
          </button>
          <button
          onClick={handleUpdate}
            className="bg-alert hover:bg-amber-700 text-white text-lg w-full py-3 rounded-lg font-semibold transition-colors"
          >
            Güncelle
          </button>
        </div>
      )}
    </div>
  );
}