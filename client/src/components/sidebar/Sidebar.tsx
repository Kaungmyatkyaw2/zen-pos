import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineDropbox,
  AiOutlineAlipay,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/Auth.slice";
import { SideBtn } from "./SideBtn";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className="fixed top-0 left-0 w-[70px] bg-dark h-[100vh] pt-[40px] space-y-[40p text-primary">
        <SideBtn
          onClick={() => navigate("/")}
          isActive={location.pathname === "/"}
          icon={<AiOutlineHome />}
        />
        <SideBtn
          onClick={() => navigate("/category")}
          isActive={location.pathname === "/category"}
          icon={<AiOutlineDropbox />}
        />
        <SideBtn
          onClick={() => navigate("/option")}
          isActive={location.pathname === "/option"}
          icon={<AiOutlineAlipay />}
        />
        <SideBtn
          onClick={() => navigate("/setting")}
          isActive={location.pathname === "/setting"}
          icon={<AiOutlineSetting />}
        />

        <div
          onClick={() => dispatch(logout())}
          className="absolute bottom-[20px] left-[50%] -translate-x-[50%] cursor-pointer"
        >
          <AiOutlineLogout className="text-[20px] mx-auto" />
        </div>
      </div>
    </>
  );
};
