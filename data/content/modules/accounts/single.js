
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
				"audit_enabled": 0,
				"phone": 0,
				"mobile": 0,
				"accounts_contacts": [],
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
			FG.api('GET', '/accounts/' + self.$route.params.account_id, {
				join: [
					'types_accounts',
					'types_identifications',
					'geo_departments',
					'geo_citys',
					'contacts',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
				}
			});
		},
	}
});
