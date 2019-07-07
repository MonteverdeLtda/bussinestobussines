
var PagesEmployeesEventsStaffList = Vue.extend({
	template: '#page-events-staff-lists',
	data: function() {
		return {
			options: {
			},
			post: {
				"id": this.$route.params.request_id,
			},
			posts: [],
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
	beforeMount(){
		var self = this;
	},
	methods: {
		find: function(){
			// self.$root._mpb("show",{value: [0,100],speed: 0});
			var self = this;
			self.posts = [];
			FG.api('GET', '/events_staff_employees', {
				join: [
					'types_events',
				],
				filter: [
					'employee,eq,' + self.$route.params.employee_id
				],
			}, function(r){
				if(r[0] != undefined && r[0].id > 0){
					self.posts = r;
				}
			});
		},
		addGroup(){
			var self = this;
			FG.api('GET', '/types_events', {}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					inputOptions_temp = [];
					a.forEach(function(b){
						inputOptions_temp.push({
							text: b.name,
							value: b.id
						});
					});
					
					bootbox.prompt({
						title: "Grupos Disponibles",
						message: '<p>Seleccione el grupo al que desea agregar el empleado.</p>',
						inputType: 'radio',
						inputOptions: inputOptions_temp,
						callback: function (c) {
							if(c > 0){
								FG.api('POST', '/events_staff_employees', {
									employee: self.$route.params.employee_id,
									group: c
								}, function(r){
									if(r > 0){
										$.notify("El empleado fue añadido al grupo.", 'success');
										self.find();
									}else{
										$.notify("Ocurrio un error al añadir el empleado al grupo.", 'error');
									}
								});
							}
						}
					});
				}
			});
					
		},
		delete_group(group_id){
			var self = this;
			bootbox.confirm({
				title: "Estas Seguro?",
				message: "Desea quitar el empleado de este grupo? Confirma pulsando en el botón aceptar.",
				buttons: {
					cancel: {
						label: '<i class="fa fa-times"></i> Cancelar'
					},
					confirm: {
						label: '<i class="fa fa-check"></i> Aceptar'
					}
				},
				callback: function (result) {
					if(result == true){
						FG.api('DELETE', '/events_staff_employees/' + group_id, {
							filter: [
								'employee,eq,' + self.$route.params.employee_id
							]
						}, function(r){
							if(r > 0){
								$.notify("El empleado fue removido del grupo.", 'success');
								self.find();
							}else{
								$.notify("Ocurrio un error removiendo el empleado del grupo.", 'error');
							}
							$('#modal_basic').modal('hide');
						});
					}
				}
			});
		},
	}
});
