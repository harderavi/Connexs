import FileSaver from "file-saver";
import { getDownloadURL, getStorage, ref } from "firebase/storage";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const markDocumentImportant = async (
    user:number | undefined,
  documentId: string,
) => {
  try {
    // Simulating useSelector usage here for demonstration (not actually used here)

    const response = await fetch(
      `${API_BASE_URL}/api/resources/markImportant`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user, documentId }),
      }
    );

    if (response.ok) {
      // Fetch updated resources after marking as important
    } else {
      console.error('Failed to mark document as important:', response.status);
    }
  } catch (error) {
    console.error('Error marking document as important:', error);
  }
};


export const getFileExtension = (url: string) => {
  const filename = url.substring(url.lastIndexOf("/") + 1);
  const spliteExtension = filename.split(".").pop()?.toLowerCase() || "";
  const extension = spliteExtension.split("?")[0]; // Remove query parameters from extension
  if(extension === "jpg" || extension === "jpeg" || extension === "png"){
    return "imageType"
  }else if(extension === "mp4"){
    return "videoType"
  }else if(extension === "pdf"){
    return "pdfType"
  }else{
    return "otherType"
  }
};

export const handleDownload = async (resourceUrl: string) => {
  try {
    const storage = getStorage();
    const url = await getDownloadURL(ref(storage, resourceUrl));
    const response = await fetch(url);
    const blob = await response.blob();

    // Use FileSaver to trigger the download
    FileSaver.saveAs(blob);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};