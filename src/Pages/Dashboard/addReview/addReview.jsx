import { useState } from "react";
const AddReview = () => {
    const [review, setReview] = useState({ user: '', comment: '', rating: 1 });
    const handleChange = e => {
        const { name, value } = e.target;
        setReview(prev => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }));
    };
    const handleSubmit = e => {
        e.preventDefault();
        console.log('Submitting review:', review); // Debugging log
        fetch('http://localhost:5000/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Review added:', data);
                setReview({ user: '', comment: '', rating: 1 });
            })
            .catch(error => console.error('Error adding review:', error));
    };

    return (
        <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
                <h2 className="relative text-4xl font-extrabold text-center mb-8 text-gradient 
    before:absolute before:-bottom-2 before:left-1/2 before:w-24 before:h-1 before:bg-gradient-to-r before:from-purple-400 before:via-pink-400 before:to-red-400 before:rounded-full before:shadow-lg before:transform before:-translate-x-1/2 before:animate-pulse"> Add a Review</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="user"
                        value={review.user}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full p-3 border rounded-lg"
                        required
                    />
                    <textarea
                        name="comment"
                        value={review.comment}
                        onChange={handleChange}
                        placeholder="Your Review"
                        className="w-full p-3 border rounded-lg h-32"
                        required
                    ></textarea>
                    <select
                        name="rating"
                        value={review.rating}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num} Stars</option>
                        ))}
                    </select>
                    <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white p-3 rounded-lg text-lg font-semibold hover:bg-black">Submit Review</button>
                </form>
            </div>
        </div>
    );
};
export default AddReview;

