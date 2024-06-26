'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { OrbitProgress } from 'react-loading-indicators';
import React from 'react';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    try {
      // Send form data to server or handle form submission logic here
      console.log('Form Data:', formData);
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        // Show success toast
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Your message has been sent successfully!',
        });

        // Reset form data after successful submission
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Show failure toast
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        });
      }
    } catch (error) {
      // Show failure toast on error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <OrbitProgress color="#32cd32" size="medium" text="" textColor="#131212" />
        </div>
      )}
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Support Us</h1>
        <p className="mb-8">
          If you have any questions or need assistance, please feel free to
          contact us using the form below.
        </p>
        <div className="flex items-center mt-4 sm:mt-0">
  <a href="https://t.ly/68VkF" target="_blank" rel="noopener noreferrer" className="ml-4">
    <img src="/whatsapp-logo.png" alt="WhatsApp" className="h-12" />
  </a>
  <a href="https://t.me/+0TD8yBfFQVExZmFl" target="_blank" rel="noopener noreferrer" className="ml-4">
    <img src="/telegram-logo.png" alt="Telegram" className="h-12" />
  </a>
</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportPage;