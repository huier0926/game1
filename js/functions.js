// 兼容性的通过类名获取元素
  function getClass(selector,obj){
     obj=obj||document;
     if(document.getElementsByClassName){
  return obj.getElementsByClassName(selector)      
     }else{
      var all=obj.getElementsByTagName("*");
      var newarr=[];
      for (var i = 0; i < all.length; i++) {
            if(check(all[i].className,selector)){
                newarr.push(all[i])
            }
        };
        return newarr;  
     }
  }
  function check(lstr,str){
    var arr=lstr.split(" ");
    for (var i = 0; i < arr.length; i++) {
        if(arr[i]==str){
            return true;
        }
    };
    return false;
  } 
//兼容性的获取或者设置元素的文本内容
  function getText(obj,value){
  if(value!=undefined){
    if(obj.textContent!=undefined){
       obj.textContent=value;  
    }else{
       obj.innerText=value;
    } 
  }else{   
    if(obj.textContent!=undefined){
       return obj.textContent; 
    }else{
       return obj.innerText; 
    }
  }
}
// 兼容性的获取任意一个元素的任意属性
function getStyle(obj,attr){
   if(window.getComputedStyle){
   return window.getComputedStyle(obj,null)[attr] 
   }else{
   return obj.currentStyle[attr] 
   }  
} 
// 兼容性的通过id 标签名或者类名获取元素
function $(s,obj){
    if(typeof s=="string"){  
      obj=obj||document;
      if(s.charAt(0)=="."){
         return getClass(s.slice(1),obj)
      }else if(s.charAt(0)=="#"){
         return document.getElementById(s.slice(1)) 
      }else if(/^[a-z]+[a-z1-6]?$/g.test(s)){
        return obj.getElementsByTagName(s)
      } 
    }else if(typeof s=="function"){
       window.onload=function(){
              s()
       } 
    }  
 }
 //获取一个元素所有子节点
 // function getchild(obj)//文本元素注释
 //  var child=obj.childNodes;
 //  var arr=[];
 //  for (var i = 0; i < child.length; i++) {
 //    if (child[i].nodeType==1) {
 //        arr.push(child[i]);
 //    };
 //  };
 //  return  arr;
 // }
 //获取一个元素的第一个子节点
 // function getfirst(obj){
 //  return getchild(obj)[0]
 // }
//获取一个元素最后一个子节点
// function getlast(obj){
//   var arr=getchild(obj)
//   return arr[arr.length-1];
// }
//获取元素的下一个兄弟元素节点
//nextElementSibling
//preiousElemnetSibling
 // function getNext(num){
 //    var next=num.nextSibling;
 //    if(next==null){
 //        return null;
 //    }
 //    while(next.nodeType!=1){
 //      next=  next.nextSibling;
 //      if(next==null){
 //          return null;
 //      }
 //    }
 //  return next
 // }
 // 获取元素的上一个兄弟元素节点
 //  function getPre(num){
 //    var pre=num.previousSibling;
 //    if(pre==null){
 //        return null;
 //    }
 //    while(next.nodeType!=1){
 //      pre=  pre.nextSibling;
 //      if(pre==null){
 //          return null;
 //      }
 //    }
 //  return pre
 // }