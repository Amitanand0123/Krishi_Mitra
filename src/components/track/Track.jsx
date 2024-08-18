import '@fortawesome/fontawesome-free/css/all.min.css';

const features = [
    {
        icon: 'fa-seedling',
        title: 'Soil Health Report',
        description: 'Use our AI-powered soil health report to help farmers make informed decisions about their soil health.'
    },
    {
        icon: 'fa-cart-shopping',
        title: 'Farmer\'s Marketplace',
        description: 'A marketplace for farmers to sell their products and services without the need of intermediaries.'
    },
    {
        icon: 'fa-cloud',
        title: 'Local Weather Forecast',
        description: 'Get local weather forecasts to help farmers make informed decisions about their farming practices.'
    },
    {
        icon: 'fa-tractor',
        title: 'Rent Farm Tools',
        description: 'Rent farm tools or get other farmer\'s tools on rent so they don\'t have to buy each and every equipment.'
    },
    {
        icon: 'fa-circle-info',
        title: 'Agriculture Info',
        description: 'Get information on the latest agricultural trends and strategies to help farmers make informed decisions about their farming.'
    },
    {
        icon: 'fa-hand-holding-hand',
        title: 'Community',
        description: 'Join our community of farmers who help each other make informed decisions about their farming practices.'
    },
];

const Track = () => {
    return (
        <section>
            <div className="container mx-auto px-5 py-10 md:py-14 text-center">
                <h3 className="text-gray-500 font-semibold text-sm">Reasons to Choose Us</h3>
                <h2 className="montserrat text-3xl font-bold mb-10 mt-5">WHAT WE ARE DOING</h2>

                <div className="flex flex-wrap justify-center -m-4">
                    {features.map((feature, index) => (
                        <div key={index} className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="bg-white border-2 border-gray-200 rounded-lg px-6 py-8 hover:shadow-xl transition-shadow">
                                <i className={`fas ${feature.icon} text-5xl mb-4 text-[#6AC128]`}></i>
                                <h2 className="title-font font-medium text-xl text-gray-900">{feature.title}</h2>
                                <p className="leading-relaxed text-gray-600 mt-2">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Track;
