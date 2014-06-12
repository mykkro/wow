var Dialog = require('modal-dialog');

Dialog.styles = false
Dialog.classes = {
    container: 'modal_dialog',
    title: 'title',
    header: 'header',
    content: 'content',
    footer: 'footer',
    info: 'info',
    buttons: 'buttons',
    button: 'button'
};

module.exports = function($, i18n) {
    return {
        confirmDialog: function(title, content, cb) {
            var d = new Dialog($);
            d.title = '<b>' + title + '</b>';
            d.content = content;
            d.info = '';
            d.addButton(i18n('Yes'), function() {
                cb(true)
                d.hide();
            });
            d.addButton(i18n('No'), function() {
                cb(false)
                d.hide();
            });
            d.show();
            return d;
        },
        /* dialog without buttons... */
        simpleDialog: function(title, content, footer, options) {
            var d = new Dialog($);
            d.title = '<b>' + title + '</b>';
            d.content = content;
            d.info = '';
            d.footer = footer;
            d.show(options);
            return d;
        },
        quitDialog: function(cb) {
            return this.confirmDialog(i18n('Exit'), i18n('Are you sure?'), cb)
        },
        removeDialog: function(cb) {
            return this.confirmDialog(i18n('Remove'), i18n('Remove this item?'), cb)
        }
    }

}
