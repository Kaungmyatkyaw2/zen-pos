import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BtnPrimary, InputField } from "../components/form";
import { LayoutProvider } from "../components/theme";
import {
  useLazyGetCompanyQuery,
  useUpdateCompanyMutation,
} from "../store/service/company-endpoints/Company.endpoints";
import { insertCompany } from "../store/slice/User.slice";
import { RootState } from "../store/store";
import setting from "./../assets/setting.svg";
import { toast } from "react-hot-toast";
import { MediumLoader } from "../components/loader";

export const Setting = () => {
  const dispatch = useDispatch();
  const company = useSelector((state: RootState) => state.user.company);
  const [isLoading, setIsLoading] = useState(true);
  const [getCompany, getCompanyResponse] = useLazyGetCompanyQuery();
  const [updateCompany, response] = useUpdateCompanyMutation();
  const token = useSelector((state: RootState) => state.auth.access_token);
  const [data, setData] = useState({
    name: "",
    currency: "",
    tax_rate: 0,
    charge_rate: 0,
  });

  useEffect(() => {
    if (getCompanyResponse.isSuccess && !getCompanyResponse.isFetching) {
      dispatch(insertCompany(getCompanyResponse.data));
      setIsLoading(false);
    } else if (getCompanyResponse.isError) {
      toast.error("Error while fetching data");
      setIsLoading(false);
    }
  }, [getCompanyResponse]);

  useEffect(() => {
    if (company) {
      getCompany(company.id);
    }
  }, []);

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
      {isLoading ? (
        <MediumLoader></MediumLoader>
      ) : (
        <div className="w-full md:pb-0 pb-[50px]">
          <div>
            <h1 className="text-[25px] font-bold">Edit The Company Info</h1>
            <p className="text-[16px] text-gray-200 pt-[10px]">
              Let our expert team help refine your message and enhance your
              brand with our editing services.
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
            <div className=" md:flex hidden md:w-[70%] justify-center">
              <img className="w-[400px]" src={setting} alt="" />
            </div>
          </div>
        </div>
      )}
    </LayoutProvider>
  );
};
