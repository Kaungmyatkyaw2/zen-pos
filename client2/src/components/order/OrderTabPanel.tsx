import { TabPanel, TabPanelProps } from "@mui/lab";
import { Category } from "../../types";
import { OrderMenuCard } from "./OrderMenuCard";

interface Proptype extends TabPanelProps {
  category: Category;
}

export const OrderTabPanel = ({ category, value }: Proptype) => {
  return (
    <>
      <TabPanel value={value}>
        <div className="flex sm:ml-[-20px] ml-[-40px] flex-wrap sm:space-x-[20px] mt-[-20px]">
          {category?.category_menu_items?.map((i) => (
            <OrderMenuCard key={i?.id} className='sm:ml-0 ml-[20px] mt-[20px]' menu={i} />
          ))}
        </div>
      </TabPanel>
    </>
  );
};
