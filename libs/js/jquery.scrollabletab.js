/*
* $Workfile: jquery.scrollabletab.js $
* $Revision: 7 $
* $Modtime: 8/11/10 16:03 $
* $Author: Aamir.afridi $
*
* jQuery.ScrollableTab - Scrolling multiple tabs.
*
* @copyright (c) 2010 Astun Technology
* @date Created: 28/08/2010
* @author Aamir Afridi
* @version 2.0
*/

(function($, undefined) {
    if (!$.xui) {
        $.xui = {};
    }
    var tabs = $.extend({}, $.ui.tabs.prototype),
        _super = {
            _create: tabs._create,
			_tabify: tabs._tabify,
            _destroy: tabs._destroy,
            _update: tabs._update
        };
    $.xui.tabs = $.extend(tabs, {
        options: $.extend({}, tabs.options, {
            scrollable: false,
            closable: false,
			animationSpeed : 500
        }),
        _create: function() {
            var self = this,
                o = self.options;
            _super._create.apply(self);
            if (o.scrollable) {
				//Add class to the parent so we can style it in css externally
				var $tabs = self.element,
					$parent = $tabs.wrap('<div></div>').parent().addClass('ui-scrollable-tabs ui-widget-content ui-corner-all'),
					$nav = self.element.find(".ui-tabs-nav:first").removeClass('ui-corner-all'),
					$arrowsNav = $('<ol class="ui-helper-reset ui-helper-clearfix ui-tabs-nav-arrows"></ol>').prependTo($parent),
					$navPrev = $('<li class="ui-tabs-arrow-previous ui-state-default" title="Previous"><a href="#"><span class="ui-icon ui-icon-carat-1-w">Previous tab</span></a></li>').prependTo($arrowsNav),
                    $navNext = $('<li class="ui-tabs-arrow-next ui-state-default" title="Next"><a href="#"><span class="ui-icon ui-icon-carat-1-e">Next tab</span></a></li>').appendTo($arrowsNav);
					$.fn.reverse = [].reverse;
				
				function _init()
				{
					_addclosebutton();
					_showNavsIfNeeded();
					
					//Next
					$navNext.click(function(){
						var $nextTab = $nav.find('li.ui-tabs-selected').next('li');
						if($nextTab.length)
						{
							$nextTab.find('a').trigger('click');
						}
						else
						{
							//d('you are on last tab');
						}
					});
					
					//Prev
					$navPrev.click(function(){
						var $prevTab = $nav.find('li.ui-tabs-selected').prev('li');
						if($prevTab.length)
						{
							$prevTab.find('a').trigger('click');
						}
						else
						{
							//d('you are on first tab');
						}
					});
					
					//On select check if hidden than scroll it
					$tabs.bind( "tabsselect", function(event, ui) {
						//d('tab selectedddd');
						//_showNavsIfNeeded();
						var $tab = $(ui.tab).parent();
						//If last tab than hide next arrow
						if($tab.next('li').length==0) //Last tab is selected
						{
							$navNext.hide('fade');
						}
						//Check if hidden on any side
						var hiddenOn = _getHiddenOnSide($tab);
						//Animate if required
						_animateListToLi( hiddenOn.right ? 'left' : hiddenOn.left ? 'right' : 'none', $tab);
					})
					.bind( "tabsadd", function(event, ui) {
						var $tab = $(ui.tab).parent();
							//Add close button to the newely created tab
							_addclosebutton($tab)
							//Show close buttons as we have more than 1 tab
							$tabs.find('.ui-tabs-close').show();
							$nav.addClass('ui-tabs-closable');
							//Select the tab
							//$tab.find('a').trigger('click');
					}).bind( "tabsremove", function(event, ui) {
						if(!o.closable) return;
						//Check if there is only one tab than hide the close button
						//if($tabs.tabs('length')==1)
						//{
						//	$tabs.find('li .ui-tabs-close').hide();
						//	$nav.removeClass('ui-tabs-closable')
						//}
						
						//If there are few tabs than no arrows need to be shown
						if(_allLiWidth() < $arrowsNav.width())
						{
							$navNext.hide('fade');
							$navPrev.hide('fade');
							return;
						}
						
						//Check if last tab is in view than scroll the tabs to the right
						if(!_getHiddenOnSide($nav.find('li:last')).right)
						{
							_animateListToLi( 'left', $nav.find('li:last'));
						}
						
						_showNavsIfNeeded();
					});
					
				}
				
				
				function _getHiddenOnSide($tab)
				{
					//First check on right
					//Get tabs offsetLeft plus its width  -  offsetLeft of the list minus
					var hiddenOn = new Object();
					if($tab.next('li').length!=0)
					{
						hiddenOn.right = $tab.next('li')[0].offsetLeft + 15;
					}
					else
					{
						hiddenOn.right = $tab[0].offsetLeft + $tab.outerWidth(true) ;
					}
					
					hiddenOn.right = hiddenOn.right + $nav[0].offsetLeft > $arrowsNav.width();
					
					//Now check for left
					hiddenOn.left = $tab[0].offsetLeft + $nav[0].offsetLeft < 0 + ($navPrev.is(':visible') ? $navPrev.outerWidth() : 0 );
					
					return hiddenOn;
				}
				
				
				function _animateListToLi(side, $tab)
				{
					//d(side);
					if(side=='none') return;
					
					if(side=='left')
					{	
						//Show prev
						$navPrev.show('fade');
						//If there is no more tabs next than hide next arrow
						//d('>'+$tab.next('li').length);
						if($tab.next('li').length==0)
						{
							$navNext.hide('fade');
						}

						var listPull = 0;
						
						if($tab.next('li').length!=0)
						{
							listPull = $tab.next('li')[0].offsetLeft;
						}
						else
						{
							listPull = $tab[0].offsetLeft + $tab.outerWidth(true);
						}
						listPull = $arrowsNav.width() - listPull;
						
						//Also the next arrow width need to be reduced from the pull
						listPull = listPull - ( $tab.next('li').length==0 ? 1 : $navNext.outerWidth() );
						listPull = listPull + 'px';
						//d(listPull);
						$nav.animate({ 'margin-left' : listPull }, o.animationSpeed);
					}
					else//right
					{
						//Show next
						$navNext.show('fade');
						//If there is no more tabs prev than hide prev arrow
						if($tab.prev('li').length==0)
						{
							$navPrev.hide('fade');
						}
						
						var listPush = 0;
						
						//Check if this is the first tab
						var prevArrowWidth = $tab.prev('li').length==0 ? 2 : $navPrev.outerWidth()+2;
						
						listPush = ($tab[0].offsetLeft - prevArrowWidth) * -1;
						
						//d(listPush);
						
						$nav.animate({ 'margin-left' : listPush },o.animationSpeed);
					}
					
				}
				
				function _allLiWidth($li)
				{
					if($nav.find('li:last')[0]) {
						var width = $li ? $li[0].offsetLeft + $li.outerWidth(true) : $nav.find('li:last')[0].offsetLeft + $nav.find('li:last').outerWidth(true);
						//d(width);
						return width;
					}
					return 0;
				}
				
				function _showNavsIfNeeded()
				{	
					if(_allLiWidth() > $arrowsNav.width())
					{
						$navNext.show('fade');
					}
					
					else
					{
						$navNext.hide('fade');
						$navPrev.hide('fade');
						$nav.css('margin-left',0);
					}
				}
				
				function _addclosebutton($li)
				{
					if(!o.closable) return;
					//If li is provide than just add to that, otherwise add to all
					var lis = $li || $nav.addClass('ui-tabs-closable').find('li');
					lis.each(function(){
		
						var $thisLi = $(this).addClass('stHasCloseBtn');
						$(this)
						.append(
							$('<span/>')
								.addClass('ui-state-default ui-corner-all ui-tabs-close')
								.hover(function(){ $(this).toggleClass('ui-state-hover') })
								.append(
									$('<span/>')
										.addClass('ui-icon ui-icon-circle-close')
										.html('Close')
										.attr('title','Close this tab')
										.click(function(e){
											//Remove tab using UI method
											//$tabs.tabs('remove',$thisLi.prevAll('li').length); //Here $thisLi.index( $lis.index($thisLi) ) will not work as when we remove a tab, the index will change / Better way?
											//If you want to add more stuff here, better add to the tabsremove event binded in _init() method above
										})
									)
		
						)
						//If width not assigned, the hidden tabs width cannot be calculated properly in _adjustLeftPosition
						//.width($thisLi.outerWidth())
					});
				}
				
				
				$.fn.refreshTabs = function()
				{
					//Re-select the tab
					var $selTab = $nav.find('li.ui-tabs-selected');
					$tabs.trigger('tabsselect', [ { tab : $selTab.find('a') } ]);
					
					//return;
					//setTimeout(function(){
					if(_allLiWidth() > $arrowsNav.width())
					{
						
						if($selTab.next('li').length!=0)
						{
							$navNext.show('fade');
						}
						
						var $lastTab = $nav.find('li:last');
						var pull = $lastTab[0].offsetLeft + $lastTab.outerWidth(true);
						var diff = $arrowsNav.width() - $nav[0].offsetLeft - pull;
						//d(diff);
						if(diff>1)
						{
							//d('ADJUSTMENT NEEDED = ' + diff);
							$nav.css('margin-left', $nav[0].offsetLeft + diff - 1 );
							$navNext.hide('fade');
						}
					}
					else
					{
						$navNext.hide('fade');
						$navPrev.hide('fade');
						$nav.css('margin-left',0);
					}
					//},0);
				};
				
				//Start scrolling
				_init();
				
			}
            return self;
        },
        _update: function(){
            console.log(arguments);
            _super._update.apply(this);
        }
    });
    $.widget("xui.tabs", $.xui.tabs);
})(jQuery);