import { contactData } from "../data/contact";

export default function ContactPage() {
  return (
    <div className="w-full space-y-24 py-12">
      {/* SECTION 1: Sosyal Medya İkonlu Alan */}
      <div className="flex flex-col gap-8 mx-16 sm:mx-20 md:mx-24 lg:mx-28 text-center items-center">
        <h2>{contactData.section1.title}</h2>
        <h4>{contactData.section1.subTitle}</h4>
        <button className="bg-primary rounded-sm hover:bg-hover text-light-text py-4 px-7.5 text-[14px] leading-5.5 tracking-[0.2px]">
          {contactData.section1.buttonText}
        </button>

        {/* Sosyal medya ikonları için MAP kullanımı (Çok daha esnek ve kısa) */}
        <div className="flex gap-6">
          {contactData.section1.socialIcons.map((logo) => (
            <a
              key={logo.id}
              href={logo.url || "#"}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={logo.iconUrl}
                alt={logo.name}
                className="w-7.5 h-7.5 transition-transform hover:scale-110"
              />
            </a>
          ))}
        </div>
      </div>

      {/* SECTION 2: Arka Plan Resimli Alan */}
      <div
        style={{ backgroundImage: `url(${contactData.section2.imgUrl})` }}
        className="w-full  h-120   flex items-center justify-center"
      >
        <div className="flex flex-col gap-6 max-w-2xl px-6 text-center items-center linear">
          <h2 className=" drop-shadow-md">{contactData.section2.title}</h2>
          <p className=" drop-shadow-sm">{contactData.section2.subTitle}</p>
          <button className=" text-primary-text py-4 px-7.5 hover:scale-140  ">
            <h6>{contactData.section2.buttonText}</h6>
          </button>
        </div>
      </div>

      {/* SECTION 3: Lokasyonların MAP ile listeleme Alan */}
      <div
        style={{ backgroundImage: `url(${contactData.section3.imgUrl})` }}
        className="py-40 bg-cover relative"
      >
        {/* SAĞDAN SOLA RENK KATMANI  */}
        <div className="absolute inset-0 bg-linear-to-l from-transparent to-black/80 pointer-events-none"></div>

        {/* İÇERİK SARMALAYICI (Üste çıkması için relative z-10 eklendi) */}
        <div className="mx-16 sm:mx-20 md:mx-24 lg:mx-28 text-light-text flex flex-col items-center md:flex-row gap-12 h-full relative z-10">
          <div className="flex-1 md:px-10 max-w-md text-center md:text-left ">
            <h2>{contactData.section3.title}</h2>
            <p className="text-light-text my-12">
              {contactData.section3.subTitle}
            </p>
            <button className="bg-primary rounded-sm hover:bg-hover text-light-text py-4 px-7.5 text-[14px] leading-5.5 tracking-[0.2px]">
              {contactData.section3.buttonText}
            </button>
          </div>

          <div className="flex flex-wrap gap-8 text-light-gray-2 flex-1 w-full md:w-1/2">
            {contactData.section3.locations.map((loc, index) => (
              <div
                key={index}
                className="w-full flex flex-col px-10 sm:px-0 gap-4 md:w-[calc(50%-1rem)]"
              >
                <h3>{loc.location}</h3>
                <h4>{loc.address}</h4>
                <h5>{loc.postCode}</h5>
                <h5>Phone: {loc.phone}</h5>
                <h5>Fax: {loc.fax}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: Bizimle Çalışın Alanı */}
      {/* SECTION 4: Bizimle Çalışın Alanı */}
      <div className="bg-hover h-full w-full overflow-hidden">
       
        <div className="flex flex-col lg:flex-row items-center gap-16 pl-20 sm:pl-24 md:pl-28 lg:pl-32">
          {/* SOL TARAF: Yazı Alanı */}
          <div className="flex-1 flex flex-col gap-4 py-16 text-center lg:text-left items-center lg:items-start pr-20 sm:pr-20 md:px-10">
            <h5 className="text-white/90 font-bold">
              {contactData.section4.title1}
            </h5>
            <h2 className="text-white">{contactData.section4.title2}</h2>
            <p className="text-white/70">{contactData.section4.subTitle}</p>

            <button className="text-light-text border border-light-text hover:scale-120 py-3 px-8 rounded-sm text-sm font-bold mt-4 hover:bg-opacity-90 transition-all">
              {contactData.section4.buttonText}
            </button>
          </div>

          {/* SAĞ TARAF: Resim Alanı */}
          {/* flex-1 yerine w-full lg:w-1/2 verilerek ve self-stretch ile dikeyde tam sağa sıfırlandı */}
          <div className="hidden md:block w-full lg:w-1/2 h-full self-stretch">
            <img
              src={contactData.section4.imgUrl}
              alt="Work With Us"
              className="w-full h-full object-contain object-right rounded-r-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
