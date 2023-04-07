import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BtnPrimary, InputField } from "../components/form";
import { LayoutProvider } from "../components/theme";
import { useUpdateCompanyMutation } from "../store/service/company-endpoints/Company.endpoints";
import { insertCompany } from "../store/slice/User.slice";
import { RootState } from "../store/store";
import setting from "./../assets/setting.svg";

export const Setting = () => {
  const dispatch = useDispatch();
  const company = useSelector((state: RootState) => state.user.company);
  const [updateCompany, response] = useUpdateCompanyMutation();
  const [data, setData] = useState({
    name: "",
    currency: "",
    tax_rate: 0,
    charge_rate: 0,
  });

  useEffect(() => {
    if (company) {
      setData({
        name: company.name,
        currency: company.currency,
        tax_rate: company.tax_rate,
        charge_rate: company.charge_rate,
      });
    }
  }, [company]);

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(insertCompany(response.data));
    }
  }, [response]);

  const handleUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    updateCompany(data);
  };

  return (
    <LayoutProvider>
      <div className="w-full">
        <div>
          <h1 className="text-[25px] font-bold">Edit The Company Info</h1>
          <p className="text-[16px] text-gray-200 pt-[10px]">
            Let our expert team help refine your message and enhance your brand
            with our editing services.
          </p>
        </div>
        <div className="w-full flex justify-between items-center">
          <form
            onSubmit={handleUpdate}
            className="lg:w-[30%] md:w-[60%] w-[90%] space-y-[20px] pt-[30px]"
          >
            <InputField
              id="name"
              label="Company name"
              placeholder="example name"
              name="name"
              value={data.name}
              onChange={(e) =>
                setData({ ...data, name: e.currentTarget.value })
              }
            />
            <InputField
              id="currency"
              label="Currency"
              placeholder="MMK"
              name="currency"
              value={data.currency}
              onChange={(e) =>
                setData({ ...data, currency: e.currentTarget.value })
              }
            />
            <InputField
              id="tax"
              label="Tax Rate"
              placeholder="example tax rate"
              name="tax_rate"
              type="number"
              value={data.tax_rate}
              onChange={(e) =>
                setData({ ...data, tax_rate: e.currentTarget.valueAsNumber })
              }
            />
            <InputField
              id="charge_rate"
              label="Charge Rate"
              placeholder="example charge rate"
              type="number"
              name="charge_rate"
              value={data.charge_rate}
              onChange={(e) =>
                setData({
                  ...data,
                  charge_rate: e.currentTarget.valueAsNumber,
                })
              }
            />
            <BtnPrimary isLoading={response.isLoading} width={"full"}>
              Submit
            </BtnPrimary>
          </form>
          <div className=" flex w-[70%] justify-center">
            <img className="w-[400px]" src={setting} alt="" />
          </div>
        </div>
      </div>
    </LayoutProvider>
  );
};
