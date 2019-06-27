
var PagesAccountsAddressesSingleView = Vue.extend({
	template: '#page-accounts-addresses-single-view',
	data: function() {
		return {
			post: {
				"id": this.$route.params.address_id,
				"place_id": null,
				"place_rank": null,
				"address_input": null,
				"display_name": null,
				"city": {
					id: 0,
					name: '',
					department: 0,
				},
				"department": {
					id: 0,
					name: ''
				},
				"lat": null,
				"lon": null,
				"completo": null,
			},
			map: null,
			popup: null,
			currentPolygon: null,
			currentMarker: null,
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
					'addresses,geo_citys',
					'addresses,geo_departments',
				]
			}, function(a){
				if(a != undefined && a.id > 0){
					d = a.address;
					self.post = a.address;
					d.completo = JSON.parse(d.completo);
					if(d.place_rank > 18){ d.place_rank = 18; }
					
					var LatLng = new L.LatLng(d.lat, d.lon); 
					self.map.setView(LatLng, (Number(d.place_rank)-2));
					
					var greenIcon = L.icon({
						iconUrl: 'https://mv.dataservix.com/admin/global/images/icons/leaf-green.png',
						shadowUrl: 'https://mv.dataservix.com/admin/global/images/icons/leaf-shadow.png',

						iconSize:     [19, 47.5], // tamaño del icono
						shadowSize:   [25, 32], // tamaño de la sombra
						iconAnchor:   [11, 47], // Punto del icono que corresponderá a la ubicación del marcador.
						shadowAnchor: [2, 31], // lo mismo para la sombra
						popupAnchor:  [-1.5, -38] // Punto desde el que se abrirá la ventana emergente en relación con el icono.
					});
					
					self.currentMarker = new L.Marker(LatLng, {icon: greenIcon});
					self.map.addLayer(self.currentMarker);
					self.currentMarker.bindPopup(d.display_name);
					
					var polygonPoints = [];
					d.completo.polygonpoints.forEach(function(a){
						polygonPoints.push(new L.LatLng(a[1], a[0]))
					});
					
					self.currentPolygon = new L.Polygon(polygonPoints);
					self.map.addLayer(new L.Polygon(polygonPoints));
					
				}
			});
		},
	}
});
