/**
 * Created by jessietang on 9/5/2016.
 */
var CompUpdate = React.createClass({
    getInitialState: function(){
        return {
            count: 0
        }
    },
    shouldComponentUpdate: function(nextPro, nextState){
        console.log('shouldComponentUpdate');
       /* if(nextState.count > 3){
            return false;
        }*/
        return true;
    },
    componentWillUpdate: function(nextPro, nextState){
        console.log('componentWillUpdate');
    },
    componentDidUpdate: function(){
        console.log('componentDidUpdate');
    },
    updateComp: function(){
        this.setState({
            count: this.state.count+1
        });
    },
    render: function() {
        console.log('渲染');
        return (
            <div>
                <h1>计数：{this.state.count}</h1>
                <h2>component update example</h2>
                <button onClick={this.updateComp}>手动跟新组件（包括子组件哦）</button>
                <SubMessage count={this.state.count}/>
            </div>
        )
    }

});


var SubMessage = React.createClass({
    componentWillReceiveProps: function(nextProp){
        console.log('子组件将要获得prop');
    },
    shouldComponentUpdate: function(nextProp, nextState){
        if(nextProp.count > 5){
            return false;
        }
        return true;
    },
    render: function(){
        return (
            <div>
                <h3>当前计数是： {this.props.count}</h3>
            </div>
        )
    }
});


ReactDOM.render(
    <CompUpdate/>,
    document.getElementById('app')
);