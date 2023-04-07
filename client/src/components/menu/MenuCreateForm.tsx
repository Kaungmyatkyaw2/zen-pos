import { BtnPrimary, InputField, TextArea } from "../form";
import { BsX } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useCreateMenuItemMutation } from "../../store/service/menu-endpoints/menu.endpoints";
import { storeCategories } from "../../store/slice/Category.slice";
import { RootState } from "../../store/store";
import { Category, Option } from "../../types";
import DropZone from "react-dropzone";
import { CategoryAutoComplete } from "../category";
import { OptionAutoComplete } from "../option";

interface PropType {
  onClose: () => void;
  id: number | null;
}

export const MenuCreateForm = ({ onClose, id }: PropType) => {
  const [create, response] = useCreateMenuItemMutation();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const options = useSelector((state: RootState) => state.option.options);
  const [chosenCategory, setChosenCategory] = useState<Category[]>(
    categories.filter((i) => i.id === id)
  );
  const [choseOption, setChoseOption] = useState<Option[]>([]);
  const dispatch = useDispatch();
  const form = useRef<HTMLFormElement>(null!);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (response.isSuccess) {
      let payload: Category[];

      payload = categories.map((i) =>
        chosenCategory.map((i) => i.id).includes(i.id)
          ? {
              ...i,
              category_menu_items: [...i.category_menu_items, response.data],
            }
          : i
      );

      dispatch(storeCategories(payload));
      onClose();
    }
    if (response.isError) {
      toast.error("An error occured");
    }
  }, [response]);

  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    formData.append(
      "categoryId",
      JSON.stringify(chosenCategory.map((i) => i.id))
    );

    formData.append("optionId", JSON.stringify(choseOption.map((i) => i.id)));

    if (file) {
      formData.append("file", file);
    }

    create(formData);
  };

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFile(acceptedFiles[0]);
      setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  return (
    <div className="z-[10] bg-dark bg-opacity-95 fixed top-0 left-0 w-full h-[100vh] scrollbar-hide pb-[30px] pt-[90px] overflow-scroll flex justify-center items-center">
      <button
        onClick={onClose}
        disabled={response.isLoading}
        className="bg-dark text-[40px] px-[20px] py-[10px] rounded-[10px] absolute top-0 right-0"
      >
        <BsX />
      </button>

      <div className="w-[300px]">
        <h1 className="text-[30px] font-bold mb-[20px]">Create Menu Item</h1>
        <DropZone onDrop={handleFileDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input accept="image/*" {...getInputProps()} />
              <div className="max-w-xl">
                <label className="flex justify-center w-full h-32 px-4 transition  border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-400 focus:outline-none">
                  <span className="flex items-center space-x-2">
                    <div className="mx-auto">
                      {previewUrl && (
                        <img
                          className="rounded w-[100px] h-[100px] object-cover"
                          alt="menu preview"
                          src={previewUrl}
                        />
                      )}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-slate"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>

                    <span className="font-medium text-gray-400">
                      Drop new photo to update, or
                      <span className="ml-1 text-blue-600 underline">
                        browse
                      </span>
                    </span>
                  </span>
                </label>
              </div>
            </div>
          )}
        </DropZone>
        <form
          ref={form}
          onSubmit={handleCreate}
          className="w-full space-y-[15px] pt-[20px]"
        >
          <InputField
            name="name"
            label="Menu Item Name"
            placeholder="example name"
          />
          <div className="flex space-x-[10px]">
            <InputField
              name="price"
              label="Price"
              type="number"
              placeholder="price"
            />
            <InputField
              name="discount"
              label="Discount (%)"
              type="number"
              placeholder="discount"
            />
          </div>

          <TextArea
            height={"h-[100px]"}
            name="description"
            label="Description"
            type="text"
            placeholder="describe the menu item"
          />

          <CategoryAutoComplete
            title="Category"
            add={(data) => setChosenCategory(data)}
            chose={chosenCategory}
            org={categories}
          />

          <OptionAutoComplete
            title="Options"
            add={(data) => setChoseOption(data)}
            chose={choseOption}
            org={options}
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
