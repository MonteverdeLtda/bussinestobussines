
var PagesEmployeesList = Vue.extend({
	template: '#page-employees-list',
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
			FG.api('GET', '/employees', {
				join: [
					'types_identifications',
					'types_bloods_rhs',
					'types_bloods',
					'status_employees',
					'types_eps',
					'types_arls',
					'funds_pensions',
					'funds_compensations',
					'funds_severances',
					'geo_departments',
					'geo_citys',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					$(".datatable tbody").html('');
					r.forEach(function(el){
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.identification_type.name + `</td>
								<td>` + el.identification_number + `</td>
								
								<td>` + el.first_name + ' ' + el.second_name + ' ' + el.surname + ' ' + el.second_surname + `</td>								
								<td>` + el.birthdate + `</td>
								<td>` + el.blood_type.name + `</td>
								<td>` + el.blood_rh.name + `</td>
								<td>` + el.status.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Empleado" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/employees/view/` + el.id + `';">
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
