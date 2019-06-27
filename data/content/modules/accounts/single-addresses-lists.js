
var PagesAccountsAddressesView = Vue.extend({
	template: '#page-accounts-addresses-view',
	data: function() {
		return {
			posts: [],
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			$(".datatable tbody").html('');
			FG.api('GET', '/accounts_addresses', {
				filter: [
					'account,eq,' + self.$route.params.account_id,
				],
				join: [
					'addresses',
					'addresses,geo_citys',
					'addresses,geo_departments',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					$(".datatable tbody").html('');
					r.forEach(function(el){
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.address.address_input + `</td>
								<td>` + el.address.city.name + `</td>
								<td>` + el.address.department.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Dirección" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/accounts/view/` + self.$route.params.account_id + `/addresses/view/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable").DataTable();
				}
			});
		},
	}
});
