export const plugin_submenu = {
    // @Required @Unique
    // plugin name
    name: 'custom_plugin_submenu',

    // @Required
    // data display
    display: 'submenu',

    // @Options
    title: 'Custom IFrame',
    buttonClass: '',
    innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 2H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2M11 17.5L9.5 19L5 14.5L9.5 10l1.5 1.5l-3 3l3 3m3.5 1.5L13 17.5l3-3l-3-3l1.5-1.5l4.5 4.5l-4.5 4.5M21 7H3V4h18v3z" fill="#626262"/></svg>',

    // @Required
    // add function - It is called only once when the plugin is first run.
    // This function generates HTML to append and register the event.
    // arguments - (core : core object, targetElement : clicked button element)
    add: function (core, targetElement) {

        // @Required
        // Registering a namespace for caching as a plugin name in the context object
        const context = core.context;
        context.customSubmenu = {
            targetButton: targetElement,
            textElement: null,
            currentSpan: null
        };

        // Generate submenu HTML
        // Always bind "core" when calling a plugin function
        let listDiv = this.setSubmenu.call(core);

        // Input tag caching
        context.customSubmenu.textElement = listDiv.querySelector('input');

        // You must bind "core" object when registering an event.
        /** add event listeners */
        listDiv.querySelector('.se-btn-primary').addEventListener('click', this.onClick.bind(core));
        listDiv.querySelector('.se-btn').addEventListener('click', this.onClickRemove.bind(core));

        // @Required
        // You must add the "submenu" element using the "core.initMenuTarget" method.
        /** append target button menu */
        core.initMenuTarget(this.name, targetElement, listDiv);
    },

    setSubmenu: function () {
        const listDiv = this.util.createElement('DIV');
        // @Required
        // A "se-submenu" class is required for the top level element.
        listDiv.className = 'se-submenu se-list-layer';
        listDiv.innerHTML = '' +
            '<div class="se-list-inner" style="width: 230px;">' +
            '<div class="se-submenu-form-group">' +
            '<input class="se-input-form" type="text" placeholder=" iFrame Url" style="border: 1px solid #CCC;" />' +
            '<button type="button" class="se-btn-primary se-tooltip">' +
            '<strong>OK</strong>' +
            '</button>' +
            '<button type="button" class="se-btn se-tooltip">' +
            '<strong>X</strong>' +
            '</button>' +
            '</div>' +
            '</div>';

        return listDiv;
    },

    // @Override core
    // Plugins with active methods load immediately when the editor loads.
    // Called each time the selection is moved.
    active: function (element) {
        // If no tag matches, the "element" argument is called with a null value.
        if (!element) {
            this.util.removeClass(this.context.customSubmenu.targetButton, 'active');
            this.context.customSubmenu.textElement.value = '';
            this.context.customSubmenu.currentSpan = null;
        } else if (this.util.hasClass(element, 'custom-iframe')) {
            this.util.addClass(this.context.customSubmenu.targetButton, 'active');
            this.context.customSubmenu.textElement.value = element.textContent;
            this.context.customSubmenu.currentSpan = element;
            return true;
        }

        return false;
    },

    // @Override submenu
    // Called after the submenu has been rendered
    on: function () {
        this.context.customSubmenu.textElement.focus();
    },

    onClickRemove: function () {
        const span = this.context.customSubmenu.currentSpan;
        if (span) {
            this.util.removeItem(span);
            this.context.customSubmenu.currentSpan = null;

            this.submenuOff();
            this.focus();
        }
    },

    onClick: function () {
        const value = this.context.customSubmenu.textElement.value.trim();
        if (!value) return;

        const span = this.context.customSubmenu.currentSpan;
        if (span) {
            span.textContent = value;
            this.setRange(span, 1, span, 1);
        } else {
            this.functions.insertHTML('<span class="custom-iframe">' + value + '</span>', true);
            this.context.customSubmenu.textElement.value = '';
        }

        this.submenuOff();
    }
};