(this.webpackJsonpticket2calendar=this.webpackJsonpticket2calendar||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},16:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(2),c=n.n(r),l=(n(14),n(15),n(16),n(3)),s=n(4),i=n(7),u=n(5),d=n(8),m=n(6),g=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(i.a)(this,Object(u.a)(t).call(this,e))).thing=function(e){console.log(n.state.result_string),console.log(n.state.bcbp_result)},n.state={result_string:null,bcbp_result:{}},n}return Object(d.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.getElementById("pcCanvas").remove(),document.getElementById("mobileCanvas").remove();var t=new Worker("result_check.js");t.onmessage=function(){console.log(e.state.result_string),localStorage.barcode&&e.setState({result_string:localStorage.barcode},(function(){localStorage.clear(),t.terminate(),console.log(e.state.result_string),e.setState({bcbp_result:Object(m.parseBCBP)(e.state.result_string)})}))}}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{id:"dbr"}),"test"===this.state.result_string?o.a.createElement("h1",null,"BIG TEST"):null,o.a.createElement("button",{onClick:this.detect},"result!"),o.a.createElement("button",{onClick:this.thing},"do thing"))}}]),t}(o.a.Component);var h=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(g,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},9:function(e,t,n){e.exports=n(30)}},[[9,1,2]]]);
//# sourceMappingURL=main.63269397.chunk.js.map