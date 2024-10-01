export const priceFilters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-499", label: "$0 - $499" },
      { value: "499-999", label: "$499 - $999" },
      { value: "999-1999", label: "$999 - $1999" },
      { value: "1999-2999", label: "$1999 - $2999" },
      { value: "2999-3999", label: "$2999 - $3999" },
      { value: "3999-", label: "$3999 above" },
    ],
  },
  {
    id: "discountRange",
    name: "Discount Range",
    options: [
      { value: "10", label: "at least 10%" },
      { value: "20", label: "at least 20%" },
      { value: "30", label: "at least 30%" },
      { value: "40", label: "at least 40%" },
      { value: "50", label: "at least 50%" },
    ],
  },
];
