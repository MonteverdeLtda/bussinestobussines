
var PagesUsersList = Vue.extend({
	template: '#page-users-list',
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
			FG.api('GET', '/users', {
				join: [
					'permissions',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					$(".datatable tbody").html('');
					r.forEach(function(el){
						el.permissions.data = JSON.parse(el.permissions.data);
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.username + `</td>
								<td>` + el.names + `</td>
								<td>` + el.surname + `</td>
								<td>` + el.second_surname + `</td>
								<td>` + el.phone + `</td>
								<td>` + el.mobile + `</td>
								<td>` + el.mail + `</td>
								<td>` + el.permissions.name + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Usuario" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/users/view/` + el.id + `';">
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
		delete_row(account){
			var self = this;
			bootbox.confirm({
				message: "Estas tratando de realizar cambios irreversibles, antes de realizar dichos cambios debes confirmar por seguridad! Deseas continuar?",
				buttons: {
					confirm: {
						label: 'Si',
						className: 'btn-success'
					},
					cancel: {
						label: 'No',
						className: 'btn-danger'
					}
				},
				callback: function (a) {
					if(a === true){
						FG.api('DELETE','/users/' + account, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								self.find();
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								
								$.notify("Ocurrio un inconveniente al intentar eliminar la cuenta!", "error");
							}
						});
					}
				}
			});
		}
	}
});
