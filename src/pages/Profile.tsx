import {Button} from "antd";

const Profile = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'A passionate developer.',
        avatar: 'https://avatar.iran.liara.run/public/boy'
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src={user.avatar} alt="User avatar"/>
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Profile</div>
                    <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{user.name}</h1>
                    <p className="mt-2 text-gray-500">{user.email}</p>
                    <p className="mt-2 text-gray-500">{user.bio}</p>
                    <Button type="primary" className="mt-4">
                        Edit Profile
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;