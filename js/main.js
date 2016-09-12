/**
 * Created by jessietang on 7/27/2016.
 */
var ChooseInput = React.createClass({
    chooseElement: function(){
        var chooseType;
        $('.popup-choose .radio-input').each(function(){
            var $this = $(this);
            if($this.prop("checked")){
                chooseType = $this.val();
            }
        });
        if(chooseType){
            this.props.addInputItem({
                type: chooseType
            });
            $('.popup-choose').hide();
        }else{
            alert("please choose one input element");
        }
    },
    render: function(){
        return (
            <div className="popup-choose">
                <div>please choose one input element</div>
                <div>
                    <label for="input-text">
                    <input type="radio" name="radio-input" className="radio-input" value="text" id="input-text"/>文本
                    </label>
                </div>
                <div>
                    <label for="input-eamil">
                    <input type="radio" name="radio-input" className="radio-input" value="email" id="input-eamil"/>邮箱
                    </label>
                </div>
                <button className="btn btn-primary" onClick={this.chooseElement}>sure choose</button>
            </div>
        );
    }
});


var EditTemplate = React.createClass({
    addInputItem: function(item){
        this.props.addInputItem(item);
    },
    removeInputItem: function(item,event){
        var index = $('event.target').data('item-index');
        this.props.removeInputItem(item);
    },
    chooseInputElement: function(type){
        this.props.chooseInputElement(type);
    },
    render: function(){
        var _this = this;
        return (
            <div className="input-item-wrapper">
                {
                    _this.props.items.map(function(item,index){
                        return (
                            <div className="oneItem">
                                {(function(){
                                    if(item.type === 'text'){
                                        return (<input type="text" placeholder="please enter with text"/>);
                                    }else{
                                        return (<input type="eamil" placeholder="please enter with email"/>);
                                    }
                                })()}
                                <button onClick={_this.removeInputItem} data-item-index={index} className="btn btn-danger glyphicon glyphicon-minus btn-remove"></button>
                            </div>
                        );
                    })
                }
                <ChooseInput addInputItem={this.addInputItem}></ChooseInput>
            </div>
        );
    }
});

var PreviewTemplate = React.createClass({
    render: function(){
        var _this = this;
        return (
            <div className="input-item-wrapper">
                {
                    _this.props.items.map(function(item){
                        return (<div className="oneItem">
                            {
                                (function(){
                                    if(item.type === 'text'){
                                        return (<input type="text" placeholder="please enter with text"/>);
                                    }else{
                                        return (<input type="eamil" placeholder="please enter with email"/>);
                                    }
                                })()
                            }
                        </div>);
                    })
                }
            </div>
        );
    }
});

var MyContainer = React.createClass({
    getInitialState: function(){
        return ({
            status: 'edit',
            items: []
        });
    },
    addInputItem: function(item){
        this.state.items.push(item);
        this.setState(this.state);
    },
    removeInputItem: function(index){
      this.state.items.splice(index,1);
        this.setState(this.state);
    },
    popupShow: function(){
        $('.popup-choose').show();
    },
    submitSuccess: function(){
        alert('successfully submit!');
    },
    renderEditor: function(){
        this.state.status = 'edit';
    },
    renderPreview: function(){
        this.state.status = 'preview';
    },
    render: function(){
        var _this = this;
        return (
            <div className="outsideWrapper">
                {
                    (function(){
                        if(_this.state.status === 'edit'){
                            return (<button className="btn btn-primary" onClick={_this.renderPreview}>preview</button>);
                        }else {
                            return (<button className="btn btn-primary" onClick={_this.renderEditor}>edit</button>);
                        }
                    })()
                }

                {
                    (function(){
                        if(_this.state.status === 'edit'){
                            return (
                                <EditTemplate items={_this.state.items}
                            addInputItem={_this.addInputItem}
                            removeInputItem={_this.removeInputItem}></EditTemplate>
                            );
                        }else{
                            return (<PreviewTemplate items={_this.state.items}></PreviewTemplate>);
                        }
                    })()
                }

                {
                    (function(){
                        if(_this.state.status === 'edit'){
                            return (
                                <button className="btn btn-danger glyphicon glyphicon-plus btn-add" onClick={_this.popupShow}></button>
                            );
                        }else{
                            return (
                                <button className="btn btn-primary" onClick={_this.submitSuccess}>submit</button>
                            );
                        }
                    })()
                }

            </div>
        );
    }
});

setInterval(function(){
    ReactDOM.render(
    <MyContainer></MyContainer>,
        document.getElementById('myContainer')
    );

},50);