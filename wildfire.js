// Wildfire Risk Assessment for California

// Define the area of interest: California
var california = ee.FeatureCollection('TIGER/2018/States')
                    .filter(ee.Filter.eq('NAME', 'California'));

// Center the map on California
Map.centerObject(california, 6);

// Add California boundary to the map
Map.addLayer(california, {color: 'black'}, 'California Boundary');

// Load and visualize Digital Elevation Model (DEM) data
var dem = ee.Image('USGS/SRTMGL1_003').clip(california);
Map.addLayer(dem, {min: 0, max: 3000, palette: ['white', 'brown']}, 'DEM');

// Calculate slope and aspect from DEM
var terrain = ee.Terrain.products(dem);
var slope = terrain.select('slope');
var aspect = terrain.select('aspect');
Map.addLayer(slope, {min: 0, max: 60, palette: ['white', 'red']}, 'Slope');
Map.addLayer(aspect, {min: 0, max: 360, palette: ['white', 'blue']}, 'Aspect');

// Load and visualize NDVI data
var ndvi = ee.ImageCollection('MODIS/006/MOD13A1')
             .filterDate('2024-01-01', '2024-12-31')
             .select('NDVI')
             .mean()
             .clip(california);
Map.addLayer(ndvi, {min: 0, max: 9000, palette: ['white', 'green']}, 'NDVI');

// Load and visualize EVI data
var evi = ee.ImageCollection('MODIS/006/MOD13A1')
            .filterDate('2024-01-01', '2024-12-31')
            .select('EVI')
            .mean()
            .clip(california);
Map.addLayer(evi, {min: 0, max: 9000, palette: ['white', 'blue']}, 'EVI');

// Load and visualize land surface temperature data
var lst = ee.ImageCollection('MODIS/006/MOD11A2')
            .filterDate('2024-01-01', '2024-12-31')
            .select('LST_Day_1km')
            .mean()
            .clip(california);
Map.addLayer(lst, {min: 13000, max: 16500, palette: ['blue', 'red']}, 'Land Surface Temperature');

// Load and visualize population density data
var population = ee.Image('CIESIN/GPWv411/GPW_Population_Density')
                   .select('population_density')
                   .clip(california);
Map.addLayer(population, {min: 0, max: 1000, palette: ['white', 'purple']}, 'Population Density');

// Load and visualize road network data
var roads = ee.FeatureCollection('TIGER/2016/Roads')
               .filterBounds(california);
Map.addLayer(roads, {color: 'gray'}, 'Roads');

// Calculate road density
var roadRaster = roads.reduceToImage(['linearid'], ee.Reducer.count());
var roadDensity = roadRaster.reduceNeighborhood({
  reducer: ee.Reducer.sum(),
  kernel: ee.Kernel.square(1, 'kilometers')
}).clip(california);
Map.addLayer(roadDensity, {min: 0, max: 5, palette: ['white', 'black']}, 'Road Density');

// Normalize datasets to a common scale (0 to 1)
var ndviNorm = ndvi.divide(9000);
var eviNorm = evi.divide(9000);
var lstNorm = lst.subtract(13000).divide(3500);
var slopeNorm = slope.divide(60);
var aspectNorm = aspect.divide(360);
var elevationNorm = dem.divide(3000);
var populationNorm = population.divide(1000);
var roadDensityNorm = roadDensity.divide(5);

// Calculate wildfire risk index
var wildfireRisk = ndviNorm
                    .add(eviNorm)
                    .add(lstNorm)
                    .add(slopeNorm)
                    .add(aspectNorm)
                    .add(elevationNorm)
                    .add(populationNorm)
                    .add(roadDensityNorm)
                    .rename('Wildfire_Risk')
                    .clip(california);
Map.addLayer(wildfireRisk, {min: 0, max: 8, palette: ['blue', 'yellow', 'orange', 'red']}, 'Wildfire Risk');

// Export the wildfire risk map
Export.image.toDrive({
  image: wildfireRisk,
  description: 'California_Wildfire_Risk',
  scale: 1000,
  region: california.geometry(),
  fileFormat: 'GeoTIFF'
});
