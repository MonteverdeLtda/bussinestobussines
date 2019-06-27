
var PagesEmployeesSingleView = Vue.extend({
	template: '#page-employees-single-view',
	data: function() {
		return {
			post: {
				"id": this.$route.params.employee_id,
				"first_name": null,
				"second_name": null,
				"surname": null,
				"second_surname": null,
				"identification_type": {
					"id": null,
					"name": null
				},
				"identification_number": null,
				"identification_date_expedition": null,
				"birthdate": null,
				"blood_type": {
					"id": null,
					"name": null
				},
				"blood_rh": {
					"id": null,
					"name": null
				},
				"mail": null,
				"number_phone": null,
				"number_mobile": null,
				"company_date_entry": null,
				"company_date_out": null,
				"company_mail": null,
				"company_number_phone": null,
				"company_number_mobile": null,
				"avatar": null,
				"status": {
					"id": null,
					"name": null
				},
				"eps": {
					"id": null,
					"code": null,
					"name": null
				},
				"arl": {
					"id": null,
					"code": null,
					"name": null
				},
				"pension_fund": {
					"id": null,
					"code": null,
					"name": null
				},
				"compensation_fund": {
					"id": null,
					"code": null,
					"name": null
				},
				"severance_fund": {
					"id": null,
					"code": null,
					"name": null
				},
				"department": {
					"id": null,
					"code": null,
					"name": null
				},
				"city": {
					"id": null,
					"name": null,
					"department": null
				},
				"address": null,
				"geo_address": null,
				"observations": null,
				"bank": {
					"id": null,
					"name": null
				},
				"bank_type": {
					"id": null,
					"name": null
				},
				"bank_number": "",
				"eps_active": false,
				"arl_active": false,
				"compensation_fund_active": false,
				"pension_fund_active": false,
				"gender": {
					"id": null,
					"name": null
				},
			},
			
		};
	},
	created: function () {
		var self = this;
	},
	mounted: function () {
		var self = this;
		self.load_scripts();
		self.find();
	},
	methods: {
		load_scripts(){
			var self = this;
			
			$('input,select,textarea').on('focusin', function(){
				if($(this).data('val') == undefined){
					$(this).data('val', $(this).val());
				}else{
					$(this).val($(this).data('val'));
				}
			});
			
			$('input,select,textarea').on('focusout', function(){ $(this).val($(this).data('val')); });
		},
		find(){
			var self = this;
			FG.api('GET', '/employees/' + this.$route.params.employee_id, {
				join: [
					'types_identifications',
					'types_bloods_rhs',
					'types_bloods',
					'status_employees',
					'types_eps',
					'types_arls',
					'funds_pensions',
					'funds_compensations',
					'funds_severances',
					'geo_departments',
					'geo_citys',
					'pictures',
					'banks',
					'types_banks',
					'types_genders',
				]
			}, function(r){
				if(r != undefined && r.id > 0){
					self.post = r;
				}else{
					$.notify("El empleado no fue encontrado.", "warn");
					router.push({
						name: 'page-employees-list',
						params: {}
					});
				}
			});
		},
	}
});
