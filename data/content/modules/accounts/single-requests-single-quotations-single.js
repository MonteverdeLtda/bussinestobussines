
var PagesAccountsRequestsQuotationsSingleView = Vue.extend({
	template: '#page-accounts-requests-quotations-single-view',
	data: function() {
		return {
			options: {
				status_requests: []
			},
			post: 
			{
			"id": 0,
			"client": {
				"id": 0,
				"type": 0,
				"identification_type": 0,
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
				"represent_legal": 3,
				"contact": 2,
				"audit_enabled": 0
			},
			"request": {
				"id": 0,
				"status": 0,
				"client": 0,
				"contact": {
					"id": 0,
					"identification_type": 0,
					"identification_number": "",
					"first_name": "",
					"second_name": "",
					"surname": "",
					"second_surname": "",
					"birthdaydate": null,
					"phone": "",
					"phone_mobile": "",
					"mail": "",
					"department": {
						"id": 0,
						"name": ""
					},
					"city": {
						"id": 0,
						"name": "",
						"department": 0
					},
					"address": ""
				},
				"addresses": [],
				"request_notes": ""
			},
			"values": [],
			"status": {
				"id": 0,
				"name": "",
				"request_status_continue": 0
			},
			"created": "",
			"updated": "",
			"validity": 0,
			"accept": null
			},
		};
	},
	created: function () {
		var self = this;
		
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });
		self.find();
	},
	methods: {
		find(){
			var self = this;
			FG.api('GET', '/quotations/' + self.$route.params.quotation_id, {
				filter: [
					'account,eq,' + self.$route.params.account_id,
					'request,eq,' + self.$route.params.request_id
				],
				join: [
					'clients',
					'accounts,geo_departments',
					'accounts,geo_citys',
					'requests',
					'requests,contacts',
					'requests,contacts,geo_departments',
					'requests,contacts,geo_citys',
					'status_quotations',
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					a.values = JSON.parse(a.values);
					a.request.addresses = JSON.parse(a.request.addresses);
					self.post = a;
					self.$root._mpb("show", { value: [0, 100], speed: 1 });
				}
			});
		},
	}
});
