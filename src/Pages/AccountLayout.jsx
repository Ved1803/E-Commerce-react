import { NavLink, Outlet } from "react-router-dom";

const AccountLayout = () => {
  const menuItems = [
    { path: "orders", label: "Orders" },
    { path: "settings", label: "Account Settings" },
    { path: "wishlist", label: "Wishlist" },
    { path: "coupons", label: "Coupons" },
    { path: "giftcards", label: "Gift Cards" },
    { path: "help", label: "Help Center" },
  ];

  return (
    <>
      <div className="content-area">
        <div className="user-info">
          <div className="info-box">
            <div className="info-title">Personal Information</div>
            <div>John Doe</div>
            <div>john.doe@email.com</div>
          </div>
          <div className="info-box">
            <div className="info-title">Address</div>
            <div>123 Main Street</div>
            <div>New York, NY 10001</div>
          </div>
        </div>
      </div>

      <div className="container main-content">
        <div className="sidebar">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/account/${item.path}`}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};
export default AccountLayout;
