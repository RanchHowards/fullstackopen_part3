(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(15),r=t.n(c),o=t(6),a=t(3),u=t(2),i=t(0),s=function(e){return Object(i.jsx)("input",{value:e.searchName,onChange:e.changeSearchName})},d=function(e){var n=e.person;return Object(i.jsxs)("div",{children:[n.name," ",n.number,Object(i.jsx)("button",{onClick:function(){return e.removeEntry(n.id)},children:"DELETE"})]})},j=function(e){return e.persons.map((function(n){return Object(i.jsx)(d,{person:n,removeEntry:e.removeEntry},n.name)}))},b=function(e){return Object(i.jsxs)("form",{onSubmit:e.addName,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:e.newName,onChange:e.addNewName})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:e.newNumber,onChange:e.addNewNumber})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{children:"add"})})]})},h=function(e){var n=e.notification;return null===n?null:Object(i.jsx)("h2",{className:n.type,children:n.message})},l=t(4),f=t.n(l),m=function(e){return f.a.post("http://localhost:3001/persons",e).then((function(e){return e.data}))},O=function(){return f.a.get("http://localhost:3001/persons").then((function(e){return e.data}))},p=function(e){return console.log(e),f.a.delete("http://localhost:3001/persons/".concat(e)).then((function(e){return console.log(e)}))},v=function(e){return f.a.put("http://localhost:3001/persons/".concat(e.id),e).then((function(e){return e.data}))},x=function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)(""),d=Object(a.a)(r,2),l=d[0],f=d[1],x=Object(u.useState)(""),N=Object(a.a)(x,2),w=N[0],g=N[1],y=Object(u.useState)(""),E=Object(a.a)(y,2),S=E[0],k=E[1],C=Object(u.useState)(null),D=Object(a.a)(C,2),J=D[0],T=D[1],A=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success";T({message:e,type:n}),setTimeout((function(){return T(null)}),4e3)},B=new RegExp(S,"i"),I=t.filter((function(e){return B.exec(e.name)}));return Object(u.useEffect)((function(){O().then((function(e){return c(e)}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(s,{changeSearchName:function(e){k(e.target.value)}}),Object(i.jsx)(h,{notification:J}),Object(i.jsx)("h2",{children:"add a new"}),Object(i.jsx)(b,{newName:l,newNumber:w,addNewNumber:function(e){g(e.target.value)},addName:function(e){e.preventDefault();var n=t.find((function(e){return e.name===l}));if(n){if(window.confirm("Do you want to update ".concat(n.name,"'s number?"))){var r=Object(o.a)(Object(o.a)({},n),{},{number:w});v(r).then((function(e){c(t.map((function(n){return n.id!==r.id?n:e}))),A("Changed ".concat(e.name)),f(""),g("")})).catch((function(e){A("".concat(r.name," has already been removed"),"error"),c(t.filter((function(e){return e.id!==n.id})))}))}}else m({name:l,number:w}).then((function(e){c(t.concat(e)),A("Added ".concat(e.name," to the phonebook")),f(""),g("")}))},addNewName:function(e){f(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(j,{persons:I,removeEntry:function(e){window.confirm("Do you really want to delete this?")&&(p(e),c(t.filter((function(n){return n.id!==e}))))}})]})};t(39);r.a.render(Object(i.jsx)(x,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.6197f0b5.chunk.js.map