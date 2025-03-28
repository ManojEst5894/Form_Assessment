"use client";
import React, { useEffect, useState } from "react";
import { Grid, Column, Tile } from "@carbon/react";
import { useRouter } from "next/navigation";

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
    <div className="bx--grid bx--grid--full-width bx--grid--no-gutter">
      <div className="bx--row">
        <div className="bx--col-lg-12">
          <h1 className="browse-title">Browse Products</h1>
        </div>
      </div>
      <Grid>
        {products.map((product) => (
          <Column key={product.id} sm={4} md={4} lg={4}>
            <Tile className="product-tile">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-thumbnail"
                onClick={() => handleImageClick(product.id)}
              />
              <p>{product.title}</p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
            </Tile>
          </Column>
        ))}
      </Grid>
    </div>
  );
};

export default Browse;
