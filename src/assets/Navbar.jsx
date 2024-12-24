import { useState } from 'react';
import { FaBars, FaSearch, FaSlidersH, FaTimes, FaUserCircle } from 'react-icons/fa'; 
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
//import airbnb from "../logo.svg";

import { motion } from 'framer-motion';
import { useAuthContext } from '../AuthProvider'; 

const Navbar = () => {
    const navigate = useNavigate();

    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false); 
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
 
 
    const handleLogout = () => {
        //localStorage.removeItem('token');
        logout();
        toggleMenu();
        navigate('/signin');
    };
 
    return (
        <header className="bg-white fixed w-full z-50 top-0"> 
            <nav className='md:block hidden'>
                <div className={`${location.pathname === '/' ? 'border-white pt-4' : 'border-b-[3px] border-gray-100 py-4'} mx-auto px-4 sm:px-6 md:px-[15px] lg:px-[35px] xl:px-[75px]`}>
                    <div className="flex justify-between items-center ">
                        <div className="flex items-center">
                            <NavLink to="/" className="text-[24px] font-[780] text-gray-500">
                                Task-Manager
                            </NavLink>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div onClick={toggleMenu} className="flex items-center space-x-2 border rounded-full px-3 py-2 hover:shadow-lg transition-shadow">
                                <div className='sm:block hidden'><GiHamburgerMenu className="text-xl text-gray-500" /></div>
                                <div className="sm:hidden">
                                    <button onClick={toggleMenu}>
                                        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                                    </button>
                                </div>
                                <FaUserCircle className="text-3xl text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {isOpen && (
                        <div className="md:block hidden" >
                            <motion.div onClick={toggleMenu}
                                initial={{ opacity: 1, x: 500 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.2, 0.8, 0.2, 1],
                                }}
                                className="flex flex-col absolute right-0 mr-[75px] w-[250px] bg-white rounded-lg border shadow-xl mt-5 p-4">
                                {user ? (
                                    <>
                                        <NavLink to="/profile" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                            Profile
                                        </NavLink>
                                        <button onClick={handleLogout} className="pl-[12px] text-start text-white py-[3px] bg-red-700 my-[8px] hover:bg-gray-200 hover:text-gray-700 rounded-lg">
                                            Logout
                                        </button>
                                    </>
                                ) : (<>
                                    <NavLink to="/" className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Sign up
                                    </NavLink>
                                    <NavLink to="/signIn" className="pl-[12px] block py-2 text-gray-600 font-[600] hover:bg-gray-100 rounded-lg">
                                        Log in
                                    </NavLink>
                                </>
                                )}
                            </motion.div>
                        </div>
                    )}
                </div>
            </nav>

            <nav className='md:hidden block'>
                <div className="flex justify-between items-center py-[10px] px-[18px] w-screen">
                <div className="flex items-center">
                            <NavLink to="/" className="text-[24px] font-[780] text-gray-500">
                                Task-Manager
                            </NavLink>
                        </div>
                    <div className='flex justify-center'>
                        <p className=" border-[2px] p-2 border-gray-500 rounded-full bg-gray-100">
                            <FaSlidersH onClick={toggleMenu} className="text-gray-500" size={20} />
                        </p>
                    </div>
                </div>
                {isOpen && (
                    <div className="sm:hidden">
                        <div className="flex flex-col z-10 bg-white rounded-lg shadow-md mt-2 p-4" >
                            <div className="w-full bg-gray-200 h-[2px] my-2"></div>
                            {user ? (
                                <>
                                    <NavLink to="/profile" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Profile
                                    </NavLink>
                                    <button onClick={handleLogout} className="pl-[12px] text-start block py-2 text-gray-600 hover:bg-gray-400 font-[600] rounded-lg">
                                        Logout
                                    </button>
                                </>
                            ) : (
                            <>
                                <NavLink to="/" onClick={toggleMenu} className="pl-[12px] block py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                    Sign up
                                </NavLink>
                                <NavLink to="/signIn" onClick={toggleMenu} className="pl-[12px] block py-2 text-red-700 hover:bg-gray-100 rounded-lg">
                                    Log in
                                </NavLink>
                            </>
                            )}
                        </div>
                    </div>
                )}
            </nav>

        </header >
    );
};

export default Navbar; 