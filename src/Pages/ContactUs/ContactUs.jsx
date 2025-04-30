import React from "react";

const ContactUs = () => {
<<<<<<< HEAD
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/contact-bg.jpeg')", // ← Change this to your image path
      }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-10 rounded-xl shadow-lg max-w-5xl w-full flex flex-col md:flex-row gap-8">
        {/* Left Side: Contact Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-2 border rounded"
                placeholder="Write your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
=======
    return (
        <div>
            this is contact
>>>>>>> cca274f706dca853370fa1139a5ab87cce5bc7a8
        </div>

        {/* Right Side: Info */}
        <div className="flex-1 text-sm">
          <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
          <p className="mb-4">We’d love to hear from you!</p>
          <div className="mb-4">
            <p className="font-semibold">Address:</p>
            <p>123 Solar Street, Green City, Earth</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Email:</p>
            <p>support@swiftmart.com</p>
          </div>
          <div>
            <p className="font-semibold">Phone:</p>
            <p>(+880)123-4567890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
