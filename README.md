VInlinEdit jQuery Plugin v1.0.0
===============================
Copyright (c) 2012 Samuel ROZE. Licenced under the GPLv3 license.

Overview
--------
Vinlinedit is a jQuery plugin that provide an inline edit for text spans. The
principal attribute is that the editor's style is like vi.

Requirements
------------
This plugin requires this tow librairies (which are in the `lib` directory):

- [jQuery](http://www.jquery.com)
- [jsAsyncQueue](https://github.com/hagino3000/jsAsyncQueue/) (see [JavaScript: Synchroniser des événements asynchrones (fr)](http://www.d-sites.com/2012/03/20/javascript-synchroniser-des-evenements-asynchrones/) to see an example of use)

How to use
----------
In order to use this plugin, you just have to include the JS and CSS files (and, of course, the requirements) which are in the `src` folder.
Then, you can see the `examples` folder, or this simple example:

	$('span.vinlinedit').vinlinedit(options);
	
The `option` argument is an object.

### Options
There are 3 options at the moment, which are:

<table>
	<thead>
		<tr>
			<td>Option name</td>
			<td>Value(s)</td>
			<td>Description</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>prefix</td>
			<td>string</td>
			<td>A string which will prefix the inline editor.</td>
		</tr>
		<tr>
			<td>calback_pre_keypress</td>
			<td>function (keypressEvent) returns boolean</td>
			<td>
				<p>A callback which will be called before keypress processing.</p>
				<p>It the return value is <code>true</code>, VInlinEdit won't process the event. It may be interessing for extending fonctionnalities such as Enter key, ...</p>
			</td>
		</tr>
		<tr>
			<td>calback_post_keypress</td>
			<td>function (keypressEvent)</td>
			<td>A callback which will be called after keypress processing.</td>
		</tr>
	</tbody>
</table>

