function game () {
	this.arr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.imgs={
		A:"./img/1.png",
		B:"./img/2.png",
		C:"./img/3.png",
		D:"./img/4.png",
		E:"./img/5.png",
		F:"./img/6.png",
		G:"./img/7.png",
		H:"./img/8.png",
		I:"./img/9.png",
		J:"./img/10.png",
		K:"./img/11.png",
		L:"./img/12.png",
		M:"./img/13.png",
		N:"./img/14.png",
		O:"./img/15.png",
		P:"./img/16.png",
		Q:"./img/17.png",
		R:"./img/18.png",
		S:"./img/19.png",
		T:"./img/20.png",
		U:"./img/21.png",
		V:"./img/22.png",
		W:"./img/23.png",
		X:"./img/26.png",
		Y:"./img/24.png",
		Z:"./img/25.png",
	};
	this.num=3;//规定随机数
	this.letterarr=[];
	this.spanarr=[];
	this.clientW=document.documentElement.clientWidth;
	this.clientH=document.documentElement.clientHeight;
	this.t;
	this.speed=1;
	this.score=0;	
	this.currScore=0;	
	this.passScore=10;	
	this.life=5;//生命值		
	this.step=1;//关卡
	this.lifebox=$("#life");
	this.stepbox=$("#step");//关卡
	this.scorebox=$("#score");
	this.currScorebox=$("#currscore");
	this.jieshu=$(".jieshu")[0];
	this.xyg=$(".xyg")[0];
	this.xyg1=$(".xyg1")[0];
	this.jstc=$(".jstc")[0];//结束弹窗
	this.yes=$(".yes")[0];
	this.no=$(".no")[0];
	this.zt=$(".zt")[0];
	this.ks=$(".ks")[0];
	this.wait=$(".wait")[0];
	this.cw=$(".cw")[0];
	this.tc=$(".tuichu")[0];
	this.tc1=$(".tuichu1")[0];
	this.yes1=$(".yes1")[0];
	this.no1=$(".no1")[0];
	

}
game.prototype={
	play:function(){
		this._createspan(this._getRand(this.arr,this.num))
		this._move();
		this._key();
		
	},
	
	_getRand:function(arr,num){
		var newarr=[]	
		for (var i = 0; i <num; i++) {
			var letter=this.arr[Math.floor(Math.random()*this.arr.length)]
			while(this._checkletter(letter,this.letterarr)){	
				letter=this.arr[Math.floor(Math.random()*this.arr.length)]	
			}
			this.letterarr.push(letter)
			newarr.push(letter)			
		}
		return newarr;
	},
	_checkletter:function(val,arr){
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]==val) {
				return true
			}
		}
		return false
	},
	_createspan:function(arr){
		var newarr=[]
		for (var i = 0; i < arr.length; i++) {
			var r=Math.round(Math.random()*255);
   			var g=Math.round(Math.random()*255);
    		var b=Math.round(Math.random()*255);
    		var colors="rgb("+r+","+g+","+b+")";
    		var sizes=Math.random()*10+30;
			var spans=document.createElement("span");
			spans.innerHTML="<img src="+this.imgs[arr[i]]+" >";							
			spans.letter=arr[i]		//给每个spans加一个属性(把span当做对象)
			var lefts=Math.floor(Math.random()*(this.clientW-300)+150)
			var tops=Math.floor(Math.random()*20+10);	
			while(this._checkPos(lefts,this.spanarr)){
				lefts=Math.floor(Math.random()*(this.clientW-300)+150)
			}
			spans.style.cssText="position:absolute;left:"+lefts+"px;top:"+tops+"px;width:"+sizes+"px;height:"+sizes+"px;border-radius:50%;line-height:"+sizes+"px;text-align:center;";
			this.spanarr.push(spans)
			newarr.push(spans)
			document.body.appendChild(spans)
		};
		return newarr;
	},
	_checkPos:function(ele,eleArr){
		for (var i = 0; i <eleArr.length; i++) {
			if (ele>eleArr[i].offsetLeft-100&&ele<eleArr[i].offsetLeft+100){
				return true;
			}
		};
		return false;
	},
	_move:function(){
		var that=this;
		that.t=setInterval(down,60)
		function down(){
			for (var i = 0; i < that.spanarr.length; i++) {
				var tops=that.spanarr[i].offsetTop+that.speed;
				that.spanarr[i].style.top=tops+"px";

				if (tops>that.clientH-100){			
					animate(that.spanarr[i],{opacity:0},300,function(){
						document.body.removeChild(this)
					})		
					that.letterarr.splice(i,1)
					that.spanarr.splice(i,1) 	 	
					that._createspan(that._getRand(that.arr,1))
					that.life--;
					that.lifebox.innerHTML=that.life;
					if (that.life<1) {
						
						that.jieshu.style.display="block";
						that.jstc.style.display="block";
						clearInterval(that.t)
						that.yes.onclick=function(){
						 location.reload()
						}
						
						// that.no.onclick=function(){
						// 	close()
						// }
					};
				}				
			};
		}
		that.cw.onclick=function(){
			location.reload()
						}
		that.zt.onclick=function(){
			clearInterval(that.t)
			that.zt.style.display="none";
			that.wait.style.display="block";
			that.ks.style.display="block";
		}
		that.ks.onclick=function(){
			that.t=setInterval(down,60)
			that.ks.style.display="none";
			that.zt.style.display="block";
			that.wait.style.display="none";
		}
		
		that.tc.onclick=function(){
			that.tc1.style.display="block";
			clearInterval(that.t)
		}
			
		that.no1.onclick=function(){
			that.t=setInterval(down,60);
			that.tc1.style.display="none";
		}
		// that.yes1.onclick=function(){
		// 	that.win.close()
		// }

	},
	_key:function(){
		var that=this;
		document.onkeydown=function(e){
			var e=e||window.event;	
			var letters=String.fromCharCode(e.keyCode);
			for (var i = 0; i <that.spanarr.length; i++) {	
				if (that.spanarr[i].letter==letters){			
					animate(that.spanarr[i],{opacity:0},300,function(){
						document.body.removeChild(this)
					})		
					that.letterarr.splice(i,1)
					that.spanarr.splice(i,1) 	 	
					that._createspan(that._getRand(that.arr,1))	
					that.score++;
					that.currScore++;
					that.scorebox.innerHTML=that.score;
					if (that.currScore%that.passScore==0) {
						that.xyg.style.display="block";
						clearInterval(that.t);
						document.onkeydown=that.xyg1.onclick=function(e){
							var e=e||window.event;
							if(e.type=="click"||e.keyCode==13){
							that.xyg.style.display="none";
							for (var i = 0; i < that.spanarr.length; i++) {
							document.body.removeChild(that.spanarr[i])
						};

						that.currScore=0;
						that.spanarr=[]
						that.currarr=[]
						that.passScore+=10;
						that.step++;
						that.stepbox.innerHTML=that.step;
						that.num++;
						that.speed+=2;
						that._createspan(that._getRand(this.arr,that.num))
						that._move()
						that._key()
					}
				  };
				 }				 	
				}
			}
		}			
	}
	

}