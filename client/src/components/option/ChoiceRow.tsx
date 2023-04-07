import { Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteChoiceMutation,
  useToggleChoiceMutation,
  useUpdateChoiceMutation,
} from "../../store/service/choice-endpoints/choice.endpoints";
import { storeOptions, updateChoice } from "../../store/slice/Option.slice";
import { RootState } from "../../store/store";
import { Choice } from "../../types";
import { CheckboxToggle } from "../form";
import { BsX } from "react-icons/bs";

interface PropType {
  choice: Choice;
}

export const ChoiceRow = ({ choice }: PropType) => {
  const [drop, dropResponse] = useDeleteChoiceMutation();
  const [update, updateResponse] = useUpdateChoiceMutation();
  const [toggle, toggleResponse] = useToggleChoiceMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [showChoice, setShowChoice] = useState<Choice>(choice);
  const options = useSelector((state: RootState) => state.option.options);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dropResponse.isSuccess) {
      toast.success("Successfully deleted");
      dispatch(
        storeOptions(
          options.map((i) =>
            i.id === showChoice.options_id
              ? {
                  ...i,
                  choices: i.choices.filter((c) => c.id !== showChoice.id),
                }
              : i
          )
        )
      );
    } else {
      if (dropResponse.isError) {
        toast.error("An error occured");
      }
    }
  }, [dropResponse]);

  useEffect(() => {
    if (updateResponse.isSuccess) {
      toast.success("Successfully updated");

      dispatch(
        updateChoice({
          option_id: showChoice.options_id,
          choice_id: showChoice.id,
          payload: showChoice,
        })
      );
      setIsEdit(false);
    } else {
      if (updateResponse.isError) {
        toast.error("An error occured");
      }
    }
  }, [updateResponse]);

  useEffect(() => {
    if (toggleResponse.isSuccess) {
      toast.success("Successfully toggled");
      setShowChoice({ ...showChoice, isAvailable: !showChoice.isAvailable });
      dispatch(
        updateChoice({
          option_id: showChoice.options_id,
          choice_id: showChoice.id,
          payload: { ...showChoice, isAvailable: !showChoice.isAvailable },
        })
      );
    } else {
      if (toggleResponse.isError) {
        toast.error("An error occured");
      }
    }
  }, [toggleResponse]);

  const handleDelete = () => {
    drop(showChoice.id);
  };

  const handleUpdate = () => {
    update({
      id: showChoice.id,
      data: { name: showChoice.name, price: showChoice.price },
    });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ marginTop: "0px", border: "none", zIndex: 9999 }}
        open={dropResponse.isLoading}
        message={`Deleting ${showChoice.name}`}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ marginTop: "0px", border: "none", zIndex: 9999 }}
        open={updateResponse.isLoading}
        message={`Updating ${showChoice.name}`}
      />
      <div className="w-full flex justify-between items-center text-dark py-[10px]">
        <div className="w-[25%] pr-[10px]">
          <input
            disabled={!isEdit}
            value={showChoice.name}
            onChange={(e) => {
              setShowChoice({ ...showChoice, name: e.target.value });
            }}
            type="text"
            id="website-admin"
            className={`rounded-none rounded-r-lg ${
              isEdit ? "bg-gray-50  border border-gray-300" : "bg-white"
            } text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5`}
            placeholder="Name"
          />
        </div>
        <div className="w-[25%]">
          <div className="flex">
            <span
              className={`inline-flex items-center px-3 text-sm text-gray-900 ${
                isEdit ? "bg-gray-200 border border-r-0" : "px-0"
              } border-gray-300 rounded-l-md`}
            >
              $
            </span>
            <input
              disabled={!isEdit}
              value={"" + showChoice.price}
              onChange={(e) => {
                setShowChoice({ ...showChoice, price: +e.target.value });
              }}
              type="number"
              id="website-admin"
              className={`rounded-none rounded-r-lg ${
                isEdit ? "bg-gray-50  border border-gray-300" : "bg-white"
              } text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5`}
              placeholder="Price"
            />
          </div>
        </div>
        <div className="w-[25%]">
          <CheckboxToggle
            checked={showChoice.isAvailable}
            onChange={() => {
              toggle({
                id: showChoice.id,
                data: { available: !showChoice.isAvailable },
              });
            }}
          />
        </div>
        <div className="w-[25%]">
          <div className="space-x-[20px]">
            <button
              disabled={dropResponse.isLoading || updateResponse.isLoading}
              onClick={() => {
                if (isEdit) {
                  handleUpdate();
                } else {
                  setIsEdit(true);
                }
              }}
              className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white"
            >
              {isEdit ? (
                <AiOutlineCheck className="text-[16px]" />
              ) : (
                <AiOutlineEdit className="text-[16px]" />
              )}
            </button>
            <button
              disabled={dropResponse.isLoading || updateResponse.isLoading}
              onClick={() => {
                if (isEdit) {
                  setShowChoice(choice);
                  setIsEdit(false);
                } else {
                  handleDelete();
                }
              }}
              className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white"
            >
              {isEdit ? (
                <BsX className="text-[19px]" />
              ) : (
                <AiOutlineDelete className="text-[16px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
