
var PagesAccountsContactsView = Vue.extend({
	template: '#page-accounts-contacts-view',
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
				"represent_legal": {
					"id": 0,
					"identification_type": 0,
					"identification_number": "",
					"first_name": "",
					"second_name": "",
					"surname": "",
					"second_surname": "",
					"birthdaydate": "",
					"phone": "",
					"phone_mobile": "",
					"mail": "",
					"department": 0,
					"city": 0,
					"address": ""
				},
				"contact": {
					"id": 0,
					"identification_type": 0,
					"identification_number": "",
					"first_name": "",
					"second_name": "",
					"surname": "",
					"second_surname": "",
					"birthdaydate": "",
					"phone": "",
					"phone_mobile": "",
					"mail": "",
					"department": 0,
					"city": 0,
					"address": ""
				},
				"audit_enabled": 0,
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
					'accounts_contacts',
					'accounts_contacts,contacts',
					'accounts_contacts,types_contacts',
					'accounts_contacts,contacts,types_identifications',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					self.$root._mpb("show",{value: [0,10],speed: 1});
					$(".datatable-contacts tbody").html('');
					r.accounts_contacts.forEach(function(el){
						console.log(el)
						if(el.type_contact == null){
							el.type_contact = {
								id: 0,
								name: '---'
							};
						}
						$(".datatable-contacts tbody").append(`
							<tr>
								<td>` + el.contact.identification_type.name + `</td>
								<td>` + el.contact.identification_number + `</td>
								<td>` + el.contact.first_name + ` ` + el.contact.second_name + `</td>
								<td>` + el.contact.surname + ` ` + el.contact.second_surname + `</td>
								<td>` + el.contact.phone + `</td>
								<td>` + el.contact.phone_mobile + `</td>
								<td>` + el.contact.mail + `</td>
								<td>` + el.type_contact.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Usuario" class="btn btn-default btn-rounded btn-xs" 
										onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/accounts/view/` + self.$route.params.account_id + `/contacts/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable-contacts").DataTable();
				}
			});
		},
	}
});
