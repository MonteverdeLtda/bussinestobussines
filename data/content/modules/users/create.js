
var PagesUsersAdd = Vue.extend({
	template: '#page-users-add',
	data: function() {
		return {
			options: {
				permissions: [],
				pictures: [],
			},
			post: {
				username: null,
				names: null,
				surname: null,
				second_surname: null,
				phone: null,
				mobile: null,
				mail: null,
				password: null,
				avatar: 0,
				permissions: 0,
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,0],speed: 1});
	},
	mounted: function () {
		var self = this;
		self.load_plugins_this();
		self.load_options_selects();
	},
	methods: {
		load_options_selects(){
			var self = this;
			FG.api('GET', '/permissions', {
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.permissions = r;
					r.forEach(function(el){
						$(".select[data-v-model='permissions']").append('<option value="'+el.id+'">'+el.name+'</option>');
					});
					$(".select[data-v-model='permissions']").selectpicker('refresh');
					self.$root._mpb("show",{value: [0,20],speed: 1});
					
					FG.api('GET', '/pictures', {
					}, function(r){
						self.$root._mpb("show",{value: [0,40],speed: 1});
						if(r.length > 0 && r[0].id > 0){
							self.options.pictures = r;
							r.forEach(function(el){
								$(".select[data-v-model='avatar']").append('<option value="'+el.id+'">' + el.id + ' - ' + el.name + '</option>');
							});
							$(".select[data-v-model='avatar']").selectpicker('refresh');
							self.$root._mpb("show",{value: [0,100],speed: 5});
						}
					});
				}
			});
		},
		load_plugins_this(){
			var self = this;
			//$("input.mask_date").mask('9999-99-99');
            //$("input.mask_phone_ext").mask('999 9999? x99999');
            //$("input.mask_phone_mobile").mask('999 999 9999');
				
            if($(".select").length > 0){
				$('.selectpicker').selectpicker('destroy');
                $(".select").selectpicker();				
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).data("v-model") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
							}
						}
					}
                });
			}
			
			self.$root._mpb("show",{value: [0,100],speed: 1});
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				wrapper: "div.item",
                ignore: [],
                rules: {
					"username": {
						required: true
					},
					"names": {
						required: true
					},
					"surname": {
						required: true
					},
					"second_surname": {
						required: false
					},
					"phone": {
						required: false
					},
					"mobile": {
						required: false
					},
					"mail": {
						required: true
					},
					"permissions": {
						required: true
					},
					"password": {
						required: true
					},
				},
				messages: {
					"username": {
						required: "Ingresa el usuario/login."
					},
					"names": {
						required: "Ingresa el/los nombre(s) real(es) del usuario."
					},
					"surname": {
						required: "Escribe el primer apellido del usuario."
					},
					"mail": {
						required: "Escribe el correo electronico del usuario."
					},
					"permissions": {
						required: "Selecciona el perfil de permisos de este usuario."
					},
					"password": {
						required: "Ingresa la contraseña del usuario."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){ if (typeof self.post[k] !== 'function') { newContact[k] = self.post[k]; } }
					
					
					FG.api('GET', '/users', {
						filter: [
							'username,eq,' + self.post.username,
						]
					}, function (a) {
						if(a.length > 0){
							$.notify("El usuario ya existe!", "error");
						}else{
							FG.api('POST', '/users', self.post, function (b) {
								if(Number(b) > 0)
								{
									$.notify("El usuario fue creado con éxito.!", "success");
									router.push({
										name: 'page-users-list'
									});
								}
							});
						}
					});
				},
				onsubmit: true
			});
		}
	}
});
