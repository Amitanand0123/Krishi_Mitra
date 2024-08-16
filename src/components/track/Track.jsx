import '@fortawesome/fontawesome-free/css/all.min.css';

const Track = () => {
    return (
        <section>
            <div className="container mx-auto px-5 py-10 md:py-14 text-center">
                <h3 className="text-gray-500 font-semibold text-sm">Reasons to Choose Us</h3>
                <h2 className="text-3xl font-bold mb-10 mt-5">WHAT WE ARE DOING</h2>

                <div className="flex flex-wrap justify-center -m-4">
                    {/* Track 1 */}
                    <div className="flex-1 p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="bg-white border-2 border-gray-200 rounded-lg px-6 py-8 hover:shadow-xl transition-shadow">
                            <i className="fa-solid fa-seedling text-5xl mb-4 text-[#6AC128]"></i>
                            <h2 className="title-font font-medium text-xl text-gray-900">Soil Health Report</h2>
                            <p className="leading-relaxed text-gray-600 mt-2">Use our AI-powered soil health report to help farmers make informed decisions about their soil health.</p>
                        </div>
                    </div>

                    {/* Track 2 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="bg-white border-2 border-gray-200 rounded-lg px-6 py-8 hover:shadow-xl transition-shadow">
                            <i className="fa-solid fa-cart-shopping text-5xl mb-4 text-[#6AC128]"></i>
                            <h2 className="title-font font-medium text-xl text-gray-900">Farmer's Marketplace</h2>
                            <p className="leading-relaxed text-gray-600 mt-2">A marketplace for farmers to sell their products and services without the need of intermediaries .</p>
                        </div>
                    </div>

                    {/* Track 3 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="bg-white border-2 border-gray-200 rounded-lg px-6 py-8 hover:shadow-xl transition-shadow">
                            <i className="fa-solid fa-cloud text-5xl mb-4 text-[#6AC128]"></i>
                            <h2 className="title-font font-medium text-xl text-gray-900">Local Weather Forecast</h2>
                            <p className="leading-relaxed text-gray-600 mt-2">Get local weather forecasts to help farmers make informed decisions about their farming practices.</p>
                        </div>
                    </div>

                    {/* Track 4 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="bg-white border-2 border-gray-200 rounded-lg px-6 py-8 hover:shadow-xl transition-shadow">
                            <i className="fa-solid fa-tractor text-5xl mb-4 text-[#6AC128]"></i>
                            <h2 className="title-font font-medium text-xl text-gray-900">Rent Farm Tools</h2>
                            <p className="leading-relaxed text-gray-600 mt-2">Rent farm tools or to get other farmer's tools on rent so they don't have to buy each and every eqipment.</p>
                        </div>
                    </div>

                    {/* Track 5 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="bg-white border-2 border-gray-200 rounded-lg px-6 py-8 hover:shadow-xl transition-shadow">
                            <i className="fa-solid fa-circle-info text-5xl mb-4 text-[#6AC128]"></i>
                            <h2 className="title-font font-medium text-xl text-gray-900">Agriculture Info</h2>
                            <p className="leading-relaxed text-gray-600 mt-2">Get information on the latest agricultural trends and strategies to help farmers make informed decisions about their farming.</p>
                        </div>
                    </div>

                    {/* Track 6 */}
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="bg-white border-2 border-gray-200 rounded-lg px-6 py-8 hover:shadow-xl transition-shadow">
                            <i className="fa-solid fa-hand-holding-hand text-5xl mb-4 text-[#6AC128]"></i>
                            <h2 className="title-font font-medium text-xl text-gray-900">Community</h2>
                            <p className="leading-relaxed text-gray-600 mt-2">Join our community of farmers who help each other make informed decisions about their farming practices.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Track;