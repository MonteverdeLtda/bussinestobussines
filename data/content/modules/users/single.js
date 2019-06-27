
var PagesUsersView = Vue.extend({
	template: '#page-users-view',
	data: function() {
		return {
			options: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				"id": this.$route.params.user_id,
				"username": "",
				"names": "",
				"surname": "",
				"second_surname": "",
				"phone": "",
				"mobile": "",
				"mail": "",
				"permissions": {
					"id": 0,
					"name": "",
					"data": {}
				},
				"password": "",
				"avatar": {
					"id": 0,
					"name": "",
					"size": 0,
					"data": "",
					"type": "",
					"create": ""
				},
				"registered": "",
				"updated": ""
			}
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
			FG.api('GET', '/users/' + self.$route.params.user_id, {
				join: [
					'permissions',
					'pictures',
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
