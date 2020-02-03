function getElementsWithAttribute(attr)
{
    var elementsWithAttribute = [];
    var elements = document.all ? document.all : document.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++)
    {
        if (elements[i].getAttribute(attr))
        {
            elementsWithAttribute.push(elements[i]);
        }
    }
    return elementsWithAttribute;
}
function dropdownSelector() {
    
    var select = document.getElementById('version-select'),
        options = [];
    
    for (var i = 0; i < select.options.length; i++) {
        options.push(select.options[i].value);
    }
    
    var selectedVersion = select.options[select.selectedIndex].value;
    var allElements = getElementsWithAttribute('data-mc-conditions');
    var filteredElements = [];
	for (var i = 0; i < allElements.length; i++) {
		var el = allElements[i];
		var conditions = el.attributes["data-mc-conditions"].value.split(',');
		for (var j = 0; j < conditions.length; j++) {
			var condition = conditions[j];
			if (options.indexOf(condition) > -1) {
				filteredElements.push(el);
			}
		}
	}
			
    for (var i = 0; i < filteredElements.length; i++) {
        filteredElements[i].classList.add("hidden");
        if (filteredElements[i].getAttribute('data-mc-conditions').indexOf(selectedVersion) > -1 ) {
            filteredElements[i].classList.remove("hidden");
        }
    }
	localStorage[getLocalStorageKey()] = selectedVersion;
};
function getLocalStorageKey() {
    var customKey = $('#version-select').data('version-select-key');
    if (customKey) {
        return 'selectedVersion' + customKey;
    }
    return 'selectedVersion';
};

$( document ).ready(function() {
    var selectedVersion = localStorage[getLocalStorageKey()];
    if (selectedVersion) {
        $('#version-select').val(selectedVersion);
    } else if ($('#defaultVersionToSelect').length > 0) {
        $('#version-select').val($('#defaultVersionToSelect').val());
    } else {
        $('#version-select').prop('selectedIndex', 0);
    }
	// for each <COL> with 'data-mc-conditions', 
	// copy that value in the <TD> and <TH> fields of that column
    $('col[data-mc-conditions!=""][data-mc-conditions]').each(function() {
        var childIndex = $(this).index() + 1;
        var table = $(this).closest('table');
        var value = $(this).data('mc-conditions');
		$('th:nth-child(' + childIndex + '), td:nth-child(' + childIndex + ')', table).each(function() {
            $(this).attr('data-mc-conditions', value);
        });
    });
	dropdownSelector();
});