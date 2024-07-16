import { useEffect, useState } from "react";
import { FiCalendar, FiClock, FiDownload, FiStar, FiX } from "react-icons/fi";
import ProfilePic from "./ui/ProfilePic";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaStar } from "react-icons/fa";
import { formatStdDate, formatTime } from "../services/formatServices";
import { getFileExtension, handleDownload, markDocumentImportant } from "../services/resourceService";
import Button from "./ui/Button";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ResourcePopoverProps {
  closePopover: () => void;
  resource: string;
}

interface UploadedBy {
  _id: string;
  profilePicture: string;
  username: string;
}

interface ResourceInfo {
  _id: string;
  title: string;
  url: string ;
  createdAt: string;
  uploadedBy: UploadedBy;
  markedAsImportantBy: string[];
  tags: string[];
}

const ResourcePopover = ({ closePopover, resource }: ResourcePopoverProps) => {
  const [appear, setAppear] = useState(false);
  const [resourceInfo, setResourceInfo] = useState<ResourceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleOnClose = () => {
    setAppear(false);
    if (appear) {
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
        closePopover();
      }, 100);
    }
  };

  const fetchResourceById = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/resources/${resource}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setResourceInfo(data);
    } catch (error) {
      console.error("Failed to fetch resource:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (resourceId: string) => {
    console.log("Clicked Delete");
    console.log("Resource ID:", resourceId); // Log the resource ID

    if (!resourceId) {
      console.error("Invalid resource ID");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/resources/${resourceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.message}`);
      }

      handleOnClose();
      const data = await response.json();
      console.log("Resource deleted successfully:", data);
    } catch (error) {
      console.error("Error deleting resource:"); // Log the error for debugging
    }
  };

  useEffect(() => {
    setAppear(true);
    document.body.classList.add("overflow-hidden");

    fetchResourceById();
  }, []);

  const handleImportant = async () => {
    try {
      await markDocumentImportant(user?._id, resourceInfo?._id || "");
      fetchResourceById();
    } catch (error) {
      console.error("Error handling important document:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`w-full h-full fixed top-0 right-0 overflow-hidden transition-all ${appear ? "bg-black/30" : "bg-black/0"}`}>
      <div className={`flex bg-white max-w-[70%] ml-auto h-full transition-all duration-500 ${appear ? "translate-x-0" : "translate-x-[200px]"}`}>
        <div className="flex-1 bg-black px-6 py-6 overflow-auto max-w-[70%] flex items-center">
          {resourceInfo && 
                 <>
                 {getFileExtension(resourceInfo.url) === "imageType" ?
                  (
                   <img
                     src={resourceInfo?.url}
                     className="  w-full bg-neutral-200"
                   />
                 ) : getFileExtension(resourceInfo.url) === "videoType" ? (
                   <video
                     src={resourceInfo.url}
                     className=" w-full bg-neutral-200"
                     controls
                   />
                 ) : getFileExtension(resourceInfo.url) === "pdfType" ? (
                   <object
                     data={resourceInfo.url}
                     type="application/pdf"
                     width="100%"
                     height="100%"
                     className=" h-full w-full bg-neutral-200"
                   >
                     <p>
                       Your browser does not support PDFs.{" "}
                       <a href={resourceInfo.url}>Download the PDF</a>.
                     </p>
                   </object>
                 ) : (
                   <p>Unsupported file format</p>
                 )}
               </>        
          }
        </div>
        <div className="w-2/6 p-8">
          <div className={`flex py-5 gap-4`}>
            <button className="h-10 w-10 bg-white border border-neutral-300 rounded-full flex justify-center items-center" onClick={handleImportant}>
              {resourceInfo?.markedAsImportantBy.includes(String(user?._id)) ? <FaStar className="text-red-500" /> : <FiStar />}
            </button>
            <button className="h-10 w-10 bg-white border border-neutral-300 rounded-full flex justify-center items-center" 
          onClick={() => {
            if (resourceInfo) {
              handleDownload(resourceInfo.url);
            }
          }}
                        >
              <FiDownload />
            </button>
            <button className="h-10 w-10 bg-white border border-neutral-300 rounded-full flex justify-center items-center ml-auto" onClick={handleOnClose}>
              <FiX />
            </button>
          </div>
          <h1 className="text-xl font-bold capitalize">{resourceInfo?.title || "Untitled"}</h1>
          <p className="flex items-center gap-2">
            <FiCalendar /> {resourceInfo?.createdAt ? formatStdDate(resourceInfo.createdAt) : "-"} <FiClock /> {resourceInfo?.createdAt ? formatTime(resourceInfo.createdAt) : "-"}
          </p>
          <div className="flex flex-col mt-4">
            <div className="flex items-center gap-3">
              {resourceInfo && <ProfilePic picSrc={resourceInfo?.uploadedBy?.profilePicture} />}
              <p className="flex flex-col capitalize gap-0 leading-3">
                {resourceInfo?.uploadedBy?.username}
                <span className="text-sm text-neutral-500">Team Lead</span>
              </p>
            </div>
            <div>
              <h2 className="mt-5 mb-3">Tags</h2>
              <div className="flex gap-2">
                {resourceInfo?.tags.map((tag) => (
                  <p key={tag} className="px-3 py-[2px] border border-neutral-400 rounded-md text-neutral-500">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Button clickHandle={() => deleteMedia(resource)}>Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePopover;
