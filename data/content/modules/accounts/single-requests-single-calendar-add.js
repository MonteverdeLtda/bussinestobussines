var PagesAccountsRequestsSingleCalendarAdd = Vue.extend({
	template: '#page-accounts-requests-single-calendar-add',
	data: function() {
		return {
			options: {
				status_requests: [],
				events_groups: [],
				events_staff_employees: [],
			},
			event_enebled: false,
			post: {
				"id": this.$route.params.request_id,
				"status": 0,
				"client": this.$route.params.account_id,
				"contact": 0,
				"addresses": [],
				"request_notes": "",
				"requests_activity": [],
				"requests_addresses": [],
			},
			post_event: {
				title: null,
				all_day: null,
				employee: null,
				start: null,
				end: null,
				type: null,
				request: this.$route.params.request_id,
				status: null,
			},
			calc: {
				current_budget: 0
			},
			demoSource: [{
				id: 42001,
				name: "Release Stage",
				desc: "Training",
				values: [{
					from: 1330011200000,
					to: 1336611200000,
					label: "Training",
					customClass: "ganttOrange"
				}]
			},{
				id: 42002,
				desc: "Deployment",
				values: [{
					from: 1336611200000,
					to: 1338711200000,
					label: "Deployment",
					customClass: "ganttOrange"
				}]
			},{
				id: 42003,
				desc: "Warranty Period",
				values: [{
					from: 1336611200000,
					to: 1349711200000,
					label: "Warranty Period",
					customClass: "ganttOrange"
				}]
			}],
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
		prepare_external_list(){
			var self = this;
				/*
			$('#external-events .external-event').each(function() {
				dataId = $(this).data('calendar');
				
				var eventObject = {
					id: dataId,
					title: 'Visita para solicitud: ' + $.trim($(this).text())
				};
				$(this).data('eventObject', eventObject);
				
				$(this).data("soltado", false);
				$(this).draggable({
					zIndex: 999,
					revert: true,
					revertDuration: 0,
					start: function(event, ui) {
						//console.log(event);
						//console.log(ui);
					},
					stop: function(event, ui) {
						// console.log(event);
						// console.log(ui);
					},
				});
				
				$(".dataPanel").data("numsoltar", 0);
				$(".dataPanel").droppable({
				   drop: function( event, ui ) { 
					  if (!ui.draggable.data("soltado")){ 
						 ui.draggable.data("soltado", true); 
						 var elem = $(this); 
						 elem.data("numsoltar", elem.data("numsoltar") + 1) 
						 console.log("Llevo " + elem.data("numsoltar") + " elementos soltados"); 
						 // elem.html("Llevo " + elem.data("numsoltar") + " elementos soltados"); 
					  } 
				   }, 
				   out: function( event, ui ) { 
					  if (ui.draggable.data("soltado")){ 
						 ui.draggable.data("soltado", false); 
						 var elem = $(this); 
						 elem.data("numsoltar", elem.data("numsoltar") - 1); 
						console.log("Llevo " + elem.data("numsoltar") + " elementos soltados"); 
						// elem.html("Llevo " + elem.data("numsoltar") + " elementos soltados"); 
					  } 
				   } 
				});
				$(".gantt").droppable("option", "accept", ".dataPanel");
			});
				*/
		},
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
					'account,eq,' + self.$route.params.account_id
				],
				join: [
					'status_requests',
					'contacts',
					'contacts,addresses',
					'requests_activity',
					'requests_addresses',
					'requests_addresses,events',
					'requests_addresses,events,status_events',
					'requests_addresses,addresses',
					'requests_addresses,addresses,addresses_inventories',
					'requests_addresses,requests_addresses_services',
					'requests_addresses,requests_addresses_services,services',
					'requests_addresses,requests_addresses_services,services,services_inventories_required',
					'requests_addresses,requests_addresses_services,services,services_inventories_required,inventories',
					'requests_addresses,requests_addresses_services,services,services_inventories_required,inventories,inventories_resources',
					'requests_addresses,requests_addresses_services,services,services_inventories_required,inventories,inventories_resources,types_meditions',
					//'requests_addresses,requests_addresses_services,services,services_inventories_required,inventories,inventories_resources,addresses_inventories',
					'quotations',
					'quotations,status_quotations',
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					self.post = a;
					addresses_t = [];
					a.requests_addresses.forEach(function(request_address){
						request_address.address.completo = JSON.parse(request_address.address.completo);
						
						request_address.requests_addresses_services.forEach(function(request_address_service){
							request_address_service.service.services_inventories_required.forEach(function(service_inventories_required){
								
								service_inventories_required.type.inventories_resources.forEach(function(inventories_resources){
									inventories_resources.update_limit = JSON.parse(inventories_resources.update_limit);
									
									inventories_resources.addresses_inventories = [];
									request_address.address.addresses_inventories.find(function(address_inventory) {
										if(address_inventory.resource == inventories_resources.id){												
											var cu = new Date(); // Fecha Actual
											var co = new Date();
											var up = new Date(address_inventory.updated); // Fecha Ultima Visita Tecnica
											co.setDate(co.getDate() - inventories_resources.update_limit.day);
											co.setFullYear(co.getFullYear() - inventories_resources.update_limit.year);
											co.setHours(co.getHours() - inventories_resources.update_limit.hours);
											co.setMonth(co.getMonth() - inventories_resources.update_limit.month);
											co.setMinutes(co.getMinutes() - inventories_resources.update_limit.minutes);
											co.setSeconds(co.getSeconds() - inventories_resources.update_limit.seconds);
											co.setMilliseconds(co.getMilliseconds() - inventories_resources.update_limit.milliseconds);
											
											var same = up.getTime() >= co.getTime();
											address_inventory.date_compare = up.getTime() >= co.getTime();
											
											if(same == true){
												self.calc.current_budget += inventories_resources.price * address_inventory.quantity;
											}
											
											inventories_resources.addresses_inventories.push(address_inventory);
										}
									});
									
								});
							});
						});
						addresses_t.push(request_address);
					});
					self.post.requests_addresses = addresses_t;
					self.load_calendar()
				}
			});
		},
		filter_calendar(event_group_id){
			var self = this;
			
			FG.api('GET', '/events_staff_employees', {
				join: [
					'employees',
					'employees,employees_calendar',
					'employees,employees_calendar,events',
					'employees,employees_calendar,events,types_events',
					'employees,employees_calendar,events,status_events',
				],
				filter: [
					'group,eq,' + event_group_id
				]
			}, function (a) {
				
				if(a != undefined && a.length > 0){
					console.log(a);
					self.options.events_staff_employees = a;
					
					a.forEach(function(b){
						console.log(b);
						
						events_sub = [];
						events_sub1 = [];
						b.employee.employees_calendar.forEach(function(c){
							events_sub.push({
								label: c.calendar.type.name,
								from: c.calendar.start,
								to: c.calendar.end,
								customClass: "gantt" + c.calendar.type.colorClass,
								dataObj: c
							});
						});
						
						self.demoSource.push({
							id: b.employee.id,
							name: b.employee.first_name + ' ' + b.employee.second_name + ' ' + b.employee.surname + ' ' + b.employee.second_surname,
							// desc: "Tecnico Forestal",
							values: events_sub
						});
					});
					
					
					// shifts dates closer to Date.now()
					var offset = new Date().setHours(0, 0, 0, 0) -
						new Date(self.demoSource[0].values[0].from).setDate(35);
					for (var i = 0, len = self.demoSource.length, value; i < len; i++) {
						value = self.demoSource[i].values[0];
						value.from += offset;
						value.to += offset;
					}

					$(".gantt").gantt({
						source: self.demoSource,
						navigate: "scroll",
						scale: "weeks",
						maxScale: "weeks",
						minScale: "hours",
						// maxScale: "months",
						// minScale: "hours",
						itemsPerPage: 25,
						scrollToToday: true,
						useCookie: false,
						onItemClick: function(data) {
							console.log("Item clicked - show some details");
							console.log(data);
							self.event_enebled = false;
							$.notify("Seleccione una fecha valida.", "error");
						},
						onAddClick: function(dt, rowId) {
							console.log("Empty space clicked - add an item!");
							
							self.event_enebled = false;
							if(rowId > 0){
								var h = new Date(dt);
								var newDate = new Date(dt);
								day = ''+newDate.getDate();
								mouth = ''+newDate.getMonth();
								
								if(day.length == 1){ day = '0' + day; }
								if(mouth.length == 1){ mouth = '0' + mouth; }
								
									self.post_event.all_day = true;
									self.post_event.employee = rowId;
									self.post_event.start = newDate.getFullYear() + '-' +  mouth + '-' +  day + ' 00:00:00';
									self.post_event.start = newDate.getFullYear() + '-' +  mouth + '-' +  day + ' 23:59:00';
									self.event_enebled = true;
							}else{
								$.notify("Seleccione una fecha valida.", "error");
							}
						},
						onRender: function() {
							if (window.console && typeof console.log === "function") {
								console.log("chart rendered");
							}
							
							// self.prepare_external_list();
							/*
							$('.ganttBlue,.ganttGreen').draggable({
								axis:'x',
								start: function(event, ui) {
									$(this).data("startx",$(this).offset().left);
								},
								stop: function(event, ui) {
									var change = $(this).offset().left - $(this).data("startx");
									var value = $(this).css('margin-left');
									value = value.split("px");
									value = parseInt(value[0]) + change;							
									$(this).css('margin-left', value);
									$(this).css('left', '');
								}                    
							});*/
						}
					});

					$(".gantt").popover({
						selector: ".bar",
						title: function _getItemText() {
							return this.textContent;
						},
						container: '.gantt',
						content: "Pulsa para ver mas informacion.",
						trigger: "hover",
						placement: "auto right"
					});

					prettyPrint();;
					self.$root._mpb("show", { value: [0, 100], speed: 1 });
				}
			});
		},
		load_calendar(){
			var self = this;
			
			FG.api('GET', '/events_groups', {
			}, function (a) {
				if(a[0] != undefined && a[0].id > 0){
					self.options.events_groups = a;
				}
			});
			
			self.filter_calendar(1);
			
		},
		changeStatusRequest(){
			var self = this;
			FG.api('GET', '/requests/' + self.$route.params.request_id, {
				account: self.$route.params.account_id,
			}, function (a) {
				if(a != undefined && a.id > 0){
					if(a.status != self.post.status.id){
						FG.api('PUT', '/requests/' + self.$route.params.request_id, {
							id: self.$route.params.request_id,
							account: self.$route.params.account_id,
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
