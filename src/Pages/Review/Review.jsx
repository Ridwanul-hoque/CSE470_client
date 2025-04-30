import React, { forwardRef, useEffect, useState } from 'react';


const Review = forwardRef((props, ref) => {
    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, []);


    return (
        <div ref={ref} id="review-section" className="bg-pink-100 my-8 p-7 rounded-2xl">
            <h2 className="text-3xl font-bold text-center mb-6 text-yellow-500">User Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map(review => (
                    <div key={review._id} className="bg-white shadow-lg rounded-lg p-5 transform hover:scale-105 transition-all duration-300 ease-in-out">
                        <h3 className="text-xl font-semibold text-gray-800">{review.user}</h3>
                        <p className="text-gray-600 mt-2 text-base">{review.comment}</p>
                        <div className="mt-3 text-yellow-500 flex items-center">
                            {'⭐'.repeat(review.rating)}
                            <span className="ml-2 text-gray-500 text-sm">({review.rating})</span>
                        </div>
                       
                    </div>
                ))}
            </div>
        </div>
    );
});


export default Review;


