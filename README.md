# Wildfire Risk Assessment for California Using Google Earth Engine

This project utilizes Google Earth Engine (GEE) to perform a comprehensive wildfire risk assessment for California by analyzing multiple environmental and anthropogenic factors.

## Table of Contents

- [Introduction](#introduction)
- [Data Sources](#data-sources)
- [Methodology](#methodology)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Visualization](#visualization)
- [Exporting Results](#exporting-results)
- [References](#references)

## Introduction

California is highly susceptible to wildfires due to its diverse climate, vegetation, and topography. Assessing wildfire risk is crucial for effective disaster management and mitigation strategies. This project demonstrates how to integrate multiple datasets in GEE to create a detailed wildfire risk map for California.

## Data Sources

- **Digital Elevation Model (DEM)**: USGS/SRTMGL1_003
- **Slope and Aspect**: Derived from DEM
- **Normalized Difference Vegetation Index (NDVI)**: MODIS/006/MOD13A1
- **Enhanced Vegetation Index (EVI)**: MODIS/006/MOD13A1
- **Land Surface Temperature (LST)**: MODIS/006/MOD11A2
- **Population Density**: CIESIN/GPWv411/GPW_Population_Density
- **Road Network Data**: TIGER/2016/Roads

## Methodology

1. **Data Collection**: Acquire relevant datasets from GEE's public data catalog.
2. **Data Preprocessing**: Clip datasets to the California boundary and normalize them to a common scale (0 to 1).
3. **Risk Calculation**: Combine normalized datasets to compute a wildfire risk index.
4. **Visualization**: Display the wildfire risk map using a color palette ranging from blue
::contentReference[oaicite:0]{index=0}
 
