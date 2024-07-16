  import  { useEffect, useState } from "react";
  import ProfilePic from "../component/ui/ProfilePic";
  import { FiPlus } from "react-icons/fi";
  import UserProfile from "../component/UserProfile";
  import { useSelector } from "react-redux";
  import { RootState } from "../store/store";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  interface Members {
    _id: string;
    username: string;
    profilePicture: string;
  }
  interface Team {
    _id: string;
    name: string;
    members: Members[];
  }

  const UserPage = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [remainingUser, setRemainingUser] = useState<Members[]>([]);
    const [userTab, setUserTab] = useState(0);
    const { user } = useSelector((state: RootState) => state.auth);
    const [viewProfile, setViewProfile] = useState<string>();

    const fetchTeamData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/team/teams`, {
          method: "get",
        });
        if (response.ok) {
          const data = await response.json();
          setTeams(data.teams);
          setRemainingUser(data.remainingUsers);
        }
      } catch (err) {}
    };
    useEffect(() => {
      fetchTeamData();
      console.log(user)
      setViewProfile(user?._id.toString())
    }, []);
    const handleFetchTeamData = () => {
      fetchTeamData();
    };


    return (
      <div className="flex mx-auto max-w-screen-xl">
        <div className="max-w-xs  bg-white rounded-sm p-4">
          {teams &&
            teams.map((team, index) => (
              <div key={index}>
                <div
                  key={index}
                  onClick={() =>
                    setUserTab(userTab === index + 1 ? 0 : index + 1)
                  }
                  className="flex justify-between py-2 cursor-pointer border-t border-neutral-200 "
                >
                  <h2>{team.name} </h2>
                  <FiPlus />
                </div>
                <div
                  className={`avatar-group  py-2 flex   ${
                    userTab === index + 1 ? "flex-col gap-2" : ""
                  }`}
                >
                  {team.members.map((user, index) => (
                    <div className="flex gap-4 cursor-pointer " key={index}>
                      <div  onClick={()=>setViewProfile(user._id)}
                        style={{
                          marginLeft:
                          index === 0 || userTab === index + 1
                              ? 0
                              : -(5 + (index + 5)),
                        }}
                        className={`transition-all inline-block duration-100  hover:z-20 relative rounded-full  shadow-md hover:shadow-primary-400 border border-gray-50/50 group relative `}
                      >
                        <ProfilePic
                          picSrc={user.profilePicture}
                          size="sm"
                          styleClass=" "
                          
                        />
                        <p className="group-hover:flex hidden absolute bg-white py-1 px-3 rounded-full shadow-lg -top-[100%]">{user.username}</p>
                      </div>
                      {userTab === index + 1 && <p>{user.username}</p>}
                    </div>
                  ))}
                  
                </div>
              
              </div>
            ))}
            {
                    remainingUser.map((user, index)=>(
                      <div onClick={()=>setViewProfile(user._id)} key={index}>
                        <ProfilePic
                          picSrc={user.profilePicture}
                          size="sm"
                          styleClass=" "
                          
                        />
                    <p>{user.username}</p> 
                        </div>
                    ))
                  }
        </div>
        <UserProfile userId={viewProfile} onUserUpdate={handleFetchTeamData}   />
      </div>
    );
  };

  export default UserPage;
