import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useCreateOptionsMutation } from "../../store/service/option-endpoints/Options.endopoints";
import { insertOption } from "../../store/slice/Option.slice";
import { BtnPrimary, CheckboxToggle, InputField, TextArea } from "../form";
import { validateNumber } from "../../function";

interface PropType {
  onClose: () => void;
}

export const OptionCreateForm = ({ onClose }: PropType) => {
  const [create, response] = useCreateOptionsMutation();
  const [formData, setFormData] = useState({
    name: "",
    max: "",
    min: "0",
    isRequired: false,
  });
  const [choice, setChoice] = useState({
    name: "",
    price: 0,
  });
  const [createChoice, setCreateChoice] = useState<
    {
      name: string;
      price: number;
      id: number;
    }[]
  >([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (formData.isRequired) {
      setFormData({ ...formData, min: "1" });
    } else {
      setFormData({ ...formData, min: "0" });
    }
  }, [formData.isRequired]);

  useEffect(() => {
    if (response.isSuccess) {
      toast.success("Successfully created");
      dispatch(insertOption(response.data));
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
      choices: createChoice.map((i) => ({ name: i.name, price: i.price })),
    };

    create(payload);
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
                onKeyPress={(e) => validateNumber(e, false)}
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
                onKeyPress={(e) => validateNumber(e, true)}
                value={formData.min}
                disabled={!formData.isRequired}
                onChange={(e) =>
                  setFormData({ ...formData, min: e.currentTarget.value })
                }
              />
            </div>

            <CheckboxToggle
              leftName="Optional"
              rightName="Required"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isRequired: !formData.isRequired,
                })
              }
            />

            <form>
              <div className="flex space-x-[10px] items-center">
                <InputField
                  label="Choice Name"
                  type="text"
                  placeholder="example name"
                  onChange={(e) =>
                    setChoice({ ...choice, name: e.currentTarget.value })
                  }
                />
                <InputField
                  label="Price"
                  type="number"
                  placeholder="Price"
                  onChange={(e) =>
                    setChoice({
                      ...choice,
                      price: e.currentTarget.valueAsNumber,
                    })
                  }
                />
                <BtnPrimary
                  type="button"
                  disabled={!choice.name.length || choice.price === undefined}
                  onClick={() =>
                    setCreateChoice([
                      ...createChoice,
                      { ...choice, id: Date.now() },
                    ])
                  }
                >
                  <AiOutlinePlus />
                </BtnPrimary>
              </div>
              <div className="pt-[10px] space-y-[10px]">
                {createChoice.map((i) => (
                  <div className="flex items-center space-x-[20px] bg-softdark px-[10px] py-[5px] rounded-sm">
                    <h1 className="w-[50%]">{i.name}</h1>
                    <h1 className="w-[50%]">{i.price}$</h1>
                    <BtnPrimary
                      type="button"
                      className="!bg-red-600"
                      onClick={() =>
                        setCreateChoice(
                          createChoice.filter((c) => c.id !== i.id)
                        )
                      }
                    >
                      <AiOutlineDelete />
                    </BtnPrimary>
                  </div>
                ))}
              </div>
            </form>

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
