class YouAreHereMap { 
				_view;
				_viewDivId = "viewDiv";

				// the map div's name
				set viewDivId(viewDivId)   { this._viewDivId = viewDivId };
				get viewDivId()            { return this._viewDivId };


				async loadMap() {
					const viewDiv = this._viewDivId;
					var view;
					var mapExtent;

					let updateView = (view) => this._view = view;

		try{
			require([
				"esri/Map",
				"esri/views/MapView",
				"esri/Basemap",
				"esri/widgets/BasemapToggle",
				"esri/widgets/Locate",
				"esri/widgets/ScaleBar",
				"esri/geometry/support/webMercatorUtils",
				"esri/rest/identify",
				"esri/rest/support/IdentifyParameters",
				"esri/layers/GraphicsLayer",
				"esri/Graphic",
				],
			function(Map, MapView, Basemap, BasemapToggle, Locate,
					 ScaleBar,webMercatorUtils,identify, IdentifyParameters,
					 GraphicsLayer, Graphic
					) {
					
						//graphic layer to hold the map center point icon
						const mapCenterGraphic = new GraphicsLayer({
							id: "mapCenterGraphic",
							listMode: "hide"
						});

		
						let boxSymLg = {
							type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
							color: [0, 255, 224, 0],
							style: 'square',
							outline: {
								color: [0, 255, 224],
								width: 2
							},
							size: 80
						};



						/*****************************************************************
						 * make the map already!
						 *****************************************************************/

						const map = new Map({
						basemap: "satellite", //"oceans", //"hybrid", //"streets-vector",
						layers: [mapCenterGraphic]
						});

						view = new MapView({
						container: viewDiv,
						map: map,
						center: [-94.5, 46.1],
						zoom: 10
						});

						//update the global _view
	//                    updateView(view);

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
						 * identify
						 *****************************************************************/

						const btnKeyboard = document.createElement("div");
						
						btnKeyboard.title = "Information Tool";
						btnKeyboard.id = "infoTool";
						btnKeyboard.setAttribute('tabindex', '0');
						btnKeyboard.classList.add("esri-widget--button","esri-widget", "esri-interactive");
						// icons: esri-icon-search esri-icon-locate esri-icon-description
						btnKeyboard.innerHTML = "<span aria-hidden='true' role='presentation' class='esri-icon esri-icon-search'></span>"
						btnKeyboard.innerHTML += "<span class='esri-icon-font-fallback-text'>Get Information. Use the keyboard to center the map. Press Alt i to learn more about this map.</span>";
						//view.ui.add(btnKeyboard, "top-left"); 

						/********* Functions for using keyboard to click features on the map and open a popup *************/
						
						//set up container for displaying keyboard instructions to the user
						const userNoteInfo = document.createElement("div");
						
						userNoteInfo.className = "userNote";
						userNoteInfo.innerHTML="<p>How to get information about map features: <ol><li>Use the keyboard to center the map on a feature</li><li>Press the <b>i</b> key to get info.</li></ol></p><p>How to navigate the map using the keyboard: <ul><li> Use <b>arrows</b> to move the map</li><li><b>+</b> key to zoom in</li><li><b>-</b> key to zoom out</li></ul></p>";
						userNoteInfo.classList.add("esri-widget");
						userNoteInfo.setAttribute('tabindex', '0'); // not sure about this.it doesn't recieve focus after the tool is opened, the map gets it. Maybe set to -1?
						
						const popupDiv = document.createElement("div");
						popupDiv.innerHTML="<h3>map notes</h3><br/>";
						popupDiv.classList.add("userNoteInfo", "esri-widget");
						popupDiv.setAttribute('aria-live', 'polite');
						//popupDiv.setAttribute('tabindex', '0'); // this causes NVDA to read the content twice
						
						//add an event listener to the view information button
						btnKeyboard.addEventListener("keypress", function(event) {
						  if (event.key === "Enter") {
							event.preventDefault();
							document.getElementById("infoTool").click();
						  }
						});

						btnKeyboard.addEventListener("click", function () {
							
							//check to see if the location button is already active. If it is, turn it off
							if (btnKeyboard.classList.contains("active")){
							
								btnKeyboard.classList.remove("active");
								mapCenterGraphic.removeAll();
								document.body.style.cursor = 'initial';
					//			view.ui.remove(userNoteInfo, "top-left");
								view.ui.remove(popupDiv, "top-left");

							} else {
							
								btnKeyboard.classList.add("active");
								document.body.style.cursor = 'crosshair';
					//			view.ui.add(userNoteInfo, "top-left");
								//accessibility set focus on the map application to enable keyboard navigation
								view.ui.add(popupDiv, "top-right");
								view.focus();
								addMapCenterGraphic();

								// function to run on keyup
								function handleMapSelect (event) {
									var key = event.which || event.keyCode;
									var alt = event.altKey;
									//if the user hits the i key on the keyboard, simulate a mouse click on the center of the map
									if ( key === 73 || ( alt === true && key === 73 ) || ( alt === true && key === 83 )) {
										event.stopPropagation();
										
										//executeIdentifyPLS(5, [2,3]);
										executeIdentifyCTU(50, [1,2,8,13,14,35]);

									} else {
										//if the key is an arrow
										if( key=== 37||key=== 38 || key=== 39 ||key=== 40) {
											//move graphic to the new center point
											mapCenterGraphic.removeAll();
											addMapCenterGraphic();
										};
										//if the key is an arrow
										if (key === 37){
											popupDiv.innerHTML="<p>you are panning West</p><br/>";						
										} else if (key === 38){					
											popupDiv.innerHTML="<p>you are panning North</p><br/>";
										} else if (key === 39){							
											popupDiv.innerHTML="<p>you are panning East</p><br/>";							
										} else if (key === 40){							
											popupDiv.innerHTML="<p>you are panning South</p><br/>";
										};						
									}

								};

								document.addEventListener('keyup', handleMapSelect);
								
							};

							
						});

						/********* End functions for keyboard click to open popup  *********************/

						function addMapCenterGraphic() {
							let center_latLng = view.center;
							let y = center_latLng.latitude;
							let x = center_latLng.longitude;
							let point = {
								type: "point", 
								x: x,
								y: y
							};

							mapCenterGraphic.add(new Graphic({
								geometry: point,
								symbol: boxSymLg
							}));

						};

					
						   
						function executeIdentifyCTU(tolerance, layerIds) {
							
							let polyLL = [];
							
							// Set the parameters for the identify
							let params = new IdentifyParameters();
							params.tolerance = tolerance;
							params.layerIds = layerIds;
							params.layerOption = "visible";
							params.width = view.width;
							params.height = view.height;
							params.geometry = view.center;
							params.mapExtent = view.extent;
							params.returnGeometry = true;

							// This function returns a promise that resolves to an array of features
							// A custom popupTemplate is set for each feature based on the layer it
							// originates from
							identify
								.identify("https://pca-gis02.pca.state.mn.us/arcgis/rest/services/base/tableau_base/MapServer", params)
								.then(function (response) {
								var results = response.results;
								
								//popupDiv.innerHTML="<h3>you are here</h3><p><i> map zoom level " + view.zoom + ".</i></p></br>";
								let zoomL = view.zoom;
								let scale;
								if(zoomL < 5){
									scale = "world"
								} else if (zoomL >=5 && zoomL < 6){
									scale = "country"
								}else if (zoomL >=6 && zoomL < 8){
									scale = "state"
								}else if (zoomL >=8 && zoomL < 11){
									scale = "county"
								}else if (zoomL >=11 && zoomL < 14){
									scale = "city"
								}else if (zoomL >=14 && zoomL < 17){
									scale = "neighborhood"
								}else if (zoomL >=17 ){
									scale = "building"
								};
								
								popupDiv.innerHTML="<p>This " + JSON.stringify(map.basemap.title) + " map is set to a " + scale + " scale. It contains the following locations. </p></br>";

								return results.map(function (result) {
	 
									let feature = result.feature;					
									let layerName = result.layerName;
									console.log(layerName); 

									if (layerName === "City") {
							
										let name = feature.attributes.FEATURE_NA;
										popupDiv.innerHTML = popupDiv.innerHTML + "<p>" + name + "</p>";
									
									} else if (layerName === "City large") {
							
										let name = feature.attributes.GNIS_NAME;
										let pop =  feature.attributes.TPOP97;
										popupDiv.innerHTML = popupDiv.innerHTML + "<p>" + name + "</p><p>" + name + " has a total population of " + pop + ".</p>";

									} else if (layerName === "County") {
							
										let name = feature.attributes.COUNTYNAME;
										popupDiv.innerHTML = popupDiv.innerHTML + "<p>" + name + " county</p>";
									
									}else if (layerName === "Basin") {
							
										let name = feature.attributes.HU_4_NAME;
										popupDiv.innerHTML = popupDiv.innerHTML + "<p>" + name + " basin</p>";
									
									}else if (layerName === "Major Watershed") {
							
										let name = feature.attributes.WBD_Name;
										popupDiv.innerHTML = popupDiv.innerHTML + "<p>" + name + " watershed</p>";
									
									}else if (layerName === "Lake (1)") {
							
										let name = feature.attributes.RNAME;
										popupDiv.innerHTML = popupDiv.innerHTML + "<p>" + name + " lake</p>";
									
									};

									//return feature;
							
								});
								})				
							};


						/*****************************************************************
						 * UI
						 *****************************************************************/

						view.ui.add(basemapToggle, "bottom-right");
						view.ui.add(scaleBar, {position: "bottom-left"});
						view.ui.add(btnKeyboard, "top-left");

						
						}); 
						} catch (error) {

					};
				};
			};