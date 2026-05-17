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

      {/* SECTION 3: Lokasyonların MAP ile Listelendiği Alan */}
      <div style={{ backgroundImage: `url(${contactData.section3.imgUrl})` }}>
        <div className="mx-16 sm:mx-20 md:mx-24 lg:mx-28 ">
          <div>
            {" "}
            <h2>{contactData.section3.title}</h2>
            <p className="text-second-text mb-12 max-w-2xl mx-auto">
              {contactData.section3.subTitle}
            </p>
            <button className="bg-primary rounded-sm hover:bg-hover text-light-text py-4 px-7.5 text-[14px] leading-5.5 tracking-[0.2px]">
          {contactData.section3.buttonText}
        </button>
          </div>

          {/* Lokasyon kartları için MAP kullanımı (4 ayrı div yazmaktan kurtulduk) */}
          <div className="flex flex-col gap-8 text-light-gray-2">
            {contactData.section3.locations.map((loc, index) => (
              <div key={index} className="">
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
      <div className="flex flex-col lg:flex-row items-center gap-12 mx-16 sm:mx-20 md:mx-24 lg:mx-28">
        <div className="flex-1 flex flex-col gap-4 text-center lg:text-left items-center lg:items-start">
          <h5 className="text-primary font-bold">
            {contactData.section4.title1}
          </h5>
          <h2>{contactData.section4.title2}</h2>
          <p className="text-second-text">{contactData.section4.subTitle}</p>
          <button className="bg-primary text-light-text py-3 px-8 rounded-sm text-sm font-bold mt-4">
            {contactData.section4.buttonText}
          </button>
        </div>
        <div className="flex-1">
          <img
            src={contactData.section4.imgUrl}
            alt="Work With Us"
            className="w-full max-h-96 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
