
window.onload=function(){
    //   构造函数创建
    function game(){
        this.atAlp=[
            {value:'A',src:'A.png'},
            {value:'B',src:'B.png'},
            {value:'C',src:'C.png'},
            {value:'D',src:'D.png'},
            {value:'E',src:'E.png'},
            {value:'F',src:'F.png'},
            {value:'G',src:'G.png'},
            {value:'H',src:'H.png'},
            {value:'I',src:'I.png'},
            {value:'J',src:'J.png'},
            {value:'K',src:'K.png'},
            {value:'L',src:'L.png'},
            {value:'M',src:'M.png'},
            {value:'N',src:'N.png'},
            {value:'O',src:'O.png'},
            {value:'P',src:'P.png'},
            {value:'Q',src:'Q.png'},
            {value:'I',src:'I.png'},
            {value:'S',src:'S.png'},
            {value:'T',src:'T.png'},
            {value:'U',src:'U.png'},
            {value:'V',src:'V.png'},
            {value:'W',src:'W.png'},
            {value:'X',src:'X.png'},
            {value:'Y',src:'Y.png'},
            {value:'Z',src:'Z.png'}
        ];    //存储所有字母
        this.box=document.querySelector('.box');   //获取大盒子
        this.curentAlp=3;    //给定显示图片的数量
        this.arr={};   //声明一个空对象  待用
        this.Carr=[];   //声明一个空数组  待用
        this.width=this.box.offsetWidth-60;   //获取盒子的宽度  以限制img显示的位置
        this.height=this.box.offsetHeight-70;  //获取盒子的高度  以限制img显示的位置
        this.t='';
        this.time=50;
        this.Cimg=[];
        this.speed=5;
        this.life=10;
        this.fenshu=0;
        this.shengming=document.querySelector('#shengming');
        this.grade=document.querySelector('#fenshu');
    };
    game.prototype={
        play:function(){   //运行
            this.keepAlp();
            this.draimg();
            this.move();
            this.keydown();
        },
        keepAlp:function(){   //存储要显示的图片
            while(this.Carr.length<this.curentAlp){   //循环小于要显示的图片的数量
                var num=Math.floor(Math.random()*this.atAlp.length); //在所有字母中生成随机数
                var obj=this.atAlp[num];   //
                if(!this.check(obj)){   //判断是否出现重复  ！错误  不是再次表示出现后
                    this.Carr.push(obj);    //给Carr数组里存储上字母库里对应的对象
                }
            }
        },
        check:function(item){
            return this.Carr.some(function(a){    //去重复
                return item.value==a.value;
            })
        },
        getOneArr:function(){
            do{
                var num=Math.floor(Math.random()*this.atAlp.length); //在所有字母中生成随机数
                var obj=this.atAlp[num];   //
                console.log(this.Carr);
            }while(this.check(obj))

                this.Carr.push(obj);


            var img=document.createElement('img');  //
            img.src=`A_Z/${obj.src}`;   //获取img的src   当前的图片
            this.box.appendChild(img);
            var lefts=Math.floor(Math.random()*this.width);
            img.style.left=lefts+'px';
            var tops=Math.floor(Math.random()*50);
            img.style.top=tops+'px';
            this.Cimg.push(img);
        },
        draimg:function(){       //创建图片
            var that=this;
            that.Carr.forEach(function(m){   //循环要出现的字母数组
                var img=document.createElement('img');  //
                img.src=`A_Z/${m.src}`;   //获取img的src
                that.box.appendChild(img);
                var lefts=Math.floor(Math.random()*that.width);
                img.style.left=lefts+'px';
                var tops=Math.floor(Math.random()*50);
                img.style.top=tops+'px';
                that.Cimg.push(img);
            })
//存储图

        },
        move:function(){         //移动字母
            var that=this;
            this.t=setInterval(function(){
                for(var i=0;i<that.Cimg.length;i++){
                    var height=that.Cimg[i].offsetTop+that.speed;

                    if(that.life<=0){

                        alert('游戏结束');
                        clearInterval(that.t);
                        return;

                    }else{

                        that.Cimg[i].style.top=height+'px';
                        that.shengming.innerHTML=that.life;
                    if(height>that.height){
                        that.life--;
                        that.box.removeChild(that.Cimg[i]);
                        that.Carr.splice(i,1);
                        that.Cimg.splice(i,1);
                        that.getOneArr();
                        }
                    }

                }
            },this.time);
        },
        keydown:function(){    //添加键盘事件
            var that=this;
            document.onkeydown=e=>{
                 var code=e.keyCode;
                 var jianpan=String.fromCharCode(code);
                this.Carr.forEach((val,index)=>{

                    if(jianpan==val.value){
                       // console.log(this.Cimg);
                       this.fenshu++;
                       this.grade.innerHTML=this.fenshu;
                       this.box.removeChild(this.Cimg[index]);
                       this.Carr.splice(index,1);
                       this.Cimg.splice(index,1);
                       this.getOneArr();
                        if(this.fenshu==10){
                            alert('开始下一关');
                            this.box.innerHTML='';
                            this.Carr.splice(index);
                            this.Cimg.splice(index);

                            this.curentAlp=4;    //给定显示图片的数量
                            this.arr={};   //声明一个空对象  待用
                            this.Carr=[];
                            this.Cimg=[];
                            this.life=10;

                            this.keepAlp();
                            this.draimg();
                            this.move();
                            this.keydown();

                        }
                    }
                });
            }

        },




    }



    var Game=new game();
    Game.play();








}
