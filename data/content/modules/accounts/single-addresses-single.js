
var PagesAccountsAddressesSingleView = Vue.extend({
	template: '#page-accounts-addresses-single-view',
	data: function() {
		return {
			post: {
				"id": this.$route.params.address_id,
				address_input: null,
				display_name: null,
				completo: null,
				lon: null,
				lat: null,
				department: {
					id: null,
					name: null,
				},
				city: {
					id: null,
					name: null,
				},
				type_road: {
					id: null,
					name: null,
					code: null,
				},
				number_a: null,
				letter_a: {
					id: null,
					name: null,
				},
				quadrant_a: {
					id: null,
					name: null,
				},
				number_b: null,
				letter_b: {
					id: null,
					name: null,
				},
				quadrant_b: {
					id: null,
					name: null,
				},
				number_c: null,
				postal_code: null,
				additional_information: null,
			},
			map: null,
			popup: null,
			currentPolygon: null,
			currentMarker: null,
			pin: null,
			address_search: {
				resultData: [],
			},
			searchManager: '',
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });
	},
	mounted: function () {
		var self = this;
		self.rederMap();
			console.log('OK');
	},
	methods: {
		rederMap(){
				var self = this;
				
				/*
				var jvm_usm = new jvm.WorldMap({container: $('#vector_world_map'),
					map: 'world_mill_en', 
					backgroundColor: '#B3D1FF',
					regionsSelectable: true,
					regionStyle: {selected: {fill: '#33414E'},
									initial: {fill: '#FFFFFF'}},
					onRegionSelected: function(){
						$("#vector_usa_map_value").val(jvm_usm.getSelectedRegions().toString());
					}
				});
				*/
				
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
				var CartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
				 }).addTo(self.map);
				 */
				 
				var satelliteGoogleHybrid = L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {
					attribution: '&copy; ',
					maxZoom: 20
				 }).addTo(self.map);
				 
				var layerControl = L.control.layers({
					// 'OpenStreetMap': openstreet,
					// 'CartoDB': CartoDB,
					// 'Mapa Satelite': satellite,
					'Hibrido': satelliteGoogleHybrid,
				}).addTo(self.map);
				self.map.attributionControl.setPrefix('');
				
				var colombia = new L.LatLng(2.8894434,-73.783892); 
				self.map.setView(colombia, 5);
				
				self.popup = L.popup();
				self.map.on('click', self.onMapClick);
			self.find();
		},
		onMapClick: function(e){
				var self = this;
				var parametros = {
					'lat': e.latlng.lat,
					'lon': e.latlng.lng,
					'format': 'jsonv2',
					'addressdetails': 1,
					'namedetails': 1,
					'accept-language': 'es',
					//'polygon': 1,
					'limit': 50,
				};
				
				aPiMap.get('/reverse', {
					params: parametros
				})
				.then(function (r) {
					info = r.data;
					
					searchTxT = '';
					if(info.address.street != undefined){ searchTxT += info.address.street + ' '; }
					if(info.address.road != undefined){ searchTxT += info.address.road + ' '; }
					if(info.address.suburb != undefined){ searchTxT += info.address.suburb + ' '; }
					
					self.geo_search.street = searchTxT;
					
					self.address_search();
					
					
					self.popup
						.setLatLng(e.latlng)
						// .setContent(info.display_name + "(" + e.latlng.toString() + ")")
						.setContent(info.display_name)
						.openOn(self.map);
				})
				.catch(function (er) {
					console.log(er);
				});
			},
		find: function(){
			var self = this;
			
			FG.api('GET', '/accounts_addresses/' + self.$route.params.address_id, {
				join: [
					'addresses',
					'addresses,geo_departments',
					'addresses,geo_citys',
					'addresses,types_roads',
					'addresses,types_quadrants',
					'addresses,types_letters_addresses',
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					d = a.address;
					d.completo = JSON.parse(d.completo);
					
					
					for (var k in d){
						if (typeof d[k] !== 'function') {
							if(d[k] != null){
								self.post[k] = d[k];
							}
						}
					}
					
					$("input,select,textarea")
						.attr('disabled', 'true')
						.attr('readonly', 'true');
					
				}
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
						FG.api('DELETE','/accounts_addresses/' + self.$route.params.address_id, {
						}, function(r){
							if(r == true)
							{
								$.notify("la direccion se elimino con éxito!", "success");
								router.push({
									name: 'page-accounts-addresses-view',
									params: {
										account_id: self.$route.params.account_id
									}
								});
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								$.notify("Ocurrio un inconveniente al intentar eliminar la direccion!", "error");
							}
						});
					}
				}
			});
		},
	}
});
