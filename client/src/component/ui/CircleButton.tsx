interface CircleButtonProps {
  children: string | JSX.Element;
  size?: "sm" | "md" | "lg";
  styleClass?: string;
  handleClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
}
const CircleButton = ({ children, size, styleClass, handleClick }: CircleButtonProps) => {
  const btnSize = size === "lg" ? "w-24 h-24" : size === "md" ? "w-8 h-8" : "w-4 h-4 ";
  
  return (
    <button
      className={`${btnSize} bg-gray-200 rounded-full p-2 text-gray-700 ${styleClass}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default CircleButton;
