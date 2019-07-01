var PagesContactsEdit = Vue.extend({
	template: '#page-contacts-edit',
	data: function() {
		return {
			options: {
				types_identifications: [],
				types_genders: [],
				geo_citys: [],
				geo_departments: [],
			},
			post: {
				id: this.$route.params.contact_id,
				identification_type: null,
				identification_number: null,
				gender: null,
				names: null,
				surname: null,
				second_surname: null,
				birthday: null,
				phone: null,
				mobile: null,
				email: null,
				address: null,
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
			jvalidate: null,
			jvalidate2: null,
			map: null,
			pin: null,
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
			
			FG.api('GET', '/types_identifications', {}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.types_identifications = r;
					r.forEach(function(el){
						$(".select[name='identification_type']").append('<option value="'+el.id+'">' + el.code + ' - ' + el.name + '</option>');
					});
					$(".select[name='identification_type']").selectpicker('refresh');
				}
				
				FG.api('GET', '/types_genders', {}, function(r){
					if(r.length > 0 && r[0].id > 0){
						self.options.types_genders = r;
						r.forEach(function(el){
							$(".select[name='gender']").append('<option value="'+el.id+'">'+el.name+'</option>');
						});
						$(".select[name='gender']").selectpicker('refresh');
					}
					
					FG.api('GET', '/types_roads', {}, function(r){
						if(r.length > 0 && r[0].id > 0){
							self.options.types_roads = r;
							r.forEach(function(el){ $(".select[data-address-model='type_road']").append('<option value="'+el.id+'">'+el.name+'</option>'); });
							$(".select[data-address-model='type_road']").selectpicker('refresh');
						}
						self.$root._mpb("show",{value: [0,15],speed: 1});
						FG.api('GET', '/geo_departments', {}, function(r){
							if(r.length > 0 && r[0].id > 0){
								self.options.geo_departments = r;
								r.forEach(function(el){ $(".select[data-address-model='department']").append('<option value="'+el.id+'">'+el.name+'</option>'); });
								$(".select[data-address-model='department']").selectpicker('refresh');
							}
							self.$root._mpb("show",{value: [0,20],speed: 1});
							FG.api('GET', '/types_letters_addresses', {}, function(r){
								if(r.length > 0 && r[0].id > 0){
									self.options.types_letters_addresses = r;
									r.forEach(function(el){ $(".letters-addresses").append('<option value="'+el.id+'">'+el.name+'</option>'); });
									$(".letters-addresses").selectpicker('refresh');
								}
								self.$root._mpb("show",{value: [0,25],speed: 1});
								FG.api('GET', '/types_quadrants', {}, function(r){
									if(r.length > 0 && r[0].id > 0){
										self.options.types_quadrants = r;
										r.forEach(function(el){ $(".quadrants-addresses").append('<option value="'+el.id+'">'+el.name+'</option>'); });
										$(".quadrants-addresses").selectpicker('refresh');
									}
									self.$root._mpb("show",{value: [0,30],speed: 1});
									
									FG.api('GET', '/geo_citys', {
									}, function(r){
										if(r.length > 0 && r[0].id > 0){
											self.options.geo_citys = r;
											r.forEach(function(el){
												$(".select[data-address-model='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
											});
											$(".select[data-address-model='city']").selectpicker('refresh');
											self.$root._mpb("show",{value: [0,35],speed: 1 });
											self.load_plugins_this();
										}
									});
			
									
								});
							});
						});
					});
					
				});
			});
		},
		load_citys(){
			var self = this;
			self.address.city = null;
			self.options.geo_citys = [];
			self.$root._mpb("show",{value: [0,50],speed: 0});
			
			$(".select[data-address-model='city']").find('option').remove().end().append('<option value="null"></option>');
			
			FG.api('GET', '/geo_citys', {
				filter: [
					'department,eq,' + self.address.department
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.geo_citys = r;
					r.forEach(function(el){
						$(".select[data-address-model='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					$(".select[data-address-model='city']").selectpicker('refresh');
					self.$root._mpb("show",{value: [0,100],speed: 1 });
				}
			});
		},
		load_plugins_this(){
			var self = this;
			if($(".mask_date").length > 0){ $(".mask_date").datepicker({format: 'yyyy-mm-dd'}); }
			if($(".mask_phone_mobile").length > 0){ $(".mask_phone_mobile").mask('(999) 999-9999'); }
			if($(".mask_phone_ext").length > 0){ $(".mask_phone_ext").mask('(99) 999-9999? x99999'); }
				
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
					for (var k in self.address){
						if (typeof self.address[k] !== 'function'){
							if($(this).data("address-model") == k && self.address[k] != $(this).val()){
								self.address[k] = $(this).val();
								
								if(k=='department'){
									self.load_citys();
								}
							}
							self.repairAddress();
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
				for(var k in self.address){
					if (typeof self.address[k] !== 'function') {
						if($(this).data("address-model") == k && self.address[k] != $(this).val()){
							self.address[k] = $(this).val();
						}
						self.repairAddress();
					}
				}
			});
			
			self.$root._mpb("show",{value: [0,75],speed: 0});
			
			$(".datepicker").datepicker({format: 'yyyy-mm-dd'});
			
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				//wrapper: "div.alert.alert-danger",
				wrapper: "div.item",
				//errorContainer: ".form-group",
                ignore: [],
                rules: {
					"identification_type": {
						required: true
					},
					"identification_number": {
						required: true
					},
					"gender": {
						required: true
					},
					"names": {
						required: true
					},
					"surname": {
						required: true
					},
					"second_surname": {
						required: false
					},
					"birthday": {
						required: false
					},
					"phone": {
						required: true
					},
					"mobile": {
						required: false
					},
					"email": {
						required: false,
						email: true
					},
					"address": {
						required: false
					},
				},
				messages: {
					"identification_type": {
						required: "Selecciona el tipo de documento que tiene el contacto."
					},
					"identification_number": {
						required: "Ingresa el numero de la identificacion del contacto."
					},
					"gender": {
						required: "Selecciona el genero del contacto."
					},
					"names": {
						required: "Escribe el/los nombre(s) del contacto."
					},
					"surname": {
						required: "Escribe el primer apellido del contacto."
					},
					"second_surname": {
						required: "Escribe el segundo apellido del contacto."
					},
					"phone": {
						required: "Escribe un numero fijo de contacto."
					},
					"mobile": {
						required: "Escribe un numero movil de contacto."
					},
					"email": {
						required: "Ingrese un correo electronico valido."
					},
					"address": {
						required: "Ingrese una direccion valida."
					},
				},
				submitHandler: function() {
					
					FG.api('GET', '/contacts', {
						filter: [
							'identification_number,eq,' + self.post.identification_number,
							'identification_type,eq,' + self.post.identification_type
						]
					}, function (a) {
						if(a.length > 0){
							FG.api('PUT', '/contacts/' + self.post.id, self.post, function (b) {
								if(Number(b) > 0){
									$.notify("El contacto fue modificado correctamente.!", "success");
								}
							});
						}else{
							$.notify("El contacto no existe!", "error");
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
					if(self.address.address_input != null
					&& self.address.display_name != null
					&& self.address.lon != null
					&& self.address.lat != null
					&& self.address.department != null
					&& self.address.city != null
					&& self.address.type_road != null
					&& self.address.number_a != null
					&& self.address.number_b != null
					&& self.address.number_c != null){						
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
											'address_input,eq,' + self.address.address_input
										]
									}, function(r){
										if(r[0] != undefined && r[0].id > 0){
											self.post.address = r[0].id;
											self.address = r[0];
											$.notify("Direccion Seleccionada con éxito.", 'success');
											
										}else{
											FG.api('POST', '/addresses', self.address, function(r){
												if(Number(r) > 0){
													$.notify("Direccion Añadida con éxito.", 'success');
													self.post.address = r;
													self.address.id = r;
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
			
			self.find();
		},
		repairAddress(){
			var self = this;
			
			temp_min = '';
			temp_full = '';
			
			if(Number(self.address.type_road) > 0){
				temp_type_road = self.options.types_roads.find(road => road.id == self.address.type_road);
				temp_min += temp_type_road.code;
				temp_full += temp_type_road.name;
			};
			
			if(Number(self.address.number_a) > 0){
				temp_min += ' ' + Number(self.address.number_a);
				temp_full += ' ' + Number(self.address.number_a);
			};
			if(Number(self.address.letter_a) > 0){
				temp_letter_a = self.options.types_letters_addresses.find(letter => letter.id == self.address.letter_a);
				temp_min += temp_letter_a.name;
				temp_full += ' ' + temp_letter_a.name;
			};
			if(Number(self.address.quadrant_a) > 0){
				temp_quadrant_a = self.options.types_quadrants.find(quadrant => quadrant.id == self.address.quadrant_a);
				temp_min += ' ' + temp_quadrant_a.name;
				temp_full += ' ' + temp_quadrant_a.name;
			};
			
			temp_min += ' #';
			temp_full += ' #';
			
			if(Number(self.address.number_b) > 0){
				temp_min += ' ' + Number(self.address.number_b);
				temp_full += ' ' + Number(self.address.number_b);
			};
			if(Number(self.address.letter_b) > 0){
				temp_letter_b = self.options.types_letters_addresses.find(letter => letter.id == self.address.letter_b);
				temp_min += temp_letter_b.name;
				temp_full += ' ' + temp_letter_b.name;
			};
			if(Number(self.address.quadrant_b) > 0){
				temp_quadrant_b = self.options.types_quadrants.find(quadrant => quadrant.id == self.address.quadrant_b);
				temp_min += ' ' + temp_quadrant_b.name;
				temp_full += ' ' + temp_quadrant_b.name;
			};
			
			if(Number(self.address.number_c) > 0){
				temp_min += ' - ' + Number(self.address.number_c);
				temp_full += ' - ' + Number(self.address.number_c);
			};
			if(self.address.additional_information != null && self.address.additional_information != ''){
				temp_min += ' ' + self.address.additional_information.toUpperCase();
				temp_full += ' ' + self.address.additional_information.toUpperCase();
			}
			
			if(Number(self.address.city) > 0){
				temp_city = self.options.geo_citys.find(cit => cit.id == self.address.city);
				temp_min += ', ' + temp_city.name.toUpperCase();				
				temp_full += ', ' + temp_city.name.toUpperCase();				
			};
			if(Number(self.address.department) > 0){
				temp_department = self.options.geo_departments.find(depart => depart.id == self.address.department);
				temp_min += ', ' + temp_department.name.toUpperCase();
				temp_full += ', ' + temp_department.name.toUpperCase();
			};
			
			self.address.address_input = temp_min;
			self.address.display_name = temp_full;
			
			if(
				Number(self.address.department) > 0
				&& Number(self.address.city) > 0
				&& Number(self.address.type_road) > 0
				&& Number(self.address.number_a) > 0
				&& Number(self.address.number_b) > 0
				&& Number(self.address.number_c) > 0
			){
				self.geocodeQuery(temp_min);
			}
		},
		GetMap() {
			var self = this;
			self.map = new Microsoft.Maps.Map('#myMap', {
				zoom: 15,
				mapTypeId: Microsoft.Maps.MapTypeId.aerial,
				center: new Microsoft.Maps.Location(self.address.lat, self.address.lon)
			});
			
			
			self.center = self.map.getCenter();
			
			self.pin = new Microsoft.Maps.Pushpin(self.center, {
				title: 'Direccion',
				subTitle: self.address.address_input,
				text: '▼'
			});
			self.map.entities.push(self.pin);
		},
		//Geocode：Location
		geocodeQuery(query) {
			var self = this;		
			if (!self.searchManager) {
				//Create an instance of the search manager and call the geocodeQuery function again.
				Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
					self.searchManager = new Microsoft.Maps.Search.SearchManager(self.map);
					self.geocodeQuery(query);
				});
			} else {
				var searchRequest = {
					where: query,
					callback: function (r) {
						if (r && r.results && r.results.length > 0) {
							self.address.lat = r.results[0].location.latitude;
							self.address.lon = r.results[0].location.longitude;
							self.address.postal_code = r.results[0].address.postalCode;
							self.address.completo = JSON.stringify(r.results[0]);
						
							self.pin.setLocation(new Microsoft.Maps.Location(r.results[0].location.latitude, r.results[0].location.longitude));
							self.map.setView({ bounds: r.results[0].bestView });
						}
					},
					errorCallback: function (e) {
						// $.notify("No se han encontrado resultados.");
						$("#messageBox-2").html("No se han encontrado resultados.");
					}
				};
				self.searchManager.geocode(searchRequest);
			}
		},
		find(){
			var self = this;
			// self.$route.params.contact_id
			FG.api('GET', '/contacts/' + self.$route.params.contact_id, {}, function(a){
				if(a != undefined > 0 && a.id > 0){
					self.post = a;
					$(".select[name='identification_type']").val(a.identification_type).change().selectpicker('refresh');
					$(".select[name='gender']").val(a.gender).change().selectpicker('refresh');
					
					if(a.address != null){
						FG.api('GET', '/addresses/' + a.address, {}, function(b){
							if(b != undefined > 0 && b.id > 0){
								self.address = b;
								self.address.completo = JSON.parse(self.address.completo);
								
								$(".select[name='department']").val(b.department).change().selectpicker('refresh');
								$(".select[name='city']").val(b.city).change().selectpicker('refresh');
								$(".select[name='type_road']").val(b.type_road).change().selectpicker('refresh');
								$(".select[name='letter_a']").val(b.letter_a).change().selectpicker('refresh');
								$(".select[name='quadrant_a']").val(b.quadrant_a).change().selectpicker('refresh');
								$(".select[name='letter_b']").val(b.letter_b).change().selectpicker('refresh');
								$(".select[name='quadrant_b']").val(b.quadrant_b).change().selectpicker('refresh');
								
							}
						});
					}
				}
					self.GetMap();
				self.$root._mpb("show",{value: [0,100],speed: 1 });
			});
		}
	}
});
