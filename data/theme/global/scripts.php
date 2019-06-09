<!-- START PLUGINS -->
<script type="text/javascript" src="/js/plugins/jquery/jquery.min.js"></script>
<script type="text/javascript" src="/js/plugins/jquery/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/plugins/bootstrap/bootstrap.min.js"></script>
<!-- END PLUGINS -->

<!-- START THIS PAGE PLUGINS-->
<script type='text/javascript' src='/js/plugins/bootbox/bootbox.all.js'></script>
<script type='text/javascript' src='/js/plugins/notifyjs/notify.min.js'></script>

<script type='text/javascript' src='/js/plugins/icheck/icheck.min.js'></script>
<script type="text/javascript" src="/js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js"></script>

<script type="text/javascript" src="/js/plugins/scrolltotop/scrolltopcontrol.js"></script>
<script type="text/javascript" src="/js/plugins/morris/raphael-min.js"></script>
<script type="text/javascript" src="/js/plugins/morris/morris.min.js"></script>
<script type="text/javascript" src="/js/plugins/rickshaw/d3.v3.js"></script>
<script type="text/javascript" src="/js/plugins/rickshaw/rickshaw.min.js"></script>
<script type='text/javascript' src='/js/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js'></script>
<script type='text/javascript' src='/js/plugins/jvectormap/jquery-jvectormap-world-mill-en.js'></script>
<script type='text/javascript' src='/js/plugins/bootstrap/bootstrap-datepicker.js'></script>
<script type="text/javascript" src="/js/plugins/bootstrap/bootstrap-timepicker.min.js"></script>
<script type="text/javascript" src="/js/plugins/bootstrap/bootstrap-colorpicker.js"></script>
<script type="text/javascript" src="/js/plugins/owl/owl.carousel.min.js"></script>
<script type="text/javascript" src="/js/plugins/moment.min.js"></script>
<script type="text/javascript" src="/js/plugins/daterangepicker/daterangepicker.js"></script>
<script type="text/javascript" src="/js/plugins/blueimp/jquery.blueimp-gallery.min.js"></script>
<script type="text/javascript" src="/js/plugins/dropzone/dropzone.min.js"></script>
<script type="text/javascript" src="/js/plugins/bootstrap/bootstrap-file-input.js"></script>
<script type="text/javascript" src="/js/plugins/bootstrap/bootstrap-select.js"></script>
<script type="text/javascript" src="/js/plugins/tagsinput/jquery.tagsinput.min.js"></script>
<script type="text/javascript" src="/js/plugins/morris/raphael-min.js"></script>
<script type="text/javascript" src="/js/plugins/morris/morris.min.js"></script>
<script type="text/javascript" src="/js/plugins/nvd3/lib/d3.v3.js"></script>
<script type="text/javascript" src="/js/plugins/nvd3/nv.d3.min.js"></script>
<script type="text/javascript" src="/js/plugins/datatables/jquery.dataTables.min.js"></script>    
   
<script type='text/javascript' src='/js/plugins/validationengine/languages/jquery.validationEngine-en.js'></script>
<script type='text/javascript' src='/js/plugins/validationengine/jquery.validationEngine.js'></script>
<script type='text/javascript' src='/js/plugins/jquery-validation/jquery.validate.js'></script>
<script type='text/javascript' src='/js/plugins/maskedinput/jquery.maskedinput.min.js'></script>

        <script type="text/javascript" src="/js/plugins/moment.min.js"></script>
        <script type="text/javascript" src="/js/plugins/fullcalendar/fullcalendar.min.js"></script>

<!-- END THIS PAGE PLUGINS-->
<script type="text/javascript">
	(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return};
		js = d.createElement(s);
		js.id = id;
		js.src = "https://b2b.monteverdeltda.com/api/sdk/ES_CO/sdk.js?version=1";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'feliphegomez-jssdk'));

	window.fgAsyncInit = function() {
		Vue.FG = null;

		 function checkLoginState(response){
			if (response.status === 'connected'){ console.log('Usuario Conectado para window.fgAsyncInit'); } 
			else { console.log('Usuario NO Conectado para window.fgAsyncInit'); };
			Vue.use(MyPlugin, FG);
			RunPage();
		};
			
		FG.getLoginStatus(function(response) {
			Vue.FG = FG;
			checkLoginState(response);
		});
	}
</script>