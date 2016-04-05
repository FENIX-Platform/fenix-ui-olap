/*global requirejs*/
requirejs(['paths'], function (paths) {


	paths.baseUrl = '.';

	requirejs.config(paths);

	requirejs([	'controler'	],
	function(controler) {
		var myControler=new controler();
		myControler.init();
		
		/*
		MYFINALRESULT={data:[],rows:[],cols:[]}
		tamp=myControler.getResult();
		MYFINALRESULT.rows=jStat(tamp.data).col(0).transpose()[0];
		MYFINALRESULT.data=jStat(jStat(tamp.data).transpose().slice(1)).transpose();
		console.log(jStat.corrcoeff(MYFINALRESULT.data[1],MYFINALRESULT.data[1],MYFINALRESULT.data[1]))*/
		/*test part */
		
		
		
		
/*
		<!-- toolbar -->

		
		var myToolbar=new toolbar();
		var myPivotator=new pivotator();
		var myRenderer=new renderer();
		
		myToolbar.init("toolbar",mydatad3s.metadata.dsd,{
onchange:function(){
				var rowcol=myToolbar.getConfigCOLROW();
				
				var result = myPivotator.pivot(mydata,rowcol.ROWS, rowcol.COLS, {myfunction:fonctions.getValue,cumulative:fonctions.cumulative});//,'subsubject'
				myRenderer.rendererGrid(result,"result",fonctions);}
			
			
			
		});//ROW:["region","subregion","country","domain","incomes","indicator"],COLS:["year"]
		myToolbar.display();
		var mydata=[];
		var myrows=[];//"region","subregion","country","domain","incomes","indicator","year"];
		var mycols=[];
		for(var i in mydatad3s.data)
		{
			if (i>50){break;}
			var tmp={}
			for(var j in mydatad3s.metadata.dsd.columns){tmp[mydatad3s.metadata.dsd.columns[j].id]=mydatad3s.data[i][j];}

			mydata.push(tmp);
		}



		var fonctionsNoCum={
getValue:function(rec){
				//console.log(rec);
				return rec.value;},
aggregator:function(cell){
				var a= jStat(cell);
				return this.formater(a.sum());},
cumulative:false,
formater:function(e){return Math.floor(e*100)/100}
		}



		//cumulative sum function
		var fonctionsCum={
getValue:function(entry,rec){

				if(entry === undefined){entry={sum:rec.value,num:1}}
				else{entry.sum+=rec.value;entry.num++;}
				return entry;},
aggregator:function(cell){
				return this.formater(cell.sum)},
cumulative:true,
formater:function(e){return Math.floor(e*100)/100}

		}

		var fonctions=fonctionsCum;






		optGr=myToolbar.getConfigCOLROW();

		var result = myPivotator.pivot(mydata,optGr.ROWS, optGr.COLS, {myfunction:fonctions.getValue,cumulative:fonctions.cumulative});//,'subsubject'

		myRenderer.rendererGrid(result,"result",fonctions);
*/
	});
});

