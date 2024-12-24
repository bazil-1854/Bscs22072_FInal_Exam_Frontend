import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MyLoader from '../../assets/MyLoader';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token)
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/task-manager/profile/user-profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(response.data);
                setLoading(false);
            }
            catch (err) {
                setError('Error fetching profile data');
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <MyLoader />;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <main className='px-6 min-h-screen bg-gray-100 pt-[110px] lg:pt-[150px]'>
            <div className='lg:px-[110px] px-[15px] md:px-[45px]'>
                <div className=" bg-white p-6 rounded-[22px] border ">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-[28px] font-semibold">About Bazil</h3>
                    </div>

                    <p><span className='font-[700]  mr-[4px]'>Fullname:</span> {userInfo.fullName}</p>
                    <p><span className='font-[700]  mr-[4px]'>Email:</span> {userInfo.email}</p>
                    <p><span className='font-[700]  mr-[4px]'>About:</span> {userInfo.about}</p>
                    <p><span className='font-[700]  mr-[4px]'>About:</span> {userInfo.createdAt}</p>
                </div>
            </div>
        </main >
    );
};

export default Profile; 