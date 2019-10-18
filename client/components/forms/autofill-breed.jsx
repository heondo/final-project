import React from 'react';
import Autosuggest from 'react-autosuggest';

export default class AutofillBreed extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.state = {
      id: null,
      value: '',
      suggestions: [],
      breeds: []
    };
  }

  formatString(str) {
    return str
      .replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
      .replace(/^[^ ]/g, match => (match.toUpperCase()));
  }

  filteredBreeds(value) {
    // filter the breeds array where the name doesnt match or something
    const filtered = this.state.breeds.filter(breed => {
      if (breed.name.toLowerCase().indexOf(value.value.toLowerCase()) !== -1) {
        return true;
      }
    }).slice(0, 10);
    return filtered;
  }

  onSuggestionsFetchRequested(value) {
    this.setState({ suggestions: this.filteredBreeds(value) });
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  componentDidMount() {
    fetch('/api/get-breeds/')
      .then(res => res.json())
      .then(res => { this.setState({ breeds: res.data }); });
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({ value, id: null });
  }

  onSuggestionSelected(event) {
    const value = event.target.textContent;
    const id = event.target.getAttribute('breedid');
    this.setState({
      value,
      id: parseInt(id)
    });
  }

  getSuggestionValue(value) {
    return value.name;
  }

  renderSuggestion(value) {
    return (
      <div breedid={value.id} className="position-absolute z-index-dropdown" style={{ maxHeight: '25px' }}>
        {this.formatString(value.name)}
      </div>
    );
  }

  render() {
    const { value, suggestions, breeds } = this.state;
    const inputProps = {
      placeholder: 'Search for your breed',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
