import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import { getOrderItems } from "../../api/apiFunctions";

const Orders = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOrderItems = async () => {
    try {
      setLoading(true);
      const response = await getOrderItems();
      setOrderItems(response.data);
      console.log();
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleOrderItems();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders: {error}</div>;

  return (
    <div className="content-area">
      <h2 className="section-title">Recent Orders</h2>

      {orderItems?.map((item) => (
        <div className="order-card" key={item.order_id}>
          <div className="order-header">
            <Link to={`/product/${item.collection.id}`}>
              <img
                src={item.collection.image_url}
                alt=""
                className="cartItem-product-icon"
              />
            </Link>
            <div>
              <b>Order #{item.order_id}</b>
            </div>
            <div className="order-status">Delivered</div>
          </div>
          <div>
            <b>{item.collection.name}</b>
          </div>
          <p>Qnty {item.quantity}</p>
          <div>Delivered on {item.created_at}</div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
