import React, { useState } from 'react';
import { Input } from 'reactstrap';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

const AutoCompleteSearch = ({ addAutoCompleteData, location }) => {
  const [address, setAddress] = useState(location || '');
  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      addAutoCompleteData({...latLng, location: value})
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <PlacesAutocomplete 
    value={address} 
    onChange={setAddress} 
    onSelect={handleSelect}
    searchOptions={{ types: ['(cities)'] }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <Input 
            type="search"
            name="search"
            id="search"
            required
            {...getInputProps({ placeholder: "Enter location" })} />
          <div>
            {loading ? <div>...loading</div> : null}
            {suggestions.map((suggestion) => {
              const style = suggestion.active 
                ? { backgroundColor: "#41b6e6", cursor: "pointer" } 
                : { backgroundColor: "#fff", cursor: "pointer" }           
              return <div 
                {...getSuggestionItemProps(suggestion, { style })} 
                key={suggestion.placeId}>{suggestion.description}
              </div>
            })}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  );
}

export default AutoCompleteSearch;