var _initted = false,
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

function applyProperties(properties) {
    properties = properties || {};
    _.extend(_properties, properties);

    if (!_initted) {
        _initted = true;

        if (OS_IOS && _properties.toolbar) {
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
        if (OS_IOS && _toolbar) {
            _toolbar.applyProperties(_properties);
        }
    }
}

// Build picker column(s) and rows
function setDataCollection(data) {
    _data = data;

    if (OS_IOS) {
        var opts = [];

        _data.map(function(model) {
            opts.push(Ti.UI.createPickerRow({id: model.get('id'), title: model.get('title')}));
        });

        $.picker.add(opts);
    } else if (OS_ANDROID) {
        var opts = {
            options: _data.pluck('title')
        };

        _picker = Ti.UI.createOptionDialog(opts);
        _picker.addEventListener('click', triggerUpdate);
    }
}

function show() {
    if (OS_IOS) {
        $.widget.animate(Ti.UI.createAnimation({
            bottom: 0,
            duration: 300
        }));
    } else {
        _picker.show();
    }
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
    var value;
    if (OS_IOS) {
        value = _data.get($.picker.getSelectedRow(0).id);
    } else if (OS_ANDROID) {
        value = _data.at(_picker.getSelectedIndex());
    }
    $.trigger('change', {
        type: "change",
        source: $,
        model: value
    });
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
