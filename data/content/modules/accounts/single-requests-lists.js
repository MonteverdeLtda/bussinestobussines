
var PagesAccountsRequestsView = Vue.extend({
	template: '#page-accounts-requests-view',
	data: function() {
		return {
			options: {
			},
			post: {
				"id": this.$route.params.request_id,
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
			FG.api('GET', '/requests', {
				join: [
					'status_requests',
					'contacts',
					'requests_addresses',
					'requests_addresses,requests_addresses_services',
				],
				filter: [
					'account,eq,' + self.$route.params.account_id
				],
			}, function(r){
				if(r[0] != undefined && r[0].id > 0){
					$(".datatable tbody").html('');
					r.forEach(function(el){
						total_s = 0;
						el.requests_addresses.forEach(function(el2){
							total_s += el2.requests_addresses_services.length;
						});
						
						
						$(".datatable tbody").append(`
							<tr>
								<td>` + self.$root.zfill(el.id, 5) + `</td>
								<td>` + el.status.name + `</td>
								<td>` + el.contact.names + ` ` + el.contact.surname + ` ` + el.contact.second_surname + `</td>
								<td>Direcciones: ` + el.requests_addresses.length + ' / Servicios: ' + total_s + `</td>
								<td>` + el.request_notes + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Solicitud" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/accounts/view/` + self.$route.params.account_id + `/requests/view/` + el.id + `';">
										<i class="fas fa-eye"></i>
									</button>
								</td>
							</tr>
						`);
					});
					$(".datatable").DataTable();
					
					self.$root._mpb("show",{value: [0,100],speed: 0});
				}
			});
		},
	}
});
