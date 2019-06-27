var PagesDepartmentsAdd = Vue.extend({
	template: '#page-departments-add',
	data: function() {
		return {
			options: {
				employees: [],
			},
			post: {
				department_name: null,
				departments_manager_employee: null,
				departments_manager_from_date: null,
				departments_manager_to_date: null,
			},
			jvalidate: null,
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.load_options_selects();
	},
	methods: {
		load_options_selects(){
			var self = this;
			self.$root._mpb("show",{value: [0,50],speed: 0});
			
			FG.api('GET', '/employees', {
				join: [
					'types_identifications'
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					console.log(r);
					self.options.employees = r;
					r.forEach(function(el){
						$(".select[name='departments_manager_employee']").append('<option value="'+el.id+'">' + el.first_name + ' ' + el.second_name + ' ' + el.surname + ' ' + el.second_surname + '</option>');
					});
					$(".select[name='departments_manager_employee']").selectpicker('refresh');
				}
				self.load_plugins_this();
			});
		},
		load_plugins_this(){
			var self = this;
			if($(".mask_date").length > 0){ $(".mask_date").datepicker({format: 'yyyy-mm-dd'}); }
			
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
            if($("input").length > 0){
                $("input").on("change", function(){
					for (var k in self.post){
						if (typeof self.post[k] !== 'function') {
							if($(this).attr("name") == k && self.post[k] != $(this).val()){ self.post[k] = $(this).val(); }
						}
					}
                });
			}
			
            if($(".wizard").length > 0){
                $(".wizard > ul").each(function(){
                    $(this).addClass("steps_"+$(this).children("li").length);
                });
                if($("#wizard-validation").length > 0){
                    var validator = $("#wizard-validation").validate({
						rules: {
							department_name: {
								required: true,
								minlength: 3,
								maxlength: 50
							},
							departments_manager_employee: {
								required: true,
							},
							departments_manager_from_date: {
								required: true,
							},
							departments_manager_to_date: {
								required: true,
							},
						},
						messages: {
							department_name: {
								required: "Ingrese el nombre del departamento."
							},
							departments_manager_employee: {
								required: "Seleccione el empleado.",
							},
							departments_manager_from_date: {
								required: "Ingrese la fecha de inicio.",
							},
							departments_manager_to_date: {
								required: "Ingrese la fecha fin, en caso de no saberla puede ingresar 2099-01-01.",
							},
						},
						submitHandler: function() {							
							/* VALIDATE EXIST DEPARTMENT */
							FG.api('GET', '/departments', {
								filter: [
									'name,eq,' + self.post.department_name
								]
							}, function(g){
								if(g[0] != undefined && g[0].id > 0){
									$.notify("El departamento ya existe!", "success");
								}else{
									/* CREATE DEPARTMENT */
									FG.api('POST', '/departments', {
										name: self.post.department_name,
									}, function(h){
										if(Number(h) > 0){
											/* CREATE DEPARTMENT MANAGER */
											FG.api('POST', '/departments_manager', {
												department: h,
												employee: self.post.departments_manager_employee,
												from_date: self.post.departments_manager_from_date,
												to_date: self.post.departments_manager_to_date,
											}, function(i){
												if(Number(i) > 0){
													$.notify("El departamento fue creado correctamente!", "success");
													router.push({
														name: 'page-departments-list',
														params: {
														}
													});
												}
											});
											/* END CREATE DEPARTMENT MANAGER */
										}
									});
									/* END CREATE DEPARTMENT */
								}
							});
							/* END VALIDATE EXIST DEPARTMENT */
							
							
							
							// : null,
							// departments_manager_employee: null,
							// departments_manager_from_date: null,
							// departments_manager_from_date: null,
						},
						onsubmit: true
					});
                }
				
                $(".wizard").smartWizard({
                    onLeaveStep: function(obj){
                        var wizard = obj.parents(".wizard");
                        if(wizard.hasClass("wizard-validation")){
                            var valid = true;
                            $('input,textarea',$(obj.attr("href"))).each(function(i,v){
                                valid = validator.element(v) && valid;
                            });
                            if(!valid){
                                wizard.find(".stepContainer").removeAttr("style");
                                validator.focusInvalid();
                                return false;
                            }
                        }
                        return true;
                    },
                    onShowStep: function(obj){
                        var wizard = obj.parents(".wizard");

                        if(wizard.hasClass("show-submit")){
                        
                            var step_num = obj.attr('rel');
                            var step_max = obj.parents(".anchor").find("li").length;

                            if(step_num == step_max){
                                obj.parents(".wizard").find(".actionBar .btn-primary").css("display","block");
                            }
                        }
                        return true;
                    }
                });
            }
			self.$root._mpb("show",{value: [0,100],speed: 0});
		}
	}
});
