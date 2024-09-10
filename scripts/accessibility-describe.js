class describeMap { 
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
        "esri/rest/identify",
        "esri/rest/support/IdentifyParameters",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "esri/core/reactiveUtils"
        ], 
        function(Map, MapView, identify, IdentifyParameters, GraphicsLayer, Graphic, reactiveUtils) {
  
          //graphic layer to hold the map center point icon
          const mapCenterGraphic = new GraphicsLayer({
            id: "mapCenterGraphic",
            listMode: "hide"
          });
  
          const map = new Map({
            basemap:  "hybrid", //"streets-vector", 
            layers: [mapCenterGraphic]
          });
  
          const view = new MapView({
            map: map,
            center: [-95.0, 45.3], // New London, MN
            zoom: 13, 
            container: viewDiv
          });
  
          /*****************************************************************
           * map description div
          *****************************************************************/
                let mapDescription  = document.createElement("div");
  
          mapDescription.id = "mapDescription";
          mapDescription.setAttribute('aria-live', 'assertive');
          mapDescription.setAttribute('tabindex', '-1'); // if 0 this is read every time, if -1 only changes are read (desired functionality)
          mapDescription.style.width = "100%";
          mapDescription.style.padding = "2px",
          mapDescription.style.backgroundColor = "rgba(255, 255, 255, 0.8)"; // from the credits styles
          mapDescription.style.backgroundBlendMode;
          mapDescription.style.fontSize = "12px";
  
          view.ui.add(mapDescription, {position: "bottom-left"});
  
          
          /*****************************************************************
           * watch for view changes and update the div
          *****************************************************************/
  
          // Watch view's updating event and run the identify on update
          reactiveUtils.watch(
            () => [view.stationary, view.zoom],
            function ([stationary, zoom]){
              // Only run the query when the view is stationary
              if(stationary){
  
                // options for the map description
                let searchTolerance = 200;
                //executeIdentifyCTU(searchTolerance);
                executeIdentifyWater(searchTolerance);
                addMapCenterGraphic(searchTolerance);
                
              }
            }
          );
          
          /*****************************************************************
           * get to work
          *****************************************************************/
  
          function addMapCenterGraphic(boxSize) {
  
            let boxSymLg = {
              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
              color: [0, 255, 224, 0],
              style: 'square',
              outline: {
                color: [0, 255, 224],
                width: 2
              },
              size: boxSize
            };
            
            let center_latLng = view.center;
            let y = center_latLng.latitude;
            let x = center_latLng.longitude;
            let point = {
              type: "point", 
              x: x,
              y: y
            };
  
            mapCenterGraphic.removeAll();
  
            mapCenterGraphic.add(new Graphic({
              geometry: point,
              symbol: boxSymLg
            }));
  
          };
  
          function executeIdentifyCTU(tolerance) {
  
            let div = document.getElementById('mapDescription');
  
            // Set the parameters for the identify
            let params = new IdentifyParameters();
            params.tolerance = tolerance;
            params.layerIds = [0,5];
            params.layerOption = "visible";
            params.width = view.width;
            params.height = view.height;
            params.geometry = view.center;
            params.mapExtent = view.extent;
            params.returnGeometry = false;
  
            let divStr = "";    
            let zoomL = view.zoom;
            let scale;
  
            if(zoomL < 5){
              scale = "world"
            } else if (zoomL >=5 && zoomL < 6){
              scale = "country"
            }else if (zoomL >=6 && zoomL < 9){
              scale = "state"
            }else if (zoomL >=9 && zoomL < 12){
              scale = "county"
            }else if (zoomL >=12 && zoomL < 14){
              scale = "township"
            }else if (zoomL >=14 && zoomL < 16){
              scale = "section"
            }else if (zoomL >=16 ){
              scale = "building"
            };
  
            divStr = "The map is set to a " + scale + " scale and contains the following: ";
  
            //divStr="<p>This " + JSON.stringify(map.basemap.title) + " map is set to a " + scale + " scale. It contains the following locations. </p></br>";
            //divStr="<p>The map is set to a " + scale + " scale. It contains the following locations. </p></br>";
  
            if (zoomL <= 8) {
  
              div.innerHTML = divStr + "zoom in to query cities, twonships, and counties";
  
            } else {
  
              // This function returns a promise that resolves to an array of features
              identify
                .identify("https://pca-gis02.pca.state.mn.us/arcgis/rest/services/Geo/searchx/MapServer", params)
                .then(function (response) {
  
                  var results = response.results;
  
                  results.map(function (result) {
  
                    let feature = result.feature;					
                    let layerName = result.layerName;
  
                    if (layerName === "Cities & Townships") {
  
                      let name = feature.attributes.MCD_NAME;
                      let type = feature.attributes.TYPE;
  
                      if ( divStr.includes(name) == false){
  
                        if ( type === "Township"){
                          divStr = divStr +  name + " " + type +", ";
                        } else {
                          divStr = divStr +  name + ", ";
                        };
                      };
  
                    } else if (layerName === "Counties") {
  
                      let name = feature.attributes.NAME;
                      if ( divStr.includes(name) == false){
                        divStr = divStr + name + " County, ";
                      };
  
                    };
                  });
  
                  div.innerHTML = divStr;
                });      
            };
          };
  
          function executeIdentifyWater(tolerance) {
  
            let div = document.getElementById('mapDescription');
  
            // Set the parameters for the identify
            let params = new IdentifyParameters();
            params.tolerance = tolerance;
            params.layerIds = [0,1];
            params.layerOption = "visible";
            params.width = view.width;
            params.height = view.height;
            params.geometry = view.center;
            params.mapExtent = view.extent;
            params.returnGeometry = false;
  
            let divStr = "";
                
            let zoomL = view.zoom;
            let scale;
            if(zoomL < 5){
              scale = "world"
            } else if (zoomL >=5 && zoomL < 6){
              scale = "country"
            }else if (zoomL >=6 && zoomL < 9){
              scale = "state"
            }else if (zoomL >=9 && zoomL < 12){
              scale = "county"
            }else if (zoomL >=12 && zoomL < 14){
              scale = "township"
            }else if (zoomL >=14 && zoomL < 16){
              scale = "section"
            }else if (zoomL >=16 ){
              scale = "building"
            };
  
            divStr = "The map is set to a " + scale + " scale and contains the following: ";
  
            //divStr="<p>This " + JSON.stringify(map.basemap.title) + " map is set to a " + scale + " scale. It contains the following locations. </p></br>";
            //divStr="<p>The map is set to a " + scale + " scale. It contains the following locations. </p></br>";
  
            if (zoomL <= 10) {
  
              div.innerHTML = divStr + "zoom in to query waterbodies";
  
            } else {
              // This function returns a promise that resolves to an array of features
              identify
                .identify("https://pca-gis02.pca.state.mn.us/arcgis/rest/services/base/auidsV2/MapServer", params)
                .then(function (response) {
  
                  var results = response.results;
     
                  results.map(function (result) {
  
                    let feature = result.feature;					
                    let layerName = result.layerName;
  
                    if (layerName === "stream assessment units - current" ) {
  
                      let name = feature.attributes.reach_name;
  
                      if ( name.includes("nnamed") == false &&  name.includes("Unassessed") == false && divStr.includes(name) == false){
  
                        divStr = divStr +  name + ", ";
  
                      };
                    
                    } else if (layerName === "lake and wetland assessment units - current" ) {
  
                      let name = feature.attributes.lake_name;
  
                      if ( name.includes("nnamed") == false &&  name.includes("Unassessed") == false && divStr.includes(name) == false ){
  
                        divStr = divStr +  name + ", ";
  
                      };
                    };
  
                  });
  
                  div.innerHTML = divStr;
  
                });
                  
              };
          };
   
        });
  
        } catch (error) {

        };
    };


};