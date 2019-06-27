var PagesDepartmentsList = Vue.extend({
	template: '#page-departments-list',
	data: function() {
		return {
			posts: [],
			DataTable: null,
		};
	},
	created: function () {
		var self = this;
	},
	beforeMount: function () {
		var self = this;
		self.find();
		
	},
	mounted: function () {
		var self = this;	
	},
	methods: {
		find: function(){
			var self = this;
			FG.api('GET', '/departments', {
				join: [
					'departments_manager',
					'departments_manager,employees'
				]
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.posts = r;
				}
			});
		},
		delete_row(department){
			var self = this;
			bootbox.confirm({
				message: "Estas tratando de realizar cambios irreversibles, antes de realizar dichos cambios debes confirmar por seguridad! Deseas continuar?",
				buttons: {
					confirm: {
						label: 'Si',
						className: 'btn-success'
					},
					cancel: {
						label: 'No',
						className: 'btn-danger'
					}
				},
				callback: function (a) {
					if(a === true){
						FG.api('DELETE','/departments/' + department, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								self.find();
							}else{
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
								
								$.notify("Ocurrio un inconveniente al intentar eliminar el departamento!", "error");
							}
						});
					}
				}
			});
		}
	}
});