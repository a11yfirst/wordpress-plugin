/*
Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/

/**
 * Documentation:
 * http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.config.html
 */

CKEDITOR.editorConfig = function(config) {
	// The minimum editor width, in pixels, when resizing it with the resize handle.
	config.resize_minWidth = 450;

	// Protect PHP code tags (<?...?>) so CKEditor will not break them when
	// switching from Source to WYSIWYG.
	config.protectedSource.push(/<\?[\s\S]*?\?>/g);

	config.skin = 'a11yfirst';
	config.startupFocus = true;


    config.plugins =
    'a11ychecker,' +
    'a11yhelp,' +
    'about,' +
    'balloonpanel,' +
    'basicstyles,' +
    'blockquote,' +
    'button,' +
    'clipboard,' +
    'contextmenu,' +
    'dialog,' +
    'dialogui,' +
    'elementspath,' +
    'enterkey,' +
    'entities,' +
    'fakeobjects,' +
    'find,' +
    'floatpanel,' +
    'image,' +
    'indent,' +
    'indentlist,' +
    'language,' +
    'link,' +
    'list,' +
    'listblock,' +
    'liststyle,' +
    'magicline,' +
    'menu,' +
    'menubutton,' +
    'notification,' +
    'panel,' +
    'pastefromword,' +
    'pastetext,' +
    'removeformat,' +
    'resize,' +
    'richcombo,' +
    'showblocks,' +
    'showborders,' +
    'sourcearea,' +
    'specialchar,' +
    'tab,' +
    //'table,' +
    //'tableselection,' +
    //'tabletools,' +
    'toolbar,' +
    'undo,' +
    'wysiwygarea';


    config.extraPlugins =
    'a11yfirsthelp,' +
    'a11yformat,' +
    'a11yheading,' +
    'a11ystylescombo';

    config.language_list = [
    'ar:Arabic:rtl',
    'zh:Chinese',
    'cs:Czech',
    'da:Danish',
    'nl:Dutch',
    'fi:Finnish',
    'fr:French',
    'gd:Gaelic',
    'de:German',
    'el:Greek',
    'he:Hebrew:rtl',
    'hi:Hindi',
    'hu:Hungarian',
    'id:Indonesian',
    'it:Italian',
    'ja:Japanese',
    'ko:Korean',
    'la:Latin',
    'no:Norwegian',
    'fa:Persian:rtl',
    'pl:Polish',
    'pt:Portuguese',
    'ru:Russian',
    'es:Spanish',
    'sv:Swedish',
    'th:Thai',
    'tr:Turkish',
    'vi:Vietnamese',
    'yi:Yiddish'
  ];


	// Define toolbars, you can remove or add buttons.
	// List of all buttons is here: http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.config.html#.toolbar_Full

	// WordPress basic toolbar
	config.toolbar_WordpressBasic = [
        { name: 'heading', items: ['Heading'] },
        { name: 'list', items: ['NumberedList', 'BulletedList', 'Indent', 'Outdent'] },
        { name: 'link', items: ['Link', 'Unlink', 'Anchor'] },
        { name: 'blockformat', items: ['BlockFormat'] },
        { name: 'blockquote', items: ['Blockquote', 'ShowBlocks'] },
        { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight'] },
        { name: 'misc1', items: ['Image', 'Table'] },
        { name: 'a11ychecker', items: ['A11ychecker'] },
        { name: 'a11yfirsthelp', items: ['A11yFirstHelp'] },
        '/',
        { name: 'undoredo', items: ['Undo', 'Redo'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteFromWord'] },
        { name: 'search', items: ['Find', 'Replace'] },
        { name: 'basicstyles', items: ['Bold', 'Italic'] },
        { name: 'removeformat', items: ['RemoveFormat'] },
        { name: 'inlinestyle', items: ['InlineStyle'] },
        { name: 'misc2', items: ['Language', 'SpecialChar'] }
	];

	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.

	// The equivalent of "WordpressFull" toolbar, defined in a way that makes adding buttons from plugins easier.

	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

	// Remove buttons in "WordpressBasic" toolbar
	config.WordpressBasic_removeButtons = 'Bold,Italic,RemoveFormat';
    // Set the most common block elements.
	config.format_tags = 'p;pre;address;div';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};
