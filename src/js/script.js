
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // ハンバーガーメニュー
  $(".js-hamburger, .js-drawer").click(function () {
    $(".js-hamburger").toggleClass("is-active");
    $(".js-header").toggleClass("is-active");
    $(".js-drawer").fadeToggle();
  });

  // リサイズ時にドロワーメニュー解除
  $(window).resize(function(){
    if (window.matchMedia("(min-width: 768px)").matches) {
      $(".js-hamburger").removeClass("is-active");
      $(".js-header").removeClass("is-active");
      $(".js-drawer").fadeOut();
    }
  });

  // ハンバーガーメニューがクリックされたときに背景固定
  $(".js-hamburger, .js-drawer").click(function () {
    if ($("body").css("overflow") === "hidden") {
      // overflowがhiddenなら、bodyのスタイルを元に戻す
      $("body").css({ height: "", overflow: "" });
    } else {
      // bodyにheight: 100%とoverflow: hiddenを設定し、スクロールを無効にする
      $("body").css({ height: "100%", overflow: "hidden" });
    }
  });

  // スクロール時にヘッダーメニューの背景色を変更
  $(window).on('scroll', function () {
    if ($('.mainview').height() < $(this).scrollTop()) {
      $('.js-header').addClass('change-color');
    } else {
      $('.js-header').removeClass('change-color');
    }
  });

  // メインビューのスライダー
  const mainviewswiper = new Swiper(".mainview__swiper", {
    loop: true,
    effect: "fade",
    speed: 1500,
    allowTouchMove: false,
    autoplay: {
      delay: 3000,
    },
  });


  // Campaignのスライダー
  const campaignswiper = new Swiper(".campaign__swiper", {
    loop: true, //繰り返しをする
    loopedSlides: 4,
    speed: 500,
    spaceBetween: 24, //スライド間の距離を24px
    width: 280,
    effect: "slide",
    autoplay: {
      delay: 2000,
      waitForTransition: false
    },
    navigation: {
      prevEl: '.swiper-button-next',
      nextEl: '.swiper-button-prev'
    },
    // when window width is >= 768px
    breakpoints: {
      768: {
        spaceBetween: 40, //スライド間の距離を40px
        width: 333
      }
    }
  });


  // 画像表示のアニメーション

  //要素の取得とスピードの設定
  var box = $('.js-color-box'),
  speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function(){
    $(this).append('<div class="color"></div>')
    var color = $(this).find($('.color')),
    image = $(this).find('img');
    var counter = 0;

    image.css('opacity','0');
    color.css('width','0%');
    //inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function(){
      if(counter == 0){
        $(this).delay(200).animate({'width':'100%'},speed,function(){
            image.css('opacity','1');
            $(this).css({'left':'0' , 'right':'auto'});
            $(this).animate({'width':'0%'},speed);
        })
        counter = 1;
      }
    });
  });

  // トップへ戻るボタン
  $(function () {
    const returnTop = $(".js-return-top");
    returnTop.hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 20) {
        returnTop.fadeIn();
      } else {
        returnTop.fadeOut();
      }
    });
    returnTop.click(function () {
      $("body, html").animate(
        {
          scrollTop: 0,
        },
        300
      );
      return false;
    });
  });
});
