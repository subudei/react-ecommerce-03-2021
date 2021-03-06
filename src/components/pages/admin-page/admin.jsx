import React, { useState, useEffect } from "react";
import "./admin.styles.css";

import { useDispatch, useSelector } from "react-redux";
import {
  addProductStart,
  fetchProductsStart,
  deleteProductStart,
} from "../../../redux/products/products.actions";
import CKEditor from "ckeditor4-react";

import Button from "../../forms/button/button";
import FormInput from "../../forms/form-input/formInput";
import FormSelect from "../../forms/form-select/formSelect";
import Modal from "../../modal/modal";
import LoadMore from "../../load-more/loadMore";

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

  const { data, queryDoc, isLastPage } = products;

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

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };
  const configLoadMore = {
    onLoadMoreEvent: handleLoadMore,
  };

  return (
    <div className="admin__container">
      <div className="admin__call__to__actions">
        <Button onClick={() => toggleModal()}>Add New Product</Button>
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
            <CKEditor
              onChange={(e) => setProductDescription(e.editor.getData())}
            />
            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>
      <div className="admin__manage__products">
        <h1>Current Products Data</h1>
        {Array.isArray(data) &&
          data.length > 0 &&
          data.map((product) => {
            const {
              productName,
              productThumbnail,
              productPrice,
              documentID,
            } = product;
            return (
              <div key={documentID} className="product__data">
                <div className="pd__thumbnail">
                  <img
                    className="thumbnail"
                    src={productThumbnail}
                    alt={productName}
                  />
                </div>
                <div className="pd__name">{productName}</div>
                <div className="pd__price">$ {productPrice}</div>
                <div className="pd__button">
                  <Button
                    onClick={() => dispatch(deleteProductStart(documentID))}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        {!isLastPage && <LoadMore {...configLoadMore} />}
      </div>

      {/* <div className="admin__manage__products">
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
                    {Array.isArray(data) &&
                      data.length > 0 &&
                      data.map((product) => {
                        const {
                          productName,
                          productThumbnail,
                          productPrice,
                          documentID,
                        } = product;
                        return (
                          <tr key={documentID}>
                            <td>
                              <img
                                className="thumbnail"
                                src={productThumbnail}
                              />
                            </td>
                            <td>{productName}</td>
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
                          //
                        );
                      })}
                  </tbody>
                  <tr>
                    <td>{!isLastPage && <LoadMore {...configLoadMore} />}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default Admin;
