import React, { useState, useEffect } from "react";
import "./admin.styles.css";

import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "../../../redux/products/products.actions";

import Button from "../../forms/button/button";
import FormInput from "../../forms/form-input/formInput";
import FormSelect from "../../forms/form-select/formSelect";
import Modal from "../../modal/modal";

// import { firestore } from "../../../firebase/utils";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

function Admin(props) {
  const { products } = useSelector(mapState);
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("gloves");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal,
  };

  const resetForm = () => {
    setHideModal(true);
    setProductCategory("gloves");
    setProductName("");
    setProductDescription("");
    setProductThumbnail("");
    setProductPrice(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productDescription,
        productThumbnail,
        productPrice,
      })
    );
    resetForm();
  };

  return (
    <div className="admin__container">
      <div className="admin__call__to__actions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add New Product</Button>
          </li>
        </ul>
      </div>
      <Modal {...configModal}>
        <div className="add__new__product__form">
          <form onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <FormSelect
              label="Category"
              options={[
                { value: "gloves", name: "Boxing Gloves" },
                {
                  value: "protection",
                  name: "Protective Equipment",
                },
                { value: "accessories", name: "Accessories" },
                { value: "shoes", name: "Footwear" },
              ]}
              handleChange={(e) => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              name="productName"
              value={productName}
              placeholder="Product Name"
              handleChange={(e) => setProductName(e.target.value)}
            />

            <FormInput
              label="Description"
              type="text"
              name="productDescription"
              value={productDescription}
              placeholder="Add description"
              handleChange={(e) => setProductDescription(e.target.value)}
            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={(e) => setProductThumbnail(e.target.value)}
            />

            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              handleChange={(e) => setProductPrice(e.target.value)}
            />
            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>
      <div className="admin__manage__products">
        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>Manage Products</h1>
              </th>
            </tr>
            <tr>
              <td>
                <table
                  className="results"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                >
                  <tbody>
                    {products.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productDescription,
                        productPrice,
                        documentID,
                      } = product;
                      return (
                        <tr>
                          <td>
                            <img className="thumbnail" src={productThumbnail} />
                          </td>
                          <td>{productName}</td>
                          <td>{productDescription}</td>
                          <td>$ {productPrice}</td>
                          <td>
                            <Button
                              onClick={() =>
                                dispatch(deleteProductStart(documentID))
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
