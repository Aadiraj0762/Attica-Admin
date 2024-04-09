import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SidebarContext } from "context/SidebarContext";
import ProductionServices from "services/ProductionServices";
import { notifyError, notifySuccess } from "utils/toast";
import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import { Scrollbars } from "react-custom-scrollbars-2";
import Select from "react-select";
import axios from "axios";
import { t } from "i18next";
const CouponDrawer = ({ id }) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [products, setProducts] = useState([]);
    const [variantOptions, setVariantOptions] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState(null);
    const [resData, setResData] = useState({});
    const [language, setLanguage] = useState(lang);
    const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, reset },
  } = useForm();

  useEffect(() => {
    fetch("http://localhost:5055/api/productItem")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const variantOptions = data.map((product) => ({
          value: product.variants,
          label: product.variants,
        }));
        setVariantOptions(variantOptions);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleProductChange = (selected) => {
    setSelectedProduct(selected);

    if (selected) {
      // Find the selected product by _id
      const selectedProduct = products.find(
        (product) => product._id === selected.value
      );

      if (selectedProduct) {
        setSelectedVariants({
          value: selectedProduct.variants,
          label: selectedProduct.variants,
        });
      } else {
        setSelectedVariants(null);
      }
    } else {
      setSelectedVariants(null);
    }
  };

  
  const onSubmit = async (data) => {
    console.log("coupon data", data);
    try {
      setIsSubmitting(true);
      const couponData = {
        title: selectedProduct ? selectedProduct.label : "",
        quantity: data.quantity,
        price: data.price,
        products: [selectedProduct],
        variants: [selectedVariants],
      };
      if (id) {
        const res = await ProductionServices.updateProduction(id, couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess("Production updated successfully");
        console.log(res);
        reset(); // reset the form after successful submission
        closeDrawer();
      } else {
        const res = await ProductionServices.createProduction(couponData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess("Production added successfully");

        reset(); // reset the form after successful submission
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsSubmitting(false);
      closeDrawer();
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("title", resData.title[lang ? lang : "en"]);
    }
  };
  useEffect(() => {
    // Reset state when drawer is opened
//     if (isDrawerOpen) {
//       setSelectedSupplier(null);
//       setSelectedCategory(null);
//       setQuantity("");
//       setPrice("");
//       setSelectedProduct(null);
//       setResData({});
//       clearErrors(); // Clear form errors
//     }
//   }, [isDrawerOpen, clearErrors]);

//   useEffect(() => {
//     // Handle form data initialization and updates
//     if (!isDrawerOpen) {
//       setResData({});
//       setValue("selectedSupplier", "");
//       setValue("selectedCategory", "");
//       setValue("quantity", "");
//       setValue("price", "");
//       setValue("selectedProduct", "");
//       setValue("title", "");
//       clearErrors("selectedSupplier");
//       clearErrors("selectedCategory");
//       clearErrors("quantity");
//       clearErrors("price");
//       clearErrors("selectedProduct");
//       clearErrors("title");

//       return;
//     }

    if (id) {
      (async () => {
        try {
          const res = await ProductionServices.getProductionById(id);
          if (res) {
            setResData(res);
            setValue("title", res.title[language || "en"]);
            
            setQuantity(res.quantity);
            setPrice(res.price);
            setSelectedProduct({
              value: res.products[0].value,
              label: res.products[0].label,
            });
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
  }, [
    id,
    setValue,
    setSelectedProduct,

    setQuantity,
    setPrice,
    setLanguage,
    language,
  ]);
  // const handleSupplierChange = (selected) => {
  //   setSelectedSupplier(selected);
  //   // Preserve quantity if already set
  //   if (!quantity) {
  //     setQuantity("");
  //   }
  //   // Preserve price if already set
  //   if (!price) {
  //     setPrice("");
  //   }
  // };
  // const handleCategoryChange = (selected) => {
  //   setSelectedCategory(selected);
  //   // Preserve quantity if already set
  //   if (!quantity) {
  //     setQuantity("");
  //   }
  //   // Preserve price if already set
  //   if (!price) {
  //     setPrice("");
  //   }
  // };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        <Title
          register={register}
          handleSelectLanguage={handleSelectLanguage}
          title={id ? t("Update Production") : t("Add Production")}
        />
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Items : "} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  options={products.map(product => ({ value: product._id, label: product.title }))}
                  value={selectedProduct}
                  onChange={handleProductChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Variants: "} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  name="variants"
                  options={variantOptions}
                  value={selectedVariants}
                  isDisabled={true}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Quantity : "} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="quantity"
                  {...register("quantity")}
                  type="text"
                  value={quantity}
                  placeholder="20"
                  onChange={event => setQuantity(event.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Production Price : " />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="price"
                  {...register("price")}
                  type="number"
                  value={price}
                  placeholder="200$"
                  maxValue={2000}
                  minValue={1}
                  label="Price"
                  onChange={event => setPrice(event.target.value)}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <DrawerButton id={id} title="Purchase" />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default CouponDrawer;


