import {
    Avatar,
    Badge,
    TableBody,
    TableCell,
    TableRow,
  } from "@windmill/react-ui";
  import * as dayjs from "dayjs";
    import { useEffect } from "react";
  import { useState } from "react";
  import useToggleDrawer from "hooks/useToggleDrawer";
  import useAsync from "hooks/useAsync";
  import SettingServices from "services/SettingServices";
  import DeleteModal from "components/modal/DeleteModal";
  import MainDrawer from "components/drawer/MainDrawer";
  import PurchaseDrawerRev from "components/drawer/PurchaseDrawerRev";
  import CheckBox from "components/form/CheckBox";
  import ShowHideButton from "components/table/ShowHideButton";
  import EditDeleteButton from "components/table/EditDeleteButton";
  import { showingTranslateValue } from "utils/translate";
  import { showDateFormat } from "utils/dateFormate";
  
  const PurchaseTable = ({ lang, isCheck, coupons, setIsCheck }) => {
    const [updatedCoupons, setUpdatedCoupons] = useState([]);
  
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
    const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  
    const handleClick = (e) => {
      const { id, checked } = e.target;
      setIsCheck([...isCheck, id]);
      if (!checked) {
        setIsCheck(isCheck.filter((item) => item !== id));
      }
    };
  
    const currency = globalSetting?.default_currency || "$";
  
    useEffect(() => {
      const result = coupons?.map((el) => {
        const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
          timeZone: globalSetting?.default_time_zone,
        });
        const newObj = {
          ...el,
          updatedDate: newDate,
        };
        return newObj;
      });
      setUpdatedCoupons(result);
    }, [coupons, globalSetting?.default_time_zone]);
  
    return (
      <>
        {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}
  
        {isCheck.length < 2 && (
          <MainDrawer>
            <PurchaseDrawerRev id={serviceId} />
          </MainDrawer>
        )}
  
        <TableBody>
        {updatedCoupons.map((item, index) => (
            <TableRow key={item._id}>
              
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                  <span className="text-sm">
                    {/* {item._id} */}
                    {(item.title)}
                  </span>
                </TableCell>
                <TableCell>
                  {item?.category?.map((category, index) => (
                    <span key={category._id}>
                      {(category.label)}
                      <br />
                    </span>
                  ))}
                </TableCell>  
                <TableCell>
                  {item?.products?.map((product, index) => (
                    <span key={product._id}>
                      {(product.label)}
                      <br />
                    </span>
                  ))}
                </TableCell>  
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
              <TableCell>
                <EditDeleteButton
                  id={item._id}
                  title={showingTranslateValue(item?.title, lang)}
                  isCheck={isCheck}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    );
  };
  
  export default PurchaseTable;
  