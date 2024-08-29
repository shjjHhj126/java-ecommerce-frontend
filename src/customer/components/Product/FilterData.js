export const color = [
  "white",
  "black",
  "red",
  "blue",
  "orange",
  "green",
  "yellow",
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "orange", label: "Orange" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  },
];

export const singleFilters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "159-399", label: "$150 - $399" },
      { value: "399-999", label: "$399 - $999" },
      { value: "999-1999", label: "$999 - $1999" },
      { value: "1999-2999", label: "$1999 - $2999" },
      { value: "2999-3999", label: "$2999 - $3999" },
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "10", label: "10% And Above" },
      { value: "20", label: "20% And Above" },
      { value: "30", label: "30% And Above" },
      { value: "40", label: "40% And Above" },
      { value: "50", label: "50% And Above" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out Of Stock" },
    ],
  },
];
