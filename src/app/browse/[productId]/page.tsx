"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Grid, Column, Tile } from "@carbon/react";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<{
    title: string;
    thumbnail: string;
    price: number;
    description: string;
  } | null>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bx--grid bx--grid--full-width bx--grid--no-gutter">
      <div className="bx--row">
        <div className="bx--col-lg-12">
          <h1 className="product-title">{product.title}</h1>
        </div>
      </div>
      <Grid>
        <Column sm={4} md={4} lg={4}>
          <Tile className="product-image-tile">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
          </Tile>
        </Column>
        <Column sm={8} md={8} lg={8}>
          <Tile className="product-info-tile">
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
};

export default ProductDetails;
