require([
  "esri/Map",
  "esri/request",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Expand",
  "esri/widgets/Legend",
  "esri/layers/GroupLayer",
  "esri/widgets/BasemapGallery",
  "esri/layers/MapImageLayer",
  "esri/layers/GraphicsLayer",
  "esri/Graphic",
  "esri/tasks/FindTask",
  "esri/tasks/QueryTask",
  "esri/rest/support/Query",
  "esri/rest/support/FindParameters",
  "esri/geometry/Point",
  "esri/geometry/geometryEngine",
  "esri/widgets/Measurement",
  "esri/widgets/Search",			
  "esri/tasks/Locator",
  "esri/widgets/LayerList",
  "esri/symbols/PictureMarkerSymbol"
], function (
  Map,
  esriRequest,
  MapView,
  FeatureLayer,
  Expand,
  Legend,
  GroupLayer,
  BasemapGallery,
  MapImageLayer,
  GraphicsLayer,
  Graphic,
  FindTask,
  QueryTask,
  Query, 
  FindParameters,
  Point,
  geometryEngine,
  Measurement,
  Search,
  Locator,
  LayerList,
  PictureMarkerSymbol) 
	{
		/*****************************************************************
		* Build the map layers and their popup templates
		*****************************************************************/ 

		let layer = new MapImageLayer({
			url: "https://r32dawarcgis01.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer",
			title: "Facilities and Monitoring Locations",
			sublayers: [
				{
					id: 2,
					title: "No Exposure Certified Facilities",
					popupTemplate: {
						title: "No Exposure Certified Facility",
						content: "Facility: {ai_name} <br/> Description: {activity_desc}"
					}
				},
				{
					id: 1,
					title: "Industrial Stormwater General Permit Holders",
					popupTemplate: {
						title: "Industrial Stormwater General Permit Holder",
						content: "Facility: {owner_name} <br /> Description: {activity_desc}"
					}
				},
				{
					id: 0,
					title: "Industrial Stormwater Monitoring Locations",
					popupTemplate: {
						title: "Industrial Stormwater Monitoring Location",
						content: "Facility: {ai_name} <br /> Monitoring Location Description: {description}    <br /> Permit Type: {permit_type}"
					}
				}
			
			]
		});

		let watersLayer = new MapImageLayer({
			url: "https://r32dawarcgis01.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer",
			title: "Special and Impaired Waters",
			sublayers: [
				{
					id: 30,
					title: "Impaired Lakes without additional industrial stormwater requirements",				
					popupTemplate: {
						title: "Impaired Lakes without additional industrial stormwater requirements",
						content: "Name: {NAME} <br />WID: {AUID} <br />Impairments: {IMP_PARA_D}"
					}
				},
				{
					id: 28,
					title: "Impaired Wetlands without additional industrial stormwater requirements",				
					popupTemplate: {
						title: "Impaired Wetlands without additional industrial stormwater requirements",
						content: "Name: {NAME} <br />WID: {AUID} <br />Impairments: {IMP_PARA_D}"
					}
				},
				{
					id: 26,
					title: "Impaired Streams without additional industrial stormwater requirements",
					popupTemplate: {
						title: "Impaired Streams without additional industrial stormwater requirements",
						content: "Name: {NAME} <br />WID: {AUID} <br />Impairments: {IMP_PARA_D}"
					}
				},
				{
					id: 15,
					title: "Wilderness Area"
				},
				{
					id: 7,
					title: "Karst_Features",
					popupTemplate: {
						title: "Karst Features",
						content: "Name: {NAME}"
					}
				},
				{
					id: 39,
					title: "National Wetlands Inventory"
				},
				{
					id: 20,
					title: "Trout Lake",
					popupTemplate: {
						title: "Trout Lake",
						content: "Name: {RNAME}"
					}
				},
				{
					id: 19,
					title: "Trout Stream Tributary",
					popupTemplate: {
						title: "Trout Stream Tributary",
						content: "Name: {LABEL}"
					}
				},
				{
					id: 18,
					title: "Trout Stream",
					popupTemplate: {
						title: "Trout Stream",
						content: "Name: {LABEL}"
					}
				},
				{
					id: 9,
					title: "DNR Listed Calcareous Fen",
					popupTemplate: {
						title: "DNR Listed Calcareous Fen",
						content: "Name: {FENSITENAM}"
					}
				},
				{
					id: 8,
					title: "MPCA Listed Calcareous Fen",
					popupTemplate: {
						title: "MPCA Listed Calcareous Fen",
						content: "Name: {FENSITENAM}"
					}
				},
				{
					id: 17,
					title: "Scenic and Recreational River Segments",
					popupTemplate: {
						title: "Scenic and Recreational River Segments",
						content: "Name: {STRM_NAME}"
					}
				},
				{
					id: 22,
					title: "Trout Lake and Lake Trout Lake",
					popupTemplate: {
						title: "Trout Lake and Lake Trout Lake",
						content: "Name: {RNAME}"
					}
				},
				{
					id: 21,
					title: "Lake Trout Lake",
					popupTemplate: {
						title: "Lake Trout Lake",
						content: "Name: {RNAME}"
					}
				},
				{
					id: 16,
					title: "Mississippi River"
				},
				{
					id: 24,
					title: "Lake Superior ORVW - Prohibited Discharge",
					popupTemplate: {
						title: "Lake Superior ORVW",
						content: "Prohibited Discharge"
					}
				},
				{
					id: 23,
					title: "Lake Superior ORVW - Restricted Discharge",
					popupTemplate: {
						title: "Lake Superior ORVW",
						content: "Restricted Discharge"
					}
				},
				{
					id: 29,
					title: "Impaired Lakes with additional industrial stormwater requirements",				
					popupTemplate: {
						title: "Impaired Lakes with additional industrial stormwater requirements",
						content: "Name: {NAME} <br />WID: {AUID} <br />Impairments: {IMP_PARA_D}"
					}
				},
				{
					id: 27,
					title: "Impaired Wetlands with additional industrial stormwater requirements",
					popupTemplate: {
						title: "Impaired Wetlands with additional industrial stormwater requirements",
						content: "Name: {NAME} <br />WID: {AUID} <br />Impairments: {IMP_PARA_D}"
					}
				},			  {
					id: 25,
					title: "Impaired Streams with additional industrial stormwater requirements",
					popupTemplate: {
						title: "Impaired Streams with additional industrial stormwater requirements",
						content: "Name: {NAME}<br />WID: {AUID} <br />Impairments: {IMP_PARA_D}"
					}
				}
			]
		});

		let boundariesLayer = new MapImageLayer({
			url: "https://r32dawarcgis01.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer",
			title: "Boundaries",
			sublayers: [
				{
					id: 3,
					title: "Public Land Survey",
					visible: false,
					popupTemplate: {
						title: "Public Land Survey",
						content: "PLS: {PLS}"
					}
				},
				{
					id: 4,
					title: "Counties",
					visible: false
				},
				{
					id: 5,
					title: "Watersheds",
					visible: false,
					popupTemplate: {
						title: "Watershed",
						content: "Name: {NAME}"
					}
				},
				{
					id: 6,
					title: "MS4- Municipal Separate Storm Sewer System",
					visible: false
				}

			]
		});

		let mdhLayer = new MapImageLayer({
			url: "https://r32dawarcgis01.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer",
			title: "MDH Drinking Water Supply Data",
			sublayers: [
				{
					id: 10,
					title: "Wellhead Protection Areas"
				},
				{
					id: 11,
					title: "MDH - Emergency Response Areas"
				},
				{
					id: 12,
					title: "MDH - Drinking Water Supply Management Area - very high vulnerability"
				},
				{
					id: 13,
					title: "MDH - Drinking Water Supply Management Area - high vulnerability"
				},
				{
					id: 14,
					title: "MDH - Drinking Water Supply Management Area - medium vulnerability"
				}
			]
		});

		let waterbodiesLayer = new MapImageLayer({
			url: "https://r32dawarcgis01.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer",
			title: "All Waterbodies",
			sublayers: [
				{
					id: 35,
					title: "Lakes"
				},
				{
					id: 31,
					title: "Streams"
				}]
		});

		// graphics layer to hold measurement drawings
		const drawGraphics = new GraphicsLayer({
			id: "drawGraphics",
			listMode: "hide"
		});

		//graphic layer to hold the map center point icon
		const mapCenterGraphic = new GraphicsLayer({
			id: "mapCenterGraphic",
			listMode: "hide"
		});

		//cross hair symbol used for monitoring locations in search results
		let crossSym = {
			type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
			color: [0, 255, 224],
			style: 'cross',
			outline: {
				color: [0, 255, 224],
				width: 2
			},
			size: 10
		};
/*
		let crossSymLg = {
			type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
			color: [0, 255, 224],
			style: 'cross',
			outline: {
				color: [0, 0, 0],
				width: 4
			},
			size: 30
		};
*/
		let crossSymLg = {
			type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
			url: "img/crosshair.png",
			width: "55px",
			height: "55px"
		  };

		// circle symbol for highlighted facilities
		let pointSym = {
			type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
			color: [0, 255, 224],
			outline: {
				color: [0, 255, 224],
				width: 2
			},
			size: 10
		};
		// symbolization for 1 mile buffer circles
		let polySym = {
			type: "simple-fill", // autocasts as new SimpleFillSymbol()
			color: [140, 140, 140, 0.1],
			outline: {
				color: [0, 255, 224, 0.7],
				width: 2
			}
		};
		  
		// create empty FeatureLayer for holding monitoring locations search results
		const searchResLayer = new FeatureLayer({
			title: "Selected Industrial Stormwater Monitoring Locations",
			popupTemplate: {
				title: "Industrial Stormwater Monitoring Location",
				content: "Facility: {ai_name} <br /> Monitoring Location Description: {description} <br />Permit Type: Industrial Stormwater Permit"
			},
			listMode: "hide",
			fields: [
				{
					name: "objectid",
					alias: "objectid",
					type: "oid"
				},
				{
					name: "item_id",
					alias: "item_id",
					type: "string"
				},
				{
					name: "ai_name",
					alias: "ai_name",
					type: "string"
				},
				{
					name: "description",
					alias: "description",
					type: "string"
				}
			],
			objectIdField: "objectid",
			geometryType: "point",
			spatialReference: { wkid: 4326 },
			source: [], // adding an empty feature collection
			renderer: {
				type: "simple",
				symbol: crossSym
			}
		});

		// create empty FeatureLayer for holding facility search results
		const searchFacilityLayer = new FeatureLayer({
			title: "Selected Facility",
			listMode: "hide",
			popupTemplate: {
				title: "Industrial Stormwater General Permit Holder",
				content: "Facility: {owner_name} <br /> Description: {activity_desc}"
			},
			fields: [
				{
					name: "objectid",
					alias: "objectid",
					type: "oid"
				},
				{
					name: "ai_name",
					alias: "ai_name",
					type: "string"
				},
				{
					name: "owner_name",
					alias: "owner_name",
					type: "string"
				},
				{
					name: "activity_desc",
					alias: "activity_desc",
					type: "string"
				}
			],
			objectIdField: "objectid",
			geometryType: "point",
			spatialReference: { wkid: 4326 },
			source: [], // adding an empty feature collection
			renderer: {
				type: "simple",
				symbol: pointSym
			}
		});

	  	//create an empty feature layer for holding buffers of monitoring locations
		const searchResBuffer = new FeatureLayer({
			// create an instance of esri/layers/support/Field for each field object
			title: "1 Mile Circle",
			fields: [
				{
					name: "objectid",
					alias: "objectid",
					type: "oid"
				},
				{
					name: "item_id",
					alias: "item_id",
					type: "string"
				},
				{
					name: "ai_name",
					alias: "ai_name",
					type: "string"
				},
				{
					name: "description",
					alias: "description",
					type: "string"
				}
			],
			objectIdField: "objectid",
			geometryType: "polygon",
			spatialReference: { wkid: 4326 },
			source: [], // adding an empty feature collection
			renderer: {
				type: "simple",
				symbol: polySym
			}
		});

		const searchResultsGroupLayer = new GroupLayer({
			title: "Facility Search Results",
			visible: true,
			legendEnabled: false,
			layers: [searchResLayer,searchFacilityLayer, searchResBuffer]
		  });

		/*****************************************************************
		* Build the map and view
		*****************************************************************/ 

		let map = new Map({
			basemap: "hybrid",
			layers: [waterbodiesLayer,boundariesLayer,mdhLayer,watersLayer,layer,searchResultsGroupLayer,drawGraphics,mapCenterGraphic] 
		});

		let view = new MapView({
			container: "viewDiv",
			map: map,
			center: [-94.25,45.98],
			zoom: 7,
			popup: {
				dockEnabled: false,
				dockOptions: {
					position: "top-right",
					breakpoint: false
				}
			}
		});

		/*****************************************************************
		* Map functions
		*****************************************************************/ 
		// container to display search results
		const fContainer =document.getElementById("searchRes");
    	const loadingImg = document.getElementById("loading");
		const resultsSection = document.getElementById("resultsSection");
		resultsSection.style.display = "none";

		//event listeners
		// Run print function when Download PDF report button is clicked
		document.getElementById("print-button").addEventListener("click", print);
		

		var reportArray =[];
		var filteredReportArray =[];
		var moniGraphics = [];
		
        //zoom to extent of search results
		function zoomToLayer(layer) {
			layer
			.when(() => {
			return layer.queryExtent();
			})
			.then((response) => {
			view.goTo(response.extent);
			});
		}

		function print() {
			createPDF(filteredReportArray,view);
		}

		//create a graphic to add to search results layer
		function createMoniGraphic(point,itemId,facility,moniDesc){
			let graphic;
			graphic = new Graphic({
				geometry: point,
				attributes: {'item_id': itemId, 'ai_name': facility, 'description': moniDesc}
			});
			moniGraphics.push(graphic);
		}

		/*****************************************************************
		* Search for facilities and monitoring locations by permit ID
		*****************************************************************/ 
		// Create a FindTask 
		let find = new FindTask({
		url:
			"https://r32dawarcgis01.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer"
		});

		// Run doFind() when search button is clicked
		document.getElementById("findBtn").addEventListener("click", doFind);

		// Set parameters to query the monitoring locations (layerID: 0) and facility permits (layerID:1) layers by PERMIT_ID
		let params = new FindParameters({
			layerIds: [0,1],
			searchFields: ["permit_id"]
		});
	
		// Executes on each button click
		function doFind() {
			loadingImg.style.visibility = "visible";
			// Set the search text to the value of the input box
			params.searchText = document.getElementById("inputTxt").value;
			// clear out old search results:
			reportArray =[];
			clearSearchRes();
			// The execute() performs a LIKE SQL query based on the provided text value
			// showResults() is called once the promise returned here resolves
			find.execute(params).then(showResults).catch(rejectedPromise);
		}

		/*****************************************************************
		* left hand UI
		*****************************************************************/ 

        //Add the basemap gallery
        let basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div")
        });

        // Create an Expand instance and set the content property to the DOM node of the basemap gallery widget
        let bgExpand = new Expand({
            view: view,
            content: basemapGallery,
			expandTooltip: "Switch Basemap",
			collapseTooltip: "Close Basemap Options"
        });

        // Add the expand instance to the ui
      //  view.ui.add(bgExpand, "top-left");
        //end basemap gallery

		/************  set up the measurement widget  ***************/
		/*
		const measurement = new Measurement({
			view: view,
			linearUnit: 'imperial',
			areaUnit: 'acres'
		});
				
		// event handlers for buttons and click events
		const distanceButton = document.getElementById("distance");
		const areaButton = document.getElementById("area");
		const clearButton = document.getElementById("clear");

		distanceButton.addEventListener("click", function () {
			distanceMeasurement();
		});
		areaButton.addEventListener("click", function () {
			areaMeasurement();
		});
		clearButton.addEventListener("click", function () {
			clearMeasurements();
		});	

		// measure distance
		function distanceMeasurement() {
			measurement.activeTool = "distance"
			distanceButton.classList.add("active");
			areaButton.classList.remove("active");
			drawGraphics.graphics.removeAll();
		};
		// measure area
		function areaMeasurement() {
			measurement.activeTool = "area";
			distanceButton.classList.remove("active");
			areaButton.classList.add("active");
			drawGraphics.graphics.removeAll();
		};
		// clear all measurements
		function clearMeasurements() {
			distanceButton.classList.remove("active");
			areaButton.classList.remove("active");
			drawGraphics.graphics.removeAll();
			measurement.clear();
		};
		*/
	//	view.ui.add(["distance", "area", "clear"], 'top-left');
		/*************  end measurement widget  ***************/

		//Set up Location Search UI and functions
		//set up container for displaying location search instructions to the user

		const btnSetLocation = document.getElementById("btnLocation");
		//add an event listener to the Set Location button
		btnSetLocation.addEventListener("click", function () {
			//check to see if the location button is already active. If it is, turn it off
			if (btnSetLocation.classList.contains("active")){
				btnSetLocation.classList.remove("active");
				mapCenterGraphic.removeAll();
				document.body.style.cursor = 'initial';
			} else {
				btnSetLocation.classList.add("active");
				document.body.style.cursor = 'crosshair';
				//accessibility set focus on the map application to enable keyboard navigation
				view.focus();

				addMapCenterGraphic();

				aria.handleMapSelect = function (event) {
					let center_latLng = view.center;
					let y = center_latLng.latitude;
					let x = center_latLng.longitude;

					var key = event.which || event.keyCode;
					if (key === 83 ) {
					  locationSearch(y, x);
					  event.stopPropagation();
					} else {
						if( key=== 37||key=== 38 || key=== 39 ||key=== 40) {
							//move graphic to the new center point
							mapCenterGraphic.removeAll();
							addMapCenterGraphic();
						}
					}
				  };
				
				  document.addEventListener('keyup', aria.handleMapSelect);
				view.on("click", function (event) {	
					if (btnSetLocation.classList.contains("active")) {
						locationSearch(event.mapPoint.latitude,event.mapPoint.longitude);
					};
				});
			}
		});

		function addMapCenterGraphic() {
				// display a crosshair in the middle of the map
				let center_latLng = view.center;
				let y = center_latLng.latitude;
				let x = center_latLng.longitude;
				let point = {
					type: "point", // autocasts as new Point()
					x: x,
					y: y
				};
				mapCenterGraphic.add(new Graphic({
					geometry: point,
					symbol: crossSymLg
				}));
		}

		function  locationSearch(latitude, longitude) {		
			// Get the point from the view's click event
					// clear out old search results
					clearSearchRes();  
					reportArray =[];
					moniGraphics = [];	

					let clickPoint = {
						type: "point", 
						longitude: longitude,
						latitude: latitude
					};
					const pointID = Math.floor(Math.random() * 1001);
					let moniDesc ='User Specified Location (' + latitude.toFixed(6) + ", " + longitude.toFixed(6) + ")";
					createMoniGraphic(clickPoint,pointID,'User added Point',moniDesc); //add graphic for click loc

					// addEdits object tells applyEdits that you want to add the features
					const addEdits = {
						addFeatures: moniGraphics
					};
					
					// apply the edits to the layer
					applyEditsToLayer(addEdits,searchResLayer);
					
					createChk(pointID,moniDesc); //create checkbox on search results page
					//add a 1 mi buffer to clicked location
					let buffer = bufferPoint(latitude,longitude,pointID);
					//query all of the impaired waters layers for features within the 1 mi buffer
					queryImpairedWaterLayers(buffer,moniDesc,pointID)
					.then (result => createReportEntry(result,moniDesc,pointID,''))
					.catch(failureCallback);

					updateMoniLocFilter();
         			showSearchResContainer();
					//reset the set location tool
					btnSetLocation.classList.remove("active");
					document.body.style.cursor = 'initial';
			//measurement related. Uncomment when we add tool back in
			//distanceButton.classList.remove("active");
			//areaButton.classList.remove("active");	
			document.removeEventListener('keyup', aria.handleMapSelect);
			mapCenterGraphic.removeAll();				
		};

		/*
		// search for features within 1 mi of user click location
		function  locationSearch(latitute, longitude) {		
			// Get the point from the view's click event
			view.on("click", function (event) {	
		
				if (btnSetLocation.classList.contains("active")) {
					// clear out old search results
					clearSearchRes();  
					reportArray =[];
					moniGraphics = [];	

					let clickPoint = {
						type: "point", 
						longitude: event.mapPoint.longitude,
						latitude: event.mapPoint.latitude
					};
					const pointID = Math.floor(Math.random() * 1001);
					let moniDesc ='User Specified Location (' + event.mapPoint.latitude.toFixed(6) + ", " + event.mapPoint.longitude.toFixed(6) + ")";
					createMoniGraphic(clickPoint,pointID,'User added Point',moniDesc); //add graphic for click loc

					// addEdits object tells applyEdits that you want to add the features
					const addEdits = {
						addFeatures: moniGraphics
					};
					
					// apply the edits to the layer
					applyEditsToLayer(addEdits,searchResLayer);
					
					createChk(pointID,moniDesc); //create checkbox on search results page
					//add a 1 mi buffer to clicked location
					let buffer = bufferPoint(event.mapPoint.latitude,event.mapPoint.longitude,pointID);
					//query all of the impaired waters layers for features within the 1 mi buffer
					queryImpairedWaterLayers(buffer,moniDesc,pointID)
					.then (result => createReportEntry(result,moniDesc,pointID,''))
					.catch(failureCallback);

					updateMoniLocFilter();
         			showSearchResContainer();
					//reset the set location tool
					btnSetLocation.classList.remove("active");
					document.body.style.cursor = 'initial';
				};
			});
			distanceButton.classList.remove("active");
			areaButton.classList.remove("active");					
		};
		*/
		/*********  end Location Search UI and functions **************/		

		/*****************************************************************
		* Layerlist and legend 
		*****************************************************************/ 
		let theURL = "https://r32dawarcgis01.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/legend";
		esriRequest(theURL, {
			query: {
				f: 'json'
			},
			responseType: "json"
		}).then(function (response) {
				layerList = new LayerList({
				view: view,
				listItemCreatedFunction: function (event) {
					const item = event.item;
					if (item.title === 'ISW') {
						item.title = "Legend";
					} 
					if (item.title != "Legend") {
						let aDiv = document.createElement("Div");
						let layerNumber = -1;     
						for (let i = 0; i < response.data.layers.length; i++) {
							if(response.data.layers[i].layerId === item.layer.id) { 
								layerNumber = i;
							}
						}
						if(layerNumber != -1){
							for (let j = 0; j < response.data.layers[layerNumber].legend.length; j++) {   
								let para = document.createElement("P");
								para.style.margin = "2px";
								para.style.verticalAlign = "middle";     
										
								let img = document.createElement("img");
								img.style.height = "20px";
								img.style.verticalAlign = "bottom";
								img.src = item.layer.url + "/images/" + response.data.layers[layerNumber].legend[j].url;
								//accessibility - set image alt to null because with label adjacent, this creates redundant alt text
								img.alt = null;
								theLabel = response.data.layers[layerNumber].legend[j].label;
								let t =  document.createTextNode(theLabel);
								para.appendChild(img);
								para.appendChild(t);                                         
								aDiv.appendChild(para);
							} 
						
							item.panel = {
								className: "esri-icon-drag-horizontal",
								content: aDiv,
								open: true,
								visible: true
							}
						}

					} else { // added this so users can turn off group layers by clicking on the name
						item.layer.watch("visible", function (){
							item.layer.visible = true; 
						});     
					} 
			
				} // listItem

			}); // new layerlist
			//view.ui.add(layerList, "bottom-left"); 

			let layerExpand = new Expand({
				view: view,
				content: layerList,
				open: true,
				declaredClass: "layersToggle",
				expandTooltip: "Toggle Map Layers",
				collapseTooltip: "Close Map Layers List"
			});
	
			// Add the expand instance to the ui
			//view.ui.add([layerExpand, bgExpand, "distance", "area", "clear"], 'top-left');
			view.ui.add([layerExpand, bgExpand], 'top-left');

			const legend = new Legend({
				view: view
			  });
			  // Add widget to the bottom right corner of the view
			  
			  let legendExpand = new Expand({
				view: view,
				content: legend,
				expandTooltip: "Open Legend",
				collapseTooltip: "Close Legend",
				expanded: true
				});
			    view.ui.add(legendExpand, "bottom-right");

		}); 
		/****************** end layerlist and legend  ***************************/


		/*****************************************************************
		* right hand UI
		*****************************************************************/
			
		//searchView UI
		const search = new Search({
			view: view,
			allPlaceholder: "Find address or place", 
			includeDefaultSources: false,
			suggestionsEnabled: true,
			popupEnabled: true,
			searchAllEnabled: true,
			sources: [
			{
				layer: new FeatureLayer({
					url: "https://r32dawarcgis01.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/0",
					//url: "https://r32dawarcgis01.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/0",
					outFields: ["*"]
				}),
				searchFields: ["PERMIT_ID"],
				displayField: "PERMIT_ID", //"master_ai_name", // I can only put one field here.
				exactMatch: false,
				outFields: ["*"],
				name: "Industrial Stormwater ID",
				placeholder:  "5151",
				maxResults: 40,
				maxSuggestions: 6,
				suggestionsEnabled: true,
				minSuggestCharacters: 3,
			},

			// add extent limit to the geocoder?
			{
				locator: new Locator({ url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
				singleLineFieldName: "SingleLine",
				name: "address search",
				placeholder: "520 Lafayette Rd N, 55155",
				maxResults: 6,
				maxSuggestions: 6,
				suggestionsEnabled: false,
				minSuggestCharacters: 3,
				resultSymbol: { 
					type: "simple-marker",
					size: 10,
					color: "#FE8080"
				}
			}
			]
		});

		view.ui.add(search, "top-right");

		// Measurement (cont.)
		// Add the measurement UI to the top-right when the distance or area tool are activated
		//view.ui.add(measurement, "bottom-left");	

		function applyEditsToLayer(edits,layer) {
			layer
			.applyEdits(edits)
			.then((results) => {
				// if edits were removed
				if (results.deleteFeatureResults.length > 0){
					//console.log(results.deleteFeatureResults.length,"features have been removed");
				}

				//    if features were added - call queryFeatures to return newly added graphics
				if (results.addFeatureResults.length > 0){
					var objectIds = [];
					results.addFeatureResults.forEach((item) => {
						objectIds.push(item.objectId);
					});
					// query the newly added features from the layer
					layer.queryFeatures({
						objectIds: objectIds
					})
					.then((results) => {
						zoomToLayer(searchResBuffer);
						searchResultsGroupLayer.legendEnabled = true;
					})
				}
			})
			.catch((error) => {
				console.error();
			});
		}

		function removeFeatures(layer) {
			// query for the features you want to remove
			layer.queryFeatures().then(function (results) {
				if (results.features.length >=1 ){
					// edits object tells apply edits that you want to delete the features
					const deleteEdits = {
						deleteFeatures: results.features
					};
					// apply edits to the layer
					applyEditsToLayer(deleteEdits,layer);
				}
			});
		}

		function setFeatureLayerViewFilter(expression) {
			view.whenLayerView(searchResLayer).then(function (featureLayerView) {
				featureLayerView.filter = {
					where: expression
				};
			});
			view.whenLayerView(searchResBuffer).then(function (featureLayerView) {
				featureLayerView.filter = {
					where: expression
				};
			});
		}

		function clearSearchRes() {
			let element = document.getElementById("searchRes");
			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
			// clear out prior features from search results graphics layers:
			removeFeatures(searchResBuffer);
			removeFeatures(searchResLayer);
			removeFeatures(searchFacilityLayer);
		}

		// Executes when the promise from find.execute() resolves
		function showResults(response) {
			/* shows results from doFind(), which searches the facility and monitoring locations layers by permit ID.
			We will get back results from both layers. */
			let results = response.results;
			// If no results are returned from the task, notify the user
			if (results.length === 0) {
				fContainer.innerHTML = "<p>No results found. Please check the permit number and try again.</p>";
        		showSearchResContainer();
				return;
			}

			/* create arrays to hold moni loc and facility point graphics, so that  
			we can highlight search results on the map.*/
			moniGraphics = [];
			let facilities = [];
			let permitID =response.results[0].value;
			/* Loop through the results, add highlight graphics and buffers, then trigger queries  
			to the special and impaired waters layers */
			results.forEach(function (findResult, i) {
				let lat = findResult.feature.attributes["latitude"];
				let lon = findResult.feature.attributes["longitude"];
				let facility = findResult.feature.attributes["ai_name"];
				if (findResult.layerId===1) { // facility layer
						// Get values of desired attributes
						let owner = findResult.feature.attributes["owner_name"];
						let description = findResult.feature.attributes["activity_desc"];

						//create point graphic for the facility
						let graphic = new Graphic({
							geometry: {
								type: "point",
								latitude: lat,
								longitude: lon
							},
							attributes: {'ai_name': facility,'owner_name':owner,'activity_desc':description}
						});
						facilities.push(graphic);
				} else { // monitoring locations layer
					// Get values of desired attributes
					let itemId = findResult.feature.attributes["item_id"];
					let moniDesc = findResult.feature.attributes["description"];
					//create a checkbox for the location to toggle it on the map
					createChk(itemId,moniDesc);
					//buffer the moni locs. 
					let buffer = bufferPoint (lat,lon,itemId);
					//query all of the impaired waters layers for features within the 1 mi buffer
					queryImpairedWaterLayers(buffer,moniDesc,itemId)
						.then (result => createReportEntry(result,moniDesc,itemId,permitID))
						.catch(failureCallback);
				
					//create a point graphic for each monitoring location
					let moniPoint = {
						type: "point", 
						latitude: lat,
						longitude: lon,
					};
					createMoniGraphic(moniPoint,itemId,facility,moniDesc);
				}
			});

			// add the facility point graphics to the feature layer. 
			const addFacilityEdits = {
				addFeatures: facilities
			};
			applyEditsToLayer(addFacilityEdits,searchFacilityLayer);

			// add the moni loc point graphics to the feature layer. 
			const addEdits = {
				addFeatures: moniGraphics
			};
			updateMoniLocFilter();

			// apply the edits to the layer
			applyEditsToLayer(addEdits,searchResLayer);
			
      		showSearchResContainer();
		}

		function createReportEntry(tablesArray,moniDesc,itemId,permitID) {
			let moniRpt = {};
			moniRpt.desc = moniDesc;
			moniRpt.permitID = permitID;
			moniRpt.itemId = itemId;
			moniRpt.tables = tablesArray;
			reportArray.push(moniRpt);
			filteredReportArray = reportArray;
		}
		function failureCallback() {
			console.log ("query impaired waters failed");
		}

		function  showSearchResContainer() {
			fContainer.classList.remove("hide");
			loadingImg.style.visibility = "hidden";
			resultsSection.style.display = "block";
			resultsSection.focus();
		}

		function updateMoniLocFilter() {
			let arrayItems =[];
			let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked')
			if(checkboxes.length==0) {
				var filterSQL="item_id =''";
			} else {
				var filterSQL="item_id ='";
				for (let i = 0; i < checkboxes.length; i++) {
					arrayItems.push(checkboxes[i].value);
					if (i==0){ filterSQL+= checkboxes[i].value + "'";}
					else { filterSQL+= " OR item_id ='" + checkboxes[i].value + "'";}
				}
			}
			setFeatureLayerViewFilter(filterSQL);
			//filter the report array to include only visible monitoring locations
			filteredReportArray = reportArray.filter(function (e) {
				return arrayItems.includes(e.itemId);
			});
		}

		function createChk(itemId,loc) {
			// Create a break line element
			let br = document.createElement("br"); 
			let chk = document.createElement('input');  // CREATE CHECK BOX.
			chk.setAttribute('type', 'checkbox');       // SPECIFY THE TYPE OF ELEMENT.
			chk.setAttribute('id', itemId);     // SET UNIQUE ID.
			chk.setAttribute('value', itemId);
			chk.setAttribute('name', loc);
			chk.setAttribute('checked', true);
			chk.setAttribute('class', 'cbxMoniLoc');
			//accessibility
			//chk.setAttribute('tabIndex', '-1');
			chk.setAttribute('aria-live','polite');
			let lbl = document.createElement('label');  // CREATE LABEL.
			lbl.setAttribute('for', itemId);

			// CREATE A TEXT NODE AND APPEND IT TO THE LABEL.
			lbl.appendChild(document.createTextNode(loc));

			// APPEND THE NEWLY CREATED CHECKBOX AND LABEL TO THE <p> ELEMENT.
			fContainer.appendChild(chk);
			fContainer.appendChild(lbl);
			//append a div to contain the impaired water results
			let resultsDiv = document.createElement('div'); 
			let resID = "res" + itemId;
			resultsDiv.setAttribute('id', resID); 
			resultsDiv.setAttribute('class', 'waterResults');
			resultsDiv.setAttribute('tabIndex',"-1");
			fContainer.appendChild(resultsDiv); 
			// Inserting a line break
			fContainer.appendChild(br.cloneNode()); 

			chk.addEventListener("click", function () {
				updateMoniLocFilter();
				//toggle div
				//get the id of the clicked checkbox, then build the resID
				let resID = "res" + this.value;
				let resultsDiv = document.getElementById(resID);
				if (resultsDiv.style.display === "none") {resultsDiv.style.display = "block";resultsDiv.style.height='auto';}else{resultsDiv.style.display = "none";resultsDiv.style.height=0;}
			});
		}

		// Executes each time the promise from find.execute() is rejected.
		function rejectedPromise(error) {
		console.error("Promise didn't resolve: ", error.message);
		}

		function bufferPoint (lat,lon,itemId){
			//create the point to buffer
			let pointObj = new Point({
				latitude : lat,
				longitude : lon,
				spatialReference : map.spatialReference
			})

			//add a buffer to the point
			let buffer = geometryEngine.geodesicBuffer(pointObj, 1, "miles");
			let bufferGraphics=[];
			let bufferGraphic;

			//add a buffer graphic to the searchResBuffer layer
			bufferGraphic = new Graphic({
				geometry: buffer,
				attributes: {'item_id': itemId}
			});
				bufferGraphics.push(bufferGraphic);

			const addBuffer = {
				addFeatures: bufferGraphics
			};
			//apply new buffer edits to the layer
			applyEditsToLayer(addBuffer,searchResBuffer);
			return buffer;
		}

		async function queryImpairedWaterLayers (buffer,moniDesc,itemId){
			let tablesArray =[];
			const promises =[];
			let layers = JSON.parse(querylayers);
			layers.forEach(function(layer) {
				promises.push(
					getFeaturesInBuffer(buffer,layer).then(results => buildResultsView(results,layer,moniDesc,itemId))
				);
			});

			await Promise.all(promises).then(responses => responses.forEach(response => { 
				if (JSON.stringify(response)!='{}'){
					tablesArray.push(response);                               
				}
			}));

			return tablesArray;
		}

		function buildResultsView(results,layer,moniDesc,itemId) {
			let desiredFields = layer.desiredFields;
			let desiredFieldsFriendlyNames = layer.desiredFieldsFriendlyNames;
			let layerName = layer.name;
			let customRptTxt = layer.customRptTxt;
			let customRptTxt2 = layer.customRptTxt2;
			let sortID = layer.sortID;
			let bmp = layer.BMP;
			let showTable = layer.showTable;
			let reportElement={};

			if (results.features.length>0) {
				//combine report text from config file with attributes from results
				let accGrpID = 'accordionGroup' + itemId+sortID;
				let accGroup = document.createElement('div');
				accGroup.setAttribute('id',accGrpID);
				accGroup.setAttribute('class','accordion');
				// Accessibility feature:
				accGroup.setAttribute('aria-live','polite');
				let btnAccordion = document.createElement('button');
				btnAccordion.setAttribute('class','accordion__button');
				let btnID = "accordion-open_" + itemId+sortID;
				btnAccordion.setAttribute('id',btnID);
				btnAccordion.setAttribute('aria-expanded', false);
				btnAccordion.innerHTML = customRptTxt;
				const number = itemId + "_" + sortID;

				//get the ID of the search results div and append the accordion
				let resID = "res" + itemId;
				let resDiv = document.getElementById(resID);
				resDiv.appendChild(accGroup);
				accGroup.appendChild(btnAccordion); 
				let contentAccordion = document.createElement('div');
				contentAccordion.setAttribute('class','accordion__section open');
				let accID = "accordion-section_" + itemId+"_" + sortID;	
				contentAccordion.setAttribute('id',accID)
				contentAccordion.setAttribute('aria-hidden', true);
				contentAccordion.classList.remove('open')
				let resultTable;
				if (showTable==true) {
					resultTable='<div role="region" aria-labelledby="table1Caption" tabindex="0"><table class="tblResults"><caption id="table1Caption">Search Results</caption>';
					//get the attributes for the table column
					resultTable += buildTableHeader(desiredFieldsFriendlyNames);
					resultTable +="<tbody>"
					let rowArray =[];
					let resultsArr;
					//if wetlands, filter out the duplicate wetland types
					if (desiredFields.includes("CIRC39")) {
						const seen = new Set();
						uniqueArr = results.features.filter(el => {
							const duplicate = seen.has(el.attributes.CIRC39);
							seen.add(el.attributes.CIRC39);
							return !duplicate;
						});
						//now filter out codes 80 and 90
						resultsArr = uniqueArr.filter(el => {
							return el.attributes.CIRC39<80;
						});
						//change feature.attributes from wetland type code to string
						resultsArr.forEach(function(wetland) {
							wetland.attributes.CIRC39 = getWetlandType(wetland.attributes.CIRC39);
						});
						// if karsts, filter out duplicate karst types
					} else if (layerName=='Karst Features') {
						const seen = new Set();
						uniqueArr = results.features.filter(el => {
							const duplicate = seen.has(el.attributes.NAME);
							seen.add(el.attributes.NAME);
							return !duplicate;
						});
						resultsArr = uniqueArr;
					} else {
						resultsArr = results.features;
					}
					resultsArr.forEach(function(feature,index) {
					resultTable +="<tr>"
					//add a row to the object for the report also
					let attributes = feature.attributes;
					rowArray.push(attributes);
					
					for (let key in attributes) {
						//check to see if WIDs are in the list of desired fields. If yes, combine into the name column.
						if(desiredFieldsFriendlyNames.includes("WID")==true && key==desiredFields[0]) {
							resultTable += "<td>" + attributes[desiredFields[0]] + ", WID " + attributes[desiredFields[1]] +"</td>";
						} else if(desiredFieldsFriendlyNames.includes("WID")==true && key==desiredFields[1])  {
							//do not add it
						} else {
								resultTable += "<td>" + attributes[key] +"</td>";
						}
						
					}
					resultTable +="</tr>"
					
					});
					reportElement.rows = rowArray;
					resultTable +="</tbody></table></div>"
				} else {
					resultTable ="";
					reportElement.rows = [];
				}
				
				resultTable +='<div class="reqts">' + customRptTxt2 +  '</div>';
				
				contentAccordion.innerHTML =resultTable;
				accGroup.appendChild(contentAccordion);	
				const associatedSection = document.getElementById(`accordion-section_${number}`)
			
				btnAccordion.addEventListener('click', () => {
					btnAccordion.classList.toggle('expanded');
					associatedSection.classList.toggle('open');
					if (btnAccordion.classList.contains('expanded')) {
						btnAccordion.setAttribute('aria-expanded', true);
						associatedSection.setAttribute('aria-hidden', false);
						associatedSection.focus();
					} else {
						btnAccordion.setAttribute('aria-expanded', false);
						associatedSection.setAttribute('aria-hidden', true);
					}
				})
				reportElement.caption = customRptTxt;
				reportElement.header = desiredFieldsFriendlyNames;
				reportElement.closingTxt = customRptTxt2;
				reportElement.sortNum = sortID;
				reportElement.moniDesc = moniDesc;
				reportElement.itemId = itemId;
				reportElement.bmp = bmp;
			}
				
			return reportElement;	  
		}
	

		function getWetlandType(code) {
			let type;
			switch (code) {
				case 1:
				type = "Seasonally Flooded Basin or Flat";
				break;
				case 2:
				type = "Wet Meadow";
				break;
				case 3:
				type = "Shallow Marsh";
				break;
				case 4:
				type = "Deep Marsh";
				break;
				case 5:
				type = "Shallow Open Water";
				break;
				case 6:
				type = "Shrub Swamp";
				break;
				case 7:
				type = "Wooded Swamp";
				break;
				case 8:
				type = "Bogs";
				break;
				default:
				type = "other";
				break;
				}
			return type;
		}

		async function getFeaturesInBuffer (buffer,layer){
			let queryTask = new QueryTask({
			url: layer.url
			});
			let query = new Query();
			query.returnGeometry = true;
			query.outFields = layer.desiredFields;
			query.geometry = buffer;
			query.spatialRelationship = "intersects";
	
			// When resolved, returns features and graphics that satisfy the query.
			let response = await queryTask.execute(query);
			return response;  
		}
	  
		function buildTableHeader(desiredFields) {
			let header = "<thead><tr>"
			desiredFields.forEach(function(field) {
				//We want to combine with Name and WID into one column, so don't add a header for WID. 
				if (field !='WID') {
					header +="<th scope='col'>" + field + "</th>"
				}	
			});
			header += "</tr></thead>";
			return header;
		}
	}); //End ArcGIS Javascript function

/*****************************************************************
* Generate PDF Report 
*****************************************************************/ 

	//Get PDFLib modules needed
	const { PDFDocument, StandardFonts, layoutMultilineText,rgb } = PDFLib
	
	//create the PDF report
	async function createPDF(reportArr,view) {

		let pdfDoc = await PDFDocument.create()
		let fontType = await pdfDoc.embedFont(StandardFonts.Helvetica)
		let fontSize = 10;
		let page;
		//get the permitID from the report array
		let permitID = reportArr[0].permitID;
		 
		//embed the logo and legend into the document
		let pngLogo = await embedImage('img/MPCA-Logo.png');

		createPage();
		// Get the width and height of the page
		const { width, height } = page.getSize()

		//First, add the map and legend
		// Take a high resolution, square screenshot of the web map			
		let options = {
			width: 1024,
			height: 1024,
			format: "png",
			quality: 100
		};

		view.takeScreenshot(options).then(async function(screenshot) {
			const mapImage = await pdfDoc.embedPng(screenshot.dataUrl)
			page.drawImage(mapImage, {
				x: 40,
				y: 240,
				width: 512,
				height: 512,
			})
		});
		let pngLegend = await embedImage('img/ISW_legend.png');
		// Get the width/height of the PNG image scaled down to 65% of its original size
		let dims = pngLegend.scale(0.42);
		// Draw the legend image at the bottom of the page
		page.drawImage(pngLegend, {
			x: 40,
			y: 45,
			width: dims.width,
			height: dims.height,
		})

		// set Y to end of page because map/legend have been added. 
		// checkEndOfPage will add a new page if there are search results in reportArr. 
		let yPosition = 40; // 735 top of page, y 0 is bottom of page 
		// the next block adds any required BMPs numbers to this array
		let bmps =[];
		//loop through each monitoring station in results
		reportArr.forEach(function(moniRpt){
			//if the new moni loc is close to the end of the page, force layer heading to new page. Using a threshold of 120 works for better page breaks. 
			yPosition = checkEndOfPage(yPosition,120);
			yPosition = yPosition - 5;

			//add a heading for the monitoring location to the pdf
			let moni= "Monitoring Location Description: " + moniRpt.desc;
			//rectangle background
			page.drawRectangle({ 
				x: 40,
				y: yPosition-6,
				height: 20,
				width: 512,
				color: rgb(0.9, 0.9, .9)
			})

			//add monitoring location name on top of rectangle
			page.drawText(moni, {
				x: 45,
				y: yPosition,
				size: 11,
				color: rgb(0,0,0)
			})
			yPosition = checkEndOfPage(yPosition-30,50);

			let tables = moniRpt.tables;

			//for each special/impaired water layer in the results, add a section to the report
			tables.forEach(function(layer){
				let bmp = layer.bmp;
				//create a list of bmps that are needed to add to the end of the report
				if (bmp.length >0){
				bmp.forEach( function(bmp) {
					//add bmps that are not already in the array
					if (bmps.includes(bmp)==false) {
						bmps.push(bmp);
					}
					});
				}
				//draw the caption
				let caption = layer.caption;
				//if the new layer table is close to the end of the page, use new page threshold of 120 instead, to force table to new page
				yPosition = checkEndOfPage(yPosition,120);

				page.drawText(caption, {
					x: 40,
					y: yPosition,
					color: rgb(0, 0.22, .4),
					size: 11
				})
				yPosition = checkEndOfPage(yPosition -= 15,50);

				//get length of the header array so we know how many columns we want
				let header = layer.header;
				let columns = header.length;
				let colWidth =(width-50)/columns;
				let rows = layer.rows;
				if (rows.length>0) {
					yPosition =  addTableHeader(header,yPosition,colWidth,height);
					//create an array of column heights so that we can calc the max height of the row 
					var colHeights=[]; 
					rows.forEach(function(row){
						let origYPosition = yPosition;
						let xPosition = 40;
						Object.values(row).forEach(function(col,index){
							const multiText = layoutMultilineText(col.toString(), {
								alignment: 'left', 
								font: fontType,
								fontSize: fontSize, 
								bounds: { width: colWidth - 40, height: 100 }
			
								})
								if (index !=0){
									xPosition+=colWidth;
								}
								let multiTextHeight=0;
								for(let i = 0; i < multiText.lines.length; i++) {
									if (i==0){yPosition=origYPosition;}
										page.drawText(`${multiText.lines[i].text}`,
										{ 
											x: xPosition,
											y: yPosition,
											size: fontSize,
											font: fontType
										}
										);
										yPosition = checkEndOfPage(yPosition -= multiText.lineHeight,50);
										multiTextHeight += multiText.lineHeight;
								}; // end for loop
								colHeights.push(multiTextHeight);
						});
						if (yPosition==735) {
							yPosition = checkEndOfPage(yPosition = yPosition-Math.max(...colHeights)-6,50);
						} else {
							yPosition = checkEndOfPage(yPosition = origYPosition-Math.max(...colHeights)-6,50);
						}	
					});
				}
				let closingTxt = layer.closingTxt.replace("<a href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>","general permit");
				yPosition = addMultilineTxt(closingTxt, width-100, 40,yPosition);
				yPosition = yPosition - 40;
				page.drawRectangle({
					x: 40,
					y: yPosition+25,
					height: 2,
					width: 512,
					color: rgb(0.9, 0.9, .9)
				})
			}); //end each tables
		}); //end each reportArr

		//check for bmps and add them to the end of the report
		if (bmps.length>0){
			//pull in bmp text from the json file
			let bmpTextReport = JSON.parse(bmpText);
			//start a new page
			createPage("Best Management Practices (BMPs)")
			yPosition = 735;
			//sort the BMPs in numerical order 
			let bmpSort = bmps.sort(function(a, b){return a - b});
			bmpSort.forEach(function (bmp) {
				//get the corresponding BMP text and add it to the report
				let bmpRptText = bmpTextReport.find(x => x.id === bmp).text;
				yPosition = addMultilineTxt(bmpRptText, width-100,40,yPosition);
				yPosition = yPosition - 20;
			});
		}

        // Serialize the PDFDocument to bytes (a Uint8Array)
		const pdfBytes = await pdfDoc.save()

		// Trigger the browser to download the PDF document
  		download(pdfBytes, "report.pdf", "application/pdf");

		/**************************************************
		 * Functions within CreatePDF() so that we can access the local variables
		 *************************************************/
		 function checkEndOfPage(yPosition,threshold){
			if (yPosition < threshold) {
				createPage();
				// reset y starting position to top of page
				yPosition = 735; 
				return yPosition;
			} else {
				return yPosition;
			}
		}

		function pageHeader(pageTitle) {
			// Get the width/height of the PNG image scaled down to 65% of its original size
			let dims = pngLogo.scale(0.65);
			page.drawImage(pngLogo, {
				x: 40,
				y: 780,
				width: dims.width,
				height: dims.height
			})
			
			if (!pageTitle) {
				if (permitID) {
					pageTitle ="Special and Impaired Waters within 1 Mile of ISW ID "+ permitID + " Monitoring Location(s)";
				} else {
					pageTitle ="Special and Impaired Waters within 1 Mile of User Specified Location";
				}
			}
			page.drawText(pageTitle, {
				x: 40,
				y: 760,
				size: 12,
				font: fontType,
				color: rgb(0, 0.22, .4)
			})
			page.drawText("Industrial Stormwater", {
				x: 402,
				y: 788,
				size: 16,
				font: fontType,
				color: rgb(0, 0.22, .4)
			})
		}

		function addMultilineTxt(text, txtWidth, xPosition,yPosition) {
			const multiText = layoutMultilineText(text.toString(), {
				alignment: 'left', 
				font: fontType,
				fontSize: fontSize, 
				bounds: { width: txtWidth, height: 100 }
			})
		
			for(let i = 0; i < multiText.lines.length; i++) {
					page.drawText(`${multiText.lines[i].text}`,
					{ 
					x: xPosition,
					y: yPosition,
					size: fontSize,
					font: fontType,
					}
					);
					yPosition = checkEndOfPage(yPosition -= multiText.lineHeight,50);
			}; // end for loop
			return yPosition;
		}
		
		async function embedImage(imgUrl) {
			// Fetch and embed the logo image
			const pngImageBytes = await fetch(imgUrl).then((res) => res.arrayBuffer());
	
			// Embed the PNG image bytes
			let image = await pdfDoc.embedPng(pngImageBytes);
			return image;
		}
		
		function createPage (pageTitle) {
			page = pdfDoc.addPage();
			pageHeader(pageTitle);
			pageFooter();
		}
		
		function pageFooter() {
			let date = curday();
			let footerTxt ="This report was generated on " + date + " using the Industrial Stormwater Special and Impaired Waters Search Tool: r32dawarcgis01.pca.state.mn.us/ISW";
			page.drawText(footerTxt, {
				x: 40,
				y: 30,
				size: 8,
				font: fontType,
				color: rgb(0, 0.22, .4)
			})
		}
		
		function curday(){
			today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1; //As January is 0.
			let yyyy = today.getFullYear();
			return (mm+"/"+dd+"/"+yyyy);
		}
		
		function addTableHeader(header,yPosition,colWidth){
			let xPosition = 40;
			//draw the header
			let heightsArr=[];
			header.forEach(function(col,index){
				let origYPosition = yPosition;
				let multiTextHeight =0;
				const multiText = layoutMultilineText(col, {
					alignment: 'left', 
					font: fontType,
					fontSize: fontSize, 
					bounds: { width: colWidth, height: 100 }
		
					})
					if (index !=0){
						xPosition+=colWidth;
					}
					
					for(let i = 0; i < multiText.lines.length; i++) {
							if (i==0){yPosition=origYPosition;}
							page.drawText(`${multiText.lines[i].text}`,
							{ 
								x: xPosition,
								y: yPosition,
								size: fontSize,
								font: fontType,
							});
							multiTextHeight += multiText.lineHeight;
							heightsArr.push(multiTextHeight);
					}; // end for loop	
			});
		
			//get the height of the tallest multiText box in the header row and use that to calculate the new yPosition
			yPosition -= Math.max(...heightsArr);
			yPosition = checkEndOfPage(yPosition,50);
			yPosition = yPosition -6;
			return yPosition;
		} // end addTableHeader()


		/*
		Sample code for adding hyperlinks
		  const createPageLinkAnnotation = (page, uri, rect) =>
			page.doc.context.register(
				page.doc.context.obj({
				Type: 'Annot',
				Subtype: 'Link',
				Rect: rect,
				Border: [0, 0, 2],
				C: [0, 0, 1],
				A: {
					Type: 'Action',
					S: 'URI',
					URI: PDFString.of(uri),
				},
				}),
			);
			const link = createPageLinkAnnotation(firstPage, 'https://pdf-lib.js.org/', [0, 30, 40, 230]);
			const link2 = createPageLinkAnnotation(firstPage, '/sup/bro/', [5, 30, 40, 230]);

			let annots;
			try{
				annots = firstPage.node.lookup(PDFName.of('Annots'), PDFArray);
				
			} catch (error){
				console.log('no links found:',error)
				annots = pdfDoc.context.obj([]);
				firstPage.node.set(PDFName.of("Annots"), annots);
			}
			annots.push(link)
			annots.push(link2)

		*/


		/**************************************************
		 * End functions within CreatePDF() 
		 *************************************************/

  } //end CreatePDF()

/*****************************************************************
* End Generate PDF Report 
*****************************************************************/ 

function toggleSearch(visible,hidden){
	let visibleDiv = document.getElementById(visible);
	visibleDiv.style.display = "block";
	let hiddenDiv = document.getElementById(hidden);
	hiddenDiv.style.display = "none";
	let permitSearch = document.getElementById("permitSearch");
	let pointSearch = document.getElementById("pointSearch");
	if (visible ==="searchByPermit"){
		pointSearch.classList.remove("active");
		permitSearch.classList.add("active");
		const permitInput = document.getElementById("inputTxt");
		//set focus to the enter stormwater ID Input
		permitInput.focus();
	} else {
		permitSearch.classList.remove("active");
		pointSearch.classList.add("active");
		//set focus to the set location instructions
		const setLocInstructions = document.getElementById("setLocInstructions");
		setLocInstructions.focus();
	}
}

window.onload = (event) => {
	//openDialog('dialog', 'inputTxt');
	openDialog('dialog','trigger');
	//the WAVE tool gives an alert regarding redundant titles that are not needed.
	//This removes all of the title attributes from the layerlist span elements that are automatically created by ArcGIS Javascript API
	let titles = document.querySelectorAll('.esri-layer-list__item-title');
	titles.forEach((title)=> {
		title.removeAttribute("title");
		console.log("removed layer title");
	})
}





