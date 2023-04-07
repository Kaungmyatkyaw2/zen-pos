import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDeleteOptionMutation } from "../../store/service/option-endpoints/Options.endopoints";
import { Option } from "../../types";
import { MenuDeletePopup } from "../menu/MenuDeletePopup";
import { ChoiceCreateForm } from "./ChoiceCreateForm";
import { ChoiceRow } from "./ChoiceRow";
import { OptionDeletePopup } from "./OptionDeletePopup";
import { OptionEditForm } from "./OptionEditForm";

interface PropType {
  option: Option;
}

export const OptionTable = ({ option }: PropType) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showCreateChoiceForm, setShowCreateChoiceForm] = useState(false);

  return (
    <>
      <div className="bg-white  flex justify-between items-center p-4 border border-light rounded-lg shadow dark:bg-slate dark:border-slate">
        <div className="text-[15px] text-dark dark:text-white  ">
          <h5 className="uppercase text-lg">
            {option.name} ({option.isRequired ? "Required" : "Optional"})
          </h5>
          <span className="text-primaryOrange text-sm">*</span>
          <span className="text-softGray">
            Maximum {option.max} choices and Minium {option.min} choices
          </span>
        </div>
        <div className="space-x-[20px]">
          <button
            onClick={() => setShowEditForm(true)}
            className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white"
          >
            <AiOutlineEdit className="text-[20px]" />
          </button>
          <button
            onClick={() => setShowDeletePopup(true)}
            className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white"
          >
            <AiOutlineDelete className="text-[20px]" />
          </button>
        </div>
      </div>

      <div className="mt-6  p-2 bg-white border border-light rounded-lg shadow sm:p-4 dark:bg-slate dark:border-slate">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg uppercase font-bold leading-none text-dark dark:text-gray-400">
            Options
          </h5>
          <button
            onClick={() => setShowCreateChoiceForm(true)}
            className="ml-1 inline-block dark:text-gray-50 text-dark border border-gray-800 dark:border-gray-50  rounded-full px-3 py-1 text-sm font-semibold"
          >
            + Create New
          </button>
        </div>
        <div className="">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <div className="w-full flex justify-between text-dark font-bold">
              <div className="w-[25%]">
                <h1>Name</h1>
              </div>
              <div className="w-[25%]">
                <h1>Price</h1>
              </div>
              <div className="w-[25%]">
                <h1>Available</h1>
              </div>
              <div className="w-[25%]">
                <h1>Action</h1>
              </div>
            </div>
            {option.choices?.length ? (
              option.choices.map((choice, index) => (
                <ChoiceRow key={index} choice={choice} />
              ))
            ) : (
              <h1 className="text-center text-darkGray py-[20px] text-[20px] text-red-600">
                No choices Here
              </h1>
            )}
          </ul>
        </div>
      </div>

      {showDeletePopup && (
        <OptionDeletePopup
          onClose={() => setShowDeletePopup(false)}
          data={option}
        />
      )}
      {showEditForm && (
        <OptionEditForm
          onClose={() => setShowEditForm(false)}
          option={option}
        />
      )}

      {showCreateChoiceForm && (
        <ChoiceCreateForm
          onClose={() => setShowCreateChoiceForm(false)}
          option_id={option.id}
        />
      )}
    </>
  );
};
