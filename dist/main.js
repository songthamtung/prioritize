window.onresize = function() {
    if(window.matchMedia("only screen and (max-width: 575.5px)").matches){
      $('.tl').removeClass('desktopView');
      $('.tr').removeClass('desktopView');
      $('.br').removeClass('desktopView');
      $('.bl').removeClass('desktopView');
    } else {
      $('.tl').addClass('desktopView');
      $('.tr').addClass('desktopView');
      $('.br').addClass('desktopView');
      $('.bl').addClass('desktopView');
    }
  };

  $(document).ready(function() {
    if (location.search.length > 0) {
      $.PostItAll.convertQueryStringToNotes(location.search);
    }
    else{
      $.PostItAll.load();
    }
    $("#copyUrl:text").val(window.location.protocol + "//" + window.location.host + "/" + window.location.pathname)

    var total_notes = 0
    $.PostItAll.length(function(total) {
      total_notes = total;
    });
    if (total_notes > 0) {
      $('.bounce').removeClass('bounce');
      return
    }
    let isMobile = window.matchMedia("only screen and (max-width: 575.5px)").matches;
    if (isMobile) {
      $.PostItAll.new({content:"<p><i>Drag</i>, <b>Resize</b>, & Delete this Task.<br><br>Then try creating a new one and prioritize! 😻</p><p><img src='https://songthamtung.s3-ap-southeast-1.amazonaws.com/lulu.jpeg'></p>", flags : { highlight: true }});
      $('.tl').removeClass('desktopView');
      $('.tr').removeClass('desktopView');
      $('.br').removeClass('desktopView');
      $('.bl').removeClass('desktopView');
    }
    else {
      $.PostItAll.new({content: "<p><b>Edit</b>, <i>Drag</i>, Resize, & Delete this Task.<br><br>Then try creating a new one and prioritize! 😻<br></p><p><img src='https://songthamtung.s3-ap-southeast-1.amazonaws.com/lulu.jpeg'></p>", flags : { highlight: true }});
    }
    $('.PIApostit').draggable()
  });

  $('#newTaskForm').keypress(function (e) {
    var key = e.which;
    if(key == 13) {
        addPostIt($('#newTaskForm').val())
        $('#newTaskForm').val('')
        return false;
    }
  });   

  function getQueryString(){
    $.PostItAll.convertNotesToQueryString();
  }

  function toggleMenuVisibility(){
    if($('#eye').hasClass('fa-eye-slash')) {
      $("#fixedProductHunt").addClass('invisible');
      $('#navbar').removeClass('visible');
      $('#navbar').addClass('invisible');
      $('#eye').removeClass('fa fa-eye-slash');
      $('#eye').addClass('fa fa-eye');
      $("#hideMenu").addClass('displayNone')
    } else {
      $("#fixedProductHunt").removeClass('invisible');
      $('#navbar').removeClass('invisible');
      $('#navbar').addClass('visible');
      $('#eye').removeClass('fa fa-eye');
      $('#eye').addClass('fa fa-eye-slash');
      $("#hideMenu").removeClass('displayNone')
    }
  }

  function addPostIt(val, posX, posY){
    var string = "New Note"
    if(val){ string = val }
    if(!posX) { posX = 10 }
    if(!posY) { posY = 10 }
    $.PostItAll.new({content:"<p style='text-align:center'>" + string + "</p>", posX: posX, posY: posY});
  };

  $(document).bind('mousemove', function(e){
    if($("#fixedMenuButton:hover").length != 0 || 
       $("#fixedProductHunt:hover").length != 0 ||
       $(".navbar-nav:hover").length != 0 ||
       !$(".tl").hasClass('desktopView') ||
       !$('#eye').hasClass('fa-eye-slash')) {
      $('#tail').css({ 
        display: 'none'
      })
    }
    else if ($('.br:hover').length != 0 || 
        $('.bl:hover').length != 0 || 
        $('.tr:hover').length != 0 || 
        $('.tl:hover').length != 0 ||
        $('nav:hover').length != 0 ) {
      $('#tail').css({
          display: 'block',
          left: e.pageX + 20,
          top: e.pageY + 15
      });
    } else {
      $('#tail').css({ display: 'none' })
    }
  });

  $('.br,.bl,.tr,.tl,nav').on('click', function(e) {
    if(e.target.id == 'hideMenu' || 
       e.target.id == 'eye' || 
       e.target.id == 'productHuntLink' ||
       !$(".tl").hasClass('desktopView')) {
      return
    }
    if(e.target.attributes[0].nodeValue.includes('desktopView') || 
       e.target.attributes[0].nodeValue.includes('center') || 
       e.target.className.includes('nav') || 
       e.target.className.includes('container-fluid')) {
       addPostIt('',e.pageX, e.pageY)
       $("#mouseIcon").css({ display: 'none' })
    }
  });

  $('.matrixes').on('click', function() {
      $('.nav-item.active').removeClass('active');
      $(this).addClass('active');
  });

  $('.dropdown-item').on('click', function() {
      $('#dropdownMenuButton').text($(this).text())
      $('.dropdown-item.active').removeClass('active');
      $(this).addClass('active');
  });

  $('.bounce').on('click', function() {
      $('.bounce').removeClass('bounce');
  });

  function effortImpact(){
    $('#first_quadrant').html('Low Effort &<br>High Impact')
    $('#second_quadrant').html('High Effort &<br> High Impact')
    $('#third_quadrant').html('Low Effort &<br> Low Impact')
    $('#fourth_quadrant').html('High Effort &<br> Low Impact')

    $('#first_quadrant-content').html('Quick Wins')
    $('#second_quadrant-content').html('Major Projects')
    $('#third_quadrant-content').html('Fill Ins')
    $('#fourth_quadrant-content').html('Thankless Tasks')
  };

  function importantUrgent(){
    $('#first_quadrant').html('Important &<br> Urgent')
    $('#second_quadrant').html('Important &<br> Not Urgent')
    $('#third_quadrant').html('Not Important &<br> Urgent')
    $('#fourth_quadrant').html('Not Important &<br> Not Urgent')

    $('#first_quadrant-content').html('Do')
    $('#second_quadrant-content').html('Plan')
    $('#third_quadrant-content').html('Delegate')
    $('#fourth_quadrant-content').html('Elminate')
  };

  function riskValue(){
    $('#first_quadrant').html('Low Risk &<br> High Value')
    $('#second_quadrant').html('High Risk &<br> High Value')
    $('#third_quadrant').html('Low Risk &<br> Low Value')
    $('#fourth_quadrant').html('High Risk &<br> Low Value')

    $('#first_quadrant-content').html('Prioritize')
    $('#second_quadrant-content').html('Investigate')
    $('#third_quadrant-content').html('Consider')
    $('#fourth_quadrant-content').html('Avoid')
  };

  function moscow(){
    $('#first_quadrant').html('Must Have')
    $('#second_quadrant').html('Should Have')
    $('#third_quadrant').html('Could Have')
    $('#fourth_quadrant').html("Won't Have")

    $('#first_quadrant-content').html('Mandatory for the current release')
    $('#second_quadrant-content').html('Necessary for future release')
    $('#third_quadrant-content').html('Nice to have for future release')
    $('#fourth_quadrant-content').html('Might have for future release')
  };

  $('#idImportAll').click(function(e) {
      $.PostItAll.import();
      e.preventDefault();
  });

  function generateStringQueryAndCopyUrl() {
    $.PostItAll.convertNotesToQueryString();
    var copyText = document.getElementById("copyUrl");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
  }

  function deleteAllNotes() {
    var result = confirm("Are you sure you want to delete all notes?");
    if (result) {
      $.PostItAll.remove();
    }
  }
