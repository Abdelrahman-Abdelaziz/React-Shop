import { NavLink, useNavigate } from "react-router";
import {
  ShoppingOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Badge, Button } from "antd";
import { toggleTheme } from "../features/theme/themeSlice";
import { logOut } from "../features/auth/authSlice";
import { useGetCartQuery } from "../services/cartApi";
import { useGetWishlistQuery } from "../services/wishlistApi";
import { api } from "../services/api";

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: cart } = useGetCartQuery();
  const { data: wishlist } = useGetWishlistQuery();

  const cartCount = cart?.items.length ?? 0;
  const wishlistCount = wishlist?.length ?? 0;

  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppSelector((state) => state.theme.mode);

  const showedUserName = user?.name ?? user?.email ?? "";

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className="border-b bg-white px-6 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Section 1 */}
        {/* Shop title */}
        <NavLink to="/products" className="flex items-center gap-2">
          <ShoppingOutlined className="text-2xl" />
          <span className="text-xl font-bold">My Shop</span>
        </NavLink>

        {/* Navigation links */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "font-semibold text-blue-600" : "text-gray-600"}`
            }
          >
            <AppstoreOutlined />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "font-semibold text-blue-600" : "text-gray-600"}`
            }
          >
            <Badge count={cartCount} size="small">
              <ShoppingCartOutlined />
            </Badge>
            <span>Cart</span>
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "font-semibold text-blue-600" : "text-gray-600"}`
            }
          >
            <Badge count={wishlistCount} size="small">
              <HeartOutlined />
            </Badge>
            <span>Wishlist</span>
          </NavLink>
        </div>

        {/* Section 2 */}
        <div className="flex items-center gap-3">
          <span className="hidden text-sm sm:inline">{showedUserName}</span>

          <Button
            type="text"
            aria-label="Toggle theme"
            icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
            onClick={handleThemeToggle}
          />

          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => {
              dispatch(logOut());
              localStorage.removeItem('accessToken');
              localStorage.removeItem('user');
              dispatch(api.util.resetApiState());
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
