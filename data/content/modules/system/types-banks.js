var PagesSystemTypesBanks = Vue.extend({
	template: '#page-system-types-banks',
	data: function() {
		return {
			list: [],
			create: this.$root.MV().typesBanks.Model(1),
			edit_enabled: false,
			edit: this.$root.MV().typesBanks.Model()
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
			self.$root.MV().typesBanks.list({}, function(a){
				if(a[0] != undefined && a[0].id > 0){
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
			self.$root.MV().typesBanks.trash(idDelete, function(a){
				if(a == true){
					$.notify("Se elimino con éxito!", "success");
					self.find();
				}else{
					$.notify("Ocurrio un inconveniente al intentar eliminar el elemento!", "error");
				}
			});
		},
		create_element(){
			var self = this;
			self.$root.MV().typesBanks.create(self.create, function(a){
				if(a == true){
					$.notify("Se creo con éxito!", "success");
					self.find();
				}else{
					$.notify("Ocurrio un inconveniente al intentar crear el elemento!", "error");
				}
				self.$root._mpb("show",{value: [0,100],speed: 0});
			});	
			
		},
		edit_element(){
			var self = this;
			self.$root.MV().typesBanks.edit(self.edit, function(a){
				if(a == true){
					$.notify("Se modificó con éxito!", "success");
					self.find();
				}else{
					$.notify("Ocurrio un inconveniente al intentar modificar el elemento!", "error");
				}
				self.$root._mpb("show",{value: [0,100],speed: 0});
			});
			
		},
	}
});
