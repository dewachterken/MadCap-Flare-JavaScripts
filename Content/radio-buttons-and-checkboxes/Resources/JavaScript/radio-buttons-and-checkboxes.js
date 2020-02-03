function userSelection(mapping) {
	var selectedValues = [];

	// hide 'normal' elements with a condition
	$("[data-mc-conditions]").hide();
	// hide all columns that have a <col> definition with a condition
	for (const [columnName, columnIndex] of mapping.entries()) {
		$('#flexibleTable td:nth-child(' + columnIndex + '), #flexibleTable th:nth-child(' + columnIndex + ')').hide();
	};

	// for everything selected
	$('input[type=radio]:checked, input[type=checkbox]:checked').each(function() {
		var value = $(this).val();

		// show 'normal' elements that match
		$("[data-mc-conditions*='" + value + "']").show();  
		// show columns that match
		for (const [columnName, columnIndex] of mapping.entries()) {
			if (columnName.includes(value)) {
				$('#flexibleTable td:nth-child(' + columnIndex + '), #flexibleTable th:nth-child(' + columnIndex + ')').show();
			}
		};

		selectedValues.push($(this).val());
	});


};

$(document).ready(function() {
	var mapping = new Map();
	$("#flexibleTable col").each(function(cellIndex) {
		var value = $(this).data('mc-conditions');
		if (value) {
			mapping.set(value, cellIndex + 1);
		}
	});

	userSelection(mapping);

	$('input[type=radio], input[type=checkbox]').change(function() {
		userSelection(mapping);
	});

});