import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class TextQuestion extends Component {

  static propTypes = {
    question: PropTypes.object.isRequired,
    handleBtn: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  state = {
    answer: "",
    flag: false
  }

  componentDidMount () {
    this.initializeState()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.question.prompt !== nextProps.question.prompt) {
      this.initializeState(nextProps)
    }

  }

  initializeState = (props = this.props) => {
    const question = props.question
    const isNextBtnEnabled = (question.is_required && question.answer.length >= question.min_char_length) || (!question.is_required)
    this.setState({
      answer: question.answer,
      flag: (question.answer.length >= question.min_char_length) ? true : false
    },() => {
      props.handleBtn(isNextBtnEnabled)
    })
  }


  handleChange = (event) => {
    let val = event.target.value
    let min_char_length = this.props.question.min_char_length
    this.setState({answer: val}, () => {

      if (this.state.answer.length >= min_char_length) {
        this.setState({flag: true})

      }

      else if (this.state.answer.length < min_char_length) {
        this.setState({flag: false})
      }
    })
  }

  handleSubmit = () => {
    this.props.handleSubmit(this.state.answer)
  }

  render () {
    const question = this.props.question
    const flag = this.state.flag
    return (
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card">
            <div className="card-content black-text">
              <span className="card-title">{question.prompt}</span>
            </div>
            <div className="card-action">
              {question.min_char_length <= 50 && <input type="text" placeholder="Enter Your Answer Here" value={this.state.answer} onChange={this.handleChange}/>}
              {question.min_char_length > 50 && <textarea placeholder="Enter Your Answer Here" value={this.state.answer} className="materialize-textarea" onChange={this.handleChange} />}
              {flag ? <a className="waves-effect waves-light btn btn-color" onClick={this.handleSubmit}>Submit Answer</a>
            :<a className="waves-effect waves-light btn btn-color disabled"> Submit Answer</a>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TextQuestion
