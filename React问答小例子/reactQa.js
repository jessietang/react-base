/**
 * Created by jessietang on 11/1/2016.
 */
var QuestionApp = React.createClass({
    getInitialState: function(){
        var questions = [
            {
                key: 1,
                title: '产品经理与程序员矛盾的本质是什么？',
                description: '理性探讨，请勿撕逼。产品经理的主要工作职责是产品设计。接受来自其他部门的需求，经过设计后交付研发。但这里有好些职责不清楚的地方。',
                voteCount: 2
            },
            {
                key: 2,
                title: '热爱编程是一种怎样的体验？',
                description: '别人对玩游戏感兴趣，我对写代码、看技术文章感兴趣；把泡github、stackoverflow、v2ex、reddit、csdn当做是兴趣爱好；遇到重复的工作，总想着能不能通过程序实现自动化；喝酒的时候把写代码当下酒菜，边喝边想边敲；不给工资我也会来加班；做梦都在写代码。',
                voteCount: 8
            }
        ];
        return {
            questions: questions,
            formDisplayed: false
        };
    },
    onFormToggle: function(){
        this.setState({
            formDisplayed: !this.state.formDisplayed
        });
    },
    onNewQuestion: function(question){
        question.key = this.state.questions.length + 1;
        var newQuestions = this.state.questions.concat(question);
        newQuestions = this.questionSort(newQuestions);
        this.setState({
            questions: newQuestions
        });
    },
    questionSort: function(questions){
        questions.sort(function(a,b){
            return b.voteCount - a.voteCount;
        });
        return questions;
    },
    onVote: function(key, newVoteCount){
        var index = 0;
        var questions = this.state.questions;
        for(var i=0; i<questions.length; i++){
            if(questions[i].key == key){
                index = i;
            }
        }
        questions[index].voteCount = newVoteCount;
        questions = this.questionSort(questions);
        this.setState({
            questions: questions
        });
    },
    render: function(){
        return (
            <div className="qa-app">
                <div className="qa-title text-center">
                    <div className="container">
                        <h1>React问答</h1>
                        <AddButton onFormToggle={this.onFormToggle}/>
                    </div>
                </div>

                <div className="qa-content">
                    <div className="container">
                        <QuestionForm onFormToggle={this.onFormToggle} onNewQuestion={this.onNewQuestion} formDisplayed={this.state.formDisplayed}/>
                        <QuestionList questions={this.state.questions} onVote={this.onVote}/>
                    </div>
                </div>
            </div>
        )
    }
});

var AddButton = React.createClass({
    render: function(){
        return (
            <button className="add-question btn btn-primary pull-right" onClick={this.props.onFormToggle}>add question</button>
        )
    }
});

var QuestionForm = React.createClass({
    handleSubmit: function(e){
        e.preventDefault();
        var newQuestion = {
            title: this.refs.title.value,
            description: this.refs.description.value,
            voteCount: 0
        };
        this.refs.questionForm.reset();
        this.props.onNewQuestion(newQuestion);
    },
    render: function(){
        var styleDisplay = {
            display: this.props.formDisplayed ? 'block' : 'none'
        };
        return (
            <form ref="questionForm" action="" className="question-box clearfix" style={styleDisplay} onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="pull-left">question</label>
                    <input ref="title" type="text" className="form-control" placeholder="title of question"/>
                </div>
                <div className="form-group">
                    <textarea ref="description" name="" id="" cols="30" rows="3" placeholder="content of question" className="form-control"></textarea>
                </div>
                <button className="btn btn-success pull-right">save</button>
                <a className="btn btn-default pull-right cancel-btn" onClick={this.props.onFormToggle}>cancel</a>
            </form>
        )
    }
});

var QuestionList = React.createClass({
    render: function(){
        var questions = this.props.questions;
        if(!Array.isArray(questions)) throw new Error("问题必须是数组");
        var _this = this;
        var questionComps = questions.map(function(qst){
            return <QuestionItem
                key={qst.key}
                questionKey={qst.key}
                title={qst.title}
                description={qst.description}
                voteCount={qst.voteCount}
                onVote={_this.props.onVote}/>
        });
        return (
            <div>
                {questionComps} /*直接放个数组在这里，他会自动去循环*/
            </div>
        )
    }
});

var QuestionItem = React.createClass({
    voteUp: function(){
        var newVoteCount = parseInt(this.props.voteCount, 10) + 1;
        this.props.onVote(this.props.questionKey, newVoteCount); //this.props.questionKey这里必须重
        // 新定义一个questionKey属性， 不能this.props.key
    },
    voteDown: function(){
        var newVoteCount = parseInt(this.props.voteCount, 10) - 1;
        this.props.onVote(this.props.questionKey, newVoteCount);
    },
    render: function(){
        return (
            <div className="media">
                <div className="media-left">
                    <button className="btn btn-default" onClick={this.voteUp}>
                        <span className="glyphicon glyphicon-chevron-up"></span>
                        <span className="vote-count">{this.props.voteCount}</span>
                    </button>
                    <button className="btn btn-default" onClick={this.voteDown}>
                        <span className="glyphicon glyphicon-chevron-down"></span>
                    </button>
                </div>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.title}</h4>
                    <p>{this.props.description}</p>
                </div>
            </div>
        )
    }
});

ReactDOM.render(<QuestionApp/>, document.getElementById('myApp'));