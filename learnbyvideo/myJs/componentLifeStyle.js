/**
 * Created by jessietang on 9/5/2016.
 */
var CompCycle= React.createClass({
    getInitialState: function(){
        console.log('getInitialState');
        return {
            message: 'hello kitty',
            count: 0
        }
    },
    getDefaultProps: function(){
        console.log('getDefaultProps');
        return {};
    },
    componentWillMount: function(){
        console.log('componentWillMount');
        this.setState({
            message:'hello jack'
        });

        var self = this;
        this.timer = setInterval(function(){
            self.setState({
                count: self.state.count+1
            });
        }, 1000);

    },
    componentDidMount: function(){ /*这个地方适合做一些ajax操作， 获取值，然后再对dom进行一些操作*/
        console.log('componentDidMount');
    },
    componentWillUnmount: function(){ /*取消定时器，取消事件监听等等*/
        alert('you are tring to kill me!!');
        clearInterval(this.timer);
    },
    killMyself: function(){
        ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    },
    render: function(){
        console.log('render');
        return (
            <div>
                <h2>hello， jessie</h2>
                <h2>replay: {this.state.message}</h2>
                <h2>count: {this.state.count}</h2>
                <button onClick={this.killMyself}>卸载掉这个组件</button>
            </div>
        )
    }
});

ReactDOM.render(
    <CompCycle/>,
    document.getElementById('app')
);