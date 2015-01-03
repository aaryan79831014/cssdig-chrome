function buildSpecificity() {

  var dig_iframe = $('#dig-iframe').contents();
  var allSelectorsArr = [];
  var uniqueSelectorsArr = [];
  // Only grab selectors inside regular rules and @media rules, but no others.
  var css = dig_iframe.find("#css-code > .ruleset > .selectors > .selector, #css-code > .at-media .selector");

  $.each(css,function(){
    var selectorText = $(this).text();
    allSelectorsArr.push(selectorText.trim());
  })

  // Dedupe selectors.
  $.each(allSelectorsArr, function(i, el){
      if($.inArray(el, uniqueSelectorsArr) === -1) uniqueSelectorsArr.push(el);
  });

  // Remove empty items in array.
  uniqueSelectorsArr = uniqueSelectorsArr.filter(Boolean)

  var tbodyContainer = $('<tbody/>');

  $.each(uniqueSelectorsArr, function(i, el){

    var specificityHTML = "";

    var specificityObj = SPECIFICITY.calculate(el);
    var selector = specificityObj[0].selector;
    var specificity = specificityObj[0].specificity;
    var length = specificityObj[0].parts.length;

    var arr = specificity.split(',');

    $.each(arr, function(j){
      specificityHTML = specificityHTML + "<span>" + arr[j] + "</span>";
    });

    // TODO: Build HTML first, then dump into Dom.
    tbodyContainer.append("<tr><td class='selector'>"+selector+"</td><td class='specificity'>"+specificityHTML+"</td><td class='length'>"+length+"</td></tr>")
  });

  setTimeout(function(){
      dig_iframe.find("#specificity-table").append(tbodyContainer);

      dig_iframe.find("#specificity-table").tablesorter({
        sortList: [[1,1]],
        headers: {
          0 : {
            sorter: false
          }
        }
      });

      dig_iframe.find('#cssdig-chrome').on('click', '#sort-specificity', function() {

        var sort_spec = dig_iframe.find("#specificity-table th:nth-child(2)");

        var sorting = [[1,0]];
        $(this).attr("class", "headerSortUp")

        if (sort_spec.hasClass("headerSortDown") ) {
          sorting = [[1,1]];
          $(this).attr("class", "headerSortDown")
        }

        dig_iframe.find("#specificity-table").trigger("sorton",[sorting]);
      });

      dig_iframe.find('#cssdig-chrome').on('click', '#sort-length', function() {

        var sort_spec = dig_iframe.find("#specificity-table th:nth-child(3)");

        var sorting = [[2,0]];
        $(this).attr("class", "headerSortUp");

        if (sort_spec.hasClass("headerSortDown") ) {
          sorting = [[2,1]];
          $(this).attr("class", "headerSortDown");
        }

        dig_iframe.find("#specificity-table").trigger("sorton",[sorting]);
      });


      // // Get number of selectors
      var selectorLength = dig_iframe.find("#specificity-table tbody tr").length;
      $('#dig-iframe').contents().find("#selector-length").text(": "+ selectorLength);
  }, 300);
}
