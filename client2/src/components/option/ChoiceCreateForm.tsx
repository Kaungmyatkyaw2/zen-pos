import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useCreateChoicesMutation } from "../../store/service/choice-endpoints/choice.endpoints";
import { insertOption, storeOptions } from "../../store/slice/Option.slice";
import { RootState } from "../../store/store";
import { BtnPrimary, InputField } from "../form";

interface PropType {
  onClose: () => void;
  option_id: number;
}

export const ChoiceCreateForm = ({ onClose, option_id }: PropType) => {
  const [create, response] = useCreateChoicesMutation();
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
  const options = useSelector((state: RootState) => state.option.options);
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess) {
      toast.success("Successfully created");
      dispatch(
        storeOptions(
          options.map((i) =>
            i.id === option_id
              ? { ...i, choices: [...i.choices, ...response.data] }
              : i
          )
        )
      );
      onClose();
    } else {
      if (response.isError) {
        toast.error("An error occured");
      }
    }
  }, [response]);

  const handleCreate = () => {
    const payload = {
      id: option_id,
      data: createChoice.map((i) => ({ name: i.name, price: i.price })),
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
          <h1 className="text-[30px] font-bold mb-[20px]">Create Choices</h1>
          <div className="w-full space-y-[15px] pt-[20px]">
            <form>
              <div className="flex space-x-[10px] items-center">
                <InputField
                  label="Choice Name"
                  type="text"
                  placeholder="example name"
                  value={choice.name}
                  onChange={(e) =>
                    setChoice({ ...choice, name: e.currentTarget.value })
                  }
                />
                <InputField
                  label="Price"
                  type="number"
                  placeholder="Price"
                  value={"" + choice.price}
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
                  onClick={() => {
                    setCreateChoice([
                      ...createChoice,
                      { ...choice, id: Date.now() },
                    ]);
                    setChoice({
                      name: "",
                      price: 0,
                    });
                  }}
                >
                  <AiOutlinePlus />
                </BtnPrimary>
              </div>
              <div className="pt-[10px] space-y-[10px]">
                {createChoice.map((i) => (
                  <div
                    key={i.id}
                    className="flex items-center space-x-[20px] bg-softdark px-[10px] py-[5px] rounded-sm"
                  >
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
                onClick={() => handleCreate()}
                width={"full"}
                isLoading={response.isLoading}
              >
                Create
              </BtnPrimary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
