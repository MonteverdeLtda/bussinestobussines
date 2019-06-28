
var PagesAccountsEdit = Vue.extend({
	template: '#page-accounts-edit',
	data: function() {
		return {
			options: {
				types_accounts: [],
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
				contacts: [],
			},
			post: {
				id: this.$route.params.account_id,
				type: 0,
				identification_type: 0,
				identification_number: '',
				names: '',
				address_principal: '',
				address_principal_department: 0,
				address_principal_city: 0,
				address_invoices: '',
				address_invoices_department: 0,
				address_invoices_city: 0,
				phone: '',
				mobile: '',
				audit_enabled: 0
			},
			address_principal: {
			  "id": null,
			  "address_input": null,
			  "display_name": null,
			  "department": null,
			  "city": null,
			  "type_road": null,
			  "number_a": null,
			  "letter_a": null,
			  "quadrant_a": null,
			  "number_b": null,
			  "letter_b": null,
			  "quadrant_b": null,
			  "number_c": null,
			  "postal_code": null,
			  "additional_information": null,
			  "lon": null,
			  "lat": null,
			  "completo": {}
			},
			address_invoices: {
			  "id": null,
			  "address_input": null,
			  "display_name": null,
			  "department": null,
			  "city": null,
			  "type_road": null,
			  "number_a": null,
			  "letter_a": null,
			  "quadrant_a": null,
			  "number_b": null,
			  "letter_b": null,
			  "quadrant_b": null,
			  "number_c": null,
			  "postal_code": null,
			  "additional_information": null,
			  "lon": null,
			  "lat": null,
			  "completo": {}
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 1 });
	},
	mounted: function () {
		var self = this;
		self.load_options_selects();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/accounts/' + self.$route.params.account_id, {
				join: []
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					
					$(".select[data-v-model='type']")
						.val(self.post.type)
						.change();
					$(".select[data-v-model='identification_type']")
						.val(self.post.identification_type)
						.change();
					$(".select[data-v-model='address_principal_department']")
						.val(self.post.address_principal_department)
						.change();
					$(".select[data-v-model='address_principal_city']")
						.val(self.post.address_principal_city)
						.change();
					$(".select[data-v-model='address_invoices_department']")
						.val(self.post.address_invoices_department)
						.change();
					$(".select[data-v-model='address_invoices_city']")
						.val(self.post.address_invoices_city)
						.change();
					
					self.$root._mpb("show",{value: [0,100],speed: 0});
				}
			});
		},
		load_options_selects(){
			var self = this;
			self.$root._mpb("show",{value: [0,0],speed: 1});
			
			if($(".mask_phone").length > 0){ $(".mask_phone").mask('(999) 999-9999'); }
			if($(".mask_phone_ext").length > 0){ $(".mask_phone_ext").mask('(99) 999-9999? x99999'); }
			
			FG.api('GET', '/accounts_contacts', {
				join: [
					'contacts',
				]
			}, function(r){
				self.$root._mpb("show",{value: [0,7],speed: 1});
				
				FG.api('GET', '/geo_citys', {
					filter: []
				}, function(r){
					self.$root._mpb("show",{value: [0,50],speed: 0});
					if(r.length > 0 && r[0].id > 0){
						r.forEach(function(el){
							$(".select[data-v-model='address_principal_city']").append('<option value="'+el.id+'">'+el.name+'</option>');
							$(".select[data-v-model='address_invoices_city']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='address_principal_city']").selectpicker('refresh');
						$(".select[data-v-model='address_invoices_city']").selectpicker('refresh');
						self.$root._mpb("show",{value: [0,100],speed: 1});
					}
				});
			});
			
			
			FG.api('GET', '/types_accounts', {}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.types_accounts = r;
					r.forEach(function(el){
						$(".select[data-v-model='type']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					
					$(".select[data-v-model='type']").selectpicker('refresh');
				}
				self.$root._mpb("show",{value: [0,15],speed: 1});
			
				FG.api('GET', '/types_identifications', {}, function(r){
					if(r.length > 0 && r[0].id > 0){
						self.options.types_identifications = r;
						r.forEach(function(el){
							$(".select[data-v-model='identification_type']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='identification_type']").selectpicker('refresh');
						
						self.$root._mpb("show",{value: [0,30],speed: 0});
						
						FG.api('GET', '/geo_departments', {}, function(r){
							if(r.length > 0 && r[0].id > 0){
								self.options.geo_departments = r;
								
								r.forEach(function(el){
									$(".select[data-v-model='address_principal_department']").append('<option value="'+el.id+'">'+el.name+'</option>');
									$(".select[data-v-model='address_invoices_department']").append('<option value="'+el.id+'">'+el.name+'</option>');
								});
								
								$(".select[data-v-model='address_principal_department']").selectpicker('refresh');
								$(".select[data-v-model='address_invoices_department']").selectpicker('refresh');
							}
							self.$root._mpb("show",{value: [0,50],speed: 0});
							self.find();
							self.load_plugins_this();
						});
					}
				});
			});
		},
		load_citys(inputSelect){
			var self = this;
			self.options.geo_departments = [];
			self.$root._mpb("show",{value: [0,0],speed: 0});
			
			if(inputSelect == 'address_principal_department'){
				$(".select[data-v-model='address_principal_city']").find('option').remove().end().append('<option value=""></option>');
				
				FG.api('GET', '/geo_citys', {
					filter: [
						'department,eq,' + self.post.address_principal_department
					]
				}, function(r){
					self.$root._mpb("show",{value: [0,50],speed: 0});
					if(r.length > 0 && r[0].id > 0){
						r.forEach(function(el){
							$(".select[data-v-model='address_principal_city']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='address_principal_city']").selectpicker('refresh');
						self.$root._mpb("show",{value: [0,100],speed: 1});
					}
				});
			}else if(inputSelect == 'address_invoices_department'){
				$(".select[data-v-model='address_invoices_city']").find('option').remove().end().append('<option value=""></option>');
				
				FG.api('GET', '/geo_citys', {
					filter: [
						'department,eq,' + self.post.address_invoices_department
					]
				}, function(r){
					self.$root._mpb("show",{value: [0,50],speed: 0});
					if(r.length > 0 && r[0].id > 0){
						r.forEach(function(el){
							$(".select[data-v-model='address_invoices_city']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[data-v-model='address_invoices_city']").selectpicker('refresh');
						self.$root._mpb("show",{value: [0,100],speed: 1});
					}
				});
			}
		},
		load_plugins_this(){
			var self = this;
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							
							if($(this).data("v-model") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
								if(k=='address_principal_department' || k=='address_invoices_department'){
									self.load_citys(k);
								}
							}
						}
					}
                });
			}
			
			self.$root._mpb("show",{value: [0,75],speed: 0});			
			$(".datepicker").datepicker({format: 'yyyy-mm-dd'});

			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				wrapper: "div.item",
                ignore: [],
                rules: {
					"id": {
						required: true
					},
					"type": {
						required: true
					},
					"identification_type": {
						required: true
					},
					"identification_number": {
						required: true
					},
					"names": {
						required: true
					},
					"address_principal": {
						required: true
					},
					"address_principal_department": {
						required: true
					},
					"address_principal_city": {
						required: true
					},
					"address_invoices": {
						required: true
					},
					"address_invoices_department": {
						required: true
					},
					"address_invoices_city": {
						required: true
					},
					"phone": {
						required: false
					},
					"mobile": {
						required: false
					},
				},
				messages: {
					"id": {
						required: "Ocurrio un problema al detectar el ID de la cuenta, intentalo mas tarde..."
					},
					"type": {
						required: "Selecciona el tipo de cliente que tiene esta cuenta."
					},
					"identification_type": {
						required: "Selecciona el tipo de identificacion que tiene esta cuenta."
					},
					"identification_number": {
						required: "Ingresa el numero de la identificacion que tiene esta cuenta."
					},
					"names": {
						required: "Escribe el nombre de la cuenta o del titular."
					},
					"address_principal": {
						required: "Escribe la direccion principal de la cuenta."
					},
					"address_principal_department": {
						required: "Selecciona el departamento de la direccion principal."
					},
					"address_principal_city": {
						required: "Selecciona la ciudad de la direccion principal."
					},
					"address_invoices": {
						required: "Escribe la direccion principal de la cuenta."
					},
					"address_invoices_department": {
						required: "Selecciona el departamento de la direccion principal."
					},
					"address_invoices_city": {
						required: "Selecciona la ciudad de la direccion principal."
					},
					"represent_legal": {
						required: "Selecciona el represente legal de la cuenta."
					},
					"contact": {
						required: "Selecciona el contacto principal de la cuenta."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){ if (typeof self.post[k] !== 'function') { newContact[k] = self.post[k]; } }
					
					FG.api('GET', '/accounts', {
						filter: [
							'type,eq,' + self.post.type,
							'identification_number,eq,' + self.post.identification_number,
							'identification_type,eq,' + self.post.identification_type
						]
					}, function (a) {
						if(a.length > 0){
							FG.api('PUT', '/accounts/' + self.$route.params.account_id, self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("la cuenta fue actualizada correctamente.!", "success");
								}
							});
						}else{
							$.notify("La cuenta no existe!", "error");
						}
					});
				},
				onsubmit: true
			});
			
			self.$root._mpb("show",{value: [0,100],speed: 0});
			//self.find();
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
								$.notify("la cuenta se elimino con éxito!", "success");
								router.push({
									name: 'page-accounts-list',
									params: {}
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
