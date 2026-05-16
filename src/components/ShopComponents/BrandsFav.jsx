

export function BrandsFav() {
     const brands = [
    {id:1 , img:'/fa-brands_aws.png'},
    {id:1 , img:'/fa-brands_hooli.png'},
    {id:1 , img:'/fa-brands_lyft.png'},
    {id:1 , img:'/fa-brands_pied-piper-hat.png'},
    {id:1 , img:'/fa-brands_reddit-alien.png'},
    {id:1 , img:'/fa-brands_stripe.png'},
  ]

  return (
    <div className="flex flex-row justify-center flex-wrap py-10 sm:justify-between items-center gap-10 mx-10 xl:mx-45 ">
          {brands.map((brand)=>(
            <img key={brand.id} src={brand.img} className="w-24"/>
          ))}
      </div>
  )
}

