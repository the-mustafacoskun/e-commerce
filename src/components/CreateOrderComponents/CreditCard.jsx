import { ChipCardIcon } from "../../icons/ChipCardIcon";
import { MasterCardIcon } from "../../icons/MasterCard";

export const MyCreditCard = ({ cardInfo }) => {
  
  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return "#### **** **** ####";
    
    const cleanNumber = cardNumber.toString().replace(/\s/g, "");
    
    const firstFour = cleanNumber.slice(0, 4);
    const lastFour = cleanNumber.slice(-4);
    
    return `${firstFour} **** **** ${lastFour}`;
  };

  return (
    
    <div className="flex flex-col shrink-0 gap-2 p-6 w-87-5 h-55 bg-[linear-gradient(107.38deg,#e17100_2.61%,#23a6f0_101.2%)] rounded-3xl shadow-lg box-border text-white overflow-hidden select-none">
      
      {/* Çip İkonu */}
      

      {/* Bilgiler Alanı */}
      <div className="grid grid-cols-2 gap-x-16 mt-1">
        <span className="text-[11px] text-white/70 uppercase tracking-wider">Card Holder</span>
        <span className="text-[11px] text-white/70 uppercase tracking-wider">Valid Thru</span>
        
       
        <span className="font-semibold text-[14px] leading-tight max-w-32.5 wrap-break-word line-clamp-2">
          {cardInfo.name_on_card}
        </span>
        
        <span className="font-semibold text-[14px]">
          {cardInfo.expire_month?.toString().padStart(2, "0")}/{cardInfo.expire_year}
        </span>
      </div>
      <ChipCardIcon className="bg-pr self-end shrink-0" />
      {/* Kart Numarası ve Logo Alanı */}
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-white/10">
        
        <span className="font-semibold text-[16px] tracking-wider font-mono shrink-0">
          {formatCardNumber(cardInfo.card_no)}
        </span>
        <div className="shrink-0">
          <MasterCardIcon />
        </div>
      </div>
    </div>
  );
};