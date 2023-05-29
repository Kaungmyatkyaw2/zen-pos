import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineDropbox,
  AiOutlineAlipay,
  AiOutlineNotification,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/Auth.slice";
import { SideBtn } from "./SideBtn";
import { RootState } from "../../store/store";
import { BsX } from "react-icons/bs";
import { toggleSidebar } from "../../store/slice/interface.slice";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const showSidebar = useSelector(
    (state: RootState) => state.interface.showSidebar
  );

  return (
    <div
      className={`md:w-fit md:h-fit w-full md:static fixed top-0 ${
        showSidebar ? " left-0" : "left-[-100%]"
      } h-full bg-black bg-opacity-70 z-[999]`}
    >
      <button
        onClick={() => dispatch(toggleSidebar(""))}
        className="bg-dark text-[40px] px-[20px] py-[10px] rounded-[10px] absolute top-0 right-0 md:hidden block z-[999999]"
      >
        <BsX />
      </button>
      <div className="md:fixed relative top-0 left-0 w-[70px] bg-dark h-[100vh] pt-[40px] space-y-[40p] z-[999999] text-primary">
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
          onClick={() => navigate("/admin_order")}
          isActive={location.pathname === "/admin_order"}
          icon={<AiOutlineNotification />}
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
    </div>
  );
};
