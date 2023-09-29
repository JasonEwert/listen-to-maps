class SearchMap { 
	_view;
	_viewDivId = "viewDiv";

	// the map div's name
	set viewDivId(viewDivId)   { this._viewDivId = viewDivId };
	get viewDivId()            { return this._viewDivId };


	async loadMap() {
		const viewDiv = this._viewDivId;
		var view;

	try{
		require([
			"esri/Map",
			"esri/views/MapView",
			"esri/Basemap",
			"esri/widgets/BasemapToggle",
			"esri/widgets/ScaleBar",
			"esri/geometry/support/webMercatorUtils",
			"esri/layers/FeatureLayer",
			"esri/rest/find",
			 "esri/rest/support/FindParameters",
			"esri/Graphic",
			"esri/layers/GraphicsLayer"
			
			],
		function(Map, MapView, Basemap, BasemapToggle, 
				 ScaleBar,webMercatorUtils,
				  FeatureLayer,
				  find, FindParameters,
				  Graphic, GraphicsLayer
				  
				) {
				
					const ctuLayer = new FeatureLayer({
					  // URL to the service
					  url: "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/WIMN/xsearch2/MapServer/0"
					});
					
					const graphicsLayer = new GraphicsLayer();
					
					// symbology templates
                    let fillSymbol = {
					  type: "simple-fill", // autocasts as new SimpleFillSymbol()
					  color: [227, 139, 79, 0.8],
					  outline: {
						// autocasts as new SimpleLineSymbol()
						color: [255, 255, 255],
						width: 1
					  }
					};

                    /*****************************************************************
                     * make the map already!
                     *****************************************************************/

                    const map = new Map({
                    basemap: "satellite", //"hybrid", //"streets-vector",
                    layers: [graphicsLayer]
                    });

                    view = new MapView({
                    container: viewDiv,
                    map: map,
                    center: [-94.5, 46.1],
					zoom: 10
                    });
					
					/*****************************************************************
					* Find
					*****************************************************************/


					let resultsDiv = document.getElementById("searchResults");
				//	use .focus() rather than ARIA live regions
				//	resultsDiv.setAttribute('aria-live', 'polite');
				//	resultsDiv.setAttribute('aria-atomic', 'true'); // reread the entire div, not just the cahnged content.
					resultsDiv.setAttribute('tabindex', '0');

					let resultsListDiv = document.getElementById("searchResultsList");
					
					let findUrl = "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/WIMN/xsearch2/MapServer";
					
					const params = new FindParameters({
					  layerIds: [0],
					  searchFields: ["NAME"],
					  returnGeometry: true
					});
					
					function doFind() {
					  params.searchText = document.getElementById("searchText").value + " City";
					  find.find(findUrl, params).then(showResults).catch(rejectedPromise);	
					  
					  // refocus on the text input element
					  // document.getElementById("searchText").focus();					  
					}
					
					function showResults(response) {
					  const results = response.results;
					  
					  console.log(JSON.stringify(results));

					  resultsListDiv.innerHTML = "";

					  // If no results are returned from the find, notify the user
					  if (results.length === 0) {
						resultsListDiv.innerHTML += "<p>No results found.</p>"
						return;
					  }
					  
					  graphicsLayer.removeAll();

					  // Loop through each result in the response and add as a row in the table
					  results.forEach(function (findResult, i) {
						  
						let city = findResult.feature.attributes["NAME"];
						let area = Math.trunc(findResult.feature.attributes["SHAPE_AREA"] / 2589988);
						let area2;
						if (area > 56){
							area2 = "bigger than"
						} else if (area < 56){
							area2 = "smaller than"
						}else if (area = 56){
							area2 = "the same as"
						};
						let shp = findResult.feature.geometry;
						resultsListDiv.innerHTML += ("<p>" + city + " is " + area + " square miles. This is " + area2 + " Saint Paul. </p>")
						addGeom(shp);
						
					  });

					  resultsDiv.focus(); // requires a tabindex

					}
										
					function addGeom (geom) {
						
						let polygonGraphic = new Graphic({
							  geometry: geom,
							  symbol: fillSymbol
							});
							
							graphicsLayer.add(polygonGraphic);
							
							let xList = [];
							let yList = [];
							
							let polygon = geom.rings[0];
							
							for (let i = 0; i < polygon.length; i++) {
							  xList.push(polygon[i][0])
							};

							for (let i = 0; i < polygon.length; i++) {
							  yList.push(polygon[i][1])
							};
							
							let xSum = 0;
							let ySum = 0;
							
							for (let i = 0; i < xList.length; i++) {
								xSum += xList[i];
							}
							let xAvg = xSum / xList.length;
							
							for (let i = 0; i < yList.length; i++) {
								ySum += yList[i];
							}
							let yAvg = ySum / xList.length;

							let latLong = webMercatorUtils.xyToLngLat(xAvg, yAvg);

							view.center = latLong;
							view.zoom = 11;
						
					};
					
					function rejectedPromise(error) {
					  console.error("Promise didn't resolve: ", error.message);
					}
					
					document.getElementById("findBtn").addEventListener("click", doFind);
					

					/*****************************************************************
                     * basemap toggle
                     *****************************************************************/

                    let basemapTopo = new Basemap({
                    portalItem: {
                        id: "931d892ac7a843d7ba29d085e0433465"  // USGS topo
                    }
                    });

                    let basemapToggle = new BasemapToggle({
                    view: view,
                    nextBasemap: basemapTopo //"terrain" //"topo-vector"
                    });


                    /*****************************************************************
                     * scale bar
                     *****************************************************************/

                    let scaleBar = new ScaleBar({
                    view: view,
                    unit: "non-metric"
                    });

                    
                 
                    /*****************************************************************
                     * UI
                     *****************************************************************/

                    view.ui.add(basemapToggle, "bottom-right");
                    view.ui.add(scaleBar, {position: "bottom-left"});
                    
                    }); 
                    } catch (error) {

                };
            };
        };