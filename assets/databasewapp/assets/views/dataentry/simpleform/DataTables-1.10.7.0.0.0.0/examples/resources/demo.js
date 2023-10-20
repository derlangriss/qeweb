
/*global SyntaxHighlighter*/
SyntaxHighlighter.config.tagName = 'code';

$(document).ready( function () {
	if ( ! $.fn.dataTable ) {
		return;
	}
	var dt110 = $.fn.dataTable.Api ? true : false;

	// Work around for WebKit bug 55740
	var info = $('div.info');

	if ( info.height() < 115 ) {
		info.css( 'min-height', '8em' );
	}

	var escapeHtml = function ( str ) {
		return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	};

	// css
	var cssContainer = $('div.tabs-datatable div.css');
	if ( $.trim( cssContainer.find('code').text() ) === '' ) {
		cssContainer.find('code, p:eq(0), div').css('display', 'none');
	}

	// init html
	var table = $('<p/>').append( $('table').clone() ).html();
	$('div.tabs-datatable div.table').append(
		'<code class="multiline language-html">\t\t\t'+
			escapeHtml( table )+
		'</code>'
	);
	//SyntaxHighlighter.highlight({}, $('#display-init-html')[0]);

	// Allow the demo code to run if DT 1.9 is used
	if ( dt110 ) {
		// json
		var ajaxTab = $('ul.tabs-datatable li').eq(3).css('display', 'none');

		$(document).on( 'init.dt', function ( e, settings ) {
			if ( e.namespace !== 'dt' ) {
				return;
			}

			var api = new $.fn.dataTable.Api( settings );

			var show = function ( str ) {
				ajaxTab.css( 'display', 'block' );
				$('div.tabs-datatable div.ajax code').remove();
				$('div.tabs-datatable div.ajax div.syntaxhighlighter').remove();

				// Old IE :-|
				try {
					str = JSON.stringify( str, null, 2 );
				} catch ( e ) {}

				$('div.tabs-datatable div.ajax').append(
					'<code class="multiline language-js">'+str+'</code>'
				);
				SyntaxHighlighter.highlight( {}, $('div.tabs-datatable div.ajax code')[0] );
			};

			// First draw
			var json = api.ajax.json();
			if ( json ) {
				show( json );
			}

			// Subsequent draws
			api.on( 'xhr.dt', function ( e, settings, json ) {
				show( json );
			} );
		} );

		// php
		var phpTab = $('ul.tabs-datatable li').eq(4).css('display', 'none');

		$(document).on( 'init.dt.demoSSP', function ( e, settings ) {
			if ( e.namespace !== 'dt' ) {
				return;
			}

			if ( settings.oFeatures.bServerSide ) {
				if ( $.isFunction( settings.ajax ) ) {
					return;
				}
				$.ajax( {
					url: '',
					data: {
						src: settings.sAjaxSource || settings.ajax.url || settings.ajax
					},
					dataType: 'text',
					type: 'post',
					success: function ( txt ) {
						phpTab.css( 'display', 'block' );
						$('div.tabs-datatable div.php').append(
							'<code class="multiline language-php">'+txt+'</code>'
						);
						SyntaxHighlighter.highlight( {}, $('div.tabs-datatable div.php code')[0] );
					}
				} );
			}
		} );
	}
	else {
		$('ul.tabs-datatable li').eq(3).css('display', 'none');
		$('ul.tabs-datatable li').eq(4).css('display', 'none');
	}

	// Tabs-datatable
	$('ul.tabs-datatable').on( 'click', 'li', function () {
		$('ul.tabs-datatable li.active').removeClass('active');
		$(this).addClass('active');

		$('div.tabs-datatable>div')
			.css('display', 'none')
			.eq( $(this).index() ).css('display', 'block');
	} );
	$('ul.tabs-datatable li.active').click();
} );



