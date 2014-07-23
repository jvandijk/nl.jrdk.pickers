# Picker widget [![Titanium](http://www-static.appcelerator.com/badges/titanium-git-badge-sq.png)](http://www.appcelerator.com/titanium/) [![Alloy](http://www-static.appcelerator.com/badges/alloy-git-badge-sq.png)](http://www.appcelerator.com/alloy/)

![demo](https://github.com/jvandijk/nl.jrdk.pickers/raw/master/docs/demo.png)

## Widget
This widget's intended use is to connect Alloy Collections to a Picker and after the user selects a value get the model back. Next to that you'll be able to style the toolbar above the picker to fit your app.

The structure of the widget is heavily inspired by [fokkezb](https://github.com/fokkezb) his widget implementations. A big thank you is in place here! Thank you!

## Requirements

* `app/assets/fonts`: The [Font Awesome](http://fortawesome.github.com/Font-Awesome/) font folder

## Quick Start

### Get it [![gitTio](http://gitt.io/badge.png)](http://gitt.io/component/nl.jrdk.pickers)
Download this repository and consult the [Alloy Documentation](http://docs.appcelerator.com/titanium/latest/#!/guide/Alloy_XML_Markup-section-35621528_AlloyXMLMarkup-ImportingWidgets) on how to install it, or simply use the [gitTio CLI](http://gitt.io/cli):

`$ gittio install nl.jrdk.pickers`

### Use it

* Require the widget in a view:

```xml
<Widget src="nl.jrdk.pickers" id="myID" onChange="myCallback" />`
```

```javascript
var cities = Alloy.createCollection('collectionDefinition',
    [{
        title: 'Amsterdam',
        id: 'amsterdam'
    },{
        title: 'New York',
        id: 'new-york'
    },{
        title: 'Bangalore',
        id: 'bangalore'
    },{
        title: 'Sydney',
        id: 'sydney'
    }]);

$.myId.setDataCollection(cities);

$.myId.show();
```

## Event listeners
Listen to the change-event for updating related information after the change.

Either in `<Widget />`:

```xml
<Widget onChange="myCallback" id="myId" />
```

Or in the requiring controller:

```javascript
$.myId.addEventListener('change', myCallback);
```

The callback receives an Object containing 3 properties:

* `type`: Always `change`.
* `source`: The widget's main controller, including all non-object properties defined via XML or TSS.
* `model`: The selected value as Alloy model from the set Alloy Collection

## Property reference

### Widget-specific properties

| Property | Type | Purpose |
| -------- | ---- | ------- |
| toolbar | Boolean | If `false`, no toolbar will be present above the picker |
| toolbarBackgroundColor | String | Define the background color of the toolbar |
| toolbarOpacity | String | Optional Define the transparancy of the toolbar |
| toolbarColor | String | Optional Define the color of the close icon |

### Public interface

| Method | Description |
| ------ | ----------- |
| applyProperties() | Main method for setting up and changing the picker |
| show() | Shows picker |
| hide() | Hides picker |
| setDataCollection(collection) | Insert data to be visualized |
| addEventListener(event, callback) | Attaches event listener |
| removeEventListener(event, callback) | Removes event listener |
| fireEvent(event, dictionary) | Fires event on the picker |
| id | Holds the `id` of the widget, so you have this in events |

# Current roadmap / ideas for improvement
Feel free to help me improve this widget by forking and submitting pull requests or issues with more ideas.

* Add support for dates
* Add support for Android
* Add support for multiple colums
* Add more custom and run-time style examples
* Support more (icon) fonts
* Support next / previous form element

## Changelog

* 1.0 Initial version

## Licenses
This project is licensed under the Apache Public License (Version 2). Please see the LICENSE.txt file for the full license.

The Font Awesome font is licensed under the [SIL Open Font License](http://scripts.sil.org/OFL). The Font Awesome pictograms are licensed under the [CC BY 3.0 License](http://creativecommons.org/licenses/by/3.0/). Attribution is no longer required in Font Awesome 3.0, but much appreciated.

Appcelerator, Appcelerator Titanium and associated marks and logos are
trademarks of Appcelerator, Inc.

Titanium is Copyright (c) 2008-2014 by Appcelerator, Inc. All Rights Reserved.

Titanium is licensed under the Apache Public License (Version 2). Please
see the LICENSE file for the full license.
