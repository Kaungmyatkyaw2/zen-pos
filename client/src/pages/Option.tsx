import { useEffect, useState } from "react";
import { LayoutProvider } from "../components/theme";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TableContainer, useMediaQuery } from "@mui/material";
import { useLazyGetOptionsQuery } from "../store/service/option-endpoints/Options.endopoints";
import { useDispatch, useSelector } from "react-redux";
import { insertOption, storeOptions } from "../store/slice/Option.slice";
import { MediumLoader } from "../components/loader";
import { RootState } from "../store/store";
import { BtnPrimary } from "../components/form";
import { AiOutlinePlus } from "react-icons/ai";
import { OptionCreateForm, OptionTable } from "../components/option";
import { TabPanel } from "../components/tab";
import { toast } from "react-hot-toast";

export const Option = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMediumScreen = useMediaQuery("(max-width: 768px)");
  const [getOptions, response] = useLazyGetOptionsQuery();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const options = useSelector((state: RootState) => state.option.options);
  const dispatch = useDispatch();

  useEffect(() => {
    if (response.isSuccess && !response.isFetching) {
      dispatch(storeOptions(response.data));
      setIsLoading(false);
    } else if (response.isError) {
      toast.error("Error while fetching data");
      setIsLoading(false);
    }
  }, [response]);

  useEffect(() => {
    getOptions("");
  }, []);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <LayoutProvider>
      {isLoading ? (
        <MediumLoader />
      ) : options.length ? (
        <>
          <BtnPrimary
            className="shadow-custom"
            onClick={() => setShowCreateForm(true)}
          >
            <span className="pr-[10px]">Create Option</span> <AiOutlinePlus />
          </BtnPrimary>

          <div className="mt-[30px]">
            <Box
              className={`${isMediumScreen ? "" : "flex"}`}
              sx={{ flexGrow: 1 }}
            >
              <Tabs
                orientation={isMediumScreen ? "horizontal" : `vertical`}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                value={tabValue}
                onChange={handleChange}
                TabIndicatorProps={{
                  sx: { background: "#EF4444", borderRadius: "5px" },
                }}
                aria-label="Vertical tabs example"
                sx={{
                  borderRight: 1,
                  borderColor: "#374151",
                  height: isMediumScreen ? "auto" : "75vh",
                  width: isMediumScreen ? "100%" : "auto",
                  "& button.Mui-selected": {
                    color: "#EF4444",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  },
                  "& button": { color: "gray" },
                }}
                className={`w-[209px] pt-0`}
              >
                {options.map((i, index) => (
                  <Tab key={index} value={index} label={i.name} />
                ))}
              </Tabs>

              <TableContainer>
                {options?.map((option, index) => (
                  <TabPanel key={index} value={tabValue} index={index}>
                    <div className="md:pl-[40px] pl-0">
                      <OptionTable option={option} />
                    </div>
                  </TabPanel>
                ))}
              </TableContainer>
            </Box>
          </div>

          {showCreateForm && (
            <OptionCreateForm onClose={() => setShowCreateForm(false)} />
          )}
        </>
      ) : (
        <div className="w-full h-[80vh] flex flex-col justify-center items-center">
          <h1 className="text-center text-[30px] font-semibold py-[20px]">
            Create Your First Option !
          </h1>
          <BtnPrimary
            className="shadow-custom"
            onClick={() => setShowCreateForm(true)}
          >
            <span className="pr-[10px]">Create Option</span> <AiOutlinePlus />
          </BtnPrimary>
        </div>
      )}

      {showCreateForm && (
        <OptionCreateForm onClose={() => setShowCreateForm(false)} />
      )}
    </LayoutProvider>
  );
};
