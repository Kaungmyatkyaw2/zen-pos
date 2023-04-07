import { BtnPrimary, CheckboxToggle, InputField, TextArea } from "../form";
import { BsX } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateMenuItemMutation } from "../../store/service/menu-endpoints/menu.endpoints";
import { storeCategories } from "../../store/slice/Category.slice";
import { RootState } from "../../store/store";
import { Category, Category_Menu_Items, Option } from "../../types";
import DropZone from "react-dropzone";
import { CategoryAutoComplete } from "../category";
import { OptionAutoComplete } from "../option";

interface PropType {
  onClose: () => void;
  menu: Category_Menu_Items;
}

export const MenuEditForm = ({ onClose, menu }: PropType) => {
  const [update, response] = useUpdateMenuItemMutation();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isAvailable, setIsAvailable] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();
  const form = useRef<HTMLFormElement>(null!);
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const none = useSelector((state: RootState) => state.category.noneCategories);
  const options = useSelector((state: RootState) => state.option.options);
  const [chosenCategory, setChosenCategory] = useState<Category[]>(
    menu.menu_items.category_menu_items?.map((i) =>
      i.categoryId == null ? none : i.category
    )
  );
  const [chosenOptions, setChosenOptions] = useState<Option[]>(
    options.filter((o) =>
      menu.menu_items.options.map((i) => i.id).includes(o.id)
    )
  );

  useEffect(() => {
    if (response.isSuccess) {
      let payload: Category[];

      payload = categories.map((i) =>
        chosenCategory.map((i) => i.id).includes(i.id)
          ? {
              ...i,
              category_menu_items: i.category_menu_items.map((i) =>
                i.menu_itemsId === menu.menu_itemsId ? { ...response.data } : i
              ),
            }
          : {
              ...i,
              category_menu_items: i.category_menu_items.filter(
                (i) => i.menu_itemsId !== menu.menu_itemsId
              ),
            }
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
    formData.append(
      "toDisconnect",
      JSON.stringify(
        menu.menu_items.options
          .filter((o) => !chosenOptions.map((i) => i.id).includes(o.id))
          .map((i) => i.id)
      )
    );
    formData.append(
      "toConnect",
      JSON.stringify(
        chosenOptions
          .filter(
            (o) => !menu.menu_items.options.map((i) => i.id).includes(o.id)
          )
          .map((i) => i.id)
      )
    );

    formData.append("isAvailable", JSON.stringify(isAvailable));
    formData.append("image_url", JSON.stringify(menu.menu_items.image_url));
    formData.append(
      "image_public_id",
      JSON.stringify(menu.menu_items.image_public_id)
    );

    if (file) {
      formData.append("file", file);
    }

    update({ id: menu.menu_itemsId, data: formData });
  };

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      setFile(acceptedFiles[0]);
      setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  return (
    <div className="z-[10] bg-dark bg-opacity-95 fixed top-0 left-0 w-full h-[100vh] overflow-scroll pb-[30px] pt-[90px] scrollbar-hide flex justify-center items-center">
      <button
        onClick={onClose}
        disabled={response.isLoading}
        className="bg-dark text-[40px] px-[20px] py-[10px] rounded-[10px] absolute top-0 right-0"
      >
        <BsX />
      </button>

      <div className="w-[300px]">
        <h1 className="text-[30px] font-bold mb-[20px]">Edit Menu Item</h1>
        <DropZone onDrop={handleFileDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input accept="image/*" {...getInputProps()} />
              <div className="max-w-xl">
                <label className="flex justify-center w-full h-32 px-4 transition  border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-400 focus:outline-none">
                  <span className="flex items-center space-x-2">
                    <div className="mx-auto">
                      {(previewUrl || menu.menu_items.image_url) && (
                        <img
                          className="rounded w-[100px] h-[100px] object-cover"
                          alt="menu preview"
                          src={
                            previewUrl ||
                            (menu?.menu_items?.image_url !== null
                              ? menu?.menu_items?.image_url
                              : "")
                          }
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
            defaultValue={menu.menu_items.name}
          />
          <div className="flex space-x-[10px]">
            <InputField
              name="price"
              label="Price"
              type="number"
              placeholder="price"
              defaultValue={menu.menu_items.price}
            />
            <InputField
              name="discount"
              label="Discount (%)"
              type="number"
              placeholder="discount"
              defaultValue={menu.menu_items.discount}
            />
          </div>

          <TextArea
            height={"h-[100px]"}
            name="description"
            label="Description"
            type="text"
            placeholder="describe the menu item"
            defaultValue={menu.menu_items.description || ""}
          />

          <CategoryAutoComplete
            title="Category"
            add={(data) => setChosenCategory(data)}
            chose={chosenCategory}
            org={categories}
          />
          <OptionAutoComplete
            title="Options"
            add={(data) => setChosenOptions(data)}
            chose={chosenOptions}
            org={options}
          />

          <CheckboxToggle
            leftName="Out of stock"
            rightName="Available"
            defaultChecked={menu.isAvailable}
            onChange={(e) => setIsAvailable(e.currentTarget.checked)}
          />
          <div className="">
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
