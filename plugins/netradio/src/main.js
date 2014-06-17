module.exports = function(Wow) {
    var window = Wow.window
    var $ = Wow.$
    var SVG = Wow.SVG
    var i18n = Wow.i18n
    var BasePage = require("../../../js/BasePage")
    var SelectChain = require("../../../js/SelectChain")

    $.playable('/js/vendor/soundmanager2/')

    return BasePage.extend({
        playPreviousTrack: function() {
            this.stopPlaying()
            this.currentTrack = (this.currentTrack + this.radios.length - 1) % this.radios.length;
            this.startPlaying(this.radios[this.currentTrack])
        },
        playNextTrack: function() {
            this.stopPlaying()
            this.currentTrack = (this.currentTrack + 1) % this.radios.length;
            this.startPlaying(this.radios[this.currentTrack])
        },
        startPlaying: function(radio) {
            var self = this
            $("#labelRadioTitle").text(radio.title)
            $("#labelRadioFreq").text("")
            self.link = $(self.playlist.children()[self.currentTrack])
            self.link.click()
        },
        stopPlaying: function() {
            soundManager.stopAll()
        },
        createPlaylist: function() {
            var out = $('<div id="netradio-playlist" style="display: none;">')
            for (var i = 0; i < this.radios.length; i++) {
                out.append($("<a>").text(this.radios[i].title).attr("href", this.radios[i].url))
            }
            return out
        },
        init: function(data, next) {
            var self = this
            var homeButton = this.getWidget("homeButton")
            var quitButton = this.getWidget("quitButton")
            var prevButton = this.getWidget("prevButton")
            var nextButton = this.getWidget("nextButton")

            /* widgetization complete! */
            quitButton.click(function() {
                // move back to previous page...
                window.history.go(-1)
            })
            homeButton.click(function() {
                // move back to previous page...
                window.location.href = "/plugins/homepage"
            })
            prevButton.click(function() {
                self.playPreviousTrack()
            })
            nextButton.click(function() {
                self.playNextTrack()
            })

            this.selectChain = new SelectChain([
                homeButton.element,
                quitButton.element
            ])

            self.radios = []
            self.currentTrack = 0
            $.getJSON('/api/netRadio/list?limit=100').done(function(radios) {
                self.radios = radios
                self.playlist = self.createPlaylist().appendTo($("body"))
                self.playlist = $(self.playlist).playable()
                self.startPlaying(self.radios[self.currentTrack])
                /* continue when finished */
                if (next) next(self)
            })

        },
        onVirtualControl: function(evt) {
            switch (evt.control) {
                case "home":
                    this.goToHomePage()
                    break;
                case "left":
                    this.playPreviousTrack()
                    break;
                case "right":
                    this.playNextTrack()
                    break;
                case "up":
                    this.selectChain.selectPrevious()
                    break;
                case "down":
                    this.selectChain.selectNext()
                    break;
                case "select":
                    $(this.selectChain.current()).click()
                    this.selectChain.update()
                    break;
            }
        }
    })

}
