import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiGlobe,
  FiTarget,
  FiShare,
  FiList,
  FiShoppingBag,
  FiPackage,

} from "react-icons/fi";
// import { FaShop } from "react-icons/fa6";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    icon: FiShare,
    name: "Supplier",
    path: "/supplier",

  },
  {
    icon: FiList,
    path: "/categories",
    name: "Categories",

  },
  {
    icon: FiShoppingBag,
    path: "/items",
    name: "Items",
  },
  {
    path: "/purchases",
    icon: FiCompass,
    name: "Purchases",
  },
  {
    icon: FiSlack,
    path: "/itemstock",
    name: "Item Stock",
  },
  {
    icon: FiShoppingBag,
    path: "/production",
    name: "Production",
  },
  {
    icon: FiSlack,
    path: "/productstock",
    name: "Product Stock",
  },
  {
    path: "/seller",
    icon: FiShare,
    name: "Seller",
  },
  {
    path: "/supplies",
    icon: FiPackage,
    name: "Supplies",
  },
  {
    path: "/orders",
    icon: FiCompass,
    name: "Orders",
  },
  {
    path: "/our-staff",
    icon: FiUser,
    name: "Users",
  },


];

export default sidebar;
