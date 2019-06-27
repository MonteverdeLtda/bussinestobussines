var Component_Navigation_Top_PagesAccounts = Vue.component('component-navigation-top-pages-accounts', {
	template: '#component-navigation-top-pages-accounts',
	props: [
		''
	],
	data: function () {
		return {
		};
	},
	mounted: function () {
		var self = this;
		
	},
	methods: {
		find: function(){
			var self = this;
			
		},
		isActiveClass(thisName){
			var self = this;
			if(self.$route.name == thisName){
				return 'active';
			}else{
				return 'not-active';
			};
			
		},
	}
});