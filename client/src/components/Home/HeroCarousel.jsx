import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const banners = [
  {
    image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/WLA/TS/D37847648_Accessories_702x300-PC._CB582727868_.jpg',
    alt: 'Electronics Sale'
  },
  {
    image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img2021/V0/D27/Header_702x300._CB569356516_.jpg',
    alt: 'Fashion'
  },
  {
    image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/budgetphones/702x300_bugdet._CB601548407_.jpg',
    alt: 'Budget Phones'
  },
  {
    image: 'https://images-eu.ssl-images-amazon.com/images/G/31/OHL/24/BAU/feb/PC_702x300_2._CB582457107_.jpg',
    alt: 'Home & Kitchen'
  },
  {
    image: 'https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonPay/HW2024/DesktopHero/3000x1200_3._CB543642498_.jpg',
    alt: 'Great Deals'
  }
]

const HeroCarousel = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={500}
      >
        {banners.map((banner, i) => (
          <div key={i} className="cursor-pointer">
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
            />
          </div>
        ))}
      </Carousel>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#EAEDED] to-transparent pointer-events-none" />
    </div>
  )
}

export default HeroCarousel
