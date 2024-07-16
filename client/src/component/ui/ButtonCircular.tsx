interface CircleButtonProps {
  children: string | JSX.Element;
  size?: "sm" | "md" | "lg";
  styleClass?: string;
  handleClick: (e:React.MouseEvent<HTMLButtonElement>) => void;
}
const ButtonCircular = ({ children, size, styleClass, handleClick }: CircleButtonProps) => {
  const btnSize = size === "lg" ? "w-24 h-24" : size === "md" ? "w-8 h-8" : "w-4 h-4 ";
  
  return (
    <button
      className={`${btnSize} bg-white border border-neutral-300 dark:bg-neutral-800 rounded-full flex justify-center items-center ${styleClass}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default ButtonCircular;
