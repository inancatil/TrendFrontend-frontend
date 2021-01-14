const mergeTag = {
    // @Required @Unique
    // plugin name
    name: 'merge_tag',
    // @Required
    // data display
    display: 'command',

    // @Options
    title: 'Add range tag',
    buttonClass: '',
    innerHTML: '<i class="fas fa-carrot"></i>',

    // @Required
    // add function - It is called only once when the plugin is first run.
    // This function generates HTML to append and register the event.
    // arguments - (core : core object, targetElement : clicked button element)
    add: function (core, targetElement) {
        const context = core.context;
        const rangeTag = core.util.createElement('pre');
        core.util.addClass(rangeTag, 'prism-code');

        // @Required
        // Registering a namespace for caching as a plugin name in the context object
        context.customCommand = {
            targetButton: targetElement,
            tag: rangeTag
        };
    },

    // @Override core
    // Plugins with active methods load immediately when the editor loads.
    // Called each time the selection is moved.
    active: function (element) {
        if (!element) {
            this.util.removeClass(this.context.customCommand.targetButton, 'active');
        } else if (this.util.hasClass(element, '__se__format__range_custom')) {
            this.util.addClass(this.context.customCommand.targetButton, 'active');
            return true;
        }

        return false;
    },

    // @Required, @Override core
    // The behavior of the "command plugin" must be defined in the "action" method.
    action: function () {
        const rangeTag = this.util.getRangeFormatElement(this.getSelectionNode());

        if (this.util.hasClass(rangeTag, '__se__format__range_custom')) {
            this.detachRangeFormatElement(rangeTag, null, null, false, false);
        } else {
            this.applyRangeFormatElement(this.context.customCommand.tag.cloneNode(false));
        }
    }
}

export default mergeTag