function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-white">
      {/* 1. ÜST ŞERİT (Logo & Sosyal Medya) */}
      <div className="w-full bg-light-gray-1 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 px-10 sm:px-6 lg:px-10 xl:px-20">
          <h3 className="text-2xl font-bold text-text">Bandage</h3>
          <div className="flex gap-5">
            <img src="/facebook.png" alt="fb" className="w-6 h-6 object-contain cursor-pointer" />
            <img src="/instagram.png" alt="ig" className="w-6 h-6 object-contain cursor-pointer" />
            <img src="/twitter.png" alt="tw" className="w-6 h-6 object-contain cursor-pointer" />
          </div>
        </div>
      </div>

      {/* 
        2. LİNKLER VE INPUT ALANI (Grid Yok - Tamamen Flexbox)
        - flex-wrap sayesinde sığmayan elemanlar pürüzsüzce alt satıra geçer.
        - Aralardaki boşlukları flex düzeninde korumak için gap-8 ve negatif margin dengesi kurduk.
      */}
      <div className="my-18 md:my-12.5 px-10 sm:px-6 lg:px-10 xl:px-20">
        <div className="flex flex-wrap gap-y-10 -mx-4 justify-between">
          
          {/* Company Info */}
          <div className="w-full sm:w-[45%] md:w-[22%] lg:w-[16%] px-6 flex flex-col gap-5">
            <h5>Company Info</h5>
            <ul className="footer-links flex flex-col gap-2.5">
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">Carrier</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">We are hiring</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full sm:w-[45%] md:w-[22%] lg:w-[16%] px-4 flex flex-col gap-5">
            <h5>Legal</h5>
            <ul className="footer-links flex flex-col gap-2.5">
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">Carrier</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">We are hiring</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Features */}
          <div className="w-full sm:w-[45%] md:w-[22%] lg:w-[16%] px-4 flex flex-col gap-5">
            <h5>Features</h5>
            <ul className="footer-links flex flex-col gap-2.5">
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">Business Marketing</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">User Analytic</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">Live Chat</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">Unlimited Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="w-full sm:w-[45%] md:w-[22%] lg:w-[16%] px-4 flex flex-col gap-5">
            <h5>Resources</h5>
            <ul className="footer-links flex flex-col gap-2.5">
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">IOS & Android</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">Watch a Demo</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">Customers</a></li>
              <li><a href="#" className="text-second-text hover:text-primary transition-colors">API</a></li>
            </ul>
          </div>

          {/* 
            Get In Touch (Input Alanı)
            - Tablette (820px) ve mobilde sığışmaya çalışmasın diye 'w-full' (yüzde yüz) yaptık.
            - Büyük ekranda (lg) diğer kolonların yanındaki orijinal boyutuna döner (lg:w-[26%]).
          */}
          <div className="w-full lg:w-[26%] px-4 flex flex-col gap-5 mt-2 lg:mt-0">
            <h5>Get In Touch</h5>
            <div className="flex w-full sm:w-1/2 md:w-auto h-14 overflow-hidden rounded-md border border-[#E6E6E6]">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 bg-[#F9F9F9] pl-5 text-[14px] outline-none min-w-0"
              />
              <button className="bg-primary  hover:bg-hover text-white px-6 h-full text-[14px] transition-all hover:bg-opacity-90 whitespace-nowrap cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. ALT BİLGİ */}
      <div className="w-full bg-light-gray-1 py-6">
        <div className="px-10 sm:px-6 lg:px-10 xl:px-20 text-center sm:text-left">
          <h6 className="text-second-text font-bold text-sm tracking-wide">
            Made With Love By Finland All Right Reserved
          </h6>
        </div>
      </div>
    </footer>
  );
}

export default Footer;