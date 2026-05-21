export function CategoryCard({ items, title, bgImgUrl }) {
  return (
    /* 
      - sm ekranda yan yana sığsınlar diye: sm:w-[calc(50%-16px)] veya direkt esnek bırak
      - lg ekranda (1024px) daralmayı önlemek için minimum genişlik (min-w-[200px]) ve flex-grow verdik.
      - xl ekranda ise tekrar flex-1 ile tek satıra eşit dağılacaklar.
    */
    <div className="w-full sm:w-56 md:flex-1 min-w-40 px-0 overflow-hidden rounded-sm group grow">
      <div className="relative w-full overflow-hidden h-full">
        <img src={bgImgUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center gap-2.5 text-light-text p-4">
          <h5 className="uppercase">{title}</h5>
          <p>{items} items</p>
        </div>
      </div>
    </div>
  );
}