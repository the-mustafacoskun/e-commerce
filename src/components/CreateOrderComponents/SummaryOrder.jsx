


export default function SummaryOrder({
  discountPrice,
  cargoprice,
  sumPrice,
  totalCartPrice,
  selectedAddress,
  selectedCreditCard,
  onSubmitOrder  //CreateOrderPage'den gelen submit handler
}) {

    // (button aktif/pasif durumu)
    const isValid = selectedAddress && selectedCreditCard


    
  return (
    <div className="w-80 shrink-0 border flex flex-col gap-6 border-gray-200 rounded-md bg-light-bg p-4">
      <div className="flex flex-col gap-4 border-b border-gray-200 pb-8">
        <h4>Sepet Özeti</h4>
        <div className="flex justify-between">
          <span>Ara Toplam</span>
          <span>{totalCartPrice?totalCartPrice:0}$</span>
        </div>
        <div className="flex justify-between">
          <span>Kargo Tutarı</span>
          <span>{totalCartPrice?cargoprice:0}$</span>
       
        </div>

        <div className="flex justify-between">
          <span>İndirim</span>
          <span>{totalCartPrice?discountPrice:0}$</span>
          
        </div>
      </div>
      <div className="flex justify-between">
        <h5>Fiyat</h5>
        <span>{totalCartPrice?sumPrice:0}$</span>
        
      </div>
      
      {/* 🔧 Sepeti Onayla Butonu -  */}
      <button 
        disabled={!isValid}
        onClick={onSubmitOrder}
        className={`${!isValid ? 'bg-gray-300 cursor-not-allowed':'bg-alert hover:bg-amber-700'} text-light-text text-xl w-full py-3 rounded-lg transition-colors font-semibold`}
      >
        {!isValid ? "❌ Adres ve Kart Seçiniz" : "✓ Sepeti Onayla"}
      </button>
    </div>
  );
}
