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
import ReactPaginate from "react-paginate";
import nodatafound from "../../assets/NoDataFound/notdatafound.webp";
const ShopCategory = (props) => {
  const { banner, title, Tag } = props;
  const { Brand } = useParams();
  const location = useLocation();
  const [gridViewActive, setGridViewActive] = useState(true);
  const [listViewActive, setListViewActive] = useState(false);
  const [limit, setLimit] = useState(36);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [totalProduct, setTotalProduct] = useState(0);
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
    const fetchData = async (newOffset) => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.post(
          `https://api.yourrlove.com/v1/web/products/filter?limit=${limit}&offset=${newOffset}`,
          {
            filters: filters,
            sort: [sort.field, sort.order],
          }
        );
        setProducts(response.data.metadata.products);
        setTotalProduct(response.data.metadata.Total);
        setPageCount(Math.ceil(totalProduct / limit));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(offset);
  }, [filters, sort, limit, offset, totalProduct]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    console.log("selectedPage", selectedPage);
    const newOffset = selectedPage;
    setOffset(newOffset);
    console.log("offset", newOffset);
    window.scrollTo(0, 900);
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setOffset(0); // Reset to first page when limit changes
  };

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
      return newFilters;
    });

    setCheckedState((prevCheckedState) => {
      const newCheckedState = { ...prevCheckedState };
      if (checked) {
        newCheckedState[name] = { ...newCheckedState[name], [value]: true };
      } else {
        newCheckedState[name] = { ...newCheckedState[name], [value]: false };
      }
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
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< prev"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
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
                  onChange={handleLimitChange}
                  value={limit}
                >
                  <option value="10">10</option>
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
          {loading ? ( // Show loading spinner when data is being fetched
            <div className="flex justify-center items-center h-64">
              <div className="loader"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <img
                src={nodatafound}
                alt="No data found"
                className="w-64 h-64"
              />
              <p className="text-xl text-gray-600 mt-4">No data found</p>
            </div>
          ) : (
            <Products result={result} gridViewActive={gridViewActive} />
          )}
          {/* Pagination bottom */}
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
                  Showing <span className="font-medium">{offset + 1}</span> to{" "}
                  <span className="font-medium">
                    {Math.min(offset + limit, totalProduct)}
                  </span>{" "}
                  of <span className="font-medium">{totalProduct}</span>{" "}
                  products
                </p>
              </div>
              <div>
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={pageCount}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
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
