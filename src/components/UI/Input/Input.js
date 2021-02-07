const inputTemplate = (props) => {
  return `
    <label>${props && props.label ? props.label : ''}</label>
    <div>
      <input 
        type="text" 
        id="${props && props.id ? props.id : ''}" 
        placeholder="${props.placeholder ? props.placeholder : ''}">
      <p
        id="${props && props.errorMessageId ? props.errorMessageId : ''}" 
        class="errorMessage hideErrorMessage">
        ${props && props.errorMessage ? props.errorMessage : ''}
      </p>
    </div>
  `
}

export default inputTemplate