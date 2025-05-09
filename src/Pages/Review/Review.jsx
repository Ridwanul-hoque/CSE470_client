import React, { forwardRef, useEffect,useRef, useState } from 'react';


const Review = forwardRef((props, ref) => {
    const [reviews, setReviews] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);


    return (
        <div ref={ref} id="review-section" className="my-20 px-4 max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#FE5F75]  mb-10">
                
                User Review
                
            </h2>

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory px-1"
                    style={{
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {reviews.map(review => (
                        <div
                            key={review._id}
                            className="snap-start flex-shrink-0 bg-white shadow-lg rounded-2xl p-6 min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[35%] mx-auto transform hover:scale-[1.02] transition-transform duration-300"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{review.user}</h3>
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                            <div className="mt-3 text-yellow-500 flex items-center">
                                {'⭐'.repeat(review.rating)}
                                <span className="ml-2 text-gray-500 text-sm">({review.rating})</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});


export default Review;


