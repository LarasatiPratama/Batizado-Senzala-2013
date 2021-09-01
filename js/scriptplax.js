//Plax
(function($){var maxfps=25,delay=1/maxfps*1000,lastRender=new Date().getTime(),layers=[],plaxActivityTarget=$(window),motionMax=1,motionStartX=null,motionStartY=null,ignoreMoveable=false
$.fn.plaxify=function(params){return this.each(function(){var layerExistsAt=-1
var layer={"xRange":$(this).data('xrange')||0,"yRange":$(this).data('yrange')||0,"invert":$(this).data('invert')||false,"background":$(this).data('background')||false}
for(var i=0;i<layers.length;i++){if(this===layers[i].obj.get(0)){layerExistsAt=i}}
for(var param in params){if(layer[param]==0){layer[param]=params[param]}}
layer.inversionFactor=(layer.invert?-1:1)
layer.obj=$(this)
if(layer.background){pos=(layer.obj.css('background-position')||"0px 0px").split(/ /)
if(pos.length!=2){return}
x=pos[0].match(/^((-?\d+)\s*px|0+\s*%|left)$/)
y=pos[1].match(/^((-?\d+)\s*px|0+\s*%|top)$/)
if(!x||!y){return}
layer.startX=x[2]||0
layer.startY=y[2]||0}else{var position=layer.obj.position()
layer.obj.css({'top':position.top,'left':position.left,'right':'','bottom':''})
layer.startX=this.offsetLeft
layer.startY=this.offsetTop}
layer.startX-=layer.inversionFactor*Math.floor(layer.xRange/2)
layer.startY-=layer.inversionFactor*Math.floor(layer.yRange/2)
if(layerExistsAt>=0){layers.splice(layerExistsAt,1,layer)}else{layers.push(layer)}})}
function moveable(){return(ignoreMoveable==true)?false:window.DeviceOrientationEvent!=undefined}
function valuesFromMotion(e){x=e.gamma
y=e.beta
if(Math.abs(window.orientation)===90){var a=x;x=y;y=a;}
if(window.orientation<0){x=-x;y=-y;}
motionStartX=(motionStartX==null)?x:motionStartX
motionStartY=(motionStartY==null)?y:motionStartY
return{x:x-motionStartX,y:y-motionStartY}}
function plaxifier(e){if(new Date().getTime()<lastRender+delay)return
lastRender=new Date().getTime()
var leftOffset=(plaxActivityTarget.offset()!=null)?plaxActivityTarget.offset().left:0,topOffset=(plaxActivityTarget.offset()!=null)?plaxActivityTarget.offset().top:0,x=e.pageX-leftOffset,y=e.pageY-topOffset
if(x<0||x>plaxActivityTarget.width()||y<0||y>plaxActivityTarget.height())return
if(moveable()){if(e.gamma==undefined){ignoreMoveable=true
return}
values=valuesFromMotion(e)
x=values.x/30
y=values.y/30}
var hRatio=x/((moveable()==true)?motionMax:plaxActivityTarget.width()),vRatio=y/((moveable()==true)?motionMax:plaxActivityTarget.height()),layer,i
for(i=layers.length;i--;){layer=layers[i]
newX=layer.startX+layer.inversionFactor*(layer.xRange*hRatio)
newY=layer.startY+layer.inversionFactor*(layer.yRange*vRatio)
if(layer.background){layer.obj.css('background-position',newX+'px '+newY+'px')}else{layer.obj.css('left',newX).css('top',newY)}}}
$.plax={enable:function(opts){$(document).bind('mousemove.plax',function(e){if(opts){plaxActivityTarget=opts.activityTarget||$(window)}
plaxifier(e)})
if(moveable()){window.ondeviceorientation=function(e){plaxifier(e)}}},disable:function(opts){$(document).unbind('mousemove.plax')
window.ondeviceorientation=undefined
if(opts&&typeof opts.clearLayers==='boolean'&&opts.clearLayers)layers=[]}}
if(typeof ender!=='undefined'){$.ender($.fn,true)}})(function(){return typeof jQuery!=='undefined'?jQuery:ender}())

//Easing
jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});

//Stellar.js
;(function($,window,document,undefined){var pluginName='stellar',defaults={scrollProperty:'scroll',positionProperty:'position',horizontalScrolling:true,verticalScrolling:true,horizontalOffset:0,verticalOffset:0,responsive:false,parallaxBackgrounds:true,parallaxElements:true,hideDistantElements:true,hideElement:function($elem){$elem.hide();},showElement:function($elem){$elem.show();}},scrollProperty={scroll:{getLeft:function($elem){return $elem.scrollLeft();},setLeft:function($elem,val){$elem.scrollLeft(val);},getTop:function($elem){return $elem.scrollTop();},setTop:function($elem,val){$elem.scrollTop(val);}},position:{getLeft:function($elem){return parseInt($elem.css('left'),10)*-1;},getTop:function($elem){return parseInt($elem.css('top'),10)*-1;}},margin:{getLeft:function($elem){return parseInt($elem.css('margin-left'),10)*-1;},getTop:function($elem){return parseInt($elem.css('margin-top'),10)*-1;}},transform:{getLeft:function($elem){var computedTransform=getComputedStyle($elem[0])[prefixedTransform];return(computedTransform!=='none'?parseInt(computedTransform.match(/(-?[0-9]+)/g)[4],10)*-1:0);},getTop:function($elem){var computedTransform=getComputedStyle($elem[0])[prefixedTransform];return(computedTransform!=='none'?parseInt(computedTransform.match(/(-?[0-9]+)/g)[5],10)*-1:0);}}},positionProperty={position:{setLeft:function($elem,left){$elem.css('left',left);},setTop:function($elem,top){$elem.css('top',top);}},transform:{setPosition:function($elem,left,startingLeft,top,startingTop){$elem[0].style[prefixedTransform]='translate3d('+(left-startingLeft)+'px, '+(top-startingTop)+'px, 0)';}}},vendorPrefix=(function(){var prefixes=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,style=$('script')[0].style,prefix='',prop;for(prop in style){if(prefixes.test(prop)){prefix=prop.match(prefixes)[0];break;}}
if('WebkitOpacity'in style){prefix='Webkit';}
if('KhtmlOpacity'in style){prefix='Khtml';}
return function(property){return prefix+(prefix.length>0?property.charAt(0).toUpperCase()+property.slice(1):property);};}()),prefixedTransform=vendorPrefix('transform'),supportsBackgroundPositionXY=$('<div />').css('background-position-x')!==undefined,setBackgroundPosition=(supportsBackgroundPositionXY?function($elem,x,y){$elem.css({'background-position-x':x,'background-position-y':y});}:function($elem,x,y){$elem.css('background-position',x+' '+y);}),getBackgroundPosition=(supportsBackgroundPositionXY?function($elem){return[$elem.css('background-position-x'),$elem.css('background-position-y')];}:function($elem){return $elem.css('background-position').split(' ');}),requestAnimFrame=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){setTimeout(callback,1000/60);});function Plugin(element,options){this.element=element;this.options=$.extend({},defaults,options);this._defaults=defaults;this._name=pluginName;this.init();}
Plugin.prototype={init:function(){this.options.name=pluginName+'_'+Math.floor(Math.random()*1e9);this._defineElements();this._defineGetters();this._defineSetters();this._handleWindowLoadAndResize();this._detectViewport();this.refresh({firstLoad:true});if(this.options.scrollProperty==='scroll'){this._handleScrollEvent();}else{this._startAnimationLoop();}},_defineElements:function(){if(this.element===document.body)this.element=window;this.$scrollElement=$(this.element);this.$element=(this.element===window?$('body'):this.$scrollElement);this.$viewportElement=(this.options.viewportElement!==undefined?$(this.options.viewportElement):(this.$scrollElement[0]===window||this.options.scrollProperty==='scroll'?this.$scrollElement:this.$scrollElement.parent()));},_defineGetters:function(){var self=this,scrollPropertyAdapter=scrollProperty[self.options.scrollProperty];this._getScrollLeft=function(){return scrollPropertyAdapter.getLeft(self.$scrollElement);};this._getScrollTop=function(){return scrollPropertyAdapter.getTop(self.$scrollElement);};},_defineSetters:function(){var self=this,scrollPropertyAdapter=scrollProperty[self.options.scrollProperty],positionPropertyAdapter=positionProperty[self.options.positionProperty],setScrollLeft=scrollPropertyAdapter.setLeft,setScrollTop=scrollPropertyAdapter.setTop;this._setScrollLeft=(typeof setScrollLeft==='function'?function(val){setScrollLeft(self.$scrollElement,val);}:$.noop);this._setScrollTop=(typeof setScrollTop==='function'?function(val){setScrollTop(self.$scrollElement,val);}:$.noop);this._setPosition=positionPropertyAdapter.setPosition||function($elem,left,startingLeft,top,startingTop){if(self.options.horizontalScrolling){positionPropertyAdapter.setLeft($elem,left,startingLeft);}
if(self.options.verticalScrolling){positionPropertyAdapter.setTop($elem,top,startingTop);}};},_handleWindowLoadAndResize:function(){var self=this,$window=$(window);if(self.options.responsive){$window.bind('load.'+this.name,function(){self.refresh();});}
$window.bind('resize.'+this.name,function(){self._detectViewport();if(self.options.responsive){self.refresh();}});},refresh:function(options){var self=this,oldLeft=self._getScrollLeft(),oldTop=self._getScrollTop();if(!options||!options.firstLoad){this._reset();}
this._setScrollLeft(0);this._setScrollTop(0);this._setOffsets();this._findParticles();this._findBackgrounds();if(options&&options.firstLoad&&/WebKit/.test(navigator.userAgent)){$(window).load(function(){var oldLeft=self._getScrollLeft(),oldTop=self._getScrollTop();self._setScrollLeft(oldLeft+1);self._setScrollTop(oldTop+1);self._setScrollLeft(oldLeft);self._setScrollTop(oldTop);});}
this._setScrollLeft(oldLeft);this._setScrollTop(oldTop);},_detectViewport:function(){var viewportOffsets=this.$viewportElement.offset(),hasOffsets=viewportOffsets!==null&&viewportOffsets!==undefined;this.viewportWidth=this.$viewportElement.width();this.viewportHeight=this.$viewportElement.height();this.viewportOffsetTop=(hasOffsets?viewportOffsets.top:0);this.viewportOffsetLeft=(hasOffsets?viewportOffsets.left:0);},_findParticles:function(){var self=this,scrollLeft=this._getScrollLeft(),scrollTop=this._getScrollTop();if(this.particles!==undefined){for(var i=this.particles.length-1;i>=0;i--){this.particles[i].$element.data('stellar-elementIsActive',undefined);}}
this.particles=[];if(!this.options.parallaxElements)return;this.$element.find('[data-stellar-ratio]').each(function(i){var $this=$(this),horizontalOffset,verticalOffset,positionLeft,positionTop,marginLeft,marginTop,$offsetParent,offsetLeft,offsetTop,parentOffsetLeft=0,parentOffsetTop=0,tempParentOffsetLeft=0,tempParentOffsetTop=0;if(!$this.data('stellar-elementIsActive')){$this.data('stellar-elementIsActive',this);}else if($this.data('stellar-elementIsActive')!==this){return;}
self.options.showElement($this);if(!$this.data('stellar-startingLeft')){$this.data('stellar-startingLeft',$this.css('left'));$this.data('stellar-startingTop',$this.css('top'));}else{$this.css('left',$this.data('stellar-startingLeft'));$this.css('top',$this.data('stellar-startingTop'));}
positionLeft=$this.position().left;positionTop=$this.position().top;marginLeft=($this.css('margin-left')==='auto')?0:parseInt($this.css('margin-left'),10);marginTop=($this.css('margin-top')==='auto')?0:parseInt($this.css('margin-top'),10);offsetLeft=$this.offset().left-marginLeft;offsetTop=$this.offset().top-marginTop;$this.parents().each(function(){var $this=$(this);if($this.data('stellar-offset-parent')===true){parentOffsetLeft=tempParentOffsetLeft;parentOffsetTop=tempParentOffsetTop;$offsetParent=$this;return false;}else{tempParentOffsetLeft+=$this.position().left;tempParentOffsetTop+=$this.position().top;}});horizontalOffset=($this.data('stellar-horizontal-offset')!==undefined?$this.data('stellar-horizontal-offset'):($offsetParent!==undefined&&$offsetParent.data('stellar-horizontal-offset')!==undefined?$offsetParent.data('stellar-horizontal-offset'):self.horizontalOffset));verticalOffset=($this.data('stellar-vertical-offset')!==undefined?$this.data('stellar-vertical-offset'):($offsetParent!==undefined&&$offsetParent.data('stellar-vertical-offset')!==undefined?$offsetParent.data('stellar-vertical-offset'):self.verticalOffset));self.particles.push({$element:$this,$offsetParent:$offsetParent,isFixed:$this.css('position')==='fixed',horizontalOffset:horizontalOffset,verticalOffset:verticalOffset,startingPositionLeft:positionLeft,startingPositionTop:positionTop,startingOffsetLeft:offsetLeft,startingOffsetTop:offsetTop,parentOffsetLeft:parentOffsetLeft,parentOffsetTop:parentOffsetTop,stellarRatio:($this.data('stellar-ratio')!==undefined?$this.data('stellar-ratio'):1),width:$this.outerWidth(true),height:$this.outerHeight(true),isHidden:false});});},_findBackgrounds:function(){var self=this,scrollLeft=this._getScrollLeft(),scrollTop=this._getScrollTop(),$backgroundElements;this.backgrounds=[];if(!this.options.parallaxBackgrounds)return;$backgroundElements=this.$element.find('[data-stellar-background-ratio]');if(this.$element.data('stellar-background-ratio')){$backgroundElements=$backgroundElements.add(this.$element);}
$backgroundElements.each(function(){var $this=$(this),backgroundPosition=getBackgroundPosition($this),horizontalOffset,verticalOffset,positionLeft,positionTop,marginLeft,marginTop,offsetLeft,offsetTop,$offsetParent,parentOffsetLeft=0,parentOffsetTop=0,tempParentOffsetLeft=0,tempParentOffsetTop=0;if(!$this.data('stellar-backgroundIsActive')){$this.data('stellar-backgroundIsActive',this);}else if($this.data('stellar-backgroundIsActive')!==this){return;}
if(!$this.data('stellar-backgroundStartingLeft')){$this.data('stellar-backgroundStartingLeft',backgroundPosition[0]);$this.data('stellar-backgroundStartingTop',backgroundPosition[1]);}else{setBackgroundPosition($this,$this.data('stellar-backgroundStartingLeft'),$this.data('stellar-backgroundStartingTop'));}
marginLeft=($this.css('margin-left')==='auto')?0:parseInt($this.css('margin-left'),10);marginTop=($this.css('margin-top')==='auto')?0:parseInt($this.css('margin-top'),10);offsetLeft=$this.offset().left-marginLeft-scrollLeft;offsetTop=$this.offset().top-marginTop-scrollTop;$this.parents().each(function(){var $this=$(this);if($this.data('stellar-offset-parent')===true){parentOffsetLeft=tempParentOffsetLeft;parentOffsetTop=tempParentOffsetTop;$offsetParent=$this;return false;}else{tempParentOffsetLeft+=$this.position().left;tempParentOffsetTop+=$this.position().top;}});horizontalOffset=($this.data('stellar-horizontal-offset')!==undefined?$this.data('stellar-horizontal-offset'):($offsetParent!==undefined&&$offsetParent.data('stellar-horizontal-offset')!==undefined?$offsetParent.data('stellar-horizontal-offset'):self.horizontalOffset));verticalOffset=($this.data('stellar-vertical-offset')!==undefined?$this.data('stellar-vertical-offset'):($offsetParent!==undefined&&$offsetParent.data('stellar-vertical-offset')!==undefined?$offsetParent.data('stellar-vertical-offset'):self.verticalOffset));self.backgrounds.push({$element:$this,$offsetParent:$offsetParent,isFixed:$this.css('background-attachment')==='fixed',horizontalOffset:horizontalOffset,verticalOffset:verticalOffset,startingValueLeft:backgroundPosition[0],startingValueTop:backgroundPosition[1],startingBackgroundPositionLeft:(isNaN(parseInt(backgroundPosition[0],10))?0:parseInt(backgroundPosition[0],10)),startingBackgroundPositionTop:(isNaN(parseInt(backgroundPosition[1],10))?0:parseInt(backgroundPosition[1],10)),startingPositionLeft:$this.position().left,startingPositionTop:$this.position().top,startingOffsetLeft:offsetLeft,startingOffsetTop:offsetTop,parentOffsetLeft:parentOffsetLeft,parentOffsetTop:parentOffsetTop,stellarRatio:($this.data('stellar-background-ratio')===undefined?1:$this.data('stellar-background-ratio'))});});},_reset:function(){var particle,startingPositionLeft,startingPositionTop,background,i;for(i=this.particles.length-1;i>=0;i--){particle=this.particles[i];startingPositionLeft=particle.$element.data('stellar-startingLeft');startingPositionTop=particle.$element.data('stellar-startingTop');this._setPosition(particle.$element,startingPositionLeft,startingPositionLeft,startingPositionTop,startingPositionTop);this.options.showElement(particle.$element);particle.$element.data('stellar-startingLeft',null).data('stellar-elementIsActive',null).data('stellar-backgroundIsActive',null);}
for(i=this.backgrounds.length-1;i>=0;i--){background=this.backgrounds[i];background.$element.data('stellar-backgroundStartingLeft',null).data('stellar-backgroundStartingTop',null);setBackgroundPosition(background.$element,background.startingValueLeft,background.startingValueTop);}},destroy:function(){this._reset();this.$scrollElement.unbind('resize.'+this.name).unbind('scroll.'+this.name);this._animationLoop=$.noop;$(window).unbind('load.'+this.name).unbind('resize.'+this.name);},_setOffsets:function(){var self=this,$window=$(window);$window.unbind('resize.horizontal-'+this.name).unbind('resize.vertical-'+this.name);if(typeof this.options.horizontalOffset==='function'){this.horizontalOffset=this.options.horizontalOffset();$window.bind('resize.horizontal-'+this.name,function(){self.horizontalOffset=self.options.horizontalOffset();});}else{this.horizontalOffset=this.options.horizontalOffset;}
if(typeof this.options.verticalOffset==='function'){this.verticalOffset=this.options.verticalOffset();$window.bind('resize.vertical-'+this.name,function(){self.verticalOffset=self.options.verticalOffset();});}else{this.verticalOffset=this.options.verticalOffset;}},_repositionElements:function(){var scrollLeft=this._getScrollLeft(),scrollTop=this._getScrollTop(),horizontalOffset,verticalOffset,particle,fixedRatioOffset,background,bgLeft,bgTop,isVisibleVertical=true,isVisibleHorizontal=true,newPositionLeft,newPositionTop,newOffsetLeft,newOffsetTop,i;if(this.currentScrollLeft===scrollLeft&&this.currentScrollTop===scrollTop&&this.currentWidth===this.viewportWidth&&this.currentHeight===this.viewportHeight){return;}else{this.currentScrollLeft=scrollLeft;this.currentScrollTop=scrollTop;this.currentWidth=this.viewportWidth;this.currentHeight=this.viewportHeight;}
for(i=this.particles.length-1;i>=0;i--){particle=this.particles[i];fixedRatioOffset=(particle.isFixed?1:0);if(this.options.horizontalScrolling){newPositionLeft=(scrollLeft+particle.horizontalOffset+this.viewportOffsetLeft+particle.startingPositionLeft-particle.startingOffsetLeft+particle.parentOffsetLeft)*-(particle.stellarRatio+fixedRatioOffset-1)+particle.startingPositionLeft;newOffsetLeft=newPositionLeft-particle.startingPositionLeft+particle.startingOffsetLeft;}else{newPositionLeft=particle.startingPositionLeft;newOffsetLeft=particle.startingOffsetLeft;}
if(this.options.verticalScrolling){newPositionTop=(scrollTop+particle.verticalOffset+this.viewportOffsetTop+particle.startingPositionTop-particle.startingOffsetTop+particle.parentOffsetTop)*-(particle.stellarRatio+fixedRatioOffset-1)+particle.startingPositionTop;newOffsetTop=newPositionTop-particle.startingPositionTop+particle.startingOffsetTop;}else{newPositionTop=particle.startingPositionTop;newOffsetTop=particle.startingOffsetTop;}
if(this.options.hideDistantElements){isVisibleHorizontal=!this.options.horizontalScrolling||newOffsetLeft+particle.width>(particle.isFixed?0:scrollLeft)&&newOffsetLeft<(particle.isFixed?0:scrollLeft)+this.viewportWidth+this.viewportOffsetLeft;isVisibleVertical=!this.options.verticalScrolling||newOffsetTop+particle.height>(particle.isFixed?0:scrollTop)&&newOffsetTop<(particle.isFixed?0:scrollTop)+this.viewportHeight+this.viewportOffsetTop;}
if(isVisibleHorizontal&&isVisibleVertical){if(particle.isHidden){this.options.showElement(particle.$element);particle.isHidden=false;}
this._setPosition(particle.$element,newPositionLeft,particle.startingPositionLeft,newPositionTop,particle.startingPositionTop);}else{if(!particle.isHidden){this.options.hideElement(particle.$element);particle.isHidden=true;}}}
for(i=this.backgrounds.length-1;i>=0;i--){background=this.backgrounds[i];fixedRatioOffset=(background.isFixed?0:1);bgLeft=(this.options.horizontalScrolling?(scrollLeft+background.horizontalOffset-this.viewportOffsetLeft-background.startingOffsetLeft+background.parentOffsetLeft-background.startingBackgroundPositionLeft)*(fixedRatioOffset-background.stellarRatio)+'px':background.startingValueLeft);bgTop=(this.options.verticalScrolling?(scrollTop+background.verticalOffset-this.viewportOffsetTop-background.startingOffsetTop+background.parentOffsetTop-background.startingBackgroundPositionTop)*(fixedRatioOffset-background.stellarRatio)+'px':background.startingValueTop);setBackgroundPosition(background.$element,bgLeft,bgTop);}},_handleScrollEvent:function(){var self=this,ticking=false;var update=function(){self._repositionElements();ticking=false;};var requestTick=function(){if(!ticking){requestAnimFrame(update);ticking=true;}};this.$scrollElement.bind('scroll.'+this.name,requestTick);requestTick();},_startAnimationLoop:function(){var self=this;this._animationLoop=function(){requestAnimFrame(self._animationLoop);self._repositionElements();};this._animationLoop();}};$.fn[pluginName]=function(options){var args=arguments;if(options===undefined||typeof options==='object'){return this.each(function(){if(!$.data(this,'plugin_'+pluginName)){$.data(this,'plugin_'+pluginName,new Plugin(this,options));}});}else if(typeof options==='string'&&options[0]!=='_'&&options!=='init'){return this.each(function(){var instance=$.data(this,'plugin_'+pluginName);if(instance instanceof Plugin&&typeof instance[options]==='function'){instance[options].apply(instance,Array.prototype.slice.call(args,1));}
if(options==='destroy'){$.data(this,'plugin_'+pluginName,null);}});}};$[pluginName]=function(options){var $window=$(window);return $window.stellar.apply($window,Array.prototype.slice.call(arguments,0));};$[pluginName].scrollProperty=scrollProperty;$[pluginName].positionProperty=positionProperty;window.Stellar=Plugin;}(jQuery,this,document));

//Thumbnail scroller
(function($){$.fn.thumbnailScroller=function(options){var defaults={scrollerType:"hoverPrecise",scrollerOrientation:"horizontal",scrollEasing:"easeOutCirc",scrollEasingAmount:800,acceleration:2,scrollSpeed:600,noScrollCenterSpace:0,autoScrolling:0,autoScrollingSpeed:8000,autoScrollingEasing:"easeInOutQuad",autoScrollingDelay:2500};var options=$.extend(defaults,options);return this.each(function(){var $this=$(this);var $scrollerContainer=$this.children(".jTscrollerContainer");var $scroller=$this.children(".jTscrollerContainer").children(".jTscroller");var $scrollerNextButton=$this.children(".jTscrollerNextButton");var $scrollerPrevButton=$this.children(".jTscrollerPrevButton");if(options.scrollerOrientation=="horizontal"){$scrollerContainer.css("width",999999);var totalWidth=$scroller.outerWidth(true)+1;$scrollerContainer.css("width",totalWidth);}else{var totalWidth=$scroller.outerWidth(true);}
var totalHeight=$scroller.outerHeight(true);if(totalWidth>$this.width()||totalHeight>$this.height()){var pos;var mouseCoords;var mouseCoordsY;if(options.scrollerType=="hoverAccelerate"){var animTimer;var interval=8;$this.hover(function(){$this.mousemove(function(e){pos=findPos(this);mouseCoords=(e.pageX-pos[1]);mouseCoordsY=(e.pageY-pos[0]);});clearInterval(animTimer);animTimer=setInterval(Scrolling,interval);},function(){clearInterval(animTimer);$scroller.stop();});$scrollerPrevButton.add($scrollerNextButton).hide();}else if(options.scrollerType=="clickButtons"){ClickScrolling();}else{pos=findPos(this);$this.mousemove(function(e){mouseCoords=(e.pageX-pos[1]);mouseCoordsY=(e.pageY-pos[0]);var mousePercentX=mouseCoords/$this.width();if(mousePercentX>1){mousePercentX=1;}
var mousePercentY=mouseCoordsY/$this.height();if(mousePercentY>1){mousePercentY=1;}
var destX=Math.round(-((totalWidth-$this.width())*(mousePercentX)));var destY=Math.round(-((totalHeight-$this.height())*(mousePercentY)));$scroller.stop(true,false).animate({left:destX,top:destY},options.scrollEasingAmount,options.scrollEasing);});$scrollerPrevButton.add($scrollerNextButton).hide();}
if(options.autoScrolling>0){AutoScrolling();}}else{$scrollerPrevButton.add($scrollerNextButton).hide();}
var scrollerPos;var scrollerPosY;function Scrolling(){if((mouseCoords<$this.width()/2)&&($scroller.position().left>=0)){$scroller.stop(true,true).css("left",0);}else if((mouseCoords>$this.width()/2)&&($scroller.position().left<=-(totalWidth-$this.width()))){$scroller.stop(true,true).css("left",-(totalWidth-$this.width()));}else{if((mouseCoords<=($this.width()/2)-options.noScrollCenterSpace)||(mouseCoords>=($this.width()/2)+options.noScrollCenterSpace)){scrollerPos=Math.round(Math.cos((mouseCoords/$this.width())*Math.PI)*(interval+options.acceleration));$scroller.stop(true,true).animate({left:"+="+scrollerPos},interval,"linear");}else{$scroller.stop(true,true);}}
if((mouseCoordsY<$this.height()/2)&&($scroller.position().top>=0)){$scroller.stop(true,true).css("top",0);}else if((mouseCoordsY>$this.height()/2)&&($scroller.position().top<=-(totalHeight-$this.height()))){$scroller.stop(true,true).css("top",-(totalHeight-$this.height()));}else{if((mouseCoordsY<=($this.height()/2)-options.noScrollCenterSpace)||(mouseCoordsY>=($this.height()/2)+options.noScrollCenterSpace)){scrollerPosY=Math.cos((mouseCoordsY/$this.height())*Math.PI)*(interval+options.acceleration);$scroller.stop(true,true).animate({top:"+="+scrollerPosY},interval,"linear");}else{$scroller.stop(true,true);}}}
var autoScrollingCount=0;function AutoScrolling(){$scroller.delay(options.autoScrollingDelay).animate({left:-(totalWidth-$this.width()),top:-(totalHeight-$this.height())},options.autoScrollingSpeed,options.autoScrollingEasing,function(){$scroller.animate({left:0,top:0},options.autoScrollingSpeed,options.autoScrollingEasing,function(){autoScrollingCount++;if(options.autoScrolling>1&&options.autoScrolling!=autoScrollingCount){AutoScrolling();}});});}
function ClickScrolling(){$scrollerPrevButton.hide();$scrollerNextButton.show();$scrollerNextButton.click(function(e){e.preventDefault();var posX=$scroller.position().left;var diffX=totalWidth+(posX-$this.width());var posY=$scroller.position().top;var diffY=totalHeight+(posY-$this.height());$scrollerPrevButton.stop().show("fast");if(options.scrollerOrientation=="horizontal"){if(diffX>=$this.width()){$scroller.stop().animate({left:"-="+$this.width()},options.scrollSpeed,options.scrollEasing,function(){if(diffX==$this.width()){$scrollerNextButton.stop().hide("fast");}});}else{$scrollerNextButton.stop().hide("fast");$scroller.stop().animate({left:$this.width()-totalWidth},options.scrollSpeed,options.scrollEasing);}}else{if(diffY>=$this.height()){$scroller.stop().animate({top:"-="+$this.height()},options.scrollSpeed,options.scrollEasing,function(){if(diffY==$this.height()){$scrollerNextButton.stop().hide("fast");}});}else{$scrollerNextButton.stop().hide("fast");$scroller.stop().animate({top:$this.height()-totalHeight},options.scrollSpeed,options.scrollEasing);}}});$scrollerPrevButton.click(function(e){e.preventDefault();var posX=$scroller.position().left;var diffX=totalWidth+(posX-$this.width());var posY=$scroller.position().top;var diffY=totalHeight+(posY-$this.height());$scrollerNextButton.stop().show("fast");if(options.scrollerOrientation=="horizontal"){if(posX+$this.width()<=0){$scroller.stop().animate({left:"+="+$this.width()},options.scrollSpeed,options.scrollEasing,function(){if(posX+$this.width()==0){$scrollerPrevButton.stop().hide("fast");}});}else{$scrollerPrevButton.stop().hide("fast");$scroller.stop().animate({left:0},options.scrollSpeed,options.scrollEasing);}}else{if(posY+$this.height()<=0){$scroller.stop().animate({top:"+="+$this.height()},options.scrollSpeed,options.scrollEasing,function(){if(posY+$this.height()==0){$scrollerPrevButton.stop().hide("fast");}});}else{$scrollerPrevButton.stop().hide("fast");$scroller.stop().animate({top:0},options.scrollSpeed,options.scrollEasing);}}});}});};})(jQuery);function findPos(obj){var curleft=curtop=0;if(obj.offsetParent){curleft=obj.offsetLeft
curtop=obj.offsetTop
while(obj=obj.offsetParent){curleft+=obj.offsetLeft
curtop+=obj.offsetTop}}
return[curtop,curleft];}

//Youtube
(function($,window,document,undefined){var pluginName='ytplaylist';var defaults={holderId:'ytvideo',playerHeight:300,playerWidth:450,addThumbs:false,thumbSize:'small',showInline:false,autoPlay:true,showRelated:true,allowFullScreen:false,deepLinks:false,onChange:function(){},start:1,secure:'auto'};function youtubeid(url){var id=null;if(url.indexOf('//www.youtube.com')!==-1){id=url.match("[\\?&]v=([^&#]*)")[1];}
else if(url.indexOf('//youtu.be')!==-1){id=url.substr(url.lastIndexOf("/")+1);}
return id;}
function Plugin(element,options){this.element=element;this.options=$.extend({},defaults,options);this._defaults=defaults;this._name=pluginName;this._protocol=(this.options.secure==='auto')?window.location.protocol==='https:'?'https://':'http://':this.options.secure?'https://':'http://';this._autoPlay=(this.options.autoPlay)?'&autoplay=1':'';this._showRelated=(this.options.showRelated)?'&rel=1':'';this._fullscreen=(this.options.allowFullScreen)?'&fs=1':'';this.init();}
Plugin.prototype={init:function(){var self=this;var initialItem=self.options.deepLinks&&window.location.hash.indexOf('#yt-gal-')!==-1?window.location.hash:null;$(self.element).find('li').each(function(index){var listItem=$(this);var listIndex=index+1;listItem.find('a:first').each(function(){var link=$(this);var ytid=youtubeid(link.attr('href'));var replacedText=listItem.text();link.data('yt-href',link.attr('href'));link.attr('href','#yt-gal-'+listIndex);if(ytid){link.addClass('yt-vid');link.data('yt-id',ytid);if(self.options.addThumbs){if(self.options.thumbSize=='small'){thumbUrl=self._protocol+'img.youtube.com/vi/'+ytid+'/2.jpg';}
else{thumbUrl=self._protocol+'img.youtube.com/vi/'+ytid+'/0.jpg';}
var thumbHtml='<img src="'+thumbUrl+'" alt="'+replacedText+'" />';link.empty().html(thumbHtml+replacedText).attr('title',replacedText);}}
else{link.addClass('img-link');if(self.options.addThumbs){var $img=$('<img/>').attr('src',link.data('yt-href'));link.empty().html($img).attr("title",replacedText);}}
if(!self.options.deepLinks){link.click(function(e){e.preventDefault();self.handleClick(link,self.options);self.options.onChange.call();});}});var firstLink=$(listItem.children('a')[0]);if(initialItem){if(firstLink.attr('href')===initialItem){self.handleClick(firstLink,self.options);}}
else if(listIndex===self.options.start){self.handleClick(firstLink,self.options);}});if(self.options.deepLinks){$(window).bind('hashchange',function(e){var hash=window.location.hash;var clicked=$(self.element).find('a[href="'+hash+'"]');if(clicked.length>0){self.handleClick(clicked,self.options);}
else if(hash===''){self.handleClick($(self.element).find('a:first'),self.options);}});}},getOldEmbedCode:function(options,id){var html='';html+='<object height="'+options.playerHeight+'" width="'+options.playerWidth+'">';html+='<param name="movie" value="'+this._protocol+'www.youtube.com/v/'+id+this._autoPlay+this._showRelated+this._fullScreen+'"> </param>';html+='<param name="wmode" value="transparent"> </param>';if(options.allowFullScreen){html+='<param name="allowfullscreen" value="true"> </param>';}
html+='<embed src="'+this._protocol+'www.youtube.com/v/'+id+this._autoPlay+this._showRelated+this._fullScreen+'"';if(options.allowFullScreen){html+=' allowfullscreen="true" ';}
html+='type="application/x-shockwave-flash" wmode="transparent"  height="'+options.playerHeight+'" width="'+options.playerWidth+'"></embed>';html+='</object>';return html;},getNewEmbedCode:function(options,id){var html='';html+='<iframe width="'+options.playerWidth+'" height="'+options.playerHeight+'"';html+=' src="'+this._protocol+'www.youtube.com/embed/'+id+'?wmode=opaque'+this._showRelated+'" frameborder="0"';html+=' allowfullscreen></iframe>';return html;},handleClick:function(link,options){if(link.hasClass('yt-vid')){return this.handleVideoClick(link,options);}
else{return this.handleImageClick(link,options);}},handleVideoClick:function(link,options){var self=this;if(options.showInline){$('li.currentvideo').removeClass('currentvideo');link.parent('li').addClass('currentvideo').html(self.getNewEmbedCode(self.options,link.data('yt-id')));}
else{var holder=(options.holder?options.holder:$('#'+options.holderId));holder.html(self.getNewEmbedCode(self.options,link.data('yt-id')));link.parent().parent('ul').find('li.currentvideo').removeClass('currentvideo');link.parent('li').addClass('currentvideo');}
return false;},handleImageClick:function(link,options){var thisImage=new Image();var $thisImage=$(thisImage);var $link=$(link);thisImage.onload=function(){if($thisImage.height()<$thisImage.width()){$thisImage.width(options.playerWidth).css('margin-top',parseInt($thisImage.height()/-2,10)).css({height:'auto'});}
else{$thisImage.css({height:options.playerHeight,width:'auto',top:'0px',position:'relative'});}
$thisImage.fadeIn();};$thisImage.attr({src:$link.data('yt-href')}).css({display:'none',position:'absolute',left:'0px',top:'50%'});if(options.showInline){$('li.currentvideo').removeClass('currentvideo');$link.parent('li').addClass('currentvideo').html($thisImage);}
else{var holder=(options.holder?options.holder:$('#'+options.holderId));holder.html($thisImage);$link.closest('ul').find('li.currentvideo').removeClass('currentvideo');$link.parent('li').addClass('currentvideo');}
return false;}};$.fn[pluginName]=function(options){return this.each(function(){if(!$.data(this,'plugin_'+pluginName)){$.data(this,'plugin_'+pluginName,new Plugin(this,options));}});};})(jQuery,window,document);

//Document ready
$(document).ready(function ($) {
    //initialise Stellar.js
    $(window).stellar({
	  scrollProperty: 'scroll',
	  horizontalScrolling: false
	});
	
	//Youtube
	$("ul.ytvideo-thumbs").ytplaylist({
		addThumbs:true,
		autoPlay: false,
		playerHeight: 395,
		playerWidth: 700
	});
	
	//Nav scroll
	$('ul#nav a').bind('click',function(event){
		var href = $.attr(this, 'href');
		$('html, body').animate({
        	scrollTop: $( $(this).attr('href') ).offset().top
    	}, 1500, 'easeInOutExpo', function () {
        	window.location.hash = href;
    	});
    event.preventDefault();
	});
	
	//Instruments
	$('#instruments3 img').plaxify()
	$('#instruments2 img').plaxify()
        $.plax.enable({ "activityTarget": $('#instruments3, #instruments2')})
	
	//Image switcher
	$(".jTscroller a").click(function(evt) {
		evt.preventDefault();
		$("#gallery-main-image").empty().append(
			$("<img>", { src: this.href})
		);
	});
	
	//FancyBox
	jQuery(".fancybox").fancybox({
		tpl: {
			closeBtn : '<a title="Zatvori" class="fancybox-item fancybox-close" href="javascript:;"></a>',
			next     : '<a title="Sledeća" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
			prev     : '<a title="Prethodna" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
		},
		openEffect : 'elastic',
		closeEffect : 'elastic'
	});
	
	$("#submit").click(function(){					   				   
		$(".error").hide();
		var hasError = false;
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
		var name = $("#name").val();
		if(name == '') {
			$('label[for="name"]').append('<span class="error">Enter Your name</span>');
			hasError = true;
		}
		
		var email = $("#email").val();
		if(email == '') {
			$('label[for="email"]').append('<span class="error">Enter Your e-mail</span>');
			hasError = true;
		} else if(!emailReg.test(email)) {	
			$('label[for="email"]').append('<span class="error">Enter correct e-mail address</span>');
			hasError = true;
		}
		
		var message = $("#message").val();
		if(message == '') {
			$('label[for="message"]').append('<span class="error">Enter some message</span>');
			hasError = true;
		}

		if(hasError == false) {
			$(this).hide();
			$(this).after('<br><img src="../images/loader.png" alt="Loading" id="loading" />');
			
			$.post("../scripts/form/verify.php",
				$("#sendEmail").serialize(),
   					function(data){
						$("#sendEmail").slideUp("normal", function() {				   
							$("#sendEmail").before("<h3>Your message has been sent!</h3><p>We'll respond to you as soon as possible.<br>Thank You!</p>");											
						});
   					}
				 );
		}
		return false;
	});						   
});
	
$(window).load(function() {
	$("#tS1").thumbnailScroller({
		scrollerType: "hoverPrecise",
		noScrollCenterSpace: 0,
		scrollEasingAmount: 9000,
		scrollSpeed: 9000,
		acceleration: 1
	});
});