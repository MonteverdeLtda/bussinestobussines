var PagesContactsListAccountsAddContactToAccount = Vue.extend({
	template: '#page-contacts-list-accounts-add-contact-to-account',
	data: function() {
		return {
			options: {
				contacts: [],
				types_contacts: [],
			},
			post: {
				account: this.$route.params.account_id,
				contact: 0,
				type_contact: 0
			},
			jvalidate: null
		};
	},
	created: function () {
		var self = this;
		self.load_options_selects();
	},
	mounted: function () {
		var self = this;
		self.load_plugins_this();
	},
	methods: {
		load_options_selects(){
			var self = this;
			
			FG.api('GET', '/contacts', {}, function(r){ if(r.length > 0 && r[0].id > 0){
				r.forEach(function(el){
					$(".select[data-v-model='contact']").append('<option value="' + el.id + '">' + 
					el.identification_number + ' - ' +
					el.names + ' ' +
					el.surname + ' ' +
					el.second_surname 
					+ '</option>');
				});
				$(".select[data-v-model='contact']").selectpicker('refresh');
				
				FG.api('GET', '/types_contacts', {}, function(r){ if(r.length > 0 && r[0].id > 0){
					r.forEach(function(elm){
						$(".select[data-v-model='type_contact']").append('<option value="' + elm.id + '">' + elm.name + '</option>');
					});
					$(".select[data-v-model='type_contact']").selectpicker('refresh');
				} });
			} });
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
								
							}else{
								$.notify("Ocurrio un error al intentar crear el contacto.", "error");
							}
						});
					}
				}
			});
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
							}
						}
					}
                });
			}
			
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				//wrapper: "div.alert.alert-danger",
				wrapper: "div.item",
				//errorContainer: ".form-group",
                ignore: [],
                rules: {
					"client": {
						required: true
					},
					"contact": {
						required: true
					},
					"type_contact": {
						required: true
					},
				},
				messages: {
					"client": {
						required: "El cliente no fue detectado, actualice la página e intente nuevamente."
					},
					"contact": {
						required: "Seleccione el contacto que va desea añadir."
					},
					"type_contact": {
						required: "Seleccione el tipo de relación que tiene el contacto con la cuenta o con el titular."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							newContact[k] = self.post[k];
						}
					}
					
					FG.api('GET', '/accounts_contacts', {
						filter: [
							'account,eq,' + self.$route.params.account_id,
							'contact,eq,' + self.post.contact
						]
					}, function (a) {
						if(a.length > 0){
							$.notify("El contacto ya existe!", "error");
						}else{
							FG.api('POST', '/accounts_contacts', self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("El contacto fue creado correctamente.!", "success");
								}
							});
						}
					});
				},
				onsubmit: true
			});
		},
	}
});
