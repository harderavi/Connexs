import React, { useCallback, useEffect, useState } from "react";

interface ProfilePicProps {
  picSrc?: string;
  size?: "sm" | "md" | "lg";
  styleClass?: string;
  loading?: boolean
}
const ProfilePic: React.FC<ProfilePicProps> = React.memo(
  ({ loading=false, picSrc, size = "sm", styleClass }) => {
    const PicSize =
      size === "lg" ? "w-24 h-24 text-4xl" : size === "md" ? "w-8 h-8 text-md" : "w-6 h-6 text-xs";
    const defaultPic =
    "https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg";

    const picSrcPath = picSrc || defaultPic;

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleImageLoad = useCallback(() => {
      setIsLoaded(true);
      setHasError(false);
    },[]);
    const handeImageError = () => {
      setIsLoaded(true);
      setHasError(true);
    };
    useEffect(() => {
      const img = new Image();
      img.src = picSrcPath;
      img.onload = handleImageLoad;
      img.onerror = handeImageError;
    }, [picSrcPath, handleImageLoad, handeImageError]);

    return (
      <div>
        {!isLoaded && (
          <div className={`${PicSize} absolute z-10 animate-spin  rounded-full border-0 border-l-2 border-dashed  border-gray-800 ${styleClass}`}> </div>
        )}
         {loading && (
          <div className={`${PicSize} absolute z-10 animate-spin  rounded-full border-0 border-l-2 border-dashed  border-gray-800 ${styleClass}`}> </div>
        )}
        {isLoaded && !hasError && (
          <img
            src={picSrcPath}
            className={`${PicSize} rounded-full bg-cover ${styleClass}`}
          />
        )} 
        { hasError &&
             <div className={`${PicSize} bg-blue-600 rounded-full flex justify-center items-center text-white/50 ${styleClass}`}>RH</div>
        }
      </div>
    );
  }
);

export default ProfilePic;
