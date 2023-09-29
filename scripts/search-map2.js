class SearchMap2 { 
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
			"esri/layers/FeatureLayer",
			"esri/widgets/Search",
			"esri/geometry/Extent",
			"esri/core/reactiveUtils"
			],
		function(Map, MapView, Basemap, BasemapToggle, 
				 ScaleBar,FeatureLayer, Search, Extent, reactiveUtils
				  
				) {

					
					const ctuLayer = new FeatureLayer({
					  // URL to the service
					  url: "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/WIMN/xsearch2/MapServer/0"
					});
					
                    /*****************************************************************
                     * make the map already!
                     *****************************************************************/

                    const map = new Map({
                    basemap: "satellite", //"hybrid", //"streets-vector",
                    layers: []
                    });

                    view = new MapView({
                    container: viewDiv,
                    map: map,
                    center: [-94.5, 46.1],
					zoom: 10
                    });
					
                      /*****************************************************************
					  * searchView UI
					  *****************************************************************/

					  const theExtent = new Extent({
						xmin: -89.58,
						ymin: 43.5,
						xmax: -97.25,
						ymax: 49.37,
						spatialReference: { "wkid": 4326 }
					  });

					  const searchExtent = {
						geometry: theExtent
					  };

					  const searchWidget = new Search({
						view: view,
						allPlaceholder: "enter an address",
						includeDefaultSources: false,
						suggestionsEnabled: true,
						popupEnabled: true,
						searchAllEnabled: true,
						locationEnabled: false,
						maxResults: 6,
						maxSuggestions: 4,
						sources: [{
							layer: ctuLayer,
							placeholder: "municipality",
							maxResults: 4,
							searchFields: ["NAME"],
							displayFields: ["NAME"],
							name: "municipality"
						}],
			//			container: mapSearchDiv
					  });

					  // on popup close, returns focus to the search box
					  // from Kitty's accessibliity blog post
					  // this works great and should be part of the API!

					  searchWidget.on("search-complete", () => onSearchComplete());

					  let abortController = null;

					  async function onSearchComplete() {
						
						abortController?.abort();
						const { signal } = (abortController = new AbortController());

						// When the popup is visible set focus on it.
						await reactiveUtils.whenOnce(() => view.popup.visible, signal);
						view.popup.focus();

						// And when the popup is closed move the focus back to the search widget.
						await reactiveUtils.whenOnce(() => !view.popup.visible, signal);
						searchWidget.focus();
					  };
	  
	  
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

                    view.ui.add(searchWidget, {position: "top-right"});
					view.ui.add(basemapToggle, "bottom-right");
                    view.ui.add(scaleBar, {position: "bottom-left"});

                    }); 
                    } catch (error) {

                };
            };
        };