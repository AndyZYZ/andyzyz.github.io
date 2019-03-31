(function($){'use strict';var navTarget=$('body').attr('data-page-url');var docTitle=document.title;var History=window.History;var featuredImage=$('.page__content').attr('data-image');History.Adapter.bind(window,'statechange',function(){var state=History.getState();$('body').addClass('loading');$('.page-loader').load(state.hash+' .page__content',function(){var transitionTime=400;setTimeout(function(){$('body, html').animate({scrollTop:0},0);$('.page .page__content').remove();$('.page-loader .page__content').appendTo('.page');$('body').attr('data-page-url',window.location.pathname);navTarget=$('body').attr('data-page-url');docTitle=$('.page__content').attr('data-page-title');document.title=docTitle;var newFeaturedImage=$('.page__content').attr('data-image');pageFunctions();if(newFeaturedImage!==featuredImage){featuredImage=newFeaturedImage;$('.header-image:not(.header-image--on)').css('background-image','url('+featuredImage+')');$('.header-image:not(.header-image--on)').addClass('header-image--switch');$('.header-image--switch').imagesLoaded({background:true},function(){$('.header-image--on').removeClass('header-image--on');$('.header-image--switch').addClass('header-image--on');$('.header-image--switch').removeClass('header-image--switch');});}},transitionTime);});});if($('body').hasClass('ajax-loading')){$(document).on('click','a',function(event){event.preventDefault();var thisTarget=$(this).attr('href');if($(this).is('.gallery__item__link')){}else if(thisTarget.indexOf('http')>=0){window.open(thisTarget,'_blank');}else if($(this).hasClass('js-no-ajax')){window.location=thisTarget;}else if($(this).hasClass('js-contact')){$('.modal--contact').addClass('modal--on');}else if($(this).hasClass('js-signup')){$('.modal--signup').addClass('modal--on');}else{navTarget=thisTarget;History.pushState(null,docTitle,thisTarget);}});}$(document).on('click','.js-contact',function(event){event.preventDefault();$('.modal--contact').addClass('modal--on');});$(document).on('click','.js-signup',function(event){event.preventDefault();$('.modal--signup').addClass('modal--on');});function pageFunctions(){$('.header-image').imagesLoaded({background:true},function(){$('body').removeClass('loading');$('body').removeClass('menu--open');});$('.active-link').removeClass('active-link');$('a[href="'+navTarget+'"]').addClass('active-link');Waypoint.destroyAll();var galleryCount=0;$('.gallery').each(function(){var $this=$(this);galleryCount++;var thisId='gallery-'+galleryCount;$this.attr('id',thisId);var galleryCols=$this.attr('data-columns');$this.append('<div class="gallery__wrap"></div>');$this.children('img').each(function(){$(this).appendTo('#'+thisId+' .gallery__wrap');});$this.find('.gallery__wrap img').each(function(){var imageSrc=$(this).attr('src');$(this).wrapAll('<div class="gallery__item"><a href="'+imageSrc+'" class="gallery__item__link"></div></div>').appendTo();});$this.imagesLoaded(function(){if(galleryCols==='1'){$this.addClass('gallery--carousel');$this.children('.gallery__wrap').addClass('owl-carousel');$this.children('.gallery__wrap').owlCarousel({items:1,loop:true,mouseDrag:false,touchDrag:true,pullDrag:false,dots:true,autoplay:false,autoplayTimeout:6000,autoHeight:true,animateOut:'fadeOut'});var waypoint1=new Waypoint({element:document.getElementById(thisId),handler:function(direction){if(direction==='down'){$this.children('.gallery__wrap').trigger('stop.owl.autoplay');}if(direction==='up'){$this.children('.gallery__wrap').trigger('play.owl.autoplay');}},offset:'-100%'});var waypoint2=new Waypoint({element:document.getElementById(thisId),handler:function(direction){if(direction==='down'){$this.children('.gallery__wrap').trigger('play.owl.autoplay');}if(direction==='up'){$this.children('.gallery__wrap').trigger('stop.owl.autoplay');}},offset:'100%'});}else{$this.addClass('gallery--grid');$this.children('.gallery__wrap').masonry({itemSelector:'.gallery__item',transitionDuration:0});$this.find('.gallery__item__link').fluidbox({loader:true});}$this.addClass('gallery--on');});});$('.single p > img').each(function(){var thisP=$(this).parent('p');$(this).insertAfter(thisP);$(this).wrapAll('<div class="image-wrap"></div>');thisP.remove();});$('.single iframe').each(function(){if($(this).attr('src').indexOf('youtube')>=0||$(this).attr('src').indexOf('vimeo')>=0){var width=$(this).attr('width');var height=$(this).attr('height');var ratio=(height/width)*100;$(this).wrapAll('<div class="video-wrap"><div class="video" style="padding-bottom:'+ratio+'%;"></div></div>');}});}pageFunctions();$(document).on('click','.js-menu-toggle',function(){if($('body').hasClass('menu--open')){$('body').removeClass('menu--open');}else{$('body').addClass('menu--open');}});$(document).on('click','.menu__list__item__link',function(){if($('.menu').hasClass('menu--open')){$('.menu').removeClass('menu--open');}});$(document).on('submit','#contact-form',function(e){$('.contact-form__item--error').removeClass('contact-form__item--error');var emailField=$('.contact-form__input[name="email"]');var nameField=$('.contact-form__input[name="name"]');var messageField=$('.contact-form__textarea[name="message"]');var gotchaField=$('.contact-form__gotcha');if(emailField.val()===''){emailField.closest('.contact-form__item').addClass('contact-form__item--error');}if(nameField.val()===''){nameField.closest('.contact-form__item').addClass('contact-form__item--error');}if(messageField.val()===''){messageField.closest('.contact-form__item').addClass('contact-form__item--error');}if(emailField.val()!==''&&nameField.val()!==''&&messageField.val()!==''&&gotchaField.val().length===0){}else{e.preventDefault();}});}(jQuery));