(this["webpackJsonplender-filter"]=this["webpackJsonplender-filter"]||[]).push([[0],{67:function(e,t,a){e.exports=a(87)},72:function(e,t,a){},73:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},74:function(e,t,a){},86:function(e,t,a){},87:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(8),i=a.n(l),c=(a(72),a(12)),s=a(13),o=a(14),m=a(15),u=(a(73),a(74),a(34)),d=a(28),h=a(138),p=a(140),E=a(128),g=a(142),v=a(141),b=a(144),w=function(e){Object(m.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).createTestData(),e.selectLenderEvent=e.selectLenderEvent.bind(Object(d.a)(e)),e.selectTierEvent=e.selectTierEvent.bind(Object(d.a)(e)),e}return Object(s.a)(a,[{key:"beginningState",value:function(){var e={selectedLenderValue:0,selectedLenderImage:null,tierMenuItems:[],selectedTierIndex:0,currencyFields:{payment:"","down payment":"","trade allowance":"","trade payoff":"","trace a.c.v":""},percentageFields:{tax:""}};return e.tierMenuItems.push(n.createElement(p.a,{key:"tier_please_select_item",value:0},"Please select tier")),e}},{key:"createTestData",value:function(){this.state=this.beginningState(),this.lenders=[{name:"Axis Auto Leasing",img:"https://mma.prnewswire.com/media/969479/Axis_Auto_Finance_Inc__Axis_Auto_Finance_Enters_Into_a_Strategic.jpg",tiers:["TIER 1","TIER 2","TIER 3","TIER4"]},{name:"iA Auto Finance",img:"https://cdn.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://loanscanada.ca/wp-content/uploads/2020/03/iA-Auto-Finance.png",tiers:["1ST GEAR","2ND GEAR","3RD GEAR","4TH GEAR","5TH GEAR","6TH GEAR"]},{name:"CARFINCO",img:"https://images.squarespace-cdn.com/content/59b814e6cd0f68f94fd5bed9/1511197285297-ER8U6EX93C27S751M4VX/carfinco-logo.png",tiers:["TIER 1","TIER 2","TIER 3","TIER 4","TIER 5","TIER 6","TIER 7","TIER 8"]}],this.lenderMenuItems=[],this.lenderMenuItems.push(n.createElement(p.a,{key:"please_select_item",value:0},"Please select"));for(var e=0;e<this.lenders.length;e++){var t=this.lenders[e];this.lenderMenuItems.push(n.createElement(p.a,{key:"lender_name_"+e,value:e+1},t.name))}}},{key:"textboxOnChange",value:function(e,t){var a=e.target.value;if(console.log(t),console.log(this.state),t in this.state.currencyFields){this.state.currencyFields[t]=a;var n=Object(u.a)({},this.state.currencyFields);n[t]=a,this.setState({currencyFields:n})}else if(t in this.state.percentageFields){this.state.percentageFields[t]=a;var r=Object(u.a)({},this.state.percentageFields);r[t]=a,this.setState({percentageFields:r})}}},{key:"selectLenderEvent",value:function(e){var t=e.target.value,a=t-1,r={};r.selectedLenderValue=t;var l=0==t;if(r.selectedLenderImage=l?null:this.lenders[a].img,!l){var i=[],c=this.lenders[a].tiers;i.push(n.createElement(p.a,{value:0},"Please select tier"));for(var s=0;s<c.length;s++){var o=s+1;i.push(n.createElement(p.a,{value:o},c[s]))}r.tierMenuItems=i}r.selectedTierIndex=0,this.setState(r)}},{key:"selectTierEvent",value:function(e){var t={};t.selectedTierIndex=e.target.value,this.setState(t)}},{key:"reset",value:function(e){this.setState(this.beginningState())}},{key:"render",value:function(){var e=this;return n.createElement(E.a,{container:!0,spacing:2},n.createElement(E.a,{item:!0,xs:12},n.createElement(h.a,{onChange:this.selectLenderEvent,value:this.state.selectedLenderValue,style:{width:"100%"}},this.lenderMenuItems)),n.createElement(E.a,{item:!0,xs:12,style:{textAlign:"center"}},n.createElement("img",Object.assign({src:this.state.selectedLenderImage},null==this.state.selectedLenderImage?{style:{width:"150px",height:"150px",visibility:"hidden"}}:{style:{width:"150px",height:"150px"}}))),n.createElement(E.a,{item:!0,xs:12},n.createElement(h.a,{style:{width:"100%"},value:this.state.selectedTierIndex,onChange:this.selectTierEvent},this.state.tierMenuItems)),Object.keys(this.state.currencyFields).map((function(t){return n.createElement(E.a,{item:!0,sm:3,lg:12},n.createElement(g.a,null,t),n.createElement(b.a,{onChange:function(a){return e.textboxOnChange(a,t)},value:e.state.currencyFields[t],startAdornment:n.createElement(v.a,{position:"start"},"$")}))})),Object.keys(this.state.percentageFields).map((function(t){return n.createElement(E.a,{item:!0,sm:3,lg:12},n.createElement(g.a,null,t),n.createElement(b.a,{onChange:function(a){return e.textboxOnChange(a,t)},value:e.state.percentageFields[t],startAdornment:n.createElement(v.a,{position:"start"},"%")}))})))}}]),a}(n.Component),f=a(129),x=function(e){Object(m.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).clearFiltersOnClick=e.clearFiltersOnClick.bind(Object(d.a)(e)),e.lenderFilter1=n.createRef(),e.lenderFilter2=n.createRef(),e.lenderFilter3=n.createRef(),e}return Object(s.a)(a,[{key:"clearFiltersOnClick",value:function(e){this.lenderFilter1.current.reset(),this.lenderFilter2.current.reset(),this.lenderFilter3.current.reset()}},{key:"render",value:function(){return n.createElement(n.Fragment,null,n.createElement(E.a,{container:!0,direction:"row",spacing:4},n.createElement(E.a,{item:!0,xs:12,style:{textAlign:"center"}},n.createElement(f.a,{variant:"contained",style:Object(u.a)({},y.btnStyle),onClick:this.clearFiltersOnClick},"Clear Filters")),n.createElement(E.a,{item:!0,xs:12},"Customer Name:"),n.createElement(E.a,{item:!0,xl:4},n.createElement(w,{ref:this.lenderFilter1})),n.createElement(E.a,{item:!0,xl:4},n.createElement(w,{ref:this.lenderFilter2})),n.createElement(E.a,{item:!0,xl:4},n.createElement(w,{ref:this.lenderFilter3})),n.createElement(E.a,{item:!0,xs:12,style:{textAlign:"center"}},n.createElement(f.a,{variant:"contained",color:"primary",style:Object(u.a)({},y.btnStyle)},"Submit"))))}}]),a}(n.Component),y={btnStyle:{width:"200px",height:"60px",fontSize:"1.3rem"}},j=a(134),O=a(135),k=a(130),_=a(132),I=a(131),R=a(57),F=function(e){Object(m.a)(a,e);var t=Object(o.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return n.createElement(R.a,{style:{padding:"20px",backgroundColor:"rgb(247, 248, 248)"}},n.createElement(k.a,null,this.props.details.map((function(e){return"title"==e.name?n.createElement(I.a,null,n.createElement(_.a,{colSpan:2,style:{textAlign:"center"}},n.createElement("b",{style:{fontSize:"1.2rem"}},e.value))):n.createElement(I.a,null,n.createElement(_.a,{style:{padding:"0px"}},n.createElement("b",null,e.name)),n.createElement(_.a,{style:{padding:"0px"}},e.value))}))))}}]),a}(n.Component),C=a(133),T=function(e){Object(m.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).calculationDetailsColumnHeaders=["Lender","Tier","Advance","Interest","Term","Payment","Back","Front","Profit"],e.calculationDetailsColumnValues=[["lender_value","tier_value","1","2","3","4","5","6","7"],["lender_value1","tier_value1","1","2","3","4","5","6","7"],["lender_value2","tier_value2","1","2","3","4","5","6","7"]],e}return Object(s.a)(a,[{key:"render",value:function(){return n.createElement(R.a,{style:{padding:"20px",backgroundColor:"rgb(247, 248, 248)"}},n.createElement(k.a,null,n.createElement(C.a,null,n.createElement(I.a,null,this.calculationDetailsColumnHeaders.map((function(e){return n.createElement(_.a,null,e)})))),this.calculationDetailsColumnValues.map((function(e){return n.createElement(I.a,null,e.map((function(e){return n.createElement(_.a,null,e)})))}))))}}]),a}(n.Component),S=a(56),A=a.n(S),L=(a(85),a(86),[{original:"https://www.dropbox.com/s/0xtbjp3gcm650fy/image_0.png?raw=1",thumbnail:"https://www.dropbox.com/s/0xtbjp3gcm650fy/image_0.png?raw=1"},{original:"https://www.dropbox.com/s/tuj84ho2up1vofh/image_1.png?raw=1",thumbnail:"https://www.dropbox.com/s/tuj84ho2up1vofh/image_1.png?raw=1"},{original:"https://www.dropbox.com/s/1sa79eyy7og6t51/image_2.png?raw=1",thumbnail:"https://www.dropbox.com/s/1sa79eyy7og6t51/image_2.png?raw=1"},{original:"https://www.dropbox.com/s/nfkkglb0odsu4te/image_3.png?raw=1",thumbnail:"https://www.dropbox.com/s/nfkkglb0odsu4te/image_3.png?raw=1"},{original:"https://www.dropbox.com/s/2vq1cj46oot8kf2/image_4.png?raw=1",thumbnail:"https://www.dropbox.com/s/2vq1cj46oot8kf2/image_4.png?raw=1"},{original:"https://www.dropbox.com/s/qvo9jf2ufn0p4kt/image_5.png?raw=1",thumbnail:"https://www.dropbox.com/s/qvo9jf2ufn0p4kt/image_5.png?raw=1"},{original:"https://www.dropbox.com/s/covz2iuq9sz6oe2/image_6.png?raw=1",thumbnail:"https://www.dropbox.com/s/covz2iuq9sz6oe2/image_6.png?raw=1"},{original:"https://www.dropbox.com/s/861x4fx5nl3pdtr/image_7.png?raw=1",thumbnail:"https://www.dropbox.com/s/861x4fx5nl3pdtr/image_7.png?raw=1"},{original:"https://www.dropbox.com/s/rf2z9ksajhmjzjj/image_8.png?raw=1",thumbnail:"https://www.dropbox.com/s/rf2z9ksajhmjzjj/image_8.png?raw=1"}]),M=function(e){Object(m.a)(a,e);var t=Object(o.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return n.createElement(A.a,{items:L,showPlayButton:!1,showFullscreenButton:!1,showNav:!1})}}]),a}(n.Component),D=a(21),N=function(e){Object(m.a)(a,e);var t=Object(o.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e,t,a;return n.createElement(n.Fragment,null,n.createElement(E.a,{container:!0,spacing:1},n.createElement(E.a,{item:!0,xs:3},n.createElement(f.a,{variant:"contained",style:{width:"100%"}},"Save")),n.createElement(E.a,(e={item:!0},Object(D.a)(e,"item",!0),Object(D.a)(e,"xs",3),e),n.createElement(f.a,{variant:"contained",style:{width:"100%"}},"Pictures")),n.createElement(E.a,(t={item:!0},Object(D.a)(t,"item",!0),Object(D.a)(t,"xs",3),t),n.createElement(f.a,{variant:"contained",style:{width:"100%"}},"Breakdown")),n.createElement(E.a,(a={item:!0},Object(D.a)(a,"item",!0),Object(D.a)(a,"xs",3),a),n.createElement(f.a,{variant:"contained",style:{width:"100%"}},"Send"))))}}]),a}(n.Component),z=function(e){Object(m.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).details=[{name:"title",value:"2018 CHEVROLET EQUINOX"},{name:"YEAR",value:"2018"},{name:"MAKE",value:"test make"},{name:"MODEL",value:"test make"},{name:"SERIES",value:"test model"},{name:"STYLE",value:"test series"},{name:"DRIVE",value:"test style"},{name:"ENGINE",value:"test engine"},{name:"FUEL",value:"test fuel"},{name:"CYLINDERS",value:"test cylinders"},{name:"TRANS.",value:"test trans"},{name:"DRIVETRAIN",value:"test drivetrain"},{name:"MILEAGE:",value:"test mileage"},{name:"EXT. COLOR",value:"test ext color"},{name:"INT.COLOR",value:"test int color"},{name:"TYPE",value:"test type"},{name:"STATUS",value:"test status"},{name:"VIN",value:"test vin"}],e}return Object(s.a)(a,[{key:"render",value:function(){return n.createElement(j.a,{style:{width:"100%"}},n.createElement(O.a,null,n.createElement(E.a,{container:!0,spacing:2},n.createElement(E.a,{item:!0,xs:8},n.createElement(M,null)),n.createElement(E.a,{item:!0,xs:4},n.createElement(F,{details:this.details})),n.createElement(E.a,{item:!0,xs:12},n.createElement(T,null)),n.createElement(E.a,{item:!0,xs:12},n.createElement(N,null)))))}}]),a}(n.Component),V=function(e){Object(m.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(c.a)(this,a),(e=t.call(this)).state={carShowElements:[]};for(var r=0;r<20;r++)e.state.carShowElements.push(n.createElement(E.a,{item:!0,xs:12,md:6},n.createElement(z,null)));return e}return Object(s.a)(a,[{key:"render",value:function(){return n.createElement(E.a,{container:!0,spacing:4,style:{maxHeight:"94vh",overflow:"scroll"}},this.state.carShowElements)}}]),a}(n.Component),q=a(136),G=a(139),H=a(137),P=function(e){Object(m.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(c.a)(this,a),(e=t.call(this)).carshowRef=r.a.createRef(),e}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement(E.a,{container:!0,spacing:4},r.a.createElement(E.a,{item:!0,lg:3,sm:12},r.a.createElement("img",{style:{height:"100px"}}),r.a.createElement(x,{carShowRef:this.carshowRef})),r.a.createElement(E.a,{item:!0,lg:9,sm:12},r.a.createElement(E.a,{container:!0,spacing:4,style:{backgroundColor:"rgb(247,248,248)"}},r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(q.a,{position:"static",color:"default"},r.a.createElement(G.a,null,r.a.createElement(H.a,{label:"Home"}),r.a.createElement(H.a,{label:"Rate Sheet",disabled:!0}),r.a.createElement(H.a,{label:"Quick Quote",disabled:!0}),r.a.createElement(H.a,{label:"Lender Assist",disabled:!0})))),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(h.a,{value:0},r.a.createElement(p.a,{value:0},"Sort by (choose)")),r.a.createElement(h.a,{value:0,style:{marginLeft:"50px"}},r.a.createElement(p.a,{value:0},"Sort by (choose)")),r.a.createElement(h.a,{value:0,style:{marginLeft:"50px"}},r.a.createElement(p.a,{value:0},"Sort by (choose)"))),r.a.createElement(E.a,{item:!0,xs:12},r.a.createElement(V,{ref:this.carshowRef})))))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[67,1,2]]]);
//# sourceMappingURL=main.9a6b9722.chunk.js.map