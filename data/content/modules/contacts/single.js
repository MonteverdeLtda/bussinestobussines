
var PagesContactsView = Vue.extend({
	template: '#page-contacts-view',
	data: function() {
		return {
			options: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				id: this.$route.params.contact_id,
				identification_type: {
					id: null,
					name: null
				},
				identification_number: null,
				first_name: null,
				second_name: '---',
				surname: null,
				second_surname: '---',
				birthdaydate: '0000-00-00',
				phone: null,
				phone_mobile: null,
				mail: 'contacto@sincorreo.com',
				department: {
					id: null,
					name: null
				},
				city: {
					id: null,
					department: null,
					name: null
				},
				address: '---'
			},
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/contacts/' + self.$route.params.contact_id, {
				join: [
					'types_identifications',
					'geo_departments',
					'geo_citys',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					self.$root._mpb("show",{value: [0,10],speed: 1});
				}
			});
		},
	}
});
