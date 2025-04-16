import { useFormik } from "formik";
import "./ProductsForm.css";
import * as Yup from "yup";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { Category, Product } from "../../types";
import {
  getAllCategories,
  getOneProduct,
} from "../../services/ServicesMock.mock";
import { useEffect, useState } from "react";

//category validation schema
const categoryValidationSchema = Yup.object({
  id: Yup.number().required(),
  denomination: Yup.string().required(),
});

//form validation schema
const validate = Yup.object({
  denomination: Yup.string().required(),
  brand: Yup.string().required(),
  model: Yup.string().required(),
  price: Yup.number().min(1).required(),
  availableStock: Yup.number().min(1).required(),
  description: Yup.string().required(),
  category: categoryValidationSchema,
});

export const ProductsForm = () => {
  const product: Product = useLoaderData();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchedCategories = getAllCategories();
    setCategories(fetchedCategories);
  }, []);

  const formik = useFormik({
    initialValues: product,
    validationSchema: validate,
    enableReinitialize: true,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="products-form">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <p className="header">Create/Edit Product</p>
        </div>
        <div className="row">
          <p>
            <label htmlFor="denomination">Product denomination:</label>
            <input
              id="denomination"
              type="text"
              {
                ...formik.getFieldProps(
                  "denomination",
                ) /** replaces denomination, onBlur, on Change, value */
              }
            />
          </p>
          {formik.errors.denomination && formik.touched.denomination ? (
            <p className="error-msg">{formik.errors.denomination}</p>
          ) : null}
        </div>

        <div className="row">
          <p>
            <label htmlFor="brand">Brand:</label>
            <input id="brand" type="text" {...formik.getFieldProps("brand")} />
          </p>
          {formik.errors.brand && formik.touched.brand ? (
            <p className="error-msg">{formik.errors.brand}</p>
          ) : null}
        </div>

        <div className="row">
          <p>
            <label htmlFor="model">Model:</label>
            <input id="model" type="text" {...formik.getFieldProps("model")} />
          </p>
          {formik.errors.model && formik.touched.model ? (
            <p className="error-msg">{formik.errors.model}</p>
          ) : null}
        </div>

        <div className="row">
          <p>
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              min={1}
              {...formik.getFieldProps("price")}
            />
          </p>
          {formik.errors.price && formik.touched.price ? (
            <p className="error-msg">{formik.errors.price}</p>
          ) : null}
        </div>

        <div className="row">
          <p>
            <label htmlFor="availableStock">Stock:</label>
            <input
              id="availableStock"
              type="number"
              min={1}
              {...formik.getFieldProps("availableStock")}
            />
          </p>
          {formik.errors.availableStock && formik.touched.availableStock ? (
            <p className="error-msg">{formik.errors.availableStock}</p>
          ) : null}
        </div>

        <div className="row">
          <p>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              {...formik.getFieldProps("description")}
            />
          </p>
          {formik.touched.description && formik.errors.description ? (
            <p className="error-msg">{formik.errors.description}</p>
          ) : null}
        </div>

        <div className="row">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category.id"
            value={formik.values.category.id}
            onChange={e =>
              formik.setFieldValue(
                "category",
                categories[e.target.selectedIndex],
              )
            }
          >
            {categories &&
              categories.map((category: Category, index: number) => (
                <option key={index} value={category.id}>
                  {category.denomination}
                </option>
              ))}
          </select>
          {formik.touched.category && formik.errors.category ? (
            <p className="error-msg">{formik.errors.category.denomination}</p>
          ) : null}
        </div>

        <div className="row">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export const singleProductFormLoader: LoaderFunction = (
  args: LoaderFunctionArgs,
) => {
  const { id } = args.params;

  if (!id) {
    return {
      id: 0,
      denomination: "",
      brand: "",
      model: "",
      price: 0,
      availableStock: 0,
      description: "",
      category: {
        id: 6,
        denomination: "undefined",
      },
    } as Product;
  }

  const foundProduct: Product = getOneProduct(Number(id));

  if (!foundProduct) {
    return redirect("/manage-products");
  }

  return foundProduct as Product;
};
