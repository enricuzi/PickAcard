app.Youtube = {
    player: {},
    video: {},
    searchResult: function (data) {
        var index = Math.floor(Math.random() * data.items.length);
        var item = data.items[index];
        var image = item.snippet.thumbnails.medium;
        if (window.outerWidth > 768) {
            image = item.snippet.thumbnails.high;
        }
        return this.video = {
            id: item.id.videoId,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            title: item.snippet.title,
            image: $("<div></div>").addClass("thumb").css("background-image", "url(" + image.url + ")")
        }
    },
    content: function (data) {
        var self = this;
        var data = this.searchResult(data);
        var content = $("<div></div>").addClass("content");
        return content.append($("<label></label>").text(data.title))
            .append($("<div></div>").text(data.channelTitle))
            .append(data.image)
            .append($("<div></div>").attr("id", "player"))
            .append($("<div></div>").addClass("button-play")
                .append($("<i></i>").addClass("fa fa-youtube-play fa-5x").click(function (e) {
                    e.stopPropagation();
                    $(this).fadeOut();
                    app.app.find(".thumb").fadeOut();
                    self.createScript();
                })));
    },
    getKeySearch: function () {
        var vocabulary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return vocabulary.charAt(Math.floor(Math.random() * vocabulary.length));
    },
    createScript: function () {
        var self = this;
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

        window.onYouTubeIframeAPIReady = function () {
            var self = this;
            this.player.status = 0;
            this.player.video = new YT.Player('player', {
                height: '390',
                width: '100%',
                videoId: app.Youtube.video.id,
                events: {
                    'onReady': self.onPlayerReady,
                    'onStateChange': self.onPlayerStateChange
                }
            });
        }
    },
    onPlayerReady: function (event) {
        event.target.playVideo();
    },
    onPlayerStateChange: function (event) {
        if (event.data == YT.PlayerState.PLAYING && !this.player.status) {
            setTimeout(this.stopVideo, 6000);
            this.player.status = 1;
        }
    },
    stopVideo: function () {
        this.player.video.stopVideo();
    }
};