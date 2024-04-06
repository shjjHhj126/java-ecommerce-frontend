import React from "react";

const AddressCard = () => {
  return (
    <div>
      <div className="space-y-3">
        <p className="font-semibold tracking-wide">Sherry, Lisley</p>
        <div className="space-y-1 py-1">
          <p className="font-semibold tracking-wide">Delivery Address</p>
          <p className="tracking-wide">New York, the seventh street, 20023</p>
        </div>
        <div className="space-y-1 py-1">
          <p className="font-semibold tracking-wide">Phone Number</p>
          <p className="tracking-wide">623492451</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
