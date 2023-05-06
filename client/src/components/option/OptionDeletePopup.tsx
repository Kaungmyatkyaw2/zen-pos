import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteOptionMutation } from "../../store/service/option-endpoints/Options.endopoints";
import { storeOptions } from "../../store/slice/Option.slice";
import { RootState } from "../../store/store";
import { Option } from "../../types";
import { DeletePopup } from "../form";

type propType = {
  onClose: any;
  data: Option;
};

export const OptionDeletePopup = ({ onClose, data }: propType) => {
  const [drop, response] = useDeleteOptionMutation();
  const options = useSelector((state: RootState) => state.option.options);
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      const payload = options.filter((i) => i.id !== data.id);
      dispatch(storeOptions(payload));
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
        name={data.name}
      />
    </>
  );
};
