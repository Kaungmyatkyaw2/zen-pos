import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { CategoryCreateForm, CategoryCard } from "../components/category";
import { BtnPrimary } from "../components/form";
import { MediumLoader } from "../components/loader";
import { LayoutProvider } from "../components/theme";
import { useLazyGetCategoriesQuery } from "../store/service/category-endpoints/category.endpoints";
import { storeCategories } from "../store/slice/Category.slice";
import { RootState } from "../store/store";

export const Category = () => {
  const [getCategories, response] = useLazyGetCategoriesQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  useEffect(() => {
    getCategories("");
  }, []);

  useEffect(() => {
    if (response.isSuccess && !response.isFetching) {
      dispatch(storeCategories(response.data));
      setIsLoading(false);
    } else if (response.isError) {
      toast.error("Error while fetching data");
      setIsLoading(false);
    }
  }, [response]);

  return (
    <>
      <LayoutProvider>
        {isLoading ? (
          <MediumLoader />
        ) : (
          <div className="w-full">
            <BtnPrimary
              className="shadow-custom"
              onClick={() => setOpenCreateForm(true)}
            >
              <AiOutlinePlus />{" "}
              <span className="pl-[5px]">Create Category</span>
            </BtnPrimary>

            <div className="flex flex-wrap sm:justify-start justify-evenly w-full">
              {categories.map((i, index) => (
                <CategoryCard key={index} category={i} />
              ))}
            </div>
          </div>
        )}
      </LayoutProvider>

      {openCreateForm && (
        <CategoryCreateForm onClose={() => setOpenCreateForm(false)} />
      )}
    </>
  );
};
