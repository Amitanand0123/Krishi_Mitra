import React from 'react';

const BackToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            <button
                onClick={scrollToTop}
                className="fixed bottom-4 right-4 p-3 w-16 h-16 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-500 transition"
                aria-label="Scroll to top"
            >
                ↑
            </button>
        </div>
    );
};

export default BackToTop;
