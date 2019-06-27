
var MyPlugin = {
	install: function (Vue, options) {
		Vue.mixin({
			data: function(){
				return {
					status: 'not_authorized',
					authResponse: {
						accessToken: 'none',
						userID:'0',
						userData: {
							id: 0,
							location: '',
							password: '',
							username: '',
						}
					},
					options: options,
						currentRoute: '',
				}
			},
			methods: {
				FG: FG,
			},
			created() {
				var self = this;
				self.$root.load_root();
			},
			mounted() {
				var self = this;
				// self.$root.load_actions();
				
				self.$root.load_root()
				self.$root.load_actions();
				
				if(self.$root.status === 'connected'){ self.$root.checkSession(); }
				this.$nextTick(function () {
					if(self.$root.status === 'connected'){
						self.$root.checkSession();
					}
					self.$root.load_actions();
					
					
				});
				
				
				
			},
			beforeCreate() {
				var self = this;				
				var session = FG.loadSession();
				self.$root.status = session.status;
				self.$root.authResponse = session.authResponse;
				
			},
			beforeMount() {
				var self = this;				
				var session = FG.loadSession();
				self.$root.status = session.status;
				self.$root.authResponse = session.authResponse;
				
				this.$nextTick(function () {
					if(self.$root.status === 'not_authorized' && self.$route.name != 'page-login'){
						router.push({ name: 'page-login' });
					} else if (self.$route.name === 'page-login' && self.$root.status === 'connected'){
						router.push({
							name: 'page-dashboard'
						});
					} else{
						
					}
					
					if(self.$route.name == self.currentRoute){
						console.log('reboot.');
					}else{
						// console.log('No reboot.');
					}
					
					// $( ".panel" ).dialog();
				});
			},
		});
	}
}