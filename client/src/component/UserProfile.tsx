import React, { useEffect, useState, useCallback } from "react";
import ProfilePic from "./ui/ProfilePic";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import InputText from "./ui/InputText";
import Button from "./ui/Button";
import Radio from "./ui/Checkbox";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useFetchRoles, useFetchTeams } from "../hooks/useFetchMasterData";
import Dropdown from "./ui/Dropdown";

interface UserProfileProp {
  userId?: string;
  onUserUpdate?: ()=> void;
}

interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
}

interface User {
  username: string;
  email: string;
  profilePicture: string;
  gender: string;
  role: string;
  team: string;
}

const UserProfile = ({ userId, onUserUpdate }: UserProfileProp) => {
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [error, setError] = useState("");

  const { roleData, error: roleError } = useFetchRoles();
   const { teamData, error: teamError } = useFetchTeams();

  const handleRoleChange = (value: DropdownItem | undefined | null) => {
      setFormData((prevState) => ({ ...prevState, role: value?.id || "" }));
    };

  const handleTeamChange = (item: DropdownItem | undefined | null) => {
    setFormData((prevState) => ({ ...prevState, team: item?.id || "" }));
  };

  const fetchUserProfile = useCallback(async () => {
    setFormData({});
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/user/${userId  }`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setViewUser(result);
    } catch (err) {
      setError("Failed to fetch user profile.");
    }
  }, [userId]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!viewUser) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Update failed");
      }
      const data = await response.json()
      console.log(data)
      fetchUserProfile();
      if( onUserUpdate){
        onUserUpdate();
      }
   
    } catch (err) {
      setError("Failed to update user profile.");
    }
  };
  const handleDeleteUser = async () => {
    console.log(userId)
    if (!userId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        if (onUserUpdate) {
          onUserUpdate();
        }
      } else {
        setError("Failed to delete user.");
      }
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="flex flex-col w-full max-w-xs">
      <div className="flex justify-center">
        <ProfilePic size="lg" picSrc={viewUser?.profilePicture} />
        </div>
        <h3 className="text-center">{viewUser?.username}</h3>
        <p className="text-center">{viewUser?.email}</p>
        <div>
          <form onSubmit={handleSubmit}>
            <InputText
              name="username"
              label="Name"
              type="text"
              value={formData.username || viewUser?.username || ""}
              onChange={handleInputChange}
              
            />
            <div className="flex gap-2 pt-4">
              <Radio
                name="gender"
                value="male"
                label="Male"
                checked={
                  formData.gender === "male" || viewUser?.gender === "male"
                }
                onChange={handleInputChange}
              />
              <Radio
                name="gender"
                value="female"
                label="Female"
                checked={
                  formData.gender === "female" || viewUser?.gender === "female"
                }
                onChange={handleInputChange}
              />
            </div>
            <Dropdown
              data={roleData}
              id="role"
              title="User role"
              selected={
                roleData.find((role) => role.id === viewUser?.role) || null
              }
              onChange={handleRoleChange}
              validate={!!error && !formData.role}
            />
            <Dropdown
              data={teamData}
              id="team"
              title="Team"
              selected={
                teamData.find((team) => team.id === viewUser?.team) || null
              }
              onChange={handleTeamChange}
              validate={!!error && !formData.team}
            />
            <Button className="w-full mt-4" variant="primary" type="submit">
              Update
            </Button>
            <Button className="w-full mt-4" variant="secondary"  clickHandle={handleDeleteUser}>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
