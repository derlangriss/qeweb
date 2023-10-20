/**
 * Redraw the table (i.e. `fnDraw`) to take account of sorting and filtering,
 * but retain the current pagination settings.
 *
 * DataTables 1.10+ provide the `dt-api draw()` method which has this ability
 * built-in (pass the first parameter to the function as `false`). As such this
 * method is marked deprecated, but is available for use with legacy version of
 * DataTables. Please use the new API if you are used DataTables 1.10 or newer.
 *
 *  @name fnStandingRedraw
 *  @summary Redraw the table without altering the paging
 *  @author Jonathan Hoguet
 *  @deprecated
 *
 *  @example
 *    $(document).ready(function() {
 *        var table = $('.dataTable').dataTable()
 *        table.fnStandingRedraw();
 *    } );
 */

jQuery.fn.dataTableExt.oApi.fnSetFilteringDelay = function ( oSettings, iDelay ) {
    var _that = this;
 
    if ( iDelay === undefined ) {
        iDelay = 250;
    }
 
    this.each( function ( i ) {
            if ( typeof _that.fnSettings().aanFeatures.f !== 'undefined' )
            {
            $.fn.dataTableExt.iApiIndex = i;
            var
                oTimerId = null,
                sPreviousSearch = null,
                anControl = $( 'input', _that.fnSettings().aanFeatures.f );
     
            anControl.unbind( 'keyup search input' ).bind( 'keyup search input', function() {
     
                if (sPreviousSearch === null || sPreviousSearch != anControl.val()) {
                    window.clearTimeout(oTimerId);
                    sPreviousSearch = anControl.val();
                    oTimerId = window.setTimeout(function() {
                        $.fn.dataTableExt.iApiIndex = i;
                        _that.fnFilter( anControl.val() );
                    }, iDelay);
                }
            });
     
            return this;
            }
    } );
    return this;
};