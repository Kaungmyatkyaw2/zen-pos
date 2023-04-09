import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateOptionsMutation,
  useUpdateOptionMutation,
} from "../../store/service/option-endpoints/Options.endopoints";
import { insertOption, storeOptions } from "../../store/slice/Option.slice";
import { RootState } from "../../store/store";
import { Option } from "../../types";
import { BtnPrimary, CheckboxToggle, InputField, TextArea } from "../form";

interface PropType {
  onClose: () => void;
  option: Option;
}

export const OptionEditForm = ({ onClose, option }: PropType) => {
  const [update, response] = useUpdateOptionMutation();
  const [formData, setFormData] = useState({
    name: option.name,
    max: "" + option.max,
    min: "" + option.min,
    isRequired: option.isRequired,
  });
  const options = useSelector((state: RootState) => state.option.options);
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      toast.success("Successfully created");
      const payload = options.map((i) =>
        i.id === option.id ? { ...response.data } : i
      );
      dispatch(storeOptions(payload));
      onClose();
    } else {
      if (response.isError) {
        toast.error("An error occured");
      }
    }
  }, [response]);

  const handleCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
    };

    update({ id: option.id, data: payload });
  };


  return (
    <>
      <div className="z-[10] bg-dark bg-opacity-95 fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center">
        <button
          onClick={onClose}
          disabled={response.isLoading}
          className="bg-dark text-[40px] px-[20px] py-[10px] rounded-[10px] absolute top-0 right-0"
        >
          <BsX />
        </button>

        <div className="w-[350px]">
          <h1 className="text-[30px] font-bold mb-[20px]">Create Options</h1>
          <form
            onSubmit={handleCreate}
            className="w-full space-y-[15px] pt-[20px]"
          >
            <InputField
              name="name"
              label="Option Name"
              placeholder="example name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.currentTarget.value })
              }
            />
            <div className="flex space-x-[10px]">
              <InputField
                name="max"
                label="Maximum"
                type="number"
                placeholder="Maximum"
                value={formData.max}
                onChange={(e) =>
                  setFormData({ ...formData, max: e.currentTarget.value })
                }
              />
              <InputField
                name="min"
                label="Min"
                type="number"
                placeholder="Minimum"
                value={formData.min}
                onChange={(e) =>
                  setFormData({ ...formData, min: e.currentTarget.value })
                }
              />
            </div>

            <CheckboxToggle
              leftName="Optional"
              rightName="Required"
              defaultChecked={formData.isRequired}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isRequired: e.currentTarget.checked,
                })
              }
            />

            <div className="pt-[10px]">
              <BtnPrimary
                disabled={
                  response.isLoading ||
                  !formData.max.trim().length ||
                  !formData.name.trim().length ||
                  !formData.min.trim().length
                }
                width={"full"}
                isLoading={response.isLoading}
              >
                Create
              </BtnPrimary>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
