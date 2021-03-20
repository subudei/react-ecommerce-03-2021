import React, { useState, useEffect } from "react";
import "./admin.styles.css";

import { useDispatch } from "react-redux";
import { addProductStart } from "../../../redux/products/products.actions";

import Button from "../../forms/button/button";
import FormInput from "../../forms/form-input/formInput";
import FormSelect from "../../forms/form-select/formSelect";
import Modal from "../../modal/modal";

import { firestore } from "../../../firebase/utils";

function Admin(props) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState("gloves");
  const [productName, setProductName] = useState("");
  const [productThumbnail, setProductThumbnail] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  const toggleModal = () => setHideModal(!hideModal);
  const configModal = {
    hideModal,
    toggleModal,
  };

  // useEffect(() => {
  //   firestore
  //     .collection("productes")
  //     .get()
  //     .then((snapshot) => {
  //       const snapshotData = snapshot.docs.map((doc) => doc.data());
  //       setProducts(snapshotData);
  //     });
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addProductStart({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
      })
    );

    // firestore
    //   .collection("products")
    //   .doc()
    //   .set({
    //     productCategory,
    //     productName,
    //     productThumbnail,
    //     productPrice,
    //   })
    //   .then((e) => {});
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
    </div>
  );
}

export default Admin;
