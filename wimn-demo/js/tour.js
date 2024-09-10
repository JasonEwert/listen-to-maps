'use strict';

(function() {
  function init() {
    var shepherd = setupShepherd();
    document.getElementById("mapTour").addEventListener("click", launchTour);
    function launchTour(){
        //first close the intro dialog
        const closeButton = document.getElementById("close");
        closeDialog(closeButton);
        shepherd.start();
    }
  }

  function setupShepherd() {
    var shepherd = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'class-1 class-2',
        scrollTo: {
          behavior: 'smooth',
          block: 'center'
        }
      },
      // This should add the first tour step
      steps: [
        {
          title: 'Search by Industrial Stormwater ID',
          text: 'Enter an Industrial Stormwater ID (permit number) to search for special and impaired waters within 1 mile of the associate monitoring locations as applicable.',
          attachTo: {
            element: '#inputTxt',
            on: 'right'
          },
          buttons: [
            {
              action: function() {
                return this.cancel();
              },
              secondary: true,
              text: 'Exit'
            },
            {
              action: function() {
                return this.next();
              },
              text: 'Next'
            }
          ],
          id: 'idSearch'
        }
      ],
      useModalOverlay: true
    });


    // These steps should be added via `addSteps`
    const steps = [
		      {
        title: 'Industrial Stormwater ID look up',
        text: 'If you do not know your Industrial Stormwater ID, which is your permit number you can search for it by clicking on the blue link which will bring you to a data driven webpage.',
        attachTo: {
          element: '#iswLookup',
          on: 'right'
        },
        buttons: [
          {
            action: function() {
              return this.back();
            },
            secondary: true,
            text: 'Back'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'idLookup'
      },
	  {
        title: 'Search by specified location',
        text: 'For facilities that are applying for permit coverage and need a facility map (permit item 32.2) or for no exposure facilities that do not have monitoring locations, use this option to search for and create a map of special and impaired waters within one mile of any location.',
        attachTo: {
          element: '#pointSearch',
          on: 'right'
        },
        buttons: [
          {
            action: function() {
              return this.back();
            },
            secondary: true,
            text: 'Back'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'locationSearch'
      },
	  {
        title: 'Search Results',
        text: 'Click on the Download PDF Report button to download a map and report. Expand the search results headings for detailed information about features of interest within 1 mile.<br /><br /> <img id="download" src="img/download_pdf.png" alt="Sample search results showing download PDF button.">',
        buttons: [
          {
            action: function() {
              return this.back();
            },
            secondary: true,
            text: 'Back'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'searchRes'
      },
      {
        title: 'Toggle Map Layers',
        text: 'Use the map layer list to customize your map. Click on the arrows to expand layer groups. Click on the eye icon to show or hide layers. <br /><br /> <img id="mapPopups" src="img/layerGroups.png" alt="Toggle boundaries example">',
        attachTo: {
          element: '[title~=Toggle]',
          on: 'right'
        },
        buttons: [
          {
            action: function() {
              return this.back();
            },
            secondary: true,
            text: 'Back'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'layerToggle'
      },
      {
        title: 'Get feature information',
        text: 'Click on the map to get information about features such as impaired waters. Click on the arrows at the top right of the popup to view data for overlapping features.<img id="mapPopups" src="img/popups.png" alt="Map popup example.">  ',
        buttons: [
          {
            action: function() {
              return this.back();
            },
            secondary: true,
            text: 'Back'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'featureInfo'
      },
      {
        title: 'Toggle Legend',
        text: 'Click on this button to hide or show the legend.',
        attachTo: {
          element: '[title~=Legend]',
          on: 'left'
        },
        buttons: [
          {
            action: function() {
              return this.back();
            },
            secondary: true,
            text: 'Back'
          },
          {
            action: function() {
              return this.next();
            },
            text: 'Next'
          }
        ],
        id: 'legendToggle'
      },

    ];

    shepherd.addSteps(steps);

    // This should add steps after the ones added with `addSteps`
    shepherd.addStep({
      title: 'Map Search',
      text: 'Search by address, Industrial Stormwater ID (permit number) or latitude/longitude coordinates to zoom to a location. ',
      attachTo: {
        element: '.esri-search',
        on: 'left'
      },
      buttons: [
        {
          action: function() {
            return this.back();
          },
          secondary: true,
          text: 'Back'
        },
        {
          action: function() {
            return this.next();
          },
          text: 'Done'
        }
      ],
      id: 'search',
      modalOverlayOpeningPadding: '10'
    });
    return shepherd;
  }

  function ready() {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        init();
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
  }


  ready();
}).call(void 0);