<template id="component-site-settings">
	<div class="theme-settings">
		<div class="ts-button" @click="$('.theme-settings').toggleClass('active');">
			<span class="fas fa-cog fa-spin"></span>
		</div>
		<div class="ts-body">
			<div class="ts-title">Themes</div>
			<div class="ts-themes">
				<a @click="ChangeTheme('default')" class="default active" ><img src="/img/themes/default.jpg"/></a>            
				<a @click="ChangeTheme('brown')" class="brown"><img src="/img/themes/brown.jpg"/></a>
				<a @click="ChangeTheme('blue')" class="blue"><img src="/img/themes/blue.jpg"/></a>                        
				<a @click="ChangeTheme('white')" class="white"><img src="/img/themes/light.jpg"/></a>            
				<a @click="ChangeTheme('black')" class="black"><img src="/img/themes/black.jpg"/></a>
			</div>
			<div class="ts-title">Layout</div>
			<!-- //
			-->
			<div class="ts-row">
				<label class="check"><input @click="toggleSettings('st_layout_boxed')" type="radio" class="iradio" v-model="$root.theme_settings.st_layout_boxed" name="st_layout_boxed" value="1"  /> Full Width</label>
			</div>
			<div class="ts-row">
				<label class="check"><input @click="toggleSettings('st_layout_boxed')" type="radio" class="iradio" v-model="$root.theme_settings.st_layout_boxed" name="st_layout_boxed" value="0"  /> Boxed</label>
			</div>
			<div class="ts-title">Options</div>
			<div class="ts-row">
				<label class="check"><input @click="toggleSettings('st_head_fixed')" type="checkbox" class="icheckbox" v-model="$root.theme_settings.st_head_fixed" name="st_head_fixed" value="1"/> Fixed Header</label>
			</div>
			<div class="ts-row">
				<label class="check"><input @click="toggleSettings('st_sb_fixed')" type="checkbox" class="icheckbox" v-model="$root.theme_settings.st_sb_fixed" name="st_sb_fixed" value="1" checked/> Fixed Sidebar</label>
			</div>
			<div class="ts-row">
				<label class="check"><input @click="toggleSettings('st_sb_scroll')" type="checkbox" class="icheckbox" v-model="$root.theme_settings.st_sb_scroll" name="st_sb_scroll" value="1"/> Scroll Sidebar</label>
			</div>
			<div class="ts-row">
				<label class="check"><input @click="toggleSettings('st_sb_right')" type="checkbox" class="icheckbox" v-model="$root.theme_settings.st_sb_right" name="st_sb_right" value="0" /> Right Sidebar</label>
			</div>
			<div class="ts-row">
				<label class="check"><input @click="toggleSettings('st_sb_custom')" type="checkbox" class="icheckbox" v-model="$root.theme_settings.st_sb_custom" name="st_sb_custom" value="1"/> Custom Navigation</label>
			</div>
			<div class="ts-row">
				<label class="check"><input @click="toggleSettings('st_sb_toggled')" type="checkbox" class="icheckbox" v-model="$root.theme_settings.st_sb_toggled" name="st_sb_toggled" /> Toggled Navigation</label>
			</div>
			
			<!--
			<table class="table table-responsive">
				<tr v-for="(k,v) in $root.theme_settings">
					<td>{{ k }}</td>
					<td>{{ v }}</td>
				</tr>
			</table>
			-->
		</div>
	</div>
</template>