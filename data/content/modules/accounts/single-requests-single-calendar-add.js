var PagesAccountsRequestsSingleCalendarAdd = Vue.extend({
	template: '#page-accounts-requests-single-calendar-add',
	data: function() {
		return {
			options: {
				status_requests: [],
				events_staff_employees: [],
				events: {
					actives: [],
				},
				types_events: [],
				types_events_options: [],
				status_events: [],
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
				account: this.$route.params.account_id,
				title: null,
				employee: null,
				start: null,
				end: null,
				type: null,
				request: this.$route.params.request_id,
				status: null,
				address: null,
			},
			calc: {
				current_budget: 0
			},
			list: {
				pending_resources: [],
			},
			demoSource: [],
			calendar: false,
			calendar_element: null,
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
		self.load_scripts();
	},
	methods: {
		resetPost(){
			var self = this;
			self.event_enebled = false;
			self.post_event.employee = null;
			self.post_event.start = null;
			self.post_event.end = null;
		},
		seletedActive(address){
			var self = this;
			if(address.id != undefined){
				if(self.post_event.address == address.id){
					return 'fas fa-check';
				}else{
					return 'fas fa-times';
				}
			}
		},
		toggleAddress(address){
			var self = this;
			if(address.id == self.post_event.address){
				self.post_event.address = null;
			}else{
				self.post_event.address = address.id;
			}
		},
		load_scripts(){
			var self = this;
			
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();
                $(".select").on("change", function(){
					k = $(this).attr("name");
					self.post_event[k] = $(this).val();
					
					if(k == 'type'){
						self.filter_calendar($(this).val());
					}
                });
			}
			
			$("input,select,textarea").on("change", function(){
					k = $(this).attr("name");
					self.post_event[k] != $(this).val()
			});
			
			
			$('#search').on('keyup', function() {
				var pattern = $(this).val();
				$('.searchable-container .items').hide();
				$('.searchable-container .items').filter(function() {
					return $(this).text().match(new RegExp(pattern, 'i'));
				}).show();
			});
            if($(".wizard").length > 0){
                $(".wizard > ul").each(function(){
                    $(this).addClass("steps_"+$(this).children("li").length);
                });
				
                if($("#wizard-validation").length > 0){
					var validator = $("#wizard-validation").validate({
						debug: true,
						errorLabelContainer: "#messageBox",
						rules: {
							address: {
								required: true,
							},
							title: {
								required: true,
							},
							type: {
								required: true,
							},
							start: {
								required: true,
							},
							end: {
								required: true,
							},
						},
						messages: {
							address: {
								required: "Seleccione la direccion que desea agendar.",
							},
							title: {
								required: "Ingrese un titulo para el evento.",
							},
							type: {
								required: "Seleccione el tipo de visita que desea agendar.",
							},
							start: {
								required: "Ingrese la fecha de inicio del evento.",
							},
							end: {
								required: "Ingrese la fecha de inicio del evento.",
							},
						},
						submitHandler: function() {
							
							if(
								self.post_event.account != null && self.post_event.account != "null" && self.post_event.account != ""
								&& self.post_event.title != null && self.post_event.title != "null" && self.post_event.title != ""
								&& self.post_event.employee != null && self.post_event.employee != "null" && self.post_event.employee != ""
								&& self.post_event.start != null && self.post_event.start != "null" && self.post_event.start != ""
								&& self.post_event.end != null && self.post_event.end != "null" && self.post_event.end != ""
								&& self.post_event.type != null && self.post_event.type != "null" && self.post_event.type != ""
								&& self.post_event.request != null && self.post_event.request != "null" && self.post_event.request != ""
								&& self.post_event.status != null && self.post_event.status != "null" && self.post_event.status != ""
								&& self.post_event.address != null && self.post_event.address != "null" && self.post_event.address != ""
							){
								$.notify("formulario correctamente.", "success");
								
								/* EVENT CREATE */
									/* EVENT IN ACCOUNT */
										/* EVENT IN EMPLOYEE */
											/* ADDRESS REVIEW */
												/* ADDRESS REVIEW RESOURCES */
												/* END ADDRESS REVIEW RESOURCES */
											/* END ADDRESS REVIEW */
										/* END EVENT IN EMPLOYEE */
									/* END EVENT IN ACCOUNT */
								/* END EVENT CREATE */
							}else{
								$.notify("Complete el formulario correctamente.", "error");
							}
						}
					});
				};
                
                $(".wizard").smartWizard({
					labelNext:'Continuar', // label for Next button
					labelPrevious:'Regresar', // label for Previous button
					labelFinish:'Añadir',  // label for Finish button 
					buttonOrder: ['finish', 'next', 'prev'],
                    onLeaveStep: function(obj){
                        var wizard = obj.parents(".wizard");
                        if(wizard.hasClass("wizard-validation")){
                            var valid = true;
                            $('input,textarea',$(obj.attr("href"))).each(function(i,v){ valid = validator.element(v) && valid; });
                            if(!valid){ wizard.find(".stepContainer").removeAttr("style"); validator.focusInvalid(); return false; }
                        }
                        return true;
                    },
                    onShowStep: function(obj){                        
                        var wizard = obj.parents(".wizard");

                        if(wizard.hasClass("show-submit")){
                        
                            var step_num = obj.attr('rel');
                            var step_max = obj.parents(".anchor").find("li").length;

                            if(step_num == step_max){                             
                                obj.parents(".wizard").find(".actionBar .btn-primary").css("display","block");
                            }                         
                        }
                        return true;                         
                    }
                });
            }
			
			self.load_options_selects();
		},
		load_options_selects(){
			var self = this;
			self.$root.MV().statusRequests.list({}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					self.options.status_requests = a;
				}
				
				self.$root.MV().typesEvents.list({}, function(b){
					if(b[0] != undefined && b[0].id > 0){
						self.options.types_events = b;
						b.forEach(function(c){
							$(".select[name='type']").append('<option value="'+c.id+'">' + c.name + '</option>');
							self.options.types_events_options.push({
								text: c.name,
								value: c.id,
							});
						});
						$(".select[name='type']").selectpicker('refresh');
					}
					
					self.$root.MV().statusEvents.list({}, function(d){
						console.log(d);
						if(d[0] != undefined && d[0].id > 0){
							self.options.status_events = d;
						}
					});
					self.find();
				})
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
					'contacts,addresses',
					'requests_activity',
					'requests_addresses,addresses,addresses_inventories',
					'requests_addresses,events,requests_addresses_reviews_resources,inventories_resources',
					'requests_addresses,requests_addresses_services,services,services_inventories_required,inventories,inventories_resources,types_meditions',
					'quotations,status_quotations',
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					
					try {
						self.post = a;
						addresses_t = [];
						a.requests_addresses.forEach(function(request_address){
							request_address.requests_addresses_services.forEach(function(request_address_service){
								request_address_service.service.services_inventories_required.forEach(function(service_inventories_required){
									service_inventories_required.type.inventories_resources.forEach(function(inventories_resources){
										inventories_resources.update_limit = JSON.parse(inventories_resources.update_limit);
										
										inventories_resources.calendar_check = false;
										if(request_address.calendar != null){
											if(request_address.calendar.address == request_address.address.id){
												request_address.calendar.requests_addresses_reviews_resources.forEach(function(resource_review){
													if(inventories_resources.id == resource_review.resource.id){
														inventories_resources.calendar_check = true;
													}												
												});
											}
										}
									
										
										
										inventories_resources.addresses_inventories = [];
										request_address.address.addresses_inventories.forEach(function(address_inventory) {
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
													
													if(inventories_resources.calendar_check == true && same == false){
														address_inventory.calendar_check = true;
														inventories_resources.calendar_check = true;
													}else{
														address_inventory.calendar_check = false;
														inventories_resources.calendar_check = false;
													}
													
													console.log(address_inventory);
												inventories_resources.addresses_inventories.push(address_inventory);
											}
										});
										
									});
								});
								
							});
							
						});
												
						a.requests_addresses.forEach(function(request_address){
							request_address.address.completo = JSON.parse(request_address.address.completo);
							console.log(' - - - - - - - - - - INICIO - - - - - - - - - - -');
							/*
								Direccion = request_address.address => Object
							*/
							// console.log('Direccion => ' + request_address.address.address_input);
							// console.log(request_address.address);
							
							request_address.calendar_enabled = false;
							request_address.requests_addresses_services.forEach(function(service){
								/*
								Servicio = service.service => Object
								Servicio = service.service.inventary_required => Int
								Servicio = service.service.inventories_resources => Inventario requerido para este servicio
								*/
								// console.log('Servicio => ' + service.service.name);
								// console.log(service.service);
								// console.log('Servicio requeriere inv? => ' + service.service.inventary_required);
								// console.log(service.service.inventary_required);
								
								/* VALIDAR SI EL INVENTARIO ESTA PARAMETRIZADO */
								if(service.service.inventary_required == 1 && service.service.services_inventories_required.length > 0){
									service.service.services_inventories_required.forEach(function(inventary){
										/* VALIDAR SI LOS RECURSOS ESTAN PARAMETRIZADOS */
										if(inventary.type.inventories_resources.length > 0){
											/*
												Inventario Necesario para este servicio = inventary => Object
												inventary.type = Tipo de Inventario => Object
												inventary.type.inventories_resources = Recursos Requeridos => Array
											*/
											// console.log('Inventario Requerido => ' + inventary.type.name);
											// console.log(inventary.type);
											
											inventary.type.inventories_resources.forEach(function(resource){
												/*
													Recurso Requerido = resource => Object
													Mismos recursos en la direccion = resource.addresses_inventories => Object
													Fecha limite de actualizacion del recurso = resource.update_limit => Object
												*/
												// console.log('Recurso Requerido => ' + resource.name);
												// console.log('Limite de Fechas => ' + JSON.stringify(resource.update_limit));
												
												
												if(resource.addresses_inventories.length > 0){
													resource.addresses_inventories.forEach(function(resource_in_address){
														/*
															Recurso en la direccion = resource_in_address => Object
														*/
														if(resource_in_address.resource == resource.id){
															// console.log('Recurso En la direccion => ' + JSON.stringify(resource_in_address));
															// console.log(resource_in_address);
															
															// Fecha Actual
															var co = new Date();
															var up = new Date(resource_in_address.updated); // Fecha Ultima Visita Tecnica
															
															co.setDate(co.getDate() - resource.update_limit.day);
															co.setFullYear(co.getFullYear() - resource.update_limit.year);
															co.setHours(co.getHours() - resource.update_limit.hours);
															co.setMonth(co.getMonth() - resource.update_limit.month);
															co.setMinutes(co.getMinutes() - resource.update_limit.minutes);
															co.setSeconds(co.getSeconds() - resource.update_limit.seconds);
															co.setMilliseconds(co.getMilliseconds() - resource.update_limit.milliseconds);
															
															var same = up.getTime() >= co.getTime();
															resource_in_address.date_compare = same;
															
															request_address.calendar_enabled = self.addressCalendarEnabled(resource.addresses_inventories.length, resource_in_address.date_compare);
															
															if(request_address.calendar_enabled == true){
																self.addAddressInListPending(request_address.address, resource, service.service);
															}else{
																
															}
														}
													});
												}else{
													console.log('No existen recursos en la direccion. SYSTEM');
													self.addAddressInListPending(request_address.address, resource, service.service);
												}
											});
										}else{
											console.log('Los recursos no estan parametrizados. SYSTEM');
										}
									});
								}else{
									console.log('Inventario sin parametrizar. SYSTEM.');
								}
							});
							
							console.log('Hablitar Agenda?'); console.log(request_address.calendar_enabled);
							console.log(' - - - - - - - - - - FIN - - - - - - - - - - -');
						});
						
						self.load_calendar();
						// self.repairAddresses(a);
					}
					catch(e){
						console.log(e);
					}
				}
			});
		},
		repairAddresses(addresses){
			var self = this;
			// console.log(JSON.stringify(addresses));
		},
		addAddressInListPending(data_address, data_resource, data_service){
			var self = this;
			try {
				if(data_resource.calendar_check == false){
					searh_address_in_list = self.list.pending_resources.find(addr => addr.id  == data_address.id);
					if(searh_address_in_list != undefined){
						console.log('Direccion encontrada en la lista de pendientes.');
						search_service_in_address = searh_address_in_list.services.find(serv => serv.id  == data_service.id);
						
						if(search_service_in_address != undefined){
							console.log('Servicio encontrado en la lista de pendientes.');
							search_resource_in_service = search_service_in_address.resources.find(resour => resour.id  == data_resource.id);
							
							if(search_resource_in_service != null ){
								console.log('Recurso encontrado en la lista de pendientes.');
							}else{
								console.log('Recurso no encontrado en la lista de pendientes.');
								search_service_in_address.resources.push({
									id: data_resource.id,
									name: data_resource.name,
										calendar_check: data_resource.calendar_check,
								});
							}
						}else {
							console.log('Servicio no encontrado en la lista de pendientes.');
							search_service_in_address.resources.push({
								id: data_service.id,
								name: data_service.name,
								resources: [{
									id: data_resource.id,
									name: data_resource.name,
										calendar_check: data_resource.calendar_check,
								}],
							});
						}
					}else {
						console.log('Direccion no encontrada en la lista de pendientes.');
						{
							self.list.pending_resources.push({
								id: data_address.id,
								address_input: data_address.address_input,
								display_name: data_address.display_name,
								services: [{
									id: data_service.id,
									name: data_service.name,
									resources: [{
										id: data_resource.id,
										name: data_resource.name,
										calendar_check: data_resource.calendar_check,
									}],
								}]
							});
						}
					}
				}
			}
			catch(e){
				console.log(e);
			}
		},
		addressCalendarEnabled(item_inventories_resources_addresses_inventories_length, item_addresses_inventories_date_compare){
			var self = this;
			if(item_inventories_resources_addresses_inventories_length > 0 && item_addresses_inventories_date_compare == false){
				return true;
			}else{
				return false;
			};
		},
		filter_calendar(event_group_id){
			var self = this;
			self.options.events_staff_employees = [];
			self.demoSource = [];
			self.post.type = event_group_id;
			self.resetPost();
			
			self.demoSource = [{
				// id: 42001,
				name: "Release Stage",
				desc: "Training",
				values: [{
					from: 1330011200000,
					to: 1336611200000,
					label: "Training",
					customClass: "ganttOrange"
				}]
			}],
			hoursAdmon = [];
			hoys = new Date();
			for (var i = 0; i < 1; i++) {
				hoursAdmon.push({
					// from: hoys,
					from: new Date('2019-07-01'),
					to: new Date('2019-07-01'),
					// to: new Date(hoys),
					label: "Operacion",
					customClass: "ganttOrange"
				});
			}
			self.demoSource.push({
				// id: 999999999999,
				name: "Días festivos",
				desc: "",
				values: hoursAdmon
			});
				
				
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
					// console.log(a);
					self.options.events_staff_employees = a;
					
					a.forEach(function(b){
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
				}
				
				// shifts dates closer to Date.now()
				var offset = new Date().setHours(0, 0, 0, 0) - new Date(self.demoSource[0].values[0].from).setDate(35);
				for (var i = 0, len = self.demoSource.length, value; i < len; i++) {
					value = self.demoSource[i].values[0];
					value.from += offset;
					value.to += offset;
				}
				

				$(".gantt").gantt({
					source: self.demoSource,
					navigate: "scroll",
					scale: "days",
					maxScale: "weeks",
					minScale: "hours",
					dow: [
						"D", 
						"L", 
						"M", 
						"W", 
						"J", 
						"V", 
						"S"
					],
					months: [
						"Enero", 
						"Febrero", 
						"Marzo", 
						"Abril", 
						"Mayo", 
						"Juio", 
						"Julio", 
						"Agosto", 
						"Septimbre", 
						"Octubre", 
						"Noviembre", 
						"Diciembre"
					],
					// maxScale: "months",
					// minScale: "hours",
					itemsPerPage: 25,
					scrollToToday: true,
					useCookie: false,
					onItemClick: function(data) {
						console.log("Item clicked - show some details");
						console.log(data);
						$.notify("Seleccione una fecha valida.", "error");
						self.resetPost();
					},
					onAddClick: function(dt, rowId) {
						console.log("Empty space clicked - add an item!");
						
						try {
							if(rowId > 0){
								var h = new Date();
								var newDate = new Date(dt);
								compare_date = newDate.getTime() >= h.getTime();
								if(compare_date == true){
									day = ''+newDate.getDate();
									mouth = ''+newDate.getMonth();
									
									if(day.length == 1){ day = '0' + day; }
									if(mouth.length == 1){ mouth = '0' + mouth; }
									
									a = self.options.types_events.find(event_type => event_type.id == self.post_event.type);
									if(a != undefined && a.id > 0){
										self.post_event.employee = rowId;
										self.post_event.start = newDate.getFullYear() + '-' +  mouth + '-' +  day + ' 00:00:00';
										self.post_event.end = newDate.getFullYear() + '-' +  mouth + '-' +  day + ' 23:59:00';
										self.post_event.title = a.name + ' - Solicitud # ' + self.post_event.request;
										// self.resetPost();
										self.event_enebled = true;
									}
									
								}else{
									$.notify("Seleccione una fecha futura.", "error");
									self.resetPost();
								}
							}else{
								$.notify("No se detecto el empleado.", "error");
								self.resetPost();
							}
						}
						catch(e){
							console.log(e);
						}
					},
					onRender: function() {
						if (window.console && typeof console.log === "function") {
							console.log("chart rendered");
						}
						
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
					placement: "auto top"
				});

				prettyPrint();;
				self.$root._mpb("show", { value: [0, 100], speed: 1 });
				
				
				
			});
		},
		load_calendar(){
			var self = this;
			
			FG.api('GET', '/types_events', {
			}, function (a) {
				if(a[0] != undefined && a[0].id > 0){
					self.options.types_events = a;
				}
			});
			
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
