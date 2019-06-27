var PagesAddressesEdit = Vue.extend({
	template: '#page-addresses-edit',
	data: function() {
		return {
			loading: false,
			inSearch: false,
			options: {
				types_roads: [],
				types_letters_addresses: [],
				types_quadrants: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				id: this.$route.params.address_id,
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
			map: null,
			popup: null,
			currentPolygon: null,
			currentMarker: null,
			currentPossition: null,
			address_search: {
				resultData: [],
			},
			searchManager: '',
			center: '',
			pin: '',
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.load_plugins_this();
	},
	methods: {
		GetMap() {
			var self = this;
			self.map = new Microsoft.Maps.Map('#myMap', {
				zoom: 15,
				mapTypeId: Microsoft.Maps.MapTypeId.aerial,
				//credentials: 'Atryp6sZtQXpXgEw8wWqZEAXrSSVgAatL99H5XKB1f6L6zqL-wtsUekQKrTdNwed',
				center: new Microsoft.Maps.Location(self.post.lat, self.post.lon)
			});
			
			self.center = self.map.getCenter();
			
			self.pin = new Microsoft.Maps.Pushpin(self.center, {
				title: self.post.address_input,
				// subTitle: 'City Center',
				text: 'Direccion'
			});
			self.map.entities.push(self.pin);
			self.loading = true;
			self.$root._mpb("show",{value: [0,100],speed: 1 });
		},
		//Geocode：Location
		geocodeQuery(query) {
			var self = this;
			if (self.loading == true) {
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
								self.map.entities.push(self.pin);
								self.map.setView({ bounds: r.results[0].bestView });
								self.post.lat = r.results[0].location.latitude;
								self.post.lon = r.results[0].location.longitude;
								self.post.postal_code = r.results[0].address.postalCode;
								self.post.completo = JSON.stringify(r.results[0]);
								
								self.pin = new Microsoft.Maps.Pushpin(r.results[0].location, {
									title: self.post.address_input,
									// subTitle: 'City Center',
									text: 'Direccion'
								});
								self.inSearch = false;
							}
						},
						errorCallback: function (e) {
							// alert("No results found.");
							$.notify("No se han encontrado resultados.");
							self.inSearch = false;
						}
					};
					//Make the geocode request.
					
					if(self.inSearch == false){
						self.inSearch = true;
						self.searchManager.geocode(searchRequest);
					}					
				}
			}
		},
		load_options_selects(){
			var self = this;
			FG.api('GET', '/types_roads', {}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.types_roads = r;
					r.forEach(function(el){ $(".select[name='type_road']").append('<option value="'+el.id+'">'+el.name+'</option>'); });
					$(".select[name='type_road']").selectpicker('refresh');
				}
				FG.api('GET', '/geo_departments', {}, function(r){
					if(r.length > 0 && r[0].id > 0){
						self.options.geo_departments = r;
						r.forEach(function(el){ $(".select[name='department']").append('<option value="'+el.id+'">'+el.name+'</option>'); });
						$(".select[name='department']").selectpicker('refresh');
					}
					FG.api('GET', '/types_letters_addresses', {}, function(r){
						if(r.length > 0 && r[0].id > 0){
							self.options.types_letters_addresses = r;
							r.forEach(function(el){
								$(".select[name='letter_a']").append('<option value="'+el.id+'">'+el.name+'</option>');
								$(".select[name='letter_b']").append('<option value="'+el.id+'">'+el.name+'</option>');
							});
							
							$(".select[name='letter_a']").selectpicker('refresh');
							$(".select[name='letter_b']").selectpicker('refresh');
						}
						FG.api('GET', '/types_quadrants', {}, function(r){
							if(r.length > 0 && r[0].id > 0){
								self.options.types_quadrants = r;
								r.forEach(function(el){
									$(".select[name='quadrant_a']").append('<option value="'+el.id+'">'+el.name+'</option>');
									$(".select[name='quadrant_b']").append('<option value="'+el.id+'">'+el.name+'</option>');
								});
								$(".select[name='quadrant_a']").selectpicker('refresh');
								$(".select[name='quadrant_b']").selectpicker('refresh');
							}
							
							FG.api('GET', '/geo_citys', {
							}, function(r){
								if(r.length > 0 && r[0].id > 0){
									self.options.geo_citys = r;
									r.forEach(function(el){
										$(".select[name='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
									});
									$(".select[name='city']").selectpicker('refresh');
								}
								self.$root._mpb("show",{value: [0,35],speed: 1 });
								self.find();
							});
						});
					});
				});
			});
		},
		load_citys(){
			var self = this;
			self.post.city = null;
			self.options.geo_citys = [];
			self.$root._mpb("show",{value: [0,50],speed: 0});
			
			$(".select[name='city']").find('option').remove().end().append('<option value="null"></option>');
			
			FG.api('GET', '/geo_citys', {
				filter: [
					'department,eq,' + self.post.department
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
			self.$root._mpb("show",{value: [0,0],speed: 0 });
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for(var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).attr("name") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
								if(k=='department'){
									self.load_citys();
								}
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
						self.repairAddress();
					}
				}
			});
			

			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
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
					bootbox.confirm({
						title: "Estas Seguro?",
						message: "¿Quieres modificar la Dirección ahora? Esto no se puede deshacer.",
						buttons: {
							cancel: {
								label: '<i class="fa fa-times"></i> Cancelar'
							},
							confirm: {
								label: '<i class="fa fa-check"></i> Modificar'
							}
						},
						callback: function (result) {
							if(result == true){
								FG.api('GET', '/addresses', {
									filter: [
										'address_input,eq,' + self.post.address_input
									]
								}, function(r){
									if(r.length > 0 && r[0].id > 0){
										FG.api('PUT', '/addresses/' + self.$route.params.address_id, self.post, function(r){
											if(Number(r) > 0){
												$.notify("Direccion modificanda con éxito.", 'success');
											}else{
												$.notify("Error modificando la direccion.", 'success');
											}
										});
									}else{
										$.notify("La direccion no existe.", 'error');
									}
								});
							}
						}
					});
				},
				onsubmit: true
			});
			
			self.load_options_selects();
		},
		delete_this(){
			var self = this;
			
			bootbox.confirm({
				title: "Estas Seguro?",
				message: "¿Quieres eliminar la dirección ahora? Esto no se puede deshacer.",
				buttons: {
					cancel: {
						label: '<i class="fa fa-times"></i> Cancelar'
					},
					confirm: {
						label: '<i class="fa fa-check"></i> Eliminar'
					}
				},
				callback: function (result) {
					if(result == true){
						self.$root._mpb("show",{value: [0,0],speed: 0 });
						FG.api('GET', '/addresses', {
							filter: [
								'address_input,eq,' + self.post.address_input
							]
						}, function(r){
							if(r.length > 0 && r[0].id > 0){
								FG.api('DELETE', '/addresses/' + self.$route.params.address_id, function(r){
									if(Number(r) > 0){
										$.notify("Direccion eliminada con éxito.", 'success');
										router.push({
											name: 'page-addresses-list',
											params: {}
										});
									}else{
										$.notify("Error eliminada la direccion.", 'success');
									}
									self.$root._mpb("show",{value: [0,100],speed: 1 });
								});
							}else{
								$.notify("La direccion no existe.", 'error');
								self.$root._mpb("show",{value: [0,100],speed: 1 });
								router.push({
									name: 'page-addresses-list',
									params: {}
								});
								
							}
						});
					}
				}
			});
		},
		repairAddress(){
			var self = this;
			
			temp_min = '';
			temp_full = '';
			
			if(Number(self.post.type_road) > 0){
				temp_type_road = self.options.types_roads.find(road => road.id == self.post.type_road);
				temp_min += temp_type_road.code;
				temp_full += temp_type_road.name;
			};
			
			if(Number(self.post.number_a) > 0){
				temp_min += ' ' + Number(self.post.number_a);
				temp_full += ' ' + Number(self.post.number_a);
			};
			if(Number(self.post.letter_a) > 0){
				temp_letter_a = self.options.types_letters_addresses.find(letter => letter.id == self.post.letter_a);
				temp_min += temp_letter_a.name;
				temp_full += ' ' + temp_letter_a.name;
			};
			if(Number(self.post.quadrant_a) > 0){
				temp_quadrant_a = self.options.types_quadrants.find(quadrant => quadrant.id == self.post.quadrant_a);
				temp_min += ' ' + temp_quadrant_a.name;
				temp_full += ' ' + temp_quadrant_a.name;
			};
			
			temp_min += ' #';
			temp_full += ' #';
			
			if(Number(self.post.number_b) > 0){
				temp_min += ' ' + Number(self.post.number_b);
				temp_full += ' ' + Number(self.post.number_b);
			};
			if(Number(self.post.letter_b) > 0){
				temp_letter_b = self.options.types_letters_addresses.find(letter => letter.id == self.post.letter_b);
				temp_min += temp_letter_b.name;
				temp_full += ' ' + temp_letter_b.name;
			};
			if(Number(self.post.quadrant_b) > 0){
				temp_quadrant_b = self.options.types_quadrants.find(quadrant => quadrant.id == self.post.quadrant_b);
				temp_min += ' ' + temp_quadrant_b.name;
				temp_full += ' ' + temp_quadrant_b.name;
			};
			
			if(Number(self.post.number_c) > 0){
				temp_min += ' - ' + Number(self.post.number_c);
				temp_full += ' - ' + Number(self.post.number_c);
			};
			if(self.post.additional_information != null && self.post.additional_information != ''){
				temp_min += ' ' + self.post.additional_information.toUpperCase();
				temp_full += ' ' + self.post.additional_information.toUpperCase();
			}
			
			if(Number(self.post.city) > 0){
				temp_city = self.options.geo_citys.find(cit => cit.id == self.post.city);
				temp_min += ', ' + temp_city.name;				
				temp_full += ', ' + temp_city.name;				
			};
			if(Number(self.post.department) > 0){
				temp_department = self.options.geo_departments.find(cit => cit.id == self.post.department);
				temp_min += ', ' + temp_department.name;
				temp_full += ', ' + temp_department.name;
			};
			
			self.post.address_input = temp_min;
			self.post.display_name = temp_full;
			
			if(
				Number(self.post.department) > 0
				&& Number(self.post.city) > 0
				&& Number(self.post.type_road) > 0
				&& Number(self.post.number_a) > 0
				&& Number(self.post.number_b) > 0
				&& Number(self.post.number_c) > 0
			){
				self.geocodeQuery(temp_min);
			}
		},
		find: function(){
			var self = this;
			FG.api('GET', '/addresses/' + self.$route.params.address_id, {
				join: [
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					a.completo = JSON.parse(a.completo);
					self.post = a;
					
					$("select[name='type_road']")
						.val(self.post.type_road)
						.change()
						.selectpicker('refresh');
					$("select[name='department']")
						.val(self.post.department)
						.change()
						.selectpicker('refresh');
					$("select[name='city']")
						.val(self.post.city)
						.change()
						.selectpicker('refresh');
					$("select[name='letter_a']")
						.val(self.post.letter_a)
						.change()
						.selectpicker('refresh');
					$("select[name='letter_b']")
						.val(self.post.letter_b)
						.change()
						.selectpicker('refresh');
					$("select[name='quadrant_a']")
						.val(self.post.quadrant_a)
						.change()
						.selectpicker('refresh');
					$("select[name='quadrant_b']")
						.val(self.post.quadrant_b)
						.change()
						.selectpicker('refresh');
					
					self.GetMap();
					self.$root._mpb("show",{value: [0,70],speed: 1 });
					//self.geocodeQuery(self.post.address_input);
				}else{
					router.push({
						name: 'page-addresses-list',
						params: {}
					});
				}
			});
		},
	}
});
