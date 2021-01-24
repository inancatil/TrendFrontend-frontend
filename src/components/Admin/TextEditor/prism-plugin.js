export const prism_plugin = {
    // @Required @Unique
    // plugin name
    name: 'custom_prism_plugin',

    // @Required
    // data display
    display: 'submenu',

    // @Options
    title: 'Choose language',
    buttonClass: '',
    innerHTML: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',

    // @Required
    // add function - It is called only once when the plugin is first run.
    // This function generates HTML to append and register the event.
    // arguments - (core : core object, targetElement : clicked button element)
    add: function (core, targetElement) {

        // Generate submenu HTML
        // Always bind "core" when calling a plugin function
        let listDiv = this.setSubmenu.call(core);

        // You must bind "core" object when registering an event.
        /** add event listeners */
        var self = this;
        listDiv.querySelectorAll('.se-btn-list').forEach(function (btn) {
            btn.addEventListener('click', self.onClick.bind(core));
        });

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
        listDiv.innerHTML = '<div class="se-list-inner se-list-font-size">' +
            '<ul class="se-list-basic">' +
            '<li><button type="button" class="se-btn-list" value="javascript">Javascript</button></li>' +
            '<li><button type="button" class="se-btn-list" value="css">Css</button></li>' +
            '<li><button type="button" class="se-btn-list" value="html">Html</button></li>' +
            '</ul></div>'

        return listDiv;
    },


    onClick: function (e) {
        const value = e.target.value;

        if (value === "javascript") {
            this.functions.insertHTML('<pre class="language-javascript">INSERT JAVASCRIPT CODE HERE </pre>', true);
        }
        else if (value === "css") {
            this.functions.insertHTML('<pre class="language-css">INSERT CSS CODE HERE </pre>', true);
        }
        else if (value === "html") {
            this.functions.insertHTML('<pre class="language-markup">INSERT HTML CODE HERE.\nDon`t forget to modify tags!!!\n &lt; ==> &amp;lt;\n &gt; ==> &amp;gt;  </pre>', true);
        }


        this.submenuOff();
    }
};
