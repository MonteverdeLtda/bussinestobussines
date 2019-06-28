var PagesContactsListAccounts = Vue.extend({
	template: '#page-contacts-list-accounts',
	data: function() {
		return {
			options: {
				contacts: [],
			},
			posts: [],
		};
	},
	created: function () {
		var self = this;
		self.load_options_selects();
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		load_options_selects(){
			var self = this;
			self.options.contacts.push({
				text: 'Seleccione un a opción...',
				value: '',
			});
			FG.api('GET', '/contacts', {}, function(r){ if(r.length > 0 && r[0].id > 0){
				r.forEach(function(elm){
					self.options.contacts.push({
						text: elm.identification_number + ' - ' + elm.first_name + ' ' + elm.second_name + ' ' + elm.surname + ' ' + elm.second_surname,
						value: elm.id,
					});
				});
			} });
		},
		getClassActiveIndex(index){
			if(index === 0){ return 'active'; } 
			else { return 'e'; }
		},
		getClassActivePanelIndex(index){
			if(index === 0){
				return 'tab-pane active';
			}else{
				return 'tab-pane';
			}
		},
		addContactToAccount: function(account){
			var self = this;
			bootbox.prompt({
				title: "Seleccione el contacto...",
				inputType: 'select',
				inputOptions: self.options.contacts,
				callback: function (rs) {
					if(rs != null && rs > 0){
						FG.api('POST', '/accounts_contacts', {
							account: account,
							contact: rs
						}, function (b) {
							if(Number(b) > 0)
							{
								$.notify("El contacto fue creado correctamente.!", "success");
								self.find();
							}else{
								$.notify("Ocurrio un error al intentar crear el contacto.", "error");
							}
						});
					}
				}
			});
		},
		find: function(){
			var self = this;
			
			FG.api('GET', '/accounts', {
				join: [
					'accounts_contacts',
					'accounts_contacts,contacts',
					'types_identifications',
					'accounts_contacts,contacts,types_identifications',
					'accounts_contacts,types_contacts'
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					console.log(r);
					self.posts = r;
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
						FG.api('DELETE','/accounts_contacts/' + contact, {
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