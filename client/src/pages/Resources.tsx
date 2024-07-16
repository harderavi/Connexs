import { useEffect, useState } from "react";
import UploadResource from "../component/UploadResource";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaRegStar, FaStar } from "react-icons/fa";
import {
  FiDownload,
  FiFileText,
  FiFilm,
  FiFolder,
  FiImage,
  FiMaximize,
  FiPlus,
 
} from "react-icons/fi";
import ProfilePic from "../component/ui/ProfilePic";
import { formatBytesToMB, formatStdDate } from "../services/formatServices";
import ResourcePopover from "../component/ResourcePopover";
import { handleDownload, markDocumentImportant } from "../services/resourceService";
import ButtonCircular from "../component/ui/ButtonCircular";
import ButtonRounded from "../component/ui/ButtonRounded";
import {getFileExtension} from "../services/resourceService"
interface Resource {
  _id: string;
  title: string;
  url: string;
  type: string;
  tags: string[];
  categories: string[];
  size: number;
  uploadedBy: { username: string; profilePicture: string };
  createdAt: string;
  markedAsImportantBy: string[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Resources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showMedia, setShowMedia] = useState("");
  const [currentCategory, setCurrentCategory] = useState('Recent')
  useEffect(() => {
    fetchResources();
  }, [showMedia, showForm]);

  const fetchResources = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/resources/getResources`
      );
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    }
  };





  const handleImportant = async (documentId: string) => {
    try {
      await markDocumentImportant(user?._id, documentId);
      fetchResources();
    } catch (error) {
      console.error("Error handling important document:", error);
    }
  };

  return (
    <div>
      <div
        className={`max-w-screen-xl mx-auto flex flex-col gap-4 transition-all duration-100 overflow-hidden ${
          showForm || showMedia ? "pr-[20%]" : ""
        }`}
      >
        <div className="flex justify-between py-3 ">
            <h2>Resource List</h2>
          <div className="flex gap-2 items-center">
            <div className="bg-neutral-200 p-1 rounded-lg min-w-96 flex gap-3 ">
              <ButtonRounded styleClass={`${currentCategory=='Recent'? '': ' bg-neutral-50/0 border-0'}`} handleClick={()=>setCurrentCategory('Recent')}>Recent</ButtonRounded>
              <ButtonRounded styleClass={`${currentCategory==='Important'? '': 'bg-neutral-50/0 border-0'}`} handleClick={()=>setCurrentCategory('Important')}>Important</ButtonRounded>
              <ButtonRounded styleClass={`${currentCategory==='Document'? '': 'bg-neutral-50/0 border-0'}`} handleClick={()=>setCurrentCategory('Document')}>Document</ButtonRounded>
            </div>
          </div>
          <ButtonCircular size="md" handleClick={() => setShowForm(!showForm)}>
            <FiPlus />
          </ButtonCircular>
        </div>
        <div className="flex flex-wrap">
          {resources.map((resource, index) => (
            <div key={index} className="flex flex-col w-1/4 p-4 rounded">
              <div
                className="bg-neutral-200 h-36 flex justify-center items-center rounded-lg  overflow-hidden group relative cursor-pointer"
                onMouseOver={() => setHoveredIndex(index)}
                onClick={() => setShowMedia(resource._id)}
              >
                {hoveredIndex === index && (
                  <>
                    {getFileExtension(resource.url) === "imageType" ?
                     (
                      <img
                        src={resource.url}
                        className="absolute h-full w-full bg-neutral-200"
                      />
                    ) : getFileExtension(resource.url) === "videoType" ? (
                      <video
                        src={resource.url}
                        className="absolute h-full w-full bg-neutral-200"
                        controls
                      />
                    ) : getFileExtension(resource.url) === "pdfType" ? (
                      <object
                        data={resource.url}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        className="absolute h-full w-full bg-neutral-200"
                      >
                        <p>
                          Your browser does not support PDFs.{" "}
                          <a href={resource.url}>Download the PDF</a>.
                        </p>
                      </object>
                    ) : (
                      <p>Unsupported file format</p>
                    )}
                  </>
                )}
             {
             getFileExtension(resource.url) === "imageType" ? (
               <FiImage size={36} className="text-gray-700" />
              ) : getFileExtension(resource.url) === "videoType" ?(
                  <FiFilm size={36} className="text-gray-700" />
                ) : getFileExtension(resource.url) === "pdfType" ? (
                  <FiFileText size={36} className="text-gray-700" />
                ) :   (
                  <FiFolder size={36} className="text-gray-700" />
                )
              }
                {resource.markedAsImportantBy.includes(String(user?._id)) && (
                  <span className="h-8 w-8 bg-white border border-neutral-300 rounded-full flex justify-center items-center absolute right-3 top-3">
                    <FaStar className="text-red-500 " />
                  </span>
                )}
                <div className="absolute  w-full h-full max-h-full bottom-0 group-hover:opacity-100 opacity-0 flex flex-col gap-2 justify-between p-3 ">
                  <div className="flex flex-col justify-end items-end gap-2">
                    <ButtonCircular
                      size="md"
                      handleClick={(e) => {
                        handleImportant(resource._id);
                        e.stopPropagation();
                      }}
                    >
                      {resource.markedAsImportantBy.includes(
                        String(user?._id)
                      ) ? (
                        <FaStar className="text-red-500" />
                      ) : (
                        <FaRegStar />
                      )}
                    </ButtonCircular>
                    <ButtonCircular
                      size="md"
                      handleClick={(e) => {
                        setShowMedia(resource._id);
                        e.stopPropagation();
                      }}
                    >
                      <FiMaximize />
                    </ButtonCircular>
                    <ButtonCircular
                      size="md"
                      handleClick={(e) => {
                        handleDownload(
                          resource.url                        );
                        e.stopPropagation();
                      }}
                    >
                      <FiDownload />
                    </ButtonCircular>
                  </div>
                  <div className="flex justify-end gap-3">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white rounded-full py-[2px] px-2 flex text-xs font-semibold capitalize "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="flex justify-between py-2"
                onMouseOver={() => setHoveredIndex(index)}
              >
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg">
                    {resource.title ? resource.title : "Untitled"}
                  </h3>
                  <p className="text-xs font-medium">
                    {formatStdDate(resource.createdAt)}{" "}
                    {resource?.size && (
                      <span className="">
                        {" "}
                        <span className=" text-neutral-300">|</span>{" "}
                        {`${formatBytesToMB(resource?.size)}`}
                      </span>
                    )}
                  </p>
                </div>
                <p>
                  <ProfilePic picSrc={resource.uploadedBy?.profilePicture} />
                  {resource.uploadedBy?.username}
                </p>
              </div>
            </div>
          ))}
        </div>

      
       
     
      </div>
      {showForm && (
             
             <UploadResource  closePopover={()=>setShowForm(false)} />
         )}
      {showMedia && (
        <ResourcePopover
          resource={showMedia}
          closePopover={() => setShowMedia("")}
        />
      )}
    </div>
  );
};

export default Resources;
