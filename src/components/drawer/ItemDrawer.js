import ReactTagInput from "@pathofdev/react-tag-input";
import {
  Button,
  Input,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
  Table,
} from "@windmill/react-ui";
import Multiselect from "multiselect-react-dropdown";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import useProductSubmit from "hooks/useProductSubmit";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import UploaderThree from "components/image-uploader/UploaderThree";
import Title from "components/form/Title";
import SwitchToggleForCombination from "components/form/SwitchToggleForCombination";
import ActiveButton from "components/form/ActiveButton";
import LabelArea from "components/form/LabelArea";
import Error from "components/form/Error";
import Uploader from "components/image-uploader/Uploader";
import InputArea from "components/form/InputArea";
import ParentCategory from "components/category/ParentCategory";
import InputValue from "components/form/InputValue";
import InputValueFive from "components/form/InputValueFive";
import AttributeOption from "components/attribute/AttributeOption";
import DrawerButton from "components/form/DrawerButton";
import { showingTranslateValue } from "utils/translate";
import ItemTable from "components/items/ItemTable";
const ItemDrawer = ({ id }) => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [itemSets, setItemSets] = useState(1);
  // const [selectedProducts, setSelectedProductss] = useState([]);
  const { tag, setTag, values, language, register, onSubmit, errors, slug, openModal, attribue, setValues, variants, imageUrl, setImageUrl, handleSubmit, isCombination, variantTitle, attributes, attTitle, handleAddAtt, onCloseModal, isBulkUpdate, globalSetting, isSubmitting, tapValue, setTapValue, resetRefTwo, handleSkuBarcode, handleProductTap, selectedCategory, setSelectedCategory, setDefaultCategory, defaultCategory, handleProductSlug, handleSelectLanguage, handleIsCombination, handleEditVariant, handleRemoveVariant, handleClearVariant, handleQuantityPrice, handleSelectImage, handleSelectInlineImage, handleGenerateCombination, setSelectedProducts, selectedProducts } = useProductSubmit(id);
  const currency = globalSetting?.default_currency || "$";
  useEffect(() => {
    // Fetch the products data from the API
    fetch("http://localhost:5055/api/items")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const addItemSet = () => {
    setItemSets(itemSets + 1);
    setSelectedProducts([...selectedProducts, { item: null, quantity: 0 }]);
  };
  const removeItemSet = () => {
    if (itemSets > 1) {
      setItemSets(itemSets - 1);
      setSelectedProducts(
        selectedProducts.slice(0, selectedProducts.length - 1)
      );
    }
  };
  const handleItemChange = (index, selected) => {
    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts[index] = {
      ...updatedSelectedProducts[index],
      item: selected,
    };
    setSelectedProducts(updatedSelectedProducts);
  };
  const handleQuantityChange = (index, value) => {
    const updatedSelectedProducts = [...selectedProducts];
    updatedSelectedProducts[index] = {
      ...updatedSelectedProducts[index],
      quantity: value,
    };
    setSelectedProducts(updatedSelectedProducts);
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500 focus:outline-none active:outline-none text-xl border-0">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="cursor-pointer">
          <UploaderThree
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleSelectImage={handleSelectImage}
          />
        </div>
      </Modal>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            // title={t("Add Production Data")}
            // description={t("UpdateProductDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("Add Production Data")}
            // description={t("Add Product Description")}
          />
        )}
      </div>
      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="flex gap-3 items-center">
              <button
                onClick={addItemSet}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                +
              </button>
              <button
                onClick={removeItemSet}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                -
              </button>
            </div>
            {[...Array(itemSets)].map((_, index) => (
              <>
                <div
                  key={index}
                  className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                >
                  <LabelArea label={"Items : "} />
                  <div className="col-span-8 sm:col-span-4">
                    <Select
                    name="item"
                      options={
                        products &&
                        products.map((product) => ({
                          value: product._id,
                          label: product.title.en,
                        }))
                      }
                      value={selectedProducts[index]?.item || null}
                      onChange={(selected) => handleItemChange(index, selected)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                  <LabelArea label={"Product Quantity"} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label="Quantity"
                      name='quantity'
                      type="number"
                      value={selectedProducts[index]?.quantity || 0} // Add a check for selectedProducts[index]?.quantity
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                      placeholder="Product Quantity"
                    />
                  </div>
                </div>
              </>
            ))}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Product Name")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`title`, {
                    required: "TItle is required!",
                  })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="title"
                  type="text"
                  placeholder={"Product Name"}
                  onBlur={(e) => handleProductSlug(e.target.value)}
                />
                <Error errorName={errors.title} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Product Description.........")} />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register("description", {
                    required: false,
                  })}
                  name="description"
                  placeholder={t("ProductDescription")}
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ProductImage")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  product
                  folder="Products"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label={t("Unit ")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  // minValue={0}
                  // defaultValue={0}
                  label="Quantity"
                  name="stock"
                  type="text"
                  placeholder={t("Units")}
                />
                <Error errorName={errors.stock} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Price" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={2000}
                  minValue={1}
                  label="Original Price"
                  name="originalPrice"
                  type="number"
                  placeholder="OriginalPrice"
                  defaultValue={0.0}
                  required="false"
                  product
                  currency={currency}
                />
                <Error errorName={errors.originalPrice} />
              </div>
            </div>
          </div>
          <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};
export default React.memo(ItemDrawer);









// const generateItemStock = () => {
//   if (!Array.isArray(data?.products)) {
//     return;
//   }

//   const itemStockMap = new Map();

//   data.products.forEach((product) => {
//     const itemLabel = product.title.en;

//     const existingItemData = itemStockMap.get(itemLabel);

//     if (existingItemData) {
//       // Add the stock count to existing item's stock count
//       itemStockMap.set(itemLabel, {
//         ...existingItemData,
//         stockcount: existingItemData.stockcount + parseInt(product.stock),
//         lastStock: {
//           quantity: parseInt(product.stock),
//           date: product.updatedAt,
//         },
//       });
//     } else {
//       itemStockMap.set(itemLabel, {
//         item: product.title.en,
//         stockcount: parseInt(product.stock),
//         lastStock: {
//           quantity: parseInt(product.stock),
//           date: product.updatedAt,
//         },
//       });
//     }
//   });

//   const itemStock = Array.from(itemStockMap, ([item, values]) => ({ ...values }));

//   setItemStockData(itemStock);
// };
// import { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { SidebarContext } from "context/SidebarContext";
// import ProductItemServices from "services/ProductItemServices";
// import { notifyError, notifySuccess } from "utils/toast";
// import { Input, Textarea } from "@windmill/react-ui";
// import DrawerButton from "components/form/DrawerButton";
// import Error from "components/form/Error";
// import InputArea from "components/form/InputArea";
// import LabelArea from "components/form/LabelArea";
// import Title from "components/form/Title";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import Select from "react-select";
// import axios from "axios";
// import { t } from "i18next";
// import Uploader from "components/image-uploader/Uploader";

// const CouponDrawer = ({ id }) => {
//     const { isDrawerOpen, closeDrawer, lang } = useContext(SidebarContext);
//     const [imageUrl, setImageUrl] = useState([]);
//     const [resData, setResData] = useState({});
//     const [language, setLanguage] = useState(lang);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     let [variants, setVariants] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [rawItems, setRawItems] = useState([{ item: null, quantity: 0 }]);

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         clearErrors,
//         formState: { errors, reset },
//     } = useForm();

//     const onSubmit = async (data) => {
//         try {
//             setIsSubmitting(true);
//             const productData = {
//                 title: data.title,
//                 description: data.description,
//                 image: imageUrl,
//                 variants: data.variant,
//                 rawItems: rawItems.map((item) => ({ item: item.item.label, quantity: item.quantity })),
//             };

//             if (id) {
//                 const res = await ProductItemServices.updateProductItem(id, productData);
//                 setIsSubmitting(false);
//                 notifySuccess(res.message);
//                 setTimeout(() => {
//                     window.location.reload();
//                 }, 2000);
//                 reset();
//                 closeDrawer();
//             } else {
//                 const res = await ProductItemServices.createProductItem(productData);
//                 setIsSubmitting(false);
//                 notifySuccess(res.message);
//                 setResData({
//                     imageUrl: res.data.image || [],
//                     variants: res.data.variants || [],
//                 });
//                 reset();
//                 closeDrawer();
//             }
//         } catch (err) {
//             notifyError(err ? err?.response?.data?.message : err.message);
//             setIsSubmitting(false);
//             closeDrawer();
//         }
//     };

//     // Other useEffect hooks for language, product data fetching, etc. remain the same

//     const handleRawItemChange = (index, item) => {
//         const newRawItems = [...rawItems];
//         newRawItems[index].item = item;
//         newRawItems[index].quantity = 0;
//         setRawItems(newRawItems);
//     };

//     const handleQuantityChange = (index, value) => {
//         const newRawItems = [...rawItems];
//         newRawItems[index].quantity = value;
//         setRawItems(newRawItems);
//     };

//     const handleAddRawItem = () => {
//         setRawItems([...rawItems, { item: null, quantity: 0 }]);
//     };

//     const handleRemoveRawItem = (index) => {
//         const newRawItems = [...rawItems];
//         newRawItems.splice(index, 1);
//         setRawItems(newRawItems);
//     };

//     return (
//         <>
//             <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
//                 <Title
//                     register={register}
//                     handleSelectLanguage={handleSelectLanguage}
//                     title={id ? t("Update Product Item") : t("Add Product Item")}
//                 />
//             </div>
//             <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     {/* Form fields for other product details */}
//                     {rawItems.map((rawItem, index) => (
//                         <div key={index} className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                             <LabelArea label={`Raw Item ${index + 1}:`} />
//                             <div className="col-span-8 sm:col-span-4">
//                                 <Select
//                                     name={`item${index}`}
//                                     options={products.map((product) => ({ value: product._id, label: product.title[language] }))}
//                                     value={rawItem.item}
//                                     onChange={(item) => handleRawItemChange(index, item)}
//                                 />
//                                 <InputArea
//                                     register={register}
//                                     label="Quantity"
//                                     name={`quantity${index}`}
//                                     type="number"
//                                     value={rawItem.quantity}
//                                     onChange={(e) => handleQuantityChange(index, e.target.value)}
//                                     placeholder="Product Quantity"
//                                 />
//                                 <button type="button" onClick={handleRemoveRawItem(index)} className="mx-4 p-2 bg-red-500 text-white rounded-md">
//                                     Remove
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                     <button type="button" onClick={handleAddRawItem} className="mx-4 p-2 bg-green-500 text-white rounded-md">
//                         Add Raw Item
//                     </button>
//                     {/* Remaining form fields */}
//                 </form>
//             </Scrollbars>
//         </>
//     );
// };

// export default CouponDrawer;
