/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/*
Copyright (c) 2017-2018, JaEun Jemma Ku - All rights reserved.
This configuration is based on V 0.7.2 release, March 2018. 
Referred configuration file is located at https://github.com/a11yfirst/distribution/blob/master/config.js
change logs are available from https://github.com/a11yfirst/distribution/blob/master/custom/CHANGELOG.md
*/

CKEDITOR.editorConfig = function(config) {
	// The minimum editor width, in pixels, when resizing it with the resize handle.
	config.resize_minWidth = 450;

	// Protect PHP code tags (<?...?>) so CKEditor will not break them when
	// switching from Source to WYSIWYG.
	config.protectedSource.push(/<\?[\s\S]*?\?>/g);

	config.skin = 'a11yfirst';
	config.startupFocus = true;
   // plugin name needs to be added here to show up in toolbar configuaration

    config.plugins =
    'a11ychecker,' +
    'a11yhelp,' +
    'about,' +
    'balloonpanel,' +
    'basicstyles,' +
    'blockquote,' +
    'button,' +
    'clipboard,' +
    'codesnippet,' +
    'contextmenu,' +
    'dialog,' +
    'dialogui,' +
    'elementspath,' +
    'enterkey,' +
    'entities,' +
    'fakeobjects,' +
    'find,' +
    'floatpanel,' +
    'htmlwriter,' +
    'image,' +
    'indent,' +
    'indentlist,' +
    'justify,' +
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
    'a11yheading,' +
    'a11ylink,' +
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


    // A11yfirst Editor(Wordpress basic) toolbar - the order of the name decides the way tool is shown in the toolbar.
    // Please refer this configuration file, https://github.com/a11yfirst/distribution/blob/master/custom/config.js
	config.toolbar_WordpressBasic = [
        { name: 'heading',        items: [ 'Heading' ] },
        { name: 'list',           items: [ 'NumberedList', 'BulletedList', 'Indent', 'Outdent' ] },
        { name: 'otherblocks',    items: [ 'Blockquote', 'CodeSnippet' ] },
        { name: 'justify',        items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
        { name: 'misc1',          items: [ 'Image', 'Table' ] },
        { name: 'showblocks',     items: [ 'ShowBlocks' ] },
        { name: 'a11yfirsthelp',  items: [ 'A11yFirstHelp' ] },
    //  { name: 'source',         items: [ 'Source' ] },
        '/',
        { name: 'undoredo',       items: [ 'Undo', 'Redo' ] },
        { name: 'clipboard',      items: [ 'Cut', 'Copy', 'Paste', 'PasteFromWord' ] },
        { name: 'search',         items: [ 'Find', 'Replace' ] },
        { name: 'basicstyles',    items: [ 'Bold', 'Italic' ] },
        { name: 'inlinestyle',    items: [ 'InlineStyle' ] },
        { name: 'removeformat',   items: [ 'RemoveFormat' ] },
        { name: 'link',           items: [ 'Link', 'Unlink', 'Anchor' ] },
        { name: 'misc2',          items: [ 'Language', 'SpecialChar' ] },
        { name: 'a11ychecker',    items: [ 'A11ychecker' ] }
    ];
    CKEDITOR.stylesSet.add ( 'default', [
        { name: 'Strong',           element: 'strong', overrides: 'b' },
        { name: 'Emphasis',         element: 'em' , overrides: 'i' },
        { name: 'Marker',           element: 'span', attributes: { 'class': 'marker' } },
        { name: 'Inline quotation', element: 'q' },
        { name: 'Cited work',       element: 'cite' },
        { name: 'Computer code',    element: 'code' },
        { name: 'Subscript',        element: 'sub' },
        { name: 'Superscript',      element: 'sup' },
        { name: 'Deleted Text',     element: 'del' },
        { name: 'Inserted Text',    element: 'ins' },
        { name: 'Strikethrough',    element: 'strike' },
      //  { name: 'Underline',        element: 'u' }
      ] );

	// Remove buttons in "WordpressBasic" toolbar
	config.WordpressBasic_removeButtons = 'Underline,Subscript,Superscript';
    // Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};

