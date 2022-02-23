
$(function () {
	// AOS.init({
	// 	disable: 'mobile'
	// });
	var activeIndex = '0';

	

	if ($(window).width() >= 992) {
		var heroCarousel = new Swiper(".hero-carousel", {
			direction: "vertical",
			slidesPerView: 1,
			//effect: "fade",
			spaceBetween: 30,
			mousewheel: true,
			simulateTouch: false,
			navigation: {
				nextEl: ".swiper-next",
				prevEl: ".swiper-prev",
			},
			scrollbar: {
				el: ".swiper-scrollbar",
			  },
			  
			breakpoints: {
				1024: {
					pagination: {
						el: ".swiper-pagination",
						clickable: true,
					},
				},
			},
			
		});
		heroCarousel.on('slideChange', function () {
			$('.hero-section').removeClass('color_'+ activeIndex);
			$('.hero-section').addClass('color_'+ heroCarousel.realIndex);
			activeIndex = heroCarousel.realIndex;
			$('.nav-link').removeClass('activeClass');
			if( heroCarousel.realIndex > 0){
				$('header').addClass("sticky");
				$('#features').addClass('activeClass');
				$('.swiper-prev').addClass('show');
			}else{
				$('.swiper-prev').removeClass('show');
				$('#home').addClass('activeClass');
				$('header').removeClass("sticky");
			}
			if( heroCarousel.realIndex == 5){
				$('.swiper-next').removeClass('d-lg-flex');
			}else{
				$('.swiper-next').addClass('d-lg-flex');
			}
			
		});
	}

	$( document ).ready(function() {
		fetch('https://api.tapp.link/api/v1/getConversionRate', 
				{method: 'GET',
				headers: {"Content-type": "application/json; charset=UTF-8"}})
			.then(response => response.json())
			.then(data => {
				if(data.statusCode == 200){
					conversionData = data.result;
					let currentRate = conversionData.filter(function(item){return (item.fromcurrency == 'NGN' && item.tocurrency == 'USD')})[0];
					let displayString =   'Our rate: ';
					displayString += 'N ' + currentRate.rate + '= $ 1'  ;
					/*if(fromCurrency == 'NGN' && toCurrency == 'USD'){
						
					}else if(fromCurrency == 'USD' && toCurrency == 'NGN'){
						displayString += '$ 1 = N'+ currentRate.rate;
					}else if(fromCurrency == 'USD' && toCurrency == 'USD'){
						displayString += '$ 1 = $'+ currentRate.rate;
					}else if(fromCurrency == 'NGN' && toCurrency == 'NGN'){
						displayString += 'N 1 = N'+ currentRate.rate;
					}*/
					curRate = currentRate.rate;
					$("#exchangerate").text(displayString);
					/*$("#fromvalue").text('N ' + conversionData[0].rate);
					// $("#tovalue").text(conversionData[0].rate)
					$('[data-flag="NGN"]').attr('data-value', conversionData[0].rate)
					$('[data-flag="USD"]').attr('data-value', conversionData[1].rate)*/
				}
			})
			.catch(error => {
				console.log(error);
				curRate = 10;
				$("#exchangerate").text('Our rate: N 10 = $ 1');
			});
	})

	var fromCurValue = 0;
	var toCurValue = 0;
	var usa = "./assets/img/cntry-usa.png"
	var nig = "./assets/img/cntry-nigeria.png"
	$(".conv-cur .dropdown-menu.fromflaglist a").on('click', function(){
		var curimg = $(this).find('img').attr('src');
		$('#formflag').attr('src' , curimg);
		fromCurValue = $(this).attr('data-value');
		var dataFlag = $(this).attr('data-flag');
		if(dataFlag == 'NGN'){
			$('#formflag').attr('data-flag' , 'NGN');
        	$('#dataone').attr('placeholder','N 0.00');
		}
		else if(dataFlag == 'USD'){
			$('#formflag').attr('data-flag' , 'USD');
			$('#dataone').attr('placeholder','$ 0.00');
		}
		let dataOne  = document.getElementById("dataone").value;
            if($('#formflag').attr('data-flag') == $('#toflag').attr('data-flag')){
                document.getElementById("datatwo").value = dataOne;
            }else{
                document.getElementById("datatwo").value = dataOne * curRate;
            }

	});
	
	$(".conv-cur .dropdown-menu.toflaglist a").on('click', function(){
		var curimg = $(this).find('img').attr('src');
		$('#toflag').attr('src' , curimg);
		toCurValue = $(this).attr('data-value');
		var dataFlag = $(this).attr('data-flag');
		if(dataFlag == 'NGN'){
			$('#toflag').attr('data-flag' , 'NGN');
        	$('#datatwo').attr('placeholder','N 0.00');
		}
		else if(dataFlag == 'USD'){
			$('#toflag').attr('data-flag' , 'USD');
			$('#datatwo').attr('placeholder','$ 0.00');
		}
		let dataTwo  = document.getElementById("datatwo").value;
		if($('#formflag').attr('data-flag') == $('#toflag').attr('data-flag')){
			document.getElementById("dataone").value = dataTwo;
		}else{
			document.getElementById("dataone").value = dataTwo/curRate;

		}
	});

	if($('.owl-team').length > 0){
		
		$('.owl-team').owlCarousel({
			loop:true,
			margin:0,
			autoplay:false,
			nav:true,
			navText:["<img src='assets/img/prev.svg' class='img-fluid' >","<img src='assets/img/next.svg' class='img-fluid' >"],
			responsiveClass:true,
			responsive:{
				0:{
					items:1.5
				},
				320:{
					items:2.5
				},
				490:{
					items:3.5
				},
				991:{
					items:3.5
				},
				
				1400:{
					items:4.5
				}
			}
		});
	}

	// setTimeout(function () { $('.animation-box' ).addClass('af-1'); }, 1000);
	// setTimeout(function () { $('.animation-box' ).addClass('a-1'); }, 4000);
	// setTimeout(function () { $('.animation-box' ).addClass('a-2'); }, 5000);
	// setTimeout(function () { $('.animation-box' ).addClass('al-1'); }, 6000);
	// setTimeout(function () { $('.animation-box' ).addClass('al-2'); }, 9000);
	// setTimeout(function () { $('.animation-box' ).addClass('a-3'); }, 7000);

	$('.btn-shake').on('click',function(){
		$(this).addClass('shake');
		setTimeout(function () { $('.btn-shake').removeClass('shake'); }, 800);
	})
	if($('#myButton').length > 0){
	const button = document.getElementById('myButton');
	button.addEventListener('click', function(e) {
		let dataToSend = document.getElementById('email').value;
		var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		console.log(re.test(String(email).toLowerCase()));
		if(re.test(String(dataToSend).toLowerCase())){
			console.log('here');
			let _data = {
				email : dataToSend
				}
			fetch('https://api.tapp.link/api/v1/addEmail', 
					{method: 'POST',
					body: JSON.stringify(_data),
					headers: {"Content-type": "application/json; charset=UTF-8"}})
				.then(function(response) {
				if(response.ok) {
					document.getElementById('email').value = '';
					document.getElementById('successData').style.display = 'block';
					document.getElementById('errorMessage').style.display = "none";
					confetti({
						particleCount: 100,
						spread: 70,
						origin: { y: 0.6 }
					  });
					return;
				}
				throw new Error('Request failed.');
				})
				.catch(function(error) {
				console.log(error);
				});

		}else{
			document.getElementById('errorMessage').style.display = "block";
		}
		
	});
	}

	$('.team .row.team-dec').css('height' , $('.our-team').outerHeight());

	$("#nevButton").append($('.owl-nav'));
	$('.mobile-section-inner.team').css('height' , $('.our-team').outerHeight() + $('.team .col-detial').outerHeight());
	if($('.mobile-section-inner.team .our-team').length > 0){
		$('.mobile-section-inner.team .our-team').css('padding-left', $('.mobile-section-inner.team .container')[0].offsetLeft);
	}
	$('.team-des .our-team').css('padding-left', $('.container')[0].offsetLeft - 8);
});
$(document).resize(function() {

	$('.team .row.team-dec').css('height' , $('.our-team').outerHeight());
	$('.mobile-section-inner.team').css('height' , $('.our-team').outerHeight() + $('.team .col-detial').outerHeight());
	if($('.mobile-section-inner.team .our-team').length > 0){
		$('.mobile-section-inner.team .our-team').css('padding-left', $('.mobile-section-inner.team .container')[0].offsetLeft);
	}
	$('.team-des .our-team').css('padding-left', $('.container')[0].offsetLeft - 8 );
});
/* Header menu scroll up/Down */
$(window).scroll(function(){
	if ($(window).scrollTop() >= 150) {
	  $('header').addClass('sticky');
	}
	else {
	  $('header').removeClass('sticky');
	}
  });


  $(function(){
	var url = window.location.hash;
	
	if(url == "#PrivacyPolicy"){
		
		$("[aria-label='Go to slide 6']").trigger( "click" );
	}
	if(url == "#sectionFeatures"){
		
		$("[aria-label='Go to slide 2']").trigger( "click" );
	}
	// con
  });

  $("#features").click(function(){
	$("[aria-label='Go to slide 2']").trigger( "click" );
  })
  $("#home").click(function(){
	$("[aria-label='Go to slide 1']").trigger( "click" );
  });
  
 


  if ($(window).width() <= 992) {
	  $(".mob-box").append($("#exchangerate"));

	  $(".nav-scroll").click(function(e){
		e.preventDefault();
		$('.nav-link.activeClass').removeClass("activeClass")
		$(this).addClass("activeClass")
		var id = $(this).data('id')
		$('html,body').animate({
			scrollTop: $("#" + id).offset().top - 100
		}, 'slow');
		var myCollapse = document.getElementById('navbarTogglerDemo02')
		var bsCollapse = new bootstrap.Collapse(myCollapse, {
			hide: true
		})
		bsCollapse()
	  });
	
  }

 