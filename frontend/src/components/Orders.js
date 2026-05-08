import React, { useEffect, useState } from "react";
import { getProducts, addOrder } from "../services/api";

function Orders() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    customerName: "",
    productName: "",
    size: "",
    quantity: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addOrder(form);

      alert("Order placed successfully");

      setForm({
        customerName: "",
        productName: "",
        size: "",
        quantity: ""
      });

    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

  const sizes = ['4"', '5"', '6"', '8"', '9"'];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* ORDER FORM */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Place New Order</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          {/* Customer Name */}
          <input
            type="text"
            placeholder="Customer Name"
            value={form.customerName}
            onChange={(e) =>
              setForm({ ...form, customerName: e.target.value })
            }
            className="p-2 border rounded"
            required
          />

          {/* Product */}
          <select
            value={form.productName}
            onChange={(e) =>
              setForm({ ...form, productName: e.target.value })
            }
            className="p-2 border rounded"
            required
          >
            <option value="">Select Product</option>
            {products.map((p, i) => (
              <option key={i} value={p.productName}>
                {p.productName}
              </option>
            ))}
          </select>

          {/* Size */}
          <select
            value={form.size}
            onChange={(e) =>
              setForm({ ...form, size: e.target.value })
            }
            className="p-2 border rounded"
            required
          >
            <option value="">Select Size</option>
            {sizes.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Quantity */}
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: Number(e.target.value) })
            }
            className="p-2 border rounded"
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>

        </form>
      </div>

    </div>
  );
}

export default Orders;