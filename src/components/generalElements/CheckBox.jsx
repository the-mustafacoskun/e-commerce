

export default function CheckBox({text,value,setValue}) {
    
  return (
    <div>
      <label className=" flex items-center cursor-pointer  gap-3 select-none">
        {/* Gerçek inputu gizliyoruz ama arkada çalışmaya devam ediyor */}
        <input
          type="checkbox"
          value={value}
          onClick={() => setValue(!value)}
          className="sr-only"
        />
        <div
          className={`w-5 h-5 border rounded flex items-center justify-center transition-colors
                  ${value ? "bg-alert border-alert text-white" : "border-gray-300 bg-white"}`}
        >
          {value && (
            <span className="text-white text-[12px] font-black leading-none select-none">
              ✓
            </span>
          )}
        </div>
       {text}
      </label>
    </div>
  );
}
