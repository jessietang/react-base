/**
 * Created by jessietang on 11/3/2016.
 */

    /*
    *error：react.min.js:16 Uncaught Invariant Violation: Minified React error #109;
    * reason: class --> className  老是搞忘记
    *           for --> htmlFor
    * 【重点】：【子组件向父组件传值】，之前左边的产品点击了add cart之后， boughtList是在改变，
    * 但是右边的购物车里面并没有重新渲染boughtList,原因是在子组件写的是this.setState({boughtList: boughtList});，
    * 这种写法不对，因为this指代的是当前子组件，而我们需要改变的是父组件里面的state, 所以相当于父组件里面的boughtList根本
    * 就没有重新更新渲染，所以有问题。
    * 后来找到了原因，就是因为这种类型属于子组件向父组件传值，应该重新更新一下父组件的state.
    * */
var ShoppingCart = React.createClass({
    getInitialState: function(){
        var items = [
            {
                key: 1,
                name: 'pen',
                price: 20
            },
            {
                key: 2,
                name: 'book',
                price: 10
            },
            {
                key: 3,
                name: 'pencil',
                price: 40
            },{
                key: 4,
                name: 'keyboard',
                price: 25
            },{
                key: 5,
                name: 'computer',
                price: 40
            },{
                key: 6,
                name: 'mouth',
                price: 55
            }
        ];
        var boughtList = [];
        return {
            items: items,
            boughtList: boughtList,
            total: 0
        };
    },
    onBoughtListChanged: function(newBoughtList){
        this.setState({
            boughtList: newBoughtList
        });
    },
    onTotalChanged: function(newTotal){
        this.setState({
            total: newTotal
        });
    },
    render: function(){
        return (
            <div>
                <div className="container">
                    <div className="row myShoppingCart">

                        <LeftPdp items={this.state.items} boughtList={this.state.boughtList} total={this.state.total}
                                 onBoughtListChanged={this.onBoughtListChanged} onTotalChanged={this.onTotalChanged}/>

                        <RightCart boughtList={this.state.boughtList} total={this.state.total}
                                   onBoughtListChanged={this.onBoughtListChanged} onTotalChanged={this.onTotalChanged}/>

                    </div>
                </div>
            </div>
        )
    }
});

var LeftPdp = React.createClass({
    render: function(){
        var items = this.props.items;
        var _this = this; /*这里这样传递，吧this单独保存一下 boughtList={_this.props.boughtList}*/
        var itemComps = items.map(function(item){
            return <ProductItem
                key={item.key}
                proKey={item.key}
                name={item.name}
                price={item.price}
                boughtList={_this.props.boughtList}
                total={_this.props.total}
                onBoughtListChanged={_this.props.onBoughtListChanged}
                onTotalChanged={_this.props.onTotalChanged}
                />
        });
        return (/*开始这里没有加最外层的div来包裹，然后就一直报错。。。*/
            <div className="leftPdp col-md-6">
                {itemComps}
            </div>
        )
    }
});

var ProductItem = React.createClass({
    handleAddCart: function(){
        var total = 0; /*每次算之前要把total清空*/
        var boughtList = this.props.boughtList;
        var nowKey = this.props.proKey; /*这里不能用this.props.key， 要重新定义一个属性， proKey拿来用*/
        console.log("nowKey"+nowKey);
        console.log(boughtList[0]);
        var flag = false; /*这样来判断boughtList里面是否有当前这一个产品存在*/
        /*if(boughtList[nowKey]){
            boughtList[nowKey].num += 1;
        }  */ //这种写法是错误的！！！
        for(var i in boughtList){
            if(boughtList[i].key == nowKey){
                console.log('has in');
                boughtList[i].num += 1;
                flag = true;
            }
        }
        if(!flag){
            var arr = {};
            arr.key = nowKey;
            arr.name = this.props.name;
            arr.price = this.props.price;
            arr.num = 1;
            boughtList.push(arr);
        }

        /*this.setState({
            boughtList: boughtList
        });*/
        this.props.onBoughtListChanged(boughtList);/*应该这样来，子组件向父组件传值，而不是上面注释的那样，因为上面的this指的是当前的组件*/
        for(var i in boughtList){
            total += boughtList[i].num * boughtList[i].price;
        }
        /*this.setState({
            total: total
        });*/
        this.props.onTotalChanged(total);/*应该这样来，子组件向父组件传值，而不是上面注释的那样，因为上面的this指的是当前的组件*/
        console.log("length"+boughtList.length);
        for(var i in boughtList){
            console.log("num"+boughtList[i].num);
            console.log("key"+boughtList[i].key);
        }

    },
    render: function(){
        return (

                <div className="col-md-4">
                    <h3 className="pro-title">{this.props.name}</h3>
                    <h3 className="pro-price">{this.props.price}</h3>
                    <button className="btn btn-default" onClick={this.handleAddCart}>add to cart</button>
                </div>

        )
    }
});

var RightCart = React.createClass({
    test: function(){
        console.log(this.props.boughtList.map(function(item){return <CartItem
            key={item.key}
            name={item.name}
            num={item.num}
            price={item.price}/>}));
    },
    render: function(){
        var boughtList = this.props.boughtList;
            var _this = this;
            var cartComps = boughtList.map(function(item){
                return <CartItem
                    key={item.key}
                    cartKey={item.key}
                    name={item.name}
                    num={item.num}
                    price={item.price}
                    boughtList={_this.props.boughtList}
                    onBoughtListChanged={_this.props.onBoughtListChanged}
                    onTotalChanged={_this.props.onTotalChanged}/>
            });

        return (
            <div className="rightCart col-md-6">
                <div className="row cartTitle">
                    <div className="col-md-4" onClick={this.test}>product name</div>
                    <div className="col-md-2">price</div>
                    <div className="col-md-4">number</div>
                    <div className="col-md-2">operate</div>
                </div>
                <div>{cartComps}</div>
                <div className="total text-right">合计：<span>{this.props.total}</span>元</div>
                <button className="btn btn-primary">结算</button>
            </div>
        )
    }
});

var CartItem = React.createClass({
    handleDel: function(){
        var delKey = this.props.cartKey;
        var boughtList = this.props.boughtList;
        for(var i in boughtList){
            if(boughtList[i].key == delKey){
                delete boughtList[i];
            }
        }
        this.props.onBoughtListChanged(boughtList); /*传递给父元素*/
        //还要重新计算total
        var total = 0;
        for(var i in boughtList){
            total += boughtList[i].num * boughtList[i].price;
        }
        this.props.onTotalChanged(total);/*传递给父元素*/

    },
    addNum: function(){
        var changedKey = this.props.cartKey;
        var boughtList = this.props.boughtList;
        for(var i in boughtList){
            if(boughtList[i].key == changedKey){
                boughtList[i].num += 1;
            }
        }
        this.props.onBoughtListChanged(boughtList);/*传递给父元素*/
        //还要重新计算total
        var total = 0;
        for(var i in boughtList){
            total += boughtList[i].num * boughtList[i].price;
        }
        this.props.onTotalChanged(total);/*传递给父元素*/

    },
    substractNum: function(){
        var changedKey = this.props.cartKey;
        var boughtList = this.props.boughtList;
        for(var i in boughtList){
            if(boughtList[i].key == changedKey){
                boughtList[i].num -= 1;
                if(boughtList[i].num == 0){ /*注意这里num减到0的情况*/
                    this.handleDel();
                }
            }
        }
        this.props.onBoughtListChanged(boughtList);/*传递给父元素*/
        //还要重新计算total
        var total = 0;
        for(var i in boughtList){
            total += boughtList[i].num * boughtList[i].price;
        }
        this.props.onTotalChanged(total);/*传递给父元素*/

    },
    render: function(){
        return (
            <div className="row cartItem" >
                <div className="col-md-4 pro-cart-name">{this.props.name}</div>
                <div className="col-md-2 pro-cart-price">{this.props.price}</div>
                <div className="col-md-4 pro-cart-num">
                    <button className="btn-default btn-sm glyphicon glyphicon-minus" onClick={this.substractNum}></button>
                    <input type="text" value={this.props.num}/>
                    <button className="btn btn-default btn-sm glyphicon glyphicon-plus" onClick={this.addNum}></button>
                </div>
                <div className="col-md-2 pro-cart-delete">
                    <a className="btn btn-danger" onClick={this.handleDel}>delete</a>
                </div>
            </div>
        )
    }
});
ReactDOM.render(
    <ShoppingCart/>,
    document.getElementById('app')
);