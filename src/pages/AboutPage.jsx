import { BrandsFav } from "../components/ShopComponents/BrandsFav";
import TeamMemberCard from "../components/TeamPageComponents/TeamMemberCard";
import { contactData } from "../data/contact";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="w-full bg-light-bg py-20">
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full">
          {/* SOL TARAF: Yazı Alanı */}
          <div className="flex-1 flex flex-col justify-center items-center text-center md:items-start md:text-start gap-8 w-full">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
              ABOUT US
            </h2>
            <h4 className="text-second-text text-base md:text-lg max-w-md">
              We know how large objects will act, but things on a small scale
              just do not act that way.
            </h4>
            <button className="bg-primary text-light-text rounded-sm w-50 hover:bg-hover py-4 transition-all">
              Get Quote Now
            </button>
          </div>

          {/* SAĞ TARAF: Resim Alanı */}
          <div className="flex-1 w-full flex justify-center md:justify-end">
            <img
              src="/none (1).png"
              alt="shopping"
              className="w-full max-w-md md:max-w-xl h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full flex flex-col gap-6">
          <p className="text-danger-text text-center md:text-left font-semibold">
            Problems trying
          </p>
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 mx-12 md:mx-0 items-start text-center md:text-left">
            <h3 className="w-full md:w-1/2 text-xl md:text-2xl font-bold">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent.
            </h3>
            <p className="text-second-text text-sm md:text-base w-full md:w-1/2">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-light-bg py-25">
        <div className="[&_h5]:text-second-text flex flex-col gap-12 sm:gap-16 md:gap-20 items-center text-center lg:flex-row lg:justify-between max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full">
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">15K</h1>
            <h5>Happy Customers</h5>
          </div>
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">150K</h1>
            <h5>Monthly Visitors</h5>
          </div>
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">15</h1>
            <h5>Countries Worldwide</h5>
          </div>
          <div>
            <h1 className="text-4xl font-bold md:text-5xl">100+</h1>
            <h5>Top Partners</h5>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full">
          <TeamMemberCard />
        </div>
      </div>
      <div className="flex flex-col gap-12 py-20">
        <div className="mx-15 md:mx-20 lg:mx-25 xl:mx-30 text-center flex flex-col gap-6">
          <h2>Big Companies Are Here</h2>
          <p className="text-second-text">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics{" "}
          </p>
        </div>
        <BrandsFav />
      </div>
      <div className="flex flex-col bg-hover lg:flex-row items-center gap-16 pl-20 sm:pl-24 md:pl-28 lg:pl-32">
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
  );
}
