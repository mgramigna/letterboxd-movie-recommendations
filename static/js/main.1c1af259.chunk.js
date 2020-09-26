(this["webpackJsonplb-recs-client"]=this["webpackJsonplb-recs-client"]||[]).push([[0],{113:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(11),c=n.n(i),o=(n(88),n(13)),l=n.n(o),s=n(19),u=n(21),m=n(27),p=n(61),d=n(20),f=n.n(d),b=n(135),v=n(75),h=n(28);function g(){var e=Object(m.a)(["\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 20px;\n  border-width: 2px;\n  border-radius: 2px;\n  border-color: ",";\n  border-style: dashed;\n  background-color: #fafafa;\n  color: #bdbdbd;\n  outline: none;\n  transition: border 0.24s ease-in-out;\n"]);return g=function(){return e},e}var E=h.a.div(g(),(function(e){return function(e){return e.isDragAccept?"#00e676":e.isDragReject?"#ff1744":e.isDragActive?"#2196f3":"#eeeeee"}(e)})),x=function(e){var t=e.onDrop,n=Object(v.a)({onDrop:t,maxFiles:1,accept:".csv"}),a=n.getRootProps,i=n.getInputProps,c=n.isDragActive,o=n.isDragAccept,l=n.isDragReject;return r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(E,a({className:"dropzone",isDragActive:c,isDragAccept:o,isDragReject:l}),r.a.createElement("input",i()),r.a.createElement("p",null,"Drag and drop ratings.csv here, or click to select file")))},j=n(69),O=n.n(j);function y(e){return w.apply(this,arguments)}function w(){return(w=Object(s.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O()().fromString(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var k=n(37),D=n(70),C=n(71),I=n(72),S=n.n(I),M=n(73),R=function(){function e(t,n){Object(D.a)(this,e),this.httpClient=void 0,this.lbData=void 0,this.watchedFilms=void 0,this.watchedFilms=t.map((function(e){return e.Name})),this.lbData=t.filter((function(e){return parseFloat(e.Rating)>=n[0]&&parseFloat(e.Rating)<=n[1]})),this.httpClient=S.a.create({baseURL:"https://api.themoviedb.org/3",headers:{Authorization:"Bearer ".concat(M.a)}})}return Object(C.a)(e,[{key:"getTMBDMovies",value:function(){var e=Object(s.a)(l.a.mark((function e(){var t,n=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(this.lbData.map(function(){var e=Object(s.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.httpClient.get("/search/movie?query=".concat(encodeURIComponent(t.Name)));case 2:return a=e.sent,e.abrupt("return",Object(k.a)(Object(k.a)({},a.data),{},{rating:t.Rating}));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:return t=e.sent,e.abrupt("return",t.filter((function(e){return e.total_results>0})).map((function(e){return Object(k.a)(Object(k.a)({},e.results[0]),{},{rating:e.rating})})));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getRecommendations",value:function(){var e=Object(s.a)(l.a.mark((function e(){var t,n,a,r,i=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getTMBDMovies();case 2:return t=e.sent,e.next=5,Promise.all(t.map(function(){var e=Object(s.a)(l.a.mark((function e(t){var n,a,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.httpClient.get("/movie/".concat(t.id,"/recommendations"));case 2:return n=e.sent,a=n.data,r=a.results.filter((function(e){return!f.a.includes(i.watchedFilms,e.title)})),e.abrupt("return",{movie:t,recommendations:r.slice(0,5)});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 5:return n=e.sent,a=f.a.uniqBy(n,(function(e){return e.movie.id})).filter((function(e){return e.recommendations.length>0&&!f.a.isNull(e.movie.backdrop_path&&!f.a.isNull(e.movie.poster_path))})),r=f()(n.map((function(e){return e.recommendations}))).flatten().groupBy("id").orderBy((function(e){return e.length}),"desc").flatten().uniqBy((function(e){return e.id})).value().slice(0,5),e.abrupt("return",{common:r,recommendations:a});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),N=n(114),B=n(138),J=n(147);function Y(){var e=Object(m.a)(["\n  &:hover {\n    cursor: pointer;\n  }\n"]);return Y=function(){return e},e}var _=h.a.img(Y()),A=function(e){var t=e.results,n=e.openModal;return r.a.createElement(b.a,{container:!0,direction:"column",spacing:2},r.a.createElement(b.a,{container:!0,direction:"column",justify:"center",alignItems:"center"},r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(N.a,{variant:"h3"},"Most Common Recommendations")),r.a.createElement(b.a,{item:!0,container:!0,direction:"row",spacing:2},t.common.map((function(e){return r.a.createElement(b.a,{item:!0,key:e.id,xs:!0},r.a.createElement(N.a,{variant:"h5"},e.title),r.a.createElement("a",{href:"https://themoviedb.org/movie/".concat(e.id),rel:"noopener noreferrer",target:"_blank"},r.a.createElement("img",{alt:"".concat(e.title,"-poster"),src:"https://image.tmdb.org/t/p/w300".concat(e.backdrop_path)})),r.a.createElement(N.a,{variant:"body1"},e.overview))})))),r.a.createElement(B.a,null),t.recommendations.map((function(e){return r.a.createElement(b.a,{item:!0,key:e.movie.id},r.a.createElement(N.a,{variant:"h5"},"Based on ",e.movie.title,e.movie.rating?" (".concat(e.movie.rating,")"):""),r.a.createElement(b.a,{container:!0,direction:"row",justify:"center",alignItems:"center"},e.recommendations.map((function(e){return r.a.createElement(b.a,{item:!0,key:e.id,xs:!0},r.a.createElement(J.a,{title:e.title,placement:"right"},r.a.createElement(_,{key:e.id,alt:"".concat(e.title,"-poster"),src:"https://image.tmdb.org/t/p/w154".concat(e.poster_path),onClick:function(){return n(e)}})))}))))})))},z=n(141),F=n(148),L=n(144),U=n(145),T=n(143),W=n(146),q=n(140),P=n(142),Q=function(e){var t=e.movie,n=e.open,a=e.onClose,i=new Date(t.release_date).getFullYear();return r.a.createElement(W.a,{open:n,onClose:a},r.a.createElement(b.a,{container:!0,direction:"column",justify:"center",alignItems:"center",style:{padding:"12px"}},r.a.createElement(b.a,{item:!0,xs:!0},r.a.createElement(q.a,null,"".concat(t.title," (").concat(i,")")," ",r.a.createElement(z.a,{href:"https://themoviedb.org/movie/".concat(t.id),rel:"noopener noreferrer",target:"_blank"},r.a.createElement(P.a,null)))),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement("img",{style:{width:"100%"},alt:"".concat(t.title,"-poster"),src:"https://image.tmdb.org/t/p/original".concat(t.backdrop_path)})),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(N.a,{variant:"body1"},t.overview))))};function V(){var e=Object(m.a)(["\n  text-decoration: none;\n  color: inherit;\n"]);return V=function(){return e},e}var Z=Object(h.a)(p.CSVLink)(V()),G=function(){var e=Object(a.useState)(null),t=Object(u.a)(e,2),n=t[0],i=t[1],c=Object(a.useState)(null),o=Object(u.a)(c,2),m=o[0],p=o[1],d=Object(a.useState)(null),v=Object(u.a)(d,2),h=v[0],g=v[1],E=Object(a.useState)([[]]),j=Object(u.a)(E,2),O=j[0],w=j[1],k=Object(a.useState)(!1),D=Object(u.a)(k,2),C=D[0],I=D[1],S=Object(a.useState)([4.5,5]),M=Object(u.a)(S,2),B=M[0],Y=M[1],_=Object(a.useState)(!1),W=Object(u.a)(_,2),q=W[0],P=W[1],V=Object(a.useState)({isOpen:!1,movie:null}),G=Object(u.a)(V,2),H=G[0],X=G[1],$=Object(a.useCallback)((function(e){var t=e[0];i(t.name),P(!0);var n=new FileReader;n.onload=function(){p(n.result)},n.readAsText(t)}),[]);Object(a.useEffect)((function(){function e(){return(e=Object(s.a)(l.a.mark((function e(){var t,n,a,r,i,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===m){e.next=16;break}return e.next=3,y(m);case 3:return t=e.sent,n=new R(t,B),e.next=7,n.getRecommendations();case 7:a=e.sent,g(a),P(!1),r=a.recommendations.map((function(e){return e.recommendations})),i=f.a.uniqBy(f.a.flatten(r),(function(e){return e.id})),(c=i.map((function(e){return[e.release_date,e.title]}))).unshift(["Date","Name"]),w(c),I(!0);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[m,B]);return r.a.createElement(b.a,{container:!0,direction:"column",justify:"center",alignItems:"center",style:{padding:"12px"}},null!==H.movie&&r.a.createElement(Q,{open:H.isOpen,movie:H.movie,onClose:function(){X({isOpen:!1,movie:null})}}),null===n&&r.a.createElement(x,{onDrop:$}),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement(N.a,{gutterBottom:!0},"Valid Rating Range (Your Ratings)"," ",r.a.createElement(J.a,{title:"Set the min/max rating value to be considered for recommendations"},r.a.createElement(z.a,null,r.a.createElement(T.a,null)))),r.a.createElement(F.a,{value:B,valueLabelDisplay:"auto",step:.5,marks:!0,min:.5,max:5,onChange:function(e,t){Y(t)},disabled:null!==n})),r.a.createElement(b.a,{item:!0},r.a.createElement(L.a,{onClick:function(){i(null),g(null),p(null),I(!1),w([[]])}},"clear")),r.a.createElement(b.a,{item:!0},r.a.createElement(L.a,{disabled:!C},r.a.createElement(Z,{filename:"letterboxd-movie-recommendations.csv",data:O},"Download Results CSV"))),r.a.createElement(b.a,{item:!0,xs:12},r.a.createElement("ol",null,r.a.createElement("li",null,r.a.createElement(N.a,{variant:"subtitle1"},"Go to ",r.a.createElement("a",{href:"https://letterboxd.com/settings/data"},"letterboxd.com/settings/data"),' and click "Export your data"')),r.a.createElement("li",null,r.a.createElement(N.a,{variant:"subtitle1"},'Upload "ratings.csv" by clicking the "Upload" box above')),r.a.createElement("li",null,r.a.createElement(N.a,{variant:"subtitle1"},"Page will populate with recommendations based on your Letterboxd ratings!")),r.a.createElement("li",null,r.a.createElement(N.a,{variant:"subtitle1"},"You can download a CSV of all the recommended films and import them into a Letterboxd list or watchlist")))),h&&r.a.createElement(A,{results:h,openModal:function(e){X({isOpen:!0,movie:e})}}),q&&r.a.createElement(U.a,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},73:function(e){e.exports=JSON.parse('{"a":"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2ViMjcyYTMyMDYzODQ3MmY5YWU5MmExMzI4OWQyOSIsInN1YiI6IjU4ZTljMjA2YzNhMzY4NzJlZTA3MGUwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tp_QuSeL_H8ZvqLTS2Iw8iexf6CkncFtSgQS1qCfNPY"}')},83:function(e,t,n){e.exports=n(113)},88:function(e,t,n){}},[[83,1,2]]]);
//# sourceMappingURL=main.1c1af259.chunk.js.map