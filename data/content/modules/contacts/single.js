var PagesContactsView = Vue.extend({
	template: '#page-contacts-view',
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
			inSearch: null,
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.GetMap();
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
									
									self.load_plugins_this();
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
							if($(this).data("name") == k && self.post[k] != $(this).val()){
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
			});
			
			self.$root._mpb("show",{value: [0,75],speed: 0});
			
			$(".datepicker").datepicker({format: 'yyyy-mm-dd'});
			
			
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
				temp_min += ', ' + temp_city.name;				
				temp_full += ', ' + temp_city.name;				
			};
			if(Number(self.address.department) > 0){
				temp_department = self.options.geo_departments.find(depart => depart.id == self.address.department);
				temp_min += ', ' + temp_department.name;
				temp_full += ', ' + temp_department.name;
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
				mapTypeId: Microsoft.Maps.MapTypeId.aerial
			});
			
			self.load_options_selects();
		},
		geocodeQuery(query) {
			var self = this;		
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
							self.address.lat = r.results[0].location.latitude;
							self.address.lon = r.results[0].location.longitude;
							self.address.postal_code = r.results[0].address.postalCode;
							self.address.completo = JSON.stringify(r.results[0]);
						
							self.pin = new Microsoft.Maps.Pushpin(r.results[0].location, {
								title: self.address.address_input,
								// subTitle: 'City Center',
								text: 'Direccion'
							});
							
							self.map.entities.push(self.pin);
							self.map.setView({ bounds: r.results[0].bestView });
							self.inSearch = false;
						}
					},
					errorCallback: function (e) {
						$.notify("No se han encontrado resultados.");
						self.inSearch = false;
					}
				};
				if(self.inSearch == false){
					self.inSearch = true;
					self.searchManager.geocode(searchRequest);
				}
			}
		},
		find(){
			var self = this;
			FG.api('GET', '/contacts/' + self.$route.params.contact_id, {}, function(a){
				if(a != undefined > 0 && a.id > 0){
					self.post = a;
					$("select[name='identification_type']").val(a.identification_type).change().selectpicker('refresh');
					$("select[name='gender']").val(a.gender).change().selectpicker('refresh');
					
					FG.api('GET', '/addresses/' + a.address, {}, function(b){
						if(b != undefined > 0 && b.id > 0){
							console.log(b);
							self.address = b;
						}
					});
				}
				self.$root._mpb("show",{value: [0,100],speed: 1 });
				
			$("input,select,textarea")
				.attr('disabled', 'true')
				.attr('readonly', 'true');
			});
		}
	}
});
