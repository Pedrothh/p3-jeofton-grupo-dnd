$(document).ready(function() {
	$('.carousel').slick({
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev">&#8249;</button>',
		nextArrow: '<button type="button" class="slick-next">&#8250;</button>',
		autoplay: true,
		autoplaySpeed: 1000
	});

	$('#search-button').click(function() {
		var spellName = $('#spell-name').val();
		if (spellName !== '') {
			var apiUrl = 'https://api.open5e.com/spells/?name__iexact=' + spellName.replace(/\s+/g, '+');
			$.getJSON(apiUrl, function(data) {
				if (data.count > 0) {
					var spell = data.results[0];
					var spellHtml = '<h2>' + spell.name + '</h2>' +
									'<p><strong>Tempo de Conjuração:</strong> ' + spell.casting_time + '</p>' +
									'<p><strong>Alcance:</strong> ' + spell.range + '</p>' +
									'<p><strong>Componentes:</strong> ' + spell.components + '</p>' +
									'<p><strong>Duração:</strong> ' + spell.duration + '</p>' +
									'<p><strong>Nível:</strong> ' + spell.level + '</p>' +
									'<p><strong>Escola:</strong> ' + spell.school + '</p>' +
									'<p><strong>Descrição:</strong> ' + spell.desc + '</p>';
					$('#spell-results').html(spellHtml);
				} else {
					$('#spell-results').html('<p>Não foi possível encontrar a magia.</p>');
				}
			});
		}
	});
});
