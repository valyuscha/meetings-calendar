const selectTemplate = (props) => {
  return `
    <label>${props && props.label ? props.label : ''}</label>
    <select
     id="${props && props.id ? props.id : ''}" 
     class="${props && props.className ? props.className : ''}">
      ${props && props.extraOption ? 
        `<option
           value="${props && props.extraOption ? props.extraOption : ''}"
           id="${props && props.extraOptionId ? props.extraOptionId : ''}">
           ${props.extraOption}
         </option>`
      : ''}
      ${props && props.optionsArr ? props.optionsArr.map(option => {
        return `
          <option 
            value="${option.name ? option.name : option}" 
            id="${option.id ? option.id : ''}">
            ${option.name ? option.name : option}
          </option>
        `
      }) : null}
    </select>  
  `
}

export default selectTemplate