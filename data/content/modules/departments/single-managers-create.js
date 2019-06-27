var PagesDepartmentsManagersAdd = Vue.extend({
	template: '#page-departments-managers-add',
	data: function() {
		return {
			options: {
				employees: [],
			},
			post: {
				department: this.$route.params.department_id,
				employee: null,
				from_date: null,
				to_date: null,
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
		self.$root._mpb("show",{value: [0,50],speed: 0});
	},
	mounted: function () {
		var self = this;
		self.load_options();
	},
	methods: {
		load_options(){
			var self = this;
	
			FG.api('GET', '/employees', {}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.options.employees = r;
					r.forEach(function(el){
						$(".select[name='employee']").append('<option value="'+el.id+'">' + el.first_name + ' ' + el.second_name + ' ' + el.surname + ' ' + el.second_surname + '</option>');
					});
					$(".select[name='employee']").selectpicker('refresh');
				}
				self.load_plugins_this();
			});
			
		},
		load_plugins_this(){
			var self = this;
            if($(".select").length > 0){
                $(".select").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).attr("name") == k && self.post[k] != $(this).val()){ self.post[k] = $(this).val(); }
						}
					}
                });
			}
            if($("input").length > 0){
                $("input").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).attr("name") == k && self.post[k] != $(this).val()){ self.post[k] = $(this).val(); }
						}
					}
                });
			}
			
			$(".datepicker").datepicker({format: 'yyyy-mm-dd'});
			
			self.jvalidate = $("#jvalidate").validate({
				debug: true,
				errorLabelContainer: "#messageBox",
				//wrapper: "div.alert.alert-danger",
				wrapper: "div.item",
				//errorContainer: ".form-group",
                ignore: [],
                rules: {
					"employee": {
						required: true
					},
					"from_date": {
						required: true
					},
					"to_date": {
						required: true
					},
				},
				messages: {
					"employee": {
						required: "Selecciona el empleado."
					},
					"from_date": {
						required: "Ingresa la fecha de Inicio."
					},
					"to_date": {
						required: "Ingresa la fecha de Salida."
					},
				},
				submitHandler: function() {
					FG.api('POST', '/departments_manager', self.post, function(i){
						if(Number(i) > 0){
							$.notify("El departamento fue creado correctamente!", "success");
							router.push({
								name: 'page-departments-edit',
								params: {
									department_id: self.$route.params.department_id
								}
							});
						}else{
							$.notify("Ocurrio un inconveniente al actualizar la informacion!", "error");
							if(r.data.message && r.data.message != ''){
								$.notify(r.data.message, "error");
							}
						}
					});
				},
				onsubmit: true
			});
			
			
		},
	}
});
