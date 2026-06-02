import { Plus } from "lucide-react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SummaryBox({ totalCartPrice }) {
  const [discountIsOpen, setDiscountIsOpen] = useState(false);
  const [discountRate, setDiscountRate] = useState(0);
  
  
  const cargoprice = totalCartPrice > 0 ? 10 : 0;
  
  
  const discountPrice = Number(
    ((discountRate / 100) * totalCartPrice).toFixed(2),
  );
  
 
  const sumPrice = Number(
    (totalCartPrice + cargoprice - discountPrice).toFixed(2),
  );
  const history = useHistory();
  return (
    <div className="w-80 shrink-0 border flex flex-col gap-6 border-gray-200 rounded-md bg-light-bg p-4">
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-8">
        <h4>Sepet Özeti</h4>
        <div className="flex justify-between">
          <span>Ara Toplam</span>
          <span>{totalCartPrice}$</span>
        </div>
        <div className="flex justify-between">
          <span>Kargo Tutarı</span>
          <span>{cargoprice}$</span>
        </div>
        {discountIsOpen && (
          <div className="flex justify-between">
            <span>İndirim</span>
            <span>{discountPrice}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <h5>Fiyat</h5>
        <h5>{sumPrice}</h5>
      </div>
      <div className="flex flex-col gap-3">
        <div
          onClick={() => setDiscountIsOpen(!discountIsOpen)}
          className="flex justify-center hover:border-alert-text items-center text-center gap-2 text-sm border border-gray-200  rounded-lg py-3"
        >
          <Plus className="w-4 h-4 text-alert-text" />
          <span className="text-[12px]">İNDİRİM KODU GİR</span>
        </div>
        {discountIsOpen && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-700">
              İndirim Kodu
            </span>

            <div className="flex items-stretch border border-gray-200 rounded-lg overflow-hidden h-11 w-full bg-white">
              <input
                type="number"
                min="0"
                max="50"
                value={discountRate}
                onChange={(e) => {
                  const val = Number(e.target.value);

                  if (val > 50) {
                    setDiscountRate(50);
                  } else {
                    setDiscountRate(val);
                  }
                }}
                placeholder="İndirim Kodu Gir"
                className="grow w-full pl-3 text-sm bg-white focus:outline-none"
              />

              <button className="bg-[#BDBDBD] text-white text-[14px] px-5 font-medium -mx-4 hover:bg-gray-500 transition-colors shrink-0 h-full">
                Uygula
              </button>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() =>
          // 🔧 FIX: Checkout butonunun login gerekiyorsa referrer bilgisi state'e ekleniyor
          history.push({
            pathname: "/create-order",
            state: {
              referrer: '/cart',
              sumPrice,
              cargoprice,
              discountPrice,
            },
          })
        }
        className="bg-alert hover:bg-amber-700 text-light-text text-xl w-full py-3 rounded-lg "
      >
        Sepeti Onayla
      </button>
    </div>
  );
}
