/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
 */
var	editorCKE;
jQuery(document).ready(function () {
	a11yfirsteditorSettings.configuration['on'] = {
		configLoaded : function ( evt ) {
			if (typeof(a11yfirsteditorSettings.externalPlugins) != 'undefined') {
				var externals=new Array();
				for (var x in a11yfirsteditorSettings.externalPlugins) {
					CKEDITOR.plugins.addExternal(x, a11yfirsteditorSettings.externalPlugins[x]);
					externals.push(x);
				}
			}
			evt.editor.config.extraPlugins += (evt.editor.config.extraPlugins ? ','+externals.join(',') : externals.join(','));
			if (evt.editor.config.toolbar && evt.editor.config[evt.editor.config.toolbar +'_removeButtons']);
				evt.editor.config.removeButtons = evt.editor.config[evt.editor.config.toolbar +'_removeButtons'];
			CKEDITOR.addCss(evt.editor.config.extraCss);
		}
	};
	CKEDITOR.on( 'instanceReady', function( ev )
	{
		var dtd = CKEDITOR.dtd;
		for ( var e in CKEDITOR.tools.extend( {}, dtd.$nonBodyContent, dtd.$block, dtd.$listItem, dtd.$tableContent ) )
		{
			ev.editor.dataProcessor.writer.setRules( e, a11yfirsteditorSettings.outputFormat);
		}
		ev.editor.dataProcessor.writer.setRules( 'br',
		{
			breakAfterOpen : true
		});
		ev.editor.dataProcessor.writer.setRules( 'pre',
		{
			indent: false
		});
		editorCKE = CKEDITOR.instances['content'];
	});

	if (a11yfirsteditorSettings.textarea_id != 'comment'){
		edInsertContentOld = function () {
			return ;
		};
		if(typeof(window.edInsertContent) != 'undefined'){
			edInsertContentOld = window.edInsertContent;
		}
		window.edInsertContent = function (myField, myValue) {
			if(typeof(CKEDITOR) != 'undefined' && typeof(editorCKE) != 'undefined'){
				editorCKE.insertHtml(myValue);
			} else {
				edInsertContentOld(myField, myValue);
			}
		};
		var autosaveOld = function () {
			return ;
		};
		if(typeof(window.autosave) != 'undefined'){
			autosaveOld = window.autosave;
		}

		if(typeof(window.switchEditors) != 'undefined') {
			window.switchEditors.go = function(id, mode) {
				if ('tinymce' == mode || 'tmce' == mode) {
					jQuery('#'+id).closest('.html-active').removeClass('html-active').addClass('tmce-active');
					ckeditorOn(id);
				} else {
					jQuery('#'+id).closest('.tmce-active').removeClass('tmce-active').addClass('html-active');
					ckeditorOff(id);
					jQuery('.js .theEditor').attr('style', 'color: black;');
				}
			};
			window.switchEditors.switchto = function(elm) {
				var id = jQuery('#'+elm.id).closest('.wp-editor-wrap').find('textarea').attr('id');
				return window.switchEditors.go(id, elm.id.replace('content-', ''));
			}
		}
	}
	//if qTranslate plugin enabled
	if ( a11yfirsteditorSettings.qtransEnabled ){
		//custom version of switchEditors function when qTranslate plugin is enabled
		if(typeof(window.switchEditors) != 'undefined') {
			window.switchEditors.go = function(id, lang) {

				id = id || 'content';
				lang = lang || 'toggle';

				if ( 'toggle' == lang ) {
					if ( ed && !ed.isHidden() )
						lang = 'html';
					else
						lang = 'tmce';
				} else if( 'tinymce' == lang )
					lang = 'tmce';

				var inst = tinyMCE.get('qtrans_textarea_' + id);
				var vta = document.getElementById('qtrans_textarea_' + id);
				var ta = document.getElementById(id);
				var wrap_id = 'wp-'+id+'-wrap';

				// update merged content
				if(inst && ! inst.isHidden()) {
					tinyMCE.triggerSave();
				} else {
					qtrans_save(vta.value);
				}
				// check if language is already active
				if(lang!='tmce' && lang!='html' && document.getElementById('qtrans_select_'+lang).className=='wp-switch-editor switch-tmce switch-html') {
					return;
				}

				if(lang!='tmce' && lang!='html') {
					document.getElementById('qtrans_select_'+qtrans_get_active_language()).className='wp-switch-editor';
					document.getElementById('qtrans_select_'+lang).className='wp-switch-editor switch-tmce switch-html';
				}
				if(lang=='html') {
					if ( inst && inst.isHidden() )
						return false;
					if ( inst ) {
						vta.style.height = inst.getContentAreaContainer().offsetHeight + 20 + 'px';
						inst.hide();
					}
					jQuery("#"+wrap_id).removeClass('tmce-active');
					jQuery("#"+wrap_id).addClass('html-active');
					setUserSetting( 'editor', 'html' );
				} else if(lang=='tmce') {
					if(inst && ! inst.isHidden())
						return false;
					if ( tinyMCEPreInit.mceInit[id] && tinyMCEPreInit.mceInit[id].wpautop )
						vta.value = this.wpautop(qtrans_use(qtrans_get_active_language(),ta.value));
					if (inst) {
						inst.show();
					} else {
						qtrans_hook_on_tinyMCE(id);
					}
					jQuery("#"+wrap_id).removeClass('html-active');
					jQuery("#"+wrap_id).addClass('tmce-active');
					setUserSetting('editor', 'tinymce');
				} else {
					// switch content
					qtrans_assign('qtrans_textarea_'+id,qtrans_use(lang,ta.value));
				}
			}
			window.switchEditors.switchto = function(elm) {
				var id = jQuery('#'+elm.id).closest('.wp-editor-wrap').find('textarea').attr('id');
				return window.switchEditors.go(id, elm.id.replace('content-', ''));
			}
		}
		jQuery('#edButtonHTML').addClass('active');
		jQuery('#edButtonPreview').removeClass('active');
		if(a11yfirsteditorSettings.textarea_id != 'comment'){

			a11yfirsteditorSettings.textarea_id = 'qtrans_textarea_content';
			a11yfirsteditorSettings.configuration['on'].getData = function (evt) {
				evt.data.dataValue = evt.data.dataValue.replace(/(^<\/p>)|(<p>$)/g, '');
				evt.data.dataValue = evt.data.dataValue.replace(/^<p>(\s|\n|\r)*<p>/g, '<p>');
				evt.data.dataValue = evt.data.dataValue.replace(/<\/p>(\s|\n|\r)*<\/p>(\s|\n|\r)*$/g, '<\/p>');
				qtrans_save(evt.data.dataValue);
			};
			if ( jQuery('#'+a11yfirsteditorSettings.textarea_id).length && typeof CKEDITOR.instances[a11yfirsteditorSettings.textarea_id] == 'undefined' ) {
				CKEDITOR.replace(a11yfirsteditorSettings.textarea_id, a11yfirsteditorSettings.configuration);
				editorCKE = CKEDITOR.instances[a11yfirsteditorSettings.textarea_id];
				//add afterCommandExec exect to last created CKEditor instance
				editorCKE.on( 'afterCommandExec', function(ev) {
					afterCommandEvent(ev);
				});
			}

			window.tinyMCE = tinymce =  getTinyMCEObject();
		}
	}else {
		if(a11yfirsteditorSettings.autostart && (typeof getUserSetting == 'undefined' || getUserSetting('editor') === '' || getUserSetting('editor') == 'tinymce')){
			ckeditorOn();
		}
	}
	jQuery("#update-gallery").click(function(){
		updateCkeGallery();
	});

	if (a11yfirsteditorSettings.excerpt_state && jQuery("textarea#excerpt").length > 0 && jQuery("#postexcerpt-hide").attr('checked') == 'checked') {
		//ckeditorOn('excerpt');
		CKEDITOR.replace('excerpt', a11yfirsteditorSettings.configuration);
	}
	if (typeof window.tinyMCE != 'undefined') {
		if (typeof QTags != 'undefined') {
			jQuery(".row-actions span.reply a").on('click', function(){
				if (typeof CKEDITOR.instances['replycontent'] != 'undefined') {
					ckeditorOff('replycontent');
				}
				CKEDITOR.replace('replycontent', {'basicEntities' : false, 'entities': false,'toolbar_Comments' : [{ name: 'basicstyles', items : [ 'Bold','Italic','Underline'] }, { name: 'links', items : [ 'Link','Unlink' ] },{ name: 'paragraph', items : [ 'NumberedList','BulletedList'] }, { name: 'insert', items : [ 'Image' ] } ],  'toolbar' : 'Comments'});
			});
			jQuery("#replyrow a.save").unbind('click').on('click', function(){
				var data = null;
				if (typeof CKEDITOR.instances['replycontent'] != 'undefined') {
					data = CKEDITOR.instances['replycontent'].getData();
				}
				if (data != null && data.length > 0 ) {
					jQuery('textarea#replycontent').html(data);
					ckeditorOff('replycontent');
				}
				commentReply.send();
				return;
			});
			jQuery("#replyrow a.cancel").unbind('click').on('click', function(){
				commentReply.revert()
				ckeditorOff('replycontent');
				return;
			});
			QTags.getInstance = function (editor_id) {
				return window.tinyMCE;
			}
		}
	}
});
function ckeditorOn(id) {
	var instance;
	if (typeof(id) != 'undefined' && typeof(CKEDITOR.instances[id]) == 'undefined' )
	{
		setUserSetting( 'editor', 'tinymce' );
		jQuery('#quicktags').hide();
		jQuery('#edButtonPreview').addClass('active');
		jQuery('#edButtonHTML').removeClass('active');
		instance = CKEDITOR.replace(id, a11yfirsteditorSettings.configuration);
	}
	if ( jQuery('textarea#'+a11yfirsteditorSettings.textarea_id).length && (typeof(CKEDITOR.instances) == 'undefined' || typeof(CKEDITOR.instances[a11yfirsteditorSettings.textarea_id]) == 'undefined' ) && jQuery("#"+a11yfirsteditorSettings.textarea_id).parent().parent().attr('id') != 'quick-press') {
		instance =  CKEDITOR.replace(a11yfirsteditorSettings.textarea_id, a11yfirsteditorSettings.configuration);
		if(a11yfirsteditorSettings.textarea_id == 'content') {
			setUserSetting( 'editor', 'tinymce' );
			jQuery('#quicktags').hide();
			jQuery('#edButtonPreview').addClass('active');
			jQuery('#edButtonHTML').removeClass('active');
		}
		else if(a11yfirsteditorSettings.textarea_id == 'comment') {
			var labelObj = jQuery('#'+a11yfirsteditorSettings.textarea_id).prev('label');
			if (labelObj){
				labelObj.hide();
			}
		}
	}
	if (typeof(instance) != 'undefined') {
		//add afterCommandExec exect to last created CKEditor instance
		instance.on( 'afterCommandExec', function(ev) {
			afterCommandEvent(ev);
		});
	}
}

function ckeditorOff(id) {
	if (typeof(id) != 'undefined' && typeof(CKEDITOR.instances[id]) != 'undefined')
	{
		editorCKE = CKEDITOR.instances[id];
	}else
	{
		editorCKE = CKEDITOR.instances[a11yfirsteditorSettings.textarea_id];
	}
	if(typeof(editorCKE) != 'undefined'){
		editorCKE.destroy();
		if(a11yfirsteditorSettings.textarea_id == 'content') {
			setUserSetting( 'editor', 'html' );
			jQuery('#quicktags').show();
			jQuery('#edButtonHTML').addClass('active');
			jQuery('#edButtonPreview').removeClass('active');
		}
	}
}

if ( !a11yfirsteditorSettings.qtransEnabled ){
	var tinymce = window.tinyMCE = getTinyMCEObject();
}
function getTinyMCEObject()
{
	var tinymce = window.tinyMCE = (function () {
		var tinyMCE = {
			isOpera : function() {
				return CKEDITOR.env.opera;
			},
			onAddEditor : { add : function() {
				// this function did nothing else apart from resizing TinyMCE
			} },
			get : function (id) {
				var instant = {
					isHidden : function (){
						editor = CKEDITOR.instances[id];
						if (typeof editorCKE == 'undefined') editorCKE = editor;
						if(typeof(editor) != 'undefined')
						{
								return false;
						}else{
								return true;
						}
					},
					isDirty : function (){
						return false;
					},
					execCommand : function (command, integer, val) {
						if(command == 'mceSetContent') {
							editorCKE.setData(val);
						}
						if (command == 'mceInsertContent')
						{
							editorCKE.insertHtml(val);
						}
					},
					onSaveContent : {
						add : function (func) {
							window.tinymceosc = func;
						}
					},
					on : function(action, callback){
						return callback();
					},
					getContentAreaContainer : function () {
						return {
							offsetHeight : editorCKE.config.height
						};
					},
					hide : function () {
						ckeditorOff(id);
					},
					show : function () {
						ckeditorOn(id);
					},
					save : function(){
						return;
					},
					focus : function(){
						return;
					},
					plugins: {}
				};

				return instant;
			},
			execCommand : function (command, integer, val) {
				if(command == 'mceAddControl'){
					a11yfirsteditorSettings.textarea_id = val;
					if(a11yfirsteditorSettings.autostart) {
						ckeditorOn();
					} else {
						document.getElementById('qtrans_textarea_content').removeAttribute('style');
					}
				}
			},
			triggerSave : function(param) {
				if(typeof(CKEDITOR) != 'undefined' && typeof(editorCKE) != 'undefined')
					editorCKE.updateElement();
			},
			activeEditor : {
				isHidden : function (){
					return false;
				},
				isDirty : function (){
					return false;
				},
				focus : function (){
					return;
				},
				plugins : {},
				execCommand : function(command, state, text)
				{
					if (command == "mceInsertContent")
					{
						//test if image has caption and make necessary text format
						pattern = /\[caption(.*)\]<.*>(.*)\[\/caption\]/i;
						if (pattern.test(text)) {
							replace_match = pattern.exec(text);
							text = text.replace(/<img (.*) \/>/g, function( match, cont )
							{
								cont = cont.replace(/class="(.*)"/g, function( match, cont ){
									tmp = 'class="' + cont + ' wp-caption"';
									return tmp;
								});
								tmp = '<img ' + cont + ' data-cke-caption=\'' + replace_match[1] + '\' data-cke-caption-text=\'' + replace_match[2] + '\' />' ;
								return tmp;
							});
						}
						//setTimeout is required in IE8 when inserting Image gallery from an external modal dialog
						if (typeof editorCKE == 'undefined') editorCKE = CKEDITOR.instances[a11yfirsteditorSettings.textarea_id];
						setTimeout(function(){
							editorCKE.insertHtml(text);
						}, 0);
					}
				},
				selection : {
					getBookmark : function(name) {
						return '';
					}
				},
				windowManager : {
					bookmark: {}
				}
			},
			EditorManager :{
				activeEditor: {
					selection : {
						getNode : function(){
							var obj = jQuery(editorCKE.document.getBody().getHtml());
							var index = 0;
							jQuery.each(obj,function(i, val){
								var images = jQuery("img",jQuery(val));
								jQuery.each(images, function(key, value){
									if (jQuery(value).hasClass('wpGallery, cke_wpgallery'))
									{
										index = i;
										return;
									}
								});
							});
							if (obj.length === 0)
							{
								obj = document.createElement("p");
								return obj;
							}
							return obj[index];
						},
						getBookmark : function(name) {
							return ;
						}
					},
					dom :{
						select : function(selector) {

							//get CKEditor content
							var obj = editorCKE.document.getBody().getHtml();
							images =  editorCKE.document.getElementsByTag('img');
							if ( typeof images.$ == 'undefined' || images.$.length == 0) return [];
							for (var i in images.$)
							{
								if ( typeof images.$[i] != 'undefined' && ((CKEDITOR.env.ie && images.$[i].className == 'wpGallery, cke_wpgallery') || images.$[i].classList == 'wpGallery, cke_wpgallery'))
								{
									var element = new CKEDITOR.dom.element(images.$[i]);
									index = i;
									break;
								}
							}
							var results =[];

							if (typeof element != 'undefined')
							{
								results[0] = images.$[index];
								return  results;

							}else
							{
								return [];
							}
						},
							getAttrib : function(el, selector)
							{
									return jQuery(el).attr(selector);
							},
							//function to set new gallery attributes
							setAttrib : function(el, selector, value)
							{
								//get CKEditor content
								var obj = editorCKE.document.getBody().getHtml();
								images =  editorCKE.document.getElementsByTag('img');
								for (var i in images.$)
								{
									if ( typeof images.$[i] != 'undefined' && ((CKEDITOR.env.ie && images.$[i].className == 'wpGallery, cke_wpgallery') || images.$[i].classList == 'wpGallery, cke_wpgallery'))
									{
										var element = new CKEDITOR.dom.element(images.$[i]);
										element.setAttribute('title', value);
										element.setAttribute('data-gallery', '['+value+']');
									}
								}
							},
							decode : function(text) {
								return text;
							},
							hasClass : function(element, name)
							{
								var hasClass = jQuery(element).attr('class');
								var pattern = /wpGallery/;
								return pattern.test(hasClass);
							}
					}
			},
			get : function(id) {return;}
			},
			DOM :{
				removeClass : function(id, className) {return;},
				addClass : function(id, className) {return;}
			},
			addI18n : function(language, param){
				return ;
			},
			$ : function () {
				return {
					on: function (name, callback) {
						return;
					}
				}
			}
		};
	return tinyMCE;
})();
	return tinymce;
}
var tinyMCEPreInit =  {
	mceInit : function(){
		language : 'en';
	}
};

var tinyMCEPopup = {
	onInit : {
		add : function() {return ;}
	},
	editor : {
		windowManager : {
			createInstance : function(id) {return; }
		}
	}
};
/*
 * Function to move cursor after fake gallery image. Turn on frame show
 */
function updateCkeGallery()
{
	jQuery("#add_image").unbind('click');
	jQuery("#add_image").bind('click',function(){
		return true;
	});
}
function afterCommandEvent(ev)
{
	if (ev.data.name != 'maximize') { return; }
		//if maximize button was clicked hide/show WP admin bar - prevention of hiding buttton under WP admin bar
		if (ev.data.command.state == CKEDITOR.TRISTATE_ON) { jQuery("#wpadminbar").hide() } else { jQuery("#wpadminbar").show() }
}