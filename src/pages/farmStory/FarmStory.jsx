import React, { useState } from 'react'
import Layout from "../../components/layout/Layout";

const FarmStory = () => {
    return (
        <Layout>
            <section className="text-gray-600 body-font mb-10">
                {/* main  */}
                <div className="container px-5 py-10 mx-auto">
                    {/* Heading  */}
                    <h1 className=' text-center text-3xl font-bold text-black'>Farm Stories</h1>
                    {/* para  */}
                    <h2 className=' text-center text-2xl font-semibold mb-10' > Listen to the <span className=' text-green-500'>tricks and tips</span> and <span className=' text-green-500'>success stories </span>of our <span className=' text-green-500'>users</span> .</h2>

                    <div className="flex flex-wrap -m-4">
                        
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ9W15Hh_7mgF-oO3Dl_M32EWBjJUo_cA8Uw&s" />
                                <p className="leading-relaxed">"I feel like I'm able to connect with my customers on a more personal level, which is important to me as a small-scale farmer," Tukaram says. "I'm not just selling products, I'm building relationships with the people who are eating the food I grow."</p>
                                <span className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Tukaram Mahadev Shinde</h2>
                                <p className="text-gray-500">Jalgoan, Maharashtra</p>
                            </div>
                        </div>

                        
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScir_VdHZNETalO03g6e0S42SLMT824bKiGw&s" />
                                <p className="leading-relaxed">"I used to have to travel long distances to rent equipment, and even then, I wasn't sure if I would get the right tools for the job," Gurdeep says. "But with this app, I can browse and rent the latest farming tools and equipment with just a few clicks. It's saved me so much time and money."</p>
                                <span className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Gurdeep Pannu</h2>
                                <p className="text-gray-500">Ludhiyana , Punjab</p>
                            </div>
                        </div>

                        
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ9W15Hh_7mgF-oO3Dl_M32EWBjJUo_cA8Uw&s" />
                                <p className="leading-relaxed">"The tool has given me a sense of control over my farm," Suryaniketan says. "I can plan my harvest, manage my resources, and reduce my risks. It's like having a personal assistant for my farm."I'm proud to be a part of this initiative," Suryaniketan says. "I'm confident that this tool will help Indian farmers become more efficient, productive, and sustainable. It's a step towards a brighter future for our agriculture sector."</p>
                                <span className="inline-block h-1 w-10 rounded bg-green-500 mt-6 mb-4" />
                                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Suryaniketan Taratali</h2>
                                <p className="text-gray-500">Munnar ,Kerela</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default FarmStory