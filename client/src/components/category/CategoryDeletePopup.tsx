import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useDeleteCategoryMutation } from "../../store/service/category-endpoints/category.endpoints";
import { dropCategory } from "../../store/slice/Category.slice";
import { Category } from "../../types";
import { SmallLoader } from "../loader";

type propType = {
  onClose: any;
  data: Category;
};

export const CategoryDeletePopup = ({ onClose, data }: propType) => {
  const [drop, response] = useDeleteCategoryMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(dropCategory(data.id));
      toast.success("Deleted Successfully");
      onClose();
    }
    if (response.isError) {
      toast.error("An error occured");
    }
  }, [response]);

  const handleDelete = () => {
    drop(data.id);
  };

  return (
    <div
      className={` fixed top-0 left-0 z-[9999] bg-dark h-[100vh] w-full flex justify-center items-center bg-opacity-80`}
    >
      <div className="relative transform overflow-hidden roundewayd-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg rounded-xl">
        <div className="bg-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-primaryOrange"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="mb-2">
                <p className="text-sm  text-white">
                  Are you sure to delete model?
                </p>
              </div>
              <h3
                className="text-lg font-medium leading-6 text-white"
                id="modal-title"
              >
                {`Delete  ${data?.name}!`}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-dark px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            onClick={handleDelete}
            disabled={response.isLoading}
            type="button"
            className="flex justify-center items-center rounded-md border border-transparent bg-red-500 h-[39px] w-[100px] text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-primaryOrange focus:ring-offset-2 sm:ml-3 sm:text-sm"
          >
            {response.isLoading ? <SmallLoader /> : "Delete"}
          </button>
          <button
            type="button"
            disabled={response.isLoading}
            className="mt-3 inline-flex w-full justify-center rounded-md border border-dark bg-white px-4 py-2 text-base font-medium text-dark shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
