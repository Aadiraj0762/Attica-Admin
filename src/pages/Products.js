import React, { useContext, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
  TableRow,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";

import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import NotFound from "components/table/NotFound";
import ProductItemServices from "services/ProductItemServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import ItemTable from "components/items/ItemTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import ProductDrawer from "components/drawer/ProductDrawer";
import CheckBox from "components/form/CheckBox";
import useProductFilter from "hooks/useProductFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";
import { showingTranslateValue } from "utils/translate";
// import ItemTable from "components/items/ItemTable";
import ProductTabl from "components/product/ProductTabl";

const Products = () => {
  const { title, allId, serviceId, } =
    useToggleDrawer();

  const { t } = useTranslation();
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext);

  const { data, loading } = useAsync(() =>
  ProductItemServices.getAllProductItems);
  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "$";
  // console.log("product page", data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  // console.log('productss',products)
  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useProductFilter(data?.products);

  return (
    <>
      <PageTitle>{t("Production")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <BulkActionDrawer ids={allId} title="Products" />
      <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >
            
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button
                id="styleButton"
                  onClick={toggleDrawer}
                  className="w-full rounded-md h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("Add Products")}
                </Button>
              </div>
          </form>
        </CardBody>
      </Card>

{/* 
      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : serviceData?.length !== 0 ? ( */}
        <TableContainer className="mb-8 rounded-b-lg">
        <Table>
          <TableHeader>
            <tr>

              <TableCell>{("SR")}</TableCell>
              <TableCell>{t("Product Name")}</TableCell>
              {/* <TableCell>{t("CategoryTbl")}</TableCell> */}
              <TableCell>{t("Description")}</TableCell>
              <TableCell>{("Units")}</TableCell>
              <TableCell>{t("PriceTbl")}</TableCell>
              {/* <TableCell>{t("StockTbl")}</TableCell> */}
              <TableCell className="text-center">
                {t("Status")}
              </TableCell>
              <TableCell className="text-center">{t("Variants")}</TableCell>
              <TableCell className="text-right">{t("ActionsTbl")}</TableCell>

            </tr>
          </TableHeader>
          <ItemTable
            lang={lang}
            isCheck={isCheck}
            products={data?.products}
            setIsCheck={setIsCheck}
            currency={currency}
          />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={data?.totalDoc}
            resultsPerPage={limitData}
            onChange={handleChangePage}
            label="Product Page Navigation"
          />
        </TableFooter>
      </TableContainer>
      {/* ) : (
        <NotFound title="Product" />
      )} */}
    </>
  );
};

export default Products;

