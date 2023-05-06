import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteMenuItemMutation } from "../../store/service/menu-endpoints/menu.endpoints";
import { storeCategories } from "../../store/slice/Category.slice";
import { RootState } from "../../store/store";
import { Category, Category_Menu_Items } from "../../types";
import { DeletePopup } from "../form";

type propType = {
  onClose: any;
  data: Category_Menu_Items;
};

export const MenuDeletePopup = ({ onClose, data }: propType) => {
  const [drop, response] = useDeleteMenuItemMutation();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  useEffect(() => {
    if (response.isSuccess) {
      let payload: Category[];
      payload = categories.map((i) =>
        i.id === data.categoryId
          ? {
              ...i,
              category_menu_items: i.category_menu_items.filter(
                (i) => i.menu_itemsId !== data.menu_itemsId
              ),
            }
          : i
      );
      dispatch(storeCategories(payload));
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
    <>
      <DeletePopup
        onConfirm={handleDelete}
        onClose={onClose}
        disabled={response.isLoading}
        name={data.menu_items.name}
      />
    </>
  );
};
