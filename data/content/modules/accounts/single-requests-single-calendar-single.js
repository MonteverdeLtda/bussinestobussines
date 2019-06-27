
var PagesAccountsRequestsSingleCalendarView = Vue.extend({
	template: '#page-accounts-requests-single-calendar-view',
	data: function() {
		return {
			posts: []
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 0], speed: 1 });		
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show", { value: [0, 100], speed: 1 });
		self.find();
	},
	methods: {
		find(){
			var self = this;
			FG.api('GET', '/crew_technical_visits', {
				join: [ 'employees', ]
			}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					console.log(a);
				}
			});
		},
	}
});
