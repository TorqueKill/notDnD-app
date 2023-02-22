<script>
    export let options = []; // dynamic list of options
    export let selectedOption = '';
  
    function handleSelect(event) {
      selectedOption = event.target.value;
    }
  </script>
  
  <label for="select-option">Select an option:</label>
  <select id="select-option" on:change={handleSelect}>
    {#each options as option}
      <option value={option.name}>{option.name}</option>
    {/each}
  </select>
  
  <p>Selected option: {selectedOption}</p>