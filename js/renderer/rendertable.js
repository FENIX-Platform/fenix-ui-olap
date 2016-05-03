 function rendererTable(result, id, fonctions) {
            ret = "<table border=1><tr>";
            var span = result.rowHeaders[0].length;
            ret += "<th colspan=" + span + "></th>";
            for (var i in result.columnHeaders) {
                ret += "<th>" + result.columnHeaders[i] + " </th>";
            }
            ret += "</tr>";
            count = 0;
            for (var i in result.rowHeaders) {
                count++;
//if(count>100)continue;
                ret += "<tr>";
                for (var j in result.rowHeaders[i]) {
                    ret += "<th>" + result.rowHeaders[i][j] + "</th>";
                }
                for (var j in result.columnHeaders) {
                    if (result.data[i][j]) {
                        ret += "<td>" + fonctions.aggregator(result.data[i][j]) + "</td>";
                    }
                    else {
                        ret += "<td></td>";
                    }
                }
                ret += "</tr>";
            }

            ret += "</table>";
            document.getElementById(id).innerHTML = ret;
        }
