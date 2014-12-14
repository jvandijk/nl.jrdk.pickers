if (arguments[0]) {
    applyProperties(arguments[0]);
}

function applyProperties(_properties) {
    var _apply = {},
        _subset = _.pick(_properties, 'toolbarBackgroundColor', 'toolbarOpacity', 'toolbarColor');

    if (_subset.toolbarBackgroundColor) {
        _apply.barColor = _subset.toolbarBackgroundColor;
    }

    if (_subset.toolbarOpacity) {
        _apply.opacity = _subset.toolbarOpacity;
    }

    if (_subset.toolbarColor) {
        _apply.tintColor = _subset.toolbarColor;
    }

    if (!_.isEmpty(_apply)) {
        $.toolbar.applyProperties(_apply);
    }

    return;
}

function _onClick(event) {
    $.toolbar.getParent().fireEvent('pickerCloseClick', event);
}

exports.applyProperties = applyProperties;
