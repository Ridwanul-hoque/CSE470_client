import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


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
        <div className="relative my-12">
            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-6 max-w-screen-xl mx-auto scroll-smooth snap-x snap-mandatory px-1 no-scrollbar hide-horizontal-scrollbar my-4"
            >
                {reviews.map(review => (
                    <div
                        key={review._id}
                        className="snap-start flex-shrink-0 bg-white shadow-2xl rounded-3xl p-6 min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[35%] mx-auto transform hover:scale-[1.03] hover:shadow-pink-200 transition-all duration-300"
                    >
                        <h3 className="text-xl font-semibold text-[#FE5F75]">{review.user}</h3>
                        <p className="text-gray-600 mt-2 italic">“{review.comment}”</p>
                        <div className="mt-3 text-yellow-500 flex items-center">
                            {'⭐'.repeat(review.rating)}
                            <span className="ml-2 text-gray-500 text-sm">({review.rating})</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center">
                <Link
                    to="/dashboard/addReview"
                    className="inline-block bg-[#FE5F75] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#e14b61] transition"
                >
                    Give Us Your Feedback
                </Link>
            </div>
        </div>

    );
});


export default Review;


