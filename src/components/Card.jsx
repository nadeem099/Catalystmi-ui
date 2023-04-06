import React, { useMemo, useContext } from "react";
import CartContext from "../contexts/CartContext";

function Card({
  data: { name, price, image, colorId, materialId } = {},
  colors,
  material,
}) {
  const { addToCart } = useContext(CartContext);
  const [{ name: colorName } = {}] = useMemo(() =>
    colors.filter((item) => item.id === colorId)
  );

  const [{ name: materialName } = {}] = useMemo(() =>
    material.filter((item) => item.id === materialId)
  );

  return (
    <div>
      <div className="relative group hover:opacity-[0.8] transition">
        <img src={image} alt="img" width="350px" height="600px" />
        <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white hover:bg-gray-500 transition px-2 py-1 rounded hidden group-hover:block">
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold font-serif">{name}</p>
        <p>
          <span className="text-gray-500 font-semibold">
            {colorName && colorName.toUpperCase()}
          </span>{" "}
          <span className="font-light">
            {materialName && materialName.toUpperCase()}
          </span>
        </p>
        <p>
          <span className="">INR</span>{" "}
          <span className="font-serif text-red-900">{price}</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
