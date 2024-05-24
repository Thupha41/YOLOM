import React, { useState, useEffect } from "react";
import CardItem from "../../components/CardItem/CardItem";
import Products from "../../components/Products/Products";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import PropTypes from "prop-types";
import axios from "axios";
import { BsGridFill } from "react-icons/bs";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import "./ShopCategory.css";
import { useParams, useLocation } from "react-router-dom";
import FilterComponent from "../../components/Filter/FilterComponent";
import { GoTriangleDown } from "react-icons/go";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const ShopCategory = (props) => {
  const { banner, title, Tag } = props;
  const { Brand } = useParams();
  const location = useLocation();
  const [gridViewActive, setGridViewActive] = useState(true);
  const [listViewActive, setListViewActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(24);
  const [productsCount, setProductsCount] = useState(0);

  const toggleGridView = () => {
    setGridViewActive(true);
    setListViewActive(false);
  };

  const toggleListView = () => {
    setGridViewActive(false);
    setListViewActive(true);
  };
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  const initialFilters = JSON.parse(localStorage.getItem("filters")) || {
    brand: Brand ? [Brand] : null,
    catalogue: null,
    tag: Tag ? [Tag] : null,
    size: null,
    color: null,
    price: null,
    rating: null,
  };
  const [filters, setFilters] = useState(initialFilters);
  const [products, setProducts] = useState([]);

  const [sort, setSort] = useState({
    field: "product_name",
    order: "ASC",
  });
  const [checkedState, setCheckedState] = useState({
    brand: Brand ? { [Brand]: true } : {},
    catalogue: {},
    tag: Tag ? { [Tag]: true } : {},
    size: {},
    color: {},
    price: {},
    rating: {},
  });

  const priceDisplayMap = {
    1000000: "under 1.000.000đ",
    2000000: "1.000.000đ - 2.000.000đ",
    3000000: "2.000.000đ - 3.000.000đ",
    4000000: "3.000.000đ - 4.000.000đ",
    4000001: "over 4.000.000đ",
  };
  const priceRangeMap = {
    1000000: [0, 1000000],
    2000000: [1000001, 2000000],
    3000000: [2000001, 3000000],
    4000000: [3000001, 4000000],
    4000001: [4000001, 1000000000],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://api.yourrlove.com/v1/web/products/filter?limit=36&offset=0",
          {
            filters: filters,
            sort: [sort.field, sort.order],
          }
        );
        setProducts(response.data.metadata);
        console.log("filter product", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filters, sort]);

  useEffect(() => {
    // Update localStorage whenever filters or checkedState change
    localStorage.setItem("filters", JSON.stringify(filters));
    localStorage.setItem("checkedState", JSON.stringify(checkedState));
  }, [filters, checkedState]);

  useEffect(() => {
    // Reset filters and checked state whenever the component mounts or URL changes
    setFilters({
      brand: Brand ? [Brand] : null,
      catalogue: null,
      tag: Tag ? [Tag] : null,
      size: null,
      color: null,
      price: null,
      rating: null,
    });
    setCheckedState({
      brand: Brand ? { [Brand]: true } : {},
      catalogue: {},
      tag: Tag ? { [Tag]: true } : {},
      size: {},
      color: {},
      price: {},
      rating: {},
    });
  }, [Tag, Brand, location.pathname]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (name === "price") {
        if (checked) {
          newFilters.price = priceRangeMap[value];
        } else {
          newFilters.price = null;
        }
      } else {
        if (checked) {
          newFilters[name] = newFilters[name]
            ? [...newFilters[name], value]
            : [value];
        } else {
          newFilters[name] = newFilters[name]
            ? newFilters[name].filter((item) => item !== value)
            : null;
          if (newFilters[name] && newFilters[name].length === 0) {
            newFilters[name] = null;
          }
        }
      }
      console.log("Filters updated:", newFilters);
      return newFilters;
    });

    setCheckedState((prevCheckedState) => {
      const newCheckedState = { ...prevCheckedState };
      if (checked) {
        newCheckedState[name] = { ...newCheckedState[name], [value]: true };
      } else {
        newCheckedState[name] = { ...newCheckedState[name], [value]: false };
      }
      console.log("Checked state updated:", newCheckedState);
      return newCheckedState;
    });
    window.scrollTo(0, 900);
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    const [field, order] = value.split("-");
    setSort({
      field,
      order: order.toUpperCase(),
    });
  };

  const removeFilter = (filterType, value) => {
    if (filterType === "tag") return;

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (filterType === "price") {
        newFilters.price = null;
      } else {
        newFilters[filterType] = newFilters[filterType].filter(
          (v) => v !== value
        );
        if (newFilters[filterType].length === 0) {
          newFilters[filterType] = null;
        }
      }
      console.log("Filters updated (remove):", newFilters);
      return newFilters;
    });
    setCheckedState((prevCheckedState) => {
      const newCheckedState = { ...prevCheckedState };
      if (filterType === "price") {
        newCheckedState.price = {};
      } else {
        newCheckedState[filterType] = {
          ...newCheckedState[filterType],
          [value]: false,
        };
      }
      console.log("Checked state updated (remove):", newCheckedState);
      return newCheckedState;
    });
  };

  const clearFilters = () => {
    setFilters({
      brand: Brand ? [Brand] : null,
      tag: Tag ? [Tag] : null,
      size: null,
      color: null,
      price: null,
      catalogue: null,
      rating: null,
    });
    setCheckedState({
      brand: Brand ? { [Brand]: true } : {},
      catalogue: {},
      tag: Tag ? { [Tag]: true } : {},
      size: {},
      color: {},
      price: {},
      rating: {},
    });
  };

  function filteredData() {
    return products.map((product) => (
      <CardItem
        key={product.sku_id}
        id={product.Product.product_id}
        thumbnail={product.sku_image}
        name={product.Product.product_name}
        oldPrice={product.oldPrice}
        current_unit_price={product.Product.product_price}
        labelType={product.labelType}
        brand={product.Product.Brand.name}
        rating={product.Product.product_rating}
        sku_slug={product.sku_slug}
      />
    ));
  }
  const result = filteredData();
  return (
    <div className="mx-auto p-2 mb-20">
      {/* Breadcrumb */}
      <div className="ml-[-130px]">
        <Breadcrumb tag={Tag} brand={Brand} />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-regular font-spartan mb-10 mt-10 ml-10">
        {title}
      </h1>

      {/* Banner */}
      <div>
        <img src={banner} alt="" />
      </div>
      <div className="mt-24 flex flex-wrap -mx-4">
        {/* Sidebar for filters */}
        <div className="w-full md:w-1/4 px-4 mb-4 md:mb-0">
          <FilterComponent
            filters={filters}
            handleFilterChange={handleFilterChange}
            removeFilter={removeFilter}
            clearFilters={clearFilters}
            checkedState={checkedState}
            priceDisplayMap={priceDisplayMap}
          />
        </div>
        <div className="w-full md:w-[73%] px-4 mr-4">
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between mb-4">
            {/* Pagination top */}
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="relative z-10 inline-flex items-center bg-black px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                  ...
                </span>
                <a
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                >
                  8
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  9
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  10
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
            {/* GRID VIEW */}
            <div className="flex items-center gap-4">
              <span
                className={`${
                  gridViewActive
                    ? "bg-black text-white"
                    : "border-[1px] border-gray-300 text-[#737373]"
                } w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
                onClick={toggleGridView}
              >
                <BsGridFill />
              </span>
              <span
                className={`${
                  listViewActive
                    ? "bg-black text-white"
                    : "border-[1px] border-gray-300 text-[#737373]"
                } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
                onClick={toggleListView}
              >
                <BsFillGrid3X3GapFill />
              </span>
            </div>
            {/* SORT and PAGINATION */}
            <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-base text-[#767676] relative">
                <label className="mb-0 block">Sort by:</label>
                <select
                  className="w-32 md:w-48 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-black text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-black"
                  onChange={handleSortChange}
                >
                  <option value="product_name-ASC">Default</option>
                  <option value="product_name-ASC">Alphabetically, A-Z</option>
                  <option value="product_name-DESC">Alphabetically, Z-A</option>
                  <option value="product_price-ASC">Price, low to high</option>
                  <option value="product_price-DESC">Price, high to low</option>
                </select>
                <span className="absolute text-sm right-2 md:right-4 top-2.5">
                  <GoTriangleDown />
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#767676] relative">
                <label className="mb-0 block">Show:</label>
                <select
                  name="limit"
                  className="w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-black text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-black"
                >
                  <option value="24">24</option>
                  <option value="36">36</option>
                </select>
                <span className="absolute text-sm right-3 top-2.5">
                  <GoTriangleDown />
                </span>
              </div>
            </div>
          </div>
          {/* Display products */}
          <Products result={result} gridViewActive={gridViewActive} />
          {/* Pagination bottom*/}
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-14">
            <div className="flex flex-1 justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Next
              </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">10</span> of{" "}
                  <span className="font-medium">97</span> products
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  <a
                    href="#"
                    aria-current="page"
                    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    3
                  </a>
                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    ...
                  </span>
                  <a
                    href="#"
                    className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                  >
                    8
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    9
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    10
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ShopCategory.propTypes = {
  banner: PropTypes.string,
  title: PropTypes.string,
  Tag: PropTypes.oneOf(["New Arrival", "Sale", "default"]),
  Brand: PropTypes.oneOf([
    "BANANA_REPUBLIC",
    "MANGO",
    "COTTON ON",
    "OLD NAVY",
    "LEVI'S",
    "O21_CTTT",
    "GAP",
  ]),
};

export default ShopCategory;
