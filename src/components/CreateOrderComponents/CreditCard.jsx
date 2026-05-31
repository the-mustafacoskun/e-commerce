import { ChipCardIcon } from "../../icons/ChipCardIcon";
import { MasterCardIcon } from "../../icons/MasterCard";





export const MyCreditCard = ({cardInfo}) => {
   
  return (
    
    <div className="flex flex-col p-6 gap-y-6 aspect-3/2 w-full max-w-87.5 bg-[linear-gradient(107.38deg,#e17100_2.61%,#23a6f0_101.2%)] rounded-3xl shadow-lg">
      
        
        <ChipCardIcon className="text-white bg-pr" />


      <div className="grid grid-cols-2 gap-x-4">
        <span className="text-[12px] text-white/70 uppercase">Card Holder</span>
        <span className="text-[12px] text-white/70 uppercase">Valid Thru</span>
        <span className="font-semibold text-[15px] text-white truncate">{cardInfo.name_on_card}</span>
        <span className="font-semibold text-[15px] text-white">{cardInfo.expire_month}/{cardInfo.expire_year}</span>
      </div>
      
      <div className="flex justify-between items-center mt-auto  text-white">
        <span className="font-semibold text-[18px] md:text-[22px]"> {cardInfo.card_no}</span>
        <MasterCardIcon />
      </div>
    </div>
  );
};