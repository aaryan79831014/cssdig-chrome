// Apply click handlers to trigger actions.

var dig_iframe = $('#dig-iframe').contents();

// Build specificity table when user clicks on it.
dig_iframe.find('#cssdig').on('click', '#tab-selectors', function() {
    // Only render once.
    if ( $(this).hasClass("not-shown")) {
        $(this).removeClass("not-shown");
        buildSpecificity();
    }
});

// Start the dig with the selected items.
dig_iframe.find('#cssdig-form').on('click', '.js-dig', function() {
    var cssSelected = [];

    dig_iframe.find('#cssdig-form input').each(function( index ) {
        if ( $(this).is(':checked') ) {
            cssSelected.push( $(this).attr("id"));
        }
    });

    dig_iframe.find('html').addClass("dig-report-active");

    // Resize Window
    dig_iframe.find('#cssdig-chrome').css({ width: "100%", height: "100%"});

    setTimeout(function() {
        dig_iframe.find('#cssdig').css("display","flex");
    }, 750);

    concatenateCSS(cssSelected)
});

// Open property when user clicks on it.
dig_iframe.find('#report-tabs').on('click', '.property', function() {
    var target = $(this).next(".property-list");

    if ( target.hasClass("is-hidden") ) {
        target.removeClass("is-hidden");
    } else {
        // If the property list is open, close it.
        target.addClass("is-hidden");
    }

    // Remove the classes on the control buttons. They will be
    // readded if needed when the button are clicked.
    dig_iframe.find(".js-open-all, .js-close-all").removeClass("btn--disabled");

    // Determining if all are closed.
    var count_total = dig_iframe.find(".property-list").length;
    var count_closed = dig_iframe.find(".property-list.is-hidden").length;

    // If the total of properties = the total of
    if (count_total == count_closed) {
        dig_iframe.find(".js-open-all").removeClass("btn--disabled");
        dig_iframe.find(".js-close-all").addClass("btn--disabled");
    }
});

dig_iframe.find(".js-open-all").click(function(){
    dig_iframe.find(".property").each(function(i){
        if ( dig_iframe.find(".property").eq(i).next(".property-list").hasClass("is-hidden") ) {
            dig_iframe.find(".property").eq(i).click();
        }
    });
    $(this).addClass("btn--disabled");
});

dig_iframe.find(".js-close-all").click(function(){
    dig_iframe.find(".property").each(function(i){
        dig_iframe.find(".property-list").addClass("is-hidden");
    });
    $(this).addClass("btn--disabled");
    dig_iframe.find(".js-open-all").removeClass("btn--disabled");
});

dig_iframe.find(".js-css-reset").click(function(){
    dig_iframe.find(".tab-content .active").removeClass("active");
    dig_iframe.find("#css-code .highlight").removeClass("highlight");
    dig_iframe.find("#css-code .ruleset, #css-code .group").show();
    $(this).addClass("btn--disabled");
});

dig_iframe.find('#cssdig-chrome').on('click', '.js-cancel', function() {
    $("html").removeClass("dig");
    $("#dig-blanket").remove();
});
