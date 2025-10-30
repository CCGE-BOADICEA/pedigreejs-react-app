/**
/* © 2024 University of Cambridge. All rights reserved.  
**/
import React from 'react';
import { pedigreejs, pedigreejs_zooming, pedigreejs_pedcache, pedigreejs_io } from "./pedigreejs.es.v4.0.0-rc1";


export class PedigreeJS extends React.Component {

	constructor() {
	  super();
	  const w = window.innerWidth;
	  const h = window.innerHeight;
	  this.opts = {
		'targetDiv': 'pedigreejs',
		'btn_target': 'pedigree_history',
		'width': (w > 800 ? 700: w - 50),
		'height': h*0.6,
		'symbol_size': 30,
		'font_size': '.75em',
		'edit': false,
		'zoomIn': .5,
		'zoomOut': 1.5,
		'zoomSrc':  ['wheel', 'button'] ,
		'labels': [['age', 'yob']],
		'diseases': [	{'type': 'breast_cancer', 'colour': '#F68F35'},
						{'type': 'breast_cancer2', 'colour': 'pink'},
						{'type': 'ovarian_cancer', 'colour': '#4DAA4D'},
						{'type': 'pancreatic_cancer', 'colour': '#4289BA'},
						{'type': 'prostate_cancer', 'colour': '#D5494A'}],
		'DEBUG': false};
	}

	componentDidMount() {
		showPedigree(this.opts);
	}

	render() {
	    const opts = this.opts;
		let local_dataset = pedigreejs_pedcache.current(opts);
		if (local_dataset !== undefined && local_dataset !== null) {
			opts.dataset = local_dataset;
		} else {
			const canRiskData =
			    '##CanRisk 3.0\n'+
				'##FamID\tName\tTarget\tIndivID\tFathID\tMothID\tSex\tMZtwin\tDead\tAge\tYob\tBC1\tBC2\tOC\tPRO\tPAN\tAshkn\tBRCA1\tBRCA2\tPALB2\tATM\tCHEK2\tBARD1\tRAD51D\tRAD51C\tBRIP1\tER:PR:HER2:CK14:CK56\n'+
				'XFAM\t0\t0\tgrandma\t0\t0\tF\t0\t1\t85\t1933\t55\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t1\t0\tgrandpa\t0\t0\tM\t0\t1\t88\t1930\t0\t0\t0\t71\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t2\t0\tparent1\t0\t0\tF\t0\t0\t50\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t3\t0\tparent2\tgrandpa\tgrandma\tM\t0\t0\t60\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t4\t0\tparent3\tgrandpa\tgrandma\tF\t0\t0\t55\t0\t53\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t5\t0\tparent4\t0\t0\tM\t0\t0\t60\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t6\t0\tchild1\tparent2\tparent1\tF\t0\t0\t40\t0\t40\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t7\t0\tchild2\tparent2\tparent1\tF\t0\t0\t38\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t8\t0\tchild3\tparent2\tparent1\tF\t0\t0\t36\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t9\t0\tchild4\tparent2\tparent1\tM\t0\t0\t36\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t10\t0\tchild5\tparent2\tparent1\tF\t0\t0\t36\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t11\t0\tchild6\tparent2\tparent1\tM\t0\t0\t36\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t12\t1\tchild7\tparent4\tparent3\tF\t0\t0\t25\t2000\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t13\t0\tchild8\tparent4\tparent3\tF\t0\t0\t38\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t14\t0\tchild9\tparent4\tparent3\tF\t0\t0\t23\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t15\t0\tchild10\tparent2\tparent1\tM\t0\t0\t35\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t16\t0\tchild11\tparent4\tparent3\tF\t0\t0\t28\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t17\t0\tchild12\tchild10\tchild11\tM\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t18\t0\tchild13\tchild10\tchild11\tF\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t19\t0\tchild14\tchild10\tchild11\tM\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0\n'+
				'XFAM\t20\t0\tchild15\tchild10\tchild11\tF\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0\t0:0:0:0:0'
			pedigreejs_io.load_data(canRiskData, opts)
		}

		return (
			<>
				<div id="pedigree_history" className="p-2"></div>
				<div key="tree" id="pedigree"></div>
			</>
	    )
	}
}

/** Show pedigreejs **/
const showPedigree = (opts) => {
	const p = document.getElementById("pedigreejs");
	const ped = document.getElementById("pedigree");
	if(!p && ped){
		const p = document.createElement('div');
		p.id = 'pedigreejs';
		ped.appendChild(p); 
		pedigreejs_load(opts);
	}
	const refresh = document.getElementsByClassName("fa-refresh");
	if(refresh) refresh[0].style.display = "none";
}

const pedigreejs_load = (opts) => {
	try {
		pedigreejs.rebuild(opts);
		pedigreejs_zooming.scale_to_fit(opts);
	} catch(e) {
		let msg;
		if (typeof e === "string") {
			msg = e.toUpperCase();
		} else if (e instanceof Error) {
			msg = e.message;
		}
		console.error("PedigreeJS ::: "+msg, e);
	}
};
