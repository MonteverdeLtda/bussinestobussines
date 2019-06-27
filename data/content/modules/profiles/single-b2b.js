var PagesProfilesB2BViewById = Vue.extend({
	template: '#pages-profiles-b2b-for-id-view',
	data: function() {
		return {
			post: {
			  "id": this.$route.params.user_id,
			  "username": "",
			  "names": null,
			  "surname": null,
			  "second_surname": null,
			  "phone": null,
			  "mobile": null,
			  "registered": "2019-04-10 14:31:30",
			  "avatar": 1,
			  "mail": "demo@lts.com",
			  "password": "pass1",
			  "permissions": {
				  id: 0,
				  name: ''
			  }
			},
		};
	},
	created: function() {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 1});
		self.load_scripts();
		self.find();
	},
	methods: {
		find(){
			var self = this;
			FG.api('GET', '/users/' + self.$route.params.user_id, {
				join: [
					'permissions',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
					self.$root._mpb("show",{value: [0,100],speed: 1});
				}
			});
			
		},
		load_scripts(){
			var self = this;
			document.getElementById('links').onclick = function (event) {
                event = event || window.event;
                var target = event.target || event.srcElement,
                    link = target.src ? target.parentNode : target,
                    options = {index: link, event: event,onclosed: function(){
                        setTimeout(function(){
                            $("body").css("overflow","");
                        },200);                        
                    }},
                    links = this.getElementsByTagName('a');
                blueimp.Gallery(links, options);
            };
		}
	}
});
