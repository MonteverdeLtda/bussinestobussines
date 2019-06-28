
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
				"account_id": this.$route.params.account_id,
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
								<td>` + el.contact.identification_type.code + `</td>
								<td>` + el.contact.identification_number + `</td>
								<td>` + el.contact.names + `</td>
								<td>` + el.contact.surname + ` ` + el.contact.second_surname + `</td>
								<td>` + el.contact.phone + `</td>
								<td>` + el.contact.mobile + `</td>
								<td>` + el.contact.email + `</td>
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
