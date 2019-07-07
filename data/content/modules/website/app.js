var app = new Vue({
	data: {
		ticker: null,
		FG: {},
		status: 'not_authorized',
		authResponse: {
			accessToken: 'none',
			userID: '0',
			userData: {
				id: null,
				username: null,
				names: null,
				surname: null,
				second_surname: null,
				phone: null,
				mobile: null,
				registered: null,
				avatar: null,
				mail: null,
				password: null,
				permissions: {
					id: null,
					name: null,
					data: {
						
					}
				}
			}
		},
		appName: 'B2B Monteverde',
		theme_settings: {
			st_head_fixed: 0,
			st_sb_fixed: 1,
			st_sb_scroll: 1,
			st_sb_right: 0,
			st_sb_custom: 0,
			st_sb_toggled: 0,
			st_layout_boxed: 1
		},
		plugins: {
			date: null,
			clock: null,
		},
		html_click_avail: true,
	},
	router: router,
	components: {
		'component-sidebar-left': Component_Sidebar_Left,
		'component-navigation-top': Component_Navigation_Top,
		'component-site-settings': Component_Site_Settings,
	},
	methods: {
		MV(){
			var self = this;
			r = { 
				callbackRepair: {
					list(data, callback){
						a = [];
						try{
							if(data[0] != undefined && data[0].id > 0){
								return callback(data);
							}else{
								return callback(a);
							}
						}
						catch(e){
							return callback(a);
						}
					},
					trash(data, callback){
						a = false;
						try{
							if(data > 0){
								return callback(true);
							}else{
								return callback(false);
							}
						}
						catch(e){
							return callback(a);
						}
					},
					create(data, callback){
						a = false;
						try{
							if(Number(data) > 0){
								return callback(true);
							}else{
								return callback(false);
							}
						}
						catch(e){
							return callback(a);
						}
					},
					edit(data, callback){
						a = false;
						try{
							if(Number(data) > 0)
							{
								return callback(true);
							}else{
								return callback(false);
							}
						}
						catch(e){
							return callback(a);
						}
					},
					single(data, callback, model){
						a = model;
						try{
							if(data != undefined && data.id > 0){
								for (var k in model){
									if (data.hasOwnProperty(k)) {
										if(data[k] != undefined){
											a[k] = data[k];
										}
									}
								}
								return callback(a);
							}else{
								return callback(null);
							}
						}
						catch(e){
							return callback(null);
						}
					},
				},
				statusRequests: {
					list(params, callback){
						if(params == null || params == undefined){ params = {}; }
						FG.api('GET', '/status_requests', params, function(a){ 
							return self.MV().callbackRepair.list(a, callback);
						});
					},
				},
				typesEvents: {
					list(params, callback){
						if(params == null || params == undefined){ params = {}; }
						FG.api('GET', '/types_events', params, function(a){ 
							return self.MV().callbackRepair.list(a, callback);
						});
					},
				},
				statusEvents: {
					list(params, callback){
						if(params == null || params == undefined){ params = {}; }
						FG.api('GET', '/status_events', params, function(a){ 
							return self.MV().callbackRepair.list(a, callback);
						});
					},
				},
				typesBanks: {
					Model(disable_id){
						a = {};
						if(disable_id == undefined || disable_id == false){ a.id = null; }
						a.name = null;
						return a;
					},
					single(id, callback, params){
						if(params == null || params == undefined){ params = {}; }
						try {
							FG.api('GET', '/types_banks/' + id, params, function(a){ 
								return self.MV().callbackRepair.single(a, callback, self.MV().typesBanks.Model());
							});
						}
						catch(e){
							return callback(e);
						}
						/*
						Ejemplo: 
						app.MV().typesBanks.single(1, function(a){
							console.log(a);
							if(a === null){
								console.log('No tenemos este tipo de cuenta');
							}
						}, {});
						*/
					},
					list(params, callback){
						if(params == null || params == undefined){ params = {}; }
						FG.api('GET', '/types_banks', params, function(a){ 
							return self.MV().callbackRepair.list(a, callback);
						});
					},
					trash(idDelete, callback){
						try{
							bootbox.confirm({
								message: "Estas tratando de realizar cambios irreversibles, antes de realizar dichos cambios debes confirmar por seguridad! Deseas continuar?",
								buttons: {
									confirm: {
										label: 'Si',
										className: 'btn-success'
									},
									cancel: {
										label: 'No',
										className: 'btn-danger'
									}
								},
								callback: function (a) {
									if(a === true){
										FG.api('DELETE','/types_banks/' + idDelete, {
										}, function(b){
											return self.MV().callbackRepair.trash(b, callback);
										});
									}
								}
							});
						}
						catch(e){
							return false;
						}
					},
					create(params, callback){
						if(params == null || params == undefined){ params = {}; }
						try{
							bootbox.confirm({
								message: "Deseas continuar?",
								buttons: {
									confirm: {
										label: 'Si',
										className: 'btn-success'
									},
									cancel: {
										label: 'No',
										className: 'btn-danger'
									}
								},
								callback: function (a) {
									if(a === true){
										FG.api('POST','/types_banks', params, function(b){
											return self.MV().callbackRepair.create(b, callback);
										});
									}
								}
							});
						}
						catch(e){
							return false;
						}
					},
					edit(params, callback){
						if(params == null || params == undefined){ params = {}; }
						try{							
							bootbox.confirm({
								message: "Deseas continuar?",
								buttons: {
									confirm: {
										label: 'Si',
										className: 'btn-success'
									},
									cancel: {
										label: 'No',
										className: 'btn-danger'
									}
								},
								callback: function (a) {
									if(a === true){
										FG.api('PUT','/types_banks/' + params.id, params, function(b){
											return self.MV().callbackRepair.edit(b, callback);
										});
									}
								}
							});
						}
						catch(e){
							return false;
						}
					},
				},
			}
			return r;
		},
		routeNameIsActive: function(name_validate){
			var self = this;
			if(self.$route.name === name_validate){
				return 'active';
			}else{
				return 'no-active';
			}
		},
		get_class_pages_container: function(){
			var self = this;
			if(self.status === 'connected'){
				return 'page-container';
			}else{
				return 'page-container-complete';
			}
		},
		LogOut: function(){
			var self = this;
			FG.session_close()
		},
		menuScripts: function(){
		},
		LogInPop: function(){
			var self = this;
			
			FG.login(function(r) {
				if (r.status == 'connected') {
					$.notify('Bienvenid@, espera mientras te redireccionamos...', "success");
				} else {
					$.notify('El usuario canceló el inicio de sesión o no estaba totalmente autorizado.', 'warning');
				}
			});
		},
		checkSession: function(){
			var self = this;
			if(self.status === 'not_authorized'){
				localStorage.clear();
				self.LogInPop();
			}
		},
		getStatus: function(){
			return this.status;
		},
		getAuthResponse: function(){
			return this.authResponse;
		},
		zfill: function(number, width) {
			var numberOutput = Math.abs(number);
			var length = number.toString().length;
			var zero = "0";
			if (width <= length) {
				if (number < 0) { return ("-" + numberOutput.toString()); } 
				else { return numberOutput.toString(); }
			} else {
				if (number < 0) { return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); } 
				else { return ((zero.repeat(width - length)) + numberOutput.toString()); }
			}
		},
		formatMoney: function(n, c, d, t){
			var c = isNaN(c = Math.abs(c)) ? 2 : c,
				d = d == undefined ? "." : d,
				t = t == undefined ? "," : t,
				s = n < 0 ? "-" : "",
				i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
				j = (j = i.length) > 3 ? j % 3 : 0;
			return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		},
		MaysFirst: function(string){
		  return string.toUpperCase();
		},
		tp_clock_time(){
			var now     = new Date();
			var hour    = now.getHours();
			var minutes = now.getMinutes();                    
			
			hour = hour < 10 ? '0'+hour : hour;
			minutes = minutes < 10 ? '0'+minutes : minutes;
			
			return {
				hours: hour,
				minutes: minutes
			};
		},
		templatePlugins(){
			var self = this;
			
			return {
				tp_clock(){
					self.plugins.clock = self.tp_clock_time();
					
					window.setInterval(function(){
						self.plugins.clock = self.tp_clock_time();
					},10000);
				},
				tp_date(){
					var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
					var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
							
					var now     = new Date();
					var day     = days[now.getDay()];
					var date    = now.getDate();
					var month   = months[now.getMonth()];
					var year    = now.getFullYear();
					
					self.plugins.date = {
						day: day,
						month: month,
						date: date,
						year: year
					};
				},
				init(){
					this.tp_clock();
					this.tp_date();
				},
			}
		},
		loadingProgess(){
			var self = this;
			self._mpb("show",{value: [0,50],speed: 5});
		},
		load_root: function(){
			var self = this;
			self.loadingProgess();
			
			
			$("html").on("click", function(){
				if(self.html_click_avail)
					$(".x-navigation-horizontal li,.x-navigation-minimized li").removeClass('active');        
			});

			$(".x-navigation-horizontal .panel").on("click",function(e){
				e.stopPropagation();
			});
			
			
			/* CONTENT FRAME */
			$(".content-frame-left-toggle").on("click",function(){
				$(".content-frame-left").is(":visible") 
				? $(".content-frame-left").hide() 
				: $(".content-frame-left").show();
				self.page_content_onresize();
			});
			$(".content-frame-right-toggle").on("click",function(){
				$(".content-frame-right").is(":visible") 
				? $(".content-frame-right").hide() 
				: $(".content-frame-right").show();
				self.page_content_onresize();
			});    
			/* END CONTENT FRAME */
			
			/* PANELS */
			$(".panel-fullscreen").on("click",function(){
				self.panel_fullscreen($(this).parents(".panel"));
				return false;
			});
			
			$(".panel-collapse").on("click",function(){
				self.panel_collapse($(this).parents(".panel"));
				$(this).parents(".dropdown").removeClass("open");
				return false;
			});    
			$(".panel-remove").on("click",function(){
				self.panel_remove($(this).parents(".panel"));
				$(this).parents(".dropdown").removeClass("open");
				return false;
			});
			$(".panel-refresh").on("click",function(){
				var panel = $(this).parents(".panel");
				self.panel_refresh(panel);

				setTimeout(function(){
					self.panel_refresh(panel);
				},3000);
				
				$(this).parents(".dropdown").removeClass("open");
				return false;
			});
			/* EOF PANELS */
			
		},
		load_actions: function(){
			var self = this;
			
			$("body").tooltip({selector:'[data-toggle="tooltip"]',container:"body"});
			
			/* MESSAGE BOX */
			$(".mb-control").on("click",function(){
				var box = $($(this).data("box"));
				if(box.length > 0){
					box.toggleClass("open");
					
					var sound = box.data("sound");
					
					if(sound === 'alert')
						self.playAudio('alert');
					
					if(sound === 'fail')
						self.playAudio('fail');
					
				}        
				return false;
			});
			$(".mb-control-close").on("click",function(){
			   $(this).parents(".message-box").removeClass("open");
			   return false;
			});    
			/* END MESSAGE BOX */
			/* WIDGETS (DEMO)*/
			$(".widget-remove").on("click",function(){
				$(this).parents(".widget").fadeOut(400,function(){
					$(this).remove();
					$("body > .tooltip").remove();
				});
				return false;
			});
			/* END WIDGETS */
			
			// XN PANEL DRAGGING
			$( ".xn-panel-dragging" ).draggable({
				containment: ".page-content", handle: ".panel-heading", scroll: false,
				start: function(event,ui){
					self.html_click_avail = false;
					$(this).addClass("dragged");
				},
				stop: function( event, ui ) {
					$(this).resizable({
						maxHeight: 400,
						maxWidth: 600,
						minHeight: 200,
						minWidth: 200,
						helper: "resizable-helper",
						start: function( event, ui ) {
							self.html_click_avail = false;
						},
						stop: function( event, ui ) {
							$(this).find(".panel-body").height(ui.size.height - 82);
							$(this).find(".scroll").mCustomScrollbar("update");
													
							setTimeout(function(){
								self.html_click_avail = true; 
							},1000);
													
						}
					})
					
					setTimeout(function(){
						self.html_click_avail = true; 
					},1000);            
				}
			});
			
			/* DROPDOWN TOGGLE */
			$(".dropdown-toggle").on("click",function(){
				self.onresize();
			});
			
			/* DATATABLES/CONTENT HEIGHT FIX */
			$(".dataTables_length select").on("change",function(){
				self.onresize();
			});
			/* END DATATABLES/CONTENT HEIGHT FIX */
			
			/* TOGGLE FUNCTION */
			$(".toggle").on("click",function(){
				var elm = $("#"+$(this).data("toggle"));
				if(elm.is(":visible"))
					elm.addClass("hidden").removeClass("show");
				else
					elm.addClass("show").removeClass("hidden");
				
				return false;
			});
			/* END TOGGLE FUNCTION */
			
			/* MESSAGES LOADING */
			$(".messages .item").each(function(index){
				var elm = $(this);
				setInterval(function(){
					elm.addClass("item-visible");
				},index*300);              
			});
			/* END MESSAGES LOADING */
			
			self.x_navigation();

			$(function(){            
				self.onload();

				/* PROGGRESS COMPLETE */
				self._mpb("update",{value: 100, speed: 5, complete: function(){            
					$(".mpb").fadeOut(200,function(){
						$(this).remove();
					});
				}});
				/* END PROGGRESS COMPLETE */
			});

			$(window).resize(function(){
				self.x_navigation_onresize();
				self.page_content_onresize();
			});

			/* NEW OBJECT(GET SIZE OF ARRAY) */
			Object.size = function(obj) {
				var size = 0, key;
				for (key in obj) {
					if (obj.hasOwnProperty(key)) size++;
				}
				return size;
			};
			/* EOF NEW OBJECT(GET SIZE OF ARRAY) */			
		},
		onresize(timeout){
			var self = this;
			timeout = timeout ? timeout : 200;

			setTimeout(function(){
				self.page_content_onresize();
			},timeout);
		},
		x_navigation(){
			var self = this;
			$(".x-navigation-control").click(function(){
				$(this).parents(".x-navigation").toggleClass("x-navigation-open");
				
				self.onresize();
				
				return false;
			});

			if($(".page-navigation-toggled").length > 0){
				self.x_navigation_minimize("close");
			}    
			
			$(".x-navigation-minimize").click(function(){
						
				if($(".page-sidebar .x-navigation").hasClass("x-navigation-minimized")){
					$(".page-container").removeClass("page-navigation-toggled");
					self.x_navigation_minimize("open");
				}else{            
					$(".page-container").addClass("page-navigation-toggled");
					self.x_navigation_minimize("close");            
				}
				
				self.onresize();
				
				return false;        
			});
			   
			$(".x-navigation  li > a").click(function(){
				
				var li = $(this).parent('li');        
				var ul = li.parent("ul");
				
				ul.find(" > li").not(li).removeClass("active");    
				
			});
			
			$(".x-navigation li").click(function(event){
				event.stopPropagation();
				
				var li = $(this);
						
					if(li.children("ul").length > 0 || li.children(".panel").length > 0 || $(this).hasClass("xn-profile") > 0){
						if(li.hasClass("active")){
							li.removeClass("active");
							li.find("li.active").removeClass("active");
						}else
							li.addClass("active");
							
						self.onresize();
						
						if($(this).hasClass("xn-profile") > 0)
							return true;
						else
							return false;
					}                                     
			});
			
			/* XN-SEARCH */
			$(".xn-search").on("click",function(){
				$(this).find("input").focus();
			})
			/* END XN-SEARCH */
			
		},
		/* PANEL FUNCTIONS */
		panel_fullscreen(panel){
			var self = this;
			if(panel.hasClass("panel-fullscreened")){
				panel.removeClass("panel-fullscreened").unwrap();
				panel.find(".panel-body,.chart-holder").css("height","");
				panel.find(".panel-fullscreen .fa").removeClass("fa-compress").addClass("fa-expand");        
				
				$(window).resize();
			}else{
				var head    = panel.find(".panel-heading");
				var body    = panel.find(".panel-body");
				var footer  = panel.find(".panel-footer");
				var hplus   = 30;
				
				if(body.hasClass("panel-body-table") || body.hasClass("padding-0")){
					hplus = 0;
				}
				if(head.length > 0){
					hplus += head.height()+21;
				} 
				if(footer.length > 0){
					hplus += footer.height()+21;
				} 

				panel.find(".panel-body,.chart-holder").height($(window).height() - hplus);
				
				
				panel.addClass("panel-fullscreened").wrap('<div class="panel-fullscreen-wrap"></div>');        
				panel.find(".panel-fullscreen .fa").removeClass("fa-expand").addClass("fa-compress");
				
				$(window).resize();
			}
		},
		panel_collapse(panel,action,callback){
			var self = this;
			if(panel.hasClass("panel-toggled")){        
				panel.removeClass("panel-toggled");
				
				panel.find(".panel-collapse .fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");

				if(action && action === "shown" && typeof callback === "function")
					callback();            

				self.onload();
						
			}else{
				panel.addClass("panel-toggled");
						
				panel.find(".panel-collapse .fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");

				if(action && action === "hidden" && typeof callback === "function")
					callback();

				self.onload();        
				
			}
		},
		panel_remove(panel,action,callback){
			var self = this;
			if(action && action === "before" && typeof callback === "function") 
				callback();
			
			panel.animate({'opacity':0},200,function(){
				panel.parent(".panel-fullscreen-wrap").remove();
				$(this).remove();        
				if(action && action === "after" && typeof callback === "function") 
					callback();
				
				
				self.onload();
			});    
		},
		/* EOF PANEL FUNCTIONS */
		onload(){
			var self = this;
			self.x_navigation_onresize();    
			self.page_content_onresize();
		},
		panel_refresh(panel,action,callback){
			var self = this;
			if(!panel.hasClass("panel-refreshing")){
				panel.append('<div class="panel-refresh-layer"><img src="/img/loaders/default.gif"/></div>');
				panel.find(".panel-refresh-layer").width(panel.width()).height(panel.height());
				panel.addClass("panel-refreshing");
				
				if(action && action === "shown" && typeof callback === "function") 
					callback();
			}else{
				panel.find(".panel-refresh-layer").remove();
				panel.removeClass("panel-refreshing");
				
				if(action && action === "hidden" && typeof callback === "function") 
					callback();        
			}       
			self.onload();
		},
		x_navigation_onresize(){
			var self = this;
			var inner_port = window.innerWidth || $(document).width();
			if(inner_port < 1025){               
				$(".page-sidebar .x-navigation").removeClass("x-navigation-minimized");
				$(".page-container").removeClass("page-container-wide");
				$(".page-sidebar .x-navigation li.active").removeClass("active");
				$(".x-navigation-horizontal").each(function(){            
					if(!$(this).hasClass("x-navigation-panel")){                
						$(".x-navigation-horizontal").addClass("x-navigation-h-holder").removeClass("x-navigation-horizontal");
					}
				});
			}else{        
				if($(".page-navigation-toggled").length > 0){
					self.x_navigation_minimize("close");
				}       
				
				$(".x-navigation-h-holder").addClass("x-navigation-horizontal").removeClass("x-navigation-h-holder");                
			}
		},
		x_navigation_minimize(action){
			var self = this;
			if(action == 'open'){
				$(".page-container").removeClass("page-container-wide");
				$(".page-sidebar .x-navigation").removeClass("x-navigation-minimized");
				$(".x-navigation-minimize").find(".fa").removeClass("fa-indent").addClass("fa-dedent");
				$(".page-sidebar.scroll").mCustomScrollbar("update");
			}
			
			if(action == 'close'){
				$(".page-container").addClass("page-container-wide");
				$(".page-sidebar .x-navigation").addClass("x-navigation-minimized");
				$(".x-navigation-minimize").find(".fa").removeClass("fa-dedent").addClass("fa-indent");
				$(".page-sidebar.scroll").mCustomScrollbar("disable",true);
			}
			$(".x-navigation li.active").removeClass("active");
		},
		page_content_onresize(){
			var self = this;
			$(".page-content,.content-frame-body,.content-frame-right,.content-frame-left").css("width","").css("height","");
			
			var content_minus = 0;
			content_minus = ($(".page-container-boxed").length > 0) ? 40 : content_minus;
			content_minus += ($(".page-navigation-top-fixed").length > 0) ? 50 : 0;
			
			var content = $(".page-content");
			var sidebar = $(".page-sidebar");
			
			if(content.height() < $(document).height() - content_minus){        
				content.height($(document).height() - content_minus);
			}        
			
			if(sidebar.height() > content.height()){        
				content.height(sidebar.height());
			}
			
			if($(window).width() > 1024){
				if($(".page-sidebar").hasClass("scroll")){
					if($("body").hasClass("page-container-boxed")){
						var doc_height = $(document).height() - 40;
					}else{
						var doc_height = $(window).height();
					}
				   $(".page-sidebar").height(doc_height);
			   }
				if($(".content-frame-body").height() < $(document).height()-162){
					$(".content-frame-body,.content-frame-right,.content-frame-left").height($(document).height()-162);            
				}else{
					$(".content-frame-right,.content-frame-left").height($(".content-frame-body").height());
				}
				$(".content-frame-left").show();
				$(".content-frame-right").show();
			}else{
				$(".content-frame-body").height($(".content-frame").height()-80);
				
				if($(".page-sidebar").hasClass("scroll"))
				   $(".page-sidebar").css("height","");
			}
			if($(window).width() < 1200){
				if($("body").hasClass("page-container-boxed")){
					$("body").removeClass("page-container-boxed").data("boxed","1");
				}
			}else{
				if($("body").data("boxed") === "1"){
					$("body").addClass("page-container-boxed").data("boxed","");
				}
			}
		},
		load_plugins: function(){
			var self = this;
			
		},
		destroy_plugins: function(){
			var self = this;
			
		},
		_mpb(action,options){
			var settings = $.extend({
				state: '',            
				value: [0,0],
				position: '',
				speed: 20,
				complete: null
			},options);

			if(action == 'show' || action == 'update'){
				if(action == 'show'){
					$(".mpb").remove();
					var mpb = '<div class="mpb '+settings.position+'">\n\
								   <div class="mpb-progress'+(settings.state != '' ? ' mpb-'+settings.state: '')+'" style="width:'+settings.value[0]+'%;"></div>\n\
							   </div>';
					$('body').append(mpb);
				}
				
				var i  = $.isArray(settings.value) ? settings.value[0] : $(".mpb .mpb-progress").width();
				var to = $.isArray(settings.value) ? settings.value[1] : settings.value;            
				
				var timer = setInterval(function(){
					$(".mpb .mpb-progress").css('width',i+'%'); i++;
					
					if(i > to){
						clearInterval(timer);
						if($.isFunction(settings.complete)){
							settings.complete.call(this);
						}
					}
				}, settings.speed);
			}
			
			if(action == 'destroy'){
				$(".mpb").remove();
			}
		},
		/* PLAY SOUND FUNCTION */
		playAudio: function(file){
			if(file === 'alert')
				document.getElementById('audio-alert').play();

			if(file === 'fail')
				document.getElementById('audio-fail').play();    
		}
		/* END PLAY SOUND FUNCTION */
	},
	mounted: function() {
		var self = this;
		self.load_actions();
		
	},
	created: function() {
		var self = this;
		self.templatePlugins().init();
		//self.load_root();
	},
});
