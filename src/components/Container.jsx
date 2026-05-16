export function Container() {
  return (
    
    <div className="flex flex-col md:flex-row-reverse gap-8 items-center max-w-7xl mx-auto px-4">
      
      {/* Metin İçeriği Bölümü */}
      <div className="flex flex-col gap-8 justify-center items-center text-center p-8 md:p-20 md:items-start md:text-left flex-1">
        <h5 className="text-muted-text font-bold">WINTER 2027</h5>
        <h2 className="text-4xl font-bold">Part of the Neural Universe</h2>
        <h4 className="text-second-text max-w-95">
          We know how large objects will act, but things on a small scale.
        </h4>
        
        {/* BUTONLAR: Yan yana gelmesi için ayrı bir flex div'ine alındı */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center md:justify-start">
          <button className="bg-primary text-light-text w-40 h-13 rounded-lg font-bold hover:bg-blue-600 transition-colors">
            BUY NOW
          </button>
          <button className="text-primary border border-primary w-40 h-13 rounded-lg font-bold hover:bg-primary hover:text-white transition-all">
            Learn More
          </button>
        </div>
      </div>

      {/* Resim Bölümü */}
      <div className="flex justify-center items-center flex-1">
        <img 
          src="/none.png" 
          alt="Neural Universe" 
          className="w-full h-auto object-contain max-h-150" 
        />
      </div>

    </div>
  );
}