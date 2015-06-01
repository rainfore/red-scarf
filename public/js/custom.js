jQuery(document).ready(function ($) {

    /* Sidebar Navigation
    --------------------------------------------------*/
    $(".accordion h3").click(function(){
        $('.active').removeClass('active');

        //slide up all the link lists
        $(".accordion ul").slideUp(300, "easeInOutQuart");
        //slide down the link list below the h3 clicked - only if its closed
        if(!$(this).next().is(":visible"))
        {
            $(this).next().slideDown(300, "easeInOutQuart");
            $(this).addClass('active');
        }
    });


    /* Search Bar
    --------------------------------------------------*/

    function buttonUp(){
     var valux = $('.searchbox-input').val();
        valux = $.trim(valux).length;
    }

    $(document).ready(function(){
        var submitIcon = $('.searchbox-icon');
        var submitInput = $('.searchbox-input');
        var searchBox = $('.searchbox');
        var isOpen = false;

        $(document).mouseup(function(){
            if(isOpen === true){
                submitInput.val('');
            $('.searchbox-submit').css('z-index','-999');
                submitIcon.click();
            }
        });

        submitIcon.mouseup(function(){
            return false;
        });

        searchBox.mouseup(function(){
            return false;
        });

        submitIcon.click(function(){
            buttonUp();
            if(isOpen === false){
                searchBox.addClass('searchbox-open');
                $(".searchbox-input").focus();
                isOpen = true;
            } else {
                searchBox.removeClass('searchbox-open');
                $(".searchbox-input").blur();
                isOpen = false;
                setTimeout(function() {
                    submitInput.val("");
                    var key_event = jQuery.Event("keyup");
                    key_event.ctrlKey = false;
                    key_event.which = 8;
                    key_event.keyCode = 8;
                }, 200);
            }
        });
    });

    /* Social Popups
      -----------------------------------------------*/
    $('.popup').click(function(event) {
        var width  = 575,
            height = 400,
            left   = ($(window).width()  - width)  / 2,
            top    = ($(window).height() - height) / 2,
            url    = this.href,
            opts   = 'status=1' +
                     ',width='  + width  +
                     ',height=' + height +
                     ',top='    + top    +
                     ',left='   + left;

            window.open(url, 'twitter', opts);
            return false;
    });

    /* Modal
    --------------------------------------------------*/

    $('.modal-toggle').on('click', function(e) {
        e.preventDefault();
        $('.modal').toggleClass('is-visible');
    });

    /* Form
    --------------------------------------------------*/

    $('#my-form').submit(function(ev) {
        // Prevent the form from actually submitting
        ev.preventDefault();

        // Get the post data
        var data = $(this).serialize();

        // Send it to the server
        $.post(document.URL, data, function(response) {
            console.log("The response is", response);
            if (response.success) {
                $('#thanks').addClass( "thanks-show" );
            } else {
                var errors = [];
                // response.error will be an object containing any validation errors that occurred, indexed by field name
                // e.g. response.error.fromName => ['From Name is required']
                for (error in response.error) {
                    for (err in response.error[error]) {
                        errors.push(response.error[error][err]);
                    }
                }
                $(".errors").html(errors.join("<br />"));
            }
        });
    });


    /* Outdated Browser
    --------------------------------------------------*/

    $( document ).ready(function() {
        outdatedBrowser({
            bgColor: '#E86D5D',
            color: '#ffffff',
            lowerThan: 'transform',
            languagePath: ''
        });
    });

    // $(document).ready(function() {
    //  var stickyNavTop = $('.accordion').offset().top;

    //  var stickyNav = function(){
    //      var scrollTop = $(window).scrollTop();

    //      if (scrollTop > stickyNavTop) {
    //          $('.accordion').addClass('sticky');
    //      } else {
    //          $('.accordion').removeClass('sticky');
    //      }
    //  };
    //  stickyNav();
    //  $(window).scroll(function() {
    //      stickyNav();
    //  });
    // });
    
    /* Waterfall
    --------------------------------------------------*/

    $(document).ready(function() {
        var showCount = 12;
        var showHeight = 0;

        function show() {
            $('.link-block:lt(' + (showCount + 1) + ')').show()
            .find('img[data-src]').each(function() {
                $(this).attr('src', $(this).attr('data-src'));
            });
        }

        show();
        showHeight = 352; // $('.link-block').first().height();
        $(window).scroll(function(e) {
            if($(window).scrollTop() + $(window).height() > (showCount/3)*showHeight) {
                showCount += 12;
                show();
                // console.log($(window).scrollTop(), 'show');
            }
        });
    });
});
