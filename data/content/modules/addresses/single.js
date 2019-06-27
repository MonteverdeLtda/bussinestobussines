var PagesAddressesView = Vue.extend({
	template: '#page-addresses-view',
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
			
			
			$("input,select,textarea")
				.attr('disabled', 'true')
				.attr('readonly', 'true');
		},
		geocodeQuery(query) {
			var self = this;
			
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
									self.$root._mpb("show",{value: [0,50],speed: 1 });
									self.find();
								}
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
			self.$root._mpb("show",{value: [0,0],speed: 0 });
			
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
			}			
			self.load_options_selects();
		},
		find: function(){
			var self = this;
			FG.api('GET', '/addresses/' + self.$route.params.address_id, {}, function(a){
				if(a != undefined && a.id > 0){
					a.completo = JSON.parse(a.completo);
					self.post = a;
					
					$("select[name='type_road']")
						.val(self.post.type_road).change().selectpicker('refresh');
					$("select[name='department']")
						.val(self.post.department).change().selectpicker('refresh');
					$("select[name='city']")
						.val(self.post.city).change().selectpicker('refresh');
					$("select[name='letter_a']")
						.val(self.post.letter_a).change().selectpicker('refresh');
					$("select[name='letter_b']")
						.val(self.post.letter_b).change().selectpicker('refresh');
					$("select[name='quadrant_a']")
						.val(self.post.quadrant_a).change().selectpicker('refresh');
					$("select[name='quadrant_b']")
						.val(self.post.quadrant_b).change().selectpicker('refresh');
					
					self.GetMap();
					self.$root._mpb("show",{value: [0,100],speed: 1 });
				}
			});
		},
	}
});
