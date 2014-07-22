if (arguments[0]) {
    applyProperties(arguments[0]);
}

function applyProperties(_properties) {
    var _apply = {}, _subset = {};

    _subset = _.pick(_properties, 'toolbarBackgroundColor', 'toolbarOpacity');

    if (_subset.toolbarBackgroundColor) {
        _apply.backgroundColor = _subset.toolbarBackgroundColor;
    }

    if (_subset.toolbarOpacity) {
        _apply.opacity = _subset.toolbarOpacity;
    }

    if (!_.isEmpty(_apply)) {
        $.toolbar.applyProperties(_apply);
    }

    _apply = {};
    _subset = _.pick(_properties, 'toolbarColor');

    if (_subset.toolbarColor) {
        _apply.color = _subset.toolbarColor;
    }

    if (!_.isEmpty(_apply)) {
        $.icon.applyProperties(_apply);
    }

    return;
}

function _onTouchend(event) {
    $.toolbar.getParent().fireEvent('pickerCloseClick', event);
}

exports.applyProperties = applyProperties;
