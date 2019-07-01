var PagesAccountsRequestsAdd = Vue.extend({
	template: '#page-accounts-requests-add',
	data: function() {
		return {
			services: [],
			options: {
				addresses: [],
				contacts: [],
				services: [],
			},
			post: {
				"account": this.$route.params.account_id,
				"contact": 0,
				"request_notes": "",
				"requests_addresses": [],
			},
			jvalidate: null,
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
		seletedActive(address){
			var self = this;
			if(address.id != undefined){
				search_exist = self.post.requests_addresses.find(addr => addr.id == address.id);
				if(search_exist != undefined){
					return 'fas fa-check';
				}else{
					return 'fas fa-times';
				}
			}
		},
		load_scripts(){
			var self = this;
			
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
							contact: {
								required: true,
							},
							"requests_addresses[]": {
								required: true,
								
							},
							request_notes: {
								required: false
							}
						},
						messages: {
							contact: {
								required: "Seleccione un contacto de la lista",
							},
							"requests_addresses[]": {
								required: "Seleccione minimo 1 dirección"
							},
						},
						submitHandler: function() {
							if(self.post.account > 0 && self.post.contact > 0 && self.post.requests_addresses.length > 0){
								suma_a = 0;
								total_a = self.post.requests_addresses.length;
								total_s = 0;
								suma_s = 0;
								
								process = true;
								self.post.requests_addresses.forEach(function(address){
									if(address.id != undefined && address.requests_addresses_services.length > 0){
										total_s += address.requests_addresses_services.length;
										if(address.requests_addresses_services.length == 0){ total_s += 1; }
										address.requests_addresses_services.forEach(function(service){
											if(service.id != undefined){
												suma_a++;
												suma_s++;
											}else{
												$.notify("Hay una direccion sin servicios.", "error");
												process = false;
											}
										});
									}else{
										$.notify("Hay una direccion sin servicios.", "error");
										process = false;
									}									
								});
									
								if(process == true){
									self.saveRequest();
								}
								
							}else{
								$.notify("Complete el formulario correctamente.", "error");
							};
						}
					});
                }
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
            };
			self.load_options_selects();
		},
		load_options_selects(){
			var self = this;
			FG.api('GET', '/accounts_contacts', {
				join: [
					'contacts'
				],
				filter: [
					'account,eq,' + self.$route.params.account_id,
				]
			}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					a.forEach(function(b){
						self.options.contacts.push(b.contact);
					});
				}
				FG.api('GET', '/accounts_addresses', {
					join: [
						'addresses'
					],
					filter: [
						'account,eq,' + self.$route.params.account_id,
					]
				}, function(c){
					if(c[0] != undefined && c[0].id > 0){
						c.forEach(function(d){
							d.address.completo = JSON.parse(d.address.completo);
							d.address.requests_addresses_services = [];
							self.options.addresses.push(d.address);
						});
					}
					FG.api('GET', '/services', {
					}, function(e){
						if(e[0] != undefined && e[0].id > 0){
							self.services = e;
							e.forEach(function(f){
								self.options.services.push({
									text: f.name,
									value: f.id,
								});
							});
						}
					});
				});
			});
		},
		toggleAddress(address_index){
			var self = this;
			address = self.options.addresses[address_index];
			if(address != undefined){
				address.requests_addresses_services = [];
				search_exist = self.post.requests_addresses.find(addr => addr.id == address.id);
				
				if(search_exist == undefined){
					self.post.requests_addresses.push(address);
				}else{
					position = self.post.requests_addresses.indexOf(address, 0)
					self.post.requests_addresses.splice(position, 1);
				}
			}
		},
		addServicesInAddress(address_index){
			var self = this;
			valuesSelects = [];
			self.post.requests_addresses[address_index].requests_addresses_services.forEach(function(a){
				valuesSelects.push(a.id);
			});
			if(self.post.requests_addresses[address_index] != undefined){
				bootbox.prompt({
					title: "This is a prompt with a set of checkbox inputs!",
					value: valuesSelects,
					inputType: 'checkbox',
					inputOptions: self.options.services,
					callback: function (b) {
						if(b != null && b.length > 0){
							services_temp = [];
							b.forEach(function(c){
								info = self.services.find( d => d.id === Number(c) );
								exist = self.post.requests_addresses[address_index].requests_addresses_services.find(e => e.id === Number(c));
								if(info != undefined && exist === undefined){
									self.post.requests_addresses[address_index].requests_addresses_services.push(info);
								}
							});
							
							i = 0;
							self.post.requests_addresses[address_index].requests_addresses_services.forEach(function(f){
								id_t = f.id.toString()
								exist = b.find( fruta => fruta.toString() === id_t );
								if(exist === undefined){
									self.post.requests_addresses[address_index].requests_addresses_services.splice(i, 1);
								}
								i++;
							});
						}
					}
				});
				
			}
		},
		removeServicesInAddress(address_index, service_index){
			var self = this;
			bootbox.confirm({
				message: "Va eliminar la direccion y su contenido, antes de realizar dichos cambios debes confirmar por seguridad! Deseas continuar?",
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
						if(self.post.requests_addresses[address_index] != undefined){
							if(self.post.requests_addresses[address_index].requests_addresses_services[service_index] != undefined){
								self.post.requests_addresses[address_index].requests_addresses_services.splice(service_index, 1);
							}
						}
					}
				}
			});
		},
		saveRequest(){
			var self = this;
			bootbox.confirm({
				message: "Vas enviar la solicitud para comenzar su tramite, estas seguro de continuar?",
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
						if(self.post.requests_addresses.length <= 0){
							$.notify("No existen direcciones en la solicitud.", "error");
						}else{
							self.post.requests_addresses.forEach(function(b){
								if(b.requests_addresses_services.length <= 0){
									$.notify("Hay direcciones sin servicios, Debes eliminarlas o agregar servicios.", "error");
								}
							});
							if(self.post.account > 0 && self.post.contact > 0 && self.post.requests_addresses.length > 0){
								FG.api('POST', '/requests', {
									account: self.$route.params.account_id,
									contact: self.post.contact,
									request_notes: self.post.request_notes
								}, function (c) {
									if(Number(c) > 0){
										$.notify("Generando solicitud, espere...", "warn");
										self.post.requests_addresses.forEach(function(d){
											FG.api('POST', '/requests_addresses', {
												request: c,
												address: d.id,
											}, function (e) {
												if(Number(e) > 0){
													d.requests_addresses_services.forEach(function(d){
														FG.api('POST', '/requests_addresses_services', {
															request_address: e,
															service: d.id,
														}, function (b) {
															if(Number(b) > 0){
																$.notify("servicio añadido!", "info");
															}else{
																$.notify("Ocurrio un error al añadir un servicio a la solicitud.", "error");
															}
														});
													});
													$.notify("Solicitud Creada con exito!", "success");
												}else{
													$.notify("Ocurrio un error al intentar añadir una direccion y sus servicios.", "error");
												}
											});
										});
										
										router.push({
											name: 'page-accounts-requests-single-view',
											params: {
												account_id: self.$route.params.account_id,
												request_id: c
											}
										});
									}else{
										$.notify("Ocurrio un error al intentar crear la solicitud.", "error");
									}
								});
							}else{
								$.notify("Los datos estan incompletos.", "error");
							}
						}
					}
				}
			});
		},
	}
});
