// image collections
var imp = require("users/InifapCenidRaspa/VICAL:Exportaciones");
// vegetation indices
var imp2 = require("users/InifapCenidRaspa/VICAL:VegetationIndex");
// visualization styles
var st = require("users/InifapCenidRaspa/VICAL:Style");

// * Image Collection
var duration = ["1911-01-01", "2023-01-01"]; // start and end date
// polygon or point
var boundary = ee.Geometry.Polygon([
  [116.323614, 40.011275],
  [116.323852, 40.011278],
  [116.324091, 40.011233],
  [116.324366, 40.011231],
  [116.324589, 40.011166],
  [116.324843, 40.011073],
  [116.325598, 40.011818],
  [116.326276, 40.012656],
  [116.326538, 40.013228],
  [116.327586, 40.013251],
  [116.328089, 40.013269],
  [116.328161, 40.013269],
  [116.32821, 40.013263],
  [116.328883, 40.013136],
  [116.328944, 40.013132],
  [116.329014, 40.013128],
  [116.330892, 40.013178],
  [116.330925, 40.013178],
  [116.330986, 40.013163],
  [116.331326, 40.013033],
  [116.332104, 40.012384],
  [116.334612, 40.010122],
  [116.335559, 40.009323],
  [116.335907, 40.008901],
  [116.336232, 40.008421],
  [116.336342, 40.008221],
  [116.336599, 40.0074],
  [116.336688, 40.006976],
  [116.33683, 40.004731],
  [116.336994, 40.00047],
  [116.337062, 39.999151],
  [116.335405, 39.999079],
  [116.33545, 39.997942],
  [116.335407, 39.997796],
  [116.335319, 39.997707],
  [116.335255, 39.997668],
  [116.334376, 39.997617],
  [116.334118, 39.997604],
  [116.332891, 39.997533],
  [116.332942, 39.996644],
  [116.333029, 39.996647],
  [116.333035, 39.996499],
  [116.332256, 39.996497],
  [116.332201, 39.996387],
  [116.332096, 39.996327],
  [116.32872, 39.996203],
  [116.328891, 39.994392],
  [116.328545, 39.994387],
  [116.328197, 39.994558],
  [116.32755, 39.994642],
  [116.326888, 39.994635],
  [116.326893, 39.994322],
  [116.326494, 39.994379],
  [116.323791, 39.994287],
  [116.32266, 39.993246],
  [116.322696, 39.992612],
  [116.322023, 39.992582],
  [116.321953, 39.992596],
  [116.321856, 39.992648],
  [116.321495, 39.99302],
  [116.321384, 39.993143],
  [116.321172, 39.99334],
  [116.32081, 39.993794],
  [116.320523, 39.995245],
  [116.320258, 39.996932],
  [116.320188, 39.99707],
  [116.320046, 39.997236],
  [116.319893, 39.997361],
  [116.319732, 39.997423],
  [116.31936, 39.9975],
  [116.319031, 39.997498],
  [116.318995, 39.998139],
  [116.318945, 39.99815],
  [116.318836, 39.998147],
  [116.318561, 39.998122],
  [116.317087, 39.99806],
  [116.316241, 39.998056],
  [116.315888, 39.998489],
  [116.315534, 39.999001],
  [116.315239, 39.999379],
  [116.315243, 39.999569],
  [116.315319, 40.000088],
  [116.315329, 40.000818],
  [116.315369, 40.001874],
  [116.317312, 40.002026],
  [116.31739, 40.002188],
  [116.31736, 40.003347],
  [116.317307, 40.004134],
  [116.317373, 40.004418],
  [116.317297, 40.004535],
  [116.315382, 40.004455],
  [116.315399, 40.004788],
  [116.315426, 40.004917],
  [116.315455, 40.004995],
  [116.315581, 40.005203],
  [116.315742, 40.005357],
  [116.316397, 40.005719],
  [116.316611, 40.005803],
  [116.31714, 40.005904],
  [116.318258, 40.006041],
  [116.318435, 40.006074],
  [116.318606, 40.00613],
  [116.318817, 40.006219],
  [116.318966, 40.006304],
  [116.319101, 40.006433],
  [116.319177, 40.006546],
  [116.319249, 40.006683],
  [116.319317, 40.006849],
  [116.319326, 40.006955],
  [116.319352, 40.007165],
  [116.319355, 40.007253],
  [116.319315, 40.007581],
  [116.320893, 40.007657],
  [116.320831, 40.008344],
  [116.322765, 40.008477],
  [116.32266, 40.009199],
  [116.322612, 40.009703],
  [116.322568, 40.00995],
  [116.322473, 40.010205],
  [116.322902, 40.010296],
  [116.323139, 40.010324],
  [116.322925, 40.011135],
  [116.323434, 40.011257],
  [116.323614, 40.011275],
]);
var table = ee.FeatureCollection(boundary);

var clouds = 30; //percentage of clouds

// * Image Collection > Landsat
function SRImageCollection(duration, cutout, threshold) {
  // image collections are imported using the "imp" file
  var L9sr = imp.ColeccionLandsatSR(duration, "LC09", cutout, threshold);
  var L8sr = imp.ColeccionLandsatSR(duration, "LC08", cutout, threshold);
  var L7sr = imp.ColeccionLandsatSR(duration, "LE07", cutout, threshold);
  var L5sr = imp.ColeccionLandsatSR(duration, "LT05", cutout, threshold);
  var L4sr = imp.ColeccionLandsatSR(duration, "LT04", cutout, threshold);
  // ETM and ETM+ data are spectral fit to OLI and OLI-2
  var L7a = L7sr.map(imp.TMaOLI);
  var L5a = L5sr.map(imp.TMaOLI);
  var L4a = L4sr.map(imp.TMaOLI);
  // join collections
  var series = L9sr.merge(L8sr)
    .merge(L7a)
    .merge(L5a)
    .merge(L4a)
    .sort("system:time_start");
  return series;
}

// * Image Collection > Landsat & Sentinel-2
function CollectionImageBoth(duration, cutout, threshold) {
  // function for Landsat images with spectral adjustment
  var L8Set = SRImageCollection(duration, cutout, threshold);
  // Sentinel-2
  var S2sr = imp.ColeccionImagenSentinelSR(duration, cutout, threshold);
  // spectral matching of Sentinel-2 to Landsat
  var S2a = S2sr.map(imp.MSIaOLI);
  var series = S2a.merge(L8Set).sort("system:time_start");
  return series;
}

// the collection is imported
var S2B = CollectionImageBoth(duration, table, clouds);

// * Vegetation indices
// Normalized Difference Vegetation Index --- NDVI
var index_name = "NDVI";
var vis = ee.ImageCollection(S2B.map(imp2[index_name]));

// NDVI from the first image in the collection
var vi = vis.first();
// color palette where 'st' file is used
var viVis = { min: 0, max: 1, palette: st.paletaIV };
Map.addLayer(vi.clip(table), viVis, index_name); // index
// the map is centered to the area
Map.centerObject(table, 15);

// * Time Series
var filtered = boundary;
var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true,
});
var chart = ui.Chart.image.series(vis, filtered, reducers, 10).setOptions({
  title: "Vegetation Index Time Series",
  hAxis: { title: "Date", format: "yyyy-MM" },
  vAxis: { title: index_name },
});
print(chart);
