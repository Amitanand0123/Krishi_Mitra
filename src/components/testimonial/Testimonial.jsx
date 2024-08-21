/* eslint-disable react/no-unescaped-entities */
import { useTranslation } from 'react-i18next';

const Testimonial = () => {
    const { t } = useTranslation();

    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                {/* main  */}
                <div className="container px-5 py-10 mx-auto">
                    {/* Heading  */}
                    <h1 className='text-center text-3xl font-bold text-black'>{t('testimonial.heading')}</h1>
                    {/* para  */}
                    <h2 className='text-center text-2xl font-semibold mb-10'>
                        {t('testimonial.subheading_part1')} <span className='text-green-600'>{t('testimonial.highlight')}</span> {t('testimonial.subheading_part2')}
                    </h2>

                    <div className="flex flex-wrap -m-4">
                        {/* T-1 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGzIwc2cEe3WxYaZjfArN5bQAGbQamaCkPA&s" />
                                <p className="leading-relaxed">"{t('testimonial.testimonial1.quote')}"</p>
                                <span className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">{t('testimonial.testimonial1.name')}</h2>
                                <p className="text-gray-500">{t('testimonial.testimonial1.position')}</p>
                            </div>
                        </div>

                        {/* T-2 */}
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGzIwc2cEe3WxYaZjfArN5bQAGbQamaCkPA&s" />
                                <p className="leading-relaxed">"Krishi Mitra's community marketplace has opened up new avenues for me to sell my produce directly to consumers. The platform is user-friendly, and the support team is always there to help. This initiative is truly empowering farmers."</p>
                                <span className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">S Mishra</h2>
                                <p className="text-gray-500">Farmer, Uttar Pradesh</p>
                            </div>
                        </div>

                        {/* T-3 */}
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGzIwc2cEe3WxYaZjfArN5bQAGbQamaCkPA&s" />
                                <p className="leading-relaxed">"The sustainable farming techniques I've learned through Krishi Mitra have not only boosted my yield but also helped me protect the environment. It's a win-win for my farm and the planet.Farmers like me are being really empowered by this effort."</p>
                                <span className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Diljeet </h2>
                                <p className="text-gray-500">Farmer, Punjab</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Testimonial;