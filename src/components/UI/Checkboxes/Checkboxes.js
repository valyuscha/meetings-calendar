const checkboxesLayout = (props) => {
  return props && props.checkboxesList ? props.checkboxesList.map(checkbox => {


    return `
      <div
        id="${checkbox.id}"
        class="${props.className ? props.className : ''}">
        <label for="${checkbox.name ? checkbox.name : ''}">
          ${checkbox.name ? checkbox.name : ''}
        </label>
        <input type="checkbox" id="${checkbox.name ? checkbox.name : ''}">
      </div>
    `
  }).join(' ') : `
    <div class="${props.className ? props.className : ''}">
      <label for="${props && props.id ? props.id : 'checkbox'}">
        ${props && props.label ? props.label : 'Checkbox'}
      </label>
      <input type="checkbox" id="${props && props.id ? props.id : 'checkbox'}">
    </div>  
  `
}

export default checkboxesLayout