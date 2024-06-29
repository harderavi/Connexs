import { BsEye, BsEyeSlash, BsGoogle } from "react-icons/bs";
import Button from "../component/ui/Button";
import InputText from "../component/ui/InputText";
import { useRef, useState } from "react";
import BrandLogo from "../component/BrandLogo";
import { BiLoader } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { Link } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signin = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignin = async () => {
    // setLoader(true);
    if (!formData.email || !formData.password) {
      setMessage("All fields are require");
      if (formData.email === "" && emailRef.current) {
        emailRef.current.focus();
      } else if (formData.password === "" && passwordRef.current) {
        passwordRef.current.focus();
      }
      setLoader(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Make sure this line is present
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Sign-in failed");
      }
      const userData = await response.json();
      console.log(userData);
      dispatch(setUser(userData)); // Dispatch setUser action with username from response
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="h-screen bg-surface-light flex justify-center items-center px-5 ">
      <div className="max-w-xs w-full flex flex-col gap-y-6">
        <div className="text-center">
          <div className="flex justify-center">
          <BrandLogo />
          </div>
          <h2 className="text-3xl ">Welcome Back!</h2>
        </div> 
        <InputText
          name="email"
          label="Email"
          type="text"
          ref={emailRef}
          value={formData.email}
          onChange={handleInputChange}
        />
        <div>
          <div className="relative">
            <InputText
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              ref={passwordRef}
              value={formData.password}
              onChange={handleInputChange}
            />
            <span
              className="absolute top-2 right-2 cursor-pointer p-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <BsEyeSlash size={20} className="text-primary-300" />
              ) : (
                <BsEye size={20} className="text-primary-300" />
              )}
            </span>
          </div>
          <p className="mt-1 text-right">Forgot Password?</p>
        </div>
        <Button variant="primary" clickHandle={handleSignin} disabled={loader}>
          {loader && <BiLoader className="animate-spin " />}
          Signin
        </Button>
        {message && <p>{message}</p>}
        <div className="border-b border-primary-100/50 flex justify-center">
          <span className="translate-y-[15px] bg-surface-light px-3 py-1 rounded-full">
            or
          </span>
        </div>
        <Button variant="secondary">
          <BsGoogle /> Continue with Google
        </Button>
        <Link  to={'/home'}>Home</Link>
      </div>
    </div>
  );
};

export default Signin;
