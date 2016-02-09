/* 
    Simple JSlider  
    version : 1.0
    date : 2016.01.01
*/
function JSlider(settings){
  this.total = settings.total;
  this.prev = settings.prev;
  this.current = settings.current;
  this.next = settings.next;
  this.imgPath = settings.imgPath;
  this.imgType = settings.imgType;
  
  this.currentPreview = settings.current; 
  
  this.btnPrev = settings.btnPrev;
  this.btnNext = settings.btnNext;
  this.display = settings.display; // displayWrapper
  this.preview = settings.preview; // previewWrapper
  this.preview_pos = 0;
  this.preview_setting = [];
  
  this.loop = settings.loop;
  this.animate = settings.animate;
  this.animateDuration = settings.animateDuration;
  this.animateType = settings.animateType;
  
  // if setting's method is undefined or empty
  
  
}

JSlider.prototype = {
  goPrev : function (callback) {
    if(!this.loop || this.loop === null){
      if(this.current-1 > 0){
      	this.prev = this.prev-1;
      	this.current  = this.current - 1;
            
      	if(this.next !== null){
      		this.next = this.next-1;	
      	}else{
      		this.next = this.total-1;
      	}

      }else if(this.current-1 === 0){
      	this.prev = null;
      	this.current = 0;
      	this.next = 1;
      } 
    }else{ // loop true
      // 음수로 변경 (왼쪽으로 이동중)
      if(this.prev <= 0){
        this.prev = this.total-1;
      }else{
        this.prev--;  
      }
      
      if(this.next <= 0){
        this.next = this.total-1;
      }else{
        this.next--;
      }
      
      if(this.current <= 0){
        this.current = this.total-1;
      }else{
        this.current--;  
      }
    }
    
    if(typeof callback === 'function'){
        callback();
    }
  },
  
  goNext : function (callback) {
    if(!this.loop || this.loop === null){
      if(this.current+1 < this.total-1){
      	this.prev = this.current;
      	this.current = this.next;
      	this.next = this.next+1;
      }else if(this.current+1 === this.total-1){
      	this.prev = this.current;
      	this.current = this.next;
      	this.next = null;
      }  
    }else{ // loop true
        // 양수로 변경 (오른쪽으로 이동중)
        if(this.prev >= this.total-1){
          this.prev = 0;
        }else{
          this.prev++;  
        }
        
        if(this.next >= this.total-1){
          this.next = 0;
        }else{
          this.next++;
        }
        
        if(this.current >= this.total-1){
          this.current = 0;
        }else{
          this.current++;  
        }
    }
    
    if(typeof callback === 'function'){
        callback();
    }
  },
  
  // 썸네일중 하나를 선택했을 때
  selectThumbnail : function () {
    
  },
  
  getStatus : function(){
//         console.log("total : " + this.total);
    console.log("prev : " + this.prev);
    console.log("current : " + this.current);
    console.log("next : " + this.next);
//         console.log("pointer : " + this.currentPreview);
    console.log("preview : " + this.preview_setting.toString());
  }
};


function showMainDisplay(slider, callback){
    var pos = slider.current + 1;
    slider.display.html('<img src="' + slider.imgPath + pos + "." + slider.imgType + 
        '" alt="' + pos + '" width="352" height="356" class="show_img" />');
    if(typeof callback === 'function'){
        callback();
    }
}

/*
    @instance slider
    @direction right or left
*/
function displayPreview(slider, direction){
    var i, set, el, elem;
    
    if(!slider.animate){
        if(slider.preview_setting.length <= 0 || slider.preview_setting === null){
            slider.preview_setting = [
                slider.current+1 >= slider.total+1 ? Math.abs(slider.current+1-slider.total) : slider.current+1, 
                slider.current+2 >= slider.total+1 ? Math.abs(slider.current+2-slider.total) : slider.current+2, 
                slider.current+3 >= slider.total+1 ? Math.abs(slider.current+3-slider.total) : slider.current+3
            ];
        }else{
            if(direction === 'next'){
                var tmp = slider.preview_setting[1];
                slider.preview_setting = 
                [
                tmp >= slider.total+1 ? Math.abs(tmp-slider.total) : tmp, 
                tmp+1 >= slider.total+1 ? Math.abs(tmp+1-slider.total) : tmp+1,
                tmp+2 >= slider.total+1 ? Math.abs(tmp+2-slider.total) : tmp+2
                ];

            }else if(direction === 'prev'){
                var tmp2 = slider.preview_setting[1];
                slider.preview_setting = 
                [
                    tmp2-2 < 1 ? Math.abs(slider.total+tmp2-2) : tmp2-2,
                    tmp2-1 < 1 ? Math.abs(slider.total+tmp2-1) : tmp2-1,
                    tmp2 < 1 ? Math.abs(slider.total+1-tmp2) : tmp2
                ];
            
            }else{
                throw new Error('Where am I??');
            }
        }
      
        set = slider.preview_setting;
        slider.preview.children().remove();
        for(i=0;i<set.length;i++){ // 스트링 변수에 덮어 쓰는 방법보다 효율적인 방법은 무엇일까?
            elem = '<a href="#none" class="img"><img src="' + slider.imgPath+set[i] + "." + 
                slider.imgType +'" alt="' + set[i] + '" width="57" height="60" /></a>';
            slider.preview.append(elem).find('.img').eq(i).css({
                'left' : 72*i + 'px'
            });
        }  
    } 
    else if(slider.animate){ // in case supporting animation
        // 일단은 0부터 시작해서 나열한 상태로 한다.
        // 초기 설정에 맞게 해당 위치를 설정하여 가장 첫번째 위치하도록 한다. Need to modify something on the loop
        if(slider.preview_setting.length === 0){
            for(el=1;el<=slider.total;el++){
                slider.preview_setting.push(el);
            }
        }

        set = slider.preview_setting;
        for(i=0;i<set.length;i++){
            elem = '<a href="#none" class="img"><img src="' + slider.imgPath + set[i] + "." + 
                slider.imgType + '" alt="' + set[i] + '" width="57" height="60" /></a>';;
            slider.preview.append(elem).find('.img').eq(i).css({
                'left' : 72*i + 'px'
            });
        }
    }
}

/*
    
*/
function setPointerOnPreview(slider, direction, callback){
    
    slider.preview.find("img").removeClass("selected");

    if(direction === null){ // 초기화
        if(typeof callback === 'function')
            callback(slider, direction); // displayPreview
            
        slider.preview.find("img").eq(slider.currentPreview).addClass("selected");
        return;
    }
    

    if(!slider.animate){
        if(direction === "next" && slider.currentPreview === 2){
            slider.preview.find("img").eq(2).addClass("selected");
            slider.currentPreview = 2;
            
            if(typeof callback === 'function')
                callback(slider, direction); // displayPreview
            
        }else if(direction === "prev" && slider.currentPreview === 0){
            slider.preview.find("img").eq(0).addClass("selected");
            slider.currentPreview = 0;
            
            if(typeof callback ==='function')
                callback(slider, direction); // displayPreview
            
        }else{
            if(direction === "prev"){
                slider.currentPreview--;
            }else{
                slider.currentPreview++;
            }
        }
            
        slider.preview.find("img").eq(slider.currentPreview).addClass("selected");    
    }else if(slider.animate){
        
        slider.preview.find("img").eq(slider.current).addClass("selected");
        
        if(direction === 'next' && slider.current > 2){
            // 세번째 썸네일에 포인터가 있고 다음 버튼을 누를 경우 오른쪽으로 이동
            if((Math.abs(slider.preview_pos / 72)+3) === slider.current){
                slider.preview_pos += 72;
                slider.preview.stop().animate({
                    'left' : '-' + slider.preview_pos + 'px'
                }, slider.animateDuration);    
            }

        }else if(direction === 'prev' && slider.current+1 < slider.total-2){
            // 첫번째 썸네일에 포인터가 있고 이전 버튼을 누를 경우 이동하고 포인터도 변경.
            if((Math.abs(slider.preview_pos / 72)+1) === slider.current+2){
                slider.preview_pos -= 72;
                slider.preview.stop().animate({
                    'left' : '-' + slider.preview_pos + 'px'
                },slider.animateDuration);    
            }
        } 
    }
}

/** 
 * 
 */
function controlButton(slider){
    if(!slider.loop || slider.loop === null){ // loop false
        
        if(slider.next !== null){
            slider.btnNext.removeClass("invisible");
        }else{
            slider.btnNext.addClass("invisible");
        }

        if(slider.prev !== null){
            slider.btnPrev.removeClass("invisible");
        }else{
            slider.btnPrev.addClass("invisible");
        }
        
    }else{} // loop true
}

/*
  데이터를 기반으로 뷰가 수정이 될 수 있도록 할 것.
  데이터의 변경이 없으면 뷰의 변경도 없다.
*/
function initialize(slider){ // 이 부분을 prototype에 등록할 것.
    if(slider.total >= 3){
      showMainDisplay(slider, function () {
        setPointerOnPreview(slider, null, displayPreview); 
      });
      controlButton(slider);
    }else{
      throw new Error("총 이미지는 3개 이상 등록이 되어야 한다.");
    }
}


/* 
    JSlider 
    옵션을 설정하지 않았을 경우 기본값 설정할 것.
    TODO
    1. total 이미지 설정
    2. current -> start로 설정하면 next와 prev 값을 자동으로 처리헤준다.
    3. start가 변경되면 해당 위치에서 모든 기능들이 제대로 기능하다록 한다.
    4. loop && animate가 모두 활성화되었을 경우, 제대로 기능하도록 한다.
    5. 중복 loop를 없앤다.
    6. 테스트 코드를 작성한다.
    7. turn view after initialization or loading
    8. in clicking the thumbnail in one of three.
    9. delegate 'controlButton' to some function and make it work after....
    10. how to check elapse time each improvement
    11. let know thumbnail's width automatically or insert option or so such as 72 or 73 pixels
*/
var slider = new JSlider({
	total : 8,
	current : 0,
	next : 1,
	prev : null,
	imgPath : "img/",
    imgType : 'png',
    btnPrev : $(".prev-btn"),
    btnNext : $(".next-btn"),
    display : $(".simpleSlider .item"),
    preview : $(".preview-thumbnail"),
    loop : false, // animate && loop 일 경우 처리할 것.
    animate : true,
    animateDuration : 300,
    animateType : ''
});


// initiate this slider
initialize(slider); // initialize를 할 경우 뷰가 나타날 수 있도록 변경할 것.

// Binding event with button
slider.btnPrev.bind("click", function () {
    var target = slider;
    target.goPrev(function () {
        showMainDisplay(target, function () {
            setPointerOnPreview(target, "prev", displayPreview); 
        });
        controlButton(target); // 버튼이 보여야 하는지 여부를 판단하는 것은 다른 곳에 위임할 것.    
    });

    target.getStatus();
    return false;
});

slider.btnNext.bind("click", function () {
    var target = slider;
    target.goNext(function () {
        showMainDisplay(target, function () {
            setPointerOnPreview(target, "next", displayPreview);
        });
        
        controlButton(target); // 버튼이 보여야 하는지 여부를 판단하는 것은 다른 곳에 위임할 것.    
    });

    target.getStatus();
    return false;
});