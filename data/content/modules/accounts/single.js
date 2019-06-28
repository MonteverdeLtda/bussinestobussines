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
				"address_principal": 0,
				"address_invoices": 0,
				"audit_enabled": 0,
				"phone": 0,
				"mobile": 0,
				"accounts_contacts": [],
			},
			address_principal: {
			  "id": null,
			  "address_input": null,
			  "display_name": null,
			  "department": null,
			  "city": null,
			  "type_road": null,
			  "number_a": null,
			  "letter_a": null,
			  "quadrant_a": null,
			  "number_b": null,
			  "letter_b": null,
			  "quadrant_b": null,
			  "number_c": null,
			  "postal_code": null,
			  "additional_information": null,
			  "lon": null,
			  "lat": null,
			  "completo": {}
			},
			address_invoices: {
			  "id": null,
			  "address_input": null,
			  "display_name": null,
			  "department": null,
			  "city": null,
			  "type_road": null,
			  "number_a": null,
			  "letter_a": null,
			  "quadrant_a": null,
			  "number_b": null,
			  "letter_b": null,
			  "quadrant_b": null,
			  "number_c": null,
			  "postal_code": null,
			  "additional_information": null,
			  "lon": null,
			  "lat": null,
			  "completo": {}
			},
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.load_scripts();
	},
	methods: {
		load_scripts(){
			var self = this;
			
			self.find();
		},
		find(){
			var self = this;
			FG.api('GET', '/accounts/' + self.$route.params.account_id, {
				join: [
					'types_accounts',
					'types_identifications',
				]
			}, function(a){ 
				if(a != undefined && a.id > 0){
					self.post = a;
				}
				
				if(self.post.address_principal != null && Number(self.post.address_principal) > 0){
					FG.api('GET', '/addresses/' + self.post.address_principal, {
					}, function(b){
						if(b != undefined && b.id > 0){
							self.address_principal = b;
						}
						
						if(self.post.address_invoices != null && Number(self.post.address_invoices) > 0){
							FG.api('GET', '/addresses/' + self.post.address_invoices, {
							}, function(c){
								if(c != undefined && c.id > 0){
									self.address_invoices = c;
								}
								
								$("input,select,textarea")
									.attr('disabled', 'true')
									.attr('readonly', 'true');
							});
						}
					});
				}
			});
			
			
		},
	}
});
