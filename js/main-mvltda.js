$(function () {
	var nua = navigator.userAgent;
	var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
	if (isAndroid){
		console.log("Esto es un dispositivo android")
	}
});

Vue.use(bootstrapVue);

var Component_Sidebar_Left = Vue.component('component-sidebar-left', {
	template: '#component-sidebar-left',
	props: [
		''
	],
	data: function () {
		return {
			Me: {
				id: this.$root.$data.authResponse.userID,
			},
			busineses: [],
			addresses: [],
			auditors: [],
			contracts: [],
			contacts: [],
			invoices: [],
			quotations: [],
			redicateds: [],
			requests: [],
			users: [],
			users_pending: [],
		};
	},
	mounted: function () {
		var self = this;
		
		
		if(self.$parent.status === 'connected'){
			self.find();
		}else{
			
		}		
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET','/users_clients', {
				filter: [
					'user,eq,' + self.$root.$data.authResponse.userID,
				],
				join: [
					'clients,auditors_clients',
					'clients,contracts_clients',
					'clients,crew_clients',
					'clients,invoices_clients',
					'clients,quotations',
					'clients,redicated_clients',
					'clients,requests',
					'clients,services_requests',
					'clients,users_clients',
					'clients,users_clients_pending',
					'clients,clients_addresses',
				]
			}, function(r){
				r.forEach(function(elem){
					if(elem.client.clients_addresses.length > 0){
						elem.client.clients_addresses.forEach(function(address){
							if(self.addresses.indexOf(address.id) < 0){
								self.addresses.push(address.id);
							};
						});
					};
					
					if(self.busineses.indexOf(elem.client.id) < 0){ self.busineses.push(elem.client.id); };
					if(elem.client.auditors_clients.length > 0){ elem.client.auditors_clients.forEach(function(auditor){ if(self.auditors.indexOf(auditor.id) < 0){ self.auditors.push(auditor.id); }; }); };
					if(elem.client.contracts_clients.length > 0){ elem.client.contracts_clients.forEach(function(contract){ if(self.contracts.indexOf(contract.id) < 0){ self.contracts.push(contract.id); }; }); };
					if(elem.client.crew_clients.length > 0){ elem.client.crew_clients.forEach(function(contact){ if(self.contacts.indexOf(contact.id) < 0){ self.contacts.push(contact.id); }; }); };
					if(elem.client.invoices_clients.length > 0){ elem.client.invoices_clients.forEach(function(invoice){ if(self.invoices.indexOf(invoice.id) < 0){ self.invoices.push(invoice.id); }; }); };
					if(elem.client.quotations.length > 0){ elem.client.quotations.forEach(function(quotation){ if(self.quotations.indexOf(quotation.id) < 0){ self.quotations.push(quotation.id); }; }); };
					if(elem.client.redicated_clients.length > 0){ elem.client.redicated_clients.forEach(function(redicated){ if(self.redicateds.indexOf(redicated.id) < 0){ self.redicateds.push(redicated.id); }; }); };
					if(elem.client.requests.length > 0){ elem.client.requests.forEach(function(request){ if(self.requests.indexOf(request.id) < 0){ self.requests.push(request.id); }; }); };
					if(elem.client.users_clients.length > 0){ elem.client.users_clients.forEach(function(user){ if(self.users.indexOf(user.id) < 0){ self.users.push(user.id); }; }); };
					if(elem.client.users_clients_pending.length > 0){ elem.client.users_clients_pending.forEach(function(user_pending){ if(self.users_pending.indexOf(user_pending.id) < 0){ self.users_pending.push(user_pending.id); }; }); };
				});
			});
		}
	}
});

var Component_Navigation_Top = Vue.component('component-navigation-top', {
	template: '#component-navigation-top',
	data: function() {
		return {
			requests: [],
		};
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		linkRequests(request_id, account_id){
			var self = this;
			if(request_id != undefined && account_id != undefined){
				if(self.$route.name == 'page-accounts-requests-single-view'){
					router.push({ name: 'page-accounts-requests-single-view', params: { request_id: request_id, account_id: account_id } });
					window.location.reload();
				}else{
					router.push({ name: 'page-accounts-requests-single-view', params: { request_id: request_id, account_id: account_id } });
				}				
			}
		},
		find(){
			var self = this;
			
			FG.api('GET','/requests', {
				filter: [
					'status,in,1,2,3,4,5,8',
				],
				join: [
					'clients',
					'status_requests',
				]
			}, function(r){
				if(r[0] != undefined && r[0].id > 0){
					r.forEach(function(a){
						a.addresses = JSON.parse(a.addresses);
						self.requests.push(a);
					});
				}
			});
		}
	}
});

var Component_Site_Settings = Vue.component('component-site-settings', {
	template: '#component-site-settings',
	props: [
		''
	],
	mounted: function () {
		var self = this;
		
	},
	methods: {
		toggleSettings: function(name){
			var self = this;
			// self.$root.theme_settings[name]

			// Rules
			if(name === 'st_sb_fixed'){
				if(self.$root.theme_settings.st_sb_fixed == 1){
					self.$root.theme_settings.st_sb_scroll = 1;
				}else{
					self.$root.theme_settings.st_sb_scroll = 0;
				}
			}
			
			if(name === 'st_sb_scroll'){
				if(self.$root.theme_settings.st_sb_scroll == 1 && self.$root.theme_settings.st_layout_boxed == 0){
					self.$root.theme_settings.st_sb_fixed = 1;
				}else if(self.$root.theme_settings.st_sb_scroll == 1 && self.$root.theme_settings.st_layout_boxed == 1){
					self.$root.theme_settings.st_sb_fixed = -1;
				}else if(self.$root.theme_settings.st_sb_scroll == 0 && self.$root.theme_settings.st_layout_boxed == 1){
					self.$root.theme_settings.st_sb_fixed = -1;
				}else{
					self.$root.theme_settings.st_sb_fixed = 0;
				}
			}
			
			if(name === 'st_layout_boxed'){
				if(self.$root.theme_settings.st_layout_boxed == 1){                
					self.$root.theme_settings.st_head_fixed    = -1;
					self.$root.theme_settings.st_sb_fixed      = -1;
					self.$root.theme_settings.st_sb_scroll     = 1;
				}else{
					self.$root.theme_settings.st_head_fixed    = 0;
					self.$root.theme_settings.st_sb_fixed      = 1;
					self.$root.theme_settings.st_sb_scroll     = 1;
				}
			}
			// End Rules
			
			self.set_settings(name);
		},
		ChangeTheme: function(theme, element){
			var self = this; 
			$(".ts-themes a").removeClass("active");
			$(".ts-themes a." + theme).addClass("active");
			
			$("#theme").attr("href", '/css/theme-' + theme + '.css');
			return false;
		},
		load_settings: function(){
			var self = this; 
			self.set_settings(self.$root.theme_settings,false);   
			
		
		},
		set_settings: function(option){
			var self = this;
			/* Start Header Fixed */
			if(self.$root.theme_settings.st_head_fixed == 1)
				$(".page-container").addClass("page-navigation-top-fixed");
			else
				$(".page-container").removeClass("page-navigation-top-fixed");
			
			/* Start Sidebar Fixed */
			if(self.$root.theme_settings.st_sb_fixed == 1){        
				$(".page-sidebar").addClass("page-sidebar-fixed");
			}else
				$(".page-sidebar").removeClass("page-sidebar-fixed");
			
			/* Start Sidebar Fixed */
			if(self.$root.theme_settings.st_sb_scroll == 1){          
				$(".page-sidebar").addClass("scroll").mCustomScrollbar("update");        
			}else
				$(".page-sidebar").removeClass("scroll").css("height","").mCustomScrollbar("disable",true);
			
			/* Start Right Sidebar */
			if(self.$root.theme_settings.st_sb_right == 1)
				$(".page-container").addClass("page-mode-rtl");
			else
				$(".page-container").removeClass("page-mode-rtl");
			
			/* Start Custom Sidebar */
			if(self.$root.theme_settings.st_sb_custom == 1)
				$(".page-sidebar .x-navigation").addClass("x-navigation-custom");
			else
				$(".page-sidebar .x-navigation").removeClass("x-navigation-custom");
			
			/* Start Custom Sidebar */
			if(option && option === 'st_sb_toggled'){
				if(self.$root.theme_settings.st_sb_toggled == false){
					$(".page-container").addClass("page-navigation-toggled");
					$(".x-navigation-minimize").trigger("click");
				}else{          
					$(".page-container").removeClass("page-navigation-toggled");
					$(".x-navigation-minimize").trigger("click");
				}
			}
			
			/* Start Layout Boxed */
			if(self.$root.theme_settings.st_layout_boxed == true)
				$("body").addClass("page-container-boxed");
			else
				$("body").removeClass("page-container-boxed");
			
			if(option === false || option === 'st_layout_boxed' || option === 'st_sb_fixed' || option === 'st_sb_scroll'){        
				for(option in self.$root.theme_settings){
					//self.set_settings_checkbox(option,self.$root.theme_settings[option]);
				}
			}
			$(window).resize();
		},
	}
});

var PagesDashboard = Vue.extend({
	template: '#pages-dashboard',
	data: function() {
		return {
			users: 0,
			users_clients: 0,
			requests: 0,
			addresses: 0,
		};
	},
	created: function() {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.load();
	},
	methods: {
		load(){
			var self = this;
			self.loadUsers();
			self.loadScriptDemo();
		},
		loadUsers(){
			var self = this;
			
			FG.api('GET','/users', {}, function(r){ self.users = r.length; });
			FG.api('GET','/users_clients', {}, function(r){ self.users_clients = r.length; });
			FG.api('GET','/requests', {}, function(r){ self.requests = r.length; });
		
		},
		loadScriptDemo: function(){
			// $(function(){        
				/* reportrange */
				if($("#reportrange").length > 0){   
					$("#reportrange").daterangepicker({                    
						ranges: {
						   'Today': [moment(), moment()],
						   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
						   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
						   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
						   'This Month': [moment().startOf('month'), moment().endOf('month')],
						   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
						},
						opens: 'left',
						buttonClasses: ['btn btn-default'],
						applyClass: 'btn-small btn-primary',
						cancelClass: 'btn-small',
						format: 'MM.DD.YYYY',
						separator: ' to ',
						startDate: moment().subtract('days', 29),
						endDate: moment()            
					  },function(start, end) {
						  $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
					});
					
					$("#reportrange span").html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
				}
				
				/* Donut dashboard chart */
				Morris.Donut({
					element: 'dashboard-donut-1',
					data: [
						{label: "Returned", value: 2513},
						{label: "New", value: 764},
						{label: "Registred", value: 311}
					],
					colors: ['#33414E', '#1caf9a', '#FEA223'],
					resize: true
				});
				/* END Donut dashboard chart */
				
				
				/* Bar dashboard chart */
				Morris.Bar({
					element: 'dashboard-bar-1',
					data: [
						{ y: 'Oct 10', a: 75, b: 35 },
						{ y: 'Oct 11', a: 64, b: 26 },
						{ y: 'Oct 12', a: 78, b: 39 },
						{ y: 'Oct 13', a: 82, b: 34 },
						{ y: 'Oct 14', a: 86, b: 39 },
						{ y: 'Oct 15', a: 94, b: 40 },
						{ y: 'Oct 16', a: 96, b: 41 }
					],
					xkey: 'y',
					ykeys: ['a', 'b'],
					labels: ['New Users', 'Returned'],
					barColors: ['#33414E', '#1caf9a'],
					gridTextSize: '10px',
					hideHover: true,
					resize: true,
					gridLineColor: '#E5E5E5'
				});
				/* END Bar dashboard chart */
				
				/* Line dashboard chart */
				Morris.Line({
				  element: 'dashboard-line-1',
				  data: [
					{ y: '2014-10-10', a: 2,b: 4},
					{ y: '2014-10-11', a: 4,b: 6},
					{ y: '2014-10-12', a: 7,b: 10},
					{ y: '2014-10-13', a: 5,b: 7},
					{ y: '2014-10-14', a: 6,b: 9},
					{ y: '2014-10-15', a: 9,b: 12},
					{ y: '2014-10-16', a: 18,b: 20}
				  ],
				  xkey: 'y',
				  ykeys: ['a','b'],
				  labels: ['Sales','Event'],
				  resize: true,
				  hideHover: true,
				  xLabels: 'day',
				  gridTextSize: '10px',
				  lineColors: ['#1caf9a','#33414E'],
				  gridLineColor: '#E5E5E5'
				});   
				/* EMD Line dashboard chart */
				/* Moris Area Chart */
				  Morris.Area({
				  element: 'dashboard-area-1',
				  data: [
					{ y: '2014-10-10', a: 17,b: 19},
					{ y: '2014-10-11', a: 19,b: 21},
					{ y: '2014-10-12', a: 22,b: 25},
					{ y: '2014-10-13', a: 20,b: 22},
					{ y: '2014-10-14', a: 21,b: 24},
					{ y: '2014-10-15', a: 34,b: 37},
					{ y: '2014-10-16', a: 43,b: 45}
				  ],
				  xkey: 'y',
				  ykeys: ['a','b'],
				  labels: ['Sales','Event'],
				  resize: true,
				  hideHover: true,
				  xLabels: 'day',
				  gridTextSize: '10px',
				  lineColors: ['#1caf9a','#33414E'],
				  gridLineColor: '#E5E5E5'
				});
				/* End Moris Area Chart */
				
				
				FG.api('GET', '/addresses', {
				}, function(r){
					if(r.length > 0 && r[0].id > 0){
						self.addresses = r;
						
						array = [];
						r.forEach(function(e){
							array.push({
								latLng: [e.lat, e.lon], 
								name: e.display_name
							});
						});
						
						/* Vector Map */
						var jvm_wm = new jvm.WorldMap({container: $('#dashboard-map-seles'),
								map: 'world_mill_en', 
								zoomMax: 18, 
								backgroundColor: '#FFFFFF',                                      
								regionsSelectable: true,
								regionStyle: {selected: {fill: '#B64645'},
												initial: {fill: '#33414E'}},
								markerStyle: {initial: {fill: '#1caf9a',
											   stroke: '#1caf9a'}},
								markers: array
							});
						$(".x-navigation-minimize").on("click",function(){
							setTimeout(function(){
								//rdc_resize();
							},200);    
						});
					}
					
				});
				
			// });
		}
	}
});

var PagesLogin = Vue.extend({
	template: '#pages-login',
	data: function() {
		return {
		};
	},
	created: function() {
		var self = this;
		
	},
	mounted: function () {
		var self = this;
		 //self.$parent.LogInPop();
		 
		// localStorage.clear();
		/*
		FG.callback("POST", FG.url_api(), {
			'logout': true
		}, function(response){
		});*/
		
		 if(self.$root.status === 'connected'){
			/*router.push({
				name: 'page-dashboard'
			});*/
			
		}
	},
	computed: {
	}
});

/* ACCOUNTS */
var PagesAccountsList = Vue.extend({
	template: '#page-accounts-list',
	data: function() {
		return {
			posts: [],
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/clients', {
				join: [
					'types_clients',
					'types_identifications',
					'contacts',
					'geo_departments',
					'geo_citys',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					// self.posts = r;
					
					$(".datatable tbody").html('');
					r.forEach(function(el){
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.type.name + `</td>
								<td>` + el.identification_type.name + `</td>
								<td>` + el.identification_number + `</td>
								<td>` + el.names + `</td>
								<td>` + el.address_principal + `, ` + el.address_principal_city.name + `, ` + el.address_principal_department.name + `</td>
								<td>` + el.address_invoices + `, ` + el.address_invoices_city.name + `, ` + el.address_invoices_department.name + `</td>
								<td>` + el.represent_legal.first_name + ` ` + el.represent_legal.second_name + ` ` + el.represent_legal.surname + ` ` + el.represent_legal.second_surname + `</td>
								<td>` + el.contact.first_name + ` ` + el.contact.second_name + ` ` + el.contact.surname + ` ` + el.contact.second_surname + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Cuenta" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/accounts/view/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable").DataTable();
				}
			});
		},
		delete_row(account){
			var self = this;
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
						FG.api('DELETE','/clients/' + account, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								self.find();
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								
								$.notify("Ocurrio un inconveniente al intentar eliminar la cuenbta!", "error");
							}
						});
					}
				}
			});
		}
	}
});

var PagesAccountsAdd = Vue.extend({
	template: '#page-accounts-add',
	data: function() {
		return {
			options: {
				types_clients: [],
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
				contacts: [],
			},
			post: {
				type: 0,
				identification_type: 0,
				identification_number: '',
				names: '',
				address_principal: '',
				address_principal_department: 0,
				address_principal_city: 0,
				address_invoices: '',
				address_invoices_department: 0,
				address_invoices_city: 0,
				represent_legal: 0,
				contact: 0,
				audit_enabled: 0
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.load_options_selects();
	},
	methods: {
		load_options_selects(){
			var self = this;
			self.$root._mpb("show",{value: [0,0],speed: 1});
			FG.api('GET', '/crew_clients', {
				join: [
					'contacts',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.contacts = r;
					r.forEach(function(el){
						$(".select[data-v-model='represent_legal']").append('<option value="'+el.contact.id+'">'+
							el.contact.identification_number + ' - ' +
							el.contact.first_name + ' ' +
							el.contact.second_name + ' ' +
							el.contact.surname + ' ' +
							el.contact.second_surname 
						+'</option>');
						$(".select[data-v-model='contact']").append('<option value="'+el.contact.id+'">'+
							el.contact.identification_number + ' - ' +
							el.contact.first_name + ' ' +
							el.contact.second_name + ' ' +
							el.contact.surname + ' ' +
							el.contact.second_surname 
						+'</option>');
					});
					$(".select[data-v-model='represent_legal']").selectpicker('refresh');
					$(".select[data-v-model='contact']").selectpicker('refresh');
				}
				self.$root._mpb("show",{value: [0,100],speed: 1});
			});
			
			FG.api('GET', '/types_clients', {}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.types_clients = r;
					r.forEach(function(el){
						$(".select[data-v-model='type']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					
					$(".select[data-v-model='type']").selectpicker('refresh');
				}
				self.$root._mpb("show",{value: [0,15],speed: 1});
			
				FG.api('GET', '/types_identifications', {}, function(r){
					if(r.length > 0 && r[0].id > 0){
						self.options.types_identifications = r;
						r.forEach(function(el){
							$(".select[data-v-model='identification_type']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='identification_type']").selectpicker('refresh');
						
						self.$root._mpb("show",{value: [0,30],speed: 0});
						
						FG.api('GET', '/geo_departments', {}, function(r){
							if(r.length > 0 && r[0].id > 0){
								self.options.geo_departments = r;
								
								r.forEach(function(el){
									$(".select[data-v-model='address_principal_department']").append('<option value="'+el.id+'">'+el.name+'</option>');
									$(".select[data-v-model='address_invoices_department']").append('<option value="'+el.id+'">'+el.name+'</option>');
								});
								
								$(".select[data-v-model='address_principal_department']").selectpicker('refresh');
								$(".select[data-v-model='address_invoices_department']").selectpicker('refresh');
							}
							self.$root._mpb("show",{value: [0,50],speed: 0});
							self.load_plugins_this();
						});
					}
				});
			});
		},
		load_citys(inputSelect){
			var self = this;
			self.options.geo_departments = [];
			self.$root._mpb("show",{value: [0,0],speed: 0});
			
			if(inputSelect == 'address_principal_department'){
				$(".select[data-v-model='address_principal_city']").find('option').remove().end().append('<option value=""></option>');
				
				FG.api('GET', '/geo_citys', {
					filter: [
						'department,eq,' + self.post.address_principal_department
					]
				}, function(r){
					self.$root._mpb("show",{value: [0,50],speed: 0});
					if(r.length > 0 && r[0].id > 0){
						r.forEach(function(el){
							$(".select[data-v-model='address_principal_city']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='address_principal_city']").selectpicker('refresh');
						self.$root._mpb("show",{value: [0,100],speed: 1});
					}
				});
			}else if(inputSelect == 'address_invoices_department'){
				$(".select[data-v-model='address_invoices_city']").find('option').remove().end().append('<option value=""></option>');
				
				FG.api('GET', '/geo_citys', {
					filter: [
						'department,eq,' + self.post.address_invoices_department
					]
				}, function(r){
					self.$root._mpb("show",{value: [0,50],speed: 0});
					if(r.length > 0 && r[0].id > 0){
						r.forEach(function(el){
							$(".select[data-v-model='address_invoices_city']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='address_invoices_city']").selectpicker('refresh');
						self.$root._mpb("show",{value: [0,100],speed: 1});
					}
				});
			}
		},
		load_plugins_this(){
			var self = this;
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							
							if($(this).data("v-model") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
								if(k=='address_principal_department' || k=='address_invoices_department'){
									self.load_citys(k);
								}
							}
						}
					}
                });
			}
			
			self.$root._mpb("show",{value: [0,75],speed: 0});			
			$(".datepicker").datepicker({format: 'yyyy-mm-dd'});

			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				wrapper: "div.item",
                ignore: [],
                rules: {
					"type": {
						required: true
					},
					"identification_type": {
						required: true
					},
					"identification_number": {
						required: true
					},
					"names": {
						required: true
					},
					"address_principal": {
						required: true
					},
					"address_principal_department": {
						required: true
					},
					"address_principal_city": {
						required: true
					},
					"address_invoices": {
						required: true
					},
					"address_invoices_department": {
						required: true
					},
					"address_invoices_city": {
						required: true
					},
					"represent_legal": {
						required: true
					},
					"contact": {
						required: true
					},
				},
				messages: {
					"type": {
						required: "Selecciona el tipo de cliente que tiene esta cuenta."
					},
					"identification_type": {
						required: "Selecciona el tipo de identificacion que tiene esta cuenta."
					},
					"identification_number": {
						required: "Ingresa el numero de la identificacion que tiene esta cuenta."
					},
					"names": {
						required: "Escribe el nombre de la cuenta o del titular."
					},
					"address_principal": {
						required: "Escribe la direccion principal de la cuenta."
					},
					"address_principal_department": {
						required: "Selecciona el departamento de la direccion principal."
					},
					"address_principal_city": {
						required: "Selecciona la ciudad de la direccion principal."
					},
					"address_invoices": {
						required: "Escribe la direccion principal de la cuenta."
					},
					"address_invoices_department": {
						required: "Selecciona el departamento de la direccion principal."
					},
					"address_invoices_city": {
						required: "Selecciona la ciudad de la direccion principal."
					},
					"represent_legal": {
						required: "Selecciona el represente legal de la cuenta."
					},
					"contact": {
						required: "Selecciona el contacto principal de la cuenta."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							newContact[k] = self.post[k];
						}
					}
					
					FG.api('GET', '/clients', {
						filter: [
							'type,eq,' + self.post.type,
							'identification_number,eq,' + self.post.identification_number,
							'identification_type,eq,' + self.post.identification_type
						]
					}, function (a) {
						if(a.length > 0){
							$.notify("La cuenta ya existe!", "error");
						}else{
							FG.api('POST', '/clients', self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("la cuenta fue creada correctamente.!", "success");
									router.push({
										name: 'page-accounts-edit',
										params: {
											account_id: b
										}
									});
								}
							});
						}
					});
				},
				onsubmit: true
			});
			
			self.$root._mpb("show",{value: [0,100],speed: 0});
		}
	}
});

var PagesAccountsEdit = Vue.extend({
	template: '#page-accounts-edit',
	data: function() {
		return {
			options: {
				types_clients: [],
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
				contacts: [],
			},
			post: {
				id: this.$route.params.account_id,
				type: 0,
				identification_type: 0,
				identification_number: '',
				names: '',
				address_principal: '',
				address_principal_department: 0,
				address_principal_city: 0,
				address_invoices: '',
				address_invoices_department: 0,
				address_invoices_city: 0,
				represent_legal: 0,
				contact: 0,
				audit_enabled: 0
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 1 });
	},
	mounted: function () {
		var self = this;
		self.load_options_selects();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/clients/' + self.$route.params.account_id, {
				join: []
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					
					$(".select[data-v-model='type']")
						.val(self.post.type)
						.change();
					$(".select[data-v-model='identification_type']")
						.val(self.post.identification_type)
						.change();
					$(".select[data-v-model='address_principal_department']")
						.val(self.post.address_principal_department)
						.change();
					$(".select[data-v-model='address_principal_city']")
						.val(self.post.address_principal_city)
						.change();
					$(".select[data-v-model='address_invoices_department']")
						.val(self.post.address_invoices_department)
						.change();
					$(".select[data-v-model='address_invoices_city']")
						.val(self.post.address_invoices_city)
						.change();
					$(".select[data-v-model='represent_legal']")
						.val(self.post.represent_legal)
						.change();
					$(".select[data-v-model='contact']")
						.val(self.post.contact)
						.change();
					
					self.$root._mpb("show",{value: [0,100],speed: 0});
				}
			});
		},
		load_options_selects(){
			var self = this;
			self.$root._mpb("show",{value: [0,0],speed: 1});
			FG.api('GET', '/crew_clients', {
				join: [
					'contacts',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.contacts = r;
					r.forEach(function(el){
						$(".select[data-v-model='represent_legal']").append('<option value="'+el.contact.id+'">'+
							el.contact.identification_number + ' - ' +
							el.contact.first_name + ' ' +
							el.contact.second_name + ' ' +
							el.contact.surname + ' ' +
							el.contact.second_surname 
						+'</option>');
						$(".select[data-v-model='contact']").append('<option value="'+el.contact.id+'">'+
							el.contact.identification_number + ' - ' +
							el.contact.first_name + ' ' +
							el.contact.second_name + ' ' +
							el.contact.surname + ' ' +
							el.contact.second_surname 
						+'</option>');
					});
					$(".select[data-v-model='represent_legal']").selectpicker('refresh');
					$(".select[data-v-model='contact']").selectpicker('refresh');
				}
				self.$root._mpb("show",{value: [0,7],speed: 1});
				
				FG.api('GET', '/geo_citys', {
					filter: []
				}, function(r){
					self.$root._mpb("show",{value: [0,50],speed: 0});
					if(r.length > 0 && r[0].id > 0){
						r.forEach(function(el){
							$(".select[data-v-model='address_principal_city']").append('<option value="'+el.id+'">'+el.name+'</option>');
							$(".select[data-v-model='address_invoices_city']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='address_principal_city']").selectpicker('refresh');
						$(".select[data-v-model='address_invoices_city']").selectpicker('refresh');
						self.$root._mpb("show",{value: [0,100],speed: 1});
					}
				});
			});
			
			
			FG.api('GET', '/types_clients', {}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.types_clients = r;
					r.forEach(function(el){
						$(".select[data-v-model='type']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					
					$(".select[data-v-model='type']").selectpicker('refresh');
				}
				self.$root._mpb("show",{value: [0,15],speed: 1});
			
				FG.api('GET', '/types_identifications', {}, function(r){
					if(r.length > 0 && r[0].id > 0){
						self.options.types_identifications = r;
						r.forEach(function(el){
							$(".select[data-v-model='identification_type']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='identification_type']").selectpicker('refresh');
						
						self.$root._mpb("show",{value: [0,30],speed: 0});
						
						FG.api('GET', '/geo_departments', {}, function(r){
							if(r.length > 0 && r[0].id > 0){
								self.options.geo_departments = r;
								
								r.forEach(function(el){
									$(".select[data-v-model='address_principal_department']").append('<option value="'+el.id+'">'+el.name+'</option>');
									$(".select[data-v-model='address_invoices_department']").append('<option value="'+el.id+'">'+el.name+'</option>');
								});
								
								$(".select[data-v-model='address_principal_department']").selectpicker('refresh');
								$(".select[data-v-model='address_invoices_department']").selectpicker('refresh');
							}
							self.$root._mpb("show",{value: [0,50],speed: 0});
							self.find();
							self.load_plugins_this();
						});
					}
				});
			});
		},
		load_citys(inputSelect){
			var self = this;
			self.options.geo_departments = [];
			self.$root._mpb("show",{value: [0,0],speed: 0});
			
			if(inputSelect == 'address_principal_department'){
				$(".select[data-v-model='address_principal_city']").find('option').remove().end().append('<option value=""></option>');
				
				FG.api('GET', '/geo_citys', {
					filter: [
						'department,eq,' + self.post.address_principal_department
					]
				}, function(r){
					self.$root._mpb("show",{value: [0,50],speed: 0});
					if(r.length > 0 && r[0].id > 0){
						r.forEach(function(el){
							$(".select[data-v-model='address_principal_city']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='address_principal_city']").selectpicker('refresh');
						self.$root._mpb("show",{value: [0,100],speed: 1});
					}
				});
			}else if(inputSelect == 'address_invoices_department'){
				$(".select[data-v-model='address_invoices_city']").find('option').remove().end().append('<option value=""></option>');
				
				FG.api('GET', '/geo_citys', {
					filter: [
						'department,eq,' + self.post.address_invoices_department
					]
				}, function(r){
					self.$root._mpb("show",{value: [0,50],speed: 0});
					if(r.length > 0 && r[0].id > 0){
						r.forEach(function(el){
							$(".select[data-v-model='address_invoices_city']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='address_invoices_city']").selectpicker('refresh');
						self.$root._mpb("show",{value: [0,100],speed: 1});
					}
				});
			}
		},
		load_plugins_this(){
			var self = this;
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							
							if($(this).data("v-model") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
								if(k=='address_principal_department' || k=='address_invoices_department'){
									self.load_citys(k);
								}
							}
						}
					}
                });
			}
			
			self.$root._mpb("show",{value: [0,75],speed: 0});			
			$(".datepicker").datepicker({format: 'yyyy-mm-dd'});

			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				wrapper: "div.item",
                ignore: [],
                rules: {
					"id": {
						required: true
					},
					"type": {
						required: true
					},
					"identification_type": {
						required: true
					},
					"identification_number": {
						required: true
					},
					"names": {
						required: true
					},
					"address_principal": {
						required: true
					},
					"address_principal_department": {
						required: true
					},
					"address_principal_city": {
						required: true
					},
					"address_invoices": {
						required: true
					},
					"address_invoices_department": {
						required: true
					},
					"address_invoices_city": {
						required: true
					},
					"represent_legal": {
						required: true
					},
					"contact": {
						required: true
					},
				},
				messages: {
					"id": {
						required: "Ocurrio un problema al detectar el ID de la cuenta, intentalo mas tarde..."
					},
					"type": {
						required: "Selecciona el tipo de cliente que tiene esta cuenta."
					},
					"identification_type": {
						required: "Selecciona el tipo de identificacion que tiene esta cuenta."
					},
					"identification_number": {
						required: "Ingresa el numero de la identificacion que tiene esta cuenta."
					},
					"names": {
						required: "Escribe el nombre de la cuenta o del titular."
					},
					"address_principal": {
						required: "Escribe la direccion principal de la cuenta."
					},
					"address_principal_department": {
						required: "Selecciona el departamento de la direccion principal."
					},
					"address_principal_city": {
						required: "Selecciona la ciudad de la direccion principal."
					},
					"address_invoices": {
						required: "Escribe la direccion principal de la cuenta."
					},
					"address_invoices_department": {
						required: "Selecciona el departamento de la direccion principal."
					},
					"address_invoices_city": {
						required: "Selecciona la ciudad de la direccion principal."
					},
					"represent_legal": {
						required: "Selecciona el represente legal de la cuenta."
					},
					"contact": {
						required: "Selecciona el contacto principal de la cuenta."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){ if (typeof self.post[k] !== 'function') { newContact[k] = self.post[k]; } }
					
					FG.api('GET', '/clients', {
						filter: [
							'type,eq,' + self.post.type,
							'identification_number,eq,' + self.post.identification_number,
							'identification_type,eq,' + self.post.identification_type
						]
					}, function (a) {
						if(a.length > 0){
							FG.api('PUT', '/clients/' + self.$route.params.account_id, self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("la cuenta fue actualizada correctamente.!", "success");
								}
							});
						}else{
							$.notify("La cuenta no existe!", "error");
						}
					});
				},
				onsubmit: true
			});
			
			self.$root._mpb("show",{value: [0,100],speed: 0});
			//self.find();
		},
		delete_row(contact){
			var self = this;
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
						FG.api('DELETE','/contacts/' + contact, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								router.push({
									name: 'page-accounts-list',
									params: {}
								});
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								
								$.notify("Ocurrio un inconveniente al intentar eliminar el contacto!", "error");
							}
						});
					}
				}
			});
		}
	}
});

var Component_Navigation_Top_PagesAccounts = Vue.component('component-navigation-top-pages-accounts', {
	template: '#component-navigation-top-pages-accounts',
	props: [
		''
	],
	data: function () {
		return {
		};
	},
	mounted: function () {
		var self = this;
		
	},
	methods: {
		find: function(){
			var self = this;
			
		},
		isActiveClass(thisName){
			var self = this;
			
					
			
			
			if(self.$route.name == thisName){
				return 'active';
			}else{
				return 'not-active';
			};
			
		},
	}
});

var PagesAccountsView = Vue.extend({
	template: '#page-accounts-view',
	data: function() {
		return {
			options: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				"id": this.$route.params.account_id,
				"type": {
					"id": 0,
					"name": ""
				},
				"identification_type": {
					"id": 0,
					"name": ""
				},
				"identification_number": "",
				"names": "",
				"address_principal": "",
				"address_principal_department": {
					"id": 0,
					"code": "",
					"name": ""
				},
				"address_principal_city": {
					"id": 0,
					"name": "",
					"department": 0
				},
				"address_invoices": "",
				"address_invoices_department": {
					"id": 0,
					"code": "",
					"name": ""
				},
				"address_invoices_city": {
					"id": 0,
					"name": "",
					"department": 0
				},
				"represent_legal": {
					"id": 0,
					"identification_type": 0,
					"identification_number": "",
					"first_name": "",
					"second_name": "",
					"surname": "",
					"second_surname": "",
					"birthdaydate": "",
					"phone": "",
					"phone_mobile": "",
					"mail": "",
					"department": 0,
					"city": 0,
					"address": ""
				},
				"contact": {
					"id": 0,
					"identification_type": 0,
					"identification_number": "",
					"first_name": "",
					"second_name": "",
					"surname": "",
					"second_surname": "",
					"birthdaydate": "",
					"phone": "",
					"phone_mobile": "",
					"mail": "",
					"department": 0,
					"city": 0,
					"address": ""
				},
				"audit_enabled": 0,
				"crew_clients": [],
			}
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/clients/' + self.$route.params.account_id, {
				join: [
					'types_clients',
					'types_identifications',
					'geo_departments',
					'geo_citys',
					'contacts',
					'crew_clients',
					'crew_clients,contacts',
					'crew_clients,types_contacts',
					'crew_clients,contacts,types_identifications',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					self.$root._mpb("show",{value: [0,10],speed: 1});
					
					$(".datatable-contacts tbody").html('');
					r.crew_clients.forEach(function(el){
						$(".datatable-contacts tbody").append(`
							<tr>
								<td>` + el.contact.identification_type.name + `</td>
								<td>` + el.contact.identification_number + `</td>
								<td>` + el.contact.first_name + ` ` + el.contact.second_name + `</td>
								<td>` + el.contact.surname + ` ` + el.contact.second_surname + `</td>
								<td>` + el.contact.phone + `</td>
								<td>` + el.contact.phone_mobile + `</td>
								<td>` + el.contact.mail + `</td>
								<td>` + el.type_contact.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Usuario" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/contacts/view/` + el.contact.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable-contacts").DataTable();
					
					
					$(".datatable-requests tbody").html('');
					r.request.forEach(function(el){
						$(".datatable-requests tbody").append(`
							<tr>
								<td>` + el.id + `</td>
								<td>
								</td>
							</tr>
						`);
					});
					$(".datatable-requests").DataTable();
				}
			});
		},
	}
});

var PagesAccountsContactsView = Vue.extend({
	template: '#page-accounts-contacts-view',
	data: function() {
		return {
			options: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				"id": this.$route.params.account_id,
				"type": {
					"id": 0,
					"name": ""
				},
				"identification_type": {
					"id": 0,
					"name": ""
				},
				"identification_number": "",
				"names": "",
				"address_principal": "",
				"address_principal_department": {
					"id": 0,
					"code": "",
					"name": ""
				},
				"address_principal_city": {
					"id": 0,
					"name": "",
					"department": 0
				},
				"address_invoices": "",
				"address_invoices_department": {
					"id": 0,
					"code": "",
					"name": ""
				},
				"address_invoices_city": {
					"id": 0,
					"name": "",
					"department": 0
				},
				"represent_legal": {
					"id": 0,
					"identification_type": 0,
					"identification_number": "",
					"first_name": "",
					"second_name": "",
					"surname": "",
					"second_surname": "",
					"birthdaydate": "",
					"phone": "",
					"phone_mobile": "",
					"mail": "",
					"department": 0,
					"city": 0,
					"address": ""
				},
				"contact": {
					"id": 0,
					"identification_type": 0,
					"identification_number": "",
					"first_name": "",
					"second_name": "",
					"surname": "",
					"second_surname": "",
					"birthdaydate": "",
					"phone": "",
					"phone_mobile": "",
					"mail": "",
					"department": 0,
					"city": 0,
					"address": ""
				},
				"audit_enabled": 0,
				"crew_clients": [],
			}
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/clients/' + self.$route.params.account_id, {
				join: [
					'types_clients',
					'types_identifications',
					'geo_departments',
					'geo_citys',
					'contacts',
					'crew_clients',
					'crew_clients,contacts',
					'crew_clients,types_contacts',
					'crew_clients,contacts,types_identifications',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					self.$root._mpb("show",{value: [0,10],speed: 1});
					
					$(".datatable-contacts tbody").html('');
					r.crew_clients.forEach(function(el){
						$(".datatable-contacts tbody").append(`
							<tr>
								<td>` + el.contact.identification_type.name + `</td>
								<td>` + el.contact.identification_number + `</td>
								<td>` + el.contact.first_name + ` ` + el.contact.second_name + `</td>
								<td>` + el.contact.surname + ` ` + el.contact.second_surname + `</td>
								<td>` + el.contact.phone + `</td>
								<td>` + el.contact.phone_mobile + `</td>
								<td>` + el.contact.mail + `</td>
								<td>` + el.type_contact.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Usuario" class="btn btn-default btn-rounded btn-xs" 
										onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/accounts/view/` + self.$route.params.account_id + `/contacts/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable-contacts").DataTable();
					
					
					$(".datatable-requests tbody").html('');
					r.request.forEach(function(el){
						$(".datatable-requests tbody").append(`
							<tr>
								<td>` + el.id + `</td>
								<td>
								</td>
							</tr>
						`);
					});
					$(".datatable-requests").DataTable();
				}
			});
		},
	}
});

var PagesAccountsContactsSingleView = Vue.extend({
	template: '#page-accounts-contacts-single-view',
	data: function() {
		return {
			options: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				id: this.$route.params.contact_id,
				client: this.$route.params.account_id,
				contact: {
					id: 0,
					identification_type: {
						id: null,
						name: null
					},
					identification_number: null,
					first_name: null,
					second_name: '---',
					surname: null,
					second_surname: '---',
					birthdaydate: '0000-00-00',
					phone: null,
					phone_mobile: null,
					mail: 'contacto@sincorreo.com',
					department: {
						id: null,
						name: null
					},
					city: {
						id: null,
						department: null,
						name: null
					},
					address: '---'
				},
				type_contact: {
					id: 0,
					name: ''
				}
			},
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		set_type_contact(){
			var self = this;
			FG.api('GET', '/types_contacts', {}, function(r){
				if(r[0] != undefined && r[0].id > 0){
					array = [{
						text: 'Selecciona una opción...',
						value: '',
					}];
					r.forEach(function(el){
						array.push({
							text: el.name,
							value: el.id
						});
					});
					
					bootbox.prompt({
						title: "Seleccione la relaccion nueva del contacto.",
						inputType: 'select',
						inputOptions: array,
						callback: function (result) {
							if(Number(result) > 0){
								FG.api('PUT', '/crew_clients/' + self.$route.params.contact_id, {
									id: self.$route.params.contact_id,
									type_contact: result
								}, function(s){
									if(s != undefined && s > 0){
										$.notify("El contacto fue modificado correctamente.!", "success");
										self.find();
									}
								});
							}
						}
					});
				}
			});
			
		},
		find: function(){
			var self = this;
			FG.api('GET', '/crew_clients/' + self.$route.params.contact_id, {
				join: [
					'contacts',
					'contacts,types_identifications',
					'contacts,geo_departments',
					'contacts,geo_citys',
					'types_contacts',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					self.$root._mpb("show",{value: [0,10],speed: 1});
				}
			});
		},
		delete_row(contact){
			var self = this;
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
						FG.api('DELETE','/crew_clients/' + contact, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								router.go(-1)
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								
								$.notify("Ocurrio un inconveniente al intentar eliminar el contacto!", "error");
							}
						});
					}
				}
			});
		}
	}
});

var PagesAccountsAddressesView = Vue.extend({
	template: '#page-accounts-addresses-view',
	data: function() {
		return {
			posts: [],
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			$(".datatable tbody").html('');
			FG.api('GET', '/clients_addresses', {
				filter: [
					'client,eq,' + self.$route.params.account_id,
				],
				join: [
					'addresses',
					'addresses,geo_citys',
					'addresses,geo_departments',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					$(".datatable tbody").html('');
					r.forEach(function(el){
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.address.display_name + `</td>
								<td>` + el.address.city.name + `</td>
								<td>` + el.address.department.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Dirección" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/accounts/view/` + self.$route.params.account_id + `/addresses/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable").DataTable();
				}
			});
		},
	}
});

var PagesAccountsAddressesSingleView = Vue.extend({
	template: '#page-accounts-addresses-single-view',
	data: function() {
		return {
			post: {
				"id": this.$route.params.address_id,
				"place_id": null,
				"place_rank": null,
				"address_input": null,
				"display_name": null,
				"city": {
					id: 0,
					name: '',
					department: 0,
				},
				"department": {
					id: 0,
					name: ''
				},
				"lat": null,
				"lon": null,
				"completo": null,
			},
			map: null,
			popup: null,
			currentPolygon: null,
			currentMarker: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });
	},
	mounted: function () {
		var self = this;
		self.rederMap();
	},
	methods: {
		rederMap(){
				var self = this;
				
				/*
				var jvm_usm = new jvm.WorldMap({container: $('#vector_world_map'),
					map: 'world_mill_en', 
					backgroundColor: '#B3D1FF',
					regionsSelectable: true,
					regionStyle: {selected: {fill: '#33414E'},
									initial: {fill: '#FFFFFF'}},
					onRegionSelected: function(){
						$("#vector_usa_map_value").val(jvm_usm.getSelectedRegions().toString());
					}
				});
				*/
				
				self.map = new L.Map('vector_world_map');
				
				/*
				var openstreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
					maxZoom: 18
				}).addTo(self.map);
				var subscriptionKey = 'tTk1JVEaeNvDkxxnxHm9cYaCvqlOq1u-fXTvyXn2XkA';
				var satellite = L.tileLayer('https://atlas.microsoft.com/map/imagery/png?api-version=1&style=satellite&tileSize=256&zoom={z}&x={x}&y={y}&subscription-key=' + subscriptionKey, {
					attribution: '© ' + new Date().getFullYear() + ' Microsoft, © ' + new Date().getFullYear() + ' DigitalGlobe',
					tileSize: 256,
					maxZoom: 18
				}).addTo(self.map);
				var CartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
				 }).addTo(self.map);
				 */
				 
				var satelliteGoogleHybrid = L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {
					attribution: '&copy; ',
					maxZoom: 20
				 }).addTo(self.map);
				 
				var layerControl = L.control.layers({
					// 'OpenStreetMap': openstreet,
					// 'CartoDB': CartoDB,
					// 'Mapa Satelite': satellite,
					'Hibrido': satelliteGoogleHybrid,
				}).addTo(self.map);
				self.map.attributionControl.setPrefix('');
				
				var colombia = new L.LatLng(2.8894434,-73.783892); 
				self.map.setView(colombia, 5);
				
				self.popup = L.popup();
				self.map.on('click', self.onMapClick);
			self.find();
		},
		onMapClick: function(e){
				var self = this;
				var parametros = {
					'lat': e.latlng.lat,
					'lon': e.latlng.lng,
					'format': 'jsonv2',
					'addressdetails': 1,
					'namedetails': 1,
					'accept-language': 'es',
					//'polygon': 1,
					'limit': 50,
				};
				
				aPiMap.get('/reverse', {
					params: parametros
				})
				.then(function (r) {
					info = r.data;
					
					searchTxT = '';
					if(info.address.street != undefined){ searchTxT += info.address.street + ' '; }
					if(info.address.road != undefined){ searchTxT += info.address.road + ' '; }
					if(info.address.suburb != undefined){ searchTxT += info.address.suburb + ' '; }
					
					self.geo_search.street = searchTxT;
					
					self.address_search();
					
					
					self.popup
						.setLatLng(e.latlng)
						// .setContent(info.display_name + "(" + e.latlng.toString() + ")")
						.setContent(info.display_name)
						.openOn(self.map);
				})
				.catch(function (er) {
					console.log(er);
				});
			},
		find: function(){
			var self = this;
			FG.api('GET', '/clients_addresses/' + self.$route.params.address_id, {
				join: [
					'addresses',
					'addresses,geo_citys',
					'addresses,geo_departments',
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					d = a.address;
					self.post = a.address;
					d.completo = JSON.parse(d.completo);
					if(d.place_rank > 18){ d.place_rank = 18; }
					
					var LatLng = new L.LatLng(d.lat, d.lon); 
					self.map.setView(LatLng, (Number(d.place_rank)-2));
					
					var greenIcon = L.icon({
						iconUrl: 'https://mv.dataservix.com/admin/global/images/icons/leaf-green.png',
						shadowUrl: 'https://mv.dataservix.com/admin/global/images/icons/leaf-shadow.png',

						iconSize:     [19, 47.5], // tamaño del icono
						shadowSize:   [25, 32], // tamaño de la sombra
						iconAnchor:   [11, 47], // Punto del icono que corresponderá a la ubicación del marcador.
						shadowAnchor: [2, 31], // lo mismo para la sombra
						popupAnchor:  [-1.5, -38] // Punto desde el que se abrirá la ventana emergente en relación con el icono.
					});
					
					self.currentMarker = new L.Marker(LatLng, {icon: greenIcon});
					self.map.addLayer(self.currentMarker);
					self.currentMarker.bindPopup(d.display_name);
					
					var polygonPoints = [];
					d.completo.polygonpoints.forEach(function(a){
						polygonPoints.push(new L.LatLng(a[1], a[0]))
					});
					
					self.currentPolygon = new L.Polygon(polygonPoints);
					self.map.addLayer(new L.Polygon(polygonPoints));
					
				}
			});
		},
	}
});

var PagesAccountsRequestsView = Vue.extend({
	template: '#page-accounts-requests-view',
	data: function() {
		return {
			options: {
			},
			post: {
				"id": this.$route.params.request_id,
			}
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/requests', {
				join: [
					'status_requests',
					'contacts',
				]
			}, function(r){
				if(r[0] != undefined && r[0].id > 0){
					$(".datatable tbody").html('');
					r.forEach(function(el){
						el.addresses = JSON.parse(el.addresses);
						
												
						rows = '';
						el.addresses.forEach(function(t){
							services = '';
							t.services.forEach(function(p){
								services += `
									<li>
										<a>` + p.name + `</a>
										<ul>
											<li><a>` + p.repeat.name + `</a></li>
										</ul>
									</li>
								`;
								
							});

							rows += `
								<li>
									<a><b>` + t.display_name + ', ' + t.city.name + ', ' + t.department.name + `</b></a>
									<ul>` + services + `</ul>
								</li>
							`;
						});
						
						$(".datatable tbody").append(`
							<tr>
								<td>` + self.$root.zfill(el.id, 5) + `</td>
								<td>` + el.status.name + `</td>
								<td>` + el.contact.first_name + ` ` + el.contact.second_name + `</td>
								<td><ul>` + rows + `</ul></td>
								<td>` + el.request_notes + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Solicitud" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/accounts/view/` + self.$route.params.account_id + `/requests/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable").DataTable();
					
					self.$root._mpb("show",{value: [0,100],speed: 0});
				}
			});
		},
	}
});

var PagesAccountsRequestsSingleView = Vue.extend({
	template: '#page-accounts-requests-single-view',
	data: function() {
		return {
			options: {
				status_requests: []
			},
			post: {
				"id": this.$route.params.request_id,
				"status": 0,
				"client": this.$route.params.account_id,
				"contact": 0,
				"addresses": [],
				"request_notes": "",
				"requests_activity": []
			}
		};
	},
	created: function () {
		var self = this;
		
	},
	beforeMount() {
		var self = this;
	},
	mounted() {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });
		self.load_options_selects();
	},
	methods: {
		load_options_selects(){
			var self = this;
			FG.api('GET', '/status_requests', {
			}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					self.options.status_requests = a;
				}
				self.find();
			});
			
		},
		find(){
			var self = this;
			FG.api('GET', '/requests/' + self.$route.params.request_id, {
				filter: [
					'client,eq,' + self.$route.params.account_id
				],
				join: [
					'status_requests',
					'contacts',
					'requests_activity',
					'quotations',
					'quotations,status_quotations',
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					a.addresses = JSON.parse(a.addresses);
					self.post = a;
					self.$root._mpb("show", { value: [0, 100], speed: 1 });
				}
			});
		},
		changeStatusRequest(){
			var self = this;
			FG.api('GET', '/requests/' + self.$route.params.request_id, {
				client: self.$route.params.account_id,
			}, function (a) {
				if(a != undefined && a.id > 0){
					if(a.status != self.post.status.id){
						FG.api('PUT', '/requests/' + self.$route.params.request_id, {
							id: self.$route.params.request_id,
							client: self.$route.params.account_id,
							status: self.post.status.id
						}, function(s){
							if(s != undefined && s > 0){
								FG.api('POST', '/requests_activity', {
									request: self.$route.params.request_id,
									comment: 'Se cambio el estado de la solicitud por ' + self.post.status.name
								}, function (c) {
									$.notify("La solicitud fue actualizada de manera correctamenta.!", "success");
									self.find()
									return false;
								});
							}else{
								$.notify('Ocurrio un error intenta nuevamente, si el problema persiste contacta con el equipo de Monteverde LTDA.', 'error');
								return false;
							}
						});
					}else{
						$.notify('La solucitud ya se encuentra en este Estado.', 'warning');
					}
				}
			});
				
			
		},
	}
});

var PagesAccountsRequestsQuotationsSingleView = Vue.extend({
	template: '#page-accounts-requests-quotations-single-view',
	data: function() {
		return {
			options: {
				status_requests: []
			},
			post: 
			{
			"id": 0,
			"client": {
				"id": 0,
				"type": 0,
				"identification_type": 0,
				"identification_number": "",
				"names": "",
				"address_principal": "",
				"address_principal_department": {
					"id": 0,
					"code": "",
					"name": ""
				},
				"address_principal_city": {
					"id": 0,
					"name": "",
					"department": 0
				},
				"address_invoices": "",
				"address_invoices_department": {
					"id": 0,
					"code": "",
					"name": ""
				},
				"address_invoices_city": {
					"id": 0,
					"name": "",
					"department": 0
				},
				"represent_legal": 3,
				"contact": 2,
				"audit_enabled": 0
			},
			"request": {
				"id": 0,
				"status": 0,
				"client": 0,
				"contact": {
					"id": 0,
					"identification_type": 0,
					"identification_number": "",
					"first_name": "",
					"second_name": "",
					"surname": "",
					"second_surname": "",
					"birthdaydate": null,
					"phone": "",
					"phone_mobile": "",
					"mail": "",
					"department": {
						"id": 0,
						"name": ""
					},
					"city": {
						"id": 0,
						"name": "",
						"department": 0
					},
					"address": ""
				},
				"addresses": [],
				"request_notes": ""
			},
			"values": [],
			"status": {
				"id": 0,
				"name": "",
				"request_status_continue": 0
			},
			"created": "",
			"updated": "",
			"validity": 0,
			"accept": null
			},
		};
	},
	created: function () {
		var self = this;
		
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });
		self.find();
	},
	methods: {
		find(){
			var self = this;
			FG.api('GET', '/quotations/' + self.$route.params.quotation_id, {
				filter: [
					'client,eq,' + self.$route.params.account_id,
					'request,eq,' + self.$route.params.request_id
				],
				join: [
					'clients',
					'clients,geo_departments',
					'clients,geo_citys',
					'requests',
					'requests,contacts',
					'requests,contacts,geo_departments',
					'requests,contacts,geo_citys',
					'status_quotations',
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					a.values = JSON.parse(a.values);
					a.request.addresses = JSON.parse(a.request.addresses);
					self.post = a;
					self.$root._mpb("show", { value: [0, 100], speed: 1 });
				}
			});
		},
	}
});

var PagesAccountsRequestsQuotationsAdd = Vue.extend({
	template: '#page-accounts-requests-quotations-add',
	data: function() {
		return {
			options: {
				status_requests: []
			},
			post: {
				"id": this.$route.params.request_id,
				"status": 0,
				"client": this.$route.params.account_id,
				"contact": 0,
				"addresses": [],
				"request_notes": "",
				"requests_activity": []
			}
		};
	},
	created: function () {
		var self = this;
		
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });
		self.load_options_selects();
	},
	methods: {
		load_options_selects(){
			var self = this;
			FG.api('GET', '/status_requests', {
			}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					self.options.status_requests = a;
				}
				self.find();
			});
			
		},
		find(){
			var self = this;
			FG.api('GET', '/requests/' + self.$route.params.request_id, {
				filter: [
					'client,eq,' + self.$route.params.account_id
				],
				join: [
					'status_requests',
					'contacts',
					'requests_activity',
					'quotations',
					'quotations,status_quotations',
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					a.addresses = JSON.parse(a.addresses);
					self.post = a;
					self.$root._mpb("show", { value: [0, 100], speed: 1 });
				}
			});
		},
		changeStatusRequest(){
			var self = this;
			FG.api('GET', '/requests/' + self.$route.params.request_id, {
				client: self.$route.params.account_id,
			}, function (a) {
				if(a != undefined && a.id > 0){
					if(a.status != self.post.status.id){
						FG.api('PUT', '/requests/' + self.$route.params.request_id, {
							id: self.$route.params.request_id,
							client: self.$route.params.account_id,
							status: self.post.status.id
						}, function(s){
							if(s != undefined && s > 0){
								FG.api('POST', '/requests_activity', {
									request: self.$route.params.request_id,
									comment: 'Se cambio el estado de la solicitud por ' + self.post.status.name
								}, function (c) {
									$.notify("La solicitud fue actualizada de manera correctamenta.!", "success");
									self.find()
									return false;
								});
							}else{
								$.notify('Ocurrio un error intenta nuevamente, si el problema persiste contacta con el equipo de Monteverde LTDA.', 'error');
								return false;
							}
						});
					}else{
						$.notify('La solucitud ya se encuentra en este Estado.', 'warning');
					}
				}
			});
				
			
		},
	}
});

var PagesAccountsRequestsSingleCalendarAdd = Vue.extend({
	template: '#page-accounts-requests-single-calendar-add',
	data: function() {
		return {
			post: {
				title: '',
				all_day: false,
				start: '',
				end: '',
				type: 0,
				request: 0,
			},
			posts: [],
			jsonData: [
				{
				 "id": 1,
				 "description": "group tasks 1",
				 "start": "2016-12-01",
				 "end": "2016-12-15",
				 "calculatePercent": false,
				 "color": "#004d00",
				 "tasks": [
					/*
					{
					   "id": 2,
					   "description": "group tasks 2",
					   "start": "2016-12-03",
					   "end": "2016-12-10",
					   "calculatePercent": true,
					   "tasks": [{
							 "id": 1,
							 "description": "Task 1",
							 "start": "2016-12-03",
							 "end": "2016-12-07",
							 "resources": ["person A", "person B"],
							 "percent": 50
						  }
					   ],
					}
					*/
				 ]
			  }
			],
			calendar: {
				config: {
					showResources: true, //boolean - show/hide column resource
					showStartDate: true, //boolean - show/hide column date start
					showEndDate: true, //boolean - show/hide column date end
					title: { //change column titles
						task: "Titulo", // column task title
						start: "F. Inicio", // column date start title
						end: "F. Termino", // column date end title
						resources: "Recursos", // column resource titlte
						percent: "Porcentaje (%)" // column percent title
					}
				}
			},
			gcGantt: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });		
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 100], speed: 1 });
		self.find();
	},
	methods: {
		load_calendar(){
			var self = this;
			self.gcGantt = new GCGantt('gc-gantt', self.jsonData, self.calendar.config);
		},
		find(){
			var self = this;
			self.load_calendar();
			
			FG.api('GET', '/crew_technical_visits', {
				join: [ 'employees', ]
			}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					console.log(a);
				}
			});
			// var gcGantt = new GCGantt('gc-gantt', self.jsonData, {});
			/*
			
			gcGantt.onTaskNameClick = function (id, group) {
				if (group) {
					alert("Clicked on name of group name ID: " + id);
				} else {
					alert("Clicked on name of task name ID: " + id);
				}
			}
			
			gcGantt.onTaskClick = function (id, group) {
				if (group) {
					alert("Clicked on group ID: " + id);
				} else {
					alert("Clicked on task ID: " + id);
				}
			}

			*/
		},
	}
});

var PagesAccountsRequestsSingleCalendarView = Vue.extend({
	template: '#page-accounts-requests-single-calendar-view',
	data: function() {
		return {
			posts: []
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });		
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 100], speed: 1 });
		self.find();
	},
	methods: {
		find(){
			var self = this;
			FG.api('GET', '/crew_technical_visits', {
				join: [ 'employees', ]
			}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					console.log(a);
				}
			});
		},
	}
});

var PagesAccountsCalendarView = Vue.extend({
	template: '#page-accounts-calendar-view',
	data: function() {
		return {
			calendar: null,
			seletedEvent: {
				id: 0,
				title: "",
				all_day: false,
				start: "",
				end: "",
				type: {
					id: 0,
					name: "",
					colorClass: ""
				}
			},
			posts: [],
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		prepare_external_list(){
			var self = this;
			$('#external-events .external-event').each(function() {
					var eventObject = {title: $.trim($(this).text())};

					$(this).data('eventObject', eventObject);
					$(this).draggable({
							zIndex: 999,
							revert: true,
							revertDuration: 0
					});
			});                    
			
		},
		load_calendar(){
			var self = this;
			if($("#calendar").length > 0){
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                self.prepare_external_list();

                self.calendar = $('#calendar').fullCalendar({
					eventClick: function(event, element) {
						if(event.id != undefined && event.id > 0){
							FG.api('GET', '/calendar/' + event.id, {
								join: [ 'types_calendars', ]
							}, function(a){
								if(a != undefined && a.id > 0){
									self.seletedEvent = a;
								}
							});
						}
						// self.calendar.fullCalendar('updateEvent', event);
					},
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    editable: false,
					//events: ,
                    // eventSources: {
					// 	url: "/assets/ajax_fullcalendar.php"
					// },
					// eventSources: self.posts,
					events: self.posts,
                    droppable: true,
                    selectable: false,
                    selectHelper: true,
					select: function(start, end, allDay) {
                        var title = prompt('Event Title:');
                        if (title) {
                            self.calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay
                            },
                            true
                            );
                        }
                        self.calendar.fullCalendar('unselect');
                    },
                    drop: function(date, allDay) {
                        var originalEventObject = $(this).data('eventObject');
                        var copiedEventObject = $.extend({}, originalEventObject);
                        copiedEventObject.start = date;
                        copiedEventObject.allDay = allDay;
                        self.calendar.fullCalendar('renderEvent', copiedEventObject, true);
                        if ($('#drop-remove').is(':checked')) {
                            $(this).remove();
                        }

                    }
                });
                
                $("#new-event").on("click",function(){
                    var et = $("#new-event-text").val();
                    if(et != ''){
                        $("#external-events").prepend('<a class="list-group-item external-event">'+et+'</a>');
                        self.prepare_external_list();
                    }
                });
                
            }
		},
		find: function(){
			var self = this;
			self.posts = [];
			
			FG.api('GET', '/calendar_clients', {
				join: [
					'calendar',
					'calendar,types_calendars'
				]
			}, function(r){
				if(r[0] != undefined && r[0].id > 0){
					r.forEach(function(x){
						c = x.calendar;
						console.log(c);
						var d_s = new Date(c.start.replace(/-/g,"/"));
						var d_e = new Date(c.end.replace(/-/g,"/"));
						
						formatted_date_start =  d_s.getFullYear() + "-" + (d_s.getMonth() + 1) + "-" + d_s.getDate();
						formatted_date_end =  d_e.getFullYear() + "-" + (d_e.getMonth() + 1) + "-" + d_e.getDate();
						
						self.posts.push({
							id: c.id,
							allDay: Boolean(c.all_day),
							title: c.title,
							start: c.start,
							end: c.end,
							className: 'blue',
							// url: 'https://www.facebook.com/sweetsamshopco/'
						});
					});
					self.$root._mpb("show",{value: [0,100],speed: 0});
					self.load_calendar();
				}
			});
		},
	}
});

/* END ACCOUNTS */

/* CONTACTS */
var PagesContactsList = Vue.extend({
	template: '#page-contacts-list',
	data: function() {
		return {
			posts: [],
			DataTable: null,
		};
	},
	created: function () {
		var self = this;
	},
	beforeMount: function () {
		var self = this;
		self.find();
		
	},
	mounted: function () {
		var self = this;
	
		
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/contacts', {
				join: [
					'types_identifications'
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					// self.posts = r;
					
					$(".datatable tbody").html('');
					r.forEach(function(el){
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.identification_type.name + `</td>
								<td>` + el.identification_number + `</td>
								<td>` + el.first_name + ` ` + el.second_name + `</td>
								<td>` + el.surname + ` ` + el.second_surname + `</td>
								<td>` + el.phone + `</td>
								<td>` + el.phone_mobile + `</td>
								<td>` + el.mail + `</td>
								<td>` + el.address + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Usuario" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/contacts/view/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable").DataTable();
				}
				
			});
		},
		delete_row(contact){
			var self = this;
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
						FG.api('DELETE','/contacts/' + contact, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								self.find();
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								
								$.notify("Ocurrio un inconveniente al intentar eliminar el contacto!", "error");
							}
						});
					}
				}
			});
		}
	}
});

var PagesContactsListAccounts = Vue.extend({
	template: '#page-contacts-list-accounts',
	data: function() {
		return {
			options: {
				contacts: [],
			},
			posts: [],
		};
	},
	created: function () {
		var self = this;
		self.load_options_selects();
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		load_options_selects(){
			var self = this;
			self.options.contacts.push({
				text: 'Seleccione un a opción...',
				value: '',
			});
			FG.api('GET', '/contacts', {}, function(r){ if(r.length > 0 && r[0].id > 0){
				r.forEach(function(elm){
					self.options.contacts.push({
						text: elm.identification_number + ' - ' + elm.first_name + ' ' + elm.second_name + ' ' + elm.surname + ' ' + elm.second_surname,
						value: elm.id,
					});
				});
			} });
		},
		getClassActiveIndex(index){
			if(index === 0){ return 'active'; } 
			else { return 'e'; }
		},
		getClassActivePanelIndex(index){
			if(index === 0){
				return 'tab-pane active';
			}else{
				return 'tab-pane';
			}
		},
		addContactToAccount: function(account){
			var self = this;
			bootbox.prompt({
				title: "Seleccione el contacto...",
				inputType: 'select',
				inputOptions: self.options.contacts,
				callback: function (rs) {
					if(rs != null && rs > 0){
						FG.api('POST', '/crew_clients', {
							client: account,
							contact: rs
						}, function (b) {
							if(Number(b) > 0)
							{
								$.notify("El contacto fue creado correctamente.!", "success");
								self.find();
							}else{
								$.notify("Ocurrio un error al intentar crear el contacto.", "error");
							}
						});
					}
				}
			});
		},
		find: function(){
			var self = this;
			
			FG.api('GET', '/clients', {
				join: [
					'crew_clients',
					'crew_clients,contacts',
					'types_identifications',
					'crew_clients,contacts,types_identifications',
					'crew_clients,types_contacts'
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.posts = r;
				}
			});
			
		},
		delete_row(contact){
			var self = this;
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
						FG.api('DELETE','/crew_clients/' + contact, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								self.find();
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								
								$.notify("Ocurrio un inconveniente al intentar eliminar el contacto!", "error");
							}
						});
					}
				}
			});
		}
	}
});

var PagesContactsListAccountsAddContactToAccount = Vue.extend({
	template: '#page-contacts-list-accounts-add-contact-to-account',
	data: function() {
		return {
			options: {
				contacts: [],
				types_contacts: [],
			},
			post: {
				client: this.$route.params.account_id,
				contact: 0,
				type_contact: 0
			},
			jvalidate: null
		};
	},
	created: function () {
		var self = this;
		self.load_options_selects();
	},
	mounted: function () {
		var self = this;
		self.load_plugins_this();
	},
	methods: {
		load_options_selects(){
			var self = this;
			
			FG.api('GET', '/contacts', {}, function(r){ if(r.length > 0 && r[0].id > 0){
				r.forEach(function(el){
					$(".select[data-v-model='contact']").append('<option value="' + el.id + '">' + 
					el.first_name + ' ' +
					el.second_name + ' ' +
					el.surname + ' ' +
					el.second_surname 
					+ '</option>');
				});
				$(".select[data-v-model='contact']").selectpicker('refresh');
				
				FG.api('GET', '/types_contacts', {}, function(r){ if(r.length > 0 && r[0].id > 0){
					r.forEach(function(elm){
						$(".select[data-v-model='type_contact']").append('<option value="' + elm.id + '">' + elm.name + '</option>');
					});
					$(".select[data-v-model='type_contact']").selectpicker('refresh');
				} });
			} });
		},
		addContactToAccount: function(account){
			var self = this;
			bootbox.prompt({
				title: "Seleccione el contacto...",
				inputType: 'select',
				inputOptions: self.options.contacts,
				callback: function (rs) {
					if(rs != null && rs > 0){
						FG.api('POST', '/crew_clients', {
							client: account,
							contact: rs
						}, function (b) {
							if(Number(b) > 0)
							{
								$.notify("El contacto fue creado correctamente.!", "success");
								
							}else{
								$.notify("Ocurrio un error al intentar crear el contacto.", "error");
							}
						});
					}
				}
			});
		},
		load_plugins_this(){
			var self = this;
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).data("v-model") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
							}
						}
					}
                });
			}
			
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				//wrapper: "div.alert.alert-danger",
				wrapper: "div.item",
				//errorContainer: ".form-group",
                ignore: [],
                rules: {
					"client": {
						required: true
					},
					"contact": {
						required: true
					},
					"type_contact": {
						required: true
					},
				},
				messages: {
					"client": {
						required: "El cliente no fue detectado, actualice la página e intente nuevamente."
					},
					"contact": {
						required: "Seleccione el contacto que va desea añadir."
					},
					"type_contact": {
						required: "Seleccione el tipo de relación que tiene el contacto con la cuenta o con el titular."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							newContact[k] = self.post[k];
						}
					}
					
					FG.api('GET', '/crew_clients', {
						filter: [
							'client,eq,' + self.$route.params.account_id,
							'contact,eq,' + self.post.contact
						]
					}, function (a) {
						if(a.length > 0){
							$.notify("El contacto ya existe!", "error");
						}else{
							FG.api('POST', '/crew_clients', self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("El contacto fue creado correctamente.!", "success");
								}
							});
						}
					});
				},
				onsubmit: true
			});
		},
	}
});

var PagesContactsAdd = Vue.extend({
	template: '#page-contacts-add',
	data: function() {
		return {
			options: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				identification_type: null,
				identification_number: null,
				first_name: null,
				second_name: null,
				surname: null,
				second_surname: null,
				birthdaydate: null,
				phone: null,
				phone_mobile: null,
				mail: null,
				department: null,
				city: null,
				address: null
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.load_options_selects();
	},
	methods: {
		load_options_selects(){
			var self = this;
			FG.api('GET', '/types_identifications', {}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.types_identifications = r;
					r.forEach(function(el){
						$(".select[data-v-model='identification_type']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					$(".select[data-v-model='identification_type']").selectpicker('refresh');
				}
				self.$root._mpb("show",{value: [0,25],speed: 0});
				FG.api('GET', '/geo_departments', {}, function(r){
					if(r.length > 0 && r[0].id > 0){
						self.options.geo_departments = r;
						
						r.forEach(function(el){
							$(".select[data-v-model='department']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						
						$(".select[data-v-model='department']").selectpicker('refresh');
					}
					self.$root._mpb("show",{value: [0,50],speed: 0});
					self.load_plugins_this();
				});
			});
		},
		load_citys(){
			var self = this;
			self.options.geo_departments = [];
			$(".select[data-v-model='city']")
				.find('option')
				.remove()
				.end()
				.append('<option value=""></option>');
			self.$root._mpb("show",{value: [0,0],speed: 0});
			FG.api('GET', '/geo_citys', {
				filter: [
					'department,eq,' + self.post.department
				]
			}, function(r){
				self.$root._mpb("show",{value: [0,50],speed: 0});
				if(r.length > 0 && r[0].id > 0){
					self.options.geo_citys = r;					
					r.forEach(function(el){
						$(".select[data-v-model='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});					
					$(".select[data-v-model='city']").selectpicker('refresh');
					self.$root._mpb("show",{value: [0,100],speed: 1});
				}
			});
		},
		load_plugins_this(){
			var self = this;
			//$("input.mask_date").mask('9999-99-99');
            // $("input.mask_phone_ext").mask('999 9999? x99999');
            // $("input.mask_phone_mobile").mask('999 999 9999');
				
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							
							if($(this).data("v-model") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
								if(k=='department'){
									self.load_citys();
								}
							}
						}
					}
                });
			}
			
			self.$root._mpb("show",{value: [0,75],speed: 0});
			
			$(".datepicker").datepicker({format: 'yyyy-mm-dd'});
			
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				//wrapper: "div.alert.alert-danger",
				wrapper: "div.item",
				//errorContainer: ".form-group",
                ignore: [],
                rules: {
					"identification_type": {
						required: true
					},
					"identification_number": {
						required: true
					},
					"first_name": {
						required: true
					},
					"second_name": { required: false },
					"surname": {
						required: true
					},
					"second_surname": { required: false },
					"birthdaydate": { required: false },
					"phone": {
						required: true
					},
					"phone_mobile": { required: false },
					"mail": { required: false },
					"department": {
						required: true
					},
					"city": {
						required: true
					},
					"address": { required: false }
				},
				messages: {
					"identification_type": {
						required: "Selecciona el tipo de identificacion que tiene este contacto."
					},
					"identification_number": {
						required: "Ingresa el numerp de la identificacion que tiene este contacto."
					},
					"first_name": {
						required: "Escribe el primer nombre del contacto."
					},
					"surname": {
						required: "Escribe el primer apellido del contacto."
					},
					"phone": {
						required: "Escribe el el numero de contacto del contacto."
					},
					"department": {
						required: "Selecciona el departamento donde se localiza este contacto."
					},
					"city": {
						required: "Selecciona la ciudad donde se localiza este contacto."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							newContact[k] = self.post[k];
						}
					}
					
					FG.api('GET', '/contacts', {
						filter: [
							'identification_number,eq,' + self.post.identification_number,
							'identification_type,eq,' + self.post.identification_type
						]
					}, function (a) {
						if(a.length > 0){
							$.notify("El contacto ya existe!", "error");
						}else{
							FG.api('POST', '/contacts', self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("El contacto fue creado correctamente.!", "success");
									router.push({
										name: 'page-contacts-edit',
										params: {
											contact_id: b
										}
									});
								}
							});
						}
					});
				},
				onsubmit: true
			});
			
			self.$root._mpb("show",{value: [0,100],speed: 0});
		}
	}
});

var PagesContactsView = Vue.extend({
	template: '#page-contacts-view',
	data: function() {
		return {
			options: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				id: this.$route.params.contact_id,
				identification_type: {
					id: null,
					name: null
				},
				identification_number: null,
				first_name: null,
				second_name: '---',
				surname: null,
				second_surname: '---',
				birthdaydate: '0000-00-00',
				phone: null,
				phone_mobile: null,
				mail: 'contacto@sincorreo.com',
				department: {
					id: null,
					name: null
				},
				city: {
					id: null,
					department: null,
					name: null
				},
				address: '---'
			},
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/contacts/' + self.$route.params.contact_id, {
				join: [
					'types_identifications',
					'geo_departments',
					'geo_citys',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					self.$root._mpb("show",{value: [0,10],speed: 1});
				}
			});
		},
	}
});

var PagesContactsEdit = Vue.extend({
	template: '#page-contacts-edit',
	data: function() {
		return {
			options: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				id: this.$route.params.contact_id,
				identification_type: null,
				identification_number: null,
				first_name: null,
				second_name: null,
				surname: null,
				second_surname: null,
				birthdaydate: null,
				phone: null,
				phone_mobile: null,
				mail: null,
				department: null,
				city: null,
				address: null
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,50],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.load_plugins_this();
		self.load_options_selects();
		
		
		
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/contacts/' + self.$route.params.contact_id, {
				join: []
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					
					$(".select[data-v-model='city']")
						.val(self.post.city)
						.change();
					$(".select[data-v-model='department']")
						.val(self.post.department)
						.change();
					$(".select[data-v-model='identification_type']")
						.val(self.post.identification_type)
						.change();
					
					self.$root._mpb("show",{value: [0,100],speed: 0});
				}
			});
		},
		load_options_selects(){
			var self = this;
			FG.api('GET', '/geo_citys', {
				filter: [
					//'department,eq,' + self.post.city
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.geo_departments = r;
					r.forEach(function(el){
						$(".select[data-v-model='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					$(".select[data-v-model='city']").selectpicker('refresh');
				}
				self.$root._mpb("show",{value: [0,25],speed: 0});
				FG.api('GET', '/geo_departments', {}, function(r){
					if(r.length > 0 && r[0].id > 0){
						self.options.geo_departments = r;
						r.forEach(function(el){
							$(".select[data-v-model='department']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='department']").selectpicker('refresh');
					}
					self.$root._mpb("show",{value: [0,50],speed: 0});
					FG.api('GET', '/types_identifications', {}, function(r){
						if(r.length > 0 && r[0].id > 0){
							self.options.types_identifications = r;
							r.forEach(function(el){
								$(".select[data-v-model='identification_type']").append('<option value="'+el.id+'">'+el.name+'</option>');
							});
							$(".select[data-v-model='identification_type']").selectpicker('refresh');
							self.$root._mpb("show",{value: [0,75],speed: 0});
							self.find();
						}
					});
				});
			});
			
		},
		load_citys(){
			var self = this;
			self.options.geo_departments = [];
			$(".select[data-v-model='city']")
				.find('option')
				.remove()
				.end()
				.append('<option value=""></option>');
			FG.api('GET', '/geo_citys', {
				filter: [
					'department,eq,' + self.post.department
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.geo_citys = r;					
					r.forEach(function(el){
						$(".select[data-v-model='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});					
					$(".select[data-v-model='city']").selectpicker('refresh');
				}
			});
		},
		load_plugins_this(){
			var self = this;
			//$("input.mask_date").mask('9999-99-99');
            //$("input.mask_phone_ext").mask('999 9999? x99999');
            //$("input.mask_phone_mobile").mask('999 999 9999');
				
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).data("v-model") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
								if(k=='department'){
									self.load_citys();
								}
							}
						}
					}
                });
			}
			
			$(".datepicker").datepicker({format: 'yyyy-mm-dd'});
			
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				//wrapper: "div.alert.alert-danger",
				wrapper: "div.item",
				//errorContainer: ".form-group",
                ignore: [],
                rules: {
					"identification_type": {
						required: true
					},
					"identification_number": {
						required: true
					},
					"first_name": {
						required: true
					},
					"second_name": { required: false },
					"surname": {
						required: true
					},
					"second_surname": { required: false },
					"birthdaydate": { required: false },
					"phone": {
						required: true
					},
					"phone_mobile": { required: false },
					"mail": { required: false },
					"department": {
						required: true
					},
					"city": {
						required: true
					},
					"address": { required: false }
				},
				messages: {
					"identification_type": {
						required: "Selecciona el tipo de identificacion que tiene este contacto."
					},
					"identification_number": {
						required: "Ingresa el numerp de la identificacion que tiene este contacto."
					},
					"first_name": {
						required: "Escribe el primer nombre del contacto."
					},
					"surname": {
						required: "Escribe el primer apellido del contacto."
					},
					"phone": {
						required: "Escribe el el numero de contacto del contacto."
					},
					"department": {
						required: "Selecciona el departamento donde se localiza este contacto."
					},
					"city": {
						required: "Selecciona la ciudad donde se localiza este contacto."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							newContact[k] = self.post[k];
						}
					}
					
					FG.api('GET', '/contacts', {
						filter: [
							'identification_number,eq,' + self.post.identification_number,
							'identification_type,eq,' + self.post.identification_type
						]
					}, function (a) {
						if(a.length > 0){
							FG.api('PUT', '/contacts/'+self.$route.params.contact_id, self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("El contacto fue modificado correctamente.!", "success");
									self.find();
									/*
									router.push({
										name: 'page-contacts-list'
									});
									*/
								}
							});
						}else{
							$.notify("El contacto no existe!", "error");
						}
					});
				},
				onsubmit: true
			});
		},
		delete_row(account){
			var self = this;
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
						FG.api('DELETE','/clients/' + account, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								self.find();
							}else{
								$.notify("Ocurrio un inconveniente al intentar eliminar la cuenbta!", "error");
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								
							}
						});
					}
				}
			});
		}
	}
});
/* END CONTACTS */

/* USERS */
var PagesUsersList = Vue.extend({
	template: '#page-users-list',
	data: function() {
		return {
			posts: [],
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/users', {
				join: [
					'permissions',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					$(".datatable tbody").html('');
					r.forEach(function(el){
						el.permissions.data = JSON.parse(el.permissions.data);
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.username + `</td>
								<td>` + el.names + `</td>
								<td>` + el.surname + `</td>
								<td>` + el.second_surname + `</td>
								<td>` + el.phone + `</td>
								<td>` + el.mobile + `</td>
								<td>` + el.mail + `</td>
								<td>` + el.permissions.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Usuario" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/users/view/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable").DataTable();
				}
			});
		},
		delete_row(account){
			var self = this;
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
						FG.api('DELETE','/users/' + account, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								self.find();
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								
								$.notify("Ocurrio un inconveniente al intentar eliminar la cuenbta!", "error");
							}
						});
					}
				}
			});
		}
	}
});

var PagesUsersEdit = Vue.extend({
	template: '#page-users-edit',
	data: function() {
		return {
			options: {
				permissions: [],
				pictures: [],
			},
			post: {
				id: this.$route.params.user_id,
				username: null,
				names: null,
				surname: null,
				second_surname: null,
				phone: null,
				mobile: null,
				mail: null,
				password: null,
				avatar: null,
				permissions: 0,
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 1});
	},
	mounted: function () {
		var self = this;
		self.load_plugins_this();
		self.load_options_selects();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/users/' + self.$route.params.user_id, {
				join: []
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					
					$(".select[data-v-model='permissions']")
						.val(self.post.permissions)
						.change();
					$(".select[data-v-model='avatar']")
						.val(self.post.avatar)
						.change();
					
					self.$root._mpb("show",{value: [0,100],speed: 0});
				}
			});
		},
		load_options_selects(){
			var self = this;
			FG.api('GET', '/permissions', {
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.permissions = r;
					r.forEach(function(el){
						$(".select[data-v-model='permissions']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					$(".select[data-v-model='permissions']").selectpicker('refresh');
					
					FG.api('GET', '/pictures', {
					}, function(r){
						if(r.length > 0 && r[0].id > 0){
							self.options.pictures = r;
							r.forEach(function(el){
								$(".select[data-v-model='avatar']").append('<option value="'+el.id+'">' + el.id + ' - ' + el.name + '</option>');
							});
							$(".select[data-v-model='avatar']").selectpicker('refresh');
							self.find();
						}
					});
				}
			});
		},
		load_plugins_this(){
			var self = this;
			//$("input.mask_date").mask('9999-99-99');
            //$("input.mask_phone_ext").mask('999 9999? x99999');
            //$("input.mask_phone_mobile").mask('999 999 9999');
				
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).data("v-model") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
							}
						}
					}
                });
			}
			
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				wrapper: "div.item",
                ignore: [],
                rules: {
					"id": {
						required: true
					},
					"username": {
						required: true
					},
					"names": {
						required: true
					},
					"surname": {
						required: true
					},
					"second_surname": {
						required: false
					},
					"phone": {
						required: false
					},
					"mobile": {
						required: false
					},
					"mail": {
						required: true
					},
					"permissions": {
						required: true
					},
					"password": {
						required: false
					},
				},
				messages: {
					"id": {
						required: "Ocurrio un problema al detectar el id del usuario."
					},
					"username": {
						required: "Ingresa el usuario/login."
					},
					"names": {
						required: "Ingresa el/los nombre(s) real(es) del usuario."
					},
					"surname": {
						required: "Escribe el primer apellido del usuario."
					},
					"mail": {
						required: "Escribe el correo electronico del usuario."
					},
					"permissions": {
						required: "Selecciona el perfil de permisos de este usuario."
					},
					"password": {
						required: "Ingresa la contraseña del usuario."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){ if (typeof self.post[k] !== 'function') { newContact[k] = self.post[k]; } }
					
					FG.api('GET', '/users', {
						filter: [
							'username,eq,' + self.post.username,
						]
					}, function (a) {
						if(a.length > 0){
							FG.api('PUT', '/users/'+self.$route.params.user_id, self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("El usuario fue modificado correctamente.!", "success");
									self.find();
								}
							});
						}else{
							$.notify("El usuario no existe!", "error");
						}
					});
				},
				onsubmit: true
			});
		},
		delete_row(user){
			var self = this;
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
						FG.api('DELETE','/users/' + user, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								router.push({
									name: 'page-users-list'
								});
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								$.notify("Ocurrio un inconveniente al intentar eliminar la cuenbta!", "error");
							}
						});
					}
				}
			});
		}
	}
});

var PagesUsersView = Vue.extend({
	template: '#page-users-view',
	data: function() {
		return {
			options: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				"id": this.$route.params.user_id,
				"username": "",
				"names": "",
				"surname": "",
				"second_surname": "",
				"phone": "",
				"mobile": "",
				"mail": "",
				"permissions": {
					"id": 0,
					"name": "",
					"data": {}
				},
				"password": "",
				"avatar": {
					"id": 0,
					"name": "",
					"size": 0,
					"data": "",
					"type": "",
					"create": ""
				},
				"registered": "",
				"updated": ""
			}
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/users/' + self.$route.params.user_id, {
				join: [
					'permissions',
					'pictures',
				]
			}, function(r){
				
				if(r != undefined && r.id > 0){
					self.post = r;
					self.$root._mpb("show",{value: [0,10],speed: 1});
				}
			});
		},
	}
});

var PagesUsersAdd = Vue.extend({
	template: '#page-users-add',
	data: function() {
		return {
			options: {
				permissions: [],
				pictures: [],
			},
			post: {
				username: null,
				names: null,
				surname: null,
				second_surname: null,
				phone: null,
				mobile: null,
				mail: null,
				password: null,
				avatar: 0,
				permissions: 0,
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 1});
	},
	mounted: function () {
		var self = this;
		self.load_plugins_this();
		self.load_options_selects();
	},
	methods: {
		load_options_selects(){
			var self = this;
			FG.api('GET', '/permissions', {
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.permissions = r;
					r.forEach(function(el){
						$(".select[data-v-model='permissions']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					$(".select[data-v-model='permissions']").selectpicker('refresh');
					self.$root._mpb("show",{value: [0,20],speed: 1});
					
					FG.api('GET', '/pictures', {
					}, function(r){
						self.$root._mpb("show",{value: [0,40],speed: 1});
						if(r.length > 0 && r[0].id > 0){
							self.options.pictures = r;
							r.forEach(function(el){
								$(".select[data-v-model='avatar']").append('<option value="'+el.id+'">' + el.id + ' - ' + el.name + '</option>');
							});
							$(".select[data-v-model='avatar']").selectpicker('refresh');
							self.$root._mpb("show",{value: [0,100],speed: 5});
						}
					});
				}
			});
		},
		load_plugins_this(){
			var self = this;
			//$("input.mask_date").mask('9999-99-99');
            //$("input.mask_phone_ext").mask('999 9999? x99999');
            //$("input.mask_phone_mobile").mask('999 999 9999');
				
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).data("v-model") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
							}
						}
					}
                });
			}
			
			self.$root._mpb("show",{value: [0,100],speed: 1});
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				wrapper: "div.item",
                ignore: [],
                rules: {
					"username": {
						required: true
					},
					"names": {
						required: true
					},
					"surname": {
						required: true
					},
					"second_surname": {
						required: false
					},
					"phone": {
						required: false
					},
					"mobile": {
						required: false
					},
					"mail": {
						required: true
					},
					"permissions": {
						required: true
					},
					"password": {
						required: true
					},
				},
				messages: {
					"username": {
						required: "Ingresa el usuario/login."
					},
					"names": {
						required: "Ingresa el/los nombre(s) real(es) del usuario."
					},
					"surname": {
						required: "Escribe el primer apellido del usuario."
					},
					"mail": {
						required: "Escribe el correo electronico del usuario."
					},
					"permissions": {
						required: "Selecciona el perfil de permisos de este usuario."
					},
					"password": {
						required: "Ingresa la contraseña del usuario."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){ if (typeof self.post[k] !== 'function') { newContact[k] = self.post[k]; } }
					
					
					FG.api('GET', '/users', {
						filter: [
							'username,eq,' + self.post.username,
						]
					}, function (a) {
						if(a.length > 0){
							$.notify("El usuario ya existe!", "error");
						}else{
							FG.api('POST', '/users', self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("El usuario fue creado con éxito.!", "success");
									router.push({
										name: 'page-users-list'
									});
								}
							});
						}
					});
				},
				onsubmit: true
			});
		}
	}
});
/* END USERS */

/* PROFILES */
var PagesProfilesB2BViewById = Vue.extend({
	template: '#pages-profiles-b2b-for-id-view',
	data: function() {
		return {
			post: {
			  "id": this.$route.params.user_id,
			  "username": "",
			  "names": null,
			  "surname": null,
			  "second_surname": null,
			  "phone": null,
			  "mobile": null,
			  "registered": "2019-04-10 14:31:30",
			  "avatar": 1,
			  "mail": "demo@lts.com",
			  "password": "pass1",
			  "permissions": {
				  id: 0,
				  name: ''
			  }
			},
		};
	},
	created: function() {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 1});
		self.load_scripts();
		self.find();
	},
	methods: {
		find(){
			var self = this;
			FG.api('GET', '/users/' + self.$route.params.user_id, {
				join: [
					'permissions',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					self.$root._mpb("show",{value: [0,100],speed: 1});
				}
			});
			
		},
		load_scripts(){
			var self = this;
			document.getElementById('links').onclick = function (event) {
                event = event || window.event;
                var target = event.target || event.srcElement,
                    link = target.src ? target.parentNode : target,
                    options = {index: link, event: event,onclosed: function(){
                        setTimeout(function(){
                            $("body").css("overflow","");
                        },200);                        
                    }},
                    links = this.getElementsByTagName('a');
                blueimp.Gallery(links, options);
            };
		}
	}
});
/* END PROFILES */

/* ADDRESSES */
var PagesAddressesList = Vue.extend({
	template: '#page-addresses-list',
	data: function() {
		return {
			posts: [],
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/addresses', {
				join: [
					'geo_citys',
					'geo_departments',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					$(".datatable tbody").html('');
					r.forEach(function(el){
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.display_name + `</td>
								<td>` + el.city.name + `</td>
								<td>` + el.department.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Dirección" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/addresses/view/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable").DataTable();
				}
			});
		},
	}
});

var PagesAddressesView = Vue.extend({
	template: '#page-addresses-view',
	data: function() {
		return {
			post: {
				"id": this.$route.params.address_id,
				"place_id": null,
				"place_rank": null,
				"address_input": null,
				"display_name": null,
				"city": {
					id: 0,
					name: '',
					department: 0,
				},
				"department": {
					id: 0,
					name: ''
				},
				"lat": null,
				"lon": null,
				"completo": null,
			},
			map: null,
			popup: null,
			currentPolygon: null,
			currentMarker: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });
	},
	mounted: function () {
		var self = this;
		self.rederMap();
	},
	methods: {
		rederMap(){
				var self = this;
				
				/*
				var jvm_usm = new jvm.WorldMap({container: $('#vector_world_map'),
					map: 'world_mill_en', 
					backgroundColor: '#B3D1FF',
					regionsSelectable: true,
					regionStyle: {selected: {fill: '#33414E'},
									initial: {fill: '#FFFFFF'}},
					onRegionSelected: function(){
						$("#vector_usa_map_value").val(jvm_usm.getSelectedRegions().toString());
					}
				});
				*/
				
				self.map = new L.Map('vector_world_map');
				
				var openstreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
					maxZoom: 18
				}).addTo(self.map);
				var subscriptionKey = 'tTk1JVEaeNvDkxxnxHm9cYaCvqlOq1u-fXTvyXn2XkA';
				var satellite = L.tileLayer('https://atlas.microsoft.com/map/imagery/png?api-version=1&style=satellite&tileSize=256&zoom={z}&x={x}&y={y}&subscription-key=' + subscriptionKey, {
					attribution: '© ' + new Date().getFullYear() + ' Microsoft, © ' + new Date().getFullYear() + ' DigitalGlobe',
					tileSize: 256,
					maxZoom: 18
				}).addTo(self.map);
				var CartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
				 }).addTo(self.map);
				 
				var satelliteGoogleHybrid = L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {
					attribution: '&copy; ',
					maxZoom: 20
				 }).addTo(self.map);
				 
				var layerControl = L.control.layers({
					// 'OpenStreetMap': openstreet,
					// 'CartoDB': CartoDB,
					// 'Mapa Satelite': satellite,
					'Hibrido': satelliteGoogleHybrid,
				}).addTo(self.map);
				self.map.attributionControl.setPrefix('');
				
				var colombia = new L.LatLng(2.8894434,-73.783892); 
				self.map.setView(colombia, 5);
				
				self.popup = L.popup();
				self.map.on('click', self.onMapClick);
			self.find();
		},
		onMapClick: function(e){
				var self = this;
				var parametros = {
					'lat': e.latlng.lat,
					'lon': e.latlng.lng,
					'format': 'jsonv2',
					'addressdetails': 1,
					'namedetails': 1,
					'accept-language': 'es',
					//'polygon': 1,
					'limit': 50,
				};
				
				aPiMap.get('/reverse', {
					params: parametros
				})
				.then(function (r) {
					info = r.data;
					
					searchTxT = '';
					if(info.address.street != undefined){ searchTxT += info.address.street + ' '; }
					if(info.address.road != undefined){ searchTxT += info.address.road + ' '; }
					if(info.address.suburb != undefined){ searchTxT += info.address.suburb + ' '; }
					
					self.geo_search.street = searchTxT;
					
					self.address_search();
					
					
					self.popup
						.setLatLng(e.latlng)
						// .setContent(info.display_name + "(" + e.latlng.toString() + ")")
						.setContent(info.display_name)
						.openOn(self.map);
				})
				.catch(function (er) {
					console.log(er);
				});
			},
		find: function(){
			var self = this;
			FG.api('GET', '/addresses/' + self.$route.params.address_id, {
				join: [
					'geo_citys',
					'geo_departments',
				]
			}, function(d){
				
				if(d != undefined && d.id > 0){
					self.post = d;
					d.completo = JSON.parse(d.completo);
					if(d.place_rank > 18){ d.place_rank = 18; }
					
					var LatLng = new L.LatLng(d.lat, d.lon); 
					self.map.setView(LatLng, (Number(d.place_rank)-2));
					
					var greenIcon = L.icon({
						iconUrl: 'https://mv.dataservix.com/admin/global/images/icons/leaf-green.png',
						shadowUrl: 'https://mv.dataservix.com/admin/global/images/icons/leaf-shadow.png',

						iconSize:     [19, 47.5], // tamaño del icono
						shadowSize:   [25, 32], // tamaño de la sombra
						iconAnchor:   [11, 47], // Punto del icono que corresponderá a la ubicación del marcador.
						shadowAnchor: [2, 31], // lo mismo para la sombra
						popupAnchor:  [-1.5, -38] // Punto desde el que se abrirá la ventana emergente en relación con el icono.
					});
					
					self.currentMarker = new L.Marker(LatLng, {icon: greenIcon});
					self.map.addLayer(self.currentMarker);
					self.currentMarker.bindPopup(d.display_name);
					
					var polygonPoints = [];
					d.completo.polygonpoints.forEach(function(a){
						polygonPoints.push(new L.LatLng(a[1], a[0]))
					});
					
					self.currentPolygon = new L.Polygon(polygonPoints);
					self.map.addLayer(self.currentPolygon);
					$("#vector_world_map").focus();
				}
			});
		},
	}
});
/* END ADDRESSES */

/* MEDIA */
var PagesMediaGalleryPictures = Vue.extend({
	template: '#page-media-gallery-pictures',
	data: function() {
		return {
			posts: [],
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		
		/*
		 document.getElementById('links').onclick = function (event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
			var link = target.src ? target.parentNode : target;
			var options = {index: link, event: event,onclosed: function(){
					setTimeout(function(){
						$("body").css("overflow","");
					},200);                        
				}};
			var links = this.getElementsByTagName('a');
			blueimp.Gallery(links, options);
		}
		*/
		
$(document).on('click', '#close-preview', function(){ 
    $('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
        function () {
           $('.image-preview').popover('show');
        }, 
         function () {
           $('.image-preview').popover('hide');
        }
    );    
});

$(function() {
    // Create the close button
    var closebtn = $('<button/>', {
        type:"button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class","close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger:'manual',
        html:true,
        title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
        content: "There's no image",
        placement:'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function(){
        $('.image-preview').attr("data-content","").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Browse"); 
    }); 
    // Create the preview image
    $(".image-preview-input input:file").change(function (){     
        var img = $('<img/>', {
            id: 'dynamic',
            width:250,
            height:200
        });      
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);            
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
        }        
        reader.readAsDataURL(file);
    });  
});
		
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/pictures', {
				include: [
					'id,name,size,type,create',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.posts = r;
					// $("#gallery-container").html('');
					r.forEach(function(el){
						/*
						$("#gallery-container").append(`
							<a class="gallery-item" href="/assets/images/gallery/nature-1.jpg" title="Nature Image 1" data-gallery />
								<div class="image">
									<img src="/assets/images/gallery/nature-1.jpg" alt="Nature Image 1"/>
									<ul class="gallery-item-controls">
										<li><label class="check"><input type="checkbox" class="icheckbox"/></label></li>
										<li><span class="gallery-item-remove"><i class="fa fa-times"></i></span></li>
									</ul>
								</div>
								<div class="meta">
									<strong>Nature image 1</strong>
									<span>Description</span>
								</div>
							</a>`);
						*/
					});
				}
			});
		},
	}
});
/* END MEDIA */

/* EMPLOYEES */
var Component_Navigation_Top_PagesEmployees = Vue.component('component-navigation-top-pages-employees', {
	template: '#component-navigation-top-pages-employees',
	props: [
		''
	],
	data: function () {
		return {
		};
	},
	mounted: function () {
		var self = this;
		
	},
	methods: {
		find: function(){
			var self = this;
			
		},
		isActiveClass(thisName){
			var self = this;
			if(self.$route.name == thisName){
				return 'active';
			}else{
				return 'not-active';
			};
			
		},
	}
});

var PagesEmployeesList = Vue.extend({
	template: '#page-employees-list',
	data: function() {
		return {
			posts: [],
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/employees', {
				join: [
					'types_identifications',
					'types_bloods_rhs',
					'types_bloods',
					'status_employees',
					'eps',
					'arls',
					'funds_pensions',
					'funds_compensations',
					'funds_severances',
					'geo_departments',
					'geo_citys',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					$(".datatable tbody").html('');
					r.forEach(function(el){
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.identification_type.name + `</td>
								<td>` + el.identification_number + `</td>
								
								<td>` + el.first_name + ' ' + el.second_name + ' ' + el.surname + ' ' + el.second_surname + `</td>								
								<td>` + el.birthdate + `</td>
								<td>` + el.blood_type.name + `</td>
								<td>` + el.blood_rh.name + `</td>
								<td>` + el.status.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Empleado" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/employees/view/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable").DataTable();
				}
			});
		},
	}
});

var PagesEmployeesSingleView = Vue.extend({
	template: '#page-employees-single-view',
	data: function() {
		return {
			post: {
				"id": this.$route.params.employee_id,
				"first_name": null,
				"second_name": null,
				"surname": null,
				"second_surname": null,
				"identification_type": {
					"id": null,
					"name": null
				},
				"identification_number": null,
				"identification_date_expedition": null,
				"birthdate": null,
				"blood_type": {
					"id": null,
					"name": null
				},
				"blood_rh": {
					"id": null,
					"name": null
				},
				"mail": null,
				"number_phone": null,
				"number_mobile": null,
				"company_date_entry": null,
				"company_date_out": null,
				"company_mail": null,
				"company_number_phone": null,
				"company_number_mobile": null,
				"avatar": null,
				"status": {
					"id": null,
					"name": null
				},
				"eps": {
					"id": null,
					"code": null,
					"name": null
				},
				"arl": {
					"id": null,
					"code": null,
					"name": null
				},
				"pension_fund": {
					"id": null,
					"code": null,
					"name": null
				},
				"compensation_fund": {
					"id": null,
					"code": null,
					"name": null
				},
				"severance_fund": {
					"id": null,
					"code": null,
					"name": null
				},
				"department": {
					"id": null,
					"code": null,
					"name": null
				},
				"city": {
					"id": null,
					"name": null,
					"department": null
				},
				"address": null,
				"geo_address": null,
				"observations": null
			},
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/employees/' + this.$route.params.employee_id, {
				join: [
					'types_identifications',
					'types_bloods_rhs',
					'types_bloods',
					'status_employees',
					'eps',
					'arls',
					'funds_pensions',
					'funds_compensations',
					'funds_severances',
					'geo_departments',
					'geo_citys',
					'pictures',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
				}
			});
		},
	}
});

var PagesEmployeesCalendarView = Vue.extend({
	template: '#page-employees-single-view-calendar',
	data: function() {
		return {
			calendar: null,
			seletedEvent: {
				id: 0,
				title: "",
				all_day: false,
				start: "",
				end: "",
				type: {
					id: 0,
					name: "",
					colorClass: ""
				},
				calendar_clients: []
			},
			posts: [],
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		prepare_external_list(){
			var self = this;
			$('#external-events .external-event').each(function() {
					var eventObject = {title: $.trim($(this).text())};

					$(this).data('eventObject', eventObject);
					$(this).draggable({
							zIndex: 999,
							revert: true,
							revertDuration: 0
					});
			});                    
			
		},
		load_calendar(){
			var self = this;
			if($("#calendar").length > 0){
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                self.prepare_external_list();

                self.calendar = $('#calendar').fullCalendar({
					eventClick: function(event, element) {
						if(event.id != undefined && event.id > 0){
							FG.api('GET', '/calendar/' + event.id, {
								join: [
									'types_calendars',
									'calendar_clients',
									'calendar_clients,clients',
									'requests',
								]
							}, function(a){
								console.log(a);
								if(a != undefined && a.id > 0){
									self.seletedEvent = a;
								}
							});
						}
						// self.calendar.fullCalendar('updateEvent', event);
					},
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    editable: false,
					//events: ,
                    // eventSources: {
					// 	url: "/assets/ajax_fullcalendar.php"
					// },
					// eventSources: self.posts,
					events: self.posts,
                    droppable: true,
                    selectable: false,
                    selectHelper: true,
					select: function(start, end, allDay) {
                        var title = prompt('Event Title:');
                        if (title) {
                            self.calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay
                            },
                            true
                            );
                        }
                        self.calendar.fullCalendar('unselect');
                    },
                    drop: function(date, allDay) {
                        var originalEventObject = $(this).data('eventObject');
                        var copiedEventObject = $.extend({}, originalEventObject);
                        copiedEventObject.start = date;
                        copiedEventObject.allDay = allDay;
                        self.calendar.fullCalendar('renderEvent', copiedEventObject, true);
                        if ($('#drop-remove').is(':checked')) {
                            $(this).remove();
                        }

                    }
                });
                
                $("#new-event").on("click",function(){
                    var et = $("#new-event-text").val();
                    if(et != ''){
                        $("#external-events").prepend('<a class="list-group-item external-event">'+et+'</a>');
                        self.prepare_external_list();
                    }
                });
                
            }
		},
		find: function(){
			var self = this;
			self.posts = [];
			
			FG.api('GET', '/calendar_employees', {
				join: [
					'calendar',
					'calendar,types_calendars',
				]
			}, function(r){
				if(r[0] != undefined && r[0].id > 0){
					r.forEach(function(x){
						c = x.calendar;
						var d_s = new Date(c.start.replace(/-/g,"/"));
						var d_e = new Date(c.end.replace(/-/g,"/"));
						
						formatted_date_start =  d_s.getFullYear() + "-" + (d_s.getMonth() + 1) + "-" + d_s.getDate();
						formatted_date_end =  d_e.getFullYear() + "-" + (d_e.getMonth() + 1) + "-" + d_e.getDate();
						
						self.posts.push({
							id: c.id,
							allDay: Boolean(c.all_day),
							title: c.title,
							start: c.start,
							end: c.end,
							className: 'blue',
							// url: 'https://www.facebook.com/sweetsamshopco/'
						});
					});
					
				}
					self.$root._mpb("show",{value: [0,100],speed: 0});
				self.load_calendar();
			});
		},
	}
});
/* END EMPLOYEES */

var router = new VueRouter({
	routes: [
		{ path: '/', component: PagesDashboard, name: 'page-dashboard' },
		{ path: '/login', component: PagesLogin, name: 'page-login' },
		
		/* EMPLOYEES */
		{ path: '/employees/list', component: PagesEmployeesList, name: 'page-employees-list' },
		{ path: '/employees/view/:employee_id', component: PagesEmployeesSingleView, name: 'page-employees-single-view' },
		{ path: '/employees/view/:employee_id/calendar', component: PagesEmployeesCalendarView, name: 'page-employees-single-view-calendar' },
		/* END EMPLOYEES */
		
		
		/* ACCOUNTS */
		{ path: '/accounts/list', component: PagesAccountsList, name: 'page-accounts-list' },
		{ path: '/accounts/add', component: PagesAccountsAdd, name: 'page-accounts-add' },
		{ path: '/accounts/view/:account_id', component: PagesAccountsView, name: 'page-accounts-view' },
		{ path: '/accounts/edit/:account_id', component: PagesAccountsEdit, name: 'page-accounts-edit' },
		
			/* CONTACTS IN ACCOUNTS */
			{ path: '/accounts/view/:account_id/contacts', component: PagesAccountsContactsView, name: 'page-accounts-contacts-view' },
			{ path: '/accounts/view/:account_id/contacts/:contact_id', component: PagesAccountsContactsSingleView, name: 'page-accounts-contacts-single-view' },
			/* END CONTACTS IN ACCOUNTS */
			
			/* ADDRESSES IN ACCOUNTS */
			{ path: '/accounts/view/:account_id/addresses', component: PagesAccountsAddressesView, name: 'page-accounts-addresses-view' },
			{ path: '/accounts/view/:account_id/addresses/:address_id', component: PagesAccountsAddressesSingleView, name: 'page-accounts-addresses-single-view' },
			/* END ADDRESSES IN ACCOUNTS */
			
			/* REQUESTS IN ACCOUNTS */
			{ path: '/accounts/view/:account_id/requests', component: PagesAccountsRequestsView, name: 'page-accounts-requests-view' },
			{ path: '/accounts/view/:account_id/requests/:request_id', component: PagesAccountsRequestsSingleView, name: 'page-accounts-requests-single-view' },
			{ path: '/accounts/view/:account_id/requests/:request_id/calendar', component: PagesAccountsRequestsSingleCalendarView, name: 'page-accounts-requests-single-calendar-view' },
			{ path: '/accounts/view/:account_id/requests/:request_id/calendar/add', component: PagesAccountsRequestsSingleCalendarAdd, name: 'page-accounts-requests-single-calendar-add' },
			/* END REQUESTS IN ACCOUNTS */
			
			/* CALENDAR IN ACCOUNTS */
			{ path: '/accounts/view/:account_id/calendar', component: PagesAccountsCalendarView, name: 'page-accounts-calendar-view' },
			/* END CALENDAR IN ACCOUNTS */
			
			/* QUOTATIONS IN ACCOUNTS */
			{ path: '/accounts/view/:account_id/requests/:request_id/quotations/add', component: PagesAccountsRequestsQuotationsAdd, name: 'page-accounts-requests-quotations-add' },
			{ path: '/accounts/view/:account_id/requests/:request_id/quotations/:quotation_id/view', component: PagesAccountsRequestsQuotationsSingleView, name: 'page-accounts-requests-quotations-single-view' },
			/* END QUOTATIONS IN ACCOUNTS */
			
		/* END ACCOUNTS */
		
		/* CONTACTS */
		{ path: '/contacts/list', component: PagesContactsList, name: 'page-contacts-list' },
		{ path: '/contacts/list/accounts', component: PagesContactsListAccounts, name: 'page-contacts-list-accounts' },
		{ path: '/contacts/list/accounts/:account_id/add', component: PagesContactsListAccountsAddContactToAccount, name: 'page-contacts-list-accounts-add-to-account' },
		{ path: '/contacts/add', component: PagesContactsAdd, name: 'page-contacts-add' },
		{ path: '/contacts/view/:contact_id', component: PagesContactsView, name: 'page-contacts-view' },
		{ path: '/contacts/edit/:contact_id', component: PagesContactsEdit, name: 'page-contacts-edit' },
		/* END CONTACTS */
		
		/* PROFILES */
		{ path: '/profiles/:user_id', component: PagesProfilesB2BViewById, name: 'page-profiles-b2b-for-id-view' },
		/* END PROFILES */
		
		/* USERS */
		{ path: '/users/list', component: PagesUsersList, name: 'page-users-list' },
		{ path: '/users/view/:user_id', component: PagesUsersView, name: 'page-users-view' },
		{ path: '/users/edit/:user_id', component: PagesUsersEdit, name: 'page-users-edit' },
		{ path: '/users/add', component: PagesUsersAdd, name: 'page-users-add' },
		/* END USERS */
		
		/* ADDRESSES */
		{ path: '/addresses/list', component: PagesAddressesList, name: 'page-addresses-list' },
		{ path: '/addresses/view/:address_id', component: PagesAddressesView, name: 'page-addresses-view' },
		/* END ADDRESSES */
		
		/* MEDIA */
		{ path: '/media/gallery/pictures', component: PagesMediaGalleryPictures, name: 'page-gallery-pictures' },
		/* END MEDIA */
	]
});

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

function RunPage(){
	app.$mount('#app');
};

var MyPlugin = {
	install: function (Vue, options) {
		Vue.mixin({
			data: function(){
				return {
					status: 'not_authorized',
					authResponse: {
						accessToken: 'none',
						userID:'0',
						userData: {
							id: 0,
							location: '',
							password: '',
							username: '',
						}
					},
					options: options,
						currentRoute: '',
				}
			},
			methods: {
				FG: FG,
			},
			created() {
				var self = this;
				self.$root.load_root();
			},
			mounted() {
				var self = this;
				// self.$root.load_actions();
				
				self.$root.load_root()
				self.$root.load_actions();
				
				if(self.$root.status === 'connected'){ self.$root.checkSession(); }
				this.$nextTick(function () {
					if(self.$root.status === 'connected'){
						self.$root.checkSession();
					}
					self.$root.load_actions();
					
					
				});
				
				
				
			},
			beforeCreate() {
				var self = this;				
				var session = FG.loadSession();
				self.$root.status = session.status;
				self.$root.authResponse = session.authResponse;
				
			},
			beforeMount() {
				var self = this;				
				var session = FG.loadSession();
				self.$root.status = session.status;
				self.$root.authResponse = session.authResponse;
				
				this.$nextTick(function () {
					if(self.$root.status === 'not_authorized' && self.$route.name != 'page-login'){
						router.push({ name: 'page-login' });
					} else if (self.$route.name === 'page-login' && self.$root.status === 'connected'){
						router.push({
							name: 'page-dashboard'
						});
					} else{
						
					}
					
					if(self.$route.name == self.currentRoute){
						console.log('reboot.');
					}else{
						console.log('No reboot.');
					}
				});
			},
		});
	}
}