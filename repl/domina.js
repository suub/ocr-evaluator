goog.provide('domina');
goog.require('cljs.core');
goog.require('domina.support');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.dom.xml');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('goog.style');
goog.require('cljs.core');
domina.re_html = /<|&#?\w+;/;
domina.re_leading_whitespace = /^\s+/;
domina.re_xhtml_tag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/i;
domina.re_tag_name = /<([\w:]+)/;
domina.re_no_inner_html = /<(?:script|style)/i;
domina.re_tbody = /<tbody/i;
var opt_wrapper_4111 = cljs.core.PersistentVector.fromArray([1,"<select multiple='multiple'>","</select>"], true);
var table_section_wrapper_4112 = cljs.core.PersistentVector.fromArray([1,"<table>","</table>"], true);
var cell_wrapper_4113 = cljs.core.PersistentVector.fromArray([3,"<table><tbody><tr>","</tr></tbody></table>"], true);
domina.wrap_map = cljs.core.PersistentHashMap.fromArrays(["col","\uFDD0:default","tfoot","caption","optgroup","legend","area","td","thead","th","option","tbody","tr","colgroup"],[cljs.core.PersistentVector.fromArray([2,"<table><tbody></tbody><colgroup>","</colgroup></table>"], true),cljs.core.PersistentVector.fromArray([0,"",""], true),table_section_wrapper_4112,table_section_wrapper_4112,opt_wrapper_4111,cljs.core.PersistentVector.fromArray([1,"<fieldset>","</fieldset>"], true),cljs.core.PersistentVector.fromArray([1,"<map>","</map>"], true),cell_wrapper_4113,table_section_wrapper_4112,cell_wrapper_4113,opt_wrapper_4111,table_section_wrapper_4112,cljs.core.PersistentVector.fromArray([2,"<table><tbody>","</tbody></table>"], true),table_section_wrapper_4112]);
domina.remove_extraneous_tbody_BANG_ = (function remove_extraneous_tbody_BANG_(div,html,tag_name,start_wrap){
var no_tbody_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_tbody,html));
var tbody = (((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,tag_name,"table");
if(and__3941__auto__)
{return no_tbody_QMARK_;
} else
{return and__3941__auto__;
}
})())?(function (){var and__3941__auto__ = div.firstChild;
if(cljs.core.truth_(and__3941__auto__))
{return div.firstChild.childNodes;
} else
{return and__3941__auto__;
}
})():(((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,start_wrap,"<table>");
if(and__3941__auto__)
{return no_tbody_QMARK_;
} else
{return and__3941__auto__;
}
})())?divchildNodes:cljs.core.PersistentVector.EMPTY));
var seq__4118 = cljs.core.seq.call(null,tbody);
var chunk__4119 = null;
var count__4120 = 0;
var i__4121 = 0;
while(true){
if((i__4121 < count__4120))
{var child = cljs.core._nth.call(null,chunk__4119,i__4121);
if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,child.nodeName,"tbody");
if(and__3941__auto__)
{return cljs.core._EQ_.call(null,child.childNodes.length,0);
} else
{return and__3941__auto__;
}
})())
{child.parentNode.removeChild(child);
} else
{}
{
var G__4122 = seq__4118;
var G__4123 = chunk__4119;
var G__4124 = count__4120;
var G__4125 = (i__4121 + 1);
seq__4118 = G__4122;
chunk__4119 = G__4123;
count__4120 = G__4124;
i__4121 = G__4125;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__4118);
if(temp__4092__auto__)
{var seq__4118__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4118__$1))
{var c__3224__auto__ = cljs.core.chunk_first.call(null,seq__4118__$1);
{
var G__4126 = cljs.core.chunk_rest.call(null,seq__4118__$1);
var G__4127 = c__3224__auto__;
var G__4128 = cljs.core.count.call(null,c__3224__auto__);
var G__4129 = 0;
seq__4118 = G__4126;
chunk__4119 = G__4127;
count__4120 = G__4128;
i__4121 = G__4129;
continue;
}
} else
{var child = cljs.core.first.call(null,seq__4118__$1);
if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,child.nodeName,"tbody");
if(and__3941__auto__)
{return cljs.core._EQ_.call(null,child.childNodes.length,0);
} else
{return and__3941__auto__;
}
})())
{child.parentNode.removeChild(child);
} else
{}
{
var G__4130 = cljs.core.next.call(null,seq__4118__$1);
var G__4131 = null;
var G__4132 = 0;
var G__4133 = 0;
seq__4118 = G__4130;
chunk__4119 = G__4131;
count__4120 = G__4132;
i__4121 = G__4133;
continue;
}
}
} else
{return null;
}
}
break;
}
});
domina.restore_leading_whitespace_BANG_ = (function restore_leading_whitespace_BANG_(div,html){
return div.insertBefore(document.createTextNode(cljs.core.first.call(null,cljs.core.re_find.call(null,domina.re_leading_whitespace,html))),div.firstChild);
});
/**
* takes an string of html and returns a NodeList of dom fragments
*/
domina.html_to_dom = (function html_to_dom(html){
var html__$1 = clojure.string.replace.call(null,html,domina.re_xhtml_tag,"<$1></$2>");
var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html__$1)))].join('').toLowerCase();
var vec__4135 = cljs.core.get.call(null,domina.wrap_map,tag_name,(new cljs.core.Keyword("\uFDD0:default")).call(null,domina.wrap_map));
var depth = cljs.core.nth.call(null,vec__4135,0,null);
var start_wrap = cljs.core.nth.call(null,vec__4135,1,null);
var end_wrap = cljs.core.nth.call(null,vec__4135,2,null);
var div = (function (){var wrapper = (function (){var div = document.createElement("div");
div.innerHTML = [cljs.core.str(start_wrap),cljs.core.str(html__$1),cljs.core.str(end_wrap)].join('');
return div;
})();
var level = depth;
while(true){
if((level > 0))
{{
var G__4136 = wrapper.lastChild;
var G__4137 = (level - 1);
wrapper = G__4136;
level = G__4137;
continue;
}
} else
{return wrapper;
}
break;
}
})();
if(cljs.core.truth_(domina.support.extraneous_tbody_QMARK_))
{domina.remove_extraneous_tbody_BANG_.call(null,div,html__$1,tag_name,start_wrap);
} else
{}
if(cljs.core.truth_((function (){var and__3941__auto__ = cljs.core.not.call(null,domina.support.leading_whitespace_QMARK_);
if(and__3941__auto__)
{return cljs.core.re_find.call(null,domina.re_leading_whitespace,html__$1);
} else
{return and__3941__auto__;
}
})()))
{domina.restore_leading_whitespace_BANG_.call(null,div,html__$1);
} else
{}
return div.childNodes;
});
domina.string_to_dom = (function string_to_dom(s){
if(cljs.core.truth_(cljs.core.re_find.call(null,domina.re_html,s)))
{return domina.html_to_dom.call(null,s);
} else
{return document.createTextNode(s);
}
});
domina.DomContent = {};
domina.nodes = (function nodes(content){
if((function (){var and__3941__auto__ = content;
if(and__3941__auto__)
{return content.domina$DomContent$nodes$arity$1;
} else
{return and__3941__auto__;
}
})())
{return content.domina$DomContent$nodes$arity$1(content);
} else
{var x__3093__auto__ = (((content == null))?null:content);
return (function (){var or__3943__auto__ = (domina.nodes[goog.typeOf(x__3093__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.nodes["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.nodes",content);
}
}
})().call(null,content);
}
});
domina.single_node = (function single_node(nodeseq){
if((function (){var and__3941__auto__ = nodeseq;
if(and__3941__auto__)
{return nodeseq.domina$DomContent$single_node$arity$1;
} else
{return and__3941__auto__;
}
})())
{return nodeseq.domina$DomContent$single_node$arity$1(nodeseq);
} else
{var x__3093__auto__ = (((nodeseq == null))?null:nodeseq);
return (function (){var or__3943__auto__ = (domina.single_node[goog.typeOf(x__3093__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.single_node["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.single-node",nodeseq);
}
}
})().call(null,nodeseq);
}
});
domina._STAR_debug_STAR_ = true;
/**
* @param {...*} var_args
*/
domina.log_debug = (function() { 
var log_debug__delegate = function (mesg){
if(cljs.core.truth_((function (){var and__3941__auto__ = domina._STAR_debug_STAR_;
if(cljs.core.truth_(and__3941__auto__))
{return !(cljs.core._EQ_.call(null,window.console,undefined));
} else
{return and__3941__auto__;
}
})()))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log_debug = function (var_args){
var mesg = null;
if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return log_debug__delegate.call(this, mesg);
};
log_debug.cljs$lang$maxFixedArity = 0;
log_debug.cljs$lang$applyTo = (function (arglist__4138){
var mesg = cljs.core.seq(arglist__4138);
return log_debug__delegate(mesg);
});
log_debug.cljs$core$IFn$_invoke$arity$variadic = log_debug__delegate;
return log_debug;
})()
;
/**
* @param {...*} var_args
*/
domina.log = (function() { 
var log__delegate = function (mesg){
if(cljs.core.truth_(window.console))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log = function (var_args){
var mesg = null;
if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return log__delegate.call(this, mesg);
};
log.cljs$lang$maxFixedArity = 0;
log.cljs$lang$applyTo = (function (arglist__4139){
var mesg = cljs.core.seq(arglist__4139);
return log__delegate(mesg);
});
log.cljs$core$IFn$_invoke$arity$variadic = log__delegate;
return log;
})()
;
/**
* Returns content containing a single node by looking up the given ID
*/
domina.by_id = (function by_id(id){
return goog.dom.getElement(cljs.core.name.call(null,id));
});
/**
* Returns content containing nodes which have the specified CSS class.
*/
domina.by_class = (function by_class(class_name){
return domina.normalize_seq.call(null,goog.dom.getElementsByClass(cljs.core.name.call(null,class_name)));
});
/**
* Gets all the child nodes of the elements in a content. Same as (xpath content '*') but more efficient.
*/
domina.children = (function children(content){
return cljs.core.doall.call(null,cljs.core.mapcat.call(null,goog.dom.getChildren,domina.nodes.call(null,content)));
});
/**
* Returns the deepest common ancestor of the argument contents (which are presumed to be single nodes), or nil if they are from different documents.
* @param {...*} var_args
*/
domina.common_ancestor = (function() { 
var common_ancestor__delegate = function (contents){
return cljs.core.apply.call(null,goog.dom.findCommonAncestor,cljs.core.map.call(null,domina.single_node,contents));
};
var common_ancestor = function (var_args){
var contents = null;
if (arguments.length > 0) {
  contents = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return common_ancestor__delegate.call(this, contents);
};
common_ancestor.cljs$lang$maxFixedArity = 0;
common_ancestor.cljs$lang$applyTo = (function (arglist__4140){
var contents = cljs.core.seq(arglist__4140);
return common_ancestor__delegate(contents);
});
common_ancestor.cljs$core$IFn$_invoke$arity$variadic = common_ancestor__delegate;
return common_ancestor;
})()
;
/**
* Returns true if the first argument is an ancestor of the second argument. Presumes both arguments are single-node contents.
*/
domina.ancestor_QMARK_ = (function ancestor_QMARK_(ancestor_content,descendant_content){
return cljs.core._EQ_.call(null,domina.common_ancestor.call(null,ancestor_content,descendant_content),domina.single_node.call(null,ancestor_content));
});
/**
* Returns a deep clone of content.
*/
domina.clone = (function clone(content){
return cljs.core.map.call(null,(function (p1__4141_SHARP_){
return p1__4141_SHARP_.cloneNode(true);
}),domina.nodes.call(null,content));
});
/**
* Given a parent and child contents, appends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.append_BANG_ = (function append_BANG_(parent_content,child_content){
domina.apply_with_cloning.call(null,goog.dom.appendChild,parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, appends each of the children to all of the parents at the specified index. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.insert_BANG_ = (function insert_BANG_(parent_content,child_content,idx){
domina.apply_with_cloning.call(null,(function (p1__4142_SHARP_,p2__4143_SHARP_){
return goog.dom.insertChildAt(p1__4142_SHARP_,p2__4143_SHARP_,idx);
}),parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, prepends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.prepend_BANG_ = (function prepend_BANG_(parent_content,child_content){
domina.insert_BANG_.call(null,parent_content,child_content,0);
return parent_content;
});
/**
* Given a content and some new content, inserts the new content immediately before the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_before_BANG_ = (function insert_before_BANG_(content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4145_SHARP_,p2__4144_SHARP_){
return goog.dom.insertSiblingBefore(p2__4144_SHARP_,p1__4145_SHARP_);
}),content,new_content);
return content;
});
/**
* Given a content and some new content, inserts the new content immediately after the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_after_BANG_ = (function insert_after_BANG_(content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4147_SHARP_,p2__4146_SHARP_){
return goog.dom.insertSiblingAfter(p2__4146_SHARP_,p1__4147_SHARP_);
}),content,new_content);
return content;
});
/**
* Given some old content and some new content, replaces the old content with new content. If there are multiple nodes in the old content, replaces each of them and clones the new content as necessary.
*/
domina.swap_content_BANG_ = (function swap_content_BANG_(old_content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4149_SHARP_,p2__4148_SHARP_){
return goog.dom.replaceNode(p2__4148_SHARP_,p1__4149_SHARP_);
}),old_content,new_content);
return old_content;
});
/**
* Removes all the nodes in a content from the DOM and returns them.
*/
domina.detach_BANG_ = (function detach_BANG_(content){
return cljs.core.doall.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the nodes in a content from the DOM. Returns nil.
*/
domina.destroy_BANG_ = (function destroy_BANG_(content){
return cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the child nodes in a content from the DOM. Returns the original content.
*/
domina.destroy_children_BANG_ = (function destroy_children_BANG_(content){
cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeChildren,domina.nodes.call(null,content)));
return content;
});
/**
* Gets the value of a CSS property. Assumes content will be a single node. Name may be a string or keyword. Returns nil if there is no value set for the style.
*/
domina.style = (function style(content,name){
var s = goog.style.getStyle(domina.single_node.call(null,content),cljs.core.name.call(null,name));
if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,s)))
{return null;
} else
{return s;
}
});
/**
* Gets the value of an HTML attribute. Assumes content will be a single node. Name may be a stirng or keyword. Returns nil if there is no value set for the style.
*/
domina.attr = (function attr(content,name){
return domina.single_node.call(null,content).getAttribute(cljs.core.name.call(null,name));
});
/**
* Sets the value of a CSS property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_style_BANG_ = (function() { 
var set_style_BANG___delegate = function (content,name,value){
var seq__4154_4158 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4155_4159 = null;
var count__4156_4160 = 0;
var i__4157_4161 = 0;
while(true){
if((i__4157_4161 < count__4156_4160))
{var n_4162 = cljs.core._nth.call(null,chunk__4155_4159,i__4157_4161);
goog.style.setStyle(n_4162,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4163 = seq__4154_4158;
var G__4164 = chunk__4155_4159;
var G__4165 = count__4156_4160;
var G__4166 = (i__4157_4161 + 1);
seq__4154_4158 = G__4163;
chunk__4155_4159 = G__4164;
count__4156_4160 = G__4165;
i__4157_4161 = G__4166;
continue;
}
} else
{var temp__4092__auto___4167 = cljs.core.seq.call(null,seq__4154_4158);
if(temp__4092__auto___4167)
{var seq__4154_4168__$1 = temp__4092__auto___4167;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4154_4168__$1))
{var c__3224__auto___4169 = cljs.core.chunk_first.call(null,seq__4154_4168__$1);
{
var G__4170 = cljs.core.chunk_rest.call(null,seq__4154_4168__$1);
var G__4171 = c__3224__auto___4169;
var G__4172 = cljs.core.count.call(null,c__3224__auto___4169);
var G__4173 = 0;
seq__4154_4158 = G__4170;
chunk__4155_4159 = G__4171;
count__4156_4160 = G__4172;
i__4157_4161 = G__4173;
continue;
}
} else
{var n_4174 = cljs.core.first.call(null,seq__4154_4168__$1);
goog.style.setStyle(n_4174,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4175 = cljs.core.next.call(null,seq__4154_4168__$1);
var G__4176 = null;
var G__4177 = 0;
var G__4178 = 0;
seq__4154_4158 = G__4175;
chunk__4155_4159 = G__4176;
count__4156_4160 = G__4177;
i__4157_4161 = G__4178;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_style_BANG_ = function (content,name,var_args){
var value = null;
if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return set_style_BANG___delegate.call(this, content, name, value);
};
set_style_BANG_.cljs$lang$maxFixedArity = 2;
set_style_BANG_.cljs$lang$applyTo = (function (arglist__4179){
var content = cljs.core.first(arglist__4179);
arglist__4179 = cljs.core.next(arglist__4179);
var name = cljs.core.first(arglist__4179);
var value = cljs.core.rest(arglist__4179);
return set_style_BANG___delegate(content, name, value);
});
set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_style_BANG___delegate;
return set_style_BANG_;
})()
;
/**
* Sets the value of an HTML property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_attr_BANG_ = (function() { 
var set_attr_BANG___delegate = function (content,name,value){
var seq__4184_4188 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4185_4189 = null;
var count__4186_4190 = 0;
var i__4187_4191 = 0;
while(true){
if((i__4187_4191 < count__4186_4190))
{var n_4192 = cljs.core._nth.call(null,chunk__4185_4189,i__4187_4191);
n_4192.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4193 = seq__4184_4188;
var G__4194 = chunk__4185_4189;
var G__4195 = count__4186_4190;
var G__4196 = (i__4187_4191 + 1);
seq__4184_4188 = G__4193;
chunk__4185_4189 = G__4194;
count__4186_4190 = G__4195;
i__4187_4191 = G__4196;
continue;
}
} else
{var temp__4092__auto___4197 = cljs.core.seq.call(null,seq__4184_4188);
if(temp__4092__auto___4197)
{var seq__4184_4198__$1 = temp__4092__auto___4197;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4184_4198__$1))
{var c__3224__auto___4199 = cljs.core.chunk_first.call(null,seq__4184_4198__$1);
{
var G__4200 = cljs.core.chunk_rest.call(null,seq__4184_4198__$1);
var G__4201 = c__3224__auto___4199;
var G__4202 = cljs.core.count.call(null,c__3224__auto___4199);
var G__4203 = 0;
seq__4184_4188 = G__4200;
chunk__4185_4189 = G__4201;
count__4186_4190 = G__4202;
i__4187_4191 = G__4203;
continue;
}
} else
{var n_4204 = cljs.core.first.call(null,seq__4184_4198__$1);
n_4204.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4205 = cljs.core.next.call(null,seq__4184_4198__$1);
var G__4206 = null;
var G__4207 = 0;
var G__4208 = 0;
seq__4184_4188 = G__4205;
chunk__4185_4189 = G__4206;
count__4186_4190 = G__4207;
i__4187_4191 = G__4208;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_attr_BANG_ = function (content,name,var_args){
var value = null;
if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return set_attr_BANG___delegate.call(this, content, name, value);
};
set_attr_BANG_.cljs$lang$maxFixedArity = 2;
set_attr_BANG_.cljs$lang$applyTo = (function (arglist__4209){
var content = cljs.core.first(arglist__4209);
arglist__4209 = cljs.core.next(arglist__4209);
var name = cljs.core.first(arglist__4209);
var value = cljs.core.rest(arglist__4209);
return set_attr_BANG___delegate(content, name, value);
});
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___delegate;
return set_attr_BANG_;
})()
;
/**
* Removes the specified HTML property for each node in the content. Name may be a string or keyword.
*/
domina.remove_attr_BANG_ = (function remove_attr_BANG_(content,name){
var seq__4214_4218 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4215_4219 = null;
var count__4216_4220 = 0;
var i__4217_4221 = 0;
while(true){
if((i__4217_4221 < count__4216_4220))
{var n_4222 = cljs.core._nth.call(null,chunk__4215_4219,i__4217_4221);
n_4222.removeAttribute(cljs.core.name.call(null,name));
{
var G__4223 = seq__4214_4218;
var G__4224 = chunk__4215_4219;
var G__4225 = count__4216_4220;
var G__4226 = (i__4217_4221 + 1);
seq__4214_4218 = G__4223;
chunk__4215_4219 = G__4224;
count__4216_4220 = G__4225;
i__4217_4221 = G__4226;
continue;
}
} else
{var temp__4092__auto___4227 = cljs.core.seq.call(null,seq__4214_4218);
if(temp__4092__auto___4227)
{var seq__4214_4228__$1 = temp__4092__auto___4227;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4214_4228__$1))
{var c__3224__auto___4229 = cljs.core.chunk_first.call(null,seq__4214_4228__$1);
{
var G__4230 = cljs.core.chunk_rest.call(null,seq__4214_4228__$1);
var G__4231 = c__3224__auto___4229;
var G__4232 = cljs.core.count.call(null,c__3224__auto___4229);
var G__4233 = 0;
seq__4214_4218 = G__4230;
chunk__4215_4219 = G__4231;
count__4216_4220 = G__4232;
i__4217_4221 = G__4233;
continue;
}
} else
{var n_4234 = cljs.core.first.call(null,seq__4214_4228__$1);
n_4234.removeAttribute(cljs.core.name.call(null,name));
{
var G__4235 = cljs.core.next.call(null,seq__4214_4228__$1);
var G__4236 = null;
var G__4237 = 0;
var G__4238 = 0;
seq__4214_4218 = G__4235;
chunk__4215_4219 = G__4236;
count__4216_4220 = G__4237;
i__4217_4221 = G__4238;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Parses a CSS style string and returns the properties as a map.
*/
domina.parse_style_attributes = (function parse_style_attributes(style){
return cljs.core.reduce.call(null,(function (acc,pair){
var vec__4240 = pair.split(/\s*:\s*/);
var k = cljs.core.nth.call(null,vec__4240,0,null);
var v = cljs.core.nth.call(null,vec__4240,1,null);
if(cljs.core.truth_((function (){var and__3941__auto__ = k;
if(cljs.core.truth_(and__3941__auto__))
{return v;
} else
{return and__3941__auto__;
}
})()))
{return cljs.core.assoc.call(null,acc,cljs.core.keyword.call(null,k.toLowerCase()),v);
} else
{return acc;
}
}),cljs.core.ObjMap.EMPTY,style.split(/\s*;\s*/));
});
/**
* Returns a map of the CSS styles/values. Assumes content will be a single node. Style names are returned as keywords.
*/
domina.styles = (function styles(content){
var style = domina.attr.call(null,content,"style");
if(cljs.core.string_QMARK_.call(null,style))
{return domina.parse_style_attributes.call(null,style);
} else
{if((style == null))
{return cljs.core.ObjMap.EMPTY;
} else
{if(cljs.core.truth_(style.cssText))
{return domina.parse_style_attributes.call(null,style.cssText);
} else
{if("\uFDD0:else")
{return cljs.core.ObjMap.EMPTY;
} else
{return null;
}
}
}
}
});
/**
* Returns a map of the HTML attributes/values. Assumes content will be a single node. Attribute names are returned as keywords.
*/
domina.attrs = (function attrs(content){
var node = domina.single_node.call(null,content);
var attrs__$1 = node.attributes;
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),cljs.core.map.call(null,(function (p1__4241_SHARP_){
var attr = attrs__$1.item(p1__4241_SHARP_);
var value = attr.nodeValue;
if((function (){var and__3941__auto__ = cljs.core.not_EQ_.call(null,null,value);
if(and__3941__auto__)
{return cljs.core.not_EQ_.call(null,"",value);
} else
{return and__3941__auto__;
}
})())
{return cljs.core.PersistentArrayMap.fromArray([cljs.core.keyword.call(null,attr.nodeName.toLowerCase()),attr.nodeValue], true);
} else
{return null;
}
}),cljs.core.range.call(null,attrs__$1.length))));
});
/**
* Sets the specified CSS styles for each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_styles_BANG_ = (function set_styles_BANG_(content,styles){
var seq__4248_4254 = cljs.core.seq.call(null,styles);
var chunk__4249_4255 = null;
var count__4250_4256 = 0;
var i__4251_4257 = 0;
while(true){
if((i__4251_4257 < count__4250_4256))
{var vec__4252_4258 = cljs.core._nth.call(null,chunk__4249_4255,i__4251_4257);
var name_4259 = cljs.core.nth.call(null,vec__4252_4258,0,null);
var value_4260 = cljs.core.nth.call(null,vec__4252_4258,1,null);
domina.set_style_BANG_.call(null,content,name_4259,value_4260);
{
var G__4261 = seq__4248_4254;
var G__4262 = chunk__4249_4255;
var G__4263 = count__4250_4256;
var G__4264 = (i__4251_4257 + 1);
seq__4248_4254 = G__4261;
chunk__4249_4255 = G__4262;
count__4250_4256 = G__4263;
i__4251_4257 = G__4264;
continue;
}
} else
{var temp__4092__auto___4265 = cljs.core.seq.call(null,seq__4248_4254);
if(temp__4092__auto___4265)
{var seq__4248_4266__$1 = temp__4092__auto___4265;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4248_4266__$1))
{var c__3224__auto___4267 = cljs.core.chunk_first.call(null,seq__4248_4266__$1);
{
var G__4268 = cljs.core.chunk_rest.call(null,seq__4248_4266__$1);
var G__4269 = c__3224__auto___4267;
var G__4270 = cljs.core.count.call(null,c__3224__auto___4267);
var G__4271 = 0;
seq__4248_4254 = G__4268;
chunk__4249_4255 = G__4269;
count__4250_4256 = G__4270;
i__4251_4257 = G__4271;
continue;
}
} else
{var vec__4253_4272 = cljs.core.first.call(null,seq__4248_4266__$1);
var name_4273 = cljs.core.nth.call(null,vec__4253_4272,0,null);
var value_4274 = cljs.core.nth.call(null,vec__4253_4272,1,null);
domina.set_style_BANG_.call(null,content,name_4273,value_4274);
{
var G__4275 = cljs.core.next.call(null,seq__4248_4266__$1);
var G__4276 = null;
var G__4277 = 0;
var G__4278 = 0;
seq__4248_4254 = G__4275;
chunk__4249_4255 = G__4276;
count__4250_4256 = G__4277;
i__4251_4257 = G__4278;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Sets the specified attributes for each node in the content, given a map of names and values. Names may be a string or keyword. Values will be cast to a string, multiple values wil be concatenated.
*/
domina.set_attrs_BANG_ = (function set_attrs_BANG_(content,attrs){
var seq__4285_4291 = cljs.core.seq.call(null,attrs);
var chunk__4286_4292 = null;
var count__4287_4293 = 0;
var i__4288_4294 = 0;
while(true){
if((i__4288_4294 < count__4287_4293))
{var vec__4289_4295 = cljs.core._nth.call(null,chunk__4286_4292,i__4288_4294);
var name_4296 = cljs.core.nth.call(null,vec__4289_4295,0,null);
var value_4297 = cljs.core.nth.call(null,vec__4289_4295,1,null);
domina.set_attr_BANG_.call(null,content,name_4296,value_4297);
{
var G__4298 = seq__4285_4291;
var G__4299 = chunk__4286_4292;
var G__4300 = count__4287_4293;
var G__4301 = (i__4288_4294 + 1);
seq__4285_4291 = G__4298;
chunk__4286_4292 = G__4299;
count__4287_4293 = G__4300;
i__4288_4294 = G__4301;
continue;
}
} else
{var temp__4092__auto___4302 = cljs.core.seq.call(null,seq__4285_4291);
if(temp__4092__auto___4302)
{var seq__4285_4303__$1 = temp__4092__auto___4302;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4285_4303__$1))
{var c__3224__auto___4304 = cljs.core.chunk_first.call(null,seq__4285_4303__$1);
{
var G__4305 = cljs.core.chunk_rest.call(null,seq__4285_4303__$1);
var G__4306 = c__3224__auto___4304;
var G__4307 = cljs.core.count.call(null,c__3224__auto___4304);
var G__4308 = 0;
seq__4285_4291 = G__4305;
chunk__4286_4292 = G__4306;
count__4287_4293 = G__4307;
i__4288_4294 = G__4308;
continue;
}
} else
{var vec__4290_4309 = cljs.core.first.call(null,seq__4285_4303__$1);
var name_4310 = cljs.core.nth.call(null,vec__4290_4309,0,null);
var value_4311 = cljs.core.nth.call(null,vec__4290_4309,1,null);
domina.set_attr_BANG_.call(null,content,name_4310,value_4311);
{
var G__4312 = cljs.core.next.call(null,seq__4285_4303__$1);
var G__4313 = null;
var G__4314 = 0;
var G__4315 = 0;
seq__4285_4291 = G__4312;
chunk__4286_4292 = G__4313;
count__4287_4293 = G__4314;
i__4288_4294 = G__4315;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns true if the node has the specified CSS class. Assumes content is a single node.
*/
domina.has_class_QMARK_ = (function has_class_QMARK_(content,class$){
return goog.dom.classes.has(domina.single_node.call(null,content),class$);
});
/**
* Adds the specified CSS class to each node in the content.
*/
domina.add_class_BANG_ = (function add_class_BANG_(content,class$){
var seq__4320_4324 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4321_4325 = null;
var count__4322_4326 = 0;
var i__4323_4327 = 0;
while(true){
if((i__4323_4327 < count__4322_4326))
{var node_4328 = cljs.core._nth.call(null,chunk__4321_4325,i__4323_4327);
goog.dom.classes.add(node_4328,class$);
{
var G__4329 = seq__4320_4324;
var G__4330 = chunk__4321_4325;
var G__4331 = count__4322_4326;
var G__4332 = (i__4323_4327 + 1);
seq__4320_4324 = G__4329;
chunk__4321_4325 = G__4330;
count__4322_4326 = G__4331;
i__4323_4327 = G__4332;
continue;
}
} else
{var temp__4092__auto___4333 = cljs.core.seq.call(null,seq__4320_4324);
if(temp__4092__auto___4333)
{var seq__4320_4334__$1 = temp__4092__auto___4333;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4320_4334__$1))
{var c__3224__auto___4335 = cljs.core.chunk_first.call(null,seq__4320_4334__$1);
{
var G__4336 = cljs.core.chunk_rest.call(null,seq__4320_4334__$1);
var G__4337 = c__3224__auto___4335;
var G__4338 = cljs.core.count.call(null,c__3224__auto___4335);
var G__4339 = 0;
seq__4320_4324 = G__4336;
chunk__4321_4325 = G__4337;
count__4322_4326 = G__4338;
i__4323_4327 = G__4339;
continue;
}
} else
{var node_4340 = cljs.core.first.call(null,seq__4320_4334__$1);
goog.dom.classes.add(node_4340,class$);
{
var G__4341 = cljs.core.next.call(null,seq__4320_4334__$1);
var G__4342 = null;
var G__4343 = 0;
var G__4344 = 0;
seq__4320_4324 = G__4341;
chunk__4321_4325 = G__4342;
count__4322_4326 = G__4343;
i__4323_4327 = G__4344;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Removes the specified CSS class from each node in the content.
*/
domina.remove_class_BANG_ = (function remove_class_BANG_(content,class$){
var seq__4349_4353 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4350_4354 = null;
var count__4351_4355 = 0;
var i__4352_4356 = 0;
while(true){
if((i__4352_4356 < count__4351_4355))
{var node_4357 = cljs.core._nth.call(null,chunk__4350_4354,i__4352_4356);
goog.dom.classes.remove(node_4357,class$);
{
var G__4358 = seq__4349_4353;
var G__4359 = chunk__4350_4354;
var G__4360 = count__4351_4355;
var G__4361 = (i__4352_4356 + 1);
seq__4349_4353 = G__4358;
chunk__4350_4354 = G__4359;
count__4351_4355 = G__4360;
i__4352_4356 = G__4361;
continue;
}
} else
{var temp__4092__auto___4362 = cljs.core.seq.call(null,seq__4349_4353);
if(temp__4092__auto___4362)
{var seq__4349_4363__$1 = temp__4092__auto___4362;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4349_4363__$1))
{var c__3224__auto___4364 = cljs.core.chunk_first.call(null,seq__4349_4363__$1);
{
var G__4365 = cljs.core.chunk_rest.call(null,seq__4349_4363__$1);
var G__4366 = c__3224__auto___4364;
var G__4367 = cljs.core.count.call(null,c__3224__auto___4364);
var G__4368 = 0;
seq__4349_4353 = G__4365;
chunk__4350_4354 = G__4366;
count__4351_4355 = G__4367;
i__4352_4356 = G__4368;
continue;
}
} else
{var node_4369 = cljs.core.first.call(null,seq__4349_4363__$1);
goog.dom.classes.remove(node_4369,class$);
{
var G__4370 = cljs.core.next.call(null,seq__4349_4363__$1);
var G__4371 = null;
var G__4372 = 0;
var G__4373 = 0;
seq__4349_4353 = G__4370;
chunk__4350_4354 = G__4371;
count__4351_4355 = G__4372;
i__4352_4356 = G__4373;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Toggles the specified CSS class from each node in the content.
*/
domina.toggle_class_BANG_ = (function toggle_class_BANG_(content,class$){
var seq__4378_4382 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4379_4383 = null;
var count__4380_4384 = 0;
var i__4381_4385 = 0;
while(true){
if((i__4381_4385 < count__4380_4384))
{var node_4386 = cljs.core._nth.call(null,chunk__4379_4383,i__4381_4385);
goog.dom.classes.toggle(node_4386,class$);
{
var G__4387 = seq__4378_4382;
var G__4388 = chunk__4379_4383;
var G__4389 = count__4380_4384;
var G__4390 = (i__4381_4385 + 1);
seq__4378_4382 = G__4387;
chunk__4379_4383 = G__4388;
count__4380_4384 = G__4389;
i__4381_4385 = G__4390;
continue;
}
} else
{var temp__4092__auto___4391 = cljs.core.seq.call(null,seq__4378_4382);
if(temp__4092__auto___4391)
{var seq__4378_4392__$1 = temp__4092__auto___4391;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4378_4392__$1))
{var c__3224__auto___4393 = cljs.core.chunk_first.call(null,seq__4378_4392__$1);
{
var G__4394 = cljs.core.chunk_rest.call(null,seq__4378_4392__$1);
var G__4395 = c__3224__auto___4393;
var G__4396 = cljs.core.count.call(null,c__3224__auto___4393);
var G__4397 = 0;
seq__4378_4382 = G__4394;
chunk__4379_4383 = G__4395;
count__4380_4384 = G__4396;
i__4381_4385 = G__4397;
continue;
}
} else
{var node_4398 = cljs.core.first.call(null,seq__4378_4392__$1);
goog.dom.classes.toggle(node_4398,class$);
{
var G__4399 = cljs.core.next.call(null,seq__4378_4392__$1);
var G__4400 = null;
var G__4401 = 0;
var G__4402 = 0;
seq__4378_4382 = G__4399;
chunk__4379_4383 = G__4400;
count__4380_4384 = G__4401;
i__4381_4385 = G__4402;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns a seq of all the CSS classes currently applied to a node. Assumes content is a single node.
*/
domina.classes = (function classes(content){
return cljs.core.seq.call(null,goog.dom.classes.get(domina.single_node.call(null,content)));
});
/**
* Sets the class attribute of the content nodes to classes, which can
* be either a class attribute string or a seq of classname strings.
*/
domina.set_classes_BANG_ = (function set_classes_BANG_(content,classes){
var classes_4411__$1 = ((cljs.core.coll_QMARK_.call(null,classes))?clojure.string.join.call(null," ",classes):classes);
var seq__4407_4412 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4408_4413 = null;
var count__4409_4414 = 0;
var i__4410_4415 = 0;
while(true){
if((i__4410_4415 < count__4409_4414))
{var node_4416 = cljs.core._nth.call(null,chunk__4408_4413,i__4410_4415);
goog.dom.classes.set(node_4416,classes_4411__$1);
{
var G__4417 = seq__4407_4412;
var G__4418 = chunk__4408_4413;
var G__4419 = count__4409_4414;
var G__4420 = (i__4410_4415 + 1);
seq__4407_4412 = G__4417;
chunk__4408_4413 = G__4418;
count__4409_4414 = G__4419;
i__4410_4415 = G__4420;
continue;
}
} else
{var temp__4092__auto___4421 = cljs.core.seq.call(null,seq__4407_4412);
if(temp__4092__auto___4421)
{var seq__4407_4422__$1 = temp__4092__auto___4421;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4407_4422__$1))
{var c__3224__auto___4423 = cljs.core.chunk_first.call(null,seq__4407_4422__$1);
{
var G__4424 = cljs.core.chunk_rest.call(null,seq__4407_4422__$1);
var G__4425 = c__3224__auto___4423;
var G__4426 = cljs.core.count.call(null,c__3224__auto___4423);
var G__4427 = 0;
seq__4407_4412 = G__4424;
chunk__4408_4413 = G__4425;
count__4409_4414 = G__4426;
i__4410_4415 = G__4427;
continue;
}
} else
{var node_4428 = cljs.core.first.call(null,seq__4407_4422__$1);
goog.dom.classes.set(node_4428,classes_4411__$1);
{
var G__4429 = cljs.core.next.call(null,seq__4407_4422__$1);
var G__4430 = null;
var G__4431 = 0;
var G__4432 = 0;
seq__4407_4412 = G__4429;
chunk__4408_4413 = G__4430;
count__4409_4414 = G__4431;
i__4410_4415 = G__4432;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the text of a node. Assumes content is a single node. For consistency across browsers, will always trim whitespace of the beginning and end of the returned text.
*/
domina.text = (function text(content){
return goog.string.trim(goog.dom.getTextContent(domina.single_node.call(null,content)));
});
/**
* Sets the text value of all the nodes in the given content.
*/
domina.set_text_BANG_ = (function set_text_BANG_(content,value){
var seq__4437_4441 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4438_4442 = null;
var count__4439_4443 = 0;
var i__4440_4444 = 0;
while(true){
if((i__4440_4444 < count__4439_4443))
{var node_4445 = cljs.core._nth.call(null,chunk__4438_4442,i__4440_4444);
goog.dom.setTextContent(node_4445,value);
{
var G__4446 = seq__4437_4441;
var G__4447 = chunk__4438_4442;
var G__4448 = count__4439_4443;
var G__4449 = (i__4440_4444 + 1);
seq__4437_4441 = G__4446;
chunk__4438_4442 = G__4447;
count__4439_4443 = G__4448;
i__4440_4444 = G__4449;
continue;
}
} else
{var temp__4092__auto___4450 = cljs.core.seq.call(null,seq__4437_4441);
if(temp__4092__auto___4450)
{var seq__4437_4451__$1 = temp__4092__auto___4450;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4437_4451__$1))
{var c__3224__auto___4452 = cljs.core.chunk_first.call(null,seq__4437_4451__$1);
{
var G__4453 = cljs.core.chunk_rest.call(null,seq__4437_4451__$1);
var G__4454 = c__3224__auto___4452;
var G__4455 = cljs.core.count.call(null,c__3224__auto___4452);
var G__4456 = 0;
seq__4437_4441 = G__4453;
chunk__4438_4442 = G__4454;
count__4439_4443 = G__4455;
i__4440_4444 = G__4456;
continue;
}
} else
{var node_4457 = cljs.core.first.call(null,seq__4437_4451__$1);
goog.dom.setTextContent(node_4457,value);
{
var G__4458 = cljs.core.next.call(null,seq__4437_4451__$1);
var G__4459 = null;
var G__4460 = 0;
var G__4461 = 0;
seq__4437_4441 = G__4458;
chunk__4438_4442 = G__4459;
count__4439_4443 = G__4460;
i__4440_4444 = G__4461;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the value of a node (presumably a form field). Assumes content is a single node.
*/
domina.value = (function value(content){
return goog.dom.forms.getValue(domina.single_node.call(null,content));
});
/**
* Sets the value of all the nodes (presumably form fields) in the given content.
*/
domina.set_value_BANG_ = (function set_value_BANG_(content,value){
var seq__4466_4470 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4467_4471 = null;
var count__4468_4472 = 0;
var i__4469_4473 = 0;
while(true){
if((i__4469_4473 < count__4468_4472))
{var node_4474 = cljs.core._nth.call(null,chunk__4467_4471,i__4469_4473);
goog.dom.forms.setValue(node_4474,value);
{
var G__4475 = seq__4466_4470;
var G__4476 = chunk__4467_4471;
var G__4477 = count__4468_4472;
var G__4478 = (i__4469_4473 + 1);
seq__4466_4470 = G__4475;
chunk__4467_4471 = G__4476;
count__4468_4472 = G__4477;
i__4469_4473 = G__4478;
continue;
}
} else
{var temp__4092__auto___4479 = cljs.core.seq.call(null,seq__4466_4470);
if(temp__4092__auto___4479)
{var seq__4466_4480__$1 = temp__4092__auto___4479;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4466_4480__$1))
{var c__3224__auto___4481 = cljs.core.chunk_first.call(null,seq__4466_4480__$1);
{
var G__4482 = cljs.core.chunk_rest.call(null,seq__4466_4480__$1);
var G__4483 = c__3224__auto___4481;
var G__4484 = cljs.core.count.call(null,c__3224__auto___4481);
var G__4485 = 0;
seq__4466_4470 = G__4482;
chunk__4467_4471 = G__4483;
count__4468_4472 = G__4484;
i__4469_4473 = G__4485;
continue;
}
} else
{var node_4486 = cljs.core.first.call(null,seq__4466_4480__$1);
goog.dom.forms.setValue(node_4486,value);
{
var G__4487 = cljs.core.next.call(null,seq__4466_4480__$1);
var G__4488 = null;
var G__4489 = 0;
var G__4490 = 0;
seq__4466_4470 = G__4487;
chunk__4467_4471 = G__4488;
count__4468_4472 = G__4489;
i__4469_4473 = G__4490;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the innerHTML of a node. Assumes content is a single node.
*/
domina.html = (function html(content){
return domina.single_node.call(null,content).innerHTML;
});
domina.replace_children_BANG_ = (function replace_children_BANG_(content,inner_content){
return domina.append_BANG_.call(null,domina.destroy_children_BANG_.call(null,content),inner_content);
});
domina.set_inner_html_BANG_ = (function set_inner_html_BANG_(content,html_string){
var allows_inner_html_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_no_inner_html,html_string));
var leading_whitespace_QMARK_ = cljs.core.re_find.call(null,domina.re_leading_whitespace,html_string);
var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html_string)))].join('').toLowerCase();
var special_tag_QMARK_ = cljs.core.contains_QMARK_.call(null,domina.wrap_map,tag_name);
if(cljs.core.truth_((function (){var and__3941__auto__ = allows_inner_html_QMARK_;
if(and__3941__auto__)
{var and__3941__auto____$1 = (function (){var or__3943__auto__ = domina.support.leading_whitespace_QMARK_;
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.not.call(null,leading_whitespace_QMARK_);
}
})();
if(cljs.core.truth_(and__3941__auto____$1))
{return !(special_tag_QMARK_);
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{var value_4501 = clojure.string.replace.call(null,html_string,domina.re_xhtml_tag,"<$1></$2>");
try{var seq__4497_4502 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4498_4503 = null;
var count__4499_4504 = 0;
var i__4500_4505 = 0;
while(true){
if((i__4500_4505 < count__4499_4504))
{var node_4506 = cljs.core._nth.call(null,chunk__4498_4503,i__4500_4505);
node_4506.innerHTML = value_4501;
{
var G__4507 = seq__4497_4502;
var G__4508 = chunk__4498_4503;
var G__4509 = count__4499_4504;
var G__4510 = (i__4500_4505 + 1);
seq__4497_4502 = G__4507;
chunk__4498_4503 = G__4508;
count__4499_4504 = G__4509;
i__4500_4505 = G__4510;
continue;
}
} else
{var temp__4092__auto___4511 = cljs.core.seq.call(null,seq__4497_4502);
if(temp__4092__auto___4511)
{var seq__4497_4512__$1 = temp__4092__auto___4511;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4497_4512__$1))
{var c__3224__auto___4513 = cljs.core.chunk_first.call(null,seq__4497_4512__$1);
{
var G__4514 = cljs.core.chunk_rest.call(null,seq__4497_4512__$1);
var G__4515 = c__3224__auto___4513;
var G__4516 = cljs.core.count.call(null,c__3224__auto___4513);
var G__4517 = 0;
seq__4497_4502 = G__4514;
chunk__4498_4503 = G__4515;
count__4499_4504 = G__4516;
i__4500_4505 = G__4517;
continue;
}
} else
{var node_4518 = cljs.core.first.call(null,seq__4497_4512__$1);
node_4518.innerHTML = value_4501;
{
var G__4519 = cljs.core.next.call(null,seq__4497_4512__$1);
var G__4520 = null;
var G__4521 = 0;
var G__4522 = 0;
seq__4497_4502 = G__4519;
chunk__4498_4503 = G__4520;
count__4499_4504 = G__4521;
i__4500_4505 = G__4522;
continue;
}
}
} else
{}
}
break;
}
}catch (e4496){if((e4496 instanceof Error))
{var e_4523 = e4496;
domina.replace_children_BANG_.call(null,content,value_4501);
} else
{if("\uFDD0:else")
{throw e4496;
} else
{}
}
}} else
{domina.replace_children_BANG_.call(null,content,html_string);
}
return content;
});
/**
* Sets the innerHTML value for all the nodes in the given content.
*/
domina.set_html_BANG_ = (function set_html_BANG_(content,inner_content){
if(cljs.core.string_QMARK_.call(null,inner_content))
{return domina.set_inner_html_BANG_.call(null,content,inner_content);
} else
{return domina.replace_children_BANG_.call(null,content,inner_content);
}
});
/**
* Returns data associated with a node for a given key. Assumes
* content is a single node. If the bubble parameter is set to true,
* will search parent nodes if the key is not found.
*/
domina.get_data = (function() {
var get_data = null;
var get_data__2 = (function (node,key){
return get_data.call(null,node,key,false);
});
var get_data__3 = (function (node,key,bubble){
var m = domina.single_node.call(null,node).__domina_data;
var value = (cljs.core.truth_(m)?cljs.core.get.call(null,m,key):null);
if(cljs.core.truth_((function (){var and__3941__auto__ = bubble;
if(cljs.core.truth_(and__3941__auto__))
{return (value == null);
} else
{return and__3941__auto__;
}
})()))
{var temp__4092__auto__ = domina.single_node.call(null,node).parentNode;
if(cljs.core.truth_(temp__4092__auto__))
{var parent = temp__4092__auto__;
return get_data.call(null,parent,key,true);
} else
{return null;
}
} else
{return value;
}
});
get_data = function(node,key,bubble){
switch(arguments.length){
case 2:
return get_data__2.call(this,node,key);
case 3:
return get_data__3.call(this,node,key,bubble);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
get_data.cljs$core$IFn$_invoke$arity$2 = get_data__2;
get_data.cljs$core$IFn$_invoke$arity$3 = get_data__3;
return get_data;
})()
;
/**
* Sets a data on the node for a given key. Assumes content is a
* single node. Data should be ClojureScript values and data structures
* only; using other objects as data may result in memory leaks on some
* browsers.
*/
domina.set_data_BANG_ = (function set_data_BANG_(node,key,value){
var m = (function (){var or__3943__auto__ = domina.single_node.call(null,node).__domina_data;
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.ObjMap.EMPTY;
}
})();
return domina.single_node.call(null,node).__domina_data = cljs.core.assoc.call(null,m,key,value);
});
/**
* Takes a two-arg function, a reference DomContent and new
* DomContent. Applies the function for each reference / content
* combination. Uses clones of the new content for each additional
* parent after the first.
*/
domina.apply_with_cloning = (function apply_with_cloning(f,parent_content,child_content){
var parents = domina.nodes.call(null,parent_content);
var children = domina.nodes.call(null,child_content);
var first_child = (function (){var frag = document.createDocumentFragment();
var seq__4530_4534 = cljs.core.seq.call(null,children);
var chunk__4531_4535 = null;
var count__4532_4536 = 0;
var i__4533_4537 = 0;
while(true){
if((i__4533_4537 < count__4532_4536))
{var child_4538 = cljs.core._nth.call(null,chunk__4531_4535,i__4533_4537);
frag.appendChild(child_4538);
{
var G__4539 = seq__4530_4534;
var G__4540 = chunk__4531_4535;
var G__4541 = count__4532_4536;
var G__4542 = (i__4533_4537 + 1);
seq__4530_4534 = G__4539;
chunk__4531_4535 = G__4540;
count__4532_4536 = G__4541;
i__4533_4537 = G__4542;
continue;
}
} else
{var temp__4092__auto___4543 = cljs.core.seq.call(null,seq__4530_4534);
if(temp__4092__auto___4543)
{var seq__4530_4544__$1 = temp__4092__auto___4543;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4530_4544__$1))
{var c__3224__auto___4545 = cljs.core.chunk_first.call(null,seq__4530_4544__$1);
{
var G__4546 = cljs.core.chunk_rest.call(null,seq__4530_4544__$1);
var G__4547 = c__3224__auto___4545;
var G__4548 = cljs.core.count.call(null,c__3224__auto___4545);
var G__4549 = 0;
seq__4530_4534 = G__4546;
chunk__4531_4535 = G__4547;
count__4532_4536 = G__4548;
i__4533_4537 = G__4549;
continue;
}
} else
{var child_4550 = cljs.core.first.call(null,seq__4530_4544__$1);
frag.appendChild(child_4550);
{
var G__4551 = cljs.core.next.call(null,seq__4530_4544__$1);
var G__4552 = null;
var G__4553 = 0;
var G__4554 = 0;
seq__4530_4534 = G__4551;
chunk__4531_4535 = G__4552;
count__4532_4536 = G__4553;
i__4533_4537 = G__4554;
continue;
}
}
} else
{}
}
break;
}
return frag;
})();
var other_children = cljs.core.doall.call(null,cljs.core.repeatedly.call(null,(cljs.core.count.call(null,parents) - 1),((function (parents,children,first_child){
return (function (){
return first_child.cloneNode(true);
});})(parents,children,first_child))
));
if(cljs.core.seq.call(null,parents))
{f.call(null,cljs.core.first.call(null,parents),first_child);
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__4524_SHARP_,p2__4525_SHARP_){
return f.call(null,p1__4524_SHARP_,p2__4525_SHARP_);
}),cljs.core.rest.call(null,parents),other_children));
} else
{return null;
}
});
domina.lazy_nl_via_item = (function() {
var lazy_nl_via_item = null;
var lazy_nl_via_item__1 = (function (nl){
return lazy_nl_via_item.call(null,nl,0);
});
var lazy_nl_via_item__2 = (function (nl,n){
if((n < nl.length))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,nl.item(n),lazy_nl_via_item.call(null,nl,(n + 1)));
}),null));
} else
{return null;
}
});
lazy_nl_via_item = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_item__1.call(this,nl);
case 2:
return lazy_nl_via_item__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_item__1;
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_item__2;
return lazy_nl_via_item;
})()
;
domina.lazy_nl_via_array_ref = (function() {
var lazy_nl_via_array_ref = null;
var lazy_nl_via_array_ref__1 = (function (nl){
return lazy_nl_via_array_ref.call(null,nl,0);
});
var lazy_nl_via_array_ref__2 = (function (nl,n){
if((n < nl.length))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,(nl[n]),lazy_nl_via_array_ref.call(null,nl,(n + 1)));
}),null));
} else
{return null;
}
});
lazy_nl_via_array_ref = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_array_ref__1.call(this,nl);
case 2:
return lazy_nl_via_array_ref__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_array_ref__1;
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_array_ref__2;
return lazy_nl_via_array_ref;
})()
;
/**
* A lazy seq view of a js/NodeList, or other array-like javascript things
*/
domina.lazy_nodelist = (function lazy_nodelist(nl){
if(cljs.core.truth_(nl.item))
{return domina.lazy_nl_via_item.call(null,nl);
} else
{return domina.lazy_nl_via_array_ref.call(null,nl);
}
});
domina.array_like_QMARK_ = (function array_like_QMARK_(obj){
var and__3941__auto__ = obj;
if(cljs.core.truth_(and__3941__auto__))
{var and__3941__auto____$1 = cljs.core.not.call(null,obj.nodeName);
if(and__3941__auto____$1)
{return obj.length;
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
});
/**
* Some versions of IE have things that are like arrays in that they
* respond to .length, but are not arrays nor NodeSets. This returns a
* real sequence view of such objects. If passed an object that is not
* a logical sequence at all, returns a single-item seq containing the
* object.
*/
domina.normalize_seq = (function normalize_seq(list_thing){
if((list_thing == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__4556 = list_thing;
if(G__4556)
{if((function (){var or__3943__auto__ = (G__4556.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__4556.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__4556.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__4556);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__4556);
}
})())
{return cljs.core.seq.call(null,list_thing);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,list_thing)))
{return domina.lazy_nodelist.call(null,list_thing);
} else
{if("\uFDD0:default")
{return cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([list_thing], true));
} else
{return null;
}
}
}
}
});
(domina.DomContent["_"] = true);
(domina.nodes["_"] = (function (content){
if((content == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__4557 = content;
if(G__4557)
{if((function (){var or__3943__auto__ = (G__4557.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__4557.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__4557.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__4557);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__4557);
}
})())
{return cljs.core.seq.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return domina.lazy_nodelist.call(null,content);
} else
{if("\uFDD0:default")
{return cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([content], true));
} else
{return null;
}
}
}
}
}));
(domina.single_node["_"] = (function (content){
if((content == null))
{return null;
} else
{if((function (){var G__4558 = content;
if(G__4558)
{if((function (){var or__3943__auto__ = (G__4558.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__4558.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__4558.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__4558);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__4558);
}
})())
{return cljs.core.first.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return content.item(0);
} else
{if("\uFDD0:default")
{return content;
} else
{return null;
}
}
}
}
}));
(domina.DomContent["string"] = true);
(domina.nodes["string"] = (function (s){
return cljs.core.doall.call(null,domina.nodes.call(null,domina.string_to_dom.call(null,s)));
}));
(domina.single_node["string"] = (function (s){
return domina.single_node.call(null,domina.string_to_dom.call(null,s));
}));
if(cljs.core.truth_((typeof NodeList != 'undefined')))
{NodeList.prototype.cljs$core$ISeqable$ = true;
NodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){
return domina.lazy_nodelist.call(null,nodelist);
});
NodeList.prototype.cljs$core$IIndexed$ = true;
NodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){
return nodelist.item(n);
});
NodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){
if((nodelist.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist,n);
}
});
NodeList.prototype.cljs$core$ICounted$ = true;
NodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){
return nodelist.length;
});
} else
{}
if(cljs.core.truth_((typeof StaticNodeList != 'undefined')))
{StaticNodeList.prototype.cljs$core$ISeqable$ = true;
StaticNodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){
return domina.lazy_nodelist.call(null,nodelist);
});
StaticNodeList.prototype.cljs$core$IIndexed$ = true;
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){
return nodelist.item(n);
});
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){
if((nodelist.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist,n);
}
});
StaticNodeList.prototype.cljs$core$ICounted$ = true;
StaticNodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){
return nodelist.length;
});
} else
{}
if(cljs.core.truth_((typeof HTMLCollection != 'undefined')))
{HTMLCollection.prototype.cljs$core$ISeqable$ = true;
HTMLCollection.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
return domina.lazy_nodelist.call(null,coll);
});
HTMLCollection.prototype.cljs$core$IIndexed$ = true;
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
return coll.item(n);
});
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
if((coll.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,coll,n);
}
});
HTMLCollection.prototype.cljs$core$ICounted$ = true;
HTMLCollection.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
return coll.length;
});
} else
{}
