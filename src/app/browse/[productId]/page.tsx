"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Grid, Column, Tile } from "@carbon/react";

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product details from the dummy JSON API
        fetch(`https://dummyjson.com/products/${productId}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error("Error fetching product details:", error));
    }, [productId]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1 style={{ marginBottom: "2rem" }}>{product.title}</h1>
            <Grid>
                <Column sm={4} md={4} lg={4}>
                    <Tile style={{ textAlign: "center", padding: "2rem" }}>
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            style={{ width: "100%", marginBottom: "1rem" }}
                        />
                    </Tile>
                </Column>
                <Column sm={8} md={8} lg={8}>
                    <Tile style={{ padding: "2rem" }}>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Description:</strong> {product.description}</p>
                    </Tile>
                </Column>
            </Grid>
        </div>
    );
};

export default ProductDetails;
