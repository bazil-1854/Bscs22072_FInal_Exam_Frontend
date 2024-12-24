import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../AuthProvider';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'; 

const SignInnForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [focusField, setFocusField] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_BASE_URL}/task-manager/auth/login`,
        formData
      );

      //localStorage.setItem('token', response.data.token);
      //login(response.data.token);
      localStorage.setItem("token", response.data.token);
      alert('Login successful!'); 
      navigate('/profile');

    }
    catch (error) {
      console.error(error);
      setLoading(false);
      alert('Login failed!'); 
    }
  };
  
  const handleFocus = (field) => {
    setFocusField(field);
  };

  const handleBlur = () => {
    setFocusField('');
  };

  if (loading) {
    return <div className="bg-white w-full min-h-screen flex justify-center items-center">
      <div>
        <div className="animate-spin"><div className="lg:scale-[0.7] scale-[0.65] custom-loader"></div></div>
        <p className='text-[14px] text-gray-700 font-[600]'>Signing In ...</p>
      </div>
    </div>;
  }

  return (
    <main className='h-screen w-full pt-[75px] flex justify-center items-center bg-gray-100'>
      <div className='flex flex-col w-[90%] md:w-[500px] md:scale-[1] scale-[0.9]'>

        <div className="scale-[1.2] flex mx-auto"> 
          <div className="text-gray-600 ml-[4px] md:text-[25px] text-[25px] font-[700]">Task-<span className='text-gray-400'>Manager</span></div>
        </div> 
        
        <div className='py-[35px] px-[25px] flex flex-col bg-white rounded-xl'>
          <form onSubmit={handleSubmit} className='lg:px-[15px]'>
            <div className="relative mt-4 mb-6 flex items-center">
              <div className="bg-gray-700 mr-2 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                <AiOutlineMail className="text-gray-50 text-[22px]" />
              </div>

              <div className="flex-1">
                <label htmlFor="email" className={`absolute left-12 text-gray-900 font-[600] text-[16px] transition-all duration-300 ${focusField === 'email' || email ? '-top-5 text-sm' : 'top-2'}`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  className="w-full py-3 bg-transparent text-gray-700 border-b-[2px] border-gray-800  focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="relative mt-4 mb-6 flex items-center">
              <div className="bg-gray-700 mr-2 rounded-full flex items-center justify-center w-[40px] h-[40px]">
                <AiOutlineLock className="text-gray-50 text-[22px]" />
              </div>
              <div className="flex-1">
                <label htmlFor="password" className={`absolute left-12 text-gray-900 font-[600] text-[16px] transition-all duration-300 ${focusField === 'password' || password ? '-top-5 text-sm' : 'top-2'}`}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  className="w-full py-3 bg-transparent text-gray-700 border-b-[2px] border-gray-800 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button type="submit" className="hover:text-blue-100 hover:bg-blue-950 w-full my-[15px] bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg text-white font-[500] py-[12px] transition duration-300">
              Sign In
            </button>

            {/* <p onClick={() => setIsModalOpen(true)} className='text-blue-600 underline mb-[8px] text-[15px] font-[600]'>Forgot Password</p> */}
          </form>
          <div className='w-full flex px-[12px] md:px-[19px]  items-center space-x-2'>
            <div className='w-[47%] h-[2px] bg-[#c5c5c5]'></div>
            <p className='text-gray-500 w-[4%] text-[14px]'>OR</p>
            <div className='w-[47%] h-[2px] bg-[#c5c5c5]'></div>
          </div>

          <p className='mx-auto cursor-pointer mt-[18px] text-gray-500 font-medium'>Dont Have An Account?<span onClick={() => navigate("/")} className='text-gray-700 ml-[8px] underline'>Sign Up</span></p>

        </div>
      </div>
    </main>
  );
};

export default SignInnForm; 