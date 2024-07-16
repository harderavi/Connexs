// src/components/UploadResource.tsx
import React, { useState, useEffect, useRef } from "react";
import InputText from "./ui/InputText";
import Button from "./ui/Button";
import Message from "./ui/Message";
import TagInput from "./ui/TagInput";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { uploadResource } from "../services/firebaseService";
import Dropdown from "./ui/Dropdown";
import { FiUpload, FiX } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const docTypes = [
  { id: "1", name: "promotion" },
  { id: "2", name: "printing" },
  { id: "3", name: "catlogs" },
  { id: "4", name: "whatsapp" },
];
interface UploadResourceProp {
  closePopover: () => void;
}
const UploadResource: React.FC<UploadResourceProp> = ({ closePopover }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState(docTypes[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState("");
  const { user } = useSelector((state: RootState) => state.auth);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0); // Progress state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [appear, setAppear] = useState(false);

  useEffect(() => {
    // Fetch existing tags from the server (or hardcode a list of common tags)
    const fetchTags = async () => {
      const response = await fetch(`${API_BASE_URL}/api/tags`);
      const tags = await response.json();
      setAllTags(tags);
    };

    fetchTags();
    setAppear(true);
    document.body.classList.add("overflow-hidden");  }, []);
  const handleFileBlockClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!title || !file || !type) {
      return setMessage("All fields are required");
    }
    setProgress(0);
    try {
      const { downloadUrl, size } = await uploadResource(
        file,
        setProgress
      );
      console.log(progress);
      const resource = {
        title,
        url: downloadUrl,
        type: type.name,
        tags,
        size,
        categories: categories.split(","),

        uploadedBy: user?._id,
      };
      const response = await fetch(`${API_BASE_URL}/api/resources/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resource),
      });
      if (response.ok) {
        setMessage("Resource uploaded successfully");
        handleOnClose();
      } else {
        setMessage("Failed to upload resource");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error uploading resource");
    }
  };

  const handleOnClose = () => {
    setAppear(false);
    if (appear) {
      setTimeout(() => {
        document.body.classList.remove("overflow-hidden");
        closePopover();
      }, 100);
    }
  };

  return (
    <div
      className={`w-full h-full fixed top-0 right-0 overflow-hidden transition-all ${
        appear ? "bg-black/30" : "bg-black/0"
      }`}
    >
      <div
        className={`flex bg-neutral-100 max-w-screen-sm ml-auto h-full transition-all duration-500 ${
          appear ? "translate-x-0" : "translate-x-[200px]"
        }`}
      >
        <div className="flex flex-col px-8 py-4 w-full gap-4">
          <button
            className="h-10 w-10 bg-white border border-neutral-300 rounded-full flex justify-center items-center ml-auto"
            onClick={handleOnClose}
          >
            <FiX />
          </button>
          <InputText
            label="Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <Dropdown
            title="Select Type"
            data={docTypes}
            onChange={(value) => setType(value || docTypes[0])}
            selected={type}
          />

          <TagInput tags={tags} suggestions={allTags} onTagsChange={setTags} />
          <InputText
            label="Categories (comma separated)"
            name="categories"
            onChange={(e) => setCategories(e.target.value)}
            type="text"
          />
          <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden />
          <div
            className="rounded-lg border border-blue-200 bg-blue-50 flex justify-center items-center min-h-36 p-4 text-blue-400 gap-3"
            onClick={handleFileBlockClick}
          >
            <span>
              <FiUpload />{" "}
            </span>
            <p>Upload File</p>
          </div>
          {progress > 0 && (
            <div className="min-h-2 w-full max-w-screen-sm bg-neutral-200 rounded-full p-1 my-3">
              <div
                style={{ width: `${progress}%` }}
                className=" bg-neutral-800 h-1 rounded-full"
              ></div>
            </div>
          )}
          <Button clickHandle={handleSubmit}>Save</Button>
          {message && <Message message={message} messageType={true} />}
        </div>
      </div>
    </div>
  );
};

export default UploadResource;
