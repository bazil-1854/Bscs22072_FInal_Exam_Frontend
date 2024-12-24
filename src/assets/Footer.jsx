import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-100  mx-auto px-4 xl:px-[55px] py-10">
          
            <div className='h-[3px] bg-gray-200 w-[85%] mx-auto'></div>
            <div className="flex mt-[15px] flex-wrap justify-between items-center">
                <div className="text-gray-600 flex items-center">
                    <p className='mr-[8px]'>© 2024 Task-Manager, Inc.</p>
                     </div>
                <div className="flex space-x-4">
                    <Link to="" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaFacebookF /></Link>
                    <Link to="" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaTwitter /></Link>
                    <Link to="" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaInstagram /></Link>
                    <Link to="" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaPinterestP /></Link>
                    <Link to="" className="bg-gray-600 text-white hover:text-gray-800 p-[3px] rounded-md"><FaLinkedinIn /></Link>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
