define([
        
		"./renderer/sigmagrid"
       // 'pivotgrid',
     //  'localpagination'
    ], function (rendererGridFXJSON) {

     
      

	   return function () {
            return {
                render: rendererGridFXJSON,
               /* rendererTable: rendererTable,
                rendererGrid: rendererGrid,
                rendererGridFX: rendererGridFXJSON,
                renderJDataGrid: renderJDataGrid,
renderjDatagridPivot:jDatagridPivot*/
            }
        };
    });
