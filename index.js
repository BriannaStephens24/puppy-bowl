const state = {
  allPuppiesInPuppyBowl: [], // an array to store list of puppies from API
  individualPuppyStatistics: {} // an object to store each puppy's details individually
};

const main = document.querySelector('main');
const header = document.querySelector('header');

// create an async function to get data on each specific pup
const getPuppies = async () => {
  const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2501-ftb-et-web-ft/players');
  const jsonObject = await response.json();
  const allPuppies = jsonObject.data.players;
  state.allPuppiesInPuppyBowl = allPuppies;
  renderPuppies();
};

const renderPuppies = () => {
  header.innerHTML = `<h1>Puppy Bowl</h1>`;
  
  const form = document.createElement('form');
  form.innerText = 'Choose a player: ';
  const select = document.createElement('select');

  state.allPuppiesInPuppyBowl.forEach((individualPuppy) => {
    const option = document.createElement('option');
    option.innerText = individualPuppy.name;
    select.append(option);
  });

  
  select.addEventListener('change', (e) => {
    e.preventDefault();
    const selectedPuppy = state.allPuppiesInPuppyBowl.find(puppy => puppy.name === e.target.value);
    state.individualPuppyStatistics = selectedPuppy;
    renderSinglePuppyDetails();
  });

  form.append(select);
  header.append(form);
};

const renderSinglePuppyDetails = () => {
  const puppyDetailsHTML = `
    <h2>${state.individualPuppyStatistics.name}</h2>
    <p>Breed: ${state.individualPuppyStatistics.breed}</p>
    <p>Player Location: ${state.individualPuppyStatistics.status}</p>
    <img src="${state.individualPuppyStatistics.imageUrl}" alt="${state.individualPuppyStatistics.name}" />
    <p>Team ID: ${state.individualPuppyStatistics.teamId}</p>
    <p>Last Updated: ${state.individualPuppyStatistics.updatedAt}</p>
  `;

  // Create the GO BACK button
  const button = document.createElement('button');
  button.innerText = 'GO BACK';
  
  // Event listener for the GO BACK button
  button.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Clear out the details from the main area
    main.innerHTML = '';

    // Re-render the list of puppies
    renderPuppies();
  });

  // Insert the puppy details and the button in the main area
  main.innerHTML = puppyDetailsHTML;
  main.append(button);
};



getPuppies();
