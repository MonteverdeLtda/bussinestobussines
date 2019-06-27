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
				"client": this.$route.params.account_id,
				"contact": 0,
				"request_notes": "",
				"requests_addresses": [],
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
		addAddress(address_index){
			var self = this;
			//address = self.options.addresses.find( address => address.id === Number(address_id) );
			address = self.options.addresses[address_index];
			if(address != undefined){
				address.requests_addresses_services = [];
				self.post.requests_addresses.push(address);
				self.options.addresses.splice(address_index, 1);
			}
		},
		removeAddress(address_index){
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
							self.post.requests_addresses[address_index].requests_addresses_services = [];
							self.options.addresses.push(self.post.requests_addresses[address_index]);
							self.post.requests_addresses.splice(address_index, 1);
						}
					}
				}
			});
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
							console.log(exist);
							if(exist === undefined){
								self.post.requests_addresses[address_index].requests_addresses_services.splice(i, 1);
							}
							i++;
						});
						
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
							if(self.post.client > 0 && self.post.contact > 0 && self.post.requests_addresses.length > 0){
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
