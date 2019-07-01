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
		self.find();
			console.log('OK');
	},
	methods: {
		rederMap(){
			var self = this;
			self.map = new Microsoft.Maps.Map('#myMap', {
				zoom: 18,
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
					self.rederMap();
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
