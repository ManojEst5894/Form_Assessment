"use client"
import React from 'react';
import { Grid, Column, Tile } from "@carbon/react";
import { Archive, Folder, Report } from "@carbon/icons-react";
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const router = useRouter();

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Welcome to IntelliSphere</h1>
            <Grid>
                <Column sm={4} md={4} lg={4}>
                    <Tile
                        onClick={() => router.push('/data-model')}
                        style={{ cursor: 'pointer', textAlign: 'center', padding: '2rem' }}
                    >
                        <Archive size={32} />
                        <p>Data Table</p>
                    </Tile>
                </Column>
                <Column sm={4} md={4} lg={4}>
                    <Tile
                        onClick={() => router.push('/browse')}
                        style={{ cursor: 'pointer', textAlign: 'center', padding: '2rem' }}
                    >
                        <Folder size={32} />
                        <p>Products</p>
                    </Tile>
                </Column>
                <Column sm={4} md={4} lg={4}>
                    <Tile
                        onClick={() => router.push('/dashboard/demo')} // Updated navigation
                        style={{ cursor: 'pointer', textAlign: 'center', padding: '2rem' }}
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
