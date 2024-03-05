import {
    Button,
    Card,
    CardBody,
    Input,
    Pagination,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import { useTranslation } from "react-i18next";
import { SidebarContext } from "context/SidebarContext";
import CouponServices from "services/CouponServices";
import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import useFilter from "hooks/useFilter";
import PageTitle from "components/Typography/PageTitle";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import CouponDrawer from "components/drawer/CouponDrawer";
import TableLoading from "components/preloader/TableLoading";
import CheckBox from "components/form/CheckBox";
import CouponTable from "components/coupon/CouponTable";
import NotFound from "components/table/NotFound";
import UploadManyTwo from 'components/common/UploadManyTwo';

const Coupons = () => {
    const { toggleDrawer, lang } = useContext(SidebarContext);
    const { data, loading } = useAsync(CouponServices.getAllCoupons);
    // console.log('data',data)
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const { allId, serviceId, handleDeleteMany, handleUpdateMany } = useToggleDrawer();

    const {
        handleSubmitCoupon,
        couponRef,
        dataTable,
        serviceData,
        totalResults,
        resultsPerPage,
        handleChangePage,
        handleSelectFile,
        filename,
        isDisabled,
        handleUploadMultiple,
        handleRemoveSelectFile,
    } = useFilter(data);

    const handleSelectAll = () => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(data?.map((li) => li._id));
        if (isCheckAll) {
            setIsCheck([]);
        }
    };

    const { t } = useTranslation();

    return (
        <>
            <PageTitle>{t("Item Stock")}</PageTitle>
            <DeleteModal ids={allId} setIsCheck={setIsCheck} title="Selected Coupon" />
            <BulkActionDrawer ids={allId} title="Coupons" />

            <MainDrawer>
                <CouponDrawer id={serviceId} />
            </MainDrawer>



            <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
                <CardBody>
                    <form
                        onSubmit={handleSubmitCoupon}
                        className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
                    >
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <Input
                                ref={couponRef}
                                type="search"
                                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                                placeholder={t("Search Item Stock")}
                            />
                        </div>
                    </form>
                </CardBody>
            </Card>

            {/* {loading ? ( */}
            {/* // <Loading loading={loading} /> */}
            {/* <TableLoadings row={12} col={8} width={140} height={20} /> */}
            {/* ) : serviceData?.length !== 0 ? ( */}
            <TableContainer className="mb-8">
                <Table>
                    <TableHeader>
                        <tr>
                            <TableCell>
                                <CheckBox
                                    type="checkbox"
                                    name="selectAll"
                                    id="selectAll"
                                    handleClick={handleSelectAll}
                                    isChecked={isCheckAll}
                                />
                            </TableCell>
                            <TableCell>{t("S No")}</TableCell>
                            <TableCell>{t("Category")}</TableCell>
                            <TableCell>{t("Item")}</TableCell>

                            <TableCell className="text-center">{t("catPublishedTbl")}</TableCell>
                            <TableCell>{t("Stock Count")}</TableCell>
                            <TableCell>{t("Last Stock")}</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Vendor</TableCell>
                            {/* <TableCell>{t("CoupTblStatus")}</TableCell>
                            <TableCell className="text-right">{t("CoupTblActions")}</TableCell> */}
                        </tr>
                    </TableHeader>
                    <CouponTable lang={lang} isCheck={isCheck} coupons={dataTable} setIsCheck={setIsCheck} />
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        onChange={handleChangePage}
                        label="Table navigation"
                    />
                </TableFooter>
            </TableContainer>
            {/* ) : ( */}
            {/* <NotFound title="Sorry, There are no coupons right now." /> */}
            {/* )} */}
        </>
    );
};

export default Coupons;
