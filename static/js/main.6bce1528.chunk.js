(this["webpackJsonplender-filter"]=this["webpackJsonplender-filter"]||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},102:function(e,t,a){},115:function(e,t,a){},140:function(e,t,a){},143:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),l=a(10),_=a.n(l),s=(a(100),a(14)),i=a(15),c=a(19),o=a(16),u=a(17),d=(a(101),a(102),a(48)),m=a(83),E=a(85),p=a(201),O=a(80),h=a(203),v="http://127.0.0.1:8000";var b=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).selectLenderEvent=e.selectLenderEvent.bind(Object(c.a)(e)),e.selectTierEvent=e.selectTierEvent.bind(Object(c.a)(e)),e.state=e.filterBeginningState(),e}return Object(i.a)(a,[{key:"textfieldsBeginningState",value:function(){return{selectedTierIndex:0,currencyFields:{Payment:{value:"",error:!1},"Down Payment":{value:"",error:!1},"Trade Allowance":{value:"",error:!1},"Trade Payoff":{value:"",error:!1},"Trace a.c.v":{value:"",error:!1}},percentageFields:{Tax:{value:null,error:!1}}}}},{key:"hasError",value:function(){var e=this.state.currencyFields,t=this.state.percentageFields;return e.Payment.error||e["Down Payment"].error||e["Trade Allowance"].error||e["Trade Payoff"].error||e["Trace a.c.v"].error||t.Tax.error}},{key:"filterBeginningState",value:function(){var e=Object(d.a)({selectedLenderIndex:0,selectedLenderImage:null,allLenderNames:[],tierMenuItems:[]},this.textfieldsBeginningState(),{isTierSelectEnabled:!1,isTextFieldsEnabled:!1,lenderMenuItems:[],selectedTierIndex:0,allTierNames:[]});return e.tierMenuItems.push(r.createElement(E.a,{key:"tier_please_select_item",value:0},"Please select tier")),e}},{key:"componentWillReceiveProps",value:function(e){for(var t=[],a=[],n=0;n<e.lenders.length;n++){var l=e.lenders[n];t.push(r.createElement(E.a,{key:"lender_name_"+n,value:n+1},l.name)),a.push(l.name)}this.setState({lenderMenuItems:t,allLenderNames:a})}},{key:"textboxOnChange",value:function(e,t){var a=e.target.value,r=isNaN(a);if(console.log(r),t in this.state.currencyFields){var n=Object(d.a)({},this.state.currencyFields);n[t]={value:a,error:r},this.setState({currencyFields:n})}else if(t in this.state.percentageFields){var l=Object(d.a)({},this.state.percentageFields);l[t]={value:a,error:r},this.setState({percentageFields:l})}}},{key:"selectLenderEvent",value:function(e){var t=e.target.value,a=t-1,n={};if(n.selectedLenderIndex=t,!(0==t)){var l=this.props.lenders[a].id,_=this.props.lenderPrograms.filter((function(e){return e.lender_id==l})).map((function(e){return e.name})),s=[];s.push(r.createElement(E.a,{value:0},"Please select tier"));for(var i=0;i<_.length;i++){var c=i+1;s.push(r.createElement(E.a,{value:c},_[i]))}n.tierMenuItems=s,n.isTierSelectEnabled=!0,n.allTierNames=_}n.selectedTierIndex=0,this.setState(n)}},{key:"selectTierEvent",value:function(e){var t=Object(d.a)({},this.textfieldsBeginningState());t.selectedTierIndex=e.target.value;var a=0==e.target.value;t.isTextFieldsEnabled=!a,this.setState(t)}},{key:"reset",value:function(){this.setState(this.filterBeginningState())}},{key:"render",value:function(){var e=this;return r.createElement(O.a,{container:!0,spacing:5},r.createElement(O.a,{item:!0,xs:12},r.createElement(m.a,{onChange:this.selectLenderEvent,value:this.state.selectedLenderValue,style:{width:"100%"}},this.state.lenderMenuItems)),r.createElement(O.a,{item:!0,xs:12},r.createElement(m.a,{style:{width:"100%"},disabled:!this.state.isTierSelectEnabled,value:this.state.selectedTierIndex,onChange:this.selectTierEvent},this.state.tierMenuItems)),Object.keys(this.state.currencyFields).map((function(t){return r.createElement(O.a,{item:!0,xs:6,sm:3,md:6},r.createElement(p.a,{disabled:!e.state.isTextFieldsEnabled,label:t,variant:"outlined",onChange:function(a){return e.textboxOnChange(a,t)},error:e.state.currencyFields[t].error,helperText:e.state.currencyFields[t].error?"Invalid Value":"",value:e.state.currencyFields[t].value,InputProps:{startAdornment:r.createElement(h.a,{position:"start"},"$")},size:"small"}))})),Object.keys(this.state.percentageFields).map((function(t){return r.createElement(O.a,{item:!0,xs:6,sm:3,md:6},r.createElement(p.a,{disabled:!e.state.isTextFieldsEnabled,label:t,variant:"outlined",onChange:function(a){return e.textboxOnChange(a,t)},error:e.state.percentageFields[t].error,helperText:e.state.percentageFields[t].error?"Invalid Value":"",value:e.state.percentageFields[t].value,InputProps:{startAdornment:r.createElement(h.a,{position:"start"},"%")},size:"small"}))})))}}]),a}(r.Component),f=a(62),D=a.n(f),g=a(41),P=a(72),C=a(192),T=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).clearFiltersOnClick=e.clearFiltersOnClick.bind(Object(c.a)(e)),e.lenderFilter1=r.createRef(),e.lenderFilter2=r.createRef(),e.lenderFilter3=r.createRef(),e.state={lenders:[],lenderPrograms:[],lenderTerms:[]},Promise.all([fetch("".concat(v,"/lenders/")),fetch("".concat(v,"/lenders/programs/")),fetch("".concat(v,"/lenders/terms/"))]).then(function(){var e=Object(P.a)(D.a.mark((function e(t){var a,r,n,l,_,s,i;return D.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(g.a)(t,3),r=a[0],n=a[1],l=a[2],e.next=3,r.json();case 3:return _=e.sent,e.next=6,n.json();case 6:return s=e.sent,e.next=9,l.json();case 9:return i=e.sent,e.abrupt("return",[_,s,i]);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(t){var a=Object(g.a)(t,3),r=a[0],n=a[1],l=a[2];e.setState({lenders:r,lenderPrograms:n,lenderTerms:l})})),e}return Object(i.a)(a,[{key:"clearFiltersOnClick",value:function(e){this.lenderFilter1.current.reset(),this.lenderFilter2.current.reset(),this.lenderFilter3.current.reset()}},{key:"getFiltersInputs",value:function(){return[this.lenderFilter1.current.state,this.lenderFilter2.current.state,this.lenderFilter3.current.state]}},{key:"hasError",value:function(){return this.lenderFilter1.current.hasError()||this.lenderFilter2.current.hasError()||this.lenderFilter3.current.hasError()}},{key:"getLenderData",value:function(){return[this.state.lenders,this.state.lenderPrograms,this.state.lenderTerms]}},{key:"render",value:function(){return r.createElement(r.Fragment,null,r.createElement(O.a,{container:!0,direction:"row",spacing:4},r.createElement(O.a,{item:!0,xs:12,style:{textAlign:"center"}},r.createElement(C.a,{variant:"contained",color:"secondary",onClick:this.clearFiltersOnClick},"Clear Filters")),r.createElement(O.a,{item:!0,xs:12},"Customer Name:"),r.createElement(O.a,{item:!0,xl:4},r.createElement(b,{ref:this.lenderFilter1,lenders:this.state.lenders,lenderPrograms:this.state.lenderPrograms,lenderTerms:this.state.lenderTerms})),r.createElement(O.a,{item:!0,xl:4},r.createElement(b,{ref:this.lenderFilter2,lenders:this.state.lenders,lenderPrograms:this.state.lenderPrograms,lenderTerms:this.state.lenderTerms})),r.createElement(O.a,{item:!0,xl:4},r.createElement(b,{ref:this.lenderFilter3,lenders:this.state.lenders,lenderPrograms:this.state.lenderPrograms,lenderTerms:this.state.lenderTerms})),r.createElement(O.a,{item:!0,xs:12,style:{textAlign:"center"}},r.createElement(C.a,{variant:"contained",color:"primary",onClick:this.props.submitOnClick},"Submit"))))}}]),a}(r.Component),M=a(73),y=a(193),I=a(194),k=a(81),U=a(146),L=a(145),F=a(58),A=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.createElement(F.a,{style:{padding:"20px",backgroundColor:"rgb(247, 248, 248)"}},r.createElement(k.a,null,this.props.details.map((function(e){return"TITLE"==e.name?r.createElement(L.a,null,r.createElement(U.a,{colSpan:2,style:{textAlign:"center"}},r.createElement("b",{style:{fontSize:"1.2rem"}},e.value))):r.createElement(L.a,null,r.createElement(U.a,{style:{padding:"0px"}},r.createElement("b",null,e.name)),r.createElement(U.a,{style:{padding:"0px"}},e.value))}))))}}]),a}(r.Component),B=a(74),R=a(75),x=a.n(R),W=(a(114),a(115),function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.createElement(x.a,{items:this.props.images,showPlayButton:!1,showFullscreenButton:!1})}}]),a}(r.Component)),K=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.createElement(r.Fragment,null,r.createElement(O.a,{container:!0,spacing:1},r.createElement(O.a,{item:!0,xs:6,md:2,lg:2},r.createElement(C.a,{variant:"contained",color:"primary",style:{width:"100%"}},"Save")),r.createElement(O.a,{item:!0,xs:6,md:2,lg:2},r.createElement(C.a,{variant:"contained",color:"primary",style:{width:"100%"}},"Pictures")),r.createElement(O.a,{item:!0,xs:6,md:2,lg:2},r.createElement(C.a,{variant:"contained",color:"primary",style:{width:"100%"}},"Breakdown")),r.createElement(O.a,{item:!0,xs:6,md:2,lg:2},r.createElement(C.a,{variant:"contained",color:"primary",style:{width:"100%"}},"Send"))))}}]),a}(r.Component),w=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"excludeCarDetailFields",value:function(e){return["id","images","img_url","total_cost","x_clean","clean","average","rough"].includes(e)}},{key:"convertToCarDetails",value:function(e){var t=[];for(var a in e)this.excludeCarDetailFields(a)||t.push({name:a.toUpperCase(),value:e[a]});return t}},{key:"render",value:function(){return r.createElement(y.a,{style:{width:"100%"}},r.createElement(I.a,null,r.createElement(O.a,{container:!0,spacing:2},r.createElement(O.a,{item:!0,xs:12,lg:7},r.createElement(W,{images:this.props.images})),r.createElement(O.a,{item:!0,xs:12,lg:5},r.createElement(A,{details:this.convertToCarDetails(this.props.details)})),r.createElement(O.a,{item:!0,xs:12},r.createElement(B.a,{filtersInputs:this.props.filtersInputs,lenderData:this.props.lenderData,details:this.props.details})),r.createElement(O.a,{item:!0,xs:12},r.createElement(K,null)))))}}]),a}(r.Component),j=a(8),S=a(77);a(140);function N(){var e=Object(M.a)(["\n    border-color:rgb(55,71,172);\n    position:absolute;\n    border-bottom-color:transparent;\n    top:50%;\n"]);return N=function(){return e},e}var q=Object(j.css)(N()),H=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).state={carShowElements:[],isLoading:!1},e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.updateCars(this.props.filtersInputs,null)}},{key:"updateCars",value:function(e,t){var a=this;this.setState({isLoading:!0}),fetch("".concat(v,"/cars/")).then((function(e){return e.json()})).then((function(n){for(var l=[],_=0;_<n.length;_++){var s=n[_],i=a.getCarImages(n[_]);l.push(r.createElement(O.a,{item:!0,xs:12,xl:6},r.createElement(w,{details:s,images:i,filtersInputs:e,lenderData:t})))}a.setState({carShowElements:l,isLoading:!1})}))}},{key:"componentWillReceiveProps",value:function(e){this.updateCars(e.filtersInputs,e.lenderData)}},{key:"getCarImages",value:function(e){for(var t=[],a=0;a<e.images.length;a++){var r=e.images[a].src;console.log(r),t.push({original:r,thumbnail:r})}return t}},{key:"render",value:function(){return r.createElement(O.a,{container:!0,spacing:4,className:"car-show-grid ".concat(this.state.isLoading?"loading":"")},this.state.isLoading?r.createElement("div",{className:"spinner"},r.createElement(S.ClipLoader,{css:q})):this.state.carShowElements)}}]),a}(r.Component),z=a(195),V=a(200),$=a(196),Q=a(26),G=a(147),J=a(199),X=a(202),Y=a(78),Z=a.n(Y),ee=a(197),te=a(198),ae=a(79),re=function(e){Object(u.a)(a,e);var t=Object(o.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).carshowRef=n.a.createRef(),e.lendersFilter=n.a.createRef(),e.filterOnClick=e.filterOnClick.bind(Object(c.a)(e)),e.submitOnclick=e.submitOnclick.bind(Object(c.a)(e)),e.menuBtnOnClick=e.menuBtnOnClick.bind(Object(c.a)(e)),e.closeMenu=e.closeMenu.bind(Object(c.a)(e)),e.state={displayFilters:!1,displayCarShow:!0,anchorEl:null,filtersInputs:[]},e}return Object(i.a)(a,[{key:"filterOnClick",value:function(e){console.log("Filter"),this.setState({displayFilters:!this.state.displayFilters})}},{key:"submitOnclick",value:function(){this.lendersFilter.current.hasError()||(this.setState({displayFilters:!1,displayCarShow:!0,filtersInputs:this.lendersFilter.current.getFiltersInputs(),lenderData:this.lendersFilter.current.getLenderData()}),window.scrollTo(0,0))}},{key:"menuBtnOnClick",value:function(e){this.setState({anchorEl:e.currentTarget})}},{key:"closeMenu",value:function(){this.setState({anchorEl:null})}},{key:"render",value:function(){return n.a.createElement(O.a,{container:!0,style:{backgroundColor:"rgb(247,248,248)"}},n.a.createElement(O.a,{item:!0,xl:1,xs:0}),n.a.createElement(O.a,{item:!0,xl:10,xs:12},n.a.createElement(z.a,{position:"static"},this.props.isBigScreen?n.a.createElement(n.a.Fragment,null,n.a.createElement(V.a,null,n.a.createElement($.a,{label:"Home"}),n.a.createElement($.a,{label:"Rate Sheet",disabled:!0}),n.a.createElement($.a,{label:"Quick Quote",disabled:!0}),n.a.createElement($.a,{label:"Lender Assist",disabled:!0}))):n.a.createElement(ee.a,null,n.a.createElement(te.a,{"aria-label":"menu","aria-controls":"menu-appbar","aria-haspopup":"true",style:{color:"white"},onClick:this.menuBtnOnClick},n.a.createElement(Z.a,null)),n.a.createElement(ae.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:Boolean(this.state.anchorEl),onClose:this.closeMenu},n.a.createElement(E.a,null,"HOME"),n.a.createElement(E.a,null,"RATE SHEET"),n.a.createElement(E.a,null,"QUICK QUOTE"),n.a.createElement(E.a,null,"LENDER ASSIST"))))),n.a.createElement(O.a,{item:!0,xl:1,xs:0}),n.a.createElement(O.a,{item:!0,xl:1,xs:0}),n.a.createElement(O.a,{item:!0,xl:10,xs:12},n.a.createElement(O.a,{container:!0},n.a.createElement(O.a,{item:!0,lg:12,xs:12},n.a.createElement(O.a,{container:!0,spacing:2},this.state.displayCarShow?n.a.createElement(n.a.Fragment,null,n.a.createElement(O.a,{item:!0,xs:12,sm:4,lg:2,style:{textAlign:"center"}},n.a.createElement(m.a,{value:0},n.a.createElement(E.a,{value:0},"Sort by (choose)"))),n.a.createElement(O.a,{item:!0,xs:12,sm:4,lg:2,style:{textAlign:"center"}},n.a.createElement(m.a,{value:0},n.a.createElement(E.a,{value:0},"Sort by (choose)"))),n.a.createElement(O.a,{item:!0,xs:12,sm:4,lg:2,style:{textAlign:"center"}},n.a.createElement(m.a,{value:0},n.a.createElement(E.a,{value:0},"Sort by (choose)"))),n.a.createElement(O.a,{item:!0,xs:12,sm:4,lg:2,style:{textAlign:"center"}},n.a.createElement(J.a,{onClick:this.filterOnClick,selected:this.state.displayFilters},n.a.createElement(X.a,null),"  Filter"))):null,n.a.createElement(O.a,{item:!0,xs:12,style:{marginTop:"16px",marginBottom:"16px",display:this.state.displayFilters?"":"none"}},n.a.createElement(F.a,{style:{padding:"10px"}},n.a.createElement(T,{ref:this.lendersFilter,submitOnClick:this.submitOnclick}))),this.state.displayCarShow?n.a.createElement(O.a,{item:!0,xs:12},n.a.createElement(H,{ref:this.carshowRef,filtersInputs:this.state.filtersInputs,lenderData:this.state.lenderData})):null)))),n.a.createElement(O.a,{item:!0,xl:1,xs:0}))}}]),a}(n.a.Component),ne=function(e){var t=Object(Q.a)(),a=Object(G.a)(t.breakpoints.up("md"));return n.a.createElement(re,{isBigScreen:a})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));_.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(ne,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},74:function(module,__webpack_exports__,__webpack_require__){"use strict";var _Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(41),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(47),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(14),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(15),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(19),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(16),_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(17),react__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__),_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(81),_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(145),_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(82),_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(146),_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(58),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(26),_material_ui_core_useMediaQuery__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(147),_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(80),_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(4),_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(83),_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(85),StyledTableCell=Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_16__.a)((function(e){return{head:{backgroundColor:e.palette.primary.main,color:e.palette.common.white},body:{fontSize:14}}}))(_material_ui_core_TableCell__WEBPACK_IMPORTED_MODULE_11__.a),StyledTableRow=Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_16__.a)((function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.background.default}}}}))(_material_ui_core_TableRow__WEBPACK_IMPORTED_MODULE_9__.a),CarCalculation=function(e){var t=Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_13__.a)(),a=Object(_material_ui_core_useMediaQuery__WEBPACK_IMPORTED_MODULE_14__.a)(t.breakpoints.up("md"));return react__WEBPACK_IMPORTED_MODULE_7__.createElement(CarCalculationClass,Object.assign({isBigScreen:a},e))},CarCalculationClass=function(_React$Component){Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_6__.a)(CarCalculationClass,_React$Component);var _super=Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_5__.a)(CarCalculationClass);function CarCalculationClass(){var e;return Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_2__.a)(this,CarCalculationClass),(e=_super.call(this)).calculationDetailsColumnHeaders=["Lender","Tier","Advance","Interest","Term","Payment","Back","Front","Profit"],e.state={calculationDetailsValues:[],interests:[-1,-1,-1]},e.selectInterestEvent=e.selectInterestEvent.bind(Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.a)(e)),e}return Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__.a)(CarCalculationClass,[{key:"createCalculationDetails",value:function(e,t,a,r){var n,l=[],_=Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__.a)(t.entries());try{for(_.s();!(n=_.n()).done;){var s=Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(n.value,2),i=s[0],c=s[1];this.isValidFilterInputs(c)&&l.push(this.createCalculationDetail(e[i],c,a,r))}}catch(o){_.e(o)}finally{_.f()}return l}},{key:"isValidFilterInputs",value:function(e){return 0!=e.selectedLenderIndex&&0!=e.selectedTierIndex}},{key:"mileageToKms",value:function(e){return 1.60934*e}},{key:"createCalculationDetail",value:function(e,t,a,r){console.log("createCalculationDetail()"),console.log(e),console.log(t),console.log(a),console.log(r);var n=a[0],l=a[1],_=a[2],s=t.allLenderNames[t.selectedLenderIndex-1],i=t.allTierNames[t.selectedTierIndex-1];console.log("lenderName = "+s),console.log("tierName = "+i);var c="NOT_FOUND",o="NOT_FOUND",u="NOT_FOUND",d=null,m=null,E=this.getLenderId(s,n);if(console.log("lenderId = "+E),null!=E){var p,O=Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__.a)(l);try{for(O.s();!(p=O.n()).done;){var h=p.value;if(h.lender_id==E&&h.name==i){m=h,isNaN(h.advance)||(c=parseFloat(h.advance));var v=parseFloat(h.rate_min),b=parseFloat(h.rate_max);o="";for(var f=v;f<b;f+=1)o+=f+",";o+=b;break}}}catch(w){O.e(w)}finally{O.f()}var D=this.mileageToKms(parseFloat(r.mileage));console.log("carKms = "+D);var g,P=Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__.a)(_);try{for(P.s();!(g=P.n()).done;){var C=g.value;if(C.lender_id==E&&C.min_kms<=D&&C.max_kms>=D&&C.year==parseInt(r.year)){u=C.term,d=C;break}}}catch(w){P.e(w)}finally{P.f()}}console.log("advance = "+c),console.log("interest = "+o),console.log("term = "+u);var T=parseFloat(t.currencyFields.Payment.value),M="NOT_FOUND";if(null!=d&&"NOT_FOUND"!=c){var y=d.type.replace(/\s/g,"");switch(console.log("termType = "+y),y.toLowerCase()){case"x-clean":M=r.x_clean*c-r.total_cost;break;case"clean":M=r.clean*c-r.total_cost;break;case"average":M=r.average*c-r.total_cost;break;case"rough":M=r.rough*c-r.total_cost}M=Math.round(M)}console.log("maxFront = "+M);var I="NOT_FOUND";if(-1!=e){var k=this.pv((e/100+0+0)/12,u,-T,0),U=m.hold_back,L=k*(1-U);console.log("financed = "+k),console.log("holdBack = "+U),console.log("funded = "+L);var F=0;""==t.currencyFields["Trade Allowance"].value||isNaN(t.currencyFields["Trade Allowance"].value)||(F=parseFloat(t.currencyFields["Trade Allowance"].value));var A=0;""==t.currencyFields["Trade Payoff"].value||isNaN(t.currencyFields["Trade Payoff"].value)||(A=parseFloat(t.currencyFields["Trade Payoff"].value));var B=0;""==t.currencyFields["Down Payment"].value||isNaN(t.currencyFields["Down Payment"].value)||(B=parseFloat(t.currencyFields["Down Payment"].value));var R=0;""==t.currencyFields["Trace a.c.v"].value||isNaN(t.currencyFields["Trace a.c.v"].value)||(R=parseFloat(t.currencyFields["Trace a.c.v"].value)),console.log("tradeAllowance = "+F),console.log("tradePayOff = "+A),console.log("downPayment = "+B),console.log("tradeAcv = "+R);var x=L-0-0+F-A+B;console.log("paidOut = "+x);var W=parseFloat(t.percentageFields.Tax.value)/100;console.log("userInputTax = "+W);var K=x*(1-W)+R;console.log("netPaid = "+K),I=K-r.total_cost<M?K-r.total_cost:M,I=Math.round(I)}return console.log("maxProfit = "+I),"NOT_FOUND"!=M&&(M="$"+M),"NOT_FOUND"!=I&&(I="$"+I),console.log("End createCalculationDetail()"),[s,i,100*c+"%",o,u,"$"+T,"0",M,I]}},{key:"pv",value:function pv(rate,periods,payment,future,type){var type="undefined"===typeof type?0:type;return rate=eval(rate),periods=eval(periods),0===rate?-payment*periods-future:((1-Math.pow(1+rate,periods))/rate*payment*(1+rate*type)-future)/Math.pow(1+rate,periods)}},{key:"getLenderId",value:function(e,t){for(var a=0;a<t.length;a++)if(e==t[a].name)return t[a].id;return null}},{key:"selectInterestEvent",value:function(e,t){var a=e.target.value,r=this.state.interests;r[t]=a,this.setState({interests:r})}},{key:"renderWithOneTable",value:function(e){var t=this;return react__WEBPACK_IMPORTED_MODULE_7__.createElement(react__WEBPACK_IMPORTED_MODULE_7__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__.a,{style:{backgroundColor:"rgb(247, 248, 248)"}},react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_8__.a,null,react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_10__.a,null,react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableRow,null,this.calculationDetailsColumnHeaders.map((function(e){return react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableCell,null,e)})))),e.map((function(e,a){return react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableRow,null,e.map((function(e,r){if(3==r){var n=[];return e.split(",").forEach((function(e,t){n.push(react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_18__.a,{value:e},e," %"))})),react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableCell,null,react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_17__.a,{onChange:function(e){return t.selectInterestEvent(e,a)},value:t.state.interests[a]},n))}return react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableCell,null,e)})))})))))}},{key:"createCell",value:function(e,t,a){var r=this;if(3==t){var n=[];return e.split(",").forEach((function(e,t){n.push(react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_18__.a,{value:e},e," %"))})),react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_Select__WEBPACK_IMPORTED_MODULE_17__.a,{onChange:function(e){return r.selectInterestEvent(e,a)},value:this.state.interests[a]},n)}return react__WEBPACK_IMPORTED_MODULE_7__.createElement(react__WEBPACK_IMPORTED_MODULE_7__.Fragment,null,e)}},{key:"renderWithThreeTables",value:function(e){var t,a=this,r=[],n=Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_1__.a)(e.entries());try{var l=function(){var e=Object(_Users_vuvandung_Desktop_lender_filter_lender_filter_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a)(t.value,2),n=e[0],l=e[1];r.push(react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_15__.a,{item:!0,xs:12},react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_12__.a,{style:{backgroundColor:"rgb(247, 248, 248)"}},react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_Table__WEBPACK_IMPORTED_MODULE_8__.a,null,react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_TableHead__WEBPACK_IMPORTED_MODULE_10__.a,null,react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableRow,null,react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableCell,null,"Name"),react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableCell,null,"Value"))),l.map((function(e,t){return react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableRow,null,react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableCell,null,a.calculationDetailsColumnHeaders[t]),react__WEBPACK_IMPORTED_MODULE_7__.createElement(StyledTableCell,null,a.createCell(e,t,n)))}))))))};for(n.s();!(t=n.n()).done;)l()}catch(_){n.e(_)}finally{n.f()}return react__WEBPACK_IMPORTED_MODULE_7__.createElement(react__WEBPACK_IMPORTED_MODULE_7__.Fragment,null,react__WEBPACK_IMPORTED_MODULE_7__.createElement(_material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_15__.a,{container:!0,spacing:4},r))}},{key:"render",value:function(){var e=void 0!=this.props.filtersInputs&&this.props.filtersInputs.length>0,t=this.createCalculationDetails(this.state.interests,this.props.filtersInputs,this.props.lenderData,this.props.details);return e?this.props.isBigScreen?this.renderWithOneTable(t):this.renderWithThreeTables(t):null}}]),CarCalculationClass}(react__WEBPACK_IMPORTED_MODULE_7__.Component);__webpack_exports__.a=CarCalculation},95:function(e,t,a){e.exports=a(143)}},[[95,1,2]]]);
//# sourceMappingURL=main.6bce1528.chunk.js.map