import { ShieldCheck } from "lucide-react";
import CheckBox from "../generalElements/CheckBox";
import { useState } from "react";
import { CustomDropdown } from "../generalElements/CustomDropDown";
import { useDispatch } from "react-redux";
import { postCreditCard } from "../../store/actions/clientActions";

export default function AddCreditCard() {
  const [securePayment, setSecurePayment] = useState(false);
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear + i).toString(),
  );
  const dispatch=useDispatch();
  // State'ler
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [cvv,setCvv]=useState(null)
  const [cardNumber,setCardNumber] = useState(null);
  const [nameOnTheCard,setNameOnTheCard] = useState(null)
  const cardInfo ={card_no:cardNumber,expire_month:selectedMonth,expire_year:selectedYear,name_on_card:nameOnTheCard}
  const handleSave =()=>{
    dispatch(postCreditCard(cardInfo))
  }
  return (
    <div className="flex flex-col gap-4 max-w-100">
      <div className="flex justify-between ">
        <h5>Kart Bilgileri</h5>
        <h6 className="border-b  border-b-gray-300 hover:cursor-pointer">
          Kayıtlı kartımla ödeme yap
        </h6>
      </div>
      <div className="flex flex-col gap-2">
        <label>Kart Üzerindeki İsim</label>
        <input
        minLength={4}
        value={nameOnTheCard}
        
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^A-Z a-z çğıöşü ÇĞİÖŞÜ]/g, "");
            setNameOnTheCard(e.target.value)
          }}
          className="w-full bg-gray-300 p-2 pl-4 h-12 rounded-lg"
        ></input>
      </div>
      <div className="flex flex-col gap-2">
        <label>Kart Numarası</label>
        <input
        value={cardNumber}
        minLength={13}
        maxLength={19}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
            setCardNumber(e.target.value)
          }}
          className="w-full bg-gray-300 p-2 pl-4 h-12 rounded-lg"
        ></input>
      </div>
      <div className="flex justify-between">
        <div>
          <h6>Son Kullanma Tarihi</h6>
          <div className="flex gap-4">
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
        <div className="flex flex-col">
          <label>CVV</label>
          <input
          value={cvv}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              setCvv(e.target.value)
            }}
            minLength={3}
            maxLength={4}
            className="w-30 bg-gray-300 p-2 pl-4 h-12 rounded-lg"
          ></input>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <CheckBox text="" value={securePayment} setValue={setSecurePayment} />
        <span className="flex">
          <ShieldCheck fill="black" className="text-white" />
          3D Secure ile ödemek istiyorum
        </span>
      </div>
       <button onClick={handleSave} className="bg-alert hover:bg-amber-700 text-light-text text-xl w-full py-3 rounded-lg ">Kaydet</button>
    </div>
  );
}
