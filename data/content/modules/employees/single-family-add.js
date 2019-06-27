
var PagesEmployeesSingleFamilyAdd = Vue.extend({
	template: '#page-employees-single-family-add',
	data: function() {
		return {
			employee_id: this.$route.params.employee_id,
			options: {
				contacts: [],
				types_contacts: [],
			},
			post: {
				employee: this.$route.params.employee_id,
				contact: 0,
				type_contact: 0,
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show", {value: [0,0], speed: 1 });
		self.load_scripts();
	},
	methods: {
		load_scripts(){
			var self = this;
			
			if($(".select").length > 0){
                $(".select").selectpicker();
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).attr("name") == k && self.post[k] != $(this).val()){
								self.post[k] = $(this).val();
							}
						}
					}
                });
			}
			
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				wrapper: "div.item",
                ignore: [],
                rules: {
					"contact": {
						required: true
					},
					"type_contact": {
						required: true
					},
				},
				messages: {
					"contact": {
						required: "Selecciona el contacto."
					},
					"type_contact": {
						required: "Selecciona el tipo de contacto."
					},
				},
				submitHandler: function() {
					newContact = {};
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							newContact[k] = self.post[k];
						}
					}
					console.log(newContact);
					
					FG.api('POST', '/employees_family', self.post, function (b) {
						if(Number(b) > 0)
						{
							$.notify("El contacto fue añadido correctamente.!", "success");
							router.push({
								name: 'page-employees-single-family-list',
								params: {
									employee_id: self.$route.params.employee_id
								}
							});
						}
					});
				},
				onsubmit: true
			});
			self.load_options();
		},
		load_options(){
			var self = this;
			FG.api('GET', '/contacts', {
			}, function(a){
				if(a.length > 0 && a[0].id > 0){
					a.forEach(function(b){
						$("select[name='contact']").append('<option value="' + b.id + '">' + b.identification_number + ' - ' + b.first_name + ' ' + b.second_name + ' ' + b.surname + ' ' + b.second_surname + '</option>');
					});
					$("select[name='contact']").selectpicker('refresh');
				}
				
				FG.api('GET', '/types_contacts', {
				}, function(a){
					if(a.length > 0 && a[0].id > 0){
						a.forEach(function(b){
							$("select[name='type_contact']").append('<option value="'+b.id+'">'+b.name+'</option>');
						});
						$("select[name='type_contact']").selectpicker('refresh');
					}
				});
			});
		},
		find(){
			var self = this;
		},
	}
});
