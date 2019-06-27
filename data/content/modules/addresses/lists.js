
var PagesAddressesList = Vue.extend({
	template: '#page-addresses-list',
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
			FG.api('GET', '/addresses', {
				join: [
					'geo_citys',
					'geo_departments',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					$(".datatable tbody").html('');
					r.forEach(function(el){
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.display_name + `</td>
								<td>` + el.city.name + `</td>
								<td>` + el.department.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Dirección" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/addresses/view/` + el.id + `';">
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
