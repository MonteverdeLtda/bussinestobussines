
var PagesAccountsAdd = Vue.extend({
	template: '#page-accounts-add',
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
				type: 0,
				identification_type: 0,
				identification_number: null,
				names: null,
				address_principal: null,
				address_principal_department: null,
				address_principal_city: null,
				address_invoices: null,
				address_invoices_department: null,
				address_invoices_city: null,
				audit_enabled: 0,
				phone: null,
				mobile: null,
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.load_options_selects();
	},
	methods: {
		load_options_selects(){
			var self = this;
			self.$root._mpb("show",{value: [0,0],speed: 1});
			
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
							$(".select[data-v-model='identification_type']").append('<option value="'+el.id+'">' + el.code + ' - ' + el.name + '</option>');
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
			if($(".datepicker").length > 0){ $(".datepicker").datepicker({format: 'yyyy-mm-dd'}); }
			if($(".mask_phone").length > 0){ $(".mask_phone").mask('(999) 999-9999'); }
			if($(".mask_phone_ext").length > 0){ $(".mask_phone_ext").mask('(99) 999-9999? x99999'); }

			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				wrapper: "div.item",
                ignore: [],
                rules: {
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
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							newContact[k] = self.post[k];
						}
					}
					
					FG.api('GET', '/accounts', {
						filter: [
							'type,eq,' + self.post.type,
							'identification_number,eq,' + self.post.identification_number,
							'identification_type,eq,' + self.post.identification_type
						]
					}, function (a) {
						if(a.length > 0){
							$.notify("La cuenta ya existe!", "error");
						}else{
							FG.api('POST', '/accounts', self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("la cuenta fue creada correctamente.!", "success");
									router.push({
										name: 'page-accounts-view',
										params: {
											account_id: b
										}
									});
								}
							});
						}
					});
				},
				onsubmit: true
			});
			
			self.$root._mpb("show",{value: [0,100],speed: 0});
		}
	}
});
