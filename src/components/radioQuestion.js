import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class RadioQuestion extends Component {

  static propTypes = {
    question: PropTypes.object.isRequired,
    handleBtn: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    answer: [],
    flag: false
  }

  componentDidMount() {
    this.initializeState()
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.question.prompt !== nextProps.question.prompt){
      this.initializeState(nextProps)
    }
  }

  initializeState = (props = this.props) => {
    const question = props.question
    const count = props.question.answer.filter((ans) => (ans.isChecked === true)).length
    const isNextBtnEnabled = (question.is_required && count > 0) || (!question.is_required)
    this.setState({
      answer: question.answer,
      flag: (count > 0) ? true : false
    },() => {
      props.handleBtn(isNextBtnEnabled)
    })
  }

  handleChange = (event) => {
    const options = this.state.answer
    this.setState({
      answer: options.map((option)=>(
        option.val === event.target.value
          ? {
            val: option.val,
            isChecked: event.target.checked
          }
          :{
            val: option.val,
            isChecked: false
          }
        ))
    }, () => {
      let checkedCount = this.state.answer.filter((ans)=> (ans.isChecked === true)).length
      console.log(checkedCount)
      if (this.props.question.is_required && checkedCount > 0) {
        this.setState({flag: true})
      }
      else if(this.props.question.is_required && checkedCount ===0) {
          this.setState({flag: false})
      }
    })
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.state.answer)
  }


  render () {
    const question = this.props.question
    const options = this.state.answer
    const flag = this.state.flag
    return (
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card">
            <div className="card-content black-text">
              <span className="card-title">{question.prompt}</span>
            </div>
            <div className="card-action">
            <form>
              {
                options.map((option) =>(
                  <p key={option.val}>
                    <input name="answer" type="radio" id={option.val} onChange={this.handleChange} checked={option.isChecked} value={option.val}/>
                    <label htmlFor={option.val}>{option.val}</label>
                  </p>
                ))
              }

            </form>

            {flag ? <a className="waves-effect waves-light btn btn-color" onClick={this.handleSubmit}>Submit Answer</a>
          :<a className="waves-effect waves-light btn btn-color disabled"> Submit Answer</a>}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RadioQuestion
