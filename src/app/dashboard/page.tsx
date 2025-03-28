"use client";
import React from "react";
import { Grid, Column, Tile } from "@carbon/react";
import { Archive, Folder, Report } from "@carbon/icons-react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="bx--grid bx--grid--full-width bx--grid--no-gutter">
      <div className="bx--row">
        <div className="bx--col-lg-12">
          <h1 className="dashboard-title">Welcome to IntelliSphere</h1>
        </div>
      </div>
      <Grid>
        <Column sm={4} md={4} lg={4}>
          <Tile
            onClick={() => router.push("/data-model")}
            className="dashboard-tile"
          >
            <Archive size={32} />
            <p>Data Table</p>
          </Tile>
        </Column>
        <Column sm={4} md={4} lg={4}>
          <Tile
            onClick={() => router.push("/browse")}
            className="dashboard-tile"
          >
            <Folder size={32} />
            <p>Products</p>
          </Tile>
        </Column>
        <Column sm={4} md={4} lg={4}>
          <Tile
            onClick={() => router.push("/dashboard/demo")}
            className="dashboard-tile"
          >
            <Report size={32} />
            <p>Demo</p>
          </Tile>
        </Column>
      </Grid>
    </div>
  );
};

export default Dashboard;
