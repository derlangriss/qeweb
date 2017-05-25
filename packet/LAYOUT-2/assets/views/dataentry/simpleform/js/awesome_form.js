jQuery(function($){
    fields = ['credit_card_number',
              'credit_card_expiry',
              'credit_card_cvc',
              'dd_mm_yyyy',
              'yyyy_mm_dd',
              'email',
              'number',
              'numberdecimal',
              'phone_number',
              'postal_code',
              'time_yy_mm',
              'uk_sort_code',
              'collection_number',
              'ontario_photo_health_card_number',
              'ontario_outdoors_card_number']

     $.each( fields, function (index, value) {
        $('input.'+value).formance('format_'+value)
                         .addClass('')
                         .wrap('<div class=\'\' />')
                         .parent()
                            .append('<label class=\'control-label\'></label>');

        $('input.'+value).on('keyup change blur', function (value) {
            return function (event) {
                $this = $(this);
                if ($this.formance('validate_'+value)) {
                    $this.parent()
                            .removeClass('has-success has-error')
                            .addClass('has-success')
                            .children(':last')
                                .text('');
                } else {
                    $this.parent()
                            .removeClass('has-success has-error')
                            .addClass('has-error')
                            .children(':last')
                                .text('');
                }
            }
        }(value));
     });
});
