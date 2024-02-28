import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layout/MainLayout.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { ComponentToPrint } from "../component/ComponentToPrint.jsx";
import { useReactToPrint } from "react-to-print";

const POSPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const fetchProducts = await axios.get("products");
      setProducts(fetchProducts.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addProductToCart = async (product) => {
    const findProductInCart = cart.find((item) => item.id === product.id);

    if (findProductInCart) {
      let newItem = {
        ...findProductInCart,
        quantity: findProductInCart.quantity + 1,
        totalAmount: findProductInCart.price * (findProductInCart.quantity + 1),
      };
      const newCart = cart.filter((item) => item.id !== findProductInCart.id);
      setCart([...newCart, newItem]);

      toast.success(`Added ${findProductInCart.name} to chart`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };

      setCart([...cart, addingProduct]);
      toast.success(`Added ${addingProduct.name} to chart`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const removeProductToCart = async (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);

    toast.error(`Removed ${product.name} to chart`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.map((item) => (newTotalAmount += +item.totalAmount));
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <div>
      <MainLayout>
        {loading ? (
          "Loading..."
        ) : (
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                {products.map((product, index) => {
                  return (
                    <div
                      className="col-lg-4 mb-4 "
                      key={index}
                      onClick={() => addProductToCart(product)}
                    >
                      <div className="border text-center px-3 pos-item">
                        <p>{product.name}</p>
                        <img
                          src={product.image}
                          alt={product.name}
                          // className="img-fluid"
                        />

                        <p>${product.price}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-4">
              <div style={{ display: "none" }}>
                <ComponentToPrint
                  cart={cart}
                  totalAmount={totalAmount}
                  ref={componentRef}
                />
              </div>
              <div className="table-responsive bg-dark">
                <table className="table table-responsive table-dark table-hover">
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Price </td>
                      <td>Quantity</td>
                      <td>Total Amount</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {cart && cart.length
                      ? cart.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.price}</td>
                              <td>{item.quantity}</td>
                              <td>{item.totalAmount}</td>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => removeProductToCart(item)}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : "No item"}
                  </tbody>
                </table>
                <h2 className="px-2 text-white">
                  Total Amount $ {totalAmount}
                </h2>
              </div>
              <div className="mt-3">
                {totalAmount !== 0 ? (
                  <div>
                    <button className="btn btn-primary" onClick={handlePrint}>
                      Pay now
                    </button>
                  </div>
                ) : (
                  "Please add a product to the cart"
                )}
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </div>
  );
};

export default POSPage;
