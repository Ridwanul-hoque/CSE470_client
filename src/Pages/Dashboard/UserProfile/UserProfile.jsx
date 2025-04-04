import React, { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Providers/AuthProviders";


const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get(`/users?email=${user.email}`)
                .then(res => {
                    if (res.data.length > 0) {
                        setUserInfo(res.data[0]);
                    }
                })
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, [user, axiosPublic]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0D0D2B] px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
                <img
                    src={userInfo?.image || "https://via.placeholder.com/150"}
                    alt="User Profile"
                    className="w-32 h-32 mx-auto rounded-full border-4 border-[#FE5F75] object-cover"
                />
                <h2 className="mt-4 text-2xl font-bold text-[#FE5F75]">{userInfo?.name || user?.displayName || "User Name"}</h2>
                <p className="mt-2 text-gray-700">{user?.email}</p>
                <p className="mt-2 text-gray-700">{userInfo?.phone || "Phone not provided"}</p>
            </div>
        </div>
    );
};

export default UserProfile;