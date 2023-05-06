import React, { useState, useEffect } from "react";
import { InputField } from "../components/form";
import { BsSearch } from "react-icons/bs";
import { useLazyGetCompaniesQuery } from "../store/service/company-endpoints/Company.endpoints";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { storeCompanies } from "../store/slice/CustomerOrder";
import { ScreenLoader } from "../components/loader";
import { RootState } from "../store/store";
import { CompanyCard } from "../components/company";
import { Company } from "../types";
import { useNavigate } from "react-router-dom";

export const Companies = () => {
  const [getCompanies, response] = useLazyGetCompaniesQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCompanies, setShowCompanies] = useState<Company[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector(
    (state: RootState) => state.customerOrder.companies
  );

  useEffect(() => {
    setShowCompanies(companies);
  }, [companies]);

  useEffect(() => {
    let payload = companies;

    if (search.length) {
      payload = companies.filter((i) => i.name.toLowerCase().includes(search));
    }

    setShowCompanies(payload);
  }, [search]);

  useEffect(() => {
    getCompanies("");
  }, []);

  useEffect(() => {
    if (response.isSuccess && !response.isFetching) {
      dispatch(storeCompanies(response.data));
      setIsLoading(false);
    } else if (response.isError) {
      toast.error("Error while fetching data");
      setIsLoading(false);
    }
  }, [response]);

  return isLoading ? (
    <ScreenLoader />
  ) : (
    <>
      <div className="p-[2rem]">
        <h1 className="text-[25px] font-bold text-center">
          Welcome To Zen App
        </h1>
        <div className="flex items-center h-[43px] bg-softestdark pl-[20px] rounded-[5px] mt-[20px]">
          <BsSearch />
          <InputField
            onChange={(e) =>
              setSearch(e.currentTarget.value.toLocaleLowerCase())
            }
            placeholder="Search restaurant..."
          />
        </div>
        <div>
          {showCompanies.length ? (
            showCompanies.map((i) => (
              <CompanyCard
                key={i.id}
                onClick={() => navigate(`/order?company_id=${i.id}`)}
                className="mt-[20px]"
                company={i}
              />
            ))
          ) : (
            <h1 className="text-[19px] text-center font-medium pt-[40px]">
              No Companies Found
            </h1>
          )}
        </div>
      </div>
    </>
  );
};
