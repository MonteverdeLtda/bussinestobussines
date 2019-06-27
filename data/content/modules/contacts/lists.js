
var PagesContactsList = Vue.extend({
	template: '#page-contacts-list',
	data: function() {
		return {
			posts: [],
			DataTable: null,
		};
	},
	created: function () {
		var self = this;
	},
	beforeMount: function () {
		var self = this;
		self.find();
		
	},
	mounted: function () {
		var self = this;
	
		
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/contacts', {
				join: [
					'types_identifications',
					'addresses'
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					// self.posts = r;
					
					$(".datatable tbody").html('');
					r.forEach(function(el){
						direccion = '';
						if(el.address != null && el.address.address_input != undefined){
							direccion = el.address.address_input;
						}
						
						$(".datatable tbody").append(`
							<tr>
								<td>` + el.identification_type.code + `</td>
								<td>` + el.identification_number + `</td>
								<td>` + el.names + `</td>
								<td>` + el.surname + ` ` + el.second_surname + `</td>
								<td>` + el.phone + `</td>
								<td>` + el.mobile + `</td>
								<td>` + el.email + `</td>
								<td>` + direccion + `</td>
								<td>
									<button data-toggle="tooltip" data-placement="top" title="Ver Usuario" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/contacts/view/` + el.id + `';">
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
		delete_row(contact){
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
						FG.api('DELETE','/contacts/' + contact, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								self.find();
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								
								$.notify("Ocurrio un inconveniente al intentar eliminar el contacto!", "error");
							}
						});
					}
				}
			});
		}
	}
});
