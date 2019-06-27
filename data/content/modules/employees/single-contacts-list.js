
var PagesEmployeesSingleContactsList = Vue.extend({
	template: '#page-employees-single-contacts-list',
	data: function() {
		return {
			employee_id: this.$route.params.employee_id,
			posts: [],
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.$root._mpb("show", {value: [0,0], speed: 1 });
		self.find();
	},
	methods: {
		find: function(){
			var self = this;
			
			FG.api('GET', '/employees_contacts', {
				filter: [
					'employee,eq,' + self.employee_id
				],
				join: [
					'contacts',
					'contacts,types_identifications',
					'contacts,types_contacts',
					'employees',
					'types_contacts',
				]
			}, function(a){
				self.posts = a;
			});
		},
		delete_row(id_contact_relation){
			var self = this;
			
			FG.api('DELETE','/employees_family/' + id_contact_relation, {
			}, function(b){
				if(b == true)
				{
					$.notify("Se elimino con éxito!", "success");
					self.find();
				}else{
					if(r.data.message && r.data.message != ''){
						$.notify(r.data.message, "error");
					}
					$.notify("Ocurrio un inconveniente al intentar eliminar el contacto!", "error");
				}
			});
		},
		calcular_edad(fecha){
			var self = this;
			try {
				hoy=new Date();
				var array_fecha = fecha.split("-");
				if (array_fecha.length!=3){ return false; };
				var ano;
				ano = parseInt(array_fecha[0]);
				if (isNaN(ano)) { return false; }
				var mes;
				mes = parseInt(array_fecha[1]);
				if (isNaN(mes)) { return false; }
				var dia;
				dia = parseInt(array_fecha[2]);
				if (isNaN(dia)) { return false; }
				if (ano<=99){ ano +=1900; }
				edad=hoy.getFullYear()- ano - 1;
				if (hoy.getMonth() + 1 - mes < 0){ return edad; }
				if (hoy.getMonth() + 1 - mes > 0){ return edad+1; }

				//entonces es que eran iguales. miro los dias 
				//si resto los dias y me da menor que 0 entonces no ha cumplido años. Si da mayor o igual si ha cumplido 
				if (hoy.getUTCDate() - dia >= 0) 
					return edad + 1;
				return edad;
			}
			catch(e){
				return 0;
			}
		},
	}
});
