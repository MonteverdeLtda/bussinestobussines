
var PagesEmployeesSingleEdit = Vue.extend({
	template: '#page-employees-single-edit',
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
				types_genders: [],
				funds_pensions: [],
				funds_compensations: [],
				funds_severances: [],
				geo: {
					departments: [],
					citys: [],
				},
			},
			post: {
				"id": this.$route.params.employee_id,
				"first_name": null,
				"second_name": null,
				"surname": null,
				"second_surname": null,
				"identification_type": 0,
				"identification_number": null,
				"identification_date_expedition": null,
				"birthdate": null,
				"blood_type": 0,
				"blood_rh": 0,
				"mail": null,
				"number_phone": null,
				"number_mobile": null,
				"company_date_entry": null,
				"company_date_out": null,
				"company_mail": null,
				"company_number_phone": null,
				"company_number_mobile": null,
				"avatar": null,
				"status": 0,
				"eps": 0,
				"arl": 0,
				"pension_fund": 0,
				"compensation_fund": 0,
				"severance_fund": 0,
				"department": 0,
				"city": 0,
				"address": null,
				"observations": null,
				"bank": 0,
				"bank_type": 0,
				"bank_number": null,
				"eps_active": false,
				"arl_active": false,
				"compensation_fund_active": false,
				"pension_fund_active": false,
				"gender": 0,
			},
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show", {value: [0,0], speed: 1 });
		
		self.load_scripts();
	},
	methods: {
		load_options: function(){
			var self = this;
			
			FG.api('GET', '/types_identifications', {}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.types_identifications = r;
					r.forEach(function(el){
						$(".select[name='identification_type']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					// $(".select[name='identification_type']").selectpicker('refresh');
				}
				FG.api('GET', '/types_bloods', {}, function(r){
					if(r.length > 0 && r[0].id > 0){
						self.options.types_bloods = r;
						r.forEach(function(el){
							$(".select[name='blood_type']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						// $(".select[name='blood_type']").selectpicker('refresh');
					}					
					FG.api('GET', '/types_bloods_rhs', {}, function(r){
						if(r.length > 0 && r[0].id > 0){
							self.options.types_bloods_rhs = r;
							r.forEach(function(el){
								$(".select[name='blood_rh']").append('<option value="'+el.id+'">'+el.name+'</option>');
							});
							// $(".select[name='blood_rh']").selectpicker('refresh');
						}
						FG.api('GET', '/status_employees', {}, function(r){
							if(r.length > 0 && r[0].id > 0){
								self.options.status_employees = r;
								r.forEach(function(el){
									$(".select[name='status']").append('<option value="'+el.id+'">'+el.name+'</option>');
								});
								// $(".select[name='status']").selectpicker('refresh');
							}
							FG.api('GET', '/types_eps', {}, function(r){
								if(r.length > 0 && r[0].id > 0){
									self.options.types_eps = r;
									r.forEach(function(el){
										$(".select[name='eps']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+' - '+el.admin+'</option>');
									});
									// $(".select[name='eps']").selectpicker('refresh');
								}
								FG.api('GET', '/types_arls', {}, function(r){
									if(r.length > 0 && r[0].id > 0){
										self.options.types_arls = r;
										r.forEach(function(el){
											$(".select[name='arl']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+' - '+el.admin+'</option>');
										});
										// $(".select[name='arl']").selectpicker('refresh');
									}
									FG.api('GET', '/funds_pensions', {}, function(r){
										if(r.length > 0 && r[0].id > 0){
											self.options.funds_pensions = r;
											r.forEach(function(el){
												$(".select[name='pension_fund']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+' - '+el.admin+'</option>');
											});
											// $(".select[name='pension_fund']").selectpicker('refresh');
										}
										FG.api('GET', '/funds_compensations', {}, function(r){
											if(r.length > 0 && r[0].id > 0){
												self.options.funds_compensations = r;
												r.forEach(function(el){
													$(".select[name='compensation_fund']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+' - '+el.admin+'</option>');
												});
												// $(".select[name='compensation_fund']").selectpicker('refresh');
											}
											FG.api('GET', '/funds_severances', {}, function(r){
												if(r.length > 0 && r[0].id > 0){
													self.options.funds_severances = r;
													r.forEach(function(el){
														$(".select[name='severance_fund']").append('<option value="'+el.id+'">'+el.code+' - '+el.name+' - '+el.admin+'</option>');
													});
													// $(".select[name='severance_fund']").selectpicker('refresh');
												}
												FG.api('GET', '/geo_departments', {}, function(r){
													if(r.length > 0 && r[0].id > 0){
														self.options.geo.departments = r;
														r.forEach(function(el){
															$(".select[name='department']").append('<option value="'+el.id+'">'+el.name+'</option>');
														});
														// $(".select[name='department']").selectpicker('refresh');
													}
													FG.api('GET', '/geo_citys', {}, function(r){
														if(r.length > 0 && r[0].id > 0){
															self.options.geo.citys = r;
															r.forEach(function(el){
																$(".select[name='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
															});
															// $(".select[name='department']").selectpicker('refresh');
														}
														FG.api('GET', '/banks', {}, function(r){
															if(r.length > 0 && r[0].id > 0){
																self.options.banks = r;
																r.forEach(function(el){
																	$(".select[name='bank']").append('<option value="'+el.id+'">'+el.name+'</option>');
																});
																// $(".select[name='bank']").selectpicker('refresh');
															}
															FG.api('GET', '/types_banks', {}, function(r){
																if(r.length > 0 && r[0].id > 0){
																	self.options.types_banks = r;
																	r.forEach(function(el){
																		$(".select[name='bank_type']").append('<option value="'+el.id+'">'+el.name+'</option>');
																	});
																	//$(".select[name='bank_type']").selectpicker('refresh');
																}
																FG.api('GET', '/types_genders', {}, function(r){
																	if(r.length > 0 && r[0].id > 0){
																		self.options.types_genders = r;
																		r.forEach(function(el){
																			$(".select[name='gender']").append('<option value="'+el.id+'">'+el.name+'</option>');
																		});
																		//$(".select[name='gender']").selectpicker('refresh');
																	}
																	self.find();
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
		load_scripts(){
			var self = this;
			if($(".select").length > 0){
                // $(".select").selectpicker();
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).attr("name") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
								
							}
						}
					}
                });
			}
			
			$("input").on("change", function(){
				for (var k in self.post){
					if (typeof self.post[k] !== 'function') {
						if($(this).attr("name") == k && self.post[k] != $(this).val()){
							// self.post[k] = $(this).val();
						}
					}
				}
			});
			
			$("select").on("change", function(){
				for (var k in self.post){
					if (typeof self.post[k] !== 'function') {
						if($(this).attr("name") == k && self.post[k] != $(this).val()){
							self.post[k] = $(this).val();
							if(k == 'department'){
								self.changeCity();
							}
						}
					}
				}
			});
			
			if($(".mask_date").length > 0){ $(".mask_date").datepicker({format: 'yyyy-mm-dd'}); }
			if($(".mask_phone").length > 0){ $(".mask_phone").mask('(999) 999-9999'); }
			if($(".mask_phone_ext").length > 0){ $(".mask_phone_ext").mask('(99) 999-9999? x99999'); }
			
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
					department: { 
						required: true
					},
					city: { 
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
					company_date_entry: { 
						required: false
					},
					company_date_out: { 
						required: false
					},
					company_mail: { 
						required: false
					},
					company_number_phone: { 
						required: false
					},
					company_number_mobile: { 
						required: false
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
					eps_active: {
						required: false
					},
					arl_active: {
						required: false
					},
					severance_fund_active: {
						required: false
					},
					compensation_fund_active: {
						required: false
					},
					pension_fund_active: {
						required: false
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
					department: { 
						required: "Ingresa el departamento de residencia del empleado."
					},
					city: { 
						required: "Ingresa la cuidad de residencia del empleado."
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
					eps_active: {
						required: ""
					},
					arl_active: {
						required: ""
					},
					severance_fund_active: {
						required: ""
					},
					compensation_fund_active: {
						required: ""
					},
					pension_fund_active: {
						required: ""
					},
				},
				submitHandler: function() {
					var messages = this.settings.messages;
					var rules = this.settings.rules;
					
					newContact = {};
					newContact.id = self.$route.params.employee_id;
					for(var k in rules){
						if (typeof rules[k] !== 'function') {
							if(rules[k].required == true){
								if(self.post[k] == null || self.post[k].length <= 0){
									$.notify(messages[k].required, "error");
									return false;
								}else{
									newContact[k] = self.post[k];
								}
							}
						}
					}
					
					FG.api('GET', '/employees/'+ self.$route.params.employee_id, {}, function(r){
						if(r != undefined && r.id > 0){
							target = self.post;
							update = {};
							
							for(var k in target){
								if (typeof target[k] !== 'function') {
									update[k] = (target[k]);
									if (typeof target[k] === 'boolean') {
										self.post[k] = Number(target[k]);
									}
								}
							}
							
							console.log(self.post);
							FG.api('PUT', '/employees/'+ self.$route.params.employee_id, self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("El empleado guardado correctamente.", "success");
									self.find();
								}else{
									$.notify("Hubo un problema creando el empleado.", "error");
									self.find();
								}
							});
						}else{
							$.notify("El empleado no existe.", "error");
							router.push({
								name: 'page-employees-list',
								params: {}
							});
						}
					});
				},
				onsubmit: true
			});
			
			self.load_options();
		},
		find: function(){
			var self = this;
			
			FG.api('GET', '/employees/' + self.$route.params.employee_id, { }, function(r){ if(r != undefined && r.id > 0){ self.post = r; } });
		},
		changeCity(){
			var self = this;
			$(".select[name='city']").html('');
			$(".select[name='city']").html('<option value="null"></option>');
			FG.api('GET', '/geo_citys', {
				filter: [
					'department,eq,' + self.post.department
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.geo.citys = r;
					r.forEach(function(el){
						$(".select[name='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					// $(".select[name='city']").selectpicker('refresh');
				}
			});
		},
		delete_employee(){
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
						FG.api('DELETE','/employees/' + self.$route.params.employee_id, {
						}, function(b){
							if(b == true)
							{
								$.notify("Se elimino con éxito!", "success");
								router.push({
									name: 'page-employees-list',
									params: {}
								});
							}else{
								if(r.data.message && r.data.message != ''){
									$.notify(r.data.message, "error");
								}
								
								$.notify("Ocurrio un inconveniente al intentar eliminar la cuenta!", "error");
							}
						});
					}
				}
			});
		}
	}
});
