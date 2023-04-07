import { BtnPrimary, InputField } from "../form";
import { BsX } from "react-icons/bs";
import { useCreateCategoryMutation } from "../../store/service/category-endpoints/category.endpoints";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { insertCategory } from "../../store/slice/Category.slice";

interface PropType {
  onClose: () => void;
}

export const CategoryCreateForm = ({ onClose }: PropType) => {
  const [create, response] = useCreateCategoryMutation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    if (response.isSuccess) {
      toast.success("Successfully created");
      dispatch(insertCategory(response.data));
      onClose();
    }
    if (response.isError) {
      toast.error("An error occured");
    }
  }, [response]);

  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    create({ name });
  };

  return (
    <div className="z-[10] bg-dark bg-opacity-80 fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center">
      <button
        onClick={onClose}
        disabled={response.isLoading}
        className="bg-dark text-[40px] px-[20px] py-[10px] rounded-[10px] absolute top-0 right-0"
      >
        <BsX />
      </button>

      <div className="w-[300px]">
        <h1 className="text-[30px] font-bold mb-[20px]">Create Category</h1>
        <form onSubmit={handleCreate} className="w-full space-y-[15px]">
          <InputField
            name="name"
            label="Category Name"
            placeholder="example category"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <div className="pt-[10px]">
            <BtnPrimary
              disabled={response.isLoading}
              width={"full"}
              isLoading={response.isLoading}
            >
              Create Now
            </BtnPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};
