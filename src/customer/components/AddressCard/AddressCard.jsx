import React from "react";

const AddressCard = ({ address }) => {
  console.log(address);
  return (
    <div>
      <div className="space-y-3">
        <p className="font-semibold tracking-wide">{address?.receiverName}</p>
        <div className="space-y-1 py-1">
          <p className="font-semibold tracking-wide">Delivery Address</p>
          <p className="tracking-wide">
            {address?.postalCode + ", "}
            {address?.addressLine1 + ", "}
            {address?.addressLine2 ? address?.addressLine2 + ", " : ""}
            {address?.city + ", "}
            {address?.stateProvinceRegion + ", "}
            {address?.country + ", "}
          </p>
        </div>
        <div className="space-y-1 py-1">
          <p className="font-semibold tracking-wide">Phone Number</p>
          <p className="tracking-wide">{address?.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
