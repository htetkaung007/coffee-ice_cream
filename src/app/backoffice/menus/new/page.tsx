import { getCompanyMenuCategories } from "@/app/utils/libs/actions";
import NewMenu from "./NewMenuForm";

const createMenu = async () => {
  const menuCategories = await getCompanyMenuCategories();

  return <NewMenu menuCategories={menuCategories} />;
};
export default createMenu;
