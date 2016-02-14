/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    app: null,
    youtubeSearchUrl: "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDGWAfmwVUv_n0YJd1EQQKHB8d3aHooWHI",
    isMobile: function () {
        return window.outerWidth < 1200;
    },
    // Application Constructor
    initialize: function () {
        if (this.isMobile()) {
            this.bindEvents();
        } else {
            this.receivedEvent("deviceready");
        }
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In oarder to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        if (id == "deviceready") {
            var self = this;
            self.app = $(".app");
            self.app.find(".loader").hide();

            self.app.find(".deck").append($("<div></div>").card({
                click: function () {
                    var card = $(this);
                    card.toggleClass("flip");
                    if (card.hasClass("flip")) {
                        var url = self.youtubeSearchUrl + "&q=" + app.Youtube.getKeySearch();
                        $.get(url).done(function (data) {
                            card.find(".front").append(app.Youtube.content(data))
                        });
                    }
                    else {
                        card.find(".front").html("");
                    }
                }
            }));
        }
    }
};