var _initted = false,
    _toolbar,
    _data,
    _selected,
    _properties = {};

if (arguments[0]) {
    var args = arguments[0];

    if (args.id) {
        exports.id = args.id;
        delete args.id;
    }

    delete args.__parentSymbol;
    delete args.__itemTemplate;
    delete args['$model'];

    applyProperties(arguments[0]);
} else {
    var args = {};
}

function applyProperties(properties) {
    var _apply = {};
    properties = properties || {};
    _.extend(_properties, properties);

    if (!_initted) {
        _initted = true;

        if (_properties.toolbar) {
            _properties.__parent = $;
            _toolbar = Widget.createController('toolbar', _properties);
        }

        if (_toolbar) {
            $.widget.add(_toolbar.getView());
            $.widget.addEventListener('pickerCloseClick', function(event) {
                hide();
            });
        }
    } else {
        if (_toolbar) {
            _toolbar.applyProperties(_properties);
        }
    }
}

// Build picker column(s) and rows
function setDataCollection(data) {
    var columns = [], column;
    _data = data;
    column = Ti.UI.createPickerColumn();

    data.map(function(model) {
        column.addRow(Ti.UI.createPickerRow({id: model.get('id'), title: model.get('title')}));
    })

    columns.push(column);

    $.picker.add(columns);
}

function show() {
    $.widget.animate(Ti.UI.createAnimation({
        bottom: 0,
        duration: 300
    }));
}

// Done button onClick function
function hide() {
    $.widget.animate(Ti.UI.createAnimation({
        bottom: '-'+ $.widget.getHeight(),
        duration: 300
    }));

    triggerUpdate();
}

function triggerUpdate() {
    $.trigger('change', {
        type: "change",
        source: $,
        model: _data.get($.picker.getSelectedRow(0).id)
    });
}

// Get the current picker values
/*function selectedValues() {
    var columns, row, _selected;
    columns = $.picker.getColumns();

    for (var i = 0; i < columns.length; i++) {
        row = $.picker.getSelectedRow(i);
        _selected = row.id;
    }
}*/

function _onChange(e) {
    if (e.type === 'change') {
        triggerUpdate();
    }
}

/*** EXPORTS ***/
exports.applyProperties = applyProperties;
exports.show = show;
exports.hide = hide;
exports.setDataCollection = setDataCollection;

// EVENTS
exports.addEventListener = $.on;
exports.removeEventListener = $.off;
exports.fireEvent = $.trigger;
