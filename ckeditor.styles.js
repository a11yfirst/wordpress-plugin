/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/*
 * This file is used/requested by the 'Styles' button.
 * 'Styles' button is not enabled by default in WordpressFull and WordpressBasic toolbars.
 * Documentation:
 * http://docs.cksource.com/CKEditor_3.x/Developers_Guide/Styles
 */

CKEDITOR.addStylesSet( 'wordpress',
[
	/* Block Styles */

	// These styles are already available in the "Format" combo, so they are
	// not needed here by default. You may enable them to avoid placing the
	// "Format" combo in the toolbar, maintaining the same features.
	/*
	{ name : 'Paragraph'		, element : 'p' },
	{ name : 'Heading 1'		, element : 'h1' },
	{ name : 'Heading 2'		, element : 'h2' },
	{ name : 'Heading 3'		, element : 'h3' },
	{ name : 'Heading 4'		, element : 'h4' },
	{ name : 'Heading 5'		, element : 'h5' },
	{ name : 'Heading 6'		, element : 'h6' },
	{ name : 'Preformatted Text', element : 'pre' },
	{ name : 'Address'			, element : 'address' },
	

	{ name : 'Blue Title'		, element : 'h3', styles : { 'color' : '#000080' } },
	{ name : 'Red Title'		, element : 'h3', styles : { 'color' : '#B22222' } },
    */
	/* Inline Styles */

	// These are core styles available as toolbar buttons. You may opt enabling
	// some of them in the Styles combo, removing them from the toolbar.
	
	{ name : 'Strong'			, element : 'strong', overrides : 'b' },
	{ name : 'Emphasis'			, element : 'em'	, overrides : 'i' },
	{ name : 'Marker', element : 'span', styles : { 'background-color' : 'Yellow' } },
	{ name : 'Inline Quotation'	, element : 'q' },
	{ name : 'Cited Work'		, element : 'cite' },
	{ name : 'Computer Code'	, element : 'code' },
	{ name : 'Subscript'		, element : 'sub' },
	{ name : 'Superscript'		, element : 'sup' },
	{ name : 'Deleted Text'		, element : 'del' },
	{ name : 'Inserted Text'	, element : 'ins' },
	{ name : 'Strikethrough'	, element : 'strike' },
	{ name : 'Underline'		, element : 'u' },

	/* Object Styles */

	{
		name : 'Image on Left',
		element : 'img',
		attributes :
		{
			'style' : 'padding: 5px; margin-right: 5px',
			'border' : '2',
			'align' : 'left'
		}
	},

	{
		name : 'Image on Right',
		element : 'img',
		attributes :
		{
			'style' : 'padding: 5px; margin-left: 5px',
			'border' : '2',
			'align' : 'right'
		}
	}
]);
