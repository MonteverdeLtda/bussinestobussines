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
				"requests_activity": [],
				"requests_addresses": []
			},
			calc: {
				current_budget: 0
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
					self.$root._mpb("show", { value: [0, 100], speed: 1 });
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
