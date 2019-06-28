var PagesAccountsList = Vue.extend({
	template: '#page-accounts-list',
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
			FG.api('GET', '/accounts', {
				join: [
					'types_accounts',
					'types_identifications',
					'addresses',
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					// self.posts = r;
						
					
					$(".datatable tbody").html('');
					r.forEach(function(el){
						temp_address_principal = '';
						temp_address_invoices = '';
						if(el.address_principal != null && el.address_principal.id != undefined && Number(el.address_principal.id) > 0){
							temp_address_principal = el.address_principal.address_input;
						}
						if(el.address_invoices != null && el.address_invoices.id != undefined && Number(el.address_invoices.id) > 0){
							temp_address_invoices = el.address_invoices.address_input;
						}
						if(el.phone == null){ el.phone = ''; }
						if(el.mobile == null){ el.mobile = ''; }
						if(el.email == null){ el.email = ''; }
						
					
						$(".datatable tbody").append(`<tr>
							<td>` + el.type.name + `</td>
							<td>` + el.identification_type.name + `</td>
							<td>` + el.identification_number + `</td>
							<td>` + el.names + `</td>
							<td>` + temp_address_principal + `</td>
							<td>` + temp_address_invoices + `</td>
							<td>` + el.phone + `</td>
							<td>` + el.mobile + `</td>
							<td>
								<button data-toggle="tooltip" data-placement="top" title="Ver Cuenta" class="btn btn-default btn-rounded btn-xs" onClick="javascript:window.location.href = 'https://b2b.monteverdeltda.com/#/accounts/view/` + el.id + `';">
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
						FG.api('DELETE','/accounts/' + account, {
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
