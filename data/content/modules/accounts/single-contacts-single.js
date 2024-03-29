var PagesAccountsContactsSingleView = Vue.extend({
	template: '#page-accounts-contacts-single-view',
	data: function() {
		return {
			options: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				id: this.$route.params.contact_id,
				account: this.$route.params.account_id,
				contact: {
					id: 0,
					identification_type: {
						id: null,
						name: null
					},
					identification_number: null,
					gender: {
						id: null,
						name: null
					},
					names: null,
					surname: null,
					second_surname: '---',
					birthdaydate: null,
					phone: null,
					mobile: null,
					email: null,
					address:  null,
				},
				type_contact: {
					id: 0,
					name: ''
				}
			},
			address: {
				id: null,
				address_input: null,
				display_name: null,
				completo: null,
				lon: null,
				lat: null,
				department: null,
				city: null,
				type_road: null,
				number_a: null,
				letter_a: null,
				quadrant_a: null,
				number_b: null,
				letter_b: null,
				quadrant_b: null,
				number_c: null,
				postal_code: null,
				additional_information: null,
			},
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
		set_type_contact(){
			var self = this;
			FG.api('GET', '/types_contacts', {}, function(r){
				if(r[0] != undefined && r[0].id > 0){
					array = [{
						text: 'Selecciona una opción...',
						value: '',
					}];
					r.forEach(function(el){
						array.push({
							text: el.name,
							value: el.id
						});
					});
					
					bootbox.prompt({
						title: "Seleccione la relaccion nueva del contacto.",
						inputType: 'select',
						inputOptions: array,
						callback: function (result) {
							if(Number(result) > 0){
								FG.api('PUT', '/accounts_contacts/' + self.$route.params.contact_id, {
									id: self.$route.params.contact_id,
									type_contact: result
								}, function(s){
									if(s != undefined && s > 0){
										$.notify("El contacto fue modificado correctamente.!", "success");
										self.find();
									}
								});
							}
						}
					});
				}
			});
			
		},
		find: function(){
			var self = this;
			FG.api('GET', '/accounts_contacts/' + self.$route.params.contact_id, {
				join: [
					'contacts',
					'contacts,types_identifications',
					'contacts,geo_departments',
					'contacts,geo_citys',
					'contacts,types_genders',
					'types_contacts',
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					self.post = a;
					self.$root._mpb("show",{value: [0,10],speed: 1});
				
					if(a.contact.address != undefined && a.contact.address != null && Number(a.contact.address) > 0){
						FG.api('GET', '/addresses/' + a.contact.address, {}, function(b){
							if(b != undefined && b.id > 0){
								self.address = b;
								
							}
						});
					}
				}
				$("input,select,textarea")
					.attr('disabled', 'true')
					.attr('readonly', 'true');
			});
		},
		delete_this(){
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
						FG.api('DELETE','/accounts_contacts/' + self.$route.params.contact_id, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								
								router.push({
									name: 'page-accounts-contacts-view',
									params: {
										account_id: self.$route.params.account_id
									}
								});
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
