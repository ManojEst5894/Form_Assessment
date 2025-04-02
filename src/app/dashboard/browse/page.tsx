"use client";
import React, { useEffect, useState } from "react";
import { Grid, Column } from "@carbon/react";
import { useRouter } from "next/navigation";
import "./page.scss";

const Browse = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
  }

  const handleImageClick = (productId: number): void => {
    router.push(`/browse/${productId}`);
  };

  return (
    <div className="browse-container">
      <Grid>
        <Column sm={4} md={8} lg={16}>
          <h1>Browse Products</h1>
        </Column>
        {products.map((product) => (
          <Column
            key={product.id}
            sm={2}
            md={4}
            lg={4}
            className="product-column"
          >
            <button
              onClick={() => handleImageClick(product.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleImageClick(product.id);
                }
              }}
              className="tile-button"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <p>{product.title}</p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
            </button>
          </Column>
        ))}
      </Grid>
    </div>
  );
};

export default Browse;
