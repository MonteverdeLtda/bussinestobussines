<audio id="audio-alert" src="/audio/alert.mp3" preload="auto"></audio>
<audio id="audio-fail" src="/audio/fail.mp3" preload="auto"></audio>

<!-- MESSAGE BOX-->
<div class="message-box animated fadeIn" data-sound="alert" id="mb-signout">
	<div class="mb-container">
		<div class="mb-middle">
			<div class="mb-title"><span class="fa fa-sign-out"></span> ¿Cerrar  <strong>sesión</strong>?</div>
			<div class="mb-content">
				<p>¿Estás seguro de que quieres cerrar sesión?</p>                    
				<p>Presione No si desea continuar trabajando. Presione Sí para cerrar la sesión del usuario actual.</p>
			</div>
			<div class="mb-footer">
				<div class="pull-right">
					<a @click="LogOut();" class="btn btn-success btn-lg">Si</a>
					<button class="btn btn-default btn-lg mb-control-close">No</button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- END MESSAGE BOX-->


<!-- BLUEIMP GALLERY -->
<div id="blueimp-gallery" class="blueimp-gallery blueimp-gallery-controls">
	<div class="slides"></div>
	<h3 class="title"></h3>
	<a class="prev">‹</a>
	<a class="next">›</a>
	<a class="close">×</a>
	<a class="play-pause"></a>
	<ol class="indicator"></ol>
</div>      
<!-- END BLUEIMP GALLERY -->   


<component-site-settings></component-site-settings>