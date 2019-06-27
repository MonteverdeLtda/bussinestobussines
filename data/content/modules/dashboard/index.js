var PagesDashboard = Vue.extend({
	template: '#pages-dashboard',
	data: function() {
		return {
			users: 0,
			accounts_users: 0,
			requests: 0,
			addresses: 0,
			list: {
				requests: [],
			},
			events: [],
			charts: {
				donut: [],
			},
			elements: {
				charts: {
					donut: null,
				},
			}
		};
	},
	created: function() {
		var self = this;
		/*
		$( ".page-content-wrap" ).dialog({
			width: (window.innerWidth/5)*4,
			height: (window.innerHeight/5)*4,
		});
		*/
	},
	mounted: function () {
		var self = this;
		self.load();
		
		$( "#dialogWellcome" ).dialog({
			title: "Bienvenido a B2B",
			dialogClass: "panel panel-default",
			buttons: [
				{
				  text: "Ok",
				  icon: "ui-icon-heart",
				  click: function() {
					$( this ).dialog( "close" );
				  }
				}
			  ]
		});
		$( ".ui-dialog-titlebar" ).hide();
	},
	methods: {
		load(){
			var self = this;
			self.loadTotales();
			self.loadScriptDemo();
		},
		loadTotales(){
			var self = this;
			
			FG.api('GET','/users', {}, function(r){ self.users = r.length; });
			FG.api('GET','/accounts_users', {}, function(r){ self.accounts_users = r.length; });
			FG.api('GET','/requests', {}, function(r){ self.requests = r.length; });
			
			self.loadRequestsPending();
		},
		loadRequestsPending(){
			var self = this;
			FG.api('GET','/requests', {
				filter: [
					'status,in,1',
				],
				join: [
					'accounts',
					'status_requests',
				]
			}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					a.forEach(function(b){
						self.list.requests.push(b);
					});
				}
				
				self.loadCharts();
			});
		},
		loadCharts(){
			var self = this;
			/* Donut dashboard chart */
			self.elements.charts.donut = Morris.Donut({
				element: 'dashboard-donut-1',
				data: [ {label: "No data", value: 100 }, ],
				colors: ['#33414E', '#1caf9a', '#FEA223'],
				resize: true
			});
			self.loadEvents();
			/* END Donut dashboard chart */
			
		},
		loadEvents(){
			var self = this;
			self.charts.donut = [];
			FG.api('GET','/types_events', {}, function(a){
				if(a[0] != undefined && a[0].id > 0){
					a.forEach(function(b){
						self.charts.donut.push({
							label: b.name,
							value: 0
						})
					});
					var array = [];
					var arrayAxul = self.charts.donut.filter(event => event != null);
					arrayAxul.forEach(function(e){
						array.push({
							label: e.label,
							value: Number(e.value)
						});
					});
				}
				
			});
		},
		loadScriptDemo: function(){
			var self = this;
			/* reportrange */
			if($("#reportrange").length > 0){   
				$("#reportrange").daterangepicker({                    
					ranges: {
					   'Today': [moment(), moment()],
					   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
					   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
					   'This Month': [moment().startOf('month'), moment().endOf('month')],
					   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
					},
					opens: 'left',
					buttonClasses: ['btn btn-default'],
					applyClass: 'btn-small btn-primary',
					cancelClass: 'btn-small',
					format: 'MM.DD.YYYY',
					separator: ' to ',
					startDate: moment().subtract('days', 29),
					endDate: moment()            
				  },function(start, end) {
					  $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
				});
				
				$("#reportrange span").html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
			}
			
			/* Bar dashboard chart */
			Morris.Bar({
				element: 'dashboard-bar-1',
				data: [
					{ y: 'Oct 10', a: 75, b: 35 },
					{ y: 'Oct 11', a: 64, b: 26 },
					{ y: 'Oct 12', a: 78, b: 39 },
					{ y: 'Oct 13', a: 82, b: 34 },
					{ y: 'Oct 14', a: 86, b: 39 },
					{ y: 'Oct 15', a: 94, b: 40 },
					{ y: 'Oct 16', a: 96, b: 41 }
				],
				xkey: 'y',
				ykeys: ['a', 'b'],
				labels: ['New Users', 'Returned'],
				barColors: ['#33414E', '#1caf9a'],
				gridTextSize: '10px',
				hideHover: true,
				resize: true,
				gridLineColor: '#E5E5E5'
			});
			/* END Bar dashboard chart */
			
			/* Line dashboard chart */
			Morris.Line({
			  element: 'dashboard-line-1',
			  data: [
				{ y: '2014-10-10', a: 2,b: 4},
				{ y: '2014-10-11', a: 4,b: 6},
				{ y: '2014-10-12', a: 7,b: 10},
				{ y: '2014-10-13', a: 5,b: 7},
				{ y: '2014-10-14', a: 6,b: 9},
				{ y: '2014-10-15', a: 9,b: 12},
				{ y: '2014-10-16', a: 18,b: 20}
			  ],
			  xkey: 'y',
			  ykeys: ['a','b'],
			  labels: ['Sales','Event'],
			  resize: true,
			  hideHover: true,
			  xLabels: 'day',
			  gridTextSize: '10px',
			  lineColors: ['#1caf9a','#33414E'],
			  gridLineColor: '#E5E5E5'
			});   
			/* EMD Line dashboard chart */
			
			/* Moris Area Chart */
			Morris.Area({
			  element: 'dashboard-area-1',
			  data: [
				{ y: '2014-10-10', a: 17,b: 19},
				{ y: '2014-10-11', a: 19,b: 21},
				{ y: '2014-10-12', a: 22,b: 25},
				{ y: '2014-10-13', a: 20,b: 22},
				{ y: '2014-10-14', a: 21,b: 24},
				{ y: '2014-10-15', a: 34,b: 37},
				{ y: '2014-10-16', a: 43,b: 45}
			  ],
			  xkey: 'y',
			  ykeys: ['a','b'],
			  labels: ['Sales','Event'],
			  resize: true,
			  hideHover: true,
			  xLabels: 'day',
			  gridTextSize: '10px',
			  lineColors: ['#1caf9a','#33414E'],
			  gridLineColor: '#E5E5E5'
			});
			/* End Moris Area Chart */
			
			FG.api('GET', '/addresses', {
			}, function(r){
				if(r.length > 0 && r[0].id > 0){
					self.addresses = r;
					
					array = [];
					r.forEach(function(e){
						array.push({
							latLng: [e.lat, e.lon], 
							name: e.display_name
						});
					});
					
					/* Vector Map */
					var jvm_wm = new jvm.WorldMap({container: $('#dashboard-map-seles'),
							map: 'world_mill_en', 
							zoomMax: 18, 
							backgroundColor: '#FFFFFF',                                      
							regionsSelectable: true,
							regionStyle: {selected: {fill: '#B64645'},
											initial: {fill: '#33414E'}},
							markerStyle: {initial: {fill: '#1caf9a',
										   stroke: '#1caf9a'}},
							markers: array
						});
					$(".x-navigation-minimize").on("click",function(){
						setTimeout(function(){
							//rdc_resize();
						},200);    
					});
				}
			});
		}
	}
});
