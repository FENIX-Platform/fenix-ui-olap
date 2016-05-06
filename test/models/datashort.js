define(function(){return{
  "metadata" : {
    "creationDate" : 1441790950980,
    "title" : {
      "EN" : "Forest area and characteristics"
    },
    "dsd" : {
      "datasources" : [ "FLUDE" ],
      "contextSystem" : "FLUDE",
      "rid" : "63_182",
      "columns" : [ {
        "dataType" : "code",
        "id" : "region",
        "title" : {
          "EN" : "Region"
        },
        "domain" : {
          "codes" : [ {
            "idCodeList" : "FLUDE_REGIONS",
            "extendedName" : {
              "EN" : "FLUDE - Regions"
            }
          } ]
        }
      }, {
        "dataType" : "code",
        "id" : "subregion",
        "title" : {
          "EN" : "Subregion"
        },
        "domain" : {
          "codes" : [ {
            "idCodeList" : "FLUDE_SUBREGIONS",
            "extendedName" : {
              "EN" : "FLUDE - Subregions"
            }
          } ]
        }
      }, {
        "dataType" : "code",
        "key" : true,
        "id" : "country",
        "title" : {
          "EN" : "Country"
        },
        "domain" : {
          "codes" : [ {
            "idCodeList" : "ISO3",
            "extendedName" : {
              "EN" : "International Standard Organization - Geographic names"
            }
          } ]
        },
        "subject" : "geo"
      }, {
        "dataType" : "year",
        "key" : true,
        "id" : "year",
        "title" : {
          "EN" : "Year"
        },
        "subject" : "time"
      }, {
        "dataType" : "code",
        "key" : true,
        "id" : "indicator",
        "title" : {
          "EN" : "Incomes"
        },
        "domain" : {
          "codes" : [ {
            "idCodeList" : "FLUDE_INDICATORS",
            "extendedName" : {
              "EN" : "FLUDE - Indicators by topic"
            }
          } ]
        },
        "subject" : "element"
      }, {
        "dataType" : "code",
        "key" : true,
        "id" : "domain",
        "title" : {
          "EN" : "Domain"
        },
        "domain" : {
          "codes" : [ {
            "idCodeList" : "FLUDE_DOMAINS",
            "extendedName" : {
              "EN" : "FLUDE - Domains"
            }
          } ]
        }
      }, {
        "dataType" : "code",
        "id" : "incomes",
        "title" : {
          "EN" : "Incomes"
        },
        "domain" : {
          "codes" : [ {
            "idCodeList" : "FLUDE_INCOMES",
            "extendedName" : {
              "EN" : "FLUDE - Incomes"
            }
          } ]
        }
      }, {
        "dataType" : "number",
        "id" : "value",
        "title" : {
          "EN" : "Value"
        },
        "subject" : "value"
      }, {
        "dataType" : "code",
        "id" : "um",
        "title" : {
          "EN" : "UM"
        },
        "domain" : {
          "codes" : [ {
            "idCodeList" : "FLUDE_UM",
            "extendedName" : {
              "EN" : "FLUDE units of measurement"
            }
          } ]
        },
        "subject" : "um"
      }, {
        "dataType" : "code",
        "id" : "ts",
        "title" : {
          "EN" : "Flag S"
        },
        "domain" : {
          "codes" : [ {
            "idCodeList" : "FLUDE_FLAGS_S",
            "extendedName" : {
              "EN" : "FLUDE - Flags S"
            }
          } ]
        }
      }, {
        "dataType" : "code",
        "id" : "tt",
        "title" : {
          "EN" : "Flag T"
        },
        "domain" : {
          "codes" : [ {
            "idCodeList" : "FLUDE_FLAGS_T",
            "extendedName" : {
              "EN" : "FLUDE - Flags T"
            }
          } ]
        }
      }, {
        "dataType" : "bool",
        "id" : "itto",
        "title" : {
          "EN" : "ITTO"
        }
      }, {
        "dataType" : "bool",
        "id" : "comifac",
        "title" : {
          "EN" : "COMIFAC"
        }
      }, {
        "dataType" : "bool",
        "id" : "foreur",
        "title" : {
          "EN" : "FOREUR"
        }
      }, {
        "dataType" : "bool",
        "id" : "montreal",
        "title" : {
          "EN" : "MONTREAL"
        }
      }, {
        "dataType" : "bool",
        "id" : "unece",
        "title" : {
          "EN" : "UNECE"
        }
      }, {
        "dataType" : "number",
        "id" : "tot_pop_1000",
        "title" : {
          "EN" : "Total population (x1000)"
        }
      }, {
        "dataType" : "number",
        "id" : "tot_area",
        "title" : {
          "EN" : "Total area"
        }
      }, {
        "dataType" : "text",
        "id" : "desk_study",
        "title" : {
          "EN" : "Desk study"
        }
      }, {
        "dataType" : "number",
        "id" : "gdpusd2012",
        "title" : {
          "EN" : "GDP USD 2012"
        }
      } ]
    },
    "rid" : "9_6107",
    "uid" : "FLUDE_TOPIC_1",
    "meContent" : {
      "resourceRepresentationType" : "dataset",
      "resourceRepresentationTypeLabel" : {
        "EN" : "Dataset"
      }
    },
    "meMaintenance" : {
      "seUpdate" : {
        "updateDate" : 1441790950980
      }
    }
  },
  "data" : [ [ "EU", "Europe", "FRO", 2000, "InWater", "Bor", "H", 0.8999999761581421,
    "HA3", null, null, false, false, false, false, false,
    46.49100112915039,
    139.60000610351562, null, null ],
    [ "EU", "Europe", "FRO", 2005, "InWater", "Bor", "H", 0.8999999761581421, "HA3", null, null, false, false, false, false, false, 49.15700149536133, 139.60000610351562, null, null ], [ "EU", "Europe", "FRO", 2010, "InWater", "Bor", "H", 0.8999999761581421, "HA3", null, null, false, false, false, false, false, 49.58100128173828, 139.60000610351562, null, null ], [ "EU", "Europe", "FRO", 2015, "InWater", "Bor", "H", 0.8999999761581421, "HA3", null, null, false, false, false, false, false, 49.58100128173828, 139.60000610351562, null, null ], [ "EU", "Europe", "FRO", 9999, "InWater", "Bor", "H", null, "HA3", null, null, false, false, false, false, false, null, null, null, null ], [ "OCE", "Oceania", "FSM", 2005, "InWater", "Trp", "LM", 0.13699999451637268, "HA3", null, null, false, false, false, false, false, 106.197998046875, 70.0, null, null ], [ "AFR", "WCAfr", "GAB", 1990, "InWater", "Trp", "UM", 1000.0, "HA3", null, null, true, true, false, false, false, 946.7030029296875, 26767.0, null, null ], [ "AFR", "WCAfr", "GAB", 2000, "InWater", "Trp", "UM", 1000.0, "HA3", null, null, true, true, false, false, false, 1225.5269775390625, 26767.0, null, null ], [ "AFR", "WCAfr", "GAB", 2005, "InWater", "Trp", "UM", 1000.0, "HA3", null, null, true, true, false, false, false, 1379.4649658203125, 26767.0, null, null ], [ "AS", "EAsia", "JPN", 9999, "InWater", "SubTrp", "H", null, "HA3", null, null, false, false, false, true, false, null, null, null, null ], [ "AFR", "WCAfr", "GAB", 2010, "InWater", "Trp", "UM", 1000.0, "HA3", null, null, true, true, false, false, false, 1556.2220458984375, 26767.0, null, null ], [ "AFR", "WCAfr", "GAB", 2015, "InWater", "Trp", "UM", 1000.0, "HA3", null, null, true, true, false, false, false, 1656.6400146484375, 26767.0, null, null ], [ "OCE", "Oceania", "PCN", 2015, "InWater", "Trp", "NA", 0.0, "HA3", null, null, false, false, false, false, false, null, 4.699999809265137, null, null ], [ "EU", "Europe", "GBR", 1990, "InWater", "Temp", "H", 168.0, "HA3", null, null, false, false, true, false, true, 57214.4765625, 24361.0, null, null ], [ "EU", "Europe", "GBR", 2000, "InWater", "Temp", "H", 168.0, "HA3", null, null, false, false, true, false, true, 58951.4453125, 24361.0, null, null ], [ "EU", "Europe", "GBR", 2005, "InWater", "Temp", "H", 168.0, "HA3", null, null, false, false, true, false, true, 60291.4140625, 24361.0, null, null ], [ "EU", "Europe", "GBR", 2010, "InWater", "Temp", "H", 168.0, "HA3", null, null, false, false, true, false, true, 62066.3515625, 24361.0, null, null ], [ "EU", "Europe", "GBR", 2015, "InWater", "Temp", "H", 168.0, "HA3", null, null, false, false, true, false, true, 63909.2265625, 24361.0, null, null ], [ "EU", "Europe", "GBR", 9999, "InWater", "Temp", "H", null, "HA3", null, null, false, false, true, false, true, null, null, null, null ], [ "AS", "WCAsia", "GEO", 1990, "InWater", "SubTrp", "LM", 21.0, "HA3", null, null, false, false, false, false, true, 5460.30908203125, 6970.0, null, null ], [ "AS", "WCAsia", "GEO", 2000, "InWater", "SubTrp", "LM", 21.0, "HA3", null, null, false, false, false, false, true, 4743.5908203125, 6970.0, null, null ], [ "AS", "WCAsia", "GEO", 2005, "InWater", "SubTrp", "LM", 21.0, "HA3", null, null, false, false, false, false, true, 4475.30615234375, 6970.0, null, null ], [ "AS", "WCAsia", "GEO", 2010, "InWater", "SubTrp", "LM", 21.0, "HA3", null, null, false, false, false, false, true, 4388.673828125, 6970.0, null, null ], [ "AS", "WCAsia", "GEO", 2015, "InWater", "SubTrp", "LM", 21.0, "HA3", null, null, false, false, false, false, true, 4223.33203125, 6970.0, null, null ], [ "AS", "WCAsia", "GEO", 9999, "InWater", "SubTrp", "LM", null, "HA3", null, null, false, false, false, false, true, null, null, null, null ], [ "OCE", "Oceania", "PCN", 9999, "InWater", "Trp", "NA", null, "HA3", null, null, false, false, false, false, false, null, null, null, null ], [ "OCE", "Oceania", "PLW", 9999, "InWater", "Trp", "NA", null, "HA3", null, null, false, false, false, false, false, null, null, null, null ], [ "OCE", "Oceania", "PYF", 9999, "InWater", "Trp", "NA", null, "HA3", null, null, false, false, false, false, false, null, null, null, null ]],
  "size" : 37908
}
});