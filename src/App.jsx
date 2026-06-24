import React, { useState, useEffect } from 'react';

export default function App() {
  const backendUrl = import.meta.env.VITE_API_URL;
  
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState("");

  // Fetch existing orders when the page loads
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${backendUrl}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Send a new order to the backend
  const submitOrder = async (e) => {
    e.preventDefault();
    if (!newItem) return;

    try {
      await fetch(`${backendUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: newItem })
      });
      
      setNewItem(""); // Clear the input box
      fetchOrders();  // Refresh the list to show the new order
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>OpenChoreo Order System</h1>
      <p style={{ color: '#666', fontSize: '12px' }}>Connected to: {backendUrl}</p>
      
      {/* The Order Form */}
      <form onSubmit={submitOrder} style={{ marginBottom: '30px' }}>
        <input 
          type="text" 
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)} 
          placeholder="Enter an item (e.g., Laptop)"
          style={{ padding: '8px', width: '70%', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>Place Order</button>
      </form>

      {/* The Order List */}
      <h2>Live Database Orders</h2>
      <ul style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        {orders.length === 0 ? <p>No orders yet!</p> : null}
        {orders.map((order) => (
          <li key={order.id} style={{ padding: '8px 0', borderBottom: '1px solid #ddd' }}>
            <strong>Order #{order.id}:</strong> {order.item} — <em>{order.status}</em>
          </li>
        ))}
      </ul>
    </main>
  );
}