import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { totalAmount, cart } = props;

  return (
    <div ref={ref} className="p-5">
      <table className="table ">
        <thead>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Price </td>
            <td>Quantity</td>
            <td>Total Amount</td>
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
                  </tr>
                );
              })
            : "No item"}
        </tbody>
      </table>
      <h2 className="px-2">Total Amount $ {totalAmount}</h2>
    </div>
  );
});
