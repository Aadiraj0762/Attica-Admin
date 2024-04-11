// import {
//   Pagination,
//   Table,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHeader,
//   WindmillContext,
// } from "@windmill/react-ui";
// import axios from "axios";

// import LineChart from "components/chart/LineChart/LineChart";
// import PieChart from "components/chart/Pie/PieChart";
// import CardItem from "components/dashboard/CardItem";
// import CardItemTwo from "components/dashboard/CardItemTwo";
// import ChartCard from "components/chart/ChartCard";
// import OrderTable from "components/order/OrderTable";
// import TableLoading from "components/preloader/TableLoading";
// import NotFound from "components/table/NotFound";
// import PageTitle from "components/Typography/PageTitle";
// import { SidebarContext } from "context/SidebarContext";
// import * as dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
// import isToday from "dayjs/plugin/isToday";
// import isYesterday from "dayjs/plugin/isYesterday";
// import useFilter from "hooks/useFilter";
// import { useContext, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";
// import { ImCreditCard, ImStack } from "react-icons/im";
// //internal import
// const Dashboard = () => {
//   const { globalSetting } = useFilter();
//   const { mode } = useContext(WindmillContext);
//   dayjs.extend(isBetween);
//   dayjs.extend(isToday);
//   dayjs.extend(isYesterday);
//   const { t } = useTranslation();
//   const { currentPage, handleChangePage, lang } = useContext(SidebarContext);
//   const [counts, setCounts] = useState({
//     suppliers: 0,
//     sellers: 0,
//     totalStock: 0,
//     totalProducts: 0,
//     totalItems: 0,
//   });

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const response = await axios.get('https://attica.onrender.com//api/dashboard'); // Assuming the API route is set up in your backend

//         setCounts({
//           suppliers: response.data.suppliers || 0,
//           sellers: response.data.sellers || 0,
//           totalStock: response.data.totalStock || 0,
//           totalProducts: response.data.products || 0,
//           totalItems: response.data.items || 0,
//         });
//       } catch (error) {
//         console.error("Error fetching counts:", error);
//       }
//     };

//     fetchCounts();
//   }, []);
//   return (
//     <>
//       <PageTitle>{t("DashboardOverview")}</PageTitle>

//       <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//         <CardItem
//           title="Suppliers"
//           count={counts.suppliers}
//           Icon={FiShoppingCart}
//           className="text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500"
//         />
//         <CardItem
//           title="Sellers"
//           count={counts.sellers}
//           Icon={FiRefreshCw}
//           className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
//         />
//         <CardItem
//           title="Total Stock"
//           count={counts.totalStock}
//           Icon={FiTruck}
//           className="text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500"
//         />
//         <CardItem
//           title="Total Products"
//           count={counts.totalProducts}
//           Icon={FiCheck}
//           className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
//         />
//         <CardItem
//           title="Total Items"
//           count={counts.totalItems}
//           Icon={FiCheck}
//           className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
//         />
//       </div>

//     </>
//   );
// };
// export default Dashboard;
import { useContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios library
import { WindmillContext } from "@windmill/react-ui";
import { SidebarContext } from "context/SidebarContext";
import PageTitle from "components/Typography/PageTitle";
import CardItem from "components/dashboard/CardItem";
import { FiShoppingCart, FiRefreshCw, FiTruck, FiCheck, FiSlack } from "react-icons/fi";

const Dashboard = () => {
  const { mode } = useContext(WindmillContext);
  const { currentPage, handleChangePage, lang } = useContext(SidebarContext);

  const [counts, setCounts] = useState({
    suppliers: 0,
    sellers: 0,
    totalStock: 0,
    totalProducts: 0,
    totalItems: 0,
  });

  // Your existing imports and code

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://localhost:5055/api/dashboard");
        console.log("API Response:", response.data); // Log API response for debugging

        setCounts({
          suppliers: response.data.suppliers || 0,
          sellers: response.data.sellers || 0,
          totalStock: response.data.totalStock || 0,
          totalProducts: response.data.products || 0,
          totalItems: response.data.items || 0,
        });
      } catch (error) {
        console.error(`Error fetching counts: ${error}`);
        console.log("API Error Response:", error.response.data); // Log API error response data
      }
    };

    fetchCounts();
  }, []);

  const CardItem = ({ title, count, Icon, className }) => {
    return (
      <div
        className={`flex items-center p-4 bg-white rounded-lg shadow-sm ${className}`}
      >
        <Icon className="h-8 w-8 text-indigo-500" />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h2>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {count}
          </h3>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageTitle>Dashboard Overview</PageTitle>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <CardItem
          title="Suppliers"
          count={counts.suppliers}
          Icon={FiSlack}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />
        <CardItem
          title="Sellers"
          count={counts.sellers}
          Icon={FiSlack}
          className="text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500"
        />

        
        <CardItem
          title="Total Products"
          count={counts.totalProducts}
          Icon={FiShoppingCart}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
        <CardItem
          title="Total Items"
          count={counts.totalItems}
          Icon={FiShoppingCart}
          className="text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500"
        />
      </div>
    </>
  );
};

export default Dashboard;





