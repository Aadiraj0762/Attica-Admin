import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SidebarContext } from "context/SidebarContext";
import ProductItemServices from "services/ProductItemServices"; // Add this import statement
import { notifyError, notifySuccess } from "utils/toast";
import { Input, Textarea } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import { Scrollbars } from "react-custom-scrollbars-2";
import Select from "react-select";
import axios from "axios";
import { t } from "i18next";
import Uploader from "components/image-uploader/Uploader";

const CouponDrawer = ({ id }) => {
  const { isDrawerOpen, closeDrawer, lang } = useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState([]);
  const [resData, setResData] = useState({});
  const [language, setLanguage] = useState(lang);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let [variants, setVariants] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, reset },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const productData = {
        title: data.title,
        description: data.description,
        image: imageUrl,
        variants: data.variant,
      };
      
      if (id) {
        const res = await ProductItemServices.updateProductItem(
          id,
          productData
        );
        setIsSubmitting(false);
        notifySuccess(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        reset();
        closeDrawer();
      } else {
        const res = await ProductItemServices.createProductItem(productData);
        setIsSubmitting(false);
        notifySuccess(res.message);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setResData({
          imageUrl: res.data.image || [],
          variants: res.data.variants || [],
        });
        reset();
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
    if (isDrawerOpen) {
        setValue("title","");
        setValue("description","");
        setImageUrl([]);
        setResData({});

      clearErrors();
    }
  }, [isDrawerOpen, clearErrors]);
  useEffect(() => {
    // Handle form data initialization and updates
    if (!isDrawerOpen) {
      setResData({});

      return;
    }

    if (id) {
      (async () => {
        try {
          const res = await ProductItemServices.getProductItemById(id);
          if (res) {
            setResData(res);
            setValue("title", res.title);
            setValue("description", res.description);
            setVariants(res.variant);
            // setVariants(res.variants || []); // Ensure variants field is properly initialized
            setImageUrl(res.image);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
  }, [id, setValue, setLanguage, language]);
  // useEffect(() => {
  //   // Fetch the products data from the API
  //   fetch("http://localhost:5055/api/items")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data.products))
  //     .catch((error) => console.error("Error fetching products:", error));
  // }, []);
  // const addItemSet = () => {
  //   setItemSets(itemSets + 1);
  //   setSelectedProducts([...selectedProducts, { item: null, quantity: 0 }]);
  // };
  // const removeItemSet = () => {
  //   if (itemSets > 1) {
  //     setItemSets(itemSets - 1);
  //     setSelectedProducts(
  //       selectedProducts.slice(0, selectedProducts.length - 1)
  //     );
  //   }
  // };
  // const handleItemChange = (index, selected) => {
  //   const updatedSelectedProducts = [...selectedProducts];
  //   updatedSelectedProducts[index] = {
  //     ...updatedSelectedProducts[index],
  //     item: selected,
  //   };
  //   setSelectedProducts(updatedSelectedProducts);
  // };
  // const handleQuantityChange = (index, value) => {
  //   const updatedSelectedProducts = [...selectedProducts];
  //   updatedSelectedProducts[index] = {
  //     ...updatedSelectedProducts[index],
  //     quantity: value,
  //   };
  //   setSelectedProducts(updatedSelectedProducts);
  // };
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        <Title
          register={register}
          handleSelectLanguage={handleSelectLanguage}
          title={id ? t("Update Product Item") : t("Add Product Item")}
        />
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Product Name")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register(`title`, { required: "Title is required!" })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="title"
                  type="text"
                  placeholder={"Product Name"}
                />
                <Error errorName={errors.title} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Product Description")} />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register("description", { required: false })}
                  name="description"
                  placeholder={"Product Description"}
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Product Image")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  product
                  folder="product"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label={t("Variant")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Variant"
                  name="variant"
                  type="text"
                  placeholder={t("Variants")}
                />
              </div>
            </div>
            <DrawerButton
              id={id}
              title="Product Item"
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};

export default CouponDrawer;