import React from 'react';
import CountUp from 'react-countup';

const Statistics = () => {
    const stats = [
        { id: 1, title: 'Farmers Connected', value: 5000 },
        { id: 2, title: 'Soil Health Reports Generated', value: 12000 },
        { id: 3, title: 'Cities Served', value: 150 },
        { id: 4, title: 'Acres of Land Improved', value: 10000 },
    ];

    return (
        <div className="py-12 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-center text-green-600 mb-8">Our Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map(stat => (
                        <div key={stat.id} className="bg-white shadow-lg p-6 rounded-lg flex flex-col justify-between">
                            <h3 className="text-2xl font-semibold text-[#1e453e] mb-2">{stat.title}</h3>
                            <CountUp 
                                start={0} 
                                end={stat.value} 
                                duration={2.5} 
                                separator="," 
                                suffix="+"
                                className="text-4xl font-bold text-green-600" 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Statistics;
