(this["webpackJsonplender-filter"]=this["webpackJsonplender-filter"]||[]).push([[0],{100:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},101:function(e,t,a){},114:function(e,t,a){},139:function(e,t,a){},142:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),l=a(10),_=a.n(l),s=(a(99),a(14)),i=a(15),c=a(19),o=a(16),u=a(17),d=(a(100),a(101),a(46)),m=a(147),E=a(84),p=a(201),h=a(80),O=a(203),b="http://127.0.0.1:8000";var v=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).selectLenderEvent=e.selectLenderEvent.bind(Object(c.a)(e)),e.selectTierEvent=e.selectTierEvent.bind(Object(c.a)(e)),e.state=e.filterBeginningState(),e}return Object(i.a)(a,[{key:"textfieldsBeginningState",value:function(){return{selectedTierIndex:0,currencyFields:{Payment:{value:"",error:!1},"Down Payment":{value:"",error:!1},"Trade Allowance":{value:"",error:!1},"Trade Payoff":{value:"",error:!1},"Trace a.c.v":{value:"",error:!1}},percentageFields:{Tax:{value:null,error:!1}}}}},{key:"filterBeginningState",value:function(){var e=Object(d.a)({selectedLenderIndex:0,selectedLenderImage:null,allLenderNames:[],tierMenuItems:[]},this.textfieldsBeginningState(),{isTierSelectEnabled:!1,isTextFieldsEnabled:!1,lenderMenuItems:[],selectedTierIndex:0,allTierNames:[]});return e.tierMenuItems.push(r.createElement(E.a,{key:"tier_please_select_item",value:0},"Please select tier")),e}},{key:"componentWillReceiveProps",value:function(e){for(var t=[],a=[],n=0;n<e.lenders.length;n++){var l=e.lenders[n];t.push(r.createElement(E.a,{key:"lender_name_"+n,value:n+1},l.name)),a.push(l.name)}this.setState({lenderMenuItems:t,allLenderNames:a})}},{key:"textboxOnChange",value:function(e,t){var a=e.target.value,r=isNaN(a);if(console.log(r),t in this.state.currencyFields){var n=Object(d.a)({},this.state.currencyFields);n[t]={value:a,error:r},this.setState({currencyFields:n})}else if(t in this.state.percentageFields){var l=Object(d.a)({},this.state.percentageFields);l[t]={value:a,error:r},this.setState({percentageFields:l})}}},{key:"selectLenderEvent",value:function(e){var t=e.target.value,a=t-1,n={};if(n.selectedLenderIndex=t,!(0==t)){var l=this.props.lenders[a].id,_=this.props.lenderPrograms.filter((function(e){return e.lender_id==l})).map((function(e){return e.name})),s=[];s.push(r.createElement(E.a,{value:0},"Please select tier"));for(var i=0;i<_.length;i++){var c=i+1;s.push(r.createElement(E.a,{value:c},_[i]))}n.tierMenuItems=s,n.isTierSelectEnabled=!0,n.allTierNames=_}n.selectedTierIndex=0,this.setState(n)}},{key:"selectTierEvent",value:function(e){var t=Object(d.a)({},this.textfieldsBeginningState());t.selectedTierIndex=e.target.value;var a=0==e.target.value;t.isTextFieldsEnabled=!a,this.setState(t)}},{key:"reset",value:function(){this.setState(this.filterBeginningState())}},{key:"render",value:function(){var e=this;return r.createElement(h.a,{container:!0,spacing:5},r.createElement(h.a,{item:!0,xs:12},r.createElement(m.a,{onChange:this.selectLenderEvent,value:this.state.selectedLenderValue,style:{width:"100%"}},this.state.lenderMenuItems)),r.createElement(h.a,{item:!0,xs:12},r.createElement(m.a,{style:{width:"100%"},disabled:!this.state.isTierSelectEnabled,value:this.state.selectedTierIndex,onChange:this.selectTierEvent},this.state.tierMenuItems)),Object.keys(this.state.currencyFields).map((function(t){return r.createElement(h.a,{item:!0,xs:6,sm:3,md:6},r.createElement(p.a,{disabled:!e.state.isTextFieldsEnabled,label:t,variant:"outlined",onChange:function(a){return e.textboxOnChange(a,t)},error:e.state.currencyFields[t].error,helperText:e.state.currencyFields[t].error?"Invalid Value":"",value:e.state.currencyFields[t].value,InputProps:{startAdornment:r.createElement(O.a,{position:"start"},"$")},size:"small"}))})),Object.keys(this.state.percentageFields).map((function(t){return r.createElement(h.a,{item:!0,xs:6,sm:3,md:6},r.createElement(p.a,{disabled:!e.state.isTextFieldsEnabled,label:t,variant:"outlined",onChange:function(a){return e.textboxOnChange(a,t)},error:e.state.percentageFields[t].error,helperText:e.state.percentageFields[t].error?"Invalid Value":"",value:e.state.percentageFields[t].value,InputProps:{startAdornment:r.createElement(O.a,{position:"start"},"%")},size:"small"}))})))}}]),a}(r.Component),f=a(60),D=a.n(f),C=a(61),g=a(71),P=a(192),T=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).clearFiltersOnClick=e.clearFiltersOnClick.bind(Object(c.a)(e)),e.lenderFilter1=r.createRef(),e.lenderFilter2=r.createRef(),e.lenderFilter3=r.createRef(),e.state={lenders:[],lenderPrograms:[],lenderTerms:[]},Promise.all([fetch("".concat(b,"/lenders/")),fetch("".concat(b,"/lenders/programs/")),fetch("".concat(b,"/lenders/terms/"))]).then(function(){var e=Object(g.a)(D.a.mark((function e(t){var a,r,n,l,_,s,i;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(C.a)(t,3),r=a[0],n=a[1],l=a[2],e.next=3,r.json();case 3:return _=e.sent,e.next=6,n.json();case 6:return s=e.sent,e.next=9,l.json();case 9:return i=e.sent,e.abrupt("return",[_,s,i]);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(t){var a=Object(C.a)(t,3),r=a[0],n=a[1],l=a[2];e.setState({lenders:r,lenderPrograms:n,lenderTerms:l})})),e}return Object(i.a)(a,[{key:"clearFiltersOnClick",value:function(e){this.lenderFilter1.current.reset(),this.lenderFilter2.current.reset(),this.lenderFilter3.current.reset()}},{key:"getFiltersInputs",value:function(){return[this.lenderFilter1.current.state,this.lenderFilter2.current.state,this.lenderFilter3.current.state]}},{key:"getLenderData",value:function(){return[this.state.lenders,this.state.lenderPrograms,this.state.lenderTerms]}},{key:"render",value:function(){return r.createElement(r.Fragment,null,r.createElement(h.a,{container:!0,direction:"row",spacing:4},r.createElement(h.a,{item:!0,xs:12,style:{textAlign:"center"}},r.createElement(P.a,{variant:"contained",color:"secondary",onClick:this.clearFiltersOnClick},"Clear Filters")),r.createElement(h.a,{item:!0,xs:12},"Customer Name:"),r.createElement(h.a,{item:!0,xl:4},r.createElement(v,{ref:this.lenderFilter1,lenders:this.state.lenders,lenderPrograms:this.state.lenderPrograms,lenderTerms:this.state.lenderTerms})),r.createElement(h.a,{item:!0,xl:4},r.createElement(v,{ref:this.lenderFilter2,lenders:this.state.lenders,lenderPrograms:this.state.lenderPrograms,lenderTerms:this.state.lenderTerms})),r.createElement(h.a,{item:!0,xl:4},r.createElement(v,{ref:this.lenderFilter3,lenders:this.state.lenders,lenderPrograms:this.state.lenderPrograms,lenderTerms:this.state.lenderTerms})),r.createElement(h.a,{item:!0,xs:12,style:{textAlign:"center"}},r.createElement(P.a,{variant:"contained",color:"primary",onClick:this.props.submitOnClick},"Submit"))))}}]),a}(r.Component),M=a(72),y=a(193),I=a(194),k=a(81),x=a(145),L=a(144),B=a(56),R=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.createElement(B.a,{style:{padding:"20px",backgroundColor:"rgb(247, 248, 248)"}},r.createElement(k.a,null,this.props.details.map((function(e){return"TITLE"==e.name?r.createElement(L.a,null,r.createElement(x.a,{colSpan:2,style:{textAlign:"center"}},r.createElement("b",{style:{fontSize:"1.2rem"}},e.value))):r.createElement(L.a,null,r.createElement(x.a,{style:{padding:"0px"}},r.createElement("b",null,e.name)),r.createElement(x.a,{style:{padding:"0px"}},e.value))}))))}}]),a}(r.Component),U=a(73),F=a(75),A=a.n(F),W=(a(113),a(114),function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.createElement(A.a,{items:this.props.images,showPlayButton:!1,showFullscreenButton:!1})}}]),a}(r.Component)),w=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.createElement(r.Fragment,null,r.createElement(h.a,{container:!0,spacing:1},r.createElement(h.a,{item:!0,xs:6,md:2,lg:2},r.createElement(P.a,{variant:"contained",color:"primary",style:{width:"100%"}},"Save")),r.createElement(h.a,{item:!0,xs:6,md:2,lg:2},r.createElement(P.a,{variant:"contained",color:"primary",style:{width:"100%"}},"Pictures")),r.createElement(h.a,{item:!0,xs:6,md:2,lg:2},r.createElement(P.a,{variant:"contained",color:"primary",style:{width:"100%"}},"Breakdown")),r.createElement(h.a,{item:!0,xs:6,md:2,lg:2},r.createElement(P.a,{variant:"contained",color:"primary",style:{width:"100%"}},"Send"))))}}]),a}(r.Component),K=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"excludeCarDetailFields",value:function(e){return["id","images","img_url","total_cost","x_clean","clean","average","rough"].includes(e)}},{key:"convertToCarDetails",value:function(e){var t=[];for(var a in e)this.excludeCarDetailFields(a)||t.push({name:a.toUpperCase(),value:e[a]});return t}},{key:"render",value:function(){return r.createElement(y.a,{style:{width:"100%"}},r.createElement(I.a,null,r.createElement(h.a,{container:!0,spacing:2},r.createElement(h.a,{item:!0,xs:12,lg:7},r.createElement(W,{images:this.props.images})),r.createElement(h.a,{item:!0,xs:12,lg:5},r.createElement(R,{details:this.convertToCarDetails(this.props.details)})),r.createElement(h.a,{item:!0,xs:12},r.createElement(U.a,{filtersInputs:this.props.filtersInputs,lenderData:this.props.lenderData,details:this.props.details})),r.createElement(h.a,{item:!0,xs:12},r.createElement(w,null)))))}}]),a}(r.Component),j=a(8),S=a(77);a(139);function N(){var e=Object(M.a)(["\n    border-color:rgb(55,71,172);\n    position:absolute;\n    border-bottom-color:transparent;\n    top:50%;\n"]);return N=function(){return e},e}var q=Object(j.css)(N()),H=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).state={carShowElements:[],isLoading:!1},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.updateCars(this.props.filtersInputs,null)}},{key:"updateCars",value:function(e,t){var a=this;this.setState({isLoading:!0}),fetch("".concat(b,"/cars/")).then((function(e){return e.json()})).then((function(n){for(var l=[],_=0;_<n.length;_++){var s=n[_],i=a.getCarImages(n[_]);l.push(r.createElement(h.a,{item:!0,xs:12,xl:6},r.createElement(K,{details:s,images:i,filtersInputs:e,lenderData:t})))}a.setState({carShowElements:l,isLoading:!1})}))}},{key:"componentWillReceiveProps",value:function(e){this.updateCars(e.filtersInputs,e.lenderData)}},{key:"getCarImages",value:function(e){for(var t=[],a=0;a<e.images.length;a++){var r=e.images[a].src;console.log(r),t.push({original:r,thumbnail:r})}return t}},{key:"render",value:function(){return r.createElement(h.a,{container:!0,spacing:4,className:"car-show-grid ".concat(this.state.isLoading?"loading":"")},this.state.isLoading?r.createElement("div",{className:"spinner"},r.createElement(S.ClipLoader,{css:q})):this.state.carShowElements)}}]),a}(r.Component),V=a(195),z=a(200),Q=a(196),$=a(26),G=a(146),J=a(199),X=a(202),Y=a(78),Z=a.n(Y),ee=a(197),te=a(198),ae=a(79),re=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).carshowRef=n.a.createRef(),e.lendersFilter=n.a.createRef(),e.filterOnClick=e.filterOnClick.bind(Object(c.a)(e)),e.submitOnclick=e.submitOnclick.bind(Object(c.a)(e)),e.menuBtnOnClick=e.menuBtnOnClick.bind(Object(c.a)(e)),e.closeMenu=e.closeMenu.bind(Object(c.a)(e)),e.state={displayFilters:!1,displayCarShow:!0,anchorEl:null,filtersInputs:[]},e}return Object(i.a)(a,[{key:"filterOnClick",value:function(e){console.log("Filter"),this.setState({displayFilters:!this.state.displayFilters})}},{key:"submitOnclick",value:function(){this.setState({displayFilters:!1,displayCarShow:!0,filtersInputs:this.lendersFilter.current.getFiltersInputs(),lenderData:this.lendersFilter.current.getLenderData()}),window.scrollTo(0,0)}},{key:"menuBtnOnClick",value:function(e){this.setState({anchorEl:e.currentTarget})}},{key:"closeMenu",value:function(){this.setState({anchorEl:null})}},{key:"render",value:function(){return n.a.createElement(h.a,{container:!0,style:{backgroundColor:"rgb(247,248,248)"}},n.a.createElement(h.a,{item:!0,xl:1,xs:0}),n.a.createElement(h.a,{item:!0,xl:10,xs:12},n.a.createElement(V.a,{position:"static"},this.props.isBigScreen?n.a.createElement(n.a.Fragment,null,n.a.createElement(z.a,null,n.a.createElement(Q.a,{label:"Home"}),n.a.createElement(Q.a,{label:"Rate Sheet",disabled:!0}),n.a.createElement(Q.a,{label:"Quick Quote",disabled:!0}),n.a.createElement(Q.a,{label:"Lender Assist",disabled:!0}))):n.a.createElement(ee.a,null,n.a.createElement(te.a,{"aria-label":"menu","aria-controls":"menu-appbar","aria-haspopup":"true",style:{color:"white"},onClick:this.menuBtnOnClick},n.a.createElement(Z.a,null)),n.a.createElement(ae.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:Boolean(this.state.anchorEl),onClose:this.closeMenu},n.a.createElement(E.a,null,"HOME"),n.a.createElement(E.a,null,"RATE SHEET"),n.a.createElement(E.a,null,"QUICK QUOTE"),n.a.createElement(E.a,null,"LENDER ASSIST"))))),n.a.createElement(h.a,{item:!0,xl:1,xs:0}),n.a.createElement(h.a,{item:!0,xl:1,xs:0}),n.a.createElement(h.a,{item:!0,xl:10,xs:12},n.a.createElement(h.a,{container:!0},n.a.createElement(h.a,{item:!0,lg:12,xs:12},n.a.createElement(h.a,{container:!0,spacing:2},this.state.displayCarShow?n.a.createElement(n.a.Fragment,null,n.a.createElement(h.a,{item:!0,xs:12,sm:4,lg:2,style:{textAlign:"center"}},n.a.createElement(m.a,{value:0},n.a.createElement(E.a,{value:0},"Sort by (choose)"))),n.a.createElement(h.a,{item:!0,xs:12,sm:4,lg:2,style:{textAlign:"center"}},n.a.createElement(m.a,{value:0},n.a.createElement(E.a,{value:0},"Sort by (choose)"))),n.a.createElement(h.a,{item:!0,xs:12,sm:4,lg:2,style:{textAlign:"center"}},n.a.createElement(m.a,{value:0},n.a.createElement(E.a,{value:0},"Sort by (choose)"))),n.a.createElement(h.a,{item:!0,xs:12,sm:4,lg:2,style:{textAlign:"center"}},n.a.createElement(J.a,{onClick:this.filterOnClick,selected:this.state.displayFilters},n.a.createElement(X.a,null),"  Filter"))):null,n.a.createElement(h.a,{item:!0,xs:12,style:{marginTop:"16px",marginBottom:"16px",display:this.state.displayFilters?"":"none"}},n.a.createElement(B.a,{style:{padding:"10px"}},n.a.createElement(T,{ref:this.lendersFilter,submitOnClick:this.submitOnclick}))),this.state.displayCarShow?n.a.createElement(h.a,{item:!0,xs:12},n.a.createElement(H,{ref:this.carshowRef,filtersInputs:this.state.filtersInputs,lenderData:this.state.lenderData})):null)))),n.a.createElement(h.a,{item:!0,xl:1,xs:0}))}}]),a}(n.a.Component),ne=function(e){var t=Object($.a)(),a=Object(G.a)(t.breakpoints.up("md"));return n.a.createElement(re,{isBigScreen:a})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));_.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(ne,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},73:function(module,__webpack_exports__,__webpack_require__){"use strict";var _Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(74),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(14),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(15),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(19),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(16),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(17),react__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__),_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(81),_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(144),_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(82),_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(145),_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(56),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(26),_material_ui_core_useMediaQuery__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(146),_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(80),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(4),_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(147),_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(84),StyledTableCell=Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_15__.a)((function(e){return{head:{backgroundColor:e.palette.primary.main,color:e.palette.common.white},body:{fontSize:14}}}))(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_10__.a),StyledTableRow=Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_15__.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.background.default}}}}))(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_8__.a),CarCalculation=function(e){var t=Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12__.a)(),a=Object(_material_ui_core_useMediaQuery__WEBPACK_IMPORTED_MODULE_13__.a)(t.breakpoints.up("md"));return react__WEBPACK_IMPORTED_MODULE_6__.createElement(CarCalculationClass,Object.assign({isBigScreen:a},e))},CarCalculationClass=function(_React$Component){Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__.a)(CarCalculationClass,_React$Component);var _super=Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__.a)(CarCalculationClass);function CarCalculationClass(){var e;return Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__.a)(this,CarCalculationClass),(e=_super.call(this)).calculationDetailsColumnHeaders=["Lender","Tier","Advance","Interest","Term","Payment","Back","Front","Profit"],e.state={calculationDetailsValues:[],interests:[-1,-1,-1]},e.selectInterestEvent=e.selectInterestEvent.bind(Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__.a)(e)),e}return Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__.a)(CarCalculationClass,[{key:"componentWillReceiveProps",value:function(e){for(var t=[],a=0;a<e.filtersInputs.length;a++)t.push(-1);this.setState({calculationDetailsValues:this.createCalculationDetails(t,e.filtersInputs,e.lenderData,e.details)})}},{key:"createCalculationDetails",value:function(e,t,a,r){for(var n=[],l=0;l<t.length;l++){var _=t[l];this.isValidFilterInputs(_)&&n.push(this.createCalculationDetail(e[l],_,a,r))}return n}},{key:"isValidFilterInputs",value:function(e){return 0!=e.selectedLenderIndex&&0!=e.selectedTierIndex}},{key:"createCalculationDetail",value:function(e,t,a,r){console.log(t),console.log(r);var n=a[0],l=a[1],_=a[2],s=t.allLenderNames[t.selectedLenderIndex-1],i=t.allTierNames[t.selectedTierIndex-1];console.log("lenderName="+s);var c="NOT_FOUND",o="NOT_FOUND",u="NOT_FOUND",d=null,m=null,E=this.getLenderId(s,n);if(console.log("lenderId="+E),null!=E){for(var p=0;p<l.length;p++){var h=l[p];if(h.lender_id==E&&h.name==i){m=h,isNaN(h.advance)||(c=parseFloat(h.advance));var O=parseFloat(h.rate_min),b=parseFloat(h.rate_max);o="";for(var v=O;v<b;v+=1)o+=v+",";o+=b;break}}var f=1.60934*parseFloat(r.mileage);console.log("carKms="+f);for(var D=0;D<_.length;D++){var C=_[D];if(C.lender_id==E&&C.min_kms<=f&&C.max_kms>=f&&C.year==parseInt(r.year)){console.log("min_kms="+C.min_kms),console.log("max_kms="+C.max_kms),u=C.term,d=C;break}}}var g=parseFloat(t.currencyFields.Payment.value),P="NOT_FOUND";if(null!=d&&"NOT_FOUND"!=c)switch(d.type.replace(/\s/g,"").toLowerCase()){case"x-clean":P=r.x_clean*c-r.total_cost;break;case"clean":P=r.clean*c-r.total_cost;break;case"average":P=r.average*c-r.total_cost;break;case"rough":P=r.rough*c-r.total_cost}var T="NOT_FOUND";if(-1!=e){var M=this.pv((e/100+0+0)/12,u,-g,0)*(1-m.hold_back),y=0;isNaN(t.currencyFields["Trade Allowance"].value)||(y=parseFloat(t.currencyFields["Trade Allowance"].value));var I=0;isNaN(t.currencyFields["Trade Payoff"].value)||(I=parseFloat(t.currencyFields["Trade Payoff"].value));var k=0;isNaN(t.currencyFields["Down Payment"].value)||(k=parseFloat(t.currencyFields["Down Payment"].value));var x=M-0-0+y-I+k;console.log("paidOut = "+x);var L=parseFloat(t.percentageFields.Tax.value)/100;console.log("userInputTax = "+L);var B=0;isNaN(t.currencyFields["Trace a.c.v"].value)||(B=parseFloat(t.currencyFields["Trace a.c.v"].value));var R=x*(1-L)+B;T=R-r.total_cost<P?R-r.total_cost:P,console.log("netPaid = "+R)}return[s,i,100*c+"%",o,u,"$"+g,"0",P,T]}},{key:"pv",value:function pv(rate,periods,payment,future,type){var type="undefined"===typeof type?0:type;return rate=eval(rate),periods=eval(periods),0===rate?-payment*periods-future:((1-Math.pow(1+rate,periods))/rate*payment*(1+rate*type)-future)/Math.pow(1+rate,periods)}},{key:"getLenderId",value:function(e,t){for(var a=0;a<t.length;a++)if(e==t[a].name)return t[a].id;return null}},{key:"selectInterestEvent",value:function(e,t){var a=e.target.value,r=this.state.interests;r[t]=a,this.setState({interests:r,calculationDetailsValues:this.createCalculationDetails(r,this.props.filtersInputs,this.props.lenderData,this.props.details)})}},{key:"renderWithOneTable",value:function(){var e=this;return react__WEBPACK_IMPORTED_MODULE_6__.createElement(react__WEBPACK_IMPORTED_MODULE_6__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__.a,{style:{backgroundColor:"rgb(247, 248, 248)"}},react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_7__.a,null,react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_9__.a,null,react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableRow,null,this.calculationDetailsColumnHeaders.map((function(e){return react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableCell,null,e)})))),this.state.calculationDetailsValues.map((function(t,a){return react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableRow,null,t.map((function(t,r){if(3==r){var n=[];return n.push(react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_17__.a,{value:-1},"Please select interest")),t.split(",").forEach((function(e,t){n.push(react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_17__.a,{value:e},e," %"))})),react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableCell,null,react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_16__.a,{onChange:function(t){return e.selectInterestEvent(t,a)},value:e.state.interests[a]},n))}return react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableCell,null,t)})))})))))}},{key:"renderWithThreeTables",value:function(){var e,t=this,a=[],r=Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__.a)(this.state.calculationDetailsValues);try{for(r.s();!(e=r.n()).done;){var n=e.value;a.push(react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__.a,{item:!0,xs:12},react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__.a,{style:{backgroundColor:"rgb(247, 248, 248)"}},react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_7__.a,null,react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_9__.a,null,react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableRow,null,react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableCell,null,"Name"),react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableCell,null,"Value"))),n.map((function(e,a){return react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableRow,null,react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableCell,null,t.calculationDetailsColumnHeaders[a]),react__WEBPACK_IMPORTED_MODULE_6__.createElement(StyledTableCell,null,e))}))))))}}catch(l){r.e(l)}finally{r.f()}return react__WEBPACK_IMPORTED_MODULE_6__.createElement(react__WEBPACK_IMPORTED_MODULE_6__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_6__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_14__.a,{container:!0,spacing:4},a))}},{key:"render",value:function(){return void 0!=this.props.filtersInputs&&this.props.filtersInputs.length>0?this.props.isBigScreen?this.renderWithOneTable():this.renderWithThreeTables():null}}]),CarCalculationClass}(react__WEBPACK_IMPORTED_MODULE_6__.Component);__webpack_exports__.a=CarCalculation},94:function(e,t,a){e.exports=a(142)},99:function(e,t,a){}},[[94,1,2]]]);
//# sourceMappingURL=main.cea5b45f.chunk.js.map