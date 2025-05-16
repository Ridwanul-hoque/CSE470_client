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
        <div className="relative my-16 bg-gradient-to-br px-4 rounded-3xl shadow-inner shadow-[#FE5F75]/20">
            <h2 className="text-4xl font-extrabold text-center text-[#FE5F75] mb-8 tracking-wider uppercase drop-shadow-md">---- Our Customer ----</h2>
            <div
                ref={scrollRef}
                className="flex gap-8 max-w-screen-xl mx-auto scroll-smooth snap-x snap-mandatory px-2 no-scrollbar hide-horizontal-scrollbar my-4"
            >
                {reviews.map(review => (
                    <div
                        key={review._id}
                        className="snap-start flex-shrink-0 bg-[#121232] border border-[#FE5F75]/20 shadow-lg shadow-[#FE5F75]/30 rounded-3xl p-6 min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[35%] mx-auto hover:scale-[1.04] transition-all duration-300 group"
                    >
                        <h3 className="text-2xl font-bold text-[#FE5F75] mb-1">{review.user}</h3>
                        <p className="text-[#CFCFE5] mt-2 italic border-l-4 border-[#FE5F75] pl-4 group-hover:pl-5 transition-all duration-300">“{review.comment}”</p>
                        <div className="mt-3 text-yellow-400 flex items-center font-semibold">
                            {'⭐'.repeat(review.rating)}
                            <span className="ml-2 text-[#A5A5C3] text-sm">({review.rating})</span>
                        </div>
                        <div className="h-[2px] mt-4 bg-gradient-to-r from-[#FE5F75] to-transparent w-1/2"></div>
                    </div>
                ))}
            </div>
            <div className="mt-12 text-center">
                <Link
                    to="/dashboard/addReview"
                    className="inline-block bg-gradient-to-br from-[#FE5F75] to-[#0D0D2B] hover:from-[#FF7A85] hover:to-[#1A1A40] text-white px-8 py-3 rounded-full shadow-lg  hover:shadow-[#FE5F75]/40 transition-all duration-300 text-lg font-semibold tracking-wide"
                >
                    Give Us Your Feedback
                </Link>
            </div>
        </div>
    );
});

export default Review;
