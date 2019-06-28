
var PagesAccountsAdd = Vue.extend({
	template: '#page-accounts-add',
	data: function() {
		return {
			options: {
				types_accounts: [],
				types_quadrants: [],
				types_letters_addresses: [],
				types_identifications: [],
				types_roads: [],
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
				address_invoices: null,
				audit_enabled: 0,
				phone: null,
				mobile: null,
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
			  "completo": null
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
			  "completo": null
			},
			jvalidate: null,
			jvalidate2: null,
			map: null,
			pin: null,
			center: null,
			address_selected: 'address_principal',
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
			self.$root._mpb("show",{value: [0,0],speed: 0});
			
			FG.api('GET', '/types_identifications', {}, function(a){
				if(a.length > 0 && a[0].id > 0){
					self.options.types_identifications = a;
					a.forEach(function(el){
						$(".select[name='identification_type']").append('<option value="'+el.id+'">' + el.code + ' - ' + el.name + '</option>');
					});
					$(".select[name='identification_type']").selectpicker('refresh');
				}
				
				FG.api('GET', '/types_roads', {}, function(c){
					if(c.length > 0 && c[0].id > 0){
						self.options.types_roads = c;
						c.forEach(function(el){ $(".select[name='type_road']").append('<option value="'+el.id+'">'+el.name+'</option>'); });
						$(".select[name='type_road']").selectpicker('refresh');
					}
					
					FG.api('GET', '/geo_departments', {}, function(d){
						if(d.length > 0 && d[0].id > 0){
							self.options.geo_departments = d;
							d.forEach(function(el){ $(".select[name='department']").append('<option value="'+el.id+'">'+el.name+'</option>'); });
							$(".select[name='department']").selectpicker('refresh');
						}
						
						FG.api('GET', '/types_letters_addresses', {}, function(e){
							if(e.length > 0 && e[0].id > 0){
								self.options.types_letters_addresses = e;
								e.forEach(function(el){ $(".letters-addresses").append('<option value="'+el.id+'">'+el.name+'</option>'); });
								$(".letters-addresses").selectpicker('refresh');
							}
							
							FG.api('GET', '/types_quadrants', {}, function(f){
								if(f.length > 0 && f[0].id > 0){
									self.options.types_quadrants = f;
									f.forEach(function(el){ $(".quadrants-addresses").append('<option value="'+el.id+'">'+el.name+'</option>'); });
									$(".quadrants-addresses").selectpicker('refresh');
								}
								FG.api('GET', '/types_accounts', {}, function(g){
									console.log(g);
									if(g.length > 0 && g[0].id > 0){
										self.options.types_accounts = g;
										g.forEach(function(el){
											$(".select[data-v-model='type']").append('<option value="'+el.id+'">'+el.name+'</option>');
										});
										
										$(".select[data-v-model='type']").selectpicker('refresh');
										
										self.$root._mpb("show",{value: [0,50],speed: 1});
										self.load_plugins_this();
									}
									
								});
							});
						});
					});
				});
				
			});
			
		},
		load_citys(){
			var self = this;
			console.log('load_citys')
			address_selected = self.address_selected;
			console.log(self.address_selected)
			console.log(self[self.address_selected])
			self[address_selected].city = null;
			self.options.geo_citys = [];
			self.$root._mpb("show",{value: [0,0],speed: 0});
			
			$(".select[name='city']").find('option').remove().end().append('<option value="null"></option>');
			
			console.log(self[address_selected].department);
			
			FG.api('GET', '/geo_citys', {
				filter: [
					'department,eq,' + self[address_selected].department
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.geo_citys = r;
					r.forEach(function(el){
						$(".select[name='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					$(".select[name='city']").selectpicker('refresh');
					self.$root._mpb("show",{value: [0,100],speed: 1 });
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
							if($(this).attr("name") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
							}
						}
					}
					
                });
			}
			
			$("input,select,textarea").on("change", function(){
				for(var k in self.post){
					if (typeof self.post[k] !== 'function') {
						if($(this).attr("name") == k && self.post[k] != $(this).val()){
							self.post[k] = $(this).val();
						}
					}
				}
				
				address_selected = self.address_selected;
				k = $(this).attr('name');
				v = $(this).val();
				self[address_selected][k] = v;
				
					if(k=='department'){ self.load_citys(); }
					self.repairAddress();
			});
			
			if($(".mask_phone").length > 0){ $(".mask_phone").mask('(999) 999-9999'); }
			if($(".mask_phone_ext").length > 0){ $(".mask_phone_ext").mask('(99) 999-9999? x99999'); }
			
			$(document).on("click", ".open-modal_basic", function(){
				 address_selected = $(this).data('address-selected');
				 console.log(address_selected);
				 self.address_selected = address_selected;
				 
				$("#jvalidate2 .select")
					.val(null)
					.change();
				 document.getElementById('jvalidate2').reset();
				 $('#modal_basic').modal('show');
				 
			});


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
			
			
			self.jvalidate2 = $("#jvalidate2").validate({
				debug: true,
				errorLabelContainer: "#messageBox-2",
				wrapper: "div.item",
                ignore: [],
                rules: {
					address_selected: {
						required: true
					},
					address_input: {
						required: true
					},
					display_name: {
						required: true
					},
					department: {
						required: true
					},
					city: {
						required: true
					},
					type_road: {
						required: true
					},
					number_a: {
						required: true
					},
					letter_a: {
						required: false
					},
					quadrant_a: {
						required: false
					},
					number_b: {
						required: true
					},
					letter_b: {
						required: false
					},
					quadrant_b: {
						required: false
					},
					number_c: {
						required: true
					},
					postal_code: {
						required: false
					},
					additional_information: {
						required: false
					},
					lon: {
						required: true
					},
					lat: {
						required: true
					},
				},
				messages: {
					address_selected: {
						required: "Recarga la página e intenta nuevamente."
					},
					address_input: {
						required: "Completa la direccion."
					},
					display_name: {
						required: "Completa la direccion."
					},
					department: {
						required: "Selecciona el departamento."
					},
					city: {
						required: "Selecciona la ciudad."
					},
					type_road: {
						required: "Selecciona el tipo de vía."
					},
					number_a: {
						required: "Ingrese el numero."
					},
					letter_a: {
						required: ""
					},
					quadrant_a: {
						required: ""
					},
					number_b: {
						required: "Ingrese el numero."
					},
					letter_b: {
						required: ""
					},
					quadrant_b: {
						required: ""
					},
					number_c: {
						required: "Ingrese el numero."
					},
					postal_code: {
						required: ""
					},
					additional_information: {
						required: ""
					},
					lon: {
						required: "No se detecto la correctamente la direccion, falta la longitud."
					},
					lat: {
						required: "No se detecto la correctamente la direccion, falta la latitud."
					},
				},
				submitHandler: function() {
					address_selected = self.address_selected;
					/*
					if(self[address_selected] != undefined){
						console.log(address_selected);
						console.log(self[address_selected]);
						
						for (var k in self[address_selected]){
							if (typeof self[address_selected][k] !== 'function'){
								if(self[address_selected][k] != undefined && $('input[name="' + k + '"]').val() != null && $('input[name="' + k + '"]').val() != ''){
									console.log(k);
									self[address_selected][k] = $('input[name="' + k + '"]').val();
									
									if(k=='department'){
										self.load_citys();
									}
								}
							}
						}
					}else{
						$.notify("Ocurrio un error, intente recargar la página.", 'error');
					}*/
					
					if(self[address_selected].address_input != null
					&& self[address_selected].display_name != null
					&& self[address_selected].lon != null
					&& self[address_selected].lat != null
					&& self[address_selected].department != null
					&& self[address_selected].city != null
					&& self[address_selected].type_road != null
					&& self[address_selected].number_a != null
					&& self[address_selected].number_b != null
					&& self[address_selected].number_c != null){						
						bootbox.confirm({
							title: "Estas Seguro?",
							message: "¿Terminaste? Confirma pulsando en el botón aceptar.",
							buttons: {
								cancel: {
									label: '<i class="fa fa-times"></i> Cancelar'
								},
								confirm: {
									label: '<i class="fa fa-check"></i> Aceptar'
								}
							},
							callback: function (result) {
								if(result == true){
									FG.api('GET', '/addresses', {
										filter: [
											'address_input,eq,' + self[address_selected].address_input
										]
									}, function(r){
										if(r[0] != undefined && r[0].id > 0){
											self.post[address_selected] = r[0].id;
											self[address_selected] = r[0];
											$.notify("Direccion Seleccionada con éxito.", 'success');
											
										}else{
											FG.api('POST', '/addresses', self[address_selected], function(r){
												if(Number(r) > 0){
													$.notify("Direccion Añadida con éxito.", 'success');
													self.post[address_selected] = r;
													self[address_selected].id = r;
												}
											});
										}
										$('#modal_basic').modal('hide');
									});
								}
							}
						});
					}else{
						$.notify("Ingrese los datos minimos requeridos.", 'error');
					}
				},
				onsubmit: true
			});
			
			
			self.GetMap();
		},
		repairAddress(){
			var self = this;
			address_selected = self.address_selected;
			
			temp_min = '';
			temp_full = '';
			
			if(Number(self[address_selected].type_road) > 0){
				temp_type_road = self.options.types_roads.find(road => road.id == self[address_selected].type_road);
				temp_min += temp_type_road.code;
				temp_full += temp_type_road.name;
			};
			
			if(Number(self[address_selected].number_a) > 0){
				temp_min += ' ' + Number(self[address_selected].number_a);
				temp_full += ' ' + Number(self[address_selected].number_a);
			};
			if(Number(self[address_selected].letter_a) > 0){
				temp_letter_a = self.options.types_letters_addresses.find(letter => letter.id == self[address_selected].letter_a);
				temp_min += temp_letter_a.name;
				temp_full += ' ' + temp_letter_a.name;
			};
			if(Number(self[address_selected].quadrant_a) > 0){
				temp_quadrant_a = self.options.types_quadrants.find(quadrant => quadrant.id == self[address_selected].quadrant_a);
				temp_min += ' ' + temp_quadrant_a.name;
				temp_full += ' ' + temp_quadrant_a.name;
			};
			
			temp_min += ' #';
			temp_full += ' #';
			
			if(Number(self[address_selected].number_b) > 0){
				temp_min += ' ' + Number(self[address_selected].number_b);
				temp_full += ' ' + Number(self[address_selected].number_b);
			};
			if(Number(self[address_selected].letter_b) > 0){
				temp_letter_b = self.options.types_letters_addresses.find(letter => letter.id == self[address_selected].letter_b);
				temp_min += temp_letter_b.name;
				temp_full += ' ' + temp_letter_b.name;
			};
			if(Number(self[address_selected].quadrant_b) > 0){
				temp_quadrant_b = self.options.types_quadrants.find(quadrant => quadrant.id == self[address_selected].quadrant_b);
				temp_min += ' ' + temp_quadrant_b.name;
				temp_full += ' ' + temp_quadrant_b.name;
			};
			
			if(Number(self[address_selected].number_c) > 0){
				temp_min += ' - ' + Number(self[address_selected].number_c);
				temp_full += ' - ' + Number(self[address_selected].number_c);
			};
			if(self[address_selected].additional_information != null && self[address_selected].additional_information != ''){
				temp_min += ' ' + self[address_selected].additional_information.toUpperCase();
				temp_full += ' ' + self[address_selected].additional_information.toUpperCase();
			}
			
			if(Number(self[address_selected].city) > 0){
				temp_city = self.options.geo_citys.find(cit => cit.id == self[address_selected].city);
				temp_min += ', ' + temp_city.name.toUpperCase();				
				temp_full += ', ' + temp_city.name.toUpperCase();				
			};
			if(Number(self[address_selected].department) > 0){
				temp_department = self.options.geo_departments.find(depart => depart.id == self[address_selected].department);
				temp_min += ', ' + temp_department.name.toUpperCase();
				temp_full += ', ' + temp_department.name.toUpperCase();
			};
			
			self[address_selected].address_input = temp_min;
			self[address_selected].display_name = temp_full;
			
			$('#jvalidate2 input[name="address_input"]').val(temp_min);
			$('#jvalidate2 input[name="display_name"]').val(temp_full);
			
			
			if(
				Number(self[address_selected].department) > 0
				&& Number(self[address_selected].city) > 0
				&& Number(self[address_selected].type_road) > 0
				&& Number(self[address_selected].number_a) > 0
				&& Number(self[address_selected].number_b) > 0
				&& Number(self[address_selected].number_c) > 0
			){
				self.geocodeQuery(temp_min);
			}
		},
		GetMap() {
			var self = this;
			address_selected = self.address_selected;
			
			self.map = new Microsoft.Maps.Map('#myMap', {
				zoom: 15,
				mapTypeId: Microsoft.Maps.MapTypeId.aerial,
				center: new Microsoft.Maps.Location(4.0000000, -72.0000000)
			});
			
			self.center = self.map.getCenter();
			
			self.pin = new Microsoft.Maps.Pushpin(self.center, {
				title: 'Direccion',
				subTitle: self[address_selected].address_input,
				text: '▼'
			});
			self.map.entities.push(self.pin);
			
			self.$root._mpb("show",{value: [0,100],speed: 0});
		},
		geocodeQuery(query) {
			var self = this;
			address_selected = self.address_selected;
			
			if (!self.searchManager) {
				Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
					self.searchManager = new Microsoft.Maps.Search.SearchManager(self.map);
					self.geocodeQuery(query);
				});
			} else {
				var searchRequest = {
					where: query,
					callback: function (r) {
						if (r && r.results && r.results.length > 0) {
							self[address_selected].lat = r.results[0].location.latitude;
							self[address_selected].lon = r.results[0].location.longitude;
							self[address_selected].postal_code = r.results[0].address.postalCode;
							self[address_selected].completo = JSON.stringify(r.results[0]);
							
							self.pin.setLocation(new Microsoft.Maps.Location(r.results[0].location.latitude, r.results[0].location.longitude));							
							self.map.setView({ bounds: r.results[0].bestView });
						}
					},
					errorCallback: function (e) {
						$.notify("No se han encontrado resultados.");
					}
				};
				self.searchManager.geocode(searchRequest);
			}
		},
		
	}
});
