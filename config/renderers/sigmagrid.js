/*global define*/
define(function () {

    'use strict';

    return {
        width: "100%",
        height: "350",
       
        replaceContainer: false,
        pageSize: 15,
        pageSizeList: [15, 25, 50, 150],
        SigmaGridPath: 'grid/',
        toolbarContent: 'nav | goto | pagesize '
    };
});