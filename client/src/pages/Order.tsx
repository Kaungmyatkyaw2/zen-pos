import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, Drawer, Tab } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { TabContext, TabList } from "@mui/lab";
import { ScreenLoader } from "../components/loader";
import { useQuery } from "../helper";
import { useLazyGetCompanyQuery } from "../store/service/company-endpoints/Company.endpoints";
import { storeInfo } from "../store/slice/CustomerOrder";
import { RootState } from "../store/store";
import { Cart, OrderBanner, OrderTabPanel } from "../components/order";

export const Order = () => {
  const [getCompany, response] = useLazyGetCompanyQuery();
  const [value, setValue] = useState("0");
  const [anchor, setAnchor] = useState(false);
  const dispatch = useDispatch();
  const company = useSelector(
    (state: RootState) => state.customerOrder.company
  );
  const categories = useSelector(
    (state: RootState) => state.customerOrder.categories
  );
  const cart = useSelector((state: RootState) => state.customerOrder.cart);
  const query = useQuery();
  const company_id = query.get("company_id");

  useEffect(() => {
    getCompany(company_id);
  }, []);

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(storeInfo(response.data));
    }
  }, [response]);

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (response.isLoading) {
    return <ScreenLoader />;
  }

  return (
    <>
      <div className="w-full flex justify-center items-center relative scrollbar-hide">
        <div className="w-full">
          <OrderBanner>{company?.name}</OrderBanner>
          <div className="pt-[100px] w-full px-[20px] scrollbar-hide">
            <TabContext value={value}>
              <Box className="w-full">
                <TabList
                  className="min-w-[19rem] sm:w-auto ml-[-35px]"
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="Tabs Example"
                  onChange={handleChange}
                  TabIndicatorProps={{ sx: { background: "#EF4444" } }}
                  sx={{
                    "& button.Mui-selected": {
                      color: "#EF4444",
                      fontWeight: "bold",
                    },
                    "& button": { color: "gray" },
                  }}
                >
                  {categories.map((i, index) => (
                    <Tab
                      key={index}
                      sx={{ opacity: 1 }}
                      label={i.name}
                      value={"" + index}
                    />
                  ))}
                </TabList>

                {categories.map((i, index) => (
                  <OrderTabPanel key={index} value={"" + index} category={i} />
                ))}
              </Box>
            </TabContext>
          </div>

          <button
            className="fixed top-[30px] right-[30px] w-[40px] h-[40px] bg-softestdark rounded-full flex justify-center items-center"
            onClick={() => setAnchor(true)}
          >
            <Badge color="primary" badgeContent={cart.length} showZero>
              <LocalMallIcon />
            </Badge>
          </button>
        </div>
      </div>
      <Cart isOpen={anchor} onClose={() => setAnchor(false)} />
    </>
  );
};