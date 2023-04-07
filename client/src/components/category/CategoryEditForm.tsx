import { BtnPrimary, InputField } from "../form";
import { BsX } from "react-icons/bs";
import { useUpdateCategoryMutation } from "../../store/service/category-endpoints/category.endpoints";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  insertCategory,
  updateCategory,
} from "../../store/slice/Category.slice";
import { Category } from "../../types";

interface PropType {
  onClose: () => void;
  data: Category;
}

export const CategoryEditForm = ({ data, onClose }: PropType) => {
  const [update, response] = useUpdateCategoryMutation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  useEffect(() => {
    setName(data.name);
  }, [data]);

  useEffect(() => {
    if (response.isSuccess) {
      toast.success("Successfully created");
      dispatch(updateCategory({ id: data.id, payload: response.data }));
      onClose();
    }
    if (response.isError) {
      toast.error("An error occured");
    }
  }, [response]);


  const handleUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    update({id:data.id , data : {name} });
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
        <h1 className="text-[30px] font-bold mb-[20px]">Update Category</h1>
        <form onSubmit={handleUpdate} className="w-full space-y-[15px]">
          <InputField
            name="name"
            label="Category Name"
            placeholder="example category"
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
          <div className="pt-[10px]">
            <BtnPrimary
              disabled={response.isLoading}
              width={"full"}
              isLoading={response.isLoading}
            >
              Update Now
            </BtnPrimary>
          </div>
        </form>
      </div>
    </div>
  );
};
