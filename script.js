var apiUrl = "https://api.open5e.com/spells";

$(document).ready(function() {
	$('.carousel').slick({
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev">&#8249;</button>',
		nextArrow: '<button type="button" class="slick-next">&#8250;</button>',
		autoplay: true,
		autoplaySpeed: 1000
	});

	$('#search-button').click(function() {
		let spellName = $('#spell-name').val();
		if (spellName !== '') {
			let searchUrl = apiUrl + '/?name__iexact=' + spellName.replace(/\s+/g, '+');
			$.getJSON(searchUrl, function(data) {
				if (data.count > 0) {
					var spell = data.results[0];
					var spellHtml = `
						<h2>${spell.name}</h2>
						<p><strong>Tempo de Conjuração:</strong> ${spell.casting_time}</p>
						<p><strong>Alcance:</strong> ${spell.range}</p>
						<p><strong>Componentes:</strong> ${spell.components}</p>
						<p><strong>Duração:</strong> ${spell.duration}</p>
						<p><strong>Nível:</strong> ${spell.level}</p>
						<p><strong>Escola:</strong> ${spell.school}</p>
						<p><strong>Descrição:</strong> ${spell.desc}</p>
					`;
					$('#spell-results').html(spellHtml);
				} else {
					$('#spell-results').html('<p>Não foi possível encontrar a magia.</p>');
				}
			});
		}
	});

	$.getJSON(apiUrl, function(data) {
		if (data.results) {
			var schoolsMap = {};
			data.results.forEach(function(spell) {
				if (spell.school) {
					var school = spell.school.toUpperCase(); // Converter para maiúscula
					schoolsMap[school] = true; // Usar um objeto de mapeamento para evitar duplicatas
				}
			});
			var selectElement = $("#school-select");
			Object.keys(schoolsMap).forEach(function(school) {
				selectElement.append($("<option>").val(school).text(school));
			});
		}
	});
	

	$("#school-select").change(function() {
		var selectedSchool = $(this).val();
		if (selectedSchool !== '') {
			var schoolUrl = apiUrl + '/?school__iexact=' + encodeURIComponent(selectedSchool);
			$.getJSON(schoolUrl, function(data) {
				var spellResults = $("#spell-results");
				spellResults.empty();
				if (data.results && data.results.length > 0) {
					data.results.forEach(function(spell) {
						var spellHtml = `
							<h2>${spell.name}</h2>
							<p><strong>Tempo de Conjuração:</strong> ${spell.casting_time}</p>
							<p><strong>Alcance:</strong> ${spell.range}</p>
							<p><strong>Componentes:</strong> ${spell.components}</p>
							<p><strong>Duração:</strong> ${spell.duration}</p>
							<p><strong>Nível:</strong> ${spell.level}</p>
							<p><strong>Escola:</strong> ${spell.school}</p>
							<p><strong>Descrição:</strong> ${spell.desc}</p>
						`;
						spellResults.append(spellHtml);
					});
				} else {
					spellResults.append('<p>Não foram encontradas magias para a escola selecionada.</p>');
				}
			});
		}
	});
});
