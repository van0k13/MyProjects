(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(t,e,a){t.exports=a(17)},16:function(t,e,a){},17:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(9),o=a.n(i),s=(a(16),a(7)),c=a(1),l=a(6),d=a(3),u=a(2),p=a(4),f=(a(5),a(10)),h=function(t){function e(){var t,a;Object(c.a)(this,e);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).state={editMode:!1},a.onTitleChanged=function(t){a.props.changeTitle(a.props.task.id,t.currentTarget.value)},a.onIsDoneChanged=function(t){a.props.changeStatus(a.props.task.id,t.currentTarget.checked)},a.activateEditMode=function(){a.setState({editMode:!0})},a.deActivateEditMode=function(){a.setState({editMode:!1})},a}return Object(p.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this.props.task.isDone?"todoList-task done":"todolist-task";return r.a.createElement("div",{className:t},r.a.createElement("input",{type:"checkbox",checked:this.props.task.isDone,onChange:this.onIsDoneChanged}),this.state.editMode?r.a.createElement("input",{onBlur:this.deActivateEditMode,autoFocus:!0,value:this.props.task.title,onChange:this.onTitleChanged}):r.a.createElement("span",{onClick:this.activateEditMode},this.props.task.id,": ",this.props.task.title),", priority: ",this.props.task.priority)}}]),e}(r.a.Component),m=function(t){function e(){var t,a;Object(c.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(d.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).render=function(){var t=a.props.tasks.map(function(t){return r.a.createElement(h,{task:t,changeStatus:a.props.changeStatus,changeTitle:a.props.changeTitle})});return r.a.createElement("div",{className:"todoList-tasks"},t)},a}return Object(p.a)(e,t),e}(r.a.Component),v=function(t){function e(){var t,a;Object(c.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(d.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).state={isHidden:!1},a.onAllFilterClick=function(){a.props.changeFilter("All")},a.onCompletedFilterClick=function(){a.props.changeFilter("Completed")},a.onActiveFilterClick=function(){a.props.changeFilter("Active")},a.onShowFiltersClick=function(){a.setState({isHidden:!0})},a.onHideFiltersClick=function(){a.setState({isHidden:!1})},a.render=function(){var t="All"===a.props.filterValue?"filter-active":"",e="Completed"===a.props.filterValue?"filter-active":"",n="Active"===a.props.filterValue?"filter-active":"";return r.a.createElement("div",{className:"todoList-footer"}," ",!a.state.isHidden&&r.a.createElement("div",null,r.a.createElement("button",{onClick:a.onAllFilterClick,className:t},"All"),r.a.createElement("button",{onClick:a.onCompletedFilterClick,className:e},"Completed"),r.a.createElement("button",{onClick:a.onActiveFilterClick,className:n},"Active")),!a.state.isHidden&&r.a.createElement("span",{onClick:a.onShowFiltersClick},"Hide"),a.state.isHidden&&r.a.createElement("span",{onClick:a.onHideFiltersClick},"show"))},a}return Object(p.a)(e,t),e}(r.a.Component),k=function(t){function e(){var t,a;Object(c.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(d.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).state={error:!1,title:""},a.onAddItemClick=function(){var t=a.state.title;a.setState({title:""}),""===t.trim()?a.setState({error:!0}):(a.setState({error:!1}),a.props.addItem(t))},a.onTitleChanged=function(t){a.setState({error:!1,title:t.currentTarget.value.trimLeft()})},a.onKeyPress=function(t){"Enter"===t.key&&a.onAddItemClick()},a.render=function(){var t=a.state.error?"error":"";return r.a.createElement("div",{className:"todoList-newTaskForm"},r.a.createElement("input",{onKeyPress:a.onKeyPress,onChange:a.onTitleChanged,className:t,value:a.state.title,type:"text",placeholder:"New item name"}),r.a.createElement("button",{onClick:a.onAddItemClick},"Add"))},a}return Object(p.a)(e,t),e}(r.a.Component),g=function(t){function e(){var t,a;Object(c.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(d.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).render=function(){return r.a.createElement("div",{className:"todoList-header"},r.a.createElement("h3",{className:"todoList-header__title"},a.props.title))},a}return Object(p.a)(e,t),e}(r.a.Component);function b(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,n)}return a}var O=function(t){function e(){var t,a;Object(c.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(d.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).nextTaskId=0,a.state={tasks:[],filterValue:"All"},a.saveState=function(){var t=JSON.stringify(a.state);localStorage.setItem("our-state"+a.props.id,t)},a.restoreState=function(){var t={tasks:[],filterValue:"All"},e=localStorage.getItem("our-state"+a.props.id);null!=e&&(t=JSON.parse(e)),a.setState(t,function(){a.state.tasks.forEach(function(t){t.id>=a.nextTaskId&&(a.nextTaskId=t.id++)})})},a.addItem=function(t){var e={id:a.nextTaskId,title:t,isDone:!1,priority:"high"};a.nextTaskId++;var n=[].concat(Object(s.a)(a.state.tasks),[e]);a.setState({tasks:n},function(){a.saveState()})},a.changeFilter=function(t){a.setState({filterValue:t},function(){a.saveState()})},a.changeStatus=function(t,e){a.changeTask(t,{isDone:e})},a.changeTitle=function(t,e){a.changeTask(t,{title:e})},a.changeTask=function(t,e){var n=a.state.tasks.map(function(a){return a.id!==t?a:function(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?b(a,!0).forEach(function(e){Object(f.a)(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):b(a).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}({},a,{},e)});a.setState({tasks:n},function(){a.saveState()})},a.render=function(){var t,e;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"todoList"},r.a.createElement("div",{className:"todoList-header"},r.a.createElement(g,{title:a.props.title}),r.a.createElement(k,{addItem:a.addItem})),r.a.createElement(m,{tasks:(t=a.state.tasks,e=a.state.filterValue,t.filter(function(t){switch(e){case"All":return!0;case"Completed":return t.isDone;case"Active":return!t.isDone}})),changeStatus:a.changeStatus,changeTitle:a.changeTitle}),r.a.createElement(v,{filterValue:a.state.filterValue,changeFilter:a.changeFilter})))},a}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.restoreState()}}]),e}(r.a.Component),j=function(t){function e(){var t,a;Object(c.a)(this,e);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(a=Object(d.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(i)))).nextTodoListId=0,a.state={todolists:[{id:1,title:"What to learn"},{id:2,title:"Week tasks"},{id:3,title:"Year tasks"}]},a.addTodoList=function(t){var e={id:a.nextTodoListId,title:t};a.nextTodoListId++,a.setState({todolists:[].concat(Object(s.a)(a.state.todolists),[e])},a.saveState)},a.saveState=function(){var t=JSON.stringify(a.state);localStorage.setItem("todolist_state",t)},a.restoreState=function(){var t=a.state,e=localStorage.getItem("todolist_state");null!==e&&(t=JSON.parse(e)),a.setState(t,function(){a.state.todolists.forEach(function(t){t.id>=a.nextTodoListId&&a.nextTodoListId++})})},a.render=function(){var t=a.state.todolists.map(function(t){return r.a.createElement(O,{id:t.id,title:t.title})});return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement(k,{addItem:a.addTodoList})),r.a.createElement("div",{className:"App"},t))},a}return Object(p.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.restoreState()}}]),e}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},5:function(t,e,a){}},[[11,1,2]]]);
//# sourceMappingURL=main.19f1a326.chunk.js.map