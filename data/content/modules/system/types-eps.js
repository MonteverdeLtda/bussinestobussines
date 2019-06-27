var PagesSystemTypesEPS = Vue.extend({
	template: '#page-system-types-eps',
	data: function() {
		return {
			list: [],
			create: {
				code: null,
				nit: null,
				admin: null,
				name: null,
			},
			edit_enabled: false,
			edit: {
				id: null,
				code: null,
				nit: null,
				admin: null,
				name: null,
			}
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
			
				self.load_plugins_this();
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
			self.find();
		},
		find(){
			var self = this;
			
			FG.api('GET', '/types_eps', {
			}, function(a){
				if(a.length > 0 && a[0].id > 0){
					console.log(a);
					self.list = a;
				}
				self.$root._mpb("show",{value: [0,100],speed: 0});
			});
			
		},
		closeEdit(){
			var self = this;
			self.edit_enabled = false;
		},
		openEdit(index){
			var self = this;
			self.edit_enabled = true;
			if(self.list[index] != undefined){
				self.edit = self.list[index];
			}
		},
		delete_element(idDelete){
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
						FG.api('DELETE','/types_eps/' + idDelete, {
						}, function(r){
							if(r == true)
							{
								$.notify("Se elimino con éxito!", "success");
								self.find();
							}else{
								$.notify("Ocurrio un inconveniente al intentar eliminar el elemento!", "error");
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
							}
						});
					}
				}
			});
		},
		create_element(){
			var self = this;
			bootbox.confirm({
				message: "Deseas continuar?",
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
						FG.api('POST','/types_eps', self.create, function(r){
							if(Number(r) > 0)
							{
								$.notify("Se creo con éxito!", "success");
								self.find();
							}else{
								$.notify("Ocurrio un inconveniente al intentar crear el elemento!", "error");
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
							}
						});
					}
				}
			});
		},
		edit_element(){
			var self = this;
			bootbox.confirm({
				message: "Deseas continuar?",
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
						FG.api('PUT','/types_eps/' + self.edit.id, self.edit, function(r){
							if(Number(r) > 0)
							{
								$.notify("Se modificó con éxito!", "success");
								self.find();
							}else{
								$.notify("Ocurrio un inconveniente al intentar modificar el elemento!", "error");
								if(r.data.message && r.data.message != '')
									$.notify(r.data.message, "error");
							}
						});
					}
				}
			});
		},
	}
});
