app.Youtube = {
    content: function (data) {
        var self = this;
        var data = self.Search.searchResult(data);
        var content = $("<div></div>").addClass("content");
        return content
            .append($("<div></div>").addClass("title")
                .append($("<label></label>").addClass("title").text(data.title))
                .append($("<div></div>").addClass("channel-title").text(data.channelTitle)))
            .append($("<div></div>").attr("id", "player"))
            .append(data.image
                .append($("<div></div>").addClass("panel-absolute")
                    .append($("<div></div>").addClass("table")
                        .append($("<div></div>").addClass("table-cell")
                            .append($("<div></div>").addClass("button-play")
                                .append($("<i></i>").addClass("fa fa-youtube-play fa-5x").click(function (e) {
                                    e.stopPropagation();
                                    $(this).fadeOut();
                                    app.dom.find(".thumb").fadeOut(function () {
                                        self.Player.init();
                                    });
                                }))
                            )
                        )
                    )
                )
            );
    },
    Video: {},
    Search: {
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDGWAfmwVUv_n0YJd1EQQKHB8d3aHooWHI",
        maxResults: 50,
        getKey: function () {
            var vocabulary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return vocabulary.charAt(Math.floor(Math.random() * vocabulary.length));
        },
        getUrl: function (params) {
            var params = params || {};
            params.max = params.max || this.maxResults;
            params.key = params.key || this.getKey();
            return this.url + "&q=" + params.key + "&maxResults=" + params.max;
        },
        search: function () {
            app.loader.show();
            $.get(this.getUrl()).done(function (data) {
                app.dom.find(".front").append(app.Youtube.content(data));
                app.loader.hide();
            });
        },
        searchResult: function (data) {
            var index = Math.floor(Math.random() * data.items.length);
            var item = data.items[index];
            var image = item.snippet.thumbnails.medium;
            if (window.outerWidth > 768) {
                image = item.snippet.thumbnails.high;
            }
            return app.Youtube.Video = {
                id: item.id.videoId,
                channelTitle: item.snippet.channelTitle,
                description: item.snippet.description,
                title: item.snippet.title,
                image: $("<div></div>").addClass("thumb").css("background-image", "url(" + image.url + ")")
            }
        }
    },
    Player: {
        status: 0,
        player: null,
        init: function () {
            var self = this;
            self.player = new YT.Player('player', {
                height: '390',
                width: '100%',
                videoId: app.Youtube.Video.id,
                events: {
                    'onReady': self.onPlayerReady,
                    'onStateChange': self.onPlayerStateChange
                }
            });
        },
        onPlayerReady: function (event) {
            event.target.playVideo();
            this.status = 1;
        },
        onPlayerStateChange: function (event) {
            if (event.data == YT.PlayerState.PLAYING) {
                this.status = 1;
            } else {
                this.status = 0;
            }
        },
        play: function () {
            this.player.playVideo();
        },
        stop: function () {
            this.player.stopVideo();
        }
    },
    Script: {
        init: function () {
            var self = this;
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

            window.onYouTubeIframeAPIReady = function () {
                app.Youtube.Player.init();
            }
        }
    }
};