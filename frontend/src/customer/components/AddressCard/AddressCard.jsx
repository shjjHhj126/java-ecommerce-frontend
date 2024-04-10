import React from "react";

const AddressCard = ({ address }) => {
  return (
    <div>
      <div className="space-y-3">
        <p className="font-semibold tracking-wide">
          {address?.firstName}, {address?.lastName}
        </p>
        <div className="space-y-1 py-1">
          <p className="font-semibold tracking-wide">Delivery Address</p>
          <p className="tracking-wide">
            {address?.zipCode},{address?.streetAddress}, {address?.state}
          </p>
        </div>
        <div className="space-y-1 py-1">
          <p className="font-semibold tracking-wide">Phone Number</p>
          <p className="tracking-wide">{address?.mobile}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
