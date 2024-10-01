import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${item.id}`)}
      className="productCard w-[15rem] m-3 transition-all cursor-pointer">
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-top "
          src={item.imgList[0]}
          alt=""
        />
      </div>

      <div className="textPart bg-white p-3">
        <div className="">
          <p className="">{item.name}</p>
        </div>
        <div className="flex items-center space-x-2">
          {item.discountPrice ? (
            <>
              <p className="font-semibold ">${item.discountPrice}</p>
              <p className="line-through opacity-50">${item.price}</p>
            </>
          ) : (
            <p className="font-semibold">${item.price}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
