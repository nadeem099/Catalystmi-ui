import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { SideFilters } from "../components";
import { FilterContextProvider } from "../contexts/FiltersContext";
import CartContext from "../contexts/CartContext";

function MasterLayout({ children }) {
  const { cartCount } = useContext(CartContext);
  return (
    <>
      {/* app wrapper */}
      <div className="container flex flex-col">
        {/* header wrapper */}
        <div>
          <div className="text-center py-8 bg-white">
            <h1>
              <Link to="/">MYCOOLESHOP.COM</Link>
            </h1>
          </div>
          {/* top Nav wrapper */}
          <div className="flex flex-row justify-between py-5 px-8 bg-gray-200">
            <nav>
              <ul className="flex flex-row gap-8">
                <li>
                  <Link to="/products">All Products</Link>
                </li>
                <li>
                  <Link to="/featured">Featured Products</Link>
                </li>
              </ul>
            </nav>
            <button className="text-2xl flex gap-2">
              <FaCartArrowDown />
              <span className="text-[18px] mt-[-5px]">{cartCount}</span>
            </button>
          </div>
        </div>
        {/* body wrapper */}
        <div className="flex flex-row p-8">
          {/* Sidebar */}
          <FilterContextProvider>
            <>
              <section>
                <SideFilters />
              </section>
              {/* main */}
              <section>
                <main>{children}</main>
              </section>
            </>
          </FilterContextProvider>
        </div>
      </div>
    </>
  );
}

export default MasterLayout;
