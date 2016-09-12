/**
 * Created by jessietang on 9/5/2016.
 */

var EasyForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function(){
        return {
            message: 'react is very strong',
            isReactAwesome: true
        }
    },
    render: function(){
        return (
            <div>
                <h2>我想说：{this.state.message}</h2>
                <h2>React好用吗？{this.state.isReactAwesome ? '好用' : '不好用哦'}</h2>
                <input type="text" valueLink={this.linkState('message')}/>
                <input type="checkbox" checkedLink={this.linkState('isReactAwesome')}/>好用
                <SubComp messageLink={this.linkState('message')} likeLink={this.linkState('isReactAwesome')}/>
            </div>
        )
    }
});

/*var SubComp = React.createClass({
    render: function(){
        return (
            <div>
                <h2>这是个子组件哦</h2>
                <SubSubComp messageLink={this.props.messageLink} likeLink={this.props.linkLink}/>
            </div>
        )
    }
});*/
/*可以使用es6中的spread操作， 然后写成下面这个样子*/
var SubComp = React.createClass({
     render: function(){
         return (
             <div>
                 <h2>这是个子组件哦</h2>
                 <SubSubComp {...this.props}/>
             </div>
         )
     }
 });

var SubSubComp = React.createClass({
    render: function(){
        return (
            <div>
                <h2>what do you want to say?</h2>
                <input type="text" valueLink={this.props.messageLink}/>
                <h2>do you think react is useful?</h2>
                <input type="checkbox" checkedLink={this.props.likeLink}/>useful 好用
            </div>
        )
    }
});

ReactDOM.render(
    <EasyForm/>,
    document.getElementById('app')
);
