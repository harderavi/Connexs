import React, { useEffect, useRef, useState } from "react";
import InputText from "../component/ui/InputText";
import Button from "../component/ui/Button";
import Dropdown from "../component/ui/Dropdown";
import { useNavigate } from "react-router-dom";
import Message from "../component/ui/Message";
import ProfilePic from "../component/ui/ProfilePic";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"; 
import { storage } from "../firebase";
import { FiTrash } from "react-icons/fi"; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RoleData {
  id: string;
  name: string;
}
interface FetchRoleData {
  _id: string;
  name: string;
}
const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roleName: "",
    teamName: "",
    profilePicture: "",
  });
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const profileFileRef = useRef<HTMLInputElement>(null);
  const [roleData, setRoleData] = useState<RoleData[]>([]);
  const [teamData, setTeamData] = useState<RoleData[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPercent, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRoles = async () => {
      const response = await fetch(`${API_BASE_URL}/api/role/getRoles`, {
        method: "GET",
      });
      if (response.ok) {
        const data: FetchRoleData[] = await response.json();

        const transformedRoles: RoleData[] = data.map((role) => ({
          id: role._id,
          name: role.name,
        }));
        setRoleData(transformedRoles);
      }
    };
    fetchRoles();
    const fetchTeams = async () => {
      const response = await fetch(`${API_BASE_URL}/api/team/getTeams`, {
        method: "GET",
      });
      if (response.ok) {
        const data: FetchRoleData[] = await response.json();

        const transformedTeams: RoleData[] = data.map((team) => ({
          id: team._id,
          name: team.name,
        }));
        setTeamData(transformedTeams);
      }
    };
    fetchRoles();
    fetchTeams();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRoleChange = (value: string | undefined) => {
    setFormData((prevState) => ({ ...prevState, roleName: value || "" }));
  };
  const handleTeamChange = (value: string | undefined) => {
    setFormData((prevData) => ({ ...prevData, teamName: value || "" }));
  };
  const handleFormSubmit = async () => {
    setError("");
    const { username, email, password, roleName, teamName } = formData;
    if (!username || !email || !password || !roleName || !teamName) {
      return setError("All fields are required!");
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        if (errorData.error && errorData.error.message) {
          setError(errorData.error.message);
        } else {
          setError("An error occurred. Please try again.");
        }
        throw new Error(
          errorData.error?.message || "An error occurred. Please try again."
        );
      }
      const result = await response.json();
      console.log("User registered successfully:", result);
      navigate("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] ?? null;
    setUploadFile(file);
  };
  useEffect(() => {
    if (uploadFile) {
      handleFileUpload(uploadFile);
    }
  }, [uploadFile]);
  const handleFileUpload = (image: File | null) => {
    setMessage("");
    
    if (image) {
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      setUploadCompleted(false);
          setUploading(true)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuc
          if (error) {
            console.log(error);
          }
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, profilePicture: downloadURL });
            // handleSave();
            setUploadCompleted(true);
            setUploading(false) 
            setUploadFile(null)
            setMessage("Profile picture uploaded successfully");
          });
        }
      );
    }
  };
  const handleFileDelete = () => {
    const storage = getStorage();
    const desertRef = ref(storage, formData.profilePicture);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log('File deleted successfully');
        setFormData({ ...formData, profilePicture: '' });
        setUploadFile(null)

      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
  };
  return (
    <div className="h-screen bg-neutral-100 flex flex-col justify-center items-center px-5 ">
      <div className="max-w-xs w-full flex flex-col gap-y-2">
        <div className="flex justify-center">
          <div
            className="cursor-pointer relative flex flex-col gap-2"
            onClick={() => {
              profileFileRef.current?.click();
            }}
          >
            
            <ProfilePic size="lg" picSrc={formData.profilePicture}  loading={uploading? true: false} />
            <p className="text-center text-neutral-400">
            {
            uploadPercent > 0 && uploadPercent < 100 && 

           uploadPercent
          
        }
                  </p>

            <input
              type="file"
              name="profilefile"
              accept="image/png, image/jpeg"
              ref={profileFileRef}
              onChange={handleFileChange}
              hidden
            />
          </div>
          {
            formData.profilePicture && uploadCompleted &&           <span onClick={handleFileDelete} className="absolute w-8 h-8 cursor-pointer bg-red-600 flex justify-center items-center rounded-full translate-x-10 translate-y-5"><FiTrash className="text-white"/></span>

          }
        </div>
        <InputText
          name="username"
          label="Name"
          type="text"
          ref={usernameRef}
          value={formData.username}
          onChange={handleInputChange}
          validate={error && !formData.username ? true : false}
        />
        <InputText
          name="email"
          label="Email"
          type="text"
          ref={usernameRef}
          value={formData.email}
          onChange={handleInputChange}
          validate={error && !formData.email ? true : false}
        />
        <InputText
          name="password"
          label="Pasword"
          type="password"
          ref={passwordRef}
          value={formData.password}
          onChange={handleInputChange}
          validate={error && !formData.password ? true : false}
        />
        <Dropdown
          data={roleData}
          id="role"
          title="User role"
          onChange={handleRoleChange}
          validate={error && !formData.email ? true : false}
        />
        <Dropdown
          data={teamData}
          id="team"
          title="Team"
          onChange={handleTeamChange}
          validate={error && !formData.teamName ? true : false}
        />
        <Button className="mt-4" clickHandle={handleFormSubmit}>
          Signup
        </Button>
        <div className="py-4 flex items-start justify-start w-full">
          {error && <Message messageType={true} message={error} />}
          {message && <Message messageType={false} message={message} />}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
