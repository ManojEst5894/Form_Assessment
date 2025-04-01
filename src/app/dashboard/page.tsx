"use client";
import React from "react";
import { Grid, Column, Tile } from "@carbon/react";
import { Archive, Folder, Report, Forum } from "@carbon/icons-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="dashboard-container">
      <Grid>
        <Column sm={4} md={8} lg={12}>
          <h1 className="dashboard-title">{t("dashboard.welcomeMessage")}</h1>
        </Column>
        <Column sm={4} md={8} lg={12}>
          <Grid className="dashboard-grid">
            <Column sm={4} md={4} lg={3}>
              <Tile className="dashboard-tile" onClick={() => router.push("/data-model")}>
                <Archive size={32} />
                <p>{t("dashboard.dataTable")}</p>
              </Tile>
            </Column>
            <Column sm={4} md={4} lg={3}>
              <Tile className="dashboard-tile" onClick={() => router.push("/browse")}>
                <Folder size={32} />
                <p>{t("dashboard.products")}</p>
              </Tile>
            </Column>
            <Column sm={4} md={4} lg={3}>
              <Tile className="dashboard-tile" onClick={() => router.push("/dashboard/demo")}>
                <Report size={32} />
                <p>{t("dashboard.shared")}</p>
              </Tile>
            </Column>
            <Column sm={4} md={4} lg={3}>
              <Tile className="dashboard-tile" onClick={() => router.push("/dashboard/form")}>
                <Forum size={32} />
                <p>{t("dashboard.form")}</p>
              </Tile>
            </Column>
          </Grid>
        </Column>
      </Grid>
    </div>
  );
};

export default Dashboard;
