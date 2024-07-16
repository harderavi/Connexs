interface ButtonRoundedProps {
    children: string | JSX.Element;
    size?: "sm" | "md" | "lg";
    styleClass?: string;
    handleClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
  }
  const ButtonRounded = ({ children, size, styleClass, handleClick }: ButtonRoundedProps) => {
    const btnSize = size === "lg" ? "py-3" : size === "md" ? " py-2" : " py-1 ";
    
    return (
      <button
        className={`${btnSize} px-2 bg-white border border-neutral-300 rounded-lg flex justify-center items-center ${styleClass}`}
        onClick={handleClick}
      >
        {children}
      </button>
    );
  };
  
  export default ButtonRounded;
  