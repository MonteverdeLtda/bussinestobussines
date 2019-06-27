
var Component_Site_Settings = Vue.component('component-site-settings', {
	template: '#component-site-settings',
	props: [
		''
	],
	mounted: function () {
		var self = this;
		
	},
	methods: {
		toggleSettings: function(name){
			var self = this;
			// self.$root.theme_settings[name]

			// Rules
			if(name === 'st_sb_fixed'){
				if(self.$root.theme_settings.st_sb_fixed == 1){
					self.$root.theme_settings.st_sb_scroll = 1;
				}else{
					self.$root.theme_settings.st_sb_scroll = 0;
				}
			}
			
			if(name === 'st_sb_scroll'){
				if(self.$root.theme_settings.st_sb_scroll == 1 && self.$root.theme_settings.st_layout_boxed == 0){
					self.$root.theme_settings.st_sb_fixed = 1;
				}else if(self.$root.theme_settings.st_sb_scroll == 1 && self.$root.theme_settings.st_layout_boxed == 1){
					self.$root.theme_settings.st_sb_fixed = -1;
				}else if(self.$root.theme_settings.st_sb_scroll == 0 && self.$root.theme_settings.st_layout_boxed == 1){
					self.$root.theme_settings.st_sb_fixed = -1;
				}else{
					self.$root.theme_settings.st_sb_fixed = 0;
				}
			}
			
			if(name === 'st_layout_boxed'){
				if(self.$root.theme_settings.st_layout_boxed == 1){                
					self.$root.theme_settings.st_head_fixed    = -1;
					self.$root.theme_settings.st_sb_fixed      = -1;
					self.$root.theme_settings.st_sb_scroll     = 1;
				}else{
					self.$root.theme_settings.st_head_fixed    = 0;
					self.$root.theme_settings.st_sb_fixed      = 1;
					self.$root.theme_settings.st_sb_scroll     = 1;
				}
			}
			// End Rules
			
			self.set_settings(name);
		},
		ChangeTheme: function(theme, element){
			var self = this; 
			$(".ts-themes a").removeClass("active");
			$(".ts-themes a." + theme).addClass("active");
			
			$("#theme").attr("href", '/css/theme-' + theme + '.css');
			return false;
		},
		load_settings: function(){
			var self = this; 
			self.set_settings(self.$root.theme_settings,false);   
			
		
		},
		set_settings: function(option){
			var self = this;
			/* Start Header Fixed */
			if(self.$root.theme_settings.st_head_fixed == 1)
				$(".page-container").addClass("page-navigation-top-fixed");
			else
				$(".page-container").removeClass("page-navigation-top-fixed");
			
			/* Start Sidebar Fixed */
			if(self.$root.theme_settings.st_sb_fixed == 1){        
				$(".page-sidebar").addClass("page-sidebar-fixed");
			}else
				$(".page-sidebar").removeClass("page-sidebar-fixed");
			
			/* Start Sidebar Fixed */
			if(self.$root.theme_settings.st_sb_scroll == 1){          
				$(".page-sidebar").addClass("scroll").mCustomScrollbar("update");        
			}else
				$(".page-sidebar").removeClass("scroll").css("height","").mCustomScrollbar("disable",true);
			
			/* Start Right Sidebar */
			if(self.$root.theme_settings.st_sb_right == 1)
				$(".page-container").addClass("page-mode-rtl");
			else
				$(".page-container").removeClass("page-mode-rtl");
			
			/* Start Custom Sidebar */
			if(self.$root.theme_settings.st_sb_custom == 1)
				$(".page-sidebar .x-navigation").addClass("x-navigation-custom");
			else
				$(".page-sidebar .x-navigation").removeClass("x-navigation-custom");
			
			/* Start Custom Sidebar */
			if(option && option === 'st_sb_toggled'){
				if(self.$root.theme_settings.st_sb_toggled == false){
					$(".page-container").addClass("page-navigation-toggled");
					$(".x-navigation-minimize").trigger("click");
				}else{          
					$(".page-container").removeClass("page-navigation-toggled");
					$(".x-navigation-minimize").trigger("click");
				}
			}
			
			/* Start Layout Boxed */
			if(self.$root.theme_settings.st_layout_boxed == true)
				$("body").addClass("page-container-boxed");
			else
				$("body").removeClass("page-container-boxed");
			
			if(option === false || option === 'st_layout_boxed' || option === 'st_sb_fixed' || option === 'st_sb_scroll'){        
				for(option in self.$root.theme_settings){
					//self.set_settings_checkbox(option,self.$root.theme_settings[option]);
				}
			}
			$(window).resize();
		},
	}
});
