"use client"
import React, { useEffect, useState } from "react";
import { Grid, Column, Tile } from "@carbon/react";
import { useRouter } from "next/navigation";

const Browse = () => {
    const [products, setProducts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        // Fetch data from the dummy JSON API
        fetch("https://dummyjson.com/products")
            .then((response) => response.json())
            .then((data) => setProducts(data.products))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleImageClick = (productId) => {
        router.push(`/browse/${productId}`); // Navigate to the product details page
    };

    return (
        <div>
            <h1 style={{ marginBottom: "2rem" }}>Browse Products</h1>
            <Grid>
                {products.map((product) => (
                    <Column key={product.id} sm={4} md={4} lg={4}>
                        <Tile style={{ textAlign: "center", padding: "1rem" }}>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                style={{ width: "100%", cursor: "pointer" }}
                                onClick={() => handleImageClick(product.id)}
                            />
                            <p>{product.title}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                        </Tile>
                    </Column>
                ))}
            </Grid>
        </div>
    );
};

export default Browse;
