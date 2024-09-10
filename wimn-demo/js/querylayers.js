var wimnQuerylayers = `[
    { 
        "name": "MPCA Sites",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/WIMN/wimn_tempo/MapServer/1",
        "desiredFields": ["name", "program_name_list", "mpca_id_list", "active_flag"],
        "desiredFieldsFriendlyNames": ["site name", "MPCA programs", "permit or project IDs", "active status"],
        "customRptTxt" : "MPCA sites",
        "customRptTxt2" : "This is an MPCA site... needs more text here.",
        "sortID" : 1,
        "BMP" : [],
        "showTable" : true
    }
 ]`

var querylayers = `[
    { 
        "name": "MPCA Sites",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/WIMN/wimn_tempo/MapServer/1",
        "desiredFields": ["name", "program_name_list", "mpca_id_list", "active_flag"],
        "desiredFieldsFriendlyNames": ["site name", "MPCA programs", "permit or project IDs", "active status"],
        "customRptTxt" : "MPCA sites",
        "customRptTxt2" : "This is an MPCA site... needs more text here.",
        "sortID" : 1,
        "BMP" : [],
        "showTable" : true
    },
    { 
        "name": "ORVW: MPCA Listed Calcareous Fen",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/8",
        "desiredFields": ["FENSITENAM"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "ORVW: MPCA Listed Calcareous Fens: ",
        "customRptTxt2" : "Please refer to sections 375.17 and 375.20 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>. Calcareous Fens implement BMP 1 and BMP 4.",
        "sortID" : 4,
        "BMP" : [1,4],
        "showTable" : true
    },
    { 
        "name": "ORVW: DNR Listed Calcareous Fen",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/9",
        "desiredFields": ["FENSITENAM"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "ORVW: DNR Listed Calcareous Fens: ",
        "customRptTxt2" : "Please refer to sections 375.17 and 375.20 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>. Calcareous Fens implement BMP 1 and BMP 4.",
        "sortID" : 5,
        "BMP" : [1,4],
        "showTable" : true
    },
    { 
        "name": "Impaired Streams with Industrial Stormwater Requirements",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/25",
        "desiredFields": ["NAME","auid","IMP_PARA_D"],
        "desiredFieldsFriendlyNames": ["Name","WID","Impairments"],
        "customRptTxt" : "Impaired streams with additional Industrial Stormwater requirements",
        "customRptTxt2" : "Please refer to permit items 32.2 and 48.3 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a> for requirements.",
        "sortID" : 6,
        "BMP" : [],
        "showTable" : true
    },
    { 
        "name": "Impaired Lakes with Industrial Stormwater Requirements",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/29",
        "desiredFields": ["NAME","AUID","IMP_PARA_D"],
        "desiredFieldsFriendlyNames": ["Name","WID","Impairments"],
        "customRptTxt" : "Impaired lakes with additional Industrial Stormwater requirements",
        "customRptTxt2" : "Please refer to permit items 32.2 and 48.3 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a> for requirements.",
        "sortID" : 7,
        "BMP" : [],
        "showTable" : true

    },
    { 
        "name": "Impaired Wetlands with Industrial Stormwater Requirements",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/27",
        "desiredFields":["NAME","AUID","IMP_PARA_D"],
        "desiredFieldsFriendlyNames": ["Name","WID","Impairments"],
        "customRptTxt" : "Impaired wetlands with additional Industrial Stormwater requirements",
        "customRptTxt2" : "Please refer to permit items 32.2 and 48.3 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a> for requirements.",
        "sortID" : 8,
        "BMP" : [],
        "showTable" : true

    },
    { 
        "name": "Trout Streams - Minn R 7050 Listed",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/18",
        "desiredFields": ["reach_name","wid"],
        "desiredFieldsFriendlyNames": ["Name","WID"],
        "customRptTxt" : "Trout streams - Minn R 7050 Listed",
        "customRptTxt2" : "Please refer to sections 375.17 and 375.18 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>. The user must comply with BMP 1 and BMP 2 if the industrial facility has a monitoring location from which a discharge flows to and is within one mile of designated Trout Streams listed in Minn. R. Ch. 6264.0050, sup. 2 and Minn. R. Ch. 7050.0420.",
        "sortID" : 9,
        "BMP" : [1,2],
        "showTable" : true
    },
    { 
        "name": "Trout Streams - Minn R. 6264 Listed",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/19",
        "desiredFields": ["KITTLE_NAM","KITTLE_NBR"],
        "desiredFieldsFriendlyNames": ["Name","DNR ID"],
        "customRptTxt" : "Trout Streams - Minn R. 6264 Listed",
        "customRptTxt2" : "Please refer to sections 375.17 and 375.18 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>. The user must comply with BMP 1 and BMP 2 if the industrial facility has a monitoring location from which a discharge flows to and is within one mile of designated Trout Streams and Trout Stream Tributaries listed in Minn. R. Ch. 6264.0050, sup. 2 and Minn. R. Ch. 7050.0420.",
        "sortID" : 10,
        "BMP" : [1,2],
        "showTable" : true
    },
    { 
        "name": "Trout Lakes - Minn R 7050 Listed",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/20",
        "desiredFields": ["lake_name","wid"],
        "desiredFieldsFriendlyNames": ["Name","WID"],
        "customRptTxt" : "Trout lakes - Minn R 7050 Listed",
        "customRptTxt2" : "Please refer to sections 375.17 and 375.19 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>. The user must comply with BMP 1 and BMP 3 if the industrial facility has a monitoring location from which a discharge flows to and is within one mile of designated Trout Lakes listed in Minn. R. Ch. 6264.0050, sup. 2 and Minn. R. Ch. 7050.0420. ",
        "sortID" : 11,
        "BMP" : [1,3],
        "showTable" : true
    },
    { 
        "name": "Trout Lakes - Minn R. 6264 Listed",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/21",
        "desiredFields": ["PW_BASIN_N","DOWLKNUM"],
        "desiredFieldsFriendlyNames": ["Name","DNR ID"],
        "customRptTxt" : "Trout lakes - Minn R. 6264 Listed",
        "customRptTxt2" : "Please refer to sections 375.17 and 375.19 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>. The user must comply with BMP 1 and BMP 3 if the industrial facility has a monitoring location from which a discharge flows to and is within one mile of designated Trout Lakes listed in Minn. R. Ch. 6264.0050, sup. 2 and Minn. R. Ch. 7050.0420. ",
        "sortID" : 12,
        "BMP" : [1,3],
        "showTable" : true
    },
    { 
        "name": "Lake Superior Outstanding Resource Value Water - Restricted Discharge",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/23",
        "desiredFields": ["RNAME"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "ORVW Lake Superior - Restricted Discharge",
        "customRptTxt2" : "Outstanding Resource Value Water Lake Superior, implement BMP 1.",
        "sortID" : 13,
        "BMP" : [1],
        "showTable" : false
    },
    { 
        "name": "Lake Superior Outstanding Resource Value Water - Prohibited Discharge",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/24",
        "desiredFields": ["RNAME"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "ORVW Lake Superior - Prohibited Discharge",
        "customRptTxt2" : "This is a prohibited discharges zone.",
        "sortID" : 14,
        "BMP" : [],
        "showTable" : false
    },
    { 
        "name": "Outstanding Resource Value Water - Mississippi River",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/16",
        "desiredFields": ["Name"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "Outstanding Resource Value Water",
        "customRptTxt2" : "Please refer to section 375.17 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>. The user must comply with BMP 1.",
        "sortID" : 15,
        "BMP" : [1],
        "showTable" : false
    },
    { 
        "name": "ORVW: Wild Rivers and Streams - Prohibited Discharge",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/15",
        "desiredFields": ["Name"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "ORVW: Wild Rivers and Streams - Prohibited Discharge",
        "customRptTxt2" : "Please refer to section 375.5 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>.",
        "sortID" : 16,
        "BMP" : [],
        "showTable" : true
    },
    { 
        "name": "ORVW: Scenic and Recreational River Segments",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/17",
        "desiredFields": ["Name"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "ORVW: Federal or State designated scenic or recreational river segments",
        "customRptTxt2" : "Please refer to section 375.17 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>. The user must comply with BMP 1.",
        "sortID" : 17,
        "BMP" : [1],
        "showTable" : true
    },
    { 
        "name": "ORVW: Lake Trout Lake",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/22",
        "desiredFields": ["RNAME","DOW_ID"],
        "desiredFieldsFriendlyNames": ["Name","WID"],
        "customRptTxt" : "Outstanding Resource Value Water - Lake trout lakes",
        "customRptTxt2" : "Please refer to sections 375.17 and 375.19 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>. Outstanding Resource Value Water Lake Trout Lakes implement BMP 1 and BMP 3",
        "sortID" : 18,
        "BMP" : [1,3],
        "showTable" : true
    },
    { 
        "name": "National Wetland Inventory for Minnesota",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/39",
        "desiredFields": ["CIRC39"],
        "desiredFieldsFriendlyNames": ["Wetland Types Present "],
        "customRptTxt" : "Wetland ",
        "customRptTxt2" : "The user shall comply with the requirements of Minn. R. Ch. 7050.0186, WETLANDS STANDARDS AND MITIGATION if the industrial facility has a monitoring location from which a discharge flows to and is within one mile of a wetland as defined by Minn. R. Ch. 7050.0186, subp. 1a. B.",
        "sortID" : 19,
        "BMP" : [],
        "showTable" : true
    
    },
    { 
        "name": "MDH – Wellhead Protection Areas",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/10",
        "desiredFields": ["whp_name"],
        "desiredFieldsFriendlyNames": ["Public Water System"],
        "customRptTxt" : "Wellhead protection areas",
        "customRptTxt2" : "The monitoring location is within one mile of a Wellhead Protection area. Please refer to section 20.8 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a>.",
        "sortID" : 20,
        "BMP" : [],
        "showTable" : false
    },
    { 
        "name": "Karst Features",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/7",
        "desiredFields": ["NAME"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "Karst Features ",
        "customRptTxt2" : "Please refer to section 20.5 in the <a tabIndex=-1 class='permitLink' href='https://www.pca.state.mn.us/sites/default/files/wq-strm3-67i.pdf' target='_blank'> general permit</a> for requirements.",
        "sortID" : 21,
        "BMP" : [],
        "showTable" : true
    
    },
    { 
        "name": "MDH - Drinking Water Supply Management Area - very high vulnerability",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/12",
        "desiredFields": ["DWSVUL_ID"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "Drinking Water Supply Management Area – very high vulnerability",
        "customRptTxt2" : "The monitoring location is within one mile of a very high vulnerability Drinking Water Supply Management Area. ",
        "sortID" : 22,
        "BMP" : [],
        "showTable" : false
    },
    { 
        "name": "MDH - Drinking Water Supply Management Area - high vulnerability",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/13",
        "desiredFields": ["DWSVUL_ID"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "Drinking Water Supply Management Area – high vulnerability",
        "customRptTxt2" : "The monitoring location is within one mile of a high vulnerability Drinking Water Supply Management Area. ",
        "sortID" : 23,
        "BMP" : [],
        "showTable" : false
    },
    { 
        "name": "MDH - Drinking Water Supply Management Area - medium vulnerability",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/14",
        "desiredFields": ["DWSVUL_ID"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "Drinking Water Supply Management Area – medium vulnerability",
        "customRptTxt2" : "The monitoring location is within one mile of a medium vulnerability Drinking Water Supply Management Area. ",
        "sortID" : 24,
        "BMP" : [],
        "showTable" : false
    },
    { 
        "name": "MDH - Emergency Response Area",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/11",
        "desiredFields": ["ERA_ID"],
        "desiredFieldsFriendlyNames": ["ID"],
        "customRptTxt" : "MDH - Emergency Response Area",
        "customRptTxt2" : "The monitoring location is within one mile of a MDH Emergency Response Area. ",
        "sortID" : 25,
        "BMP" : [],
        "showTable" : false
    },
    { 
        "name": "MS4- Municipal Separate Storm Sewer System",
        "url": "https://pca-gis02.pca.state.mn.us/arcgis/rest/services/maps/ISW/MapServer/6",
        "desiredFields": ["MS4_Name"],
        "desiredFieldsFriendlyNames": ["Name"],
        "customRptTxt" : "MS4- Municipal Separate Storm Sewer System.",
        "customRptTxt2" : "This monitoring location is within a municipality that is required by rule to permit a Municipal Separate Storm Sewer System or MS4. 6.2: If the Permittee has an industrial stormwater discharge and directly discharges into a regulated Municipal Separate Storm Sewer System (MS4), the Permittee shall notify the MS4 operator that they are discharging industrial stormwater into their storm sewer system. [Minn. R. 7090]",
        "sortID" : 26,
        "BMP" : [],
        "showTable" : true
    }
]`