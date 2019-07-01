
var PagesEmployeesAdd = Vue.extend({
	template: '#page-employees-add',
	data: function() {
		return {
			jvalidate: null,
			options: {
				types_identifications: [],
				types_bloods: [],
				types_bloods_rhs: [],
				status_employees: [],
				types_eps: [],
				types_arls: [],
				funds_pensions: [],
				funds_compensations: [],
				funds_severances: [],
				geo: {
					departments: [],
					citys: [],
				},
				geo_departments: [],
				geo_citys: [],
				banks: [],
				types_banks: [],
				types_genders: [],
			},
			post: {
				"status": 0,
				"identification_type": 0,
				"identification_number": null,
				"identification_date_expedition": null,
				"first_name": null,
				"second_name": null,
				"surname": null,
				"second_surname": null,
				"birthdate": null,
				"blood_type": 0,
				"blood_rh": 0,
				"email": null,
				"number_phone": null,
				"number_mobile": null,
				"eps": 0,
				"arl": 0,
				"pension_fund": 0,
				"compensation_fund": 0,
				"severance_fund": 0,
				"address": null,
				"observations": null,
				"bank": 0,
				"bank_type": 0,
				"bank_number": null,
				"gender": null,
			},
			address: {
				id: null,
				address_input: null,
				display_name: null,
				completo: null,
				lon: null,
				lat: null,
				department: null,
				city: null,
				type_road: null,
				number_a: null,
				letter_a: null,
				quadrant_a: null,
				number_b: null,
				letter_b: null,
				quadrant_b: null,
				number_c: null,
				postal_code: null,
				additional_information: null,
			},
			jvalidate: null,
			jvalidate2: null,
			map: null,
			pin: null,
			center: null,
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show", {value: [0,0], speed: 1 });
		self.GetMap();
	},
	methods: {
		load_scripts: function(){
			var self = this;
			
			if($(".mask_date").length > 0){ $(".mask_date").datepicker({format: 'yyyy-mm-dd'}); }
			if($(".mask_phone_mobile").length > 0){ $(".mask_phone_mobile").mask('(999) 999-9999'); }
			if($(".mask_phone").length > 0){ $(".mask_phone").mask('(999) 999-9999'); }
			if($(".mask_phone_ext").length > 0){ $(".mask_phone_ext").mask('(99) 999-9999? x99999'); }
				
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).data("name") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
							}
						}
					}
                });
			}
			$("input,select,textarea").on("change", function(){
				for(var k in self.post){
					if (typeof self.post[k] !== 'function') {
						if($(this).attr("name") == k && self.post[k] != $(this).val()){
							self.post[k] = $(this).val();
						}
					}
				}
				for (var k in self.address){
					if (typeof self.address[k] !== 'function'){
						if($(this).data("address-model") == k && self.address[k] != $(this).val()){
							self.address[k] = $(this).val();
							
							if(k=='department'){
								self.load_citys();
							}
						}
						self.repairAddress();
					}
				}
			});
			
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				wrapper: "div.item",
                ignore: [],
                rules: {
					status: { 
						required: true
					},
					identification_type: { 
						required: true
					},
					identification_number: { 
						required: true
					},
					identification_date_expedition: { 
						required: true
					},
					first_name: { 
						required: true
					},
					second_name: { 
						required: false
					},
					surname: { 
						required: true
					},
					second_surname: { 
						required: false
					},
					birthdate: { 
						required: true
					},
					blood_type: { 
						required: true
					},
					blood_rh: { 
						required: true
					},
					email: { 
						required: true
					},
					number_phone: { 
						required: true
					},
					number_mobile: { 
						required: true
					},
					address: { 
						required: true
					},
					eps: { 
						required: true
					},
					arl: { 
						required: true
					},
					pension_fund: { 
						required: true
					},
					compensation_fund: { 
						required: true
					},
					severance_fund: { 
						required: true
					},
					observations: { 
						required: false
					},
					bank: { 
						required: true
					},
					bank_type: { 
						required: true
					},
					bank_number: { 
						required: true
					},
					gender: { 
						required: true
					},
				},
				messages: {
					status: { 
						required: "Selecciona el estado del empleado."
					},
					identification_type: { 
						required: "Selecciona el tipo de identificacion."
					},
					identification_number: { 
						required: "Ingrese el numero de identificacion."
					},
					identification_date_expedition: { 
						required: "Ingrese la fecha de expedicion de la identificacion."
					},
					first_name: { 
						required: "Ingrese el nombre del empleado."
					},
					second_name: { 
						required: ""
					},
					surname: { 
						required: "Ingrese el primer apellido del empleado."
					},
					second_surname: { 
						required: ""
					},
					birthdate: { 
						required: "Ingresa la fecha de nacimiento/cumpleaños el empleado."
					},
					blood_type: { 
						required: "Selecciona el tipo de sangre del empleado."
					},
					blood_rh: { 
						required: "Selecciona el tipo de rh del empleado."
					},
					email: { 
						required: "Ingresa el correo electronico (Personal) del empleado."
					},
					number_phone: { 
						required: "Ingresa el numero fijo (Personal) del empleado."
					},
					number_mobile: { 
						required: "Ingresa el numero movil (Personal) del empleado."
					},
					address: { 
						required: "Ingresa la direccion de residencia del empleado."
					},
					eps: { 
						required: "Selecciona la EPS del empleado."
					},
					arl: { 
						required: "Selecciona la ARL del empleado."
					},
					pension_fund: { 
						required: "Selecciona el fondo de pensiones del empleado."
					},
					compensation_fund: { 
						required: "Selecciona el fondo de compensacion del empleado."
					},
					severance_fund: { 
						required: "Selecciona el fondo de cesantias del empleado."
					},
					observations: { 
						required: ""
					},
					bank: {
						required: "Seleccione el banco del empleado."
					},
					bank_type: {
						required: "Seleccione el tipo de cuenta que tiene el empleado."
					},
					bank_number: {
						required: "Ingrese el numero de cuenta del empleado."
					},
					gender: {
						required: "Seleccione el genero."
					},
				},
				submitHandler: function() {
					var messages = this.settings.messages;
					var rules = this.settings.rules;
					
					newContact = {};
					for(var k in rules){
						if (typeof rules[k] !== 'function') {
							if(rules[k].required == true){
								if(self.post[k] == null || self.post[k] == 0 || self.post[k].length <= 0){
									$.notify(messages[k].required, "error");
									return false;
								}else{
									newContact[k] = self.post[k];
								}
							}
						}
					}
					
					FG.api('GET', '/employees', {
						filter: [
							'identification_number,eq,' + newContact.identification_number,
							'identification_type,eq,' + newContact.identification_type
						]
					}, function(r){
						console.log(r);
						if(r.length > 0 && r[0] != undefined){
							$.notify("El empleado ya existe!", "error");
							router.push({
								name: 'page-employees-single-view',
								params: {
									employee_id: r[0].id
								}
							});
						}else{
							FG.api('POST', '/employees', self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("El empleado fue creada correctamente.", "success");
									router.push({
										name: 'page-employees-single-view',
										params: {
											employee_id: b
										}
									});
								}else{
									$.notify("Hubo un problema creando el empleado.", "success");
								}
							});
						}
					});
				},
				onsubmit: true
			});
						
			self.jvalidate2 = $("#jvalidate2").validate({
				debug: true,
				errorLabelContainer: "#messageBox-2",
				wrapper: "div.item",
                ignore: [],
                rules: {
					address_input: {
						required: true
					},
					display_name: {
						required: true
					},
					department: {
						required: true
					},
					city: {
						required: true
					},
					type_road: {
						required: true
					},
					number_a: {
						required: true
					},
					letter_a: {
						required: false
					},
					quadrant_a: {
						required: false
					},
					number_b: {
						required: true
					},
					letter_b: {
						required: false
					},
					quadrant_b: {
						required: false
					},
					number_c: {
						required: true
					},
					postal_code: {
						required: false
					},
					additional_information: {
						required: false
					},
					lon: {
						required: true
					},
					lat: {
						required: true
					},
				},
				messages: {
					address_input: {
						required: "Completa la direccion."
					},
					display_name: {
						required: "Completa la direccion."
					},
					department: {
						required: "Selecciona el departamento."
					},
					city: {
						required: "Selecciona la ciudad."
					},
					type_road: {
						required: "Selecciona el tipo de vía."
					},
					number_a: {
						required: "Ingrese el numero."
					},
					letter_a: {
						required: ""
					},
					quadrant_a: {
						required: ""
					},
					number_b: {
						required: "Ingrese el numero."
					},
					letter_b: {
						required: ""
					},
					quadrant_b: {
						required: ""
					},
					number_c: {
						required: "Ingrese el numero."
					},
					postal_code: {
						required: ""
					},
					additional_information: {
						required: ""
					},
					lon: {
						required: "No se detecto la correctamente la direccion, falta la longitud."
					},
					lat: {
						required: "No se detecto la correctamente la direccion, falta la latitud."
					},
				},
				submitHandler: function() {
					if(self.address.address_input != null
					&& self.address.display_name != null
					&& self.address.lon != null
					&& self.address.lat != null
					&& self.address.department != null
					&& self.address.city != null
					&& self.address.type_road != null
					&& self.address.number_a != null
					&& self.address.number_b != null
					&& self.address.number_c != null){						
						bootbox.confirm({
							title: "Estas Seguro?",
							message: "¿Terminaste? Confirma pulsando en el botón aceptar.",
							buttons: {
								cancel: {
									label: '<i class="fa fa-times"></i> Cancelar'
								},
								confirm: {
									label: '<i class="fa fa-check"></i> Aceptar'
								}
							},
							callback: function (result) {
								if(result == true){
									FG.api('GET', '/addresses', {
										filter: [
											'address_input,eq,' + self.address.address_input
										]
									}, function(r){
										if(r[0] != undefined && r[0].id > 0){
											self.post.address = r[0].id;
											self.address = r[0];
											$.notify("Direccion Seleccionada con éxito.", 'success');
											
										}else{
											FG.api('POST', '/addresses', self.address, function(r){
												if(Number(r) > 0){
													$.notify("Direccion Añadida con éxito.", 'success');
													self.post.address = r;
													self.address.id = r;
												}
											});
										}
										$('#modal_basic').modal('hide');
									});
								}
							}
						});
					}else{
						$.notify("Ingrese los datos minimos requeridos.", 'error');
					}
				},
				onsubmit: true
			});
			
		},
		load_options: function(){
			var self = this;
			
			FG.api('GET', '/types_identifications', {}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.types_identifications = r;
					r.forEach(function(el){
						$(".select[name='identification_type']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+'</option>');
					});
					$(".select[name='identification_type']").selectpicker('refresh');
				}
				FG.api('GET', '/types_bloods', {}, function(r){
					if(r.length > 0 && r[0].id > 0){
						self.options.types_bloods = r;
						r.forEach(function(el){
							$(".select[name='blood_type']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[name='blood_type']").selectpicker('refresh');
					}
					
					FG.api('GET', '/types_bloods_rhs', {}, function(r){
						if(r.length > 0 && r[0].id > 0){
							self.options.types_bloods_rhs = r;
							r.forEach(function(el){
								$(".select[name='blood_rh']").append('<option value="'+el.id+'">'+el.name+'</option>');
							});
							$(".select[name='blood_rh']").selectpicker('refresh');
						}
						FG.api('GET', '/status_employees', {}, function(r){
							if(r.length > 0 && r[0].id > 0){
								self.options.status_employees = r;
								r.forEach(function(el){
									$(".select[name='status']").append('<option value="'+el.id+'">'+el.name+'</option>');
								});
								$(".select[name='status']").selectpicker('refresh');
							}
							FG.api('GET', '/types_eps', {}, function(r){
								if(r.length > 0 && r[0].id > 0){
									self.options.types_eps = r;
									r.forEach(function(el){
										$(".select[name='eps']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+' - '+el.admin+'</option>');
									});
									$(".select[name='eps']").selectpicker('refresh');
								}
								FG.api('GET', '/types_arls', {}, function(r){
									if(r.length > 0 && r[0].id > 0){
										self.options.types_arls = r;
										r.forEach(function(el){
											$(".select[name='arl']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+' - '+el.admin+'</option>');
										});
										$(".select[name='arl']").selectpicker('refresh');
									}
									FG.api('GET', '/funds_pensions', {}, function(r){
										if(r.length > 0 && r[0].id > 0){
											self.options.funds_pensions = r;
											r.forEach(function(el){
												$(".select[name='pension_fund']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+' - '+el.admin+'</option>');
											});
											$(".select[name='pension_fund']").selectpicker('refresh');
										}
										FG.api('GET', '/funds_compensations', {}, function(r){
											if(r.length > 0 && r[0].id > 0){
												self.options.funds_compensations = r;
												r.forEach(function(el){
													$(".select[name='compensation_fund']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+' - '+el.admin+'</option>');
												});
												$(".select[name='compensation_fund']").selectpicker('refresh');
											}
											FG.api('GET', '/funds_severances', {}, function(r){
												if(r.length > 0 && r[0].id > 0){
													self.options.funds_severances = r;
													r.forEach(function(el){
														$(".select[name='severance_fund']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+' - '+el.admin+'</option>');
													});
													$(".select[name='severance_fund']").selectpicker('refresh');
												}
												FG.api('GET', '/banks', {}, function(r){
													if(r.length > 0 && r[0].id > 0){
														self.options.banks = r;
														r.forEach(function(el){
															$(".select[name='bank']").append('<option value="'+el.id+'">'+el.name+'</option>');
														});
														$(".select[name='bank']").selectpicker('refresh');
													}
													FG.api('GET', '/types_banks', {}, function(r){
														if(r.length > 0 && r[0].id > 0){
															self.options.types_banks = r;
															r.forEach(function(el){
																$(".select[name='bank_type']").append('<option value="'+el.id+'">'+el.name+'</option>');
															});
															$(".select[name='bank_type']").selectpicker('refresh');
														}
														FG.api('GET', '/types_genders', {}, function(r){
															if(r.length > 0 && r[0].id > 0){
																self.options.types_genders = r;
																r.forEach(function(el){
																	$(".select[name='gender']").append('<option value="'+el.id+'">'+el.name+'</option>');
																});
																$(".select[name='gender']").selectpicker('refresh');
															}
															
				
															FG.api('GET', '/types_roads', {}, function(r){
																if(r.length > 0 && r[0].id > 0){
																	self.options.types_roads = r;
																	r.forEach(function(el){ $(".select[data-address-model='type_road']").append('<option value="'+el.id+'">'+el.name+'</option>'); });
																	$(".select[data-address-model='type_road']").selectpicker('refresh');
																}
																FG.api('GET', '/geo_departments', {}, function(r){
																	if(r.length > 0 && r[0].id > 0){
																		self.options.geo_departments = r;
																		r.forEach(function(el){ $(".select[data-address-model='department']").append('<option value="'+el.id+'">'+el.name+'</option>'); });
																		$(".select[data-address-model='department']").selectpicker('refresh');
																	}
																	FG.api('GET', '/types_letters_addresses', {}, function(r){
																		if(r.length > 0 && r[0].id > 0){
																			self.options.types_letters_addresses = r;
																			r.forEach(function(el){ $(".letters-addresses").append('<option value="'+el.id+'">'+el.name+'</option>'); });
																			$(".letters-addresses").selectpicker('refresh');
																		}
																		FG.api('GET', '/types_quadrants', {}, function(r){
																			if(r.length > 0 && r[0].id > 0){
																				self.options.types_quadrants = r;
																				r.forEach(function(el){ $(".quadrants-addresses").append('<option value="'+el.id+'">'+el.name+'</option>'); });
																				$(".quadrants-addresses").selectpicker('refresh');
																			}
																			self.load_scripts();
																		});
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		},
		find: function(){
			var self = this;
		},
		load_citys(){
			var self = this;
			self.address.city = null;
			self.options.geo_citys = [];
			self.$root._mpb("show",{value: [0,50],speed: 0});
			
			$(".select[data-address-model='city']").find('option').remove().end().append('<option value="null"></option>');
			
			FG.api('GET', '/geo_citys', {
				filter: [
					'department,eq,' + self.address.department
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.geo_citys = r;
					r.forEach(function(el){
						$(".select[data-address-model='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					$(".select[data-address-model='city']").selectpicker('refresh');
					self.$root._mpb("show",{value: [0,100],speed: 1 });
				}
			});
		},
		load_plugins_this(){
			var self = this;
			
			
			self.$root._mpb("show",{value: [0,75],speed: 0});
			
			$(".datepicker").datepicker({format: 'yyyy-mm-dd'});
			
			
			self.$root._mpb("show",{value: [0,100],speed: 0});
		},
		repairAddress(){
			var self = this;
			
			temp_min = '';
			temp_full = '';
			
			if(Number(self.address.type_road) > 0){
				temp_type_road = self.options.types_roads.find(road => road.id == self.address.type_road);
				temp_min += temp_type_road.code;
				temp_full += temp_type_road.name;
			};
			
			if(Number(self.address.number_a) > 0){
				temp_min += ' ' + Number(self.address.number_a);
				temp_full += ' ' + Number(self.address.number_a);
			};
			if(Number(self.address.letter_a) > 0){
				temp_letter_a = self.options.types_letters_addresses.find(letter => letter.id == self.address.letter_a);
				temp_min += temp_letter_a.name;
				temp_full += ' ' + temp_letter_a.name;
			};
			if(Number(self.address.quadrant_a) > 0){
				temp_quadrant_a = self.options.types_quadrants.find(quadrant => quadrant.id == self.address.quadrant_a);
				temp_min += ' ' + temp_quadrant_a.name;
				temp_full += ' ' + temp_quadrant_a.name;
			};
			
			temp_min += ' #';
			temp_full += ' #';
			
			if(Number(self.address.number_b) > 0){
				temp_min += ' ' + Number(self.address.number_b);
				temp_full += ' ' + Number(self.address.number_b);
			};
			if(Number(self.address.letter_b) > 0){
				temp_letter_b = self.options.types_letters_addresses.find(letter => letter.id == self.address.letter_b);
				temp_min += temp_letter_b.name;
				temp_full += ' ' + temp_letter_b.name;
			};
			if(Number(self.address.quadrant_b) > 0){
				temp_quadrant_b = self.options.types_quadrants.find(quadrant => quadrant.id == self.address.quadrant_b);
				temp_min += ' ' + temp_quadrant_b.name;
				temp_full += ' ' + temp_quadrant_b.name;
			};
			
			if(Number(self.address.number_c) > 0){
				temp_min += ' - ' + Number(self.address.number_c);
				temp_full += ' - ' + Number(self.address.number_c);
			};
			if(self.address.additional_information != null && self.address.additional_information != ''){
				temp_min += ' ' + self.address.additional_information.toUpperCase();
				temp_full += ' ' + self.address.additional_information.toUpperCase();
			}
			
			if(Number(self.address.city) > 0){
				temp_city = self.options.geo_citys.find(cit => cit.id == self.address.city);
				temp_min += ', ' + temp_city.name.toUpperCase();				
				temp_full += ', ' + temp_city.name.toUpperCase();				
			};
			if(Number(self.address.department) > 0){
				temp_department = self.options.geo_departments.find(depart => depart.id == self.address.department);
				temp_min += ', ' + temp_department.name.toUpperCase();
				temp_full += ', ' + temp_department.name.toUpperCase();
			};
			
			self.address.address_input = temp_min;
			self.address.display_name = temp_full;
			
			if(
				Number(self.address.department) > 0
				&& Number(self.address.city) > 0
				&& Number(self.address.type_road) > 0
				&& Number(self.address.number_a) > 0
				&& Number(self.address.number_b) > 0
				&& Number(self.address.number_c) > 0
			){
				self.geocodeQuery(temp_min);
			}
		},
		GetMap() {
			var self = this;
			self.map = new Microsoft.Maps.Map('#myMap', {
				zoom: 15,
				mapTypeId: Microsoft.Maps.MapTypeId.aerial,
				center: new Microsoft.Maps.Location(4.0000000, -72.0000000)
			});
			
			self.center = self.map.getCenter();
			
			self.pin = new Microsoft.Maps.Pushpin(self.center, {
				title: 'Direccion',
				subTitle: self.address.address_input,
				text: '▼'
			});
			self.map.entities.push(self.pin);
			
			self.load_options();
		},
		geocodeQuery(query) {
			var self = this;
			if (!self.searchManager) {
				Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
					self.searchManager = new Microsoft.Maps.Search.SearchManager(self.map);
					self.geocodeQuery(query);
				});
			} else {
				var searchRequest = {
					where: query,
					callback: function (r) {
						if (r && r.results && r.results.length > 0) {
							self.address.lat = r.results[0].location.latitude;
							self.address.lon = r.results[0].location.longitude;
							self.address.postal_code = r.results[0].address.postalCode;
							self.address.completo = JSON.stringify(r.results[0]);
							
							self.pin.setLocation(new Microsoft.Maps.Location(r.results[0].location.latitude, r.results[0].location.longitude));							
							self.map.setView({ bounds: r.results[0].bestView });
						}
					},
					errorCallback: function (e) {
						$.notify("No se han encontrado resultados.");
					}
				};
				self.searchManager.geocode(searchRequest);
			}
		},
	}
});
