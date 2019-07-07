var PagesAccountsAddressesAdd = Vue.extend({
	template: '#page-accounts-addresses-single-add',
	data: function() {
		return {
			options: {
				geo_departments: [],
				geo_citys: [],
			},
			address_search: {
				text: '',
				street: '',
				city: '',
				county: '',
				state: '',
				country: 'Colombia',
				resultData: [],
			},
			post: {
				"address_input": null,
				"place_id": null,
				"place_rank": null,
				"display_name": null,
				"city": "",
				"department": "",
				"lat": null,
				"lon": null,
				"completo": null,
				"icon": null,
			},
			map: null,
			popup: null,
			currentPolygon: null,
			currentMarker: null,
			currentPossition: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });
	},
	mounted: function () {
		var self = this;
		self.load_options_selects();
	},
	methods: {
		searchAddress(typeData){
			var self = this;
			var temp_params = {};
			if(typeData === 1){
				temp_params = {
					q: self.address_search.text,
				};
				self.getSearchAddress(temp_params);
			} else if(typeData === 2){
				temp_params = {
					street: self.address_search.street,
					city: self.address_search.city,
					//county: self.address_search.county,
					state: self.address_search.state,
					country: 'Colombia',
				};
				self.getSearchAddress(temp_params);
			}
		},
		getSearchAddress(params){
			var self = this;
			self.address_search.resultData = [];
			params.format = 'jsonv2';
			params.addressdetails = 1;
			params.namedetails = 1;
			params.limit = 25;
			//params.polygon_geojson = 1;
			
			aPiMap.get('/search', {
				'params': params
			})
			.then(function (response) {
				json = response.data;
				self.address_search.resultData = json;
			})
			.catch(function (error) {
				json = error;
				console.log(json);
			});
		},
		setAddressList(index){
			var self = this;
			seleted = self.address_search.resultData[index];
			self.post.address_input = self.address_search.text;
			self.post.place_id = seleted.place_id;
			self.post.place_rank = seleted.place_rank;
			self.post.display_name = seleted.display_name;
			self.post.lat = seleted.lat;
			self.post.lon = seleted.lon;
			self.post.completo = JSON.stringify(seleted);
			if(seleted.icon != undefined){ self.post.icon = seleted.icon; }
			
			
			self.currentPossition = self.currentMarker.getLatLng();
			self.currentMarker.setLatLng(new L.LatLng(self.post.lat, self.post.lon),{draggable:'true'});
			self.map.panTo(new L.LatLng(self.post.lat, self.post.lon))
			// Carrera 50A, Santa María, Itagüí, Valle de Aburrá, Antioquia, 055413, Colombia
		},
		load_options_selects(){
			var self = this;
			self.$root._mpb("show",{value: [0,0],speed: 1});
			
			
			FG.api('GET', '/geo_departments', {}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.geo_departments = r;
					
					r.forEach(function(el){
						$(".select[name='department']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					
					$(".select[name='department']").selectpicker('refresh');
					self.$root._mpb("show",{value: [0,20],speed: 1});
					self.load_plugins();
				}
			});
		},
		load_plugins(){
			var self = this;
			$(".wizard").smartWizard({
				// This part of code can be removed FROM
				onLeaveStep: function(obj){
					var wizard = obj.parents(".wizard");
					if(wizard.hasClass("wizard-validation")){
						var valid = true;
						$('input,textarea',$(obj.attr("href"))).each(function(i,v){
							valid = validator.element(v) && valid;
						});
						
						if(!valid){
							wizard.find(".stepContainer").removeAttr("style");
							validator.focusInvalid();
							return false;
						}
					}
					return true;
				},// <-- TO
				//This is important part of wizard init
				onShowStep: function(obj){
					var wizard = obj.parents(".wizard");
					if(wizard.hasClass("show-submit")){
						var step_num = obj.attr('rel');
						var step_max = obj.parents(".anchor").find("li").length;

						if(step_num == step_max){
							obj.parents(".wizard").find(".actionBar .btn-primary").css("display","block");
						}
					}
					return true;
				}//End
			});
			
			// This par of code used for example
			if($("#wizard-validation").length > 0){
				var validator = $("#wizard-validation").validate({
						rules: {
							address_input: {
								required: true,
							},
							display_name: {
								required: true,
							},
							lat: {
								required: true,
							},
							lon: {
								required: true,
							},
							city: {
								required: true,
							},
							department: {
								required: true,
							},
							icon: {
								required: false,
							},
						},
						submitHandler: function() {
							if(self.post.city > 0 && self.post.department > 0){
								FG.api('GET', '/addresses', {
									filter: [
										'address_input,eq,' + self.post.address_input,
									]
								}, function (a) {
									if(a[0] != undefined && a[0].id > 0){
										FG.api('GET', '/accounts_addresses', {
											filter: [
												'account,eq,' + self.$route.params.account_id,
												'address,eq,' + a[0].id
											]
										}, function (b) {
											if(b[0] != undefined && b[0].id > 0){
												$.notify("La direccion ya existe!", "error");
												router.go(-1);
											}else{
												FG.api('POST', '/accounts_addresses', {
													account: self.$route.params.account_id,
													address: a[0].id
												}, function (c) {
													if(c > 0){
														$.notify("La direccion fue agregada a la cuenta de manera correctamenta.!", "success");
														router.go(-1);
													}else{
														$.notify("Hubo un problema al agregar la direccion a la cuenta.", "success");
													}
												});
											}
										});
									}else{
										FG.api('POST', '/addresses', self.post, function (d) {
											if(d > 0){
												$.notify("La direccion fue creada de manera correctamenta.!", "success");					
												FG.api('GET', '/accounts_addresses', {
													filter: [
														'account,eq,' + self.$route.params.account_id,
														'address,eq,' + d
													]
												}, function (b) {
													if(b[0] != undefined && b[0].id > 0){
														$.notify("La direccion ya existe!", "error");
													}else{
														FG.api('POST', '/accounts_addresses', {
															account: self.$route.params.account_id,
															address: d
														}, function (c) {
															if(c > 0){
																$.notify("La direccion fue agregada a la cuenta de manera correctamenta.!", "success");
																router.go(-1);
															}else{
																$.notify("Hubo un problema al agregar la direccion a la cuenta.", "success");
															}
														});
													}
												});
												
											}else{
												$.notify("Hubo un problema para crear la direccion.", "success");
											}
										});
									}
								})
							}else{
								$.notify("Campos incompletos.", "error");
							}
						}
					});
			}// End of example
					
			if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
				$(".select").selectpicker();				
				$(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).attr("name") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
								if(k=='department' || k=='department'){
									self.load_citys(k);
								}
							}
						}
					}
				});
			}
			self.$root._mpb("show",{value: [0,50],speed: 0});
			self.rederMap();
		},
		load_citys(inputSelect){
			var self = this;
			self.post.city = 0;
			self.options.geo_departments = [];
			self.$root._mpb("show",{value: [0,0],speed: 0});
			
			$(".select[name='city']").find('option').remove().end().append('<option value=""></option>');
			
			FG.api('GET', '/geo_citys', {
				filter: [
					'department,eq,' + self.post.department
				]
			}, function(r){
				self.$root._mpb("show",{value: [0,50],speed: 0});
				if(r.length > 0 && r[0].id > 0){
					self.$root._mpb("show",{value: [0,100],speed: 1});
					r.forEach(function(el){
						$(".select[name='city']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					$(".select[name='city']").selectpicker('refresh');
				}
			});
		},
		rederMap(){
			var self = this;
			self.map = new L.Map('vector_world_map');
			
			/*
			var openstreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
				maxZoom: 18
			}).addTo(self.map);
			var subscriptionKey = 'tTk1JVEaeNvDkxxnxHm9cYaCvqlOq1u-fXTvyXn2XkA';
			var satellite = L.tileLayer('https://atlas.microsoft.com/map/imagery/png?api-version=1&style=satellite&tileSize=256&zoom={z}&x={x}&y={y}&subscription-key=' + subscriptionKey, {
				attribution: '© ' + new Date().getFullYear() + ' Microsoft, © ' + new Date().getFullYear() + ' DigitalGlobe',
				tileSize: 256,
				maxZoom: 18
			}).addTo(self.map);
			 */
			var CartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
				maxZoom: 20
			 }).addTo(self.map);
			 
			var satelliteGoogleHybrid = L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {
				attribution: '&copy; ',
				maxZoom: 20
			 }).addTo(self.map);
			 
			var layerControl = L.control.layers({
				// 'OpenStreetMap': openstreet,
				'CartoDB': CartoDB,
				// 'Mapa Satelite': satellite,
				'Hibrido': satelliteGoogleHybrid,
			}).addTo(self.map);
			
			self.$root._mpb("show",{value: [0,80],speed: 1});
			
			self.map.attributionControl.setPrefix('');
			
			var colombia = new L.LatLng(2.8894434,-73.783892); 
			self.currentMarker = L.marker([2.8894434,-73.783892], {draggable:'true'});
			
			self.currentMarker.on('dragend', function(event){
				self.currentMarker = event.target;
				self.currentPossition = self.currentMarker.getLatLng();
				self.currentMarker.setLatLng(new L.LatLng(self.currentPossition.lat, self.currentPossition.lng),{draggable:'true'});
				self.map.panTo(new L.LatLng(self.currentPossition.lat, self.currentPossition.lng))
				self.post.lat = self.currentPossition.lat;
				self.post.lon = self.currentPossition.lng;
				
				
				aPiMap.get('/reverse', {
					params: {
						'lat': self.currentPossition.lat,
						'lon': self.currentPossition.lng,
						'format': 'jsonv2',
						'addressdetails': 1,
						'namedetails': 1,
						'accept-language': 'es',
						'limit': 25,
						// 'polygon_geojson': 1,
					}
				})
				.then(function (r) {
					info = r.data;
					
					self.address_search.text = info.display_name;
					self.getSearchAddress({
						q: self.address_search.text,
					});
					self.post.address_input = self.address_search.text;
					self.post.place_id = info.place_id;
					self.post.place_rank = info.place_rank;
					self.post.display_name = info.display_name;
					self.post.lat = info.lat;
					self.post.lon = info.lon;
					self.post.completo = JSON.stringify(info);
					if(info.icon != undefined){ self.post.icon = info.icon; }
					
					/*
					self.popup
						.setLatLng(e.latlng)
						// .setContent(info.display_name + "(" + e.latlng.toString() + ")")
						.setContent(info.display_name)
						.openOn(self.map);
						*/
				})
				.catch(function (er) {
					console.log(er);
				});
			});
			
			self.currentMarker.addTo(self.map)
			self.map.setView(colombia, 5);
			self.popup = L.popup();
			// self.map.on('click', self.onMapClick);
			self.find();
		},
		onMapClick: function(e){
			console.log(e);
			var self = this;
				self.$root._mpb("show",{value: [0,100],speed: 0});
			},
		find: function(){
			var self = this;
			self.$root._mpb("show",{value: [0,100],speed: 1});
		},
	}
});
