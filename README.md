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
			<td>
				<p>function (keypressEvent, vieObject) returns boolean</p>
				<ul>
					<li><code>keypressEvent</code> is the event object</li>
					<li><code>vieObject</code> is an object which contains some VinlinEdit functions that you can use.</li>
				</ul>
			</td>
			<td>
				<p>A callback which will be called before keypress processing.</p>
				<p>It the return value is <code>true</code>, VInlinEdit won't process the event. It may be interessing for extending fonctionnalities such as Enter key, ...</p>
			</td>
		</tr>
		<tr>
			<td>calback_post_keypress</td>
			<td><p>function (keypressEvent, vieObject)</p><p><em>Arguments are the same of <code>calback_pre_keypress</code></em></p></td>
			<td>A callback which will be called after keypress processing.</td>
		</tr>
	</tbody>
</table>

### Interactions & Functions
VinlinEdit provides functions to interact with the inline editor. Functions are stored in an object that you can retreive by tow way:

- The second argument of callbacks is this object.
- You can retrieve the object using `data('vinlinedit')`. For example, if you've initialized VInlinEdit with `$('span.inline')`, you can can the `clear` function by calling `$('span.inline').data('vinlinedit').clear();`.

Here's the list of functions:

<table>
	<thead>
		<tr>
			<td>Function name</td>
			<td>Arguments</td>
			<td>Return</td>
			<td>Description</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>clear(content)</td>
			<td>
				<ul>
					<li>(optional) <code>content</code> The new content of editor.</li>
				</ul>
			</td>
			<td><code>object</code> The <em>functions object</em>, so you can chain.</td>
			<td>Clear the inline editor and reset as the initial state or with the parameters.</td>
		</tr>
		<tr>
			<td>getContent()</td>
			<td><em>No argument</em></td>
			<td><code>string</code> The content of the inline editor</td>
			<td>Returns the content of inline editor.</td>
		</tr>
	</tbody>
</table>

