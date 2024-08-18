'use client';
import { useEffect, useState } from "react";
import ArrowIcon from "../../../public/icons/left-arrow-logo.svg";
import CheckIcon from "../../../public/icons/tick.svg";
import Image from "next/image";
import "./Products.css";
import FilterMenu from "../Filter/FilterMenu";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [sortOption, setSortOption] = useState("RECOMMENDED");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [likedProduct,setLikedProduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const url = 'https://fakestoreapi.com/products';
      try {
        const response = await fetch(url);
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.log("Error fetching products: " + error);
      }
    };

    fetchProducts();
  }, []);
 
  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const selectSortOption = (option) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  const Dropdown = ({ options }) => (
    <div className="dropdown">
      <button className="sort-button" onClick={toggleDropdown}>
        <p>{sortOption}</p>
        <Image
          style={{ rotate: `${dropdownOpen ? "180deg" : "0deg"}`, transition: "rotate 0.15s ease-in-out" }}
          src={ArrowIcon}
          alt="arrow"
          height={16}
          width={16}
        />
      </button>
      {dropdownOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => selectSortOption(option)}
              className={`dropdown-item ${option === sortOption ? "selected" : ""}`}
            >
              {option === sortOption && <Image src={CheckIcon} height={26} width={26} alt="check" />}
              <p>{option}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const ProductCard = ({product, name, cost, imgSrc }) => {
    const likeHandler = ()=>{
      if(likedProduct.includes(product.id)){
        setLikedProduct(prev=>prev.filter(pid=>(pid!==product.id)))
      }else{
        if(likedProduct.length===0){
          setLikedProduct([product.id])
        }else{
          setLikedProduct(prev=>[...prev,product.id]);
        }
      }
    }
    return (
    <section className="product-card">
    <section className="product-image">
      <Image src={imgSrc} alt={name} width={250} height={250} />
    </section>
    <section className="product-info">
      <div className="info-content">
        <p className="product-name">{name}</p>
        <div className="account-links">
          <Link href="#" style={{ textDecoration: "underline" }}>Sign up</Link>
          {" or "}
          <Link href="#">Create an account to view pricing</Link>
        </div>
      </div>
      <div onClick={likeHandler} className="like-icon"  style={{ cursor: "pointer" }}>
        {
          likedProduct.includes(product.id) ? <AiFillHeart className="like"/> : <AiOutlineHeart className="like"/>
        }
      </div>
    </section>
  </section>)
  };
    
    
  

  const sortOptions = ["RECOMMENDED", "NEWEST FIRST", "POPULAR", "PRICE: HIGH TO LOW", "PRICE: LOW TO HIGH"];
  const filterOptions = ["IDEAL FOR", "OCCASION", "WORK", "FABRIC", "SEGMENT", "SUITABLE FOR", "RAW MATERIALS", "PATTERN"];

  return (
    <main id="products-main">
      <hr />
      <section className="top-section">
        <div className="top-left">
          <p className="item-count mobile">3425 ITEMS</p>
          <div
            onClick={() => setShowFilter(prev => !prev)}
            role="button"
            className="filter-toggle"
          >
            <p className="filter-text mobile">FILTERS</p>
            <Image
              style={{ rotate: `${showFilter ? "90deg" : "270deg"}`, transition: "rotate 0.15s ease-in-out" }}
              src={ArrowIcon}
              className="mobile"
              alt="arrow"
              height={16}
              width={16}
            />
            <p className="mobile" style={{  opacity: "100%" }}>
              {showFilter ? "HIDE FILTER" : "SHOW FILTER"}
            </p>
          </div>
        </div>
        <div>
          <Dropdown options={sortOptions} />
        </div>
      </section>
      <hr />
      <section className="main-section">
        {showFilter && (
          <section className="filter-section">
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input id="custom-checkbox" type="checkbox" className="custom-checkbox" />
              <label htmlFor="custom-checkbox" className="custom-label">CUSTOMIZE</label>
            </div>
            
            {filterOptions.map((option, index) => (
              <FilterMenu key={index} title={option} />
            ))}
          </section>
        )}
        <section className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.title}
              cost={product.price}
              imgSrc={product.image}
              product={product}
            />
          ))}
        </section>
      </section>
    </main>
  );
};

export default ProductPage;
