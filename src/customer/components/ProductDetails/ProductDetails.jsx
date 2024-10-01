import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import HomeSectionCarousel from "../HomeSectionCarousel/HomeSectionCarousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { men_suits } from "../../../data/Men/men_suits";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../redux/Product/Action";
import { addItemToCart } from "../../../redux/Cart/Action";
import generateProperties from "./helpers/generateProperties";
import findVarByOptions from "./helpers/findVarByOptions";

const productt = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const { product } = useSelector((store) => store.product);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [mainUrl, setMainUrl] = useState("");
  const [totalItemNum, setTotalItemNum] = useState(0);
  const [selectedVars, setSelectedVars] = useState([]);

  const [properties, setProperties] = useState(new Map());

  const handleOptionChange = (index, option) => {
    const updatedOptions = [...selectedOptions];

    if (updatedOptions[index] && updatedOptions[index].value === option.value) {
      updatedOptions[index] = null;
    } else {
      updatedOptions[index] = option;

      if (index === 0 && option.url) {
        setMainUrl(option.url);
      }
    }
    setSelectedOptions((old) => updatedOptions);
  };

  const handleAddToCart = () => {
    const prdVarId = findVarByOptions(product, selectedOptions);

    const data = {
      prdVarId,
      quantity: 1,
    };

    dispatch(addItemToCart(data));
    // navigate("/cart");
  };

  useEffect(() => {
    const data = { productId: params.productId };
    dispatch(findProductById(data));
  }, [params.productId]);

  useEffect(() => {
    if (product && product.propertyList) {
      setProperties(generateProperties(product.propertyList));
      // Initialize selectedOptions based on product's propertyList
      setSelectedOptions(Array(properties.size).fill(null));
      setTotalItemNum(
        product.productVariantList.reduce(
          (total, variant) => total + variant.quantity,
          0
        )
      );
    }
  }, [product]);

  const compareOption = (a, b) => {
    if (
      typeof a !== "object" ||
      typeof b !== "object" ||
      a === null ||
      b === null
    )
      return false;

    return a.name === b.name && a.value === b.value && a.url === b.url;
  };

  // dynamic render totalItemNum and selectedVars
  useEffect(() => {
    if (product && product.productVariantList) {
      let updatedSelectedVars = product.productVariantList;
      for (const selectedOpObj of selectedOptions) {
        if (selectedOpObj) {
          updatedSelectedVars = updatedSelectedVars.filter((variant) =>
            variant.propertyList.some(
              (property) =>
                property.name === selectedOpObj.name &&
                property.value !== selectedOpObj.value
            )
          );
        }
      }
      setSelectedVars(updatedSelectedVars);
      setTotalItemNum(
        updatedSelectedVars.reduce(
          (total, variant) => total + variant.quantity,
          0
        )
      );
    }
  }, [selectedOptions, product]);

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg w-full aspect-square">
              <img
                src={mainUrl.length != 0 ? mainUrl : product?.imgList[0]}
                alt="main picture"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center">
              {product?.imgList.map((url) => (
                <div
                  key={url}
                  onClick={() => setMainUrl(url)}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    src={url}
                    alt="product image"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
              {product?.propertyList.map((item) =>
                item.url ? (
                  <div
                    key={item.url}
                    onClick={() => setMainUrl(item.url)}
                    className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                    <img
                      src={item.url}
                      alt="product property image"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 max-h-auto max-w-2xl px-4 sm:px-6 pb-16 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2 ">
              <h1 className="text-lg lg:text-2xl text-black pt-1">
                {product?.name}
              </h1>
            </div>

            {/* Reviews */}
            <div className="mt-6 ">
              <div className="flex items-center space-x-3">
                <Rating name="read-only" value={3.5} readOnly />
                <p className="opacity-50 text-sm">3245 ratings</p>
                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                  234 reviews
                </p>
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                {product?.discountPrice ? (
                  <>
                    <p className="font-semibold">${product?.discountPrice}</p>
                    <p className="opacity-50 line-through">${product?.price}</p>
                  </>
                ) : (
                  <p className="font-semibold">${product?.price}</p>
                )}
              </div>

              <form className="mt-10">
                <div className="mt-10">
                  {properties.length !== 0 &&
                    [...properties.entries()].map(([key, values], index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            {key}
                          </h3>
                        </div>

                        <RadioGroup
                          value={selectedOptions[index] || null} // Manage value independently
                          by={compareOption}
                          onChange={(value) => handleOptionChange(index, value)} // Update only the selected option for this group
                          className="mt-2 mb-4">
                          <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-3">
                            {values.map((obj) => (
                              <RadioGroup.Option
                                key={obj.name + obj.value}
                                value={{
                                  name: key,
                                  value: obj.value,
                                  url: obj.url,
                                }}
                                className={({ active, checked }) =>
                                  classNames(
                                    checked
                                      ? "cursor-pointer bg-white text-gray-900 shadow-sm ring-2 ring-indigo-500"
                                      : "cursor-pointer bg-white text-gray-900 shadow-sm",
                                    "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                  )
                                }>
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label
                                      as="span"
                                      className="flex items-center">
                                      {obj.url && (
                                        <img
                                          className="aspect-square object-cover w-10 h-10 mr-2"
                                          src={obj.url}
                                          alt={obj.value}
                                        />
                                      )}
                                      <p>{obj.value}</p>
                                    </RadioGroup.Label>
                                    <span
                                      className={classNames(
                                        checked
                                          ? "border-indigo-500"
                                          : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-md"
                                      )}
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 mt-7">
                  <Button
                    variant="contained"
                    onClick={handleAddToCart}
                    disabled={
                      totalItemNum === 0 ||
                      selectedOptions.length != properties.size
                    }
                    sx={{
                      px: "2rem",
                      py: "1rem",
                      bgColor: "black",
                      bgcolor: "black",
                      "&:hover": {
                        bgcolor: "black", // Change background color on hover
                      },
                    }}>
                    Add to Bag
                  </Button>
                  <p className="letter-spacing-2 text-sm font-semibold">
                    {totalItemNum} items left
                  </p>
                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description aresdyfugftreery</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*ratings and reviews */}
        <section>
          <h1 className="text-lg font-semibold pb-4">
            Recent reviews and ratings
          </h1>
          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {[1, 1, 1].map((review, index) => (
                    <ProductReviewCard key={index} />
                  ))}
                </div>
              </Grid>
              <Grid item xs={5}>
                <h1 className="text-xl font-semmibold pb-1">Product Ratings</h1>
                <div className="flex items-center space-x-3">
                  <Rating
                    name="overall_rating"
                    value={3.5}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-60">23581 Ratings</p>
                </div>

                <Box className="mt-5 space-y-3">
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={3}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={3}>
                      <p>Very Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={30}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={3}>
                      <p>Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 7,
                          color: "blue",
                        }}
                        variant="determinate"
                        value={25}
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={3}>
                      <p>Average</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={15}
                        color="warning"
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={3}>
                      <p>Poor</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={10}
                        color="error"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/*similar items */}
        <section className="pt-10">
          <h1 className="text-xl font-bold py-5">Similar Items</h1>
          <div className="flex flex-wrap my-5 gap-y-5">
            {men_suits.map((product, index) => (
              <HomeSectionCard key={index} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
