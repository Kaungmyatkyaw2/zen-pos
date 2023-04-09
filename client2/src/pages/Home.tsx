import { LayoutProvider } from "../components/theme";
import { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useLazyGetCategoriesQuery } from "../store/service/category-endpoints/category.endpoints";
import { toast } from "react-hot-toast";
import { storeCategories } from "../store/slice/Category.slice";
import { MediumLoader } from "../components/loader";
import { MenuTabPanel } from "../components/menu";
import { Category } from "../types";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState("none");
  const [none, setNone] = useState<Category>({} as Category);
  const [getCategories, response] = useLazyGetCategoriesQuery();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  useEffect(() => {
    getCategories("");
  }, []);

  useEffect(() => {
    if (response.isSuccess  && !response.isFetching) {
      dispatch(storeCategories(response.data));
      setIsLoading(false);
    } else if (response.isError) {
      toast.error("Error while fetching data");
      setIsLoading(false);
    }
  }, [response]);

  useEffect(() => {
    setNone(categories.filter((i) => i.id === null)[0]);
  }, [categories]);

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <LayoutProvider>
      {isLoading ? (
        <MediumLoader />
      ) : (
        <TabContext value={value}>
          <Box className="sticky sm:static bg-light dark:bg-dark z-10  flex justify-start sm:justify-start border-b border-gray-700">
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
              <Tab label={"None"} value={"none"} />
              {categories.map(
                (i) =>
                  i.id !== null && (
                    <Tab label={i.name} value={"" + i.id} key={i.id} />
                  )
              )}
            </TabList>
          </Box>

          <MenuTabPanel category={none} value="none" />
          {categories.map(
            (i) =>
              i.id !== null && (
                <MenuTabPanel key={i.id} category={i} value={"" + i.id} />
              )
          )}
        </TabContext>
      )}
    </LayoutProvider>
  );
};
