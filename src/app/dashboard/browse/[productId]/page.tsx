"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Grid, Column, Tile } from "@carbon/react";
import "./page.scss";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<{
    title: string;
    thumbnail: string;
    price: number;
    description: string;
    brand: string;
    category: string;
    rating: number;
    stock: number;
  } | null>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [productId]);

  if (!product) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="product-details">
      <Grid className="product-grid">
        <Column sm={12} md={12} lg={16} className="product-title-column">
          <h1 className="product-title">{product.title}</h1>
        </Column>
        <Column sm={4} md={4} lg={4} className="product-image-column">
          <Tile className="product-image-tile">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
          </Tile>
        </Column>
        <Column sm={8} md={8} lg={12} className="product-info-column">
          <Tile className="product-info-tile">
            <p className="product-price">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="product-description">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="product-brand">
              <strong>Brand:</strong> {product.brand}
            </p>
            <p className="product-category">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="product-rating">
              <strong>Rating:</strong> {product.rating} / 5
            </p>
            <p className="product-stock">
              <strong>Stock:</strong> {product.stock} units available
            </p>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
};

export default ProductDetails;
