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
            d.addButton(i18n.__('Yes'), function() {
                cb(true)
                d.hide();
            });
            d.addButton(i18n.__('No'), function() {
                cb(false)
                d.hide();
            });
            d.show();
        },
        quitDialog: function(cb) {
            this.confirmDialog(i18n.__('Exit'), i18n.__('Are you sure?'), cb)
        },
        removeDialog: function(cb) {
            this.confirmDialog(i18n.__('Remove'), i18n.__('Remove this item?'), cb)
        }
    }

}
