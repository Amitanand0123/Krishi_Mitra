import '@fortawesome/fontawesome-free/css/all.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const features = [
    {
        icon: 'fa-seedling',
        title: 'Real-Time Monitoring',
        description: "Keep track of your farm's conditions with real-time data and remote system control, ensuring optimal growth and productivity.",
        image: '../img/farm1.jpg',
    },
    {
        icon: 'fa-chart-line',
        title: 'AI-Driven Forecasting',
        description: 'Utilize advanced AI to predict market needs and weather patterns, helping you make informed decisions and maximize your yield.',
        image: '../img/farm2.jpg',
    },
    {
        icon: 'fa-store',
        title: 'Community Marketplace',
        description: 'Connect directly with consumers and other farmers through our marketplace, promoting sustainable practices and profitable exchanges.',
        image: '../img/farm3.jpg',
    },
   
];

const HeroSection = () => {
    return (
        <div className="relative h-[75vh] lg:h-[75vh]">
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                pagination={{ clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="h-full w-full"
            >
                {features.map((feature, index) => (
                    <SwiperSlide key={index} className="relative">
                        <img className="h-full w-full object-cover" src={feature.image} alt={`Slide ${index}`} />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="text-center px-6 md:px-12">
                                <i className={`fas ${feature.icon} text-5xl mb-4 text-white`}></i>
                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">{feature.title}</h2>
                                <p className='text-lg lg:text-xl text-white'>{feature.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Navigation Arrows */}
                <div className="swiper-button-prev absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer z-10">
                    
                </div>
                <div className="swiper-button-next absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer z-10">
                    
                </div>
            </Swiper>
        </div>
    );
}

export default HeroSection;
