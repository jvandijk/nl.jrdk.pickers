var moment = require("alloy/moment"),
    _initted = false,
    _toolbar,
    _data,
    _picker,
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

/**
 * Setup method for the widget its look & feel
 *
 * @param properties
 */
function applyProperties(properties) {
    var _apply = {};
    properties = properties || {};
    _.extend(_properties, properties);

    if (!_initted) {
        _initted = true;

        if (OS_IOS && _properties.toolbar) {
            _properties.__parent = $;
            _toolbar = Widget.createController('toolbar', _properties);
        }

        if (_toolbar) {
            $.widget.add(_toolbar.toolbar);
            $.widget.addEventListener('pickerCloseClick', hide);
        }

        if (_properties.type && _properties.type == 'PICKER_TYPE_DATE') {
            $.picker.setType(Ti.UI.PICKER_TYPE_DATE);

            if (!_properties.dateFormat) {
                _properties.dateFormat = 'DD-MM-YYYY';
            }

            _apply = _.pick(_properties, 'minDate', 'maxDate', 'value');
            if (_.size(_apply)) {
                $.picker.applyProperties(_apply);
            }
        }
    } else {
        if (OS_IOS && _toolbar) {
            _toolbar.applyProperties(_properties);
        }

        _apply = _.pick(_properties, 'minDate', 'maxDate', 'value');
        if (_.size(_apply)) {
            $.picker.applyProperties(_apply);
        }
    }
}

/**
 * Setup the data collection to be used in the PICKER_TYPE_PLAIN
 * This method is ignored when using PICKER_TYPE_DATE
 *
 * @param data
 */
function setDataCollection(data, selectedIndex) {
    if (isDate()) {
        Ti.API.info('Set data collection cannot be used in combination with dates');
        return;
    }

    _data = data;
    selectedIndex = selectedIndex || 0;

    if (OS_IOS) {
        var opts = [];

        _data.map(function(model) {
            opts.push(Ti.UI.createPickerRow({id: model.get('id'), title: model.get('title')}));
        });

        $.picker.add(opts);
        $.picker.setSelectedRow(0, selectedIndex);
    } else if (OS_ANDROID) {
        var opts = {
            options: _data.pluck('title'),
            selectedIndex: selectedIndex
        };

        $.picker.hide();
        _picker = Ti.UI.createOptionDialog(opts);
        _picker.addEventListener('click', triggerUpdate);
    }
}

/**
 * Show picker, on iOS in the bottom and Android as dialog
 */
function show() {
    if (OS_IOS) {
        $.widget.animate(Ti.UI.createAnimation({
            bottom: 0,
            duration: 300
        }));
    } else {
        if (isDate()) {
            $.picker.showDatePickerDialog({
                callback: function(e) {
                    triggerUpdate(e);
                }});
        } else {
            _picker.show();
        }
    }
}

/**
 * Hide the picker by moving below bottom, and trigger update for callback
 */
function hide() {
    $.widget.animate(Ti.UI.createAnimation({
        bottom: '-'+ $.widget.getHeight(),
        duration: 300
    }));

    triggerUpdate();
}

/**
 * Check if the current constructed picker is of type PICKER_TYPE_DATE
 *
 * @returns {boolean}
 */
function isDate() {
    return ($.picker.getType() == Ti.UI.PICKER_TYPE_DATE);
}

/**
 *
 * @param event
 */
function triggerUpdate(event) {
    var value;
    if (OS_IOS) {
        if (isDate()) {
            value = moment($.picker.getValue()).format(_properties.dateFormat)
        } else {
            value = _data.get($.picker.getSelectedRow(0).id);
        }

    } else if (OS_ANDROID) {
        if (isDate()) {
            value = moment(event.value).format(_properties.dateFormat);
        } else {
            value = _data.at(_picker.getSelectedIndex());
        }
    }
    $.trigger('change', {
        type: "change",
        source: $,
        model: value
    });
}

function cleanup() {
    if (OS_IOS && _properties.toolbar) {
        $.widget.removeEventListener('pickerCloseClick', hide);
    }
}

/*** EXPORTS ***/
exports.applyProperties = applyProperties;
exports.show = show;
exports.hide = hide;
exports.cleanup = cleanup;

exports.setDataCollection = setDataCollection;
Object.defineProperties($, {
    "_data": {
        set: setDataCollection
    }
});

// EVENTS
exports.addEventListener = $.on;
exports.removeEventListener = $.off;
exports.fireEvent = $.trigger;
