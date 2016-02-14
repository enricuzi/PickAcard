(function ($) {
    $.fn.card = function () {
        var params = arguments[0] || {};
        params.click = params.click || function () {
                $(this).toggleClass("flip");
            };
        return this.each(function () {
            var card = $(this);
            if (!card.hasClass("card")) {
                card.addClass("card");
            }
            card.append(body());
            card.click(params.click);
        });

        function body() {
            return $("<div></div>").addClass("body")
                .append($("<div></div>").addClass("front"))
                .append($("<div></div>").addClass("back")
                    .append($("<div></div>").addClass("table")
                        .append($("<div></div>").addClass("table-cell")
                            .append($("<i></i>").addClass("fa fa-refresh fa-5x")))));
        }
    };
})(jQuery);