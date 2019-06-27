
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
					'account,eq,' + self.$route.params.account_id
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
